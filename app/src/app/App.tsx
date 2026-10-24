import { useState } from 'react';
import { SearchInput } from '../ui/SearchInput';
import { PodcastCard } from '../ui/PodcastCard';
import { useDebouncedValue } from '../ui/useDebouncedValue';
import { INITIAL_TERM, usePodcastSearch } from './usePodcastSearch';

/**
 * La pantalla principal. Después del paso 09 esto es SOLO presentación: no hay
 * fetch, no hay reglas, no hay estados de carga. Todo eso se fue a
 * `usePodcastSearch` (la lógica) y a `application/` (las reglas puras).
 *
 * La historia de la app, que se puede recorrer con `git checkout step-NN`:
 *  01 el nombre, para ver que levanta · 02 la home y la caja de texto
 *  03 la lista con datos mock          · 04 el filtro, con sus propios tests
 *  05 datos reales de iTunes           · 06 buscar mientras escribís (debounce)
 *  07 la URL en un config singleton    · 08 hexagonal: la UI deja de conocer iTunes
 *  09 este refactor: App.tsx delgado   · 10 loading, vacío, error, detalles de UX
 */
export function App() {
  const [term, setTerm] = useState(INITIAL_TERM);
  const debouncedTerm = useDebouncedValue(term, 300);
  const { results, status, error } = usePodcastSearch(term, debouncedTerm);

  return (
    <main className="page">
      <h1 className="title">Pod Search</h1>
      <p className="subtitle">Buscá podcasts de IA — hecho paso a paso con IA.</p>

      <SearchInput value={term} onChange={setTerm} />

      {status === 'failed' && <p className="error">{error}</p>}
      {status === 'searching' && <p className="hint">Buscando…</p>}

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
