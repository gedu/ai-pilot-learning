# Paso 09 — Refactor: App.tsx se queda flaco

En el paso 08 `App.tsx` tenía 94 líneas y la mayoría no eran pantalla: había fetch,
cancelaciones, estados de carga y reglas. Este paso mueve todo eso a su lugar. **No cambia
nada de lo que se ve** — y esa es exactamente la definición de refactor.

## Qué tocamos (CÓDIGO)

- `src/app/usePodcastSearch.ts` — **nuevo** (71 líneas): toda la lógica de estado de la búsqueda.
- `src/app/App.tsx` — de 94 líneas a 43: presentation only.
- `src/app/container.ts` — comentario actualizado: ya se puede cambiar iTunes por los datos locales.
- `src/infrastructure/fakePodcasts.ts` — los datos mock del paso 03 ahora también son un
  repositorio (`fakePodcastRepository`) que cumple el puerto.
- `src/infrastructure/searchRepositoryContract.test.ts` — **nuevo**: el mismo test corre contra
  iTunes y contra los datos locales, y ambos tienen que portarse igual.
- `src/app/App.test.tsx` — **sin cambios**. Mismo archivo, mismos 7 tests.

## Cómo encaja (ARQUITECTURA)

```
antes                        después
App.tsx (94 líneas)          App.tsx (43)  → sólo JSX y presentación
  ├─ useFetch                 usePodcastSearch.ts → estado, debounce, errores
  ├─ filterPodcasts           application/filterPodcasts.ts → regla pura
  └─ searchITunesPodcasts     container.ts → elige la implementación del puerto
```

## La idea de este paso (PATRÓN / concepto)

Un refactor es **cambiar la forma sin cambiar la conducta**, y la única forma de saber que
de verdad no cambiaste nada es tener tests que no toques. En este repo `App.test.tsx` es
idéntico antes y después: los mismos 7 tests, sin una coma de diferencia, y pasan igual.

El segundo movimiento del paso es el más lindo: `searchRepositoryContract.test.ts` corre los
**mismos tests** contra iTunes y contra los datos locales. Eso es lo que hace que cambiar de
repositorio sea seguro, y es lo que el libro plantea en
[capítulo 07](../../docs/the-book.md) y [capítulo 08](../../docs/the-book.md) (clean
architecture y clean front end: la pantalla delgada, la lógica arriba). Sobre los barrels
([capítulo 13](../../docs/the-book.md)): a propósito no hay `index.ts` que re-exporte todo,
para que cada import diga de dónde viene cada cosa.

## Cómo lo verificás

1. `npm test` → `38 passed` (9 archivos). Cuatro más que el paso 08, y los 7 de la pantalla
   siguen intactos.
2. `npx vitest run src/infrastructure` → `9 passed`: son los 5 de siempre de iTunes más los
   **4 nuevos del contrato**, dos por repositorio.
3. `npx tsc -b` → sin errores.
4. El experimento del paso (hacelo, es dos minutos): en `src/app/container.ts` cambiá
   `itunesPodcastRepository` por `fakePodcastRepository` (importándolo de
   `../infrastructure/fakePodcasts`), corré `npx vitest run src/app` y vas a ver
   `4 failed | 13 passed`: la app ya no encuentra "inteligencia artificial" en los tres
   podcasts escritos a mano. Después `git checkout .`.

## Si algo no funciona

- **La pantalla cambió** (algo desapareció, se movió, dice otra cosa): no fue refactor, fue
  un cambio de conducta. Volvé y compará contra `git checkout step-09`.
- **`fakePodcastRepository` no existe** y por eso el experimento ni compila: los datos mock
  siguen siendo un arreglo suelto, no un adaptador del puerto.
- **Sacaste o cambiaste tests para que pasen**: trampa clásica. En este paso la prueba es que
  la cantidad de tests de `App.test.tsx` NO baje de 7.
