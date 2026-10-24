# Cómo se ve el paso 09 terminado

![Paso 09](expected.png)

## Debe estar

- [ ] `npm test` → `38 passed` (9 archivos).
- [ ] `npx vitest run src/app/App.test.tsx` → `7 passed`: **los mismos siete de antes**, sin
      que hayas tocado el archivo.
- [ ] `src/app/App.tsx` de 43 líneas (antes de este paso eran 94) y sin ningún `useEffect`.
- [ ] `src/app/usePodcastSearch.ts` existe y devuelve un `status` con un solo valor.
- [ ] `npx tsc -b` sin errores.
- [ ] La pantalla: la caja con "react native" y las mismas cinco tarjetas del paso 06
      (React Native Radio, ReactNativos Podcast, React Native App Development Services,
      Le Cross Platform Show, Native Podcast).

## El detalle que delata que quedó bien

**La foto de este paso es la misma foto de los pasos 06 y 08, el mismo archivo de imagen.**
Si en tu versión algo se movió, desapareció o dice otra cosa, no fue refactor: fue un cambio
de conducta disfrazado. La otra señal es `git status`: `src/app/App.test.tsx` no puede estar
modificado.

Y el experimento que vale más que cualquier checklist: cambiá en `container.ts`
`itunesPodcastRepository` por `fakePodcastRepository` y corré `npx vitest run src/app`.
Tenés que ver `4 failed | 13 passed` — la app corre sin internet pero no encuentra
"inteligencia artificial" entre los tres podcasts escritos a mano. Que esos tests fallen
prueba que el swap ocurrió de verdad. Devolvé todo con `git checkout .`.

## Si te quedó distinto

Si la pantalla cambió o si para que pase todo tuviste que editar `App.test.tsx`, volvete:
`git checkout step-09` para ver cómo quedó acá (y `git checkout -` para volver). Un refactor
con tests modificados no es un refactor.
