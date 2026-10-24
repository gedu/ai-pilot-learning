Copiá esto y pegalo tal cual en tu IA:

```
Hacé un REFACTOR de mi app React + TypeScript. Definición de refactor: cambia la estructura
de los archivos, NO cambia nada de lo que se ve en la pantalla ni el resultado de los tests.
Están `src/app/App.tsx` (94 líneas) y sus tests, que ya pasan.

Primera regla, no la rompas: NO toques `src/app/App.test.tsx`. Ni un carácter. Esos tests son
la evidencia de que el refactor no cambió la conducta. Si sentís la necesidad de cambiarlos,
pará y avisame.

Qué quiero mover y a dónde:

1. Creá `src/app/usePodcastSearch.ts` con un hook `usePodcastSearch(term, debouncedTerm)` que
   se lleve TODO lo que no es JSX desde `App.tsx`: el `useEffect` que busca, el arreglo de
   podcasts, el error, la variable `settledTerm` (de qué término son los datos que ya tengo),
   el `cancelled` de la cancelación y el cálculo de cuándo hay que mostrar "Buscando…".
   Devolvé `{ results, status, error }`, donde `status` es un string tipo
   `'searching' | 'ready' | 'failed'`, NO cuatro booleanos sueltos (`loading`, `error`,
   `empty`) porque cuatro banderitas permiten combinaciones imposibles como "buscando" y
   "falló" al mismo tiempo.
   Mové también la constante `INITIAL_TERM` a este archivo y exportala.

2. `App.tsx` tiene que quedarse sólo con presentación: título, subtítulo, `<SearchInput>`, los
   mensajes según `status` y el `<ul>` de `<PodcastCard>`. Nada de `useEffect`, nada de
   `fetch`, nada de reglas de negocio.

3. Para que el puerto del paso 08 sirva de verdad, hacé que los datos locales ya existentes
   en `src/infrastructure/fakePodcasts.ts` también implementen `PodcastSearchPort`: exportá
   `fakePodcastRepository` con un método `search(term)` que filtre por título y autor,
   ignore mayúsculas, y devuelva `[]` para un término vacío. Filtrá adentro del
   repositorio falso, no con `filterPodcasts`, para que se comporte como el de verdad.
   Aclará en un comentario de `container.ts` las dos líneas posibles:
   `createSearchPodcasts(itunesPodcastRepository)` (datos reales) y
   `createSearchPodcasts(fakePodcastRepository)` (datos locales, sin internet).

4. Creá `src/infrastructure/searchRepositoryContract.test.ts`: una función
   `itBehavesLikeASearchRepository(nombre, crearRepositorio)` con DOS tests —
   (a) `search('ai')` devuelve al menos un resultado y cada resultado tiene `id`, `title`,
   `author` e `imageUrl` de tipo string; (b) `search('zzzz-no-existe-nada-así')` devuelve
   `[]` — y llamala dos veces: con `fakePodcastRepository` y con `itunesPodcastRepository`
   (para iTunes simulá `fetch` con `vi.stubGlobal`, sin ir a internet).
   El punto es que el MISMO contrato corra contra los dos.

No agregues funcionalidad nueva, ni estados nuevos, ni estilos. Cuando termines, corré
`npx vitest run` y decime la cantidad exacta de tests que pasan.

Al final explicame en 3 lines qué movede de `App.tsx` y por qué eso hace más fácil el paso
siguiente.
```

Cuando devuelva algo, corré `npm test` y compará la cantidad de tests con la que te dijo él:
tienen que coincidir, y `App.test.tsx` no puede aparecer modificado en `git status`.
