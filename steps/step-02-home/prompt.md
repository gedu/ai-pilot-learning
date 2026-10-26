# Paso 02 — tres formas de pedirlo

Arrancá por el Starter y mirá qué hace la IA. Si se fue por las ramas, subí a Medium. Si
querés que quede igual que `expected.png`, pegá el Advanced. Con Starter y Medium **no te
compares contra la foto**: ahí lo que se mira es qué decidió la IA por su cuenta (está al
final). El camino del curso es el Advanced.

## Starter — como se le pide a un amigo

Copiá esto y pegalo tal cual:

```
armame la pantalla principal con la caja de búsqueda
```

## Medium — el comportamiento, sin decir cómo

Copiá esto y pegalo tal cual:

```
En mi app de podcasts que ya levanta (React + TypeScript, está en app/), quiero la
pantalla principal: una caja de búsqueda con su etiqueta visible y, abajo, un espacio para
los resultados que todavía no tiene nada. Comportamiento: lo que se escribe se ve al toque,
y la caja no guarda la palabra para ella sola — quien manda es el componente de arriba, que
es el que la guarda y se la pasa. Todavía no tiene que buscar nada: no quiero botón, ni
lista, ni llamadas a internet, ni imágenes. Escribí los tests junto con el código, que
prueben que la caja existe y es reconocible, y que el texto de aviso inicial está.
```

## Advanced — el prompt del curso

Es el que reproduce `expected.md` y el tag `step-02`. Copiá esto y pegalo tal cual:

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

## Qué mirar después de cada nivel

- **La pregunta que define el paso: ¿quién guarda lo que escribís?**
  `git diff app/src/app/App.tsx` (desde la raíz del repo). Si la caja guarda la palabra
  adentro suyo y el resto de la app no la ve, el pedido vago te devolvió el patrón más corto
  y no el del curso ("estado arriba, pieza abajo"), que es el que vas a repetir en todos los
  pasos. Es la única cosa de este paso que vale la pena mirar.
- **¿Te agregó un botón de búsqueda?** Con "armame la pantalla con la caja" es un agujero
  que la IA puede llenar como quiera. El curso recién pone botón en el paso 10, así que el
  `expected.png` de este paso no tiene ninguno.
- `git diff --stat`: ¿tocó estilos de más, creó componentes que no pediste, o metió una
  librería de UI? `git diff app/package.json` lo muestra en dos segundos.
- **Leé el test** que escribió (`npm test`, desde `app/`): ¿prueba que la caja es
  reconocible por nombre, o sólo que hay un `<input>` en la página? Los dos pasan; sólo uno
  te avisa si mañana perdés la etiqueta accesible.
