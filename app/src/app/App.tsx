import { useState } from 'react';
import { filterPodcasts } from '../application/filterPodcasts';
import { fakePodcasts } from '../infrastructure/fakePodcasts';
import { PodcastCard } from '../ui/PodcastCard';
import { SearchInput } from '../ui/SearchInput';

/**
 * La pantalla principal.
 *
 * Paso 01: sólo el nombre, para confirmar que el proyecto levanta.
 * Paso 02: la home completa — título, searchbox y aviso de "todavía no buscamos".
 * Paso 03: la lista de resultados, con datos mock escritos a mano.
 * Paso 04: la caja filtra la lista. La regla del filtro NO vive acá: vive en
 *          application/filterPodcasts.ts, que tiene sus propios tests. Acá sólo
 *          la llamamos. UI delgada, lógica en un solo lugar.
 */
export function App() {
  const [term, setTerm] = useState('');
  const results = filterPodcasts(fakePodcasts, term);

  return (
    <main className="page">
      <h1 className="title">Pod Search</h1>
      <p className="subtitle">Buscá podcasts de IA — hecho paso a paso con IA.</p>

      <SearchInput value={term} onChange={setTerm} />

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
