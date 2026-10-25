# Cómo se ve el paso 06 terminado

![Paso 06](expected.png)

## Debe estar

- [ ] `npm test` → `24 passed` (5 archivos de test).
- [ ] La caja dice "Buscar podcasts" y aparece escrita **react native**, con un borde azul
      porque está seleccionada: la escribiste vos, no venía de fábrica.
- [ ] Abajo cambió la lista: se ve **React Native Radio** (Jamon Holmgren, Robin Heinze,
      Mazen Chami · 376 episodios) y **ReactNativos Podcast**, o sea resultados de *eso*
      que escribiste, no de "inteligencia artificial".
- [ ] Cada tarjeta trae portada, título, autor y cantidad de episodios en azul.
- [ ] `src/ui/useDebouncedValue.ts` existe y tiene su archivo de test al lado.

## El detalle que delata que quedó bien

Borrá la palabra de la caja y escribí "inteligencia artificial" letra por letra, mirando la
pestaña Network del browser: tenés que ver **una** llamada a `itunes.apple.com/search` al
final, no una por letra. Si ves doce, el debounce no está reiniciando el timer.

Fijate también en un detalle feo que a esta altura es *correcto*: las tarjetas dicen
"1 episodios". Ese español mal hecho lo arregla el paso 10, así que si ya lo arreglaste
antes, adelantaste un paso (no es un problema, pero no es este).

## Si te quedó distinto

Si la lista no cambia al escribir, o cambia pero con las letras a medias, compará tu
`src/app/App.tsx` contra el del paso: `git checkout step-06` y mirá el bloque de `results`
y el `useEffect`. Después `git checkout -` para volver.
