/**
 * El modelo de dominio: qué es "un podcast" para nosotros.
 *
 * Paso 03: lo inventamos acá a mano con datos mock.
 * Paso 05: iTunes nos va a devolver esto mismo (otro nombre de campos, lo adaptamos allá).
 *          El dominio NO cambia cuando cambia la fuente de datos. Eso es la idea del paso 08.
 */
export interface Podcast {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  /** Cantidad de episodios, si la fuente la conoce. */
  episodeCount?: number;
}
