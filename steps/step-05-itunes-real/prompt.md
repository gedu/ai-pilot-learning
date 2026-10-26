# Paso 05 — tres formas de pedirlo

Arrancá por el Starter y mirá qué hace la IA. Si se fue por las ramas, subí a Medium. Si
querés que quede igual que `expected.png`, pegá el Advanced. Con Starter y Medium **no te
comparas contra la foto**: ahí lo que se mira es qué decidió la IA por su cuenta (está al
final). El camino del curso es el Advanced.

## Starter — como se le pide a un amigo

Copiá esto y pegalo tal cual:

```
hacé que la búsqueda funcione de verdad: que busque podcasts de IA en internet y muestre
los resultados en la pantalla
```

## Medium — el comportamiento, sin decir cómo

Copiá esto y pegalo tal cual:

```
En mi app de podcasts (React + Vite + TypeScript), la lista de hoy está escrita a mano y
quiero que venga de verdad de internet: la iTunes Search API, que es gratis, no pide clave
y el browser la puede llamar directo. Al abrir la app se busca un término y los resultados
llenan las tarjetas que ya tenemos; los campos que devuelve Apple se traducen a nuestro
modelo en un solo lugar, y la pantalla no se entera del cambio. Si la red falla, el
usuario lee un mensaje en español y no una página en blanco. En los tests se simula la
respuesta de Apple: nunca se sale a internet.
```

## Advanced — el prompt del curso

Es el que reproduce `expected.md` y el tag `step-05`. Copiá esto y pegalo tal cual:

````
Paso 5 de mi curso. "Pod Search" hoy muestra 3 podcasts mock escritos a mano. Hoy esos
datos tienen que venir de verdad de la iTunes Search API, que es gratis, no necesita API
key y responde con CORS abierto, así que el browser la llama directo sin backend.

Stack: React + Vite + TypeScript + Vitest.

1. Creá `src/infrastructure/itunesRepository.ts` exportando
   `searchITunesPodcasts(term: string): Promise<Podcast[]>` (usá la interfaz `Podcast` que
   ya existe en `src/domain/Podcast.ts`). Comportamiento pedido:
   - URL `https://itunes.apple.com/search` con los parámetros `media=podcast`,
     `term=<lo que buscamos>` y `limit=20`;
   - si la red falla, lanzá un Error con el mensaje exacto
     "No se pudo buscar en iTunes. Revisá tu conexión.";
   - si la respuesta trae un código de error (response.ok es falso), lanzá un Error que
     incluya el número de estado;
   - los campos de Apple (`collectionId`, `collectionName`, `artistName`, `artworkUrl100`,
     `trackCount`) se traducen a `id` (texto), `title`, `author`, `imageUrl` y
     `episodeCount` en UNA sola funcioncita, y `id` sale de `collectionId`.
     Ojo con la foto: Apple manda `artworkUrl100` (100px) y se ve borrosa en una tarjeta de
     72px en pantalla retina. Apple sirve cualquier tamaño con sólo cambiar ese pedacito de
     la URL, así que en el traductor reemplazá `100x100bb` por `200x200bb` (y probalo).
2. Escribí su test JUNTOS, en `src/infrastructure/itunesRepository.test.ts`, simulando la
   respuesta de Apple (no salimos a internet en los tests). Tiene que probar:
   - que la URL pedida es iTunes con `media=podcast` y el `term` correcto;
   - que el `limit` pedido es razonable (25 o menos), no miles de resultados;
   - que los campos de Apple quedan con nuestra forma de `Podcast`;
   - que un resultado sin arte ni cantidad de episodios no rompe nada;
   - que ante un error de red el mensaje que lanza es el de arriba, legible para un usuario.
3. En `src/app/App.tsx`, al abrir la app (usá `useEffect`) buscá el término
   "inteligencia artificial", guardá los resultados en estado y mostrarlos con las tarjetas
   que ya tenemos. Si la búsqueda falla, mostrá el mensaje del error en un párrafo con clase
   `error` (fondo rojizo, texto claro), nunca una página en blanco.
4. El filtro que ya escribimos sigue funcionando sobre lo que bajó: no lo borres.
5. Actualizá `src/app/App.test.tsx`: simulá el `fetch` con una respuesta de iTunes de
   ejemplo (3 resultados) para que los tests no dependan de internet, y agregá un test que
   simule un error de red y pruebe que se ve el mensaje en español.

Importante: NO hagas que la caja dispare una búsqueda nueva al tipear, eso es el paso 6.
Corré `npm test` y pegame el resultado. Al final explicame en 3 líneas qué hiciste.
````

Corré `npm test`: **21 passed** en 4 archivos. Después `npm run dev`: la pantalla se llena
de podcasts reales con sus tapas. Si ves la caja roja de error, no es el fin del mundo:
el camino de error está funcionando; pegale el error completo a la IA.

## Qué mirar después de cada nivel

- `git diff --stat`: ¿cuántos archivos nuevos y cuáles? En la corrida de prueba con este
  mismo pedido salieron 2 nuevos y quedaron modificados `App.tsx`, `App.test.tsx`,
  `SearchInput.tsx` e `index.css`, con `package.json` sin diff.
- **Cómo se llama el archivo nuevo.** En la corrida de prueba creó `iTunesRepository.ts`,
  con la `I` de iTunes en mayúscula; el curso usa `itunesRepository.ts`. Adentro funciona
  igual, pero `git checkout step-05` ya no te junta las piezas y el `git diff` no compara
  nada.
- **Mirá si te agregó un botón**: `git diff app/src/ui/SearchInput.tsx` (desde la raíz
  del repo, no desde `app/` — desde ahí la ruta no existe y no muestra nada). En la corrida
  convirtió la caja en un `<form>` con botón Buscar, o sea hay que apretar Enter para
  buscar. El curso pone el botón en el paso 10.
- **Contá los tests y leé los nombres** (`npm test`): en la corrida pasaron de 15 a 29, y
  entre los nuevos metió `AbortController` para cancelar la búsqueda anterior — nada en los
  tags del curso lo tiene, eso llega en el paso 06/10.
