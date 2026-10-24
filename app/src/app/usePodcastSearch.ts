import { useEffect, useState } from 'react';
import { searchPodcasts } from '../app/container';
import { filterPodcasts } from '../application/filterPodcasts';
import type { Podcast } from '../domain/Podcast';

/** Lo que buscamos apenas abre la app, para no mostrar una pantalla vacía. */
export const INITIAL_TERM = 'inteligencia artificial';

export type SearchStatus = 'searching' | 'ready' | 'failed';

/**
 * El estado de la búsqueda, en un solo lugar (capítulo 08 del libro, clean FE:
 * la pantalla delgada, la lógica arriba).
 *
 * Antes del paso 09, todo esto vivía adentro de App.tsx y App.tsx tenía 90 líneas
 * de las cuales 60 no eran UI. Acá está lo mismo, probado por los mismos tests.
 * Un refactor es exactamente eso: cambian los archivos, no cambia lo que se ve.
 *
 * Dos capas a propósito:
 *  1. LA RED (lenta): buscamos recién 300ms después de tu última tecla
 *     (useDebouncedValue). Escribir "inteligencia" son 12 teclas = 1 sola llamada.
 *  2. LA PANTALLA (instantánea): mientras escribís y la respuesta nueva no llegó,
 *     filtramos localmente lo que ya tenemos.
 *
 *  Ojo con el filtro local: iTunes coincide de forma laxa (también mira autor y
 *  otras cosas), así que un resultado puede no tener el término en el título. Si
 *  filtramos SIEMPRE, esos resultados válidos desaparecen. Por eso sólo filtramos
 *  cuando tu texto SUPERA a lo último que mandamos a buscar.
 */
export function usePodcastSearch(term: string, debouncedTerm: string) {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [error, setError] = useState<string | null>(null);
  /** De qué término son LOS datos que ya tenemos en pantalla. */
  const [settledTerm, setSettledTerm] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    searchPodcasts(debouncedTerm)
      .then((results) => {
        if (!cancelled) {
          setPodcasts(results);
          setError(null);
        }
      })
      .catch((cause: Error) => {
        if (!cancelled) setError(cause.message);
      })
      .finally(() => {
        if (!cancelled) setSettledTerm(debouncedTerm);
      });

    // Si cambió el término mientras esta llamada estaba en el aire, descartamos su
    // respuesta: si no, una búsqueda vieja podría pisar a la nueva.
    return () => {
      cancelled = true;
    };
  }, [debouncedTerm]);

  const results =
    term.trim() === debouncedTerm.trim()
      ? podcasts
      : filterPodcasts(podcasts, term);

  // "Buscando…" es una cuenta, no un estado: pedimos algo distinto de lo que ya
  // tenemos. Así nadie se olvida de apagar un boolean en el camino de error.
  const status: SearchStatus =
    settledTerm !== debouncedTerm ? 'searching' : error ? 'failed' : 'ready';

  return { results, status, error };
}
