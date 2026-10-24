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
    expect(result.current).toBe('a');

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe('ai');
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
    rerender({ value: 'iai' });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('iai');
  });
});
