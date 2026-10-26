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

## Jugá con esto (opcional, 10 minutos)

Tu paso 05 ya está commiteado. Volvé al paso 04 (`git checkout step-04`) y probá pedirlo
así, sin leer el `prompt.md`:

```
hacé que la búsqueda funcione de verdad: que busque podcasts de IA en internet y muestre
los resultados en la pantalla
```

Fijate qué hizo, sin corregirlo:

- **Fijate cómo se llama el archivo nuevo.** En la corrida de prueba creó
  `src/infrastructure/iTunesRepository.ts`, con la `I` de iTunes en mayúscula. El curso usa
  `itunesRepository.ts`, toda en minúscula. Adentro funciona igual — su propio `import` es
  coherente — pero ahora compará contra `git checkout step-05`: los archivos no se llaman
  igual y el `git diff` no te va a juntar las piezas. **Ese es el motivo #1 por el que el
  `prompt.md` del paso nombra el archivo exacto.** Cuando algo del curso te tiene que
  encastrar con otra cosa, decí el nombre.
- **Mirá si te agregó un botón.** En la corrida convirtió la caja en un `<form>` con botón
  **Buscar**, o sea: hay que apretar Enter o el botón para buscar. El curso **no** pone botón
  hasta el paso 10, y `expected.png` del paso 05 no lo tiene. No es un error: es la otra
  lectura razonable de "que funcione de verdad". Elegí conscientemente cuál querés y por
  qué.
- **Fijate si te metió algo que el curso deja para después.** La corrida agregó
  `AbortController` para cancelar la búsqueda anterior. Ningún tag del curso lo tiene. Su
  argumento es bueno (con latencia real, una respuesta vieja pisando a la nueva es un bug),
  pero en el curso eso llega en el paso 06/10, cuando ya tenés debounce para que se note el
  problema. Pedir "que funcione de verdad" invita a que la IA se adelante tres pasos.
- **Contá los tests.** En la corrida: 15 → **29**. Leé los nombres de los nuevos: si alguno
  prueba algo que no se te ocurrió pedir, eso es información tuya sobre qué estabas
  dando por supuesto.

Lo que sí salió bien sin que nadie lo nombre: tradujo los campos de Apple
(`collectionName`, `artistName`, `artworkUrl100`) a los tipos de tu app, sin tocar el
dominio. Ese tipo de decisión sale sola; las que no salen solas son cuántas veces se busca,
cómo se llaman las cosas, y qué no hay que tocar todavía.

## Si algo no funciona

- **Caja roja "No se pudo buscar en iTunes. Revisá tu conexión."** — no hay red o la API no
   respondió. Es el camino de error funcionando: no es una pantalla en blanco.
- **Error de CORS en la consola del browser** — la URL está mal escrita o se pidieron
  parámetros distintos. Tiene que ser `https://itunes.apple.com/search` con `media=podcast`.
- **Los tests pasan pero la pantalla sale vacía** — el `useEffect` se corrió una sola vez
  con el término por defecto y todavía no busca lo que vos escribís: eso es el paso 06.
