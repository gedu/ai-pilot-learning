# Paso 06 — Escribís y busca de verdad

Hasta ahora la app buscaba una sola vez, con el término fijo "inteligencia artificial".
Acá conectamos la caja de texto con iTunes: lo que tecleás dispara una búsqueda real.
Y aparece un problema nuevo: si no lo frenás, cada letra es una llamada.

## Qué tocamos (CÓDIGO)

- `src/app/App.tsx` — la caja deja de ser decorativa: lo que escribís viaja a iTunes.
- `src/ui/useDebouncedValue.ts` — **nuevo**: un hook que devuelve el valor recién cuando dejás de escribir.
- `src/ui/useDebouncedValue.test.ts` — **nuevo**: prueba que la espera se mide desde la *última* tecla.
- `src/app/App.test.tsx` — la pantalla ya no muestra siempre lo mismo; se le agrega el test de búsqueda.

## Cómo encaja (ARQUITECTURA)

```
tecleo "react native"
   │
   ▼
term  (inmediato, 12 letras)
   │  useDebouncedValue(term, 300)   ← espera 300ms desde la ÚLTIMA tecla
   ▼
debouncedTerm  (una sola vez)
   │
   ▼
searchITunesPodcasts(...)  →  iTunes
   │
   └── mientras tanto, filterPodcasts(...) filtra en la pantalla lo que ya tenés
```

Dos capas, y es la idea del paso: **la red es lenta, la pantalla no tiene por qué serlo.**

## La idea de este paso (PATRÓN / concepto)

Se llama **debounce**: en vez de reaccionar a cada evento, esperás a que el usuario
"se calle" y reaccionás una vez. Escribir "inteligencia" son 12 teclas = 1 sola llamada.

El detalle fino está en `App.tsx`: mientras escribís, filtramos localmente lo que ya
tenemos para que la lista no muestre datos viejos. Pero filtramos **sólo mientras tu
texto va más adelante** de lo último que mandamos a buscar. iTunes coincide de forma
laxa (también mira autor y otras cosas), así que un resultado puede no tener el término
en el título; si lo filtramos igual, desaparece aunque Apple lo haya traído.

Capítulo del libro: [capítulo 09 (React)](../../docs/the-book.md).

## Cómo lo verificás

Desde `app/`:

1. `npm test` → te tiene que decir `24 passed` repartidos en 5 archivos.
2. `npx vite` → abre `http://localhost:5173`, escribí `react native` y mirá la caja:
   la lista cambia sin que aprietes nada.
3. `npx vitest run src/ui/useDebouncedValue.test.ts` → `2 passed`. Son los dos tests que
   prueban el debounce de verdad (que no sigue al valor de inmediato, y que cuenta desde
   la última tecla y no desde la primera).

## Si algo no funciona

- **Los resultados desaparecen mientras escribís**: filtraste localmente siempre, sin
  comparar `term` contra `debouncedTerm`. Mirá el bloque de `results` en `App.tsx`.
- **Dispara una búsqueda por letra**: el `setTimeout` no se limpia en el cleanup del
  `useEffect` (`return () => clearTimeout(timer)`), así que cuenta desde la primera letra.
- **Ves resultados del término anterior**: la respuesta vieja pisó a la nueva; falta el
  `cancelled` del cleanup del effect.
