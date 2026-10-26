# Paso 09 — tres formas de pedirlo

Arrancá por el Starter y mirá qué hace la IA. Si se fue por las ramas, subí a Medium. Si
querés que quede igual que `expected.png`, pegá el Advanced. Con Starter y Medium **no te
compares contra la foto**: ahí lo que se mira es qué decidió la IA por su cuenta (está al
final). El camino del curso es el Advanced.

## Starter — como se le pide a un amigo

Copiá esto y pegalo tal cual:

```
limpiá el componente principal de la app, quedó muy largo
```

## Medium — el comportamiento, sin decir cómo

Copiá esto y pegalo tal cual:

```
En mi app de podcasts (React + Vite + TypeScript, está en app/), el componente principal
mezcla presentación con toda la lógica de búsqueda. Quiero un refactor: se separa la lógica
en su propio hook y el componente queda sólo con lo que se ve, pero NO cambia nada de lo que
se ve ni lo que hacen los tests. Los tests que ya existen no se tocan ni un carácter: son la
evidence de que nada cambió; si tenés ganas de cambiar uno, pará y avisame. Y el estado de
la pantalla (buscando / con datos / falló) que sea derivado de una sola cuenta, no un
montón de banderitas que pueden contradecirse.
```

## Advanced — el prompt del curso

Es el que reproduce `expected.md` y el tag `step-09`. Copiá esto y pegalo tal cual:

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

## Qué mirar después de cada nivel

- **Lo primero: `git diff --stat` y buscá `App.test.tsx`.** Si aparece, la IA tocó la vara
  de medir. Un pedido de "limpiá" nunca dice "no toques los tests"; ese permiso no dato es
  justamente lo que este paso entrena a pedir.
- **Contá los tests antes y después** (`npm test`): mismo número y todos verdes. Si alguno
  desapareció, el refactor "pasó los tests" achicándolos: eso no es verde, es silencio.
- **El estado: ¿un valor o banderitas?** Si quedaron varios booleanos sueltos que pueden
  darse a la vez ("buscando" y "falló" juntos), el refactor movió el código pero no mejoró
  el diseño — y nadie se lo pidió porque el pedido tampoco lo decía.
- `git diff --stat` también te dice si te cambió el estilo o agregó dependencias "de paso".
  Un refactor que también renombra estética o sube librerías es dos cambios disfrazados.
