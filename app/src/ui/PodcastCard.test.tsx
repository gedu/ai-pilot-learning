import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PodcastCard } from './PodcastCard';

const podcast = {
  id: 'fake-1',
  title: 'The AI Daily Brief',
  author: 'Nathaniel Whittemore',
  imageUrl: '/cover-1.svg',
  episodeCount: 900,
};

describe('PodcastCard', () => {
  it('shows the title and the author', () => {
    render(<PodcastCard podcast={podcast} />);

    expect(screen.getByText('The AI Daily Brief')).toBeInTheDocument();
    expect(screen.getByText('Nathaniel Whittemore')).toBeInTheDocument();
  });

  it('shows the cover image with the podcast as its description', () => {
    render(<PodcastCard podcast={podcast} />);

    const cover = screen.getByRole('img', { name: 'Portada de The AI Daily Brief' });
    expect(cover).toHaveAttribute('src', '/cover-1.svg');
  });

  it('shows how many episodes it has', () => {
    render(<PodcastCard podcast={podcast} />);

    expect(screen.getByText('900 episodios')).toBeInTheDocument();
  });

  it('does not crash when the source has no episode count', () => {
    render(<PodcastCard podcast={{ ...podcast, episodeCount: undefined }} />);

    expect(screen.queryByText(/episodios/)).not.toBeInTheDocument();
  });

  // Paso 10: "1 episodios" se lee mal. En español el singular es "episodio".
  it('says "1 episodio", not "1 episodios"', () => {
    render(<PodcastCard podcast={{ ...podcast, episodeCount: 1 }} />);

    expect(screen.getByText('1 episodio')).toBeInTheDocument();
    expect(screen.queryByText('1 episodios')).not.toBeInTheDocument();
  });

  // Paso 10: si la fuente no mandó foto, no mostramos un ícono roto.
  it('falls back to a placeholder when there is no image', () => {
    render(<PodcastCard podcast={{ ...podcast, imageUrl: '' }} />);

    const cover = screen.getByRole('img', { name: 'Portada de The AI Daily Brief' });
    expect(cover).toHaveAttribute('src', '/cover-empty.svg');
  });
});
