import { afterEach, describe, expect, it, vi } from 'vitest';
import { fakePodcastRepository } from './fakePodcasts';
import { itunesPodcastRepository } from './itunesRepository';
import type { PodcastSearchPort } from '../domain/ports/PodcastSearchPort';

/**
 * Un mismo test, dos repositorios distintos.
 *
 * Esto es lo que hace intercambiables a los dos: no basta con que tengan la misma
 * firma TypeScript (eso lo chequea el compilador); tienen que PORTARSE igual.
 * Cada vez que agregués un repositorio nuevo (Spotify, un JSON local, el que sea),
 * corré `itBehavesLikeASearchRepository` con él. Si pasa, es intercambiable.
 */
function itBehavesLikeASearchRepository(name: string, given: () => PodcastSearchPort) {
  describe(name, () => {
    it('returns Podcasts with the fields our UI needs', async () => {
      const results = await given().search('ai');

      expect(results.length).toBeGreaterThan(0);
      for (const podcast of results) {
        expect(typeof podcast.id).toBe('string');
        expect(typeof podcast.title).toBe('string');
        expect(typeof podcast.author).toBe('string');
        expect(typeof podcast.imageUrl).toBe('string');
      }
    });

    it('only returns things that match the term', async () => {
      const results = await given().search('zzzz-no-existe-nada-así');

      expect(results).toEqual([]);
    });
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

itBehavesLikeASearchRepository('fakePodcastRepository', () => fakePodcastRepository);

itBehavesLikeASearchRepository('itunesPodcastRepository', () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (request: RequestInfo | URL) => {
      const term = new URL(String(request)).searchParams.get('term') ?? '';
      const matches =
        term === 'ai'
          ? [
              {
                collectionId: 1406537385,
                collectionName: 'Practical AI',
                artistName: 'Daniel Whitenack',
                artworkUrl100: 'https://example.com/c/100x100bb.jpg',
                trackCount: 379,
              },
            ]
          : [];

      return new Response(JSON.stringify({ resultCount: matches.length, results: matches }));
    }),
  );

  return itunesPodcastRepository;
});
