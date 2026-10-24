# Cómo se ve el paso 01 terminado

![Paso 01](expected.png)

## Debe estar

- [ ] En el navegador, en `http://localhost:5173/`: el título **Pod Search** en grande y
      abajo el subtítulo "Buscá podcasts de IA — hecho paso a paso con IA.".
- [ ] Fondo oscuro (casi negro), texto claro, y el texto apoyado a la izquierda con un
      margen generoso: nada centrado en el medio, ni botones, ni imágenes.
- [ ] `npm test` → `Test Files  1 passed (1)` y `Tests  1 passed (1)`. Un solo test.
- [ ] `npm run build` → termina con un listado de archivos generados en `dist/` y un
      `✓ built in ...`.

## El detalle que delata que quedó bien

**Abajo de la foto no hay nada.** Ni caja de texto, ni lista, ni "hello world" del
template de Vite, ni el escudo de React. Si ves algo más, la IA agregó de más o no
tocaste `App.tsx`. Y el test tiene que ser **uno** (`1 passed`): si dice 3 o 5, te trajo
tests de muestra del generador.

## Si te quedó distinto

Primero `git diff` para ver qué te creó la IA de más y pedile que lo borre. Si querés
comparar contra la versión buena: `git checkout step-01`, mirá `app/src/`, y después
`git checkout -` para volver a lo tuyo.
