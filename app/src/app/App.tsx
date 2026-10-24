import { useState } from 'react';
import { SearchInput } from '../ui/SearchInput';

/**
 * La pantalla principal.
 *
 * Paso 01: sólo el nombre, para confirmar que el proyecto levanta.
 * Paso 02: la home completa — título, searchbox y el aviso de "todavía no buscamos".
 *          La caja guarda lo que escribís, pero aún no busca: eso llega en el paso 05/06.
 */
export function App() {
  const [term, setTerm] = useState('');

  return (
    <main className="page">
      <h1 className="title">Pod Search</h1>
      <p className="subtitle">Buscá podcasts de IA — hecho paso a paso con IA.</p>

      <SearchInput value={term} onChange={setTerm} />

      <section className="results" aria-live="polite">
        <p className="hint">Escribí algo arriba para empezar a buscar.</p>
      </section>
    </main>
  );
}
