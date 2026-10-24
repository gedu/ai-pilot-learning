import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Devuelve [el valor "asentado", una función para saltarse la espera].
 *
 * ¿Por qué existe? Sin esto, "inteligencia" dispararía 12 búsquedas a iTunes (una
 * por letra). Con 300ms de espera, 12 teclas seguidas = 1 búsqueda.
 *
 * El reloj se reinicia con CADA tecla: no contamos desde la primera letra sino
 * desde la última. Eso está testeado a propósito en useDebouncedValue.test.ts.
 *
 * `searchNow()` es para la tecla Enter: el usuario ya terminó de escribir, no hay
 * nada que esperar. Devolver la función desde acá (y no "forzar" el término desde
 * la UI) mantiene UN solo camino que dispara búsquedas: el que mira `debounced`.
 * Dos caminos que disparan búsquedas es exactamente cómo nace un "la pantalla
 * muestra los resultados de la búsqueda anterior".
 */
export function useDebouncedValue<T>(value: T, delayMs = 300): [T, () => void] {
  const [debounced, setDebounced] = useState(value);
  /** Cada `searchNow()` sube este contador: es la señal de "no esperes nada". */
  const [flushCount, setFlushCount] = useState(0);
  const lastFlush = useRef(0);

  useEffect(() => {
    // Si alguien apretó Enter, cortamos la espera y asentamos el valor de una.
    if (lastFlush.current !== flushCount) {
      lastFlush.current = flushCount;
      setDebounced(value);

      return;
    }

    const timer = setTimeout(() => setDebounced(value), delayMs);

    // Si el usuario vuelve a escribir antes de los 300ms, este timer se tira abajo
    // y el effect crea uno nuevo: así se mide desde la última tecla.
    return () => clearTimeout(timer);
  }, [value, delayMs, flushCount]);

  const searchNow = useCallback(() => setFlushCount((n) => n + 1), []);

  return [debounced, searchNow];
}
