interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  /** Se llama con Enter: el usuario ya terminó de escribir, no hay que esperar. */
  onSearch: () => void;
}

/**
 * Un átomo (capítulo 01 del libro): la caja de texto, nada más.
 * No sabe qué se busca, ni de dónde vienen los datos. Sólo muestra y avisa.
 *
 * `<form>` y no un `<div>` suelto: así Enter hace de "buscar" sin escribir un
 * listener de teclado a mano, y el browser ya sabe qué es un botón de submit.
 */
export function SearchInput({ value, onChange, onSearch }: SearchInputProps) {
  return (
    <form
      className="search-form"
      onSubmit={(event) => {
        event.preventDefault();
        onSearch();
      }}
    >
      <label className="search-label">
        <span className="search-label-text">Buscar podcasts</span>
        <input
          className="search-input"
          type="text"
          value={value}
          placeholder="ej: inteligencia artificial"
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
      <button type="submit" className="search-button">
        Buscar
      </button>
    </form>
  );
}
