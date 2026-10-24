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

## Si algo no funciona

- **Aparecen dos mensajes a la vez** ("Buscando…" junto a un error): seguís derivando el
  estado de varias variables. Mirá `deriveStatus` en `usePodcastSearch.ts`.
- **Con la caja vacía quedan los resultados viejos**: al listar preguntás sólo por la
  cantidad y no por el estado; en `idle` hay que esconder la lista.
- **Enter no busca al toque**: `searchNow()` no está conectado al `onSubmit` del `<form>`.
