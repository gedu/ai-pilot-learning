import type { Podcast } from '../domain/Podcast';
import type { PodcastSearchPort } from '../domain/ports/PodcastSearchPort';

/**
 * El CASO DE USO: "buscar podcasts". Vive en el medio del sándwich y recibe su
 * dependencia por parámetro.
 *
 * PASO 08 (hexagonal). Antes de este paso, App.tsx llamaba a
 * `searchITunesPodcasts` directamente: la pantalla conocía a iTunes por nombre, y
 * cambiar iTunes por otra cosa implicaba tocar la UI. Ahora:
 *
 *   - App.tsx sabe que existe "una cosa que busca podcasts" (el puerto).
 *   - iTunesRepository es quien cumple esa promesa, elegido afuera (en app/container.ts).
 *
 * Beneficio que ya podés tocar: `searchPodcasts.test.ts` prueba toda esta lógica
 * con un objeto falso de 5 líneas, sin red y sin browser.
 */
export function createSearchPodcasts(repository: PodcastSearchPort) {
  return async function searchPodcasts(term: string): Promise<Podcast[]> {
    const trimmed = term.trim();

    // Regla de negocio pura: buscar "  " no es buscar nada, y no gastamos una
    // llamada de red por ella. Acá — y no en la UI — es donde vive esta decisión.
    if (trimmed === '') return [];

    return repository.search(trimmed);
  };
}
