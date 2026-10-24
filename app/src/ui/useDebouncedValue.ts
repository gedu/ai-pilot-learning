import { useEffect, useState } from 'react';

/**
 * Devuelve el valor... pero recién cuando el usuario deja de escribir.
 *
 * ¿Por qué existe? Sin esto, "inteligencia" dispararía 12 búsquedas a iTunes (una
 * por letra). Con 300ms de espera, 12 teclas seguidas = 1 búsqueda.
 *
 * El reloj se reinicia con CADA tecla: no contamos desde la primera letra sino
 * desde la última. Eso está testeado a propósito en useDebouncedValue.test.ts.
 */
export function useDebouncedValue<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);

    // Si el usuario vuelve a escribir antes de los 300ms, este timer se tira abajo
    // y el effect crea uno nuevo: así se mide desde la última tecla.
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}
