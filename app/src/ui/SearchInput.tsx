interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Un átomo (capítulo 01 del libro): la caja de texto, nada más.
 * No sabe qué se busca, ni de dónde vienen los datos. Sólo muestra y avisa.
 */
export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
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
  );
}
