Copiá esto y pegalo tal cual en tu IA:

```
Necesito que en mi app React + TypeScript (Vite, tests con Vitest) la caja de búsqueda
deje de ser decorativa: lo que el usuario escribe tiene que buscar de verdad en iTunes.

Comportamiento exacto que quiero:

1. El texto que escribe el usuario se guarda en un estado `term` y se muestra en la caja
   al toque, letra por letra, sin esperas.
2. La búsqueda real a iTunes NO se dispara con cada letra. Creamos un hook nuevo,
   `useDebouncedValue(value, delayMs)` en `src/ui/useDebouncedValue.ts`, que devuelve el
   valor recién cuando pasaron `delayMs` desde la ÚLTIMA vez que cambió. El reloj se
   reinicia con cada tecla: se limpia el timer anterior en el cleanup del `useEffect`.
   En `src/app/App.tsx` usamos `useDebouncedValue(term, 300)` y buscamos sólo cuando ese
   valor asentado cambia.
3. Mientras el usuario sigue escribiendo y la respuesta nueva todavía no llegó, la
   pantalla NO muestra resultados del término anterior: filtramos localmente lo que ya
   tenemos con la función `filterPodcasts` que ya existe. Importante: filtramos SOLO
   cuando `term.trim() !== debouncedTerm.trim()`. Si ya buscamos exactamente ese término,
   mostramos lo que trajo iTunes tal cual, porque iTunes coincide de forma laxa y puede
   traer cosas cuyo título no contiene el término.
4. Si cambia el término mientras una llamada está en el aire, descartamos la respuesta de
   esa llamada (una variable `cancelled` en el cleanup del `useEffect`) para que una
   búsqueda vieja no pise a la nueva.
5. Mientras se espera una respuesta mostramos un texto "Buscando…" en un `<p className="hint">`.
   Si la búsqueda falla, mostramos el mensaje de error que ya trae el repositorio.
6. Mientras una búsqueda está en el aire, NO guardamos el resultado si el efecto ya fue
   limpiado.

Tests junto con el código, en `src/ui/useDebouncedValue.test.ts` (Vitest, con fake timers):
- un test que prueba que el valor devuelto NO cambia inmediatamente al cambiar la entrada,
  y que sí cambia después de avanzar los 300ms;
- un test que prueba que la espera se mide desde la ÚLTIMA tecla: cambio el valor, avanzo
  100ms, cambio otra vez, avanzo 100ms, y todavía no cambió; avanzo 300ms y ahí cambia.

Y agregá en `src/app/App.test.tsx` un test que escriba un término en la caja y compruebe
que aparecen los resultados de ese término y desaparecen los del anterior.

Al final explicame en 3 líneas qué hiciste y por qué el filtro local tiene esa condición.
```

Cuando devuelva algo, corré `npm test` y fijate si los dos tests del debounce están y
pasan; si sólo agregó el hook sin tests, pedile los tests antes de seguir.
