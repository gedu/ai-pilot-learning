# Paso 04 — Tests: primero el test, después el código

Hoy la caja de búsqueda **filtra** la lista. Y cambia cómo trabajamos: la regla del filtro
se escribe primero como test (falla), y después como código (pasa). Eso es TDD, y es la
herramienta número uno para no creerle todo a la IA.

## Qué tocamos (CÓDIGO)

- `app/src/application/filterPodcasts.test.ts` — **nuevo**. 6 tests de la regla del filtro.
- `app/src/application/filterPodcasts.ts` — **nuevo**. La función `filterPodcasts`.
- `app/src/app/App.tsx` — una línea: la lista sale de `filterPodcasts(...)` en vez de
  mostrar todo.
- `app/src/app/App.test.tsx` — un test más: tipeás "practical" y queda una sola tarjeta.
- `app/package.json` — aparece `@testing-library/user-event` (simula que tipeás).

## Cómo encaja (ARQUITECTURA)

```
 ui/SearchInput ──► app/src/app/App.tsx ──► application/filterPodcasts.ts
    (tipeás)          (estado `term`)            (la REGLA, pura)
                                                     │
                            infrastructure/fakePodcasts.ts
```

La regla del filtro no vive en la pantalla: vive sola, en la carpeta `application/`. La UI
sólo la llama.

## La idea de este paso (PATRÓN / concepto)

**Función pura + TDD.** `filterPodcasts(podcasts, term)` recibe datos y devuelve datos: no
toca el DOM, no llama a internet, no guarda nada. Por eso sus 6 tests corren en milisegundos
sin browser. Y el orden importa: escribís el test, lo ves **fallar**, y después escribís el
código. Un test que nunca falló no prueba nada.

Lectura: [capítulo 01 (TDD)](../../docs/the-book.md).

## Cómo lo verificás

Desde `app/`:

1. `npx vitest run src/application/filterPodcasts.test.ts` → `Tests  6 passed (6)`. Son
   los tests de la regla sola, sin React.
2. `npm test` → `Test Files  3 passed (3)` y `Tests  15 passed (15)`.
3. `npm run dev`: tipeá `practical` y quedan **1** tarjeta; tipeá `diseno` y no queda
   ninguna; borrá todo y vuelven las 3.

## Si algo no funciona

- **Al tipear no se filtra nada** — en `App.tsx` la `<ul>` tiene que mapear el resultado de
  `filterPodcasts(...)`, no el arreglo original.
- **"Diseño" no aparece con `diseno`** — falta el `normalize` (quitar tildes y pasar a
  minúscula) antes de comparar; es un test entero del archivo.
- **Un test de antes rompió** — el filtro no tiene que modificar el arreglo que recibe
  (usá `filter`, no `splice`/`sort` sobre el argumento).
