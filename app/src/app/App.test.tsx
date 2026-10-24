import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('shows the app name so we know the page is alive', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'Pod Search' }),
    ).toBeInTheDocument();
  });

  // Paso 02: la home ya muestra dónde se busca, aunque todavía no busque nada.
  it('shows a search box the user can type into', () => {
    render(<App />);

    const box = screen.getByRole('textbox', { name: 'Buscar podcasts' });
    expect(box).toBeInTheDocument();
    expect(box).toHaveAttribute('placeholder', 'ej: inteligencia artificial');
  });

  // Paso 03: la lista ya se pinta, con datos mock escritos a mano.
  it('lists the mock podcasts', () => {
    render(<App />);

    expect(screen.getByText('The AI Daily Brief')).toBeInTheDocument();
    expect(screen.getByText('Practical AI')).toBeInTheDocument();
  });

  it('labels the results so a screen reader knows what the list is', () => {
    render(<App />);

    expect(screen.getByRole('list', { name: 'Resultados' })).toBeInTheDocument();
  });

  // Paso 04: la caja ya filtra la lista, usando la función pura que testeamos
  // aparte en application/filterPodcasts.test.ts.
  it('filters the list as the user types', async () => {
    render(<App />);
    const user = await import('@testing-library/user-event').then((m) =>
      m.userEvent.setup(),
    );

    await user.type(
      screen.getByRole('textbox', { name: 'Buscar podcasts' }),
      'practical',
    );

    expect(screen.getByText('Practical AI')).toBeInTheDocument();
    expect(screen.queryByText('The AI Daily Brief')).not.toBeInTheDocument();
  });
});
