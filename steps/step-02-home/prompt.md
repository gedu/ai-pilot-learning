Copiá esto y pegalo tal cual en tu IA:

````
Seguimos con el paso 2 de mi curso. La app "Pod Search" ya levanta y muestra el título
"Pod Search" con su subtítulo. Hoy sólo vamos a armar la home: la forma del buscador. No
hay que buscar nada de verdad todavía, y no quiero ningún fetch ni ninguna API en este
paso.

Stack: React + Vite + TypeScript (el que ya está).

1. Creá el componente en el archivo `src/ui/SearchInput.tsx`. Es una caja de texto con su
   etiqueta visible que dice "Buscar podcasts". Comportamiento pedido:
   - recibe por propiedades `value: string` y `onChange: (value: string) => void`;
   - el `<input>` muestra `value` y en `onChange` avisa con el texto nuevo;
   - el placeholder dice exactamente "ej: inteligencia artificial";
   - la caja NO guarda ningún estado propio: quién manda es el componente padre.
2. En `src/app/App.tsx` guarda la palabra escrita con `useState` (arranca en string
   vacío) y pasale `value` y `onChange` al `SearchInput`.
3. Debajo de la caja, en `App.tsx`, agregá un `<section>` de resultados que por ahora
   muestre un párrafo con el texto exacto "Escribí algo arriba para empezar a buscar.".
4. Estilá en `src/index.css`: la caja ocupa todo el ancho, fondo dark con borde
   redondeado, y al recibir el foco se ve un contorno azul.
5. Escribí los tests junto con el código, en `src/app/App.test.tsx`:
   - que exista una caja de texto accesible con el nombre "Buscar podcasts" y que su
     placeholder sea "ej: inteligencia artificial";
   - que en pantalla esté el texto "Escribí algo arriba para empezar a buscar.".
   Si hace falta habilitar `globals: true` en el bloque `test` de `vite.config.ts` para
   que React Testing Library limpie el DOM entre tests, hacelo y decímelo.

Misma regla de antes: no agregues nada que no te pedí (sin botones, sin lista, sin
imágenes). Al final explicame en 3 líneas qué hiciste.
````

Corré `npm test` en `app/`: tiene que decir `3 passed`. Después `npm run dev` y tipeá en
la caja: las letras entran y la lista de abajo no se mueve. Si la IA te pone un botón de
búsqueda o un `fetch`, pedile que lo saque — ese es el paso 05.
