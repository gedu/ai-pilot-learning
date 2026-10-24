Copiá esto y pegalo tal cual en tu IA:

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

Si te muestra el test **fallando** antes de escribir la función, el TDD funcionó: dejalo
terminar y volvé a correr `npm test`, ahora con **15 passed**. Si la IA escribió código y
test a la vez sin mostrar la falla, pedile que comente la función y te muestre el test
rojo.
