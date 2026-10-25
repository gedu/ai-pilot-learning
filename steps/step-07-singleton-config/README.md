# Paso 07 — La URL vive en un config, y es UNA sola instancia

Hasta ahora la URL de iTunes estaba escrita a mano adentro de `itunesRepository.ts`.
Ese paso existe para que aparezca un patrón famoso —el **singleton**— y, sobre todo, para
que aprendas a **verificar que la IA realmente lo escribió** y no algo que se le parece.

## Qué tocamos (CÓDIGO)

- `src/config/appConfig.ts` — **nuevo**: la config con el `if` que hace al singleton.
- `src/config/appConfig.test.ts` — **nuevo**: los tests del patrón. Fallan si el `if` no está.
- `src/config/appConfigBroken.example.ts` — **nuevo**: el MISMO archivo sin el `if`, a propósito.
- `src/config/appConfigBroken.example.test.ts` — **nuevo**: prueba que esa versión está mal.
- `src/infrastructure/itunesRepository.ts` — borra la URL dura y la pide con `getAppConfig()`.

## Cómo encaja (ARQUITECTURA)

```
antes:  itunesRepository.ts  ──▶  "https://itunes.apple.com/search"  (copiada acá)

después: ui ──▶ application ──▶ infrastructure ──▶ getAppConfig()
                                                        │
                                            ¿existe instance? ── sí ─▶ la devuelvo
                                                        │ no
                                                   la creo 1 vez ─▶ ESA instancia
```

Un solo lugar conoce la URL. Si mañana cambiamos de API, se toca un archivo.

## La idea de este paso (PATRÓN / concepto)

La regla que hay que entenderse bien, con tus palabras: **dos objetos pueden tener los
mismos datos y NO ser la misma cosa.** `toEqual` compara datos; `toBe` compara identidad
(mismo objeto en memoria). Un singleton mal escrito pasa el primero y rompe el segundo.

El flujo es el de la imagen de abajo: entra la pedido → ¿existe la instancia? → si existe
la devuelvo, si no la creo una vez → por las dos ramas sale **la misma** instancia. El
`if` es el patrón: sin él tenés una fábrica, no un singleton. Y en la pantalla no se nota
nada — la app anda igual —, por eso se testea y no se mira.

Libro: no hay capítulo de Singleton, pero el "por qué una config global" es el
[capítulo 18](../../docs/the-book.md) y el de arquitectura limpia aplica
([capítulo 07](../../docs/the-book.md)); la trampa del patrón está explicada en
[`docs/the-book.md`](../../docs/the-book.md).

![Patrón](pattern.png)

La mitad izquierda es tu código: entra `getAppConfig()`, chequea `if (instance === undefined)`,
y **las dos flechas de salida** dicen "misma inst." y "ESA instancia". La derecha es
`appConfigBroken.example.ts`: la casilla del chequeo está punteada y roja ("no está el if")
y la salida es "una NUEVA cada vez", con la cuenta "dos llamadas → dos objetos distintos".
Abajo están las dos corridas reales de los tests: verde (6 passed) y, "Mismo archivo, sin
el if", dos tests caídos.

## Cómo lo verificás

Desde `app/`:

1. `npx vitest run src/config` → te tiene que decir `6 passed` en 2 archivos.
2. Abrí `src/config/appConfig.ts` y buscá el `if`. Ese `if` es todo el paso.
3. Mirá `appConfigBroken.example.test.ts`: un test afirma `not.toBe` (son distintos) y el
   otro afirma `toEqual` (los datos son iguales). Los dos pasan. Esa es la prueba de que
   `toEqual` solo no te alcanza.
4. `npm test` → `30 passed`.

## Si algo no funciona

- **`2 failed | 4 passed` en `src/config`**: tu config crea la instancia en cada llamada
  (falta el `if` o falta la variable de afuera). Es exactamente lo que muestra la mitad
  derecha de `pattern.png`.
- **Dice `expected { …(2) } to be { …(2) }` y "Compared values have no visual difference"**:
  traducilo así: son dos objetos idénticos por fuera, distintos por dentro. No cambies el
  test para que pase; arreglá el `if`.
- **`searchITunesPodcasts` sigue con la URL copiada**: la IA creó el config pero no lo usó.
  Pedite que el repositorio lea `getAppConfig().itunesSearchUrl`.
- **Comparaste contra `git checkout step-07` y el comentario de `App.tsx` habla de
  `isTypingAhead`**: ese nombre no existe en ningún archivo, es un comentario viejo que se
  corrigió después. Lo que hace el código es la condición de al lado:
  `term.trim() === debouncedTerm.trim()`.
