# Paso 10 — tres formas de pedirlo

Arrancá por el Starter y mirá qué hace la IA. Si se fue por las ramas, subí a Medium. Si
querés que quede igual que `expected.png`, pegá el Advanced. Con Starter y Medium **no te
compares contra la foto**: ahí lo que se mira es qué decidió la IA por su cuenta (está al
final). El camino del curso es el Advanced.

## Starter — como se le pide a un amigo

Copiá esto y pegalo tal cual:

```
pulí esta app para que se sienta profesional: que uno entienda qué está pasando mientras
busca, y que no quede fea cuando no encuentra nada o cuando falla
```

## Medium — el comportamiento, sin decir cómo

Copiá esto y pegalo tal cual:

```
En mi app de podcasts (React + Vite + TypeScript, está en app/), la búsqueda ya funciona
pero la pantalla no avisa nada. Quiero los cuatro momentos cubiertos, sin que puedan
contradicirse: caja vacía (con aviso y los resultados ANTERIORES escondidos), buscando (un
texto visible), sin resultados (aviso con el término y una salida), y error (mensaje legible
con botón Reintentar que reintenta de verdad). Con la caja vacía no se llama a la red. Enter
tiene que buscar al toque, sin esperar la espera de letras. Escribí los tests junto con el
código, y no rompas la búsqueda que ya anda.
```

## Advanced — el prompt del curso

Es el que reproduce `expected.md` y el tag `step-10`. Copiá esto y pegalo tal cual:

```
Necesito que mi app React + TypeScript (Vite, Vitest) cubra los CUATRO estados de una pantalla
que consulta una API remota, más algunos detalles de UX. La búsqueda por lo que escribo ya
funciona; no la rompas.

Primera regla: el estado de la pantalla es UN solo valor, `status`, con exactamente cuatro
posibles: 'idle' | 'searching' | 'ready' | 'failed'. NO quiero cuatro booleanos sueltos
(loading, error, empty, idle), porque dejan combinaciones imposibles como "Buscando…" al mismo
tiempo que "No se pudo conectar". Derivalo de una cuenta (de qué término ya tengo respuesta
vs. qué estoy pidiendo), no de banderitas que hay que acordarse de apagar.

Qué tiene que mostrar cada estado, en `src/app/App.tsx`, dentro de un `<div aria-live="polite">`:
- `idle` (la caja está vacía): "Escribí algo para empezar a buscar." Y ADEMÁS: en este estado
  hay que ESCONDER los resultados de la búsqueda anterior. Decir "escribí algo" y mostrar la
  lista vieja al mismo tiempo es una pantalla que se contradice.
- `searching`: "Buscando…".
- `ready` con cero resultados: "No encontramos nada para «el término». Probá con otra palabra,
  en singular, o en inglés."
- `failed`: el mensaje de error legible que ya devuelve el repositorio, más un botón
  "Reintentar" que vuelve a lanzar la misma búsqueda.

Comportamiento:
- Con la caja vacía NO se dispara ninguna llamada a la red. Nada de consultar iTunes con ''.
- Enter (o el botón) busca INMEDIATO, sin esperar los 300ms del debounce. Para eso,
  `useDebouncedValue` en `src/ui/useDebouncedValue.ts` pasa a devolver una tupla
  `[valor, searchNow]`, donde `searchNow()` es una función estable que saltea la espera.
  `searchNow()` es el ÚNICO camino extra: no quiero un segundo `useEffect` que también dispare
  búsquedas, porque dos caminos de disparo es como nace un "muestra los resultados anteriores".
- `src/ui/SearchInput.tsx` pasa a ser un `<form>` con `onSubmit` que hace
  `event.preventDefault()` y llama a `onSearch()`, con un `<button type="submit">Buscar</button>`.
  Así Enter funciona sin escribir un listener de teclado a mano.

Detalles de la tarjeta `src/ui/PodcastCard.tsx`:
- En español el singular es "1 episodio", no "1 episodios". Usá el plural correcto según el
  número.
- Si el podcast viene sin imagen (`imageUrl` vacío), no hay que mostrar el ícono roto del
  navegador: usá `/cover-empty.svg` (creá ese SVG simple en `app/public/`).
- Dejá `loading="lazy"` y un `alt` descriptivo en la `<img>`.

Tests junto con el código, en `src/app/App.test.tsx` (simulá iTunes con `vi.stubGlobal('fetch', ...)`),
agregá por lo menos estos cinco y NO toques los 7 que ya pasan:
1. cuando la búsqueda no encuentra nada, aparece un texto que dice "No encontramos nada" y NO
   hay ninguna lista de resultados;
2. con la caja vacía aparece "Escribí algo para empezar a buscar.", no hay lista, y en las
   llamadas a fetch no aparece ningún término vacío;
3. con `vi.useFakeTimers()`, escribir y apretar Enter hace que a los 50ms ya se haya pedido ese
   término (con timers reales este test pasaría aunque Enter no hiciera nada, así que usá
   timers falsos y `fireEvent`);
4. mientras la respuesta no llegó, se ve "Buscando…";
5. si `fetch` lanza, se ve el mensaje legible en español y un botón "Reintentar", y al
   hacerle click con el fetch ya arreglado aparecen los resultados.
Agregá también:
- un test de `PodcastCard` para "1 episodio" y otro para la imagen de reemplazo;
- un test en `src/ui/useDebouncedValue.test.ts` que pruebe que la función de "no esperar"
  (`searchNow`) asienta el valor de una, sin dejar correr los 300ms.

Contá los tests al final: tienen que ser 46 en total. Si te da menos, falta alguno de los
tres grupos de arriba (pantalla, tarjeta, debounce).

Al final corré `npx vitest run` y decime la cantidad exacta de tests que pasan.
Explicame en 3 líneas por qué un solo `status` en vez de cuatro booleanos.
```

Cuando devuelva algo, probá vos los cuatro estados a mano en el browser (caja vacía, escribiendo,
un término imposible, y sin internet). Si falta alguno, pedilo por su nombre.

## Qué mirar después de cada nivel

- **La observación que vale el paso: ¿te tocó un test que ya pasaba?** `git diff --stat` y
  mirá los `.test.tsx`. En la corrida de prueba con este mismo pedido, la IA modificó un
  test existente (cambió un `getByRole` por `await findByRole`) para que su código pasara,
  y la suite pasó de 38 a 58. Nadie le pidió tocar tests: "pulí" lo habilitó a mover el
  arco. No está mal que lo haga; está mal que no lo veas.
- **Contá los tests y leé los nombres**: 20 tests nuevos que nadie revisó son superficie
  que ahora te toca mantener.
- **Las cuatro escenas, a mano**: cargá la app y probá caja vacía, escribiendo, término sin
  resultados (con la consola del navegador bloqueando la red podés simular el error). En
  ninguna escena dos mensajes pueden convivir ("Buscando…" + error). Si conviven, el estado
  son banderitas y no un valor: ese es justo el Advanced pidiéndole el `status` único.
- En la corrida de prueba también creó archivos que nadie pidió (un archivo de errores de
  dominio, componentes de estado) y no tocó `package.json`. Crear de más es normal; lo que
  decidís vos es qué te queda. La "Jugá con esto" del README de este paso tiene la corrida
  completa.
