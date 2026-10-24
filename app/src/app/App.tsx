import { useEffect, useState } from 'react';
import { filterPodcasts } from '../application/filterPodcasts';
import { searchITunesPodcasts } from '../infrastructure/itunesRepository';
import type { Podcast } from '../domain/Podcast';
import { PodcastCard } from '../ui/PodcastCard';
import { SearchInput } from '../ui/SearchInput';

/** Lo que buscamos apenas abre la app. El paso 06 hace que esto lo maneje el usuario. */
const DEFAULT_TERM = 'inteligencia artificial';

/**
 * Paso 05: los datos ya no están escritos a mano, vienen de iTunes.
 *
 * La caja todavía no busca: escribe y filtra lo que ya descargamos
 * (filterPodcasts sigue haciendo eso). Disparar una búsqueda nueva por cada
 * letra que se escribe es el paso 06 — y tiene su propio problema que resolver
 * (haríamos 20 llamadas por palabra).
 */
export function App() {
  const [term, setTerm] = useState('');
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    searchITunesPodcasts(DEFAULT_TERM)
      .then((results) => {
        if (!cancelled) setPodcasts(results);
      })
      .catch((cause: Error) => {
        if (!cancelled) setError(cause.message);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const results = filterPodcasts(podcasts, term);

  return (
    <main className="page">
      <h1 className="title">Pod Search</h1>
      <p className="subtitle">Buscá podcasts de IA — hecho paso a paso con IA.</p>

      <SearchInput value={term} onChange={setTerm} />

      {error && <p className="error">{error}</p>}

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
