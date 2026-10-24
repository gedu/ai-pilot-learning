import { describe, expect, it } from 'vitest';
import { createSearchPodcasts } from './searchPodcasts';
import type { Podcast } from '../domain/Podcast';
import type { PodcastSearchPort } from '../domain/ports/PodcastSearchPort';

/**
 * Falso repo escrito en 5 líneas. Este test es la PRUEBA de que la arquitectura
 * hexagonal sirvió para algo: buscamos en una fuente falsa sin tocar `fetch`,
 * sin simular internet, sin React.
 *
 * Antes del paso 08 había que simular la red global (mirá App.test.tsx, paso 05)
 * para probar lo mismo. Ahora el mundo de afuera entra por un parámetro.
 */
function fakeRepository(returned: Podcast[]): PodcastSearchPort & { calls: string[] } {
  const calls: string[] = [];

  return {
    calls,
    async search(term) {
      calls.push(term);
      return returned;
    },
  };
}

const found: Podcast = {
  id: '1',
  title: 'Practical AI',
  author: 'Changelog Media',
  imageUrl: '/cover-3.svg',
};

describe('searchPodcasts (caso de uso)', () => {
  it('asks the repository for the trimmed term', async () => {
    const repo = fakeRepository([found]);

    await createSearchPodcasts(repo)('   inteligencia   ');

    expect(repo.calls).toEqual(['inteligencia']);
  });

  it('returns whatever the repository gives back, untouched', async () => {
    const repo = fakeRepository([found]);

    expect(await createSearchPodcasts(repo)('ai')).toEqual([found]);
  });

  it('does not bother the repository with an empty search', async () => {
    const repo = fakeRepository([found]);

    const results = await createSearchPodcasts(repo)('   ');

    expect(results).toEqual([]);
    expect(repo.calls).toEqual([]);
  });

  it('lets repository errors bubble up so the UI can show them', async () => {
    const repo: PodcastSearchPort = {
      async search() {
        throw new Error('No se pudo buscar en iTunes. Revisá tu conexión.');
      },
    };

    await expect(createSearchPodcasts(repo)('ai')).rejects.toThrow('Revisá tu conexión');
  });
});
