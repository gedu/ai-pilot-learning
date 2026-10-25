import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { searchITunesPodcasts } from './itunesRepository';

/**
 * Simulamos la respuesta real de iTunes (recortada). Así el test corre sin
 * internet y siempre igual: si Apple cambia sus campos, el test lo avisa antes
 * de que lo vea el usuario.
 */
const itunesResponse = {
  resultCount: 2,
  results: [
    {
      collectionId: 1680633614,
      collectionName: 'The AI Daily Brief',
      artistName: 'Nathaniel Whittemore',
      artworkUrl100: 'https://example.com/a/100x100bb.jpg',
      trackCount: 1120,
    },
    {
      collectionId: 1406537385,
      collectionName: 'Practical AI',
      artistName: 'Daniel Whitenack',
      artworkUrl100: 'https://example.com/b/100x100bb.jpg',
      trackCount: 379,
    },
  ],
};

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => new Response(JSON.stringify(itunesResponse), {
      headers: { 'content-type': 'application/json' },
    })),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('searchITunesPodcasts', () => {
  it('asks iTunes for podcasts matching the term', async () => {
    await searchITunesPodcasts('inteligencia artificial');

    const url = new URL(vi.mocked(fetch).mock.calls[0][0] as string);
    expect(url.origin + url.pathname).toBe('https://itunes.apple.com/search');
    expect(url.searchParams.get('media')).toBe('podcast');
    expect(url.searchParams.get('term')).toBe('inteligencia artificial');
  });

  it('asks for exactly the limit our config says', async () => {
    await searchITunesPodcasts('ai');

    // `<= 25` era una cuenta floja: pasaba aunque el parámetro quedara vacío.
    const url = new URL(vi.mocked(fetch).mock.calls[0][0] as string);
    expect(url.searchParams.get('limit')).toBe('20');
  });

  it('turns Apple fields into our own Podcast shape', async () => {
    const results = await searchITunesPodcasts('ai');

    expect(results[0]).toEqual({
      id: '1680633614',
      title: 'The AI Daily Brief',
      author: 'Nathaniel Whittemore',
      // 100x100 se ve borroso en una tarjeta de 72px en pantalla retina: pedimos 200.
      imageUrl: 'https://example.com/a/200x200bb.jpg',
      episodeCount: 1120,
    });
  });

  it('does not break when a result has no artwork or no episode count', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        new Response(
          JSON.stringify({
            resultCount: 1,
            results: [{ collectionId: 1, collectionName: 'Sin arte', artistName: 'Alguien' }],
          }),
        ),
      ),
    );

    const results = await searchITunesPodcasts('ai');

    expect(results).toEqual([
      {
        id: '1',
        title: 'Sin arte',
        author: 'Alguien',
        imageUrl: '',
        episodeCount: undefined,
      },
    ]);
  });

  it('fails with a readable message when the network fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new TypeError('Failed to fetch');
      }),
    );

    await expect(searchITunesPodcasts('ai')).rejects.toThrow(
      'No se pudo buscar en iTunes. Revisá tu conexión.',
    );
  });

  it('fails with the status code when iTunes answers with an error', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('boom', { status: 503 })));

    // Error de red y error de servidor son caminos distintos del código; este es
    // el del `if (!response.ok)`, que un error de red nunca pisa.
    await expect(searchITunesPodcasts('ai')).rejects.toThrow('iTunes respondió mal (503).');
  });
});
