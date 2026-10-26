# Paso 01 — El proyecto que arranca

El objetivo de hoy no es la app: es tener un proyecto que **levanta** y que se puede
correr en tu máquina en menos de 10 minutos. Todo lo que viene después se apoya en que
esto funcione. Si esto anda, ya podés programar algo.

## Qué tocamos (CÓDIGO)

- `app/package.json` — qué depende la app y los comandos: `dev`, `build`, `test`.
- `app/vite.config.ts` — Vite (el servidor y el bundler) más la config de Vitest (los tests).
- `app/index.html` — la única página HTML; tiene un `<div id="root">` vacío.
- `app/src/main.tsx` — agarra ese `#root` y ahí monta React.
- `app/src/app/App.tsx` — el primer componente: el título y un subtítulo.
- `app/src/index.css` — fondo oscuro y contenido centrado.
- `app/src/test/setup.ts` + `app/src/app/App.test.tsx` — el primer test, que sólo
  verifica que el nombre de la app aparece en pantalla.

## Cómo encaja (ARQUITECTURA)

```
   app/index.html
         │  <div id="root">
         ▼
   app/src/main.tsx ─── monta ───► app/src/app/App.tsx ───► 🖥️ la página
                                          ▲
                                          │ renderiza
                              app/src/app/App.test.tsx
```

Todavía no hay datos, ni búsqueda, ni capas. Una sola caja: la pantalla.

## La idea de este paso (PATRÓN / concepto)

**Feedback rápido antes que arquitectura.** El capítulo 01 del libro lo dice en una
frase: no esperes al final para ver algo. Acá no elegimos "la mejor estructura de
carpetas": elegimos el camino más corto a una página encendida, con TypeScript para que
la IA no te invente campos y con un runner de tests ya configurado para poder usarlo en
el paso 04.

Capítulos para leer mientras tanto:
[capítulo 10 (TypeScript)](../../docs/the-book.md) — de React vas a leer recién en el paso 02.

## Cómo lo verificás

Desde la carpeta `app/`:

1. `npm install` → termina sin errores (tarda un rato la primera vez).
2. `npm test` → te tiene que decir `Test Files  1 passed (1)` y `Tests  1 passed (1)`.
3. `npm run dev` → en la terminal aparece `VITE v8.3.5 ready` y `Local: http://localhost:5173/`.
   Abrí esa dirección: tenés que ver "Pod Search" sobre fondo negro. `Ctrl+C` lo apaga.

## Jugá con esto (opcional, 10 minutos)

Ya tenés el paso 01 commiteado. Probá pedirlo frío, en una carpeta aparte o en otra
ventana de la IA, así:

```
quiero una app web para buscar podcasts de IA. Empezá de cero y dejame algo que pueda
abrir en el navegador
```

Y fijate **qué stack eligió**. En la corrida de prueba salió una app de JavaScript plano,
sin React ni Vite, con su propio servercito de Node y `dependencies: {}` vacío: 14 archivos
y 21 tests que corrían con `node --test`. El paso 01 del curso, en cambio, te hace declarar
React, Vite, TypeScript, Vitest y Testing Library.

Una salvedad honesta de esa corrida: le habíamos prohibido instalar paquetes, así que parte
de esa decisión fue por eso y no sólo por el pedido. En tu corrida es probable que salga
React + Vite igual, porque es el default hoy. **Lo que vale del ejercicio no es el stack que
salió: es que haya uno.** Un pedido de dos frases decidió framework, language, runner de
tests, forma de servir y hasta el proveedor de datos — seis decisiones que en el curso están
repartidas en diez pasos.

- **Leé el `package.json` que te generó.** ¿Qué hay en `dependencies` y en `devDependencies`?
   Esas son las decisiones que tomaste sin saber que las estabas tomando.
- **Fijate cómo abrió la app**: ¿te dijo `npm run dev`? ¿otro comando? ¿un `index.html` a
   doble clic? En la corrida salieron las tres opciones mezcladas.
- **Contá los archivos y los tests.** En la corrida: 14 archivos, 21 tests de cosas que
   nadie pidió (escapear HTML, catálogo de respaldo, orden por cantidad de episodios).
   Todo razonable; todo tuyo para mantener.
- **Si salió otro stack y querés el del curso: no lo arregles, tiralo.** `git restore .`
   para lo modificado, borrá los archivos nuevos, y pegá el `prompt.md`. No perdiste nada:
   ahora sabés qué estaba decidiendo la IA en tu nombre.

Este es el mejor ejercicio para hacer **los dos juntos**: primero el pedido de dos frases,
después el `prompt.md` del paso. La diferencia entre las dos carpetas **es** la lección.

## Si algo no funciona

- **`npm test` dice `no test files`** — Vitest no está configurado: mirá que
  `vite.config.ts` tenga el bloque `test` con `environment: 'jsdom'` y
  `setupFiles: './src/test/setup.ts'`.
- **`npm run dev` no abre nada** — mirá el puerto real en la terminal; si el 5173 estaba
  ocupado, Vite usa otro (por eso dice `Local:` con el suyo).
- **`npm install` falla raro** — sacá de en medio `node_modules` y `package-lock.json`,
  volvé a correr `npm install`, y si sigue, pegale el error completo a la IA.
