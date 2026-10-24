import type { Podcast } from '../domain/Podcast';

/**
 * Deja sólo los podcasts que coinciden con el término, mirando título y autor.
 *
 * Función pura (capítulo 01 del libro, "pensar en pieces chicos"): recibe datos,
 * devuelve datos, no toca nada afuera. Por eso se testea sin browser, sin React y
 * sin red, en 2 milisegundos.
 */
export function filterPodcasts(podcasts: Podcast[], term: string): Podcast[] {
  const needle = normalize(term.trim());
  if (needle === '') return podcasts;

  return podcasts.filter(
    (podcast) =>
      normalize(podcast.title).includes(needle) ||
      normalize(podcast.author).includes(needle),
  );
}

/**
 * "MINTELIGENCIA" y "inteligencia" tienen que encontrar lo mismo, y en español las
 * tildes tampoco pueden estorbar: "diseno" tiene que encontrar a "Diseño".
 * normalize('NFD') separa la letra de la tilde y la borramos con el regex.
 */
function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}
