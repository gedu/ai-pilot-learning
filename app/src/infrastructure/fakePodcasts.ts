import type { Podcast } from '../domain/Podcast';

/**
 * Datos falsos escritos a mano, con portadas locales (los SVG de `public/`).
 *
 * El paso 03 existe para ver la lista renderizada SIN depender de ninguna API ni
 * de internet: si esto anda y el paso 05 no, el problema es el fetch, no la pantalla.
 *
 * Nota honesta: los títulos son de podcasts reales, pero las tapas son dibujos
 * nuestros. En el paso 05 las fotos reales llegan de iTunes.
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
