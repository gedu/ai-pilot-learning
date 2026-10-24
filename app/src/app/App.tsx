import { useEffect, useState } from 'react';
import { filterPodcasts } from '../application/filterPodcasts';
import { searchPodcasts } from './container';
import type { Podcast } from '../domain/Podcast';
import { PodcastCard } from '../ui/PodcastCard';
import { SearchInput } from '../ui/SearchInput';
import { useDebouncedValue } from '../ui/useDebouncedValue';

/** Lo que buscamos apenas abre la app, para no mostrar una pantalla vacía. */
const INITIAL_TERM = 'inteligencia artificial';

/**
 * Paso 06: lo que escribís busca de verdad en iTunes.
 *
 * Dos capas a propósito, y vale la pena entenderlas:
 *
 *  1. LA RED (lenta): buscamos en iTunes recién 300ms después de tu última tecla
 *     (useDebouncedValue). Escribir "inteligencia" son 12 teclas = 1 sola llamada.
 *  2. LA PANTALLA (instantánea): mientras todavía estás escribiendo y la respuesta
 *     nueva no llegó, filtramos localmente lo que ya tenemos (filterPodcasts), para
 *     que la lista reaccione al toque en vez de mostrar datos viejos sin filtrar.
 *
 *     Ojo con el `isTypingAhead`: filtrar SIEMPRE localmente parece más simple, pero
 *     esconde resultados. iTunes coincide de forma laxa (busca también en autor y en
 *     otras cosas), así que un resultado puede no tener el término en el título. Si lo
 *     filtramos igual, desaparece aunque Apple lo haya traído. Por eso sólo filtramos
 *     mientras el texto SUPERA a lo último que mandamos a buscar.
 *
 * Si algún día los resultados desaparecen al escribir, revisá en qué capa estás:
 * `term` es lo que tecleaste, `debouncedTerm` es lo que ya mandamos a iTunes.
 */
export function App() {
  const [term, setTerm] = useState(INITIAL_TERM);
  const debouncedTerm = useDebouncedValue(term, 300);
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [error, setError] = useState<string | null>(null);
  /** De qué término son LOS datos que tenemos en pantalla ahora mismo. */
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
        // Marcamos de qué término ya tenemos respuesta. Con esto "Buscando…" se
        // calcula sola (derivada abajo) en vez de encenderse y apagarse a mano.
        if (!cancelled) setSettledTerm(debouncedTerm);
      });

    // Si cambió el término mientras esta llamada estaba en el aire, tiramos abajo
    // su respuesta: si no, una búsqueda vieja podría pisar a la nueva.
    return () => {
      cancelled = true;
    };
  }, [debouncedTerm]);

  const results =
    term.trim() === debouncedTerm.trim()
      ? podcasts
      : filterPodcasts(podcasts, term);

  // "Buscando…" es una cuenta, no un estado: pedimos algo distinto de lo que ya
  // tenemos en pantalla. Así no hay que acordarse de apagar un boolean en tres caminos.
  const searching = settledTerm !== debouncedTerm;

  return (
    <main className="page">
      <h1 className="title">Pod Search</h1>
      <p className="subtitle">Buscá podcasts de IA — hecho paso a paso con IA.</p>

      <SearchInput value={term} onChange={setTerm} />

      {error && <p className="error">{error}</p>}
      {searching && <p className="hint">Buscando…</p>}

      <ul className="results" aria-label="Resultados">
        {results.map((podcast) => (
          <li key={podcast.id}>
            <PodcastCard podcast={podcast} />
          </li>
        ))}
      </ul>
    </main>
  );
}
