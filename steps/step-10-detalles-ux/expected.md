# Cómo se ve el paso 10 terminado

![Paso 10](expected.png)

## Debe estar

- [ ] `npm test` → `46 passed` (9 archivos).
- [ ] `npx vitest run src/app/App.test.tsx` → `12 passed`.
      (ojo: `npx vitest run src/app`, sin el `.tsx`, trae también los tests de `application/`
      y te va a decir `22 passed`; no es que esté roto, es otra cuenta)
- [ ] A la derecha de la caja aparece el botón celeste **Buscar**, que en los pasos anteriores
      no existía.
- [ ] Las cantidades de episodio ya dicen **"1 episodio"** en las tarjetas de uno solo
      (Inteligencia Artificial, INTELIGENCIA ARTIFICIAL, Inteligencia artificial…). En la foto
      del paso 07 decía "1 episodios": esa diferencia de una "s" es trabajo de este paso.
- [ ] La lista sigue siendo la misma que en el paso 07 (Inteligencia Artificial, IA al día,
      Inteligencia Artificial para los Negocios, Big Data e Inteligencia Artificial…), o sea
      que los detalles no rompieron la búsqueda.
- [ ] Los cuatro estados, probados a mano en el browser:
      - escribiendo una letra nueva → **Buscando…**
      - caja vacía → **Escribí algo para empezar a buscar.** y la lista vieja desaparece
      - `zzzz-no-existe` → **No encontramos nada para «zzzz-no-existe»…**
      - sin internet → mensaje en español + botón **Reintentar**, que al apretarlo recupera la lista

## El detalle que delata que quedó bien

Fijate en la tarjeta "IA al día": dice **2 episodios**, y las de uno dicen **1 episodio**. Si
todas dicen "episodios", el plural no está derivado del número.

Y el detalle que no se ve en la foto pero sí en el código: `status` es **un valor**, no cuatro
booleanos. La prueba es que ninguna de las cuatro escenas de arriba puede aparecer junto con
otra. Si ves "Buscando…" al lado de un error, eso es exactamente la trampa de las banderitas.

**Un dato para no asustarse:** si hacés `git checkout` de la rama principal y corrés
`npm test`, vas a ver **54**, no 46. Los 8 de más son tests que se agregaron después de cerrar
el curso, cuando se revisó que los propios tests no tuvieran huecos (búsquedas que llegan fuera
de orden, reintentar dos veces, un término de sólo espacios). Tu paso 10 termina con 46 y está
perfecto.

## Si te quedó distinto

Si falta alguno de los cuatro estados, no lo "dejes para después": una pantalla que se queda
muda ya la vivimos (es la anécdota del paso 08 → 09). Pedila explícitamente con su mensaje
textual, o compará con `git checkout step-10` y volvé con `git checkout -`.
