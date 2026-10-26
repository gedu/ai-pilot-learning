# Paso 07 — tres formas de pedirlo

Arrancá por el Starter y mirá qué hace la IA. Si se fue por las ramas, subí a Medium. Si
querés que quede igual que `expected.png`, pegá el Advanced. Con Starter y Medium **no te
compares contra la foto**: ahí lo que se mira es qué decidió la IA por su cuenta (está al
final). El camino del curso es el Advanced.

## Starter — como se le pide a un amigo

Copiá esto y pegalo tal cual:

```
sacá la URL de iTunes que está escrita dentro del código y poné-la en un solo lugar del que la pidan todos
```

## Medium — el comportamiento, sin decir cómo

Copiá esto y pegalo tal cual:

```
En mi app de podcasts (React + Vite + TypeScript, está en app/), la URL de iTunes está
copiada a mano dentro del archivo que busca. La quiero en un archivo de configuración que
cualquiera pueda pedir. Importe el comportamiento: si dos lugares distintos piden la config
al mismo tiempo, tienen que recibir EXACTAMENTE la misma cosa, no dos copias parecidas; y
nadie desde afuera tiene que poder cambiarle un valor. Escribí los tests junto con el
código, y que el test pruebe la identidad (la misma instancia), no que los datos se
parezcan: un test que sólo compara valores no detecta que te devuelvan una copia nueva en
cada llamada.
```

## Advanced — el prompt del curso

Es el que reproduce `expected.md` y el tag `step-07`. Copiá esto y pegalo tal cual:

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

## Qué mirar después de cada nivel

- **El corazón del paso es el `if`**: preguntale a la IA qué pasa si dos lugares llaman a
  la función de config al mismo tiempo, y leé el código: si crea el objeto siempre (sin un
  `if` que lo frene), no hay singleton — hay una fábrica de copias. El README de este paso
  te muestra el contraejemplo que el curso trae a propósito (`appConfigBroken.example.ts`).
- **Leé el test, no sólo que pase**: `npx vitest run src/config`. ¿Comparó con `toBe`
  (identidad) o con `toEqual` (parecido)? Con `toEqual`, la versión rota también pasa, y el
  paso quedó vacío por dentro aunque esté verde.
- `git diff --stat`: el Advanced toca el repositorio de iTunes para que pida la config. Si
  el tuyo no lo tocó, la URL sigue copiada en dos lugares: ahora hay dos fuentes de verdad.
- **Un pedido que dice "ponela en un archivo" no menciona el `if` nunca.** Si con el Starter
  salió sin `if`, no es un error de la IA: es tu pedido sin esa frase. Agregala al Medium y
  volvé. 
