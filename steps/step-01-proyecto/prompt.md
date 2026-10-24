Copiá esto y pegalo tal cual en tu IA (Claude, ChatGPT o Cursor):

````
Quiero arrancar un proyecto web chico para aprender a programar con vos. Voy a seguir
un curso de 10 pasos y este es el paso 1: sólo necesito que el proyecto levante, nada
de buscador ni de podcasts todavía.

Stack obligatorio (no lo cambies): React + Vite + TypeScript, y Vitest para los tests.

Hacé esto en la carpeta `app/` del repositorio en el que estoy:

1. Creá el proyecto React + Vite con TypeScript.
2. Dejá estos comandos en `package.json`: `npm run dev` para ver la app, `npm run build`
   para compilarla y `npm test` para correr los tests.
3. Configurá Vitest con jsdom en `vite.config.ts` y un archivo `src/test/setup.ts` que
   traiga `@testing-library/jest-dom/vitest`, para que los tests puedan mirar el DOM.
4. En `src/app/App.tsx` creamos el componente `App` con sólo dos cosas: un título
   `<h1>` que diga exactamente "Pod Search" y un párrafo debajo que diga
   "Buscá podcasts de IA — hecho paso a paso con IA.".
5. `src/main.tsx` tiene que montar `App` dentro del `<div id="root">` de `index.html`.
6. En `src/index.css`: fondo oscuro, texto claro y el contenido centrado con un ancho
   máximo de 720px. Nada más.
7. Juntos con el código, escribí el test `src/app/App.test.tsx`: tiene que renderizar
   `App` y probar que existe un encabezado con el texto "Pod Search". Con un solo test
   alcanza: hoy probamos que la página está viva.

Al final escribí en 3 líneas qué hiciste y qué comando tengo que correr yo para ver la
app en el navegador.
````

Cuando te devuelva todo, corré `npm install` y después `npm test` dentro de `app/`. Si
algo falla, pegale el error **completo** (no un resumen) y dejalo arreglarlo: eso también
es programar.
