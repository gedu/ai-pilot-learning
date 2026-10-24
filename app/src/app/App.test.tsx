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

  it('tells the user nothing was searched yet', () => {
    render(<App />);

    expect(
      screen.getByText('Escribí algo arriba para empezar a buscar.'),
    ).toBeInTheDocument();
  });
});
