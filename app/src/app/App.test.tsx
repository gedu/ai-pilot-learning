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
});
