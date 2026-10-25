Copiá esto y pegalo tal cual en tu IA:

````
Paso 3 de mi curso. La home de "Pod Search" ya tiene título, subtítulo y la caja de
búsqueda (que todavía no busca). Hoy agregamos la LISTA de resultados, pero con datos
falsos escritos a mano: cero internet, cero fetch, cero API.

Stack: React + Vite + TypeScript.

1. Creá `src/domain/Podcast.ts` con una interfaz `Podcast` exportada con estos campos:
   `id: string`, `title: string`, `author: string`, `imageUrl: string`, y
   `episodeCount?: number` (opcional, porque no todas las fuentes saben cuántos
   episodios tiene un podcast).
2. Creá `src/infrastructure/fakePodcasts.ts`: un arreglo tipado `Podcast[]` exportado
   llamado `fakePodcasts` con 3 podcasts de IA escritos a mano, cada uno con id, título,
   autor, una imageUrl que apunte a un SVG local (creá `public/cover-1.svg`,
   `public/cover-2.svg` y `public/cover-3.svg`: cuadrados de color con las iniciales) y
   su episodeCount.
3. Creá `src/ui/PodcastCard.tsx`: un componente que recibe un `podcast: Podcast` y muestra
   la portada (`<img>` con `alt` que diga "Portada de " + el título), el título, el autor y
   la cantidad de episodios en el formato "900 episodios". Si `episodeCount` no viene, esa
   línea NO se muestra (ni "undefined episodios").
4. En `src/app/App.tsx` reemplazá el párrafo de aviso por una `<ul>` con
   `aria-label="Resultados"`, un `<li key={...}>` por podcast con su `PodcastCard` adentro.
   Sacá el texto "Escribí algo arriba para empezar a buscar.".
5. Escribí los tests JUNTOS con el código:
   - `src/ui/PodcastCard.test.tsx`: que muestre título y autor; que la imagen tenga el alt
     "Portada de ..." y el `src` correcto; que muestre "900 episodios"; y que no explote ni
     muestre la palabra "episodios" cuando `episodeCount` no viene.
   - Actualizá `src/app/App.test.tsx`: que en la app estén los títulos de los podcasts
     mock y que exista una lista accesible con el nombre "Resultados".

Importante: no cambies la caja de búsqueda ni la hagas funcionar todavía, y no agregues
botones ni fetch. Al final explicame en 3 líneas qué hiciste.
````

Corré `npm test`: ahora son **8** tests en **2** archivos. Después `npm run dev` y mirá
las 3 tarjetas. Si te agregó un `fetch` o un botón, pedile que lo saque: recién llega en el
paso 05.
