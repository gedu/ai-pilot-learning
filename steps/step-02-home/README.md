# Paso 02 — La home

Hoy la app deja de ser un cartel y pasa a tener forma de buscador: título, una caja para
escribir y un aviso de "todavía no buscamos nada". La caja escribe, pero **no busca**.
Eso está bien a propósito: primero la forma, después el motor.

## Qué tocamos (CÓDIGO)

- `app/src/ui/SearchInput.tsx` — **nuevo**. La caja de texto con su etiqueta.
- `app/src/app/App.tsx` — agrega `useState` para guardar lo que escribís, y el bloque de
  resultados con el aviso.
- `app/src/index.css` — estilos de la caja y del aviso.
- `app/src/app/App.test.tsx` — dos tests nuevos: que la caja existe y que el aviso está.
- `app/vite.config.ts` — una línea: `globals: true`.

## Cómo encaja (ARQUITECTURA)

```
   app/src/app/App.tsx   ← tiene el estado (lo que escribiste)
        │            │
        ▼            ▼
  ui/SearchInput   <section> resultados
   (átomo: caja)   (un texto de aviso, por ahora)
```

`SearchInput` no sabe qué se busca ni de dónde van a venir los datos: recibe un valor y
avisa cuando cambia. Eso lo llamamos **átomo** en el capítulo 01 del libro: la pieza más
chica que se puede testear sola.

## La idea de este paso (PATRÓN / concepto)

**Estado arriba, pieza abajo.** `App` guarda la palabra en `useState` y se la pasa a
`SearchInput` por propiedad; cuando tipeás, `SearchInput` llama a `onChange` y `App`
vuelve a renderizar. La caja no guarda nada para ella. Este va y vuelve es el corazón de
React, y es lo que vas a repetir en todos los pasos.

Lectura: [capítulo 01 (atomic design) y 09 (React)](../../docs/the-book.md).

## Cómo lo verificás

Desde `app/`:

1. `npm test` → `Test Files  1 passed (1)` y `Tests  3 passed (3)`.
2. `npm run dev`, abrís `http://localhost:5173/` y tipeás en la caja: las letras aparecen
   mientras escribís. Pero la lista de abajo **no cambia**: sigue diciendo
   "Escribí algo arriba para empezar a buscar.". Eso es correcto.
3. La caja tiene etiqueta "Buscar podcasts" y de adentro, en gris, el texto de ejemplo
   "ej: inteligencia artificial" (eso lo prueba el test de arriba, que lo mira con
   `toHaveAttribute`).

## Si algo no funciona

- **El segundo test dice `Found multiple elements`** — falta `globals: true` en el bloque
  `test` de `vite.config.ts`; sin eso React Testing Library no limpia el DOM entre tests y
  los tres tests ven tres copias de la pantalla.
- **La caja no deja tipear** — te armó un `input` sin `value` o sin `onChange`. Tiene que
  recibir ambos desde `App`.
- **La caja busca y pasa algo raro** — te adelantaste: hoy la caja no busca nada. Pedile
  que saque cualquier `fetch`.
