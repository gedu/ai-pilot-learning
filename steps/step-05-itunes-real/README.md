# Paso 05 — Datos reales: iTunes contesta

Hoy la lista ya no está escrita a mano: la app va a internet y busca podcasts de verdad.
Usamos la **iTunes Search API**, que es gratis, no pide API key y deja que el browser la
llame directo. No hace falta backend.

## Qué tocamos (CÓDIGO)

- `app/src/infrastructure/itunesRepository.ts` — **nuevo**. `searchITunesPodcasts(term)`:
  arma la URL, hace el `fetch`, y traduce los campos de Apple a nuestro `Podcast`.
- `app/src/infrastructure/itunesRepository.test.ts` — **nuevo**. 5 tests que simulan la
  respuesta de Apple sin salir a internet.
- `app/src/app/App.tsx` — `useEffect`: al abrir, busca "inteligencia artificial".
- `app/src/index.css` — la caja roja de error (`.error`).
- `app/src/app/App.test.tsx` — ahora simula el `fetch`; y los tests que ya estaban siguen.

## Cómo encaja (ARQUITECTURA)

```
 app/src/app/App.tsx
        │ useEffect al abrir
        ▼
 infrastructure/itunesRepository.ts ──fetch──► 🌐 iTunes Search API
        │  campos de Apple → Podcast
        ▼
 domain/Podcast.ts  (la pantalla no se enteró del cambio)
```

`App.tsx` y `PodcastCard` no cambiaron nada para mostrar datos reales. El único que conoce
iTunes es el repositorio.

## La idea de este paso (PATRÓN / concepto)

**Un solo lugar traduce el mundo de afuera.** Apple responde con
`collectionName`, `artistName`, `artworkUrl100`. Nuestro modelo dice `title`, `author`,
`imageUrl`. Ese traductor vive en un archivo, así que si Apple cambia los campos, se rompe
un test y no toda la app. Y los dos detalles de persona: si la red falla, el usuario lee un
mensaje en español con qué hacer, y en los tests **nunca** se llama a internet (se simula
la respuesta, para que corran rápido y siempre igual).

Lectura: [capítulo 09 (React)](../../docs/the-book.md).

## Cómo lo verificás

Desde `app/`:

1. `npm test` → `Test Files  4 passed (4)` y `Tests  21 passed (21)`.
2. `npx vitest run src/infrastructure/itunesRepository.test.ts` → `Tests  5 passed (5)`.
3. `npm run dev` → `http://localhost:5173/` se llena con **20 podcasts reales** (el
   límite que pedimos), con sus tapas verdaderas. La caja sigue filtrando lo que ya bajó.
4. Si querés ver la cruda, en otra terminal:
   `curl "https://itunes.apple.com/search?media=podcast&term=inteligencia+artificial&limit=2" | head -20`
   → JSON con `resultCount` y `results`.

## Si algo no funciona

- **Caja roja "No se pudo buscar en iTunes. Revisá tu conexión."** — no hay red o la API no
   respondió. Es el camino de error funcionando: no es una pantalla en blanco.
- **Error de CORS en la consola del browser** — la URL está mal escrita o se pidieron
  parámetros distintos. Tiene que ser `https://itunes.apple.com/search` con `media=podcast`.
- **Los tests pasan pero la pantalla sale vacía** — el `useEffect` se corrió una sola vez
  con el término por defecto y todavía no busca lo que vos escribís: eso es el paso 06.
