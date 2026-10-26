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

## Jugá con esto (opcional, 10 minutos)

Tu paso 06 ya está commiteado. Volvé al estado anterior (`git checkout step-05`) y probá
pedirlo como se le pide a un amigo, sin leer el `prompt.md`:

```
agregá que se pueda escribir de a poco en la caja de búsqueda, y que busque mientras uno escribe
```

([Cómo volver y cómo volver a volver](../../docs/prompting.md).)

Mirá qué hizo, sin corregirlo:

- **Escribí una palabra de a una letra y contá los pedidos** (F12 → pestaña Network → en
  el filtro tipeá `itunes`). ¿Aparece uno por letra? Ese hueco lo dejó tu pedido: no
  dijiste "sin llamar por cada letra". El `prompt.md` del paso lo dice explícitamente, y
  por eso existe el debounce.
- **Si puso una espera entre letra y letra, preguntale de dónde salió ese número.** En la
  corrida que hicimos sobre el paso 05 terminado salió `300ms`, y la IA respondió "ese
  número es mío": nadie lo pidió. Está bien que exista; lo que hay que ver es que se
  decide en silencio cuando no lo preguntás.
- **Borrá todo lo escrito y mirá la pantalla.** ¿Lista vacía? ¿Vuelve la lista inicial?
  ¿Error? En la corrida de prueba volvió a la lista inicial. Ninguna de las tres opciones
  es un bug: son respuestas razonables a un pedido que no dijo qué hacer con la caja vacía.
- **Corré `npm test` y contá.** El paso 06 del curso cierra con **24**; en la corrida de
  prueba la IA terminó con **28** porque escribió más tests de los que se le pidieron.
  Más no es mejor: son tests que nadie pidió y que nadie revisó.

Lo más interesante de la corrida: apareció `src/ui/useDebouncedValue.ts` y se tocó
`App.tsx`, casi exactamente los mismos archivos del curso, sin que nadie se los nombrara.
La estructura obvia de React sale sola. Lo que no sale solo es justo lo que hay que pedir:
cuántas llamadas, qué pasa con la caja vacía, y qué NO tocar.

## Si algo no funciona

- **Los resultados desaparecen mientras escribís**: filtraste localmente siempre, sin
  comparar `term` contra `debouncedTerm`. Mirá el bloque de `results` en `App.tsx`.
- **Dispara una búsqueda por letra**: el `setTimeout` no se limpia en el cleanup del
  `useEffect` (`return () => clearTimeout(timer)`), así que cuenta desde la primera letra.
- **Ves resultados del término anterior**: la respuesta vieja pisó a la nueva; falta el
  `cancelled` del cleanup del effect.
- **Comparaste contra `git checkout step-06` y el comentario de `App.tsx` habla de
  `isTypingAhead`**: ese nombre no existe en ningún archivo, es un comentario que quedó viejo
  (se corrigió más adelante). Lo que hace el código es la condición de al lado:
  `term.trim() === debouncedTerm.trim()`. No busques la variable, no está.
