import { describe, expect, it } from 'vitest';
import { getBrokenConfig } from './appConfigBroken.example';

/**
 * Este test prueba que el contra-ejemplo ESTÁ MAL. Parece raro, pero es la forma
 * honesta de enseñar el patrón: no te creás mi palabra, mirá la diferencia.
 */
describe('appBrokenConfig (contra-ejemplo, sin el if)', () => {
  it('returns a DIFFERENT instance each time — this is the bug', () => {
    const first = getBrokenConfig();
    const second = getBrokenConfig();

    expect(second).not.toBe(first);
  });

  it('still looks correct if you only compare the data', () => {
    // Dos objetos distintos pueden tener los mismos campos. Por esto un test
    // "ingenuo" (toEqual) no detecta el problema: hay que comparar identidad.
    expect(getBrokenConfig()).toEqual(getBrokenConfig());
  });
});
