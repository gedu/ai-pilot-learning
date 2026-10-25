import { useEffect, useState } from 'react';
import { searchPodcasts } from '../app/container';
import { filterPodcasts } from '../application/filterPodcasts';
import type { Podcast } from '../domain/Podcast';

/** Lo que buscamos apenas abre la app, para no mostrar una pantalla vacía. */
export const INITIAL_TERM = 'inteligencia artificial';

/** Los cuatro estados posibles de la pantalla — no cuatro booleanos sueltos. */
export type SearchStatus = 'idle' | 'searching' | 'ready' | 'failed';

/**
 * El estado de la búsqueda, en un solo lugar (capítulo 08 del libro, clean FE:
 * la pantalla delgada, la lógica arriba). Paso 09 lo extrajo de App.tsx; el paso
 * 10 le agregó `idle` y `retry`.
 *
 * Dos capas a propósito:
 *  1. LA RED (lenta): buscamos recién 300ms después de tu última tecla
 *     (useDebouncedValue). Escribir "inteligencia" son 12 teclas = 1 sola llamada.
 *     Enter apura esa espera llamando a `searchNow()`, pero sigue siendo UN solo
 *     camino que dispara búsquedas: el que mira `debouncedTerm`.
 *  2. LA PANTALLA (instantánea): mientras escribís y la respuesta nueva no llegó,
 *     filtramos localmente lo que ya tenemos.
 *
 *  Ojo con el filtro local: iTunes coincide de forma laxa (también mira autor y
 *  otras cosas), así que un resultado puede no tener el término en el título. Si
 *  filtramos SIEMPRE, esos resultados válidos desaparecen. Por eso sólo filtramos
 *  mientras tu texto va más atrás de lo que ya buscamos.
 */
export function usePodcastSearch(term: string, debouncedTerm: string) {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [error, setError] = useState<string | null>(null);
  /** De qué término son LOS datos que ya tenemos en pantalla. */
  const [settledTerm, setSettledTerm] = useState<string | null>(null);
  /** Sube cada vez que aprietan "Reintentar", para que el effect vuelva a correr. */
  const [attempt, setAttempt] = useState(0);

  const retry = () => setAttempt((n) => n + 1);

  useEffect(() => {
    const trimmed = debouncedTerm.trim();

    // Vacío no es "buscá y verás": no gastamos una llamada de red por un vacío.
    if (trimmed === '') return;

    let cancelled = false;

    searchPodcasts(trimmed)
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
        if (!cancelled) setSettledTerm(trimmed);
      });

    // Si cambió el término mientras esta llamada estaba en el aire, descartamos su
    // respuesta: si no, una búsqueda vieja podría pisar a la nueva.
    return () => {
      cancelled = true;
    };
  }, [debouncedTerm, attempt]);

  // Dos caminos, y la condición importa (la test team lo agarró una vez):
  //  - Tu texto ya es lo que mandamos a buscar (term === debouncedTerm): iTunes ya
  //    filtró por eso, mostramos lo que vino tal cual. Filtrar de nuevo escondería
  //    los matches laxos de Apple (trae cosas que no tienen el término en el título).
  //  - Vas más adelante que lo buscado (escribís, esperando la respuesta): filtramos
  //    lo que tenemos a mano, para que la pantalla no muestre resultados viejos.
  const results =
    term.trim() === debouncedTerm.trim() ? podcasts : filterPodcasts(podcasts, term);

  return { results, status: deriveStatus(term, debouncedTerm, settledTerm, error), error, retry };
}

/**
 * Un estado, no cuatro banderitas. Cuatro booleanos sueltos (`loading`, `error`,
 * `empty`, `idle`) dejan 16 combinaciones posibles, varias contradictorias: ahí
 * nacen los "Buscando…" pegados a un "No se pudo conectar". Con un solo valor,
 * esa pantalla imposible directamente no se puede escribir.
 */
function deriveStatus(
  term: string,
  debouncedTerm: string,
  settledTerm: string | null,
  error: string | null,
): SearchStatus {
  if (term.trim() === '') return 'idle';
  if (settledTerm === null) return 'searching';
  if (debouncedTerm.trim() !== settledTerm) return 'searching';
  if (error) return 'failed';

  return 'ready';
}
