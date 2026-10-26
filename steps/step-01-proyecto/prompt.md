# Paso 01 — tres formas de pedirlo

Arrancá por el Starter y mirá qué hace la IA. Si se fue por las ramas, subí a Medium. Si
querés que quede igual que `expected.png`, pegá el Advanced. Con Starter y Medium **no te
compares contra la foto**: ahí lo que se mira es qué decidió la IA por su cuenta (está al
final). El camino del curso es el Advanced.

## Starter — como se le pide a un amigo

Copiá esto y pegalo tal cual:

```
quiero una app web para buscar podcasts de IA. Empezá de cero y dejame algo que pueda
abrir en el navegador
```

## Medium — el comportamiento, sin decir cómo

Copiá esto y pegalo tal cual:

```
Quiero arrancar una app web chica para buscar podcasts de IA. Hacela con React,
TypeScript y Vite, y dejá armado desde ya el runner de tests, porque en los próximos pasos
voy a ir probando sobre la marcha (y no quiero descubrir ahora que no se puede probar). Por
hoy sólo necesito una página encendida: un título que diga "Pod Search", un subtítulo
debajo, fondo oscuro y texto claro, y que se abra en el navegador con un comando. Agregá un
test que pruebe que la página existe, junto con el código. Nada de buscador ni de podcasts
todavía: esto es el esqueleto.
```

## Advanced — el prompt del curso

Es el que reproduce `expected.md` y el tag `step-01`. Copiá esto y pegalo tal cual:

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

## Qué mirar después de cada nivel

- **Mirá `app/package.json` y leé `dependencies` y `devDependencies`.** Esas son las
  decisiones que se tomaron sin que las nombraras: framework, lenguaje, runner de tests. En
  la corrida de prueba con este mismo pedido salió una app de JavaScript plano, sin React ni
  Vite, con las dos secciones de dependencias **vacías** y sus tests corriendo con el runner
  que ya trae Node (14 archivos, 21 tests). Una salvedad honesta de esa corrida: a esa IA se
  le prohibió instalar paquetes, cosa que a vos no te prohibe nadie, así que ahí es probable
  que salga React + Vite igual. Lo que vale no es qué salió: es que un pedido de dos frases
  eligió framework, lenguaje y runner por vos.
- **¿Con qué comando se abre?** ¿Te dijo `npm run dev`, otro, o un `index.html` a doble
  clic? Si no coincide con lo que dice el README de este paso, preguntale por qué.
- **Contá los archivos y los tests** que creó (`git status --short`, desde la raíz del
  repo). El Advanced de este paso deja un proyecto chico a propósito: "hoy probamos que la
  página está viva", un solo test. Si te salieron 20 tests de cosas que no pediste, son
  superficie que ya te toca mantener.
- **Si salió otro stack y querés el del curso, no lo arregles: tiralo.** `git restore .`
  para lo modificado, borrá los archivos nuevos (aparecen con `??`), y pegá el Advanced. No
  perdiste nada: ahora sabés qué estaba decidiendo la IA en tu nombre.
