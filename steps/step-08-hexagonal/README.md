# Paso 08 — Hexagonal: la pantalla deja de conocer a iTunes

En el paso 05 la pantalla llamaba a `searchITunesPodcasts` por su nombre. Este paso corta
ese cable: la lógica de negocio pasa a hablar con una **promesa** (un puerto), y iTunes pasa
a ser sólo una de las cosas posibles que la cumplen.

## Qué tocamos (CÓDIGO)

- `src/domain/ports/PodcastSearchPort.ts` — **nuevo**: la interfaz, la promesa.
- `src/application/searchPodcasts.ts` — **nuevo**: el caso de uso "buscar podcasts", que recibe
  el repositorio por parámetro.
- `src/application/searchPodcasts.test.ts` — **nuevo**: 4 tests con un repositorio falso de 5 líneas.
- `src/app/container.ts` — **nuevo**: el punto donde la lógica y el mundo de afuera se conocen.
- `src/infrastructure/itunesRepository.ts` — se le agrega el adaptador: iTunes se presenta
  como quien cumple el puerto (`itunesPodcastRepository`).
- `src/app/App.tsx` — una línea: importa `searchPodcasts` de `./container` en vez del repositorio.

## Cómo encaja (ARQUITECTURA)

```
   ui (App.tsx)
        │  llama a
        ▼
  application/searchPodcasts  ──────▶  domain/ports/PodcastSearchPort
   (regla: término vacío               (una interfaz, no código)
    no gasta red)                              ▲
                                               │ cumple
                          ┌────────────────────┴───────────────────┐
                 infrastructure/itunesRepository     el falso de 5 líneas que vive
                     (la app real usa éste)             adentro de searchPodcasts.test.ts
```

La flecha del caso de uso apunta a una interfaz. Las implementaciones apuntan a esa misma
interfaz. Nadie menciona a nadie por nombre, salvo en `container.ts`.

## La idea de este paso (PATRÓN / concepto)

La única frase del libro que hace falta hoy ([capítulo 03](../../docs/the-book.md)):
**la lógica de negocio no debe conocer el mundo de afuera.**

Traducida: `searchPodcasts` no sabe que existís vos, ni iTunes, ni `fetch`. Recibe una
función que le devuelve podcasts. El mismo puerto lo cumple iTunes en la app y un objetito
falso en los tests.

Hay un experimento para verlo con los ojos: en el paso 09 vas a cambiar UNA línea de
`container.ts` y la app entera va a funcionar sin internet. Acá todavía no se puede
(los datos locales del paso 08 son un arreglo, no un repositorio); se puede en 09.

## Cómo lo verificás

1. `npx vitest run src/application` → te tiene que decir `10 passed` en 2 archivos. Cuatro
   de ésos son los nuevos del caso de uso, y no tocan la red ni el browser.
2. `npm test` → `34 passed` (8 archivos).
3. `grep -rn itunesRepository src/app/App.tsx` → no tiene que devolver nada. La pantalla ya
   no importa ni llama a iTunes (en los comentarios la palabra puede aparecer; lo que cuenta
   es el cable roto en los `import`).
4. `npx vite` → buscá `react native`: la pantalla se ve igual que en el paso 07. Este paso no
cambia nada visible.

## Si algo no funciona

- **`container.ts` no existe y App.tsx importa el repositorio directamente**: no hay
  hexagonal, hay un archivo de más. Pedile el puerto y el composition root.
- **El caso de uso importa `itunesRepository`**: la dependencia está al revés. El caso de uso
  sólo puede importar tipos de `domain/`.
- **No hay test del caso de uso**: sin un test que use un repositorio falso, no tenés ninguna
  prueba de que el puerto sirva para algo.
