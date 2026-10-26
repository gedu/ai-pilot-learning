# Paso 03 — tres formas de pedirlo

Arrancá por el Starter y mirá qué hace la IA. Si se fue por las ramas, subí a Medium. Si
querés que quede igual que `expected.png`, pegá el Advanced. Con Starter y Medium **no te
compares contra la foto**: ahí lo que se mira es qué decidió la IA por su cuenta (está al
final). El camino del curso es el Advanced.

## Starter — como se le pide a un amigo

Copiá esto y pegalo tal cual:

```
ahora mostrá una lista de podcasts de ejemplo en la pantalla
```

## Medium — el comportamiento, sin decir cómo

Copiá esto y pegalo tal cual:

```
En mi app de podcasts (React + TypeScript, está en app/), debajo de la caja de búsqueda
quiero una lista de resultados, pero con datos escritos a mano: cero internet, cero
llamadas, cero API. Tres podcasts de IA, todos con la MISMA forma (identificador, título,
autor, imagen y cantidad de episodios opcional, porque no todas las fuentes saben cuántos
episodios tiene un show), cada uno en su tarjeta con portada, título, autor y la cantidad de
episodios. Si un dato opcional no viene, esa línea no se muestra: nada de "undefined". Es
importante que la forma esté definida una sola vez, porque en el próximo paso van a llegar
datos reales y se van a tener que adaptar a la nuestra, no al revés. Tests junto con el
código.
```

## Advanced — el prompt del curso

Es el que reproduce `expected.md` y el tag `step-03`. Copiá esto y pegalo tal cual:

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

## Qué mirar después de cada nivel

- **¿Los datos están escritos a mano o te trajo algo de internet?** `git diff --stat` y
  buscá `fetch`, y `git diff app/package.json`. Con "mostrá una lista de ejemplo" hay IA que
  directamente arma el fetch: saltarse el paso no es progreso: es perder la razón del paso (que
  la pantalla se pueda mirar sin depender de ninguna API).
- **¿La forma está definida en un solo lugar?** Si cada tarjeta inventa sus campos, el paso
  05 te va a salir caro: cuando lleguen los datos de verdad, quien se adapta a quién es el
  corazón del mock-first.
- **Probá un dato incompleto**: sacale la cantidad de episodios a uno de los tres (o pedile
  que te muestre qué pasa). Si aparece "undefined episodios", la opción no estaba
  contemplada y el pedido tampoco la nombraba.
- **Contá los tests y mirá qué prueban**: el Advanced pide pruebas concretas (que la imagen
  tenga su texto alternativo, que sin episodios no se muestre la línea). Un test que sólo
  dice "hay 3 tarjetas" pasa igual con las tarjetas rotas.
