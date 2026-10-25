import type { Podcast } from '../domain/Podcast';
import type { PodcastSearchPort } from '../domain/ports/PodcastSearchPort';

/**
 * Datos escritos a mano, con portadas locales (los SVG de `public/`), y un
 * repositorio falso que cumple la misma promesa que iTunes.
 *
 * PASO 03 lo creó como simple arreglo para pintar la lista sin depender de
 * nadie. PASO 08 lo ascendió: ahora también implementa `PodcastSearchPort`, así
 * que es intercambiable con iTunes.
 *
 * La prueba de que la arquitectura hexagonal no es decorativa: para correr la app
 * entera sin internet, en `app/container.ts` cambiás UNA línea…
 *
 *   createSearchPodcasts(itunesPodcastRepository)   // datos reales
 *   createSearchPodcasts(fakePodcastRepository)     // datos locales, sin red
 *
 * …y App.tsx, usePodcastSearch y los componentes no se enteran.
 *
 * Nota honesta: los títulos son de podcasts reales, pero las tapas son dibujos
 * nuestros (los SVG de `public/`); las fotos reales llegan de iTunes en el paso 05.
 */
export const fakePodcasts: Podcast[] = [
  {
    id: 'fake-1',
    title: 'The AI Daily Brief',
    author: 'Nathaniel Whittemore',
    imageUrl: '/cover-1.svg',
    episodeCount: 900,
  },
  {
    id: 'fake-2',
    title: 'Latent Space: The AI Engineer Podcast',
    author: 'Latent.Space',
    imageUrl: '/cover-2.svg',
    episodeCount: 284,
  },
  {
    id: 'fake-3',
    title: 'Practical AI',
    author: 'Daniel Whitenack and Chris Benson',
    imageUrl: '/cover-3.svg',
    episodeCount: 379,
  },
];

export const fakePodcastRepository: PodcastSearchPort = {
  async search(term) {
    // Filtramos acá y no con filterPodcasts a propósito: un adaptador falso tiene
    // que comportarse como el de verdad, o los tests mienten.
    const needle = term.trim().toLowerCase();
    if (needle === '') return [];

    return fakePodcasts.filter((podcast) =>
      `${podcast.title} ${podcast.author}`.toLowerCase().includes(needle),
    );
  },
};
