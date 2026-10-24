import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from './App';

/**
 * Simulamos iTunes en los tests: así corren sin internet y podemos inventar
 * respuestas que a Apple no le pediríamos a propósito (una búsqueda vacía, un
 * resultado "flojo", etc).
 *
 * Ojo: el fixture mira el término pedido y responde sólo lo que coincide, como
 * hace iTunes de verdad. Si respondiera siempre lo mismo, un test de búsqueda
 * podría pasar sin que la búsqueda exista.
 */
const CATALOG = [
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
];

function stubITunes(responder?: (term: string) => unknown[]) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (request: RequestInfo | URL) => {
      const term = new URL(String(request)).searchParams.get('term') ?? '';
      const results =
        responder?.(term) ??
        CATALOG.filter((item) =>
          `${item.collectionName} ${item.artistName}`
            .toLowerCase()
            .includes(term.toLowerCase()),
        );

      return new Response(JSON.stringify({ resultCount: results.length, results }));
    }),
  );
}

beforeEach(() => {
  // El término inicial de la app es "inteligencia artificial"; para ese término
  // simulamos que iTunes nos devuelve los tres.
  stubITunes(() => CATALOG);
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

  // Paso 06: escribir dispara una búsqueda nueva en iTunes, no un filtro local.
  it('searches iTunes for what the user types', async () => {
    const { userEvent } = await import('@testing-library/user-event');
    render(<App />);
    const user = userEvent.setup();
    const box = screen.getByRole('textbox', { name: 'Buscar podcasts' });

    await screen.findByText('The AI Daily Brief');
    await user.clear(box);
    await user.type(box, 'practical');

    expect(await screen.findByText('Practical AI')).toBeInTheDocument();
    expect(screen.queryByText('The AI Daily Brief')).not.toBeInTheDocument();
  });

  // iTunes coincide de forma laxa: puede traer algo cuyo título no tiene el término.
  // Esos resultados NO se pueden esconder por filtrar localmente de más.
  it('keeps loose iTunes matches on screen', async () => {
    stubITunes((term) =>
      term === 'ia'
        ? [{ ...CATALOG[1], collectionName: 'Latent Space: el futuro' }]
        : CATALOG,
    );
    const { userEvent } = await import('@testing-library/user-event');
    render(<App />);
    const user = userEvent.setup();

    await screen.findByText('The AI Daily Brief');
    await user.clear(box());
    await user.type(box(), 'ia');

    expect(await screen.findByText('Latent Space: el futuro')).toBeInTheDocument();
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

function box() {
  return screen.getByRole('textbox', { name: 'Buscar podcasts' });
}
