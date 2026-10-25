import { useState } from 'react';
import { SearchInput } from '../ui/SearchInput';
import { PodcastCard } from '../ui/PodcastCard';
import { useDebouncedValue } from '../ui/useDebouncedValue';
import { INITIAL_TERM, usePodcastSearch } from './usePodcastSearch';

/**
 * La pantalla principal. Después del paso 09 esto es SOLO presentación: no hay
 * fetch, no hay reglas, no hay estados de carga. Todo eso vive en
 * `usePodcastSearch` (el estado) y en `application/` (las reglas puras).
 *
 * Paso 10: los cuatro estados de una pantalla que consulta algo remoto. Falta uno
 * de ellos y el usuario se queda mirando una página muda sin saber si está
 * cargando, vacía o rota — y eso ya nos pasó (ver odd/tasks, L6).
 *
 * La historia de la app, recorrible con `git checkout step-NN`:
 *  01 el nombre, para ver que levanta · 02 la home y la caja de texto
 *  03 la lista con datos mock          · 04 el filtro, con sus propios tests
 *  05 datos reales de iTunes           · 06 buscar mientras escribís (debounce)
 *  07 la URL en un config singleton    · 08 hexagonal: la UI deja de conocer iTunes
 *  09 este refactor: App.tsx delgado   · 10 loading, vacío, error, detalles de UX
 */
export function App() {
  const [term, setTerm] = useState(INITIAL_TERM);
  const [debouncedTerm, searchNow] = useDebouncedValue(term, 300);
  const { results, status, error, retry } = usePodcastSearch(term, debouncedTerm);

  return (
    <main className="page">
      <h1 className="title">Pod Search</h1>
      <p className="subtitle">Buscá podcasts de IA — hecho paso a paso con IA.</p>

      <SearchInput value={term} onChange={setTerm} onSearch={searchNow} />

      <div aria-live="polite">
        {status === 'idle' && <p className="hint">Escribí algo para empezar a buscar.</p>}
        {status === 'searching' && <p className="hint">Buscando…</p>}
        {status === 'failed' && (
          <p className="error">
            {error}{' '}
            <button type="button" className="retry" onClick={retry}>
              Reintentar
            </button>
          </p>
        )}
        {status === 'ready' && results.length === 0 && (
          <p className="hint">
            No encontramos nada para «{debouncedTerm}». Probá con otra palabra, en
            singular, o en inglés.
          </p>
        )}
      </div>

      {/* Ojo: también preguntamos por el estado, no sólo por la cantidad. En estado
          `idle` (caja vacía) los resultados viejos se esconden: decir "escribí algo
          para empezar" y mostrar la búsqueda anterior al mismo tiempo es mentir. */}
      {status !== 'idle' && results.length > 0 && (
        <ul className="results" aria-label="Resultados">
          {results.map((podcast) => (
            <li key={podcast.id}>
              <PodcastCard podcast={podcast} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
