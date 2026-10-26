# Pedirle bien a la IA

El `prompt.md` de cada paso es **largo y preciso** a propósito: nombra archivos, campos y
pruebas. Pero no te confundas con eso. **Ese prompt no es "la forma correcta de
promptear": es la respuesta.** La pregunta la hiciste vos, y la pregunta también se
aprende.

Acá están las reglas que en los pasos están repartidas al pie del bloque copiable, todas
juntas y con nombre. Y cómo jugar con ellas sin romper el paso que ya te salió.

## La escalera: el mismo pedido, cuatro niveles

Es el mismo pedido del paso 06, escrito cuatro veces. No hay una versión "correcta": cada
nivel sirve para algo distinto.

**Nivel 1 — como se le habla a un amigo.**
```
que busque mientras uno escribe
```
Sirve para arrancar y para ver qué decide la IA por su cuenta. Casi nunca alcanza, pero
es el punto de partida honesto: nadie sabe qué pedir antes de empezar.

**Nivel 2 — le sumás el contexto que la IA no puede adivinar.**
```
En mi app de podcasts (React + Vite, está en app/), la caja de búsqueda hoy busca una
sola vez con un texto fijo. Quiero que busque mientras uno escribe, pero sin llamar a
iTunes por cada letra.
```
Ya no hay adivinación posible sobre el estado actual. Notá que **no** dijiste qué es un
debounce: describiste el problema ("sin llamar por cada letra") y la IA lo resuelve.

**Nivel 3 — describís el comportamiento, no la solución.**
```
… cuando escribo rápido no tiene que haber una llamada por letra: si sigo tecleando, la
espera se reinicia y se busca una sola vez cuando me callo. Mientras tanto, la lista que
ya está en pantalla tiene que filtrarse localmente para que no se vean datos viejos.
```
Este es el salto que más rinde. Pedís **qué tiene que pasar**, y sale bien aunque la IA
elija otra forma de implementarlo. Es la regla del formato de este repo: "haceme un
config" produce un config cualquiera; "la URL vive en un archivo, se crea una sola vez y
cualquiera la pide" produce un singleton.

**Nivel 4 — el prompt del paso.**
Nombres de archivo, tipos, qué prueba cada test. Acá ya sabés cómo se llama todo porque
los pasos anteriores te lo enseñaron, y necesitás que el resultado sea **exactamente** el
del paso para poder comparar contra `expected.png`.

> Regla práctica: empezá en el 2 o el 3. Si la IA se va por las ramas, bajá al 4 y dale
> los nombres. Si se trago el 4 sin entender, volvé al 3 y explicale vos el comportamiento.

## Las cinco reglas que se repiten en todos los pasos

Están al pie de cada `prompt.md` desde el paso 01. Son las que hacen la diferencia entre
"funcionó" y "entendí qué funcionó".

1. **Pegá el error completo, nunca un resumen.** El paso 01 lo dice textual: *"pegale el
   error **completo** (no un resumen)"*. Copiar tres líneas "me tiró un error de compile"
   le saca a la IA justo la información con la que podría acertar. Pegá todo, desde el
   primer renglón.
2. **Pedite que no toque lo que no pediste.** El paso 02: *"no agregues nada que no te
   pedí (sin botones, sin lista, sin imágenes)"*, y el 03: *"si te agregó un `fetch` o un
   botón, pedile que lo saque"*. Las IAs completan huecos con lo que parece obvio. Decirle
   qué no hacer es tan útil como decirle qué hacer.
3. **Pedí el test junto con el código**, y decí qué tiene que probar. Si pedís el test
   después, te devuelve tests hechos sobre lo que ya escribió, que es exactamente mirar el
   partido después de que terminó.
4. **Pedí que te explique en 3 líneas qué hizo.** Está en los diez pasos. Sin explicación
   no hay aprendizaje: te quedaste con código que funciona y no sabés por qué. Y si su
   explicación no coincide con lo que hizo, eso es una señal enorme.
5. **Si no sabés cómo se hace algo del entorno, preguntá eso primero.** Abrir la terminal,
   crear una carpeta, copiar un archivo. En español, como a una persona. No hay pregunta
   tonta y la IA no se cansa.

## Cómo jugar sin romperse

Jugar está bueno, y se juega con red. El curso ya te dio la red sin decirte: **el commit
de cada paso**.

1. **Antes de jugar, commiteá.** `git add -A && git commit -m "paso 06 andá"`. Acá no se
   rompe nada que no se pueda recuperar.
2. **Después de cada respuesta de la IA, mirá qué tocó.** `git status --short` te da la
   lista de archivos; `git diff` te muestra línea por línea. Esto es lo más rentable del
   curso: tres segundos que te dicen si te agregó una dependencia, si te borró un test, o
   si tocó un archivo que no debías.
3. **Si lo que hizo no te gustó, no lo arregles: deshacelo.** `git restore .` vuelve a los
   archivos que la IA **modificó**. Ojo con un detalle que sorprende: los archivos **nuevos**
   que creó se quedan (aparecen con `??` en `git status --short`). Borralos a mano o
   pedile que los borre ella. Deshacer no es fracasar; es parte del juego.
4. **Y si querés el código del curso tal cual: `git checkout step-06`.** Después
   `git checkout -` para volver.

Una nota honesta: qué decide una IA con un pedido vago **cambia entre modelos, entre
versiones y entre días**. Por eso las secciones "Jugá con esto" de cada paso te dan un
**checklist de cosas para mirar**, no una respuesta esperada. Lo que importa no es que la
IA acierte: es que vos veas dónde el pedido dejó un hueco, y lo llenes a propósito la
próxima vez.

---

Capítulo del libro: [capítulo 02 (Communication First and Foremost)](the-book.md) y
[capítulo 15 (IA Driven Development)](the-book.md).
