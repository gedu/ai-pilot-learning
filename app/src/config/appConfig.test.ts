import { describe, expect, it } from 'vitest';
import { getAppConfig } from './appConfig';

/**
 * Éstos son LOS tests del patrón. No prueban que la app "funcione": prueban que
 * la config es un singleton de verdad. Son los que fallan si a la IA se le ocurre
 * escribir el `new` sin el `if`.
 */
describe('appConfig (singleton)', () => {
  it('gives the exact same instance on every call', () => {
    const first = getAppConfig();
    const second = getAppConfig();

    // `toBe` compara identidad: misma cosa en memoria, no dos objetos parecidos.
    expect(second).toBe(first);
  });

  it('gives the same instance to whoever asks, in any order', () => {
    const a = getAppConfig();
    const b = getAppConfig();
    const c = getAppConfig();

    expect(a).toBe(b);
    expect(b).toBe(c);
  });

  it('cannot be tampered with, because everyone shares it', () => {
    const config = getAppConfig();

    // Una instancia compartida es un objetivo grande: si alguien la modifica, la
    // rompe para toda la app. Object.freeze hace que intentarlo falle en vez de
    // corromper en silencio.
    expect(() => {
      (config as { itunesSearchUrl: string }).itunesSearchUrl = 'https://evil.example';
    }).toThrow();

    expect(getAppConfig().itunesSearchUrl).toBe('https://itunes.apple.com/search');
  });

  it('holds the iTunes URL we actually use', () => {
    expect(getAppConfig().itunesSearchUrl).toBe('https://itunes.apple.com/search');
  });
});
