/**
 * ⚠️ CONTRA-EJEMPLO — así NO. Este archivo no se usa en la app; existe para leerlo
 * y para que su test demuestre que está mal.
 *
 * Parece el singleton. Se llama igual, guarda una variable afuera, todo bonito.
 * Pero le falta el `if`: crea una instancia NUEVA en cada llamada.
 *
 * ┌────────────────────────────────────────────┐
 * │  getBrokenConfig()                         │
 * │      │                                     │
 * │      ▼                                     │
 * │  la creo SIEMPRE, sin preguntar            │
 * │      │                                     │
 * │      ▼                                     │
 * │  devuelvo un objeto NUEVO (distinto)       │
 * └────────────────────────────────────────────┘
 *
 * Y como "andar igual" no se nota en la pantalla —la app funciona, la búsqueda
 * funciona— es exactamente el tipo de error que nadie ve hasta que dos partes de
 * la app leen configuraciones distintas. Por eso se testea, no se mira.
 */

export interface AppConfig {
  readonly itunesSearchUrl: string;
  readonly searchResultLimit: number;
}

export function getBrokenConfig(): AppConfig {
  // Acá debería haber un `if (instance === undefined) {` y una variable donde
  // guardar el resultado. Sin eso, no hay singleton: hay una fábrica.
  return Object.freeze({
    itunesSearchUrl: 'https://itunes.apple.com/search',
    searchResultLimit: 20,
  });
}
