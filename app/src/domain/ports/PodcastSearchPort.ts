import type { Podcast } from '../Podcast';

/**
 * El PUERTO (capítulo 03 del libro, hexagonal): una promesa, no una implementación.
 *
 * Dice "necesito algo que sepa buscar podcasts y me devuelva Podcast[]". No dice
 * dónde, ni cómo, ni con qué URL. iTunes es una respuesta posible a esta promesa;
 * los datos mock de `infrastructure/fakePodcasts.ts` son otra.
 *
 * La dirección de la flecha importa: la lógica de negocio apunta a esta interfaz,
 * y la implementación apunta a esta interfaz. Nadie conoce a nadie por nombre.
 *
 *        UI  ──▶  caso de uso  ──▶  PodcastSearchPort  ◀──  iTunesRepository
 *                                                       ◀──  fakeRepository (tests)
 */
export interface PodcastSearchPort {
  search(term: string): Promise<Podcast[]>;
}
