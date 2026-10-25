# Paso 03 — La lista con datos mock

Hoy aparece la lista de podcasts en pantalla, con **datos escritos a mano** (los llamamos
*mock*: datos de mentira, con forma real). No tocamos internet todavía. La idea es
separar dos problemas: que la pantalla se vea bien, y que los datos lleguen.

## Qué tocamos (CÓDIGO)

- `app/src/domain/Podcast.ts` — **nuevo**. La interfaz `Podcast`: qué es "un podcast" para
  nosotros (id, título, autor, imagen, y cuántos episodios tiene si se sabe).
- `app/src/infrastructure/fakePodcasts.ts` — **nuevo**. Un arreglo con 3 podcasts escritos
  a mano.
- `app/src/ui/PodcastCard.tsx` — **nuevo**. Muestra UN podcast: foto, título, autor,
  cantidad de episodios.
- `app/src/ui/PodcastCard.test.tsx` — **nuevo**. 4 tests de la tarjeta, sola.
- `app/src/app/App.tsx` — saca el aviso del paso 02 y pone una `<ul>` con las tarjetas.
- `app/public/cover-1.svg`, `cover-2.svg`, `cover-3.svg` — **nuevas**. Las tapas dibujadas.

## Cómo encaja (ARQUITECTURA)

```
 domain/Podcast.ts  ◄─── la forma de los datos (todos la usan)
        ▲          ▲
        │          │
 infrastructure/    ui/PodcastCard.tsx  ◄── un átomo
 fakePodcasts.ts         ▲
 (datos a mano)          │ lo repetimos 3 veces
        └────► app/src/app/App.tsx ◄─── arma la <ul>
```

## La idea de este paso (PATRÓN / concepto)

**Mock primero.** Escribimos los datos a mano para poder mirar la pantalla sin depender de
ninguna API. Es un seguro: si el paso 05 falla, ya sabemos que el problema es el fetch y no
la pantalla. Y todos los datos tienen la **misma forma** (`Podcast`): cuando en el paso 05
lleguen los de iTunes, iTunes se adapta a nosotros, no nosotros a iTunes.

Lectura: [capítulo 01 (atomic design)](../../docs/the-book.md).

## Cómo lo verificás

Desde `app/`:

1. `npm test` → `Test Files  2 passed (2)` y `Tests  8 passed (8)`.
2. `npm run dev` → ves **3 tarjetas**: The AI Daily Brief, Latent Space: The AI Engineer
   Podcast y Practical AI. Cada una con su cuadradito de color, el autor en gris y los
   episodios en azul (`900 episodios`, `284`, `379`).
3. `npm run build` → sigue compilando sin errores de TypeScript.

## Si algo no funciona

- **Se ve la lista pero sin las fotos** — las tapas viven en `app/public/` y se piden como
  `/cover-1.svg`. Si la IA las puso en otra carpeta, no encuentran la imagen.
- **`npm test` dice 4 u 8 pero uno falla** — casi siempre el de "no episode count": la
  tarjeta no tiene que pintar la línea de episodios cuando el dato no existe.
- **React se queja del `key`** — cada `<li>` de la lista necesita `key={podcast.id}`.
