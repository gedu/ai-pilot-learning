/**
 * La configuración de la app, en un solo lugar, como UNA sola instancia.
 *
 * PASO 07. Antes la URL de iTunes estaba dura y adentro de itunesRepository.ts. Ahora
 * vive acá, y quien la necesita la pide.
 *
 * ┌──────────────────────────────────────────────────────────┐
 * │  getAppConfig()                                          │
 * │      │                                                   │
 * │      ▼                                                   │
 * │  ¿ya existe `instance`? ── sí ──▶ la devuelvo (rápido)   │
 * │      │                                                   │
 * │      no                                                  │
 * │      ▼                                                   │
 * │  la creo UNA vez, la guardo en `instance`                │
 * │      │                                                   │
 * │      └──────────▶ devuelvo ESA MISMA instancia           │
 * └──────────────────────────────────────────────────────────┘
 *
 * Las dos flechas de salida devuelven el mismo objeto. Eso es lo que asegura el
 * test `expect(second).toBe(first)`. Sin el `if`, cada llamada crea una nueva y
 * el test se cae. Para ver esa versión mal escrita a propósito, leé appConfigBroken.example.ts.
 */

export interface AppConfig {
  /** Dónde busca podcasts la app. Si mañana cambiamos de API, se cambia acá y solo acá. */
  readonly itunesSearchUrl: string;
  /** Cuántos resultados pedimos. Un número mágico menos suelto por ahí. */
  readonly searchResultLimit: number;
}

/** La única instancia que va a existir. Empieza en `undefined`: todavía no la pidieron. */
let instance: AppConfig | undefined;

export function getAppConfig(): AppConfig {
  // Este `if` ES el patrón. Sacalo y tenés otra cosa (y peor):
  // ver appConfigBroken.example.ts, que es este mismo archivo sin el `if`.
  if (instance === undefined) {
    instance = Object.freeze({
      itunesSearchUrl: 'https://itunes.apple.com/search',
      searchResultLimit: 20,
    });
  }

  return instance;
}
