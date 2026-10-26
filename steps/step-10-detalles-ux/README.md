# Paso 10 — Los cuatro estados de una pantalla que consulta algo remoto

Faltaba lo que nadie pide pero todo el mundo sufre: qué se ve mientras busca, qué se ve
cuando no encontró nada, y qué se ve cuando iTunes no respondió. Además, los detalles de UX
que delatan una app hecha con cuidado.

## Qué tocamos (CÓDIGO)

- `src/app/App.tsx` — de 43 a 68 líneas: los cuatro estados en pantalla, con `aria-live`.
- `src/app/usePodcastSearch.ts` — `status` gana `idle`, y aparece `retry`.
- `src/ui/SearchInput.tsx` — ahora es un `<form>` con botón **Buscar**; Enter busca ya.
- `src/ui/useDebouncedValue.ts` — devuelve `[valor, searchNow]`; `searchNow()` se salta la espera.
- `src/ui/PodcastCard.tsx` — "1 episodio" (no "1 episodios") y portada placeholder si no hay foto.
- `app/public/cover-empty.svg` — **nuevo**: la imagen de reemplazo.
- `src/index.css` — botón Buscar, botón Reintentar, `focus-visible`.
- `src/app/App.test.tsx` — de 7 a 12 tests.

## Cómo encaja (ARQUITECTURA)

```
term vacío ─────────────────────────────▶ idle       "Escribí algo para empezar a buscar."
term asentado, respuesta en el aire ────▶ searching  "Buscando…"
respondió y no hay nada ────────────────▶ ready+[]   "No encontramos nada para «…»"
respondió mal ──────────────────────────▶ failed     mensaje + [Reintentar]
```

Los cuatro salen de **una sola variable**, no de cuatro banderitas.

## La idea de este paso (PATRÓN / concepto)

Cuatro booleanos sueltos (`loading`, `error`, `empty`, `idle`) dejan 16 combinaciones y
varias son imposibles: ahí nace el "Buscando…" pegado a un "No se pudo conectar". Con un
único `status`, esa pantalla no se puede ni escribir.

Este paso existe por algo que pasó de verdad en el paso 09: al cambiar el contenedor a los
datos locales, la pantalla **quedó en blanco** y nadie sabía si estaba cargando, vacía o
rota. Un estado vacío que no se nombra es idéntico a una app rota.

Capítulo del libro: [capítulo 15 (IA Driven Development)](../../docs/the-book.md) — también
es el paso donde se nota que el prompt tuvo que PEDIR estos estados, porque la IA no los
ofrece sola.

## Cómo lo verificás

Desde `app/`:

1. `npm test` → `46 passed` (9 archivos). Ocho más que el paso 09: cinco nuevos en la
   pantalla (`npx vitest run src/app/App.test.tsx` → `12 passed`), dos en la tarjeta y uno en el debounce.
2. `npx vite` → abrí `http://localhost:5173`: al toque ves "Buscando…" y después la lista.
3. Limpiá la caja: tiene que decir "Escribí algo para empezar a buscar." y **desaparecer**
   la lista anterior.
4. Escribí `zzzz-no-existe`: tiene que aparecer "No encontramos nada para «zzzz-no-existe»…".
5. Cortá el internet (o frená el WiFi) y recargá: mensaje en criollo + botón **Reintentar**.
   Al reconectar y apretarlo, vuelven los resultados.

## Jugá con esto (opcional, 15 minutos)

Tu paso 10 ya está commiteado. Volvá al paso 09 (`git checkout step-09`) y probá pedirlo
así, sin leer el `prompt.md`:

```
pulí esta app para que se sienta profesional: que uno entienda qué está pasando mientras
busca, y que no quede fea cuando no encuentra nada o cuando falla
```

Fijate que este pedido **no nombra ningún archivo ni ninguna librería**, pero sí nombra
los tres estados. Es un pedido de nivel 3 (ver
[`docs/prompting.md`](../../docs/prompting.md)): no dice cómo, dice qué tiene que pasar. Y
se nota en el resultado.

- **La parte más importante: mirá `git diff` de los archivos de test.** En la corrida de
  prueba la IA terminó con un test **modificado** — el que decía
  `labels the results so a screen reader knows what the list is` (estaba en
  `App.test.tsx:86`). Lo cambió de `getByRole('list')` a `await findByRole('list')`, porque
  ahora la lista tarda en aparecer. **Nadie le pidió tocar un test que ya pasaba.** Ese es
  el riesgo real de pedir "pulí": la IA puede cambiar las reglas del juego para que su
  código pase. No está mal que lo haga; está mal que no lo veas.
- **Contá los tests antes y después.** En la corrida: 38 → **58**. Suena a progreso, y una
  parte lo es. Pero son 20 tests que nadie revisó: leé los nombres de los nuevos y, si uno
  no te dice qué prueba, pedile que lo explique o que lo saque.
- **Fijate qué creó que no estaba pedido.** En la corrida aparecieron `src/domain/errors.ts`,
  `src/ui/SearchStatus.tsx` y `src/ui/PodcastCover.tsx`, un botón "Limpiar", números
  agrupados con `es-AR` y soporte de `prefers-reduced-motion`. Algunas son mejoras honestas;
  otras son superficie que ahora hay que mantener. Preguntale por qué cada una.
- **Fijate qué NO cambió, y eso es bueno:** no agregó dependencias. `package.json` quedó
  intacto.
- **Fijate qué quedó de la corrida y no es código.** La IA de la corrida hizo un build para
  verificar y dejó una carpeta `app/dist/`. Está en `.gitignore`, así que `git status
  --short` no la muestra. Para ver lo que quedó tirado en el disco, incluido lo ignorado:
  `git status --ignored --short --untracked-files=all`. Y para ver sólo los archivos nuevos
  que creó la IA (los que `git restore .` no va a borrar): `git ls-files --others
  --exclude-standard`.

Dato curioso y tranquilizador: el paso 09 ya tenía un tipo `SearchStatus` con tres valores,
y la corrida le agregó un cuarto — **exactamente los cuatro estados del paso 10 del curso**.
Cuando el pedido describe el comportamiento, la estructura parecida tiende a salir sola.

## Si algo no funciona

- **Aparecen dos mensajes a la vez** ("Buscando…" junto a un error): seguís derivando el
  estado de varias variables. Mirá `deriveStatus` en `usePodcastSearch.ts`.
- **Con la caja vacía quedan los resultados viejos**: al listar preguntás sólo por la
  cantidad y no por el estado; en `idle` hay que esconder la lista.
- **Enter no busca al toque**: `searchNow()` no está conectado al `onSubmit` del `<form>`.
