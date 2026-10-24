import { createSearchPodcasts } from '../application/searchPodcasts';
import { itunesPodcastRepository } from '../infrastructure/itunesRepository';

/**
 * El "punto de ensamble" (composition root). Acá, y sólo acá, se conocen por
 * nombre la lógica y el mundo de afuera.
 *
 * PASO 08: el día que quieras cambiar iTunes por Spotify, por los datos locales o
 * por la API de tu empresa, se cambia UNA línea acá y App.tsx no se entera:
 *
 *   createSearchPodcasts(itunesPodcastRepository)  // datos reales (así está)
 *   createSearchPodcasts(fakePodcastRepository)    // datos locales, sin internet
 *
 * Todo lo que está "aguas abajo" de esta línea recibe `searchPodcasts` ya armado.
 */
export const searchPodcasts = createSearchPodcasts(itunesPodcastRepository);
