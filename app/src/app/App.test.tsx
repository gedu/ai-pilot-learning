import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from './App';

/**
 * Paso 05: la lista ahora se busca en iTunes, así que en los tests simulamos la
 * respuesta. Sin esto, los tests dependerían de internet y de que Apple no cambie.
 */
const itunesFixture = {
  resultCount: 3,
  results: [
    {
      collectionId: 1,
      collectionName: 'The AI Daily Brief',
      artistName: 'Nathaniel Whittemore',
      artworkUrl100: 'https://example.com/a/100x100bb.jpg',
      trackCount: 1120,
    },
    {
      collectionId: 2,
      collectionName: 'Latent Space',
      artistName: 'Latent.Space',
      artworkUrl100: 'https://example.com/b/100x100bb.jpg',
      trackCount: 284,
    },
    {
      collectionId: 3,
      collectionName: 'Practical AI',
      artistName: 'Daniel Whitenack',
      artworkUrl100: 'https://example.com/c/100x100bb.jpg',
      trackCount: 379,
    },
  ],
};

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => new Response(JSON.stringify(itunesFixture))),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('App', () => {
  it('shows the app name so we know the page is alive', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'Pod Search' }),
    ).toBeInTheDocument();
  });

  it('shows a search box the user can type into', () => {
    render(<App />);

    const box = screen.getByRole('textbox', { name: 'Buscar podcasts' });
    expect(box).toBeInTheDocument();
    expect(box).toHaveAttribute('placeholder', 'ej: inteligencia artificial');
  });

  it('labels the results so a screen reader knows what the list is', () => {
    render(<App />);

    expect(screen.getByRole('list', { name: 'Resultados' })).toBeInTheDocument();
  });

  // Paso 05: la lista llega de a poco (es asíncrona), hay que esperarla.
  it('lists the podcasts that came back from iTunes', async () => {
    render(<App />);

    expect(await screen.findByText('The AI Daily Brief')).toBeInTheDocument();
    expect(screen.getByText('Practical AI')).toBeInTheDocument();
  });

  // Paso 04: la caja filtra lo que ya tenemos en pantalla.
  it('filters the loaded list as the user types', async () => {
    const { userEvent } = await import('@testing-library/user-event');
    render(<App />);
    const user = userEvent.setup();

    await screen.findByText('The AI Daily Brief');
    await user.type(
      screen.getByRole('textbox', { name: 'Buscar podcasts' }),
      'practical',
    );

    expect(screen.getByText('Practical AI')).toBeInTheDocument();
    expect(screen.queryByText('The AI Daily Brief')).not.toBeInTheDocument();
  });

  // Paso 05: si iTunes falla, el usuario se entera en criollo, no con una página rota.
  it('shows a readable error when iTunes cannot be reached', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new TypeError('Failed to fetch');
      }),
    );
    render(<App />);

    expect(
      await screen.findByText('No se pudo buscar en iTunes. Revisá tu conexión.'),
    ).toBeInTheDocument();
  });
});
