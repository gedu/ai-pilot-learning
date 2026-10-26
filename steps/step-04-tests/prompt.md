# Paso 04 — tres formas de pedirlo

Arrancá por el Starter y mirá qué hace la IA. Si se fue por las ramas, subí a Medium. Si
querés que quede igual que `expected.png`, pegá el Advanced. Con Starter y Medium **no te
compares contra la foto**: ahí lo que se mira es qué decidió la IA por su cuenta (está al
final). El camino del curso es el Advanced.

## Starter — como se le pide a un amigo

Copiá esto y pegalo tal cual:

```
hacé que la caja de búsqueda filtre la lista de podcasts que ya muestra la pantalla
```

## Medium — el comportamiento, sin decir cómo

Copiá esto y pegalo tal cual:

```
En mi app de podcasts (React + Vite + TypeScript, con tests que ya corren con npm test),
la caja de búsqueda tiene que filtrar de verdad la lista que muestra. La regla: con el
término vacío vuelven todos los podcasts, alcanza con que coincida una parte del título o
del autor, y no importan ni las mayúsculas ni las tildes. Quiero hacerlo en el orden
inverso al de siempre: primero escribí los tests de esa regla y mostrame la corrida
FALLANDO, y recién después escribas el código que los hace pasar, porque un test que nunca
falló no me prueba nada. Los tests que ya existían no los toques.
```

## Advanced — el prompt del curso

Es el que reproduce `expected.md` y el tag `step-04`. Copiá esto y pegalo tal cual:

````
Paso 4 de mi curso. Ya tengo la home de "Pod Search" con la caja de búsqueda y una lista
de 3 podcasts mock. Hoy la caja tiene que FILTRAR esa lista, y lo vamos a hacer con TDD:
primero el test que falla, después el código.

Stack: React + Vite + TypeScript + Vitest (el que ya está).

1. Primero, y antes de tocar cualquier código, creá el archivo
   `src/application/filterPodcasts.test.ts` con una función `filterPodcasts` que todavía no
   existe. Los casos que tiene que probar, todos sobre un arreglo de `Podcast` de prueba:
   - si el término viene vacío, devuelve TODOS los podcasts, en el mismo orden;
   - si el término coincide con parte del título, devuelve sólo ése;
   - el autor también cuenta: buscar por el apellido del autor lo encuentra;
   - mayúsculas y minúsculas no importan ("DAILY" encuentra a "The AI Daily Brief");
   - las tildes no importan: buscar "diseno" tiene que encontrar a "Diseño y Tecnología";
   - si nada coincide, devuelve un arreglo vacío.
2. Corré ese test y mostrame que FALLA (esa es la prueba de que el test existe de verdad).
3. Ahora sí, creá `src/application/filterPodcasts.ts` con la función
   `filterPodcasts(podcasts: Podcast[], term: string): Podcast[]` que cumple los 6 casos.
   Función pura: no mutate el arreglo que recibe y no use nada de afuera. Hacé una
   ayudante privada que normalice el texto (sacar tildes y pasar a minúscula).
4. En `src/app/App.tsx`, la `<ul>` de resultados tiene que mapear el resultado de
   `filterPodcasts(fakePodcasts, term)` en lugar de `fakePodcasts`.
5. Agregá además un test en `src/app/App.test.tsx` que simule que el usuario tipea
   "practical" en la caja (usá `@testing-library/user-event`, agregalo como dependencia de
   desarrollo si no está) y pruebe que queda "Practical AI" y que "The AI Daily Brief" ya
   no está en pantalla.

Corré `npm test` al final y pegame el resultado. Después explicame en 3 líneas qué hiciste.
````

Cuando devuelva algo, corré `npm test` desde `app/` y buscá en la conversación si primero
mostró una corrida **fallando** y recién después la función. Si escribió código y test a la
vez sin mostrar la falla, pedile que comente la función y te muestre el test rojo. El
camino del curso cierra con `Tests  15 passed (15)`, como dice `expected.md`.

## Qué mirar después de cada nivel

- `git diff --stat` (desde `app/`): ¿cuántos archivos nuevos aparecieron y cuáles? Ahí
  también se ve si tocó un archivo de tests que ya existía en lugar de agregar uno.
- **El orden es lo único que distingue a este paso.** `git status --short` no lo muestra:
  mirá el transcript y buscá si hubo una corrida de tests **fallando** antes de que
  apareciera la función. Si el test llegó junto con el código, el pedido no dijo nada del
  orden y la IA lo llenó a su manera.
- `git diff app/package.json` (desde la raíz del repo): ¿apareció alguna dependencia que no le nombraste? Un `git diff
  app/src/app/App.test.tsx` te muestra si cambió un test viejo para que pasara.
- **Con el Starter, probá borrando todo lo escrito en la caja.** ¿Vuelven los tres o queda
  la lista vacía? El pedido no dijo qué hacer con el término vacío: esa es la decisión que
  tomás vos o toma la IA.
