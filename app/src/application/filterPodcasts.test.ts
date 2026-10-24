import { describe, expect, it } from 'vitest';
import { filterPodcasts } from './filterPodcasts';
import type { Podcast } from '../domain/Podcast';

const ai: Podcast = {
  id: '1',
  title: 'The AI Daily Brief',
  author: 'Nathaniel Whittemore',
  imageUrl: '/cover-1.svg',
};

const design: Podcast = {
  id: '2',
  title: 'Design Better',
  author: 'Design Better',
  imageUrl: '/cover-2.svg',
};

describe('filterPodcasts', () => {
  it('keeps everything when there is no search term', () => {
    expect(filterPodcasts([ai, design], '')).toEqual([ai, design]);
  });

  // Un término de sólo espacios cuenta como "sin término": el usuario borró la
  // caja y quedó un espacio. Filtrar por '   ' no tiene que dejar la lista vacía.
  it('keeps everything when the term is only spaces', () => {
    expect(filterPodcasts([ai, design], '   ')).toEqual([ai, design]);
  });

  it('keeps the podcast whose title matches the term', () => {
    expect(filterPodcasts([ai, design], 'daily')).toEqual([ai]);
  });

  it('matches the author too, not only the title', () => {
    expect(filterPodcasts([ai, design], 'whittemore')).toEqual([ai]);
  });

  it('ignores uppercase vs lowercase', () => {
    expect(filterPodcasts([ai, design], 'DAILY')).toEqual([ai]);
  });

  it('accents do not matter: "diseno" finds "Diseño"', () => {
    const diseno: Podcast = {
      ...design,
      title: 'Diseño y Tecnología',
    };

    expect(filterPodcasts([diseno], 'diseno')).toEqual([diseno]);
  });

  it('returns nothing when nothing matches', () => {
    expect(filterPodcasts([ai, design], 'futbol')).toEqual([]);
  });
});
