import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from './App';

/**
 * Simulamos iTunes en los tests: corren sin internet y podemos inventar
 * respuestas que a Apple no le pediríamos (cero resultados, por ejemplo).
 *
 * Ojo con `forTerm`: el fixture mira el término y responde sólo lo que coincide,
 * como hace iTunes de verdad, salvo por el término inicial — que siempre devuelve
 * el catálogo para que la app arranque con algo en pantalla. Si respondiera
 * siempre lo mismo, un test de búsqueda podría pasar sin que la búsqueda exista.
 */
const INITIAL_TERM = 'inteligencia artificial';

const CATALOG = [
  {
    collectionId: 1,
    collectionName: 'The AI Daily Brief',
    artistName: 'Nathaniel Whittemore',
    artworkUrl100: 'https://example.com/a/100x100bb.jpg',
    trackCount: 1,
  },
  {
    collectionId: 2,
    collectionName: 'Latent Space',
    artistName: 'Latent.Space',
    artworkUrl100: '',
    trackCount: 284,
  },
];

function forTerm(term: string): unknown[] {
  if (term === INITIAL_TERM) return CATALOG;

  return CATALOG.filter((item) =>
    item.collectionName.toLowerCase().includes(term.toLowerCase()),
  );
}

function stubITunes(responder: (term: string) => unknown[] = forTerm) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (request: RequestInfo | URL) => {
      const term = new URL(String(request)).searchParams.get('term') ?? '';
      const results = responder(term);

      return new Response(JSON.stringify({ resultCount: results.length, results }));
    }),
  );
}

function box() {
  return screen.getByRole('textbox', { name: 'Buscar podcasts' });
}

/** Escribe un término nuevo, esperando primero a que la app tenga resultados. */
async function type(term: string) {
  const { userEvent } = await import('@testing-library/user-event');
  const user = userEvent.setup();
  await screen.findByText('The AI Daily Brief');
  await user.clear(box());
  // user.type(el, '') revienta: "escribir nada" no es escribir.
  if (term !== '') await user.type(box(), term);

  return user;
}

beforeEach(() => {
  stubITunes();
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

    expect(box()).toBeInTheDocument();
    expect(box()).toHaveAttribute('placeholder', 'ej: inteligencia artificial');
  });

  // La lista sólo existe cuando hay resultados (paso 10); con la lista vacía no
  // hay nada que anunciar. Por eso el test espera a que lleguen.
  it('labels the results so a screen reader knows what the list is', async () => {
    render(<App />);

    await screen.findByText('The AI Daily Brief');
    expect(screen.getByRole('list', { name: 'Resultados' })).toBeInTheDocument();
  });

  // Paso 05: la lista llega de a poco (es asíncrona), hay que esperarla.
  it('lists the podcasts that came back from iTunes', async () => {
    render(<App />);

    expect(await screen.findByText('The AI Daily Brief')).toBeInTheDocument();
  });

  // Paso 06: escribir dispara una búsqueda nueva, no un filtro local.
  it('searches iTunes for what the user types', async () => {
    render(<App />);
    await type('Latent');

    expect(await screen.findByText('Latent Space')).toBeInTheDocument();
    expect(screen.queryByText('The AI Daily Brief')).not.toBeInTheDocument();
  });

  // iTunes coincide de forma laxa: puede traer algo cuyo título no tiene el término.
  // Esos resultados NO se pueden esconder por filtrar de más en la pantalla.
  it('keeps loose iTunes matches on screen', async () => {
    stubITunes((term) =>
      term === 'ia'
        ? [{ ...CATALOG[1], collectionName: 'Latent Space: el futuro' }]
        : forTerm(term),
    );
    render(<App />);
    await type('ia');

    expect(await screen.findByText('Latent Space: el futuro')).toBeInTheDocument();
  });

  // Paso 10: iTunes no encontró nada -> hay que DECIRLO. Una pantalla en blanco se
  // confunde con "se rompió" (lo vimos al cambiar el container a los datos locales).
  it('tells the user when the search found nothing', async () => {
    stubITunes((term) => (term === INITIAL_TERM ? CATALOG : []));
    render(<App />);
    await type('zzz-inexistente');

    expect(await screen.findByText(/No encontramos nada/)).toBeInTheDocument();
    expect(screen.queryByRole('list', { name: 'Resultados' })).not.toBeInTheDocument();
  });

  // Paso 10: limpiar la caja muestra otra cosa y NO gasta una llamada a iTunes.
  it('asks for a term when the box is empty, and does not call iTunes', async () => {
    render(<App />);
    await type('');

    expect(await screen.findByText('Escribí algo para empezar a buscar.')).toBeInTheDocument();
    // Y no mostramos los resultados de la búsqueda anterior al mismo tiempo:
    // "escribí algo" + resultados viejos es una pantalla que se contradice.
    expect(screen.queryByRole('list', { name: 'Resultados' })).not.toBeInTheDocument();

    const termsAsked = vi
      .mocked(fetch)
      .mock.calls.map(([request]) => new URL(String(request)).searchParams.get('term'));
    expect(termsAsked).not.toContain('');
  });

  // Paso 10: Enter busca YA, sin esperar los 300ms del debounce.
  //
  // Acá usamos timers falsos y fireEvent a propósito, y no es capricho: con
  // timers reales este test pasa TAMBIÉN SI ENTER NO HACE NADA, porque mientras
  // expectations y renders se acomodan pasan los 300ms igual. Un test que no
  // puede fallar no prueba nada. Con el reloj en la mano, preguntamos "¿a los
  // 50ms ya se pidió 'Latent'?" — y la respuesta sólo es sí si Enter apuró de verdad.
  it('searches immediately on Enter, without waiting for the debounce', () => {
    vi.useFakeTimers();
    stubITunes();
    render(<App />);

    fireEvent.change(box(), { target: { value: 'Latent' } });
    fireEvent.submit(screen.getByRole('button', { name: 'Buscar' }));

    act(() => {
      vi.advanceTimersByTime(50);
    });

    const termsAsked = vi
      .mocked(fetch)
      .mock.calls.map(([request]) => new URL(String(request)).searchParams.get('term'));

    vi.useRealTimers();

    expect(termsAsked).toContain('Latent');
  });

  // Paso 10: mientras busca, el usuario sabe que está esperando (y no se colgó).
  it('shows that it is searching while the results are not there yet', async () => {
    let release: () => void = () => {};
    vi.stubGlobal(
      'fetch',
      vi.fn(
        () =>
          new Promise<Response>((resolve) => {
            release = () =>
              resolve(new Response(JSON.stringify({ resultCount: 0, results: [] })));
          }),
      ),
    );
    render(<App />);

    expect(await screen.findByText('Buscando…')).toBeInTheDocument();
    release();
  });

  // Paso 05/10: si iTunes falla, el mensaje es en criollo y con botón para reintentar.
  it('shows a readable error with a retry when iTunes cannot be reached', async () => {
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
    expect(screen.getByRole('button', { name: 'Reintentar' })).toBeInTheDocument();
  });

  it('searches again when the user clicks Reintentar', async () => {
    let failing = true;
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        if (failing) throw new TypeError('Failed to fetch');

        return new Response(JSON.stringify({ resultCount: CATALOG.length, results: CATALOG }));
      }),
    );
    render(<App />);

    const { userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    const retry = await screen.findByRole('button', { name: 'Reintentar' });

    failing = false;
    await user.click(retry);

    expect(await screen.findByText('The AI Daily Brief')).toBeInTheDocument();
  });
});
