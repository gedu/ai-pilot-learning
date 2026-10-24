Copiá esto y pegalo tal cual en tu IA:

```
Necesito que saques la URL de iTunes que está escrita a mano adentro de
src/infrastructure/itunesRepository.ts y la pongas en un archivo de configuración, usando
el patrón SINGLETON de forma explícita. Escribí el código y los tests juntos.

Archivos a crear:

1. `src/config/appConfig.ts`
   - Exportá una interfaz `AppConfig` con dos campos `readonly`: `itunesSearchUrl: string`
     y `searchResultLimit: number`.
   - Declará una variable de módulo `let instance: AppConfig | undefined;`
   - Exportá una función `getAppConfig(): AppConfig` que haga EXACTAMENTE este flujo:
     a) SI `instance === undefined`, recién ahí creo el objeto
        `Object.freeze({ itunesSearchUrl: 'https://itunes.apple.com/search', searchResultLimit: 20 })`
        y lo guardo en `instance`.
     b) Si ya existe, NO creo nada.
     c) Devuelvo `instance`.
   - Ese `if` es la parte más importante del pedido. NO lo saques, NO lo cambies por una
     constante exportada, NO lo conviertas en una función que siempre devuelve un objeto
     nuevo. Si tenés duda, dejá el `if` y comentá por qué está.

2. `src/config/appConfig.test.ts` (Vitest), con estos tests:
   - `const first = getAppConfig(); const second = getAppConfig();` y
     `expect(second).toBe(first)`. Usá `toBe`, que compara IDENTIDAD (el mismo objeto en
     memoria), no `toEqual`, que sólo compara que los datos se parezcan.
   - Tres llamadas seguidas y las tres devuelven la misma instancia.
   - Que la config no se pueda modificar: intentar asignar otra URL sobre la instancia
     tiene que lanzar (por eso usamos `Object.freeze`), y después de intentarlo la URL
     sigue siendo la de iTunes.
   - Que `getAppConfig().itunesSearchUrl` sea `https://itunes.apple.com/search`.

3. `src/config/appConfigBroken.example.ts` — un CONTRA-EJEMPLO que no usa la app, para
   poder aprender la diferencia.
   Exportá `getBrokenConfig()` con los mismos datos y la
   misma variable de módulo, pero SIN el `if`: crea y devuelve un objeto nuevo en cada
   llamada. Explicá en un comentario por qué esto no es un singleton.
   Con su test `src/config/appConfigBroken.example.test.ts` que demuestre las dos cosas:
   - `expect(getBrokenConfig()).not.toBe(getBrokenConfig())` (distintas instancias: el bug),
   - `expect(getBrokenConfig()).toEqual(getBrokenConfig())` (los datos SÍ son iguales: por
     esto un test con `toEqual` no detecta el problema).

4. Modificá `src/infrastructure/itunesRepository.ts` para que ya no tenga la URL copiada:
   que llame a `getAppConfig()` y use `config.itunesSearchUrl` y `config.searchResultLimit`.

Al final explicame en 3 líneas qué es el `if` de `getAppConfig` y qué pasaría sin él.
```

Cuando devuelva algo, corré `npx vitest run src/config` antes de aceptar nada: si no hay
un test con `toBe`, el patrón no está probado y hay que pedírselo.
