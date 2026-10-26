# Paso 06 — tres formas de pedirlo

Arrancá por el Starter y mirá qué hace la IA. Si se fue por las ramas, subí a Medium. Si
querés que quede igual que `expected.png`, pegá el Advanced. Con Starter y Medium **no
te compares contra la foto**: ahí lo que se mira es qué decidió la IA por su cuenta (está
al final). El camino del curso es el Advanced.

## Starter — como se le pide a un amigo

Copiá esto y pegalo tal cual:

```
agregá que se pueda escribir de a poco en la caja de búsqueda, y que busque mientras uno escribe
```

## Medium — el comportamiento, sin decir cómo

Copiá esto y pegalo tal cual:

```
En mi app de podcasts (React + Vite, está en app/), la caja de búsqueda hoy busca una
sola vez con un texto fijo. Quiero que busque mientras uno escribe, así: si sigo
tecleando, la espera se reinicia y se busca una sola vez cuando me callo — nada de una
llamada por letra. Mientras espero, la lista que ya está en pantalla se filtra localmente
para que no se vean datos del término anterior. Y si una respuesta vieja llega después de
cambiar el término, que no pise a la nueva.
```

## Advanced — el prompt del curso

Es el que reproduce `expected.md` y el tag `step-06`. Copiá esto y pegalo tal cual:

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

## Qué mirar después de cada nivel

- `git diff --stat` (desde `app/`): ¿apareció `package.json` modificado? Ahí se ve si te
  agregó una dependencia que no le pediste. ¿Apareció un `.test.tsx` que ya existía?
- **Contá las llamadas a iTunes** con F12 → Network, filtrando `itunes`, y escribí una
  palabra de a una letra. **Mirá el número de verdad** (no lo asumas): puede salir una por
  letra —el Starter no dijo nada de frenarlas— o puede que la IA ponga una espera por su
  cuenta. En la corrida de prueba con un pedido igual de vago puso una espera de 300 ms sin
  que nadie se la pidiera. Las dos salidas son informativas: la primera te muestra el hueco
  del pedido, la segunda te muestra que la IA llenó un hueco en silencio.
- **Borrá todo lo escrito y mirá la pantalla.** ¿Lista vacía? ¿Vuelve la inicial? ¿Error?
  En la corrida de prueba del curso volvió a la lista inicial. Ninguna es un bug: es un
  pedido que no dijo qué hacer con la caja vacía.
- **Si con el Medium te desaparecen resultados mientras escribís**, no está mal: es el
  matiz que el Medium no dijo y el Advanced sí ("iTunes coincide de forma laxa, puede
  traer cosas cuyo título no contiene el término"). Ahí tocás con mano la diferencia entre
  describir el comportamiento general y conocer el detalle de este API. Lo que aprendiste
  es a agregar esa frase al Medium la próxima vez.
- **El número mágico:** si puso una espera entre letra y letra, preguntale de dónde salió.
  En la corrida de prueba la IA respondió "ese número es mío": se decide en silencio cuando
  no lo preguntás. El Advanced lo fija (`useDebouncedValue(term, 300)`) porque el curso
  necesita que el paso sea comparable.

La sección "Jugá con esto" del README de este paso tiene los hallazgos completos de la
corrida de prueba, incluida la respuesta del Advanced sin pedirlo (`useDebouncedValue.ts`
salió solo: la estructura obvia de React sale; lo que no sale solo es cuántas llamadas,
qué con la caja vacía, y qué no tocar).
