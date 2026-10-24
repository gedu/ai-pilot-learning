import type { Podcast } from '../domain/Podcast';

/**
 * Busca podcasts reales en la iTunes Search API.
 *
 * Paso 05: acá vive la URL, dura y fea. En el paso 07 la movemos a un archivo de
 *          config y esto pasa a leerla de ahí.
 *
 * La API es gratis, sin API key, y responde con `Access-Control-Allow-Origin: *`,
 * así que el browser la puede llamar directo: no hace falta backend ni proxy.
 */
const ITUNES_SEARCH_URL = 'https://itunes.apple.com/search';

/** La respuesta de Apple viene con sus propios nombres de campo; los traducimos acá. */
interface ITunesResult {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl100?: string;
  trackCount?: number;
}

export async function searchITunesPodcasts(term: string): Promise<Podcast[]> {
  const url = new URL(ITUNES_SEARCH_URL);
  url.searchParams.set('media', 'podcast');
  url.searchParams.set('term', term);
  url.searchParams.set('limit', '20');

  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    // Un error de red trae un mensaje en inglés técnico del navegador; al usuario le
    // decimos qué hacer en su idioma.
    throw new Error('No se pudo buscar en iTunes. Revisá tu conexión.');
  }

  if (!response.ok) {
    throw new Error(`iTunes respondió mal (${response.status}).`);
  }

  const body = (await response.json()) as { results: ITunesResult[] };

  return body.results.map(toPodcast);
}

/** Un traductor chiquito: campos de Apple -> nuestro modelo. Nada más. */
function toPodcast(result: ITunesResult): Podcast {
  return {
    id: String(result.collectionId),
    title: result.collectionName,
    author: result.artistName,
    // La API da una foto de 100px; en una tarjeta de 72px en pantalla retina se ve
    // borrosa, y Apple sirve cualquier tamaño con sólo cambiar esa parte de la URL.
    imageUrl: (result.artworkUrl100 ?? '').replace('100x100bb', '200x200bb'),
    episodeCount: result.trackCount,
  };
}
