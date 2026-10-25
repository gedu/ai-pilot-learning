import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useDebouncedValue } from './useDebouncedValue';

describe('useDebouncedValue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not follow the value until the delay has passed', () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 300), {
      initialProps: { value: 'a' },
    });

    rerender({ value: 'ai' });
    expect(result.current[0]).toBe('a');

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current[0]).toBe('ai');
  });

  it('counts from the LAST change, not from the first one', () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 300), {
      initialProps: { value: '' },
    });

    // El usuario escribe "iai": tres cambios seguidos, la última letra manda.
    rerender({ value: 'i' });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    rerender({ value: 'ia' });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    // Acá se ve la limpieza del timer: pasaron 400ms desde la primera tecla, así
    // que sin `clearTimeout` la primera ya se habría propagado ('i'). Con cleanup,
    // el reloj de la tecla anterior se tiró abajo y todavía no se propagó nada.
    expect(result.current).toEqual(['', expect.any(Function)]);
    rerender({ value: 'iai' });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current[0]).toBe('iai');
  });

  it('searchNow() skips the wait entirely', () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 300), {
      initialProps: { value: '' },
    });

    rerender({ value: 'react native' });
    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe('react native');
  });

  it('works again on a SECOND Enter, not only the first one', () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 300), {
      initialProps: { value: '' },
    });

    rerender({ value: 'ia' });
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe('ia');

    rerender({ value: 'ai' });
    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe('ai');
  });
});
