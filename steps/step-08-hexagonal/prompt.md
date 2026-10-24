Copiá esto y pegalo tal cual en tu IA:

```
Necesito aplicar arquitectura hexagonal SOLO al punto donde esta app React + TypeScript
busca podcasts. No cambies la estética ni el comportamiento visible: la pantalla tiene que
quedar exactamente igual. Hoy `src/app/App.tsx` importa y llama a `searchITunesPodcasts`
de `src/infrastructure/itunesRepository.ts`, y eso es lo que queremos cortar.

Regla central: la lógica de negocio y la pantalla NO pueden conocer el nombre "iTunes" ni
usar `fetch`. Tienen que hablar contra una interfaz.

Archivos a crear:

1. `src/domain/ports/PodcastSearchPort.ts`
   `export interface PodcastSearchPort { search(term: string): Promise<Podcast[]> }`
   Es una promesa, no una implementación. No debe mencionar iTunes, ni URL, ni fetch.

2. `src/application/searchPodcasts.ts`
   `export function createSearchPodcasts(repository: PodcastSearchPort)` que devuelve una
   función `async searchPodcasts(term: string): Promise<Podcast[]>`.
   Regla de negocio adentro de esta función, no en la UI: si el término viene vacío o sólo
   con espacios, devuelve `[]` y NO le pide nada al repositorio. Si viene con texto, hace
   `trim` y le pasa el término limpio al repositorio. Los errores del repositorio se dejan
   subir tal cual para que la pantalla los muestre.
   Este archivo no puede importar iTunes ni `fetch` ni React.

3. `src/infrastructure/itunesRepository.ts`
   Dejá la función que ya existe y agregá un objeto que cumpla el puerto:
   `export const itunesPodcastRepository: PodcastSearchPort = { search: searchITunesPodcasts }`.

4. `src/app/container.ts` (composition root: el único lugar donde se nombran la lógica y el
   mundo de afuera)
   `export const searchPodcasts = createSearchPodcasts(itunesPodcastRepository)`
   Con un comentario mostrando que mañana se puede poner un repositorio falso o de otra API
   cambiando esa única línea.

5. `src/app/App.tsx`
   Reemplazá la importación del repositorio por `import { searchPodcasts } from './container'`.
   No debe quedar ninguna referencia a "iTunes" ni a `infrastructure/` en la pantalla.

Tests junto con el código, en `src/application/searchPodcasts.test.ts` (Vitest, sin red y
sin React), con un repositorio falso escrito a mano que además anote en un arreglo los
términos que le pidieron:
- que le pide al repositorio el término con `trim` (le paso `'   inteligencia   '` y el
  repositorio recibe `'inteligencia'`);
- que devuelve tal cual lo que dio el repositorio;
- que con un término vacío devuelve `[]` y la lista de términos pedidos queda vacía (o sea,
  no moleste al repositorio);
- que un error del repositorio sube (`rejects.toThrow`) para que la pantalla lo muestre.

Al final explicame en 3 líneas qué gana la app con que `App.tsx` no sepa que existe iTunes.
```

Cuando devuelva algo, corré `npx vitest run src/application` y fijate si el falso
repositorio del test es un objeto de 5 líneas: si simulaste `fetch` otra vez, no aplicó el patrón.
