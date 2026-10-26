# Pedirle bien a la IA

El `prompt.md` de cada paso es **largo y preciso** a propósito: nombra archivos, campos y
pruebas. Pero no te confundas con eso. **Ese prompt no es "la forma correcta de
promptear": es la respuesta.** La pregunta la hiciste vos, y la pregunta también se
aprende.

Acá están las reglas que en los pasos están repartidas al pie del bloque copiable, todas
juntas y con nombre. Y cómo jugar con ellas sin romper el paso que ya te salió.

## La escalera: el mismo pedido, tres niveles

Son los tres niveles que hay en cada `prompt.md` del curso, aplicados al mismo pedido del
paso 06. No hay una versión "correcta": cada nivel sirve para algo distinto, y el punto del
curso es que **empezás arriba**.

**Starter — como se le habla a un amigo.**
```
que busque mientras uno escribe
```
Una o dos frases, sin nombres técnicos. Sirve para arrancar y para ver qué decide la IA por
su cuenta. Casi nunca alcanza, pero es el punto de partida honesto: nadie sabe qué pedir
antes de empezar. Y si querés ser más generoso sin dejar de ser vago, agregale sólo el
contexto que la IA no puede adivinar (*"en mi app de React, la caja hoy busca una sola vez
con un texto fijo"*) — seguí sin decirle cómo.

**Medium — el comportamiento, sin decir cómo.**
```
… cuando escribo rápido no tiene que haber una llamada por letra: si sigo tecleando, la
espera se reinicia y se busca una sola vez cuando me callo. Mientras tanto, la lista que
ya está en pantalla tiene que filtrarse localmente para que no se vean datos viejos.
```
Este es el salto que más rinde. Pedís **qué tiene que pasar**, y sale bien aunque la IA
elija otra forma de implementarlo. Es la regla del formato de este repo: "haceme un
config" produce un config cualquiera; "la URL vive en un archivo, que se crea una sola vez
y que cualquiera la pide" produce un singleton. Sin nombres de archivo ni de funciones: eso
ya sería el nivel de abajo.

**Advanced — el prompt del paso.**
Nombres de archivo, tipos, qué prueba cada test. Es el que reproduce `expected.png` y el tag
`step-NN`, y está **al final** de cada `prompt.md` porque es la respuesta del curso: si lo
pegás primero, no hay nada que aprender del medio.

> Regla práctica: arrancá en Starter y mirá `git diff --stat`. Si la IA se fue por las
> ramas, subí a Medium y describile el comportamiento que extrañaste. Si necesitás que
> encastra con el paso (o querés comparar contra la foto), pegá el Advanced. Y si te comiste
> el Advanced sin entender qué pidió, volvé al Medium y escribilo vos: ahí está el
> aprendizaje.

## Las cinco reglas del pedido

Son las cinco que más rinden. **No** las encontramos en los diez `prompt.md`: contamos con
`grep` cuántos pasos tienen cada una hoy, y el resultado es honesto (y un poco incómodo).

1. **Pegá el error completo, nunca un resumen.** Está en el paso 01 (*"pegale el error
   **completo** (no un resumen)"*) y en el 05; y en el loop del README, que es donde más se
   usa: *"Algo va a fallar: pegale el error **completo** y dejalo arreglarlo"*. Copiar tres
   líneas de un error le saca a la IA justo la información con la que podría acertar. Pegá
   todo, desde el primer renglón. **Esta es la que más te conviene aplicar siempre, en todo
   paso**, porque el error llega cuando menos la IA te está escuchando.
2. **Decile qué NO tocar** (5 de los 10 pasos: 02, 03, 08, 09, 10). El 02: *"no agregues
   nada que no te pedí (sin botones, sin lista, sin imágenes)"*; el 03: *"si te agregó un
   `fetch` o un botón, pedile que lo saque"*. Las IAs completan huecos con lo que parece
   obvio. Decir qué no hacer es tan útil como decir qué hacer.
3. **Pedí el test junto con el código**, y decí qué tiene que probar (8 de 10: 01, 02, 03,
   05, 06, 07, 08, 10 — el 07 lo dice cortito: *"escribí el código y los tests juntos"*). Si
   pedís el test después, te devuelve tests hechos sobre lo que ya escribió, que es mirar el
   partido cuando ya terminó. Los dos que faltan son los más interesantes: en el **04 el test
   va antes** que el código (es el paso de TDD), y en el **09 está prohibido tocarlos** —
   *"NO toques `src/app/App.test.tsx`. Ni un carácter"*, porque ahí los tests son la vara con
   la que se mide que el refactor no rompió nada. La regla no es "el test siempre junto": es
   **saber qué rol cumplen los tests en este pedido**.
4. **Pedí que te explique en 3 líneas qué hizo** (9 de 10 — falta el 09, que es un refactor
   y pide otra cosa). Sin explicación no hay aprendizaje: te quedaste con código que
   funciona y no sabés por qué. Y si su explicación no coincide con lo que hizo, esa es una
   señal enorme.
5. **Si no sabés cómo se hace algo del entorno, preguntá eso primero.** Está en el loop del
   README: *"Si no sabés abrir la terminal o crear archivos, pedile eso primero, en español,
   como a una persona"*. No en los `prompt.md`, porque esos pasos ya asumen que sabés abrir
   la terminal. Abrir la terminal, crear una carpeta, copiar un archivo: no hay pregunta tonta
   y la IA no se cansa.

> Que una regla aparezca en sólo dos de diez prompts no significa que valga dos veces. El
> `prompt.md` de un paso ya viene cargado de instrucciones y no se pueden meter las cinco en
> todos sin que quede ilegible. Vos las elegís según el momento: el error completo cuando
> algo falla, el "no toques X" cuando ya tenés algo andando que te da miedo perder.

## Cómo jugar sin romperse

Jugar está bueno, y se juega con red. El curso ya te dio la red sin decirte: **el commit
de cada paso**.

1. **Antes de jugar, commiteá.** `git add -A && git commit -m "paso 06 andá"`. Acá no se
   rompe nada que no se pueda recuperar.
2. **Después de cada respuesta de la IA, mirá qué tocó.** (Los comandos `git`, desde la
   **raíz del repo** —donde `git status --short` lista las rutas con `app/` delante, y ese
   mismo path te sirve para `git diff`. Los de `npm`, desde `app/`.) Corré `git diff --stat`:
   te lista todos los archivos que cambiaron con cuántas líneas en cada uno. Ahí se ven las dos cosas
   que más te tienen que interesar: si aparece un `.test.tsx` (¿tocó un test que ya pasaba?)
   y si aparece `package.json` (¿te agregó una dependencia?). Para leer el detalle de uno
   solo: `git diff app/src/app/App.test.tsx` (con la ruta tal cual la mostró `git status`).
   Y `git status --short` te muestra además los
   archivos **nuevos** (con `??`), que `git diff` no lista. Esto es lo más rentable del
   curso: tres segundos que te dicen si te borró un test o tocó un archivo que no debías.
3. **Si lo que hizo no te gustó, no lo arregles: deshacelo.** `git restore .` vuelve a los
   archivos que la IA **modificó**. Ojo con un detalle que sorprende: los archivos **nuevos**
   que creó se quedan (aparecen con `??` en `git status --short`). Vedlos con
   `git ls-files --others --exclude-standard` y borralos a mano o pedile que los borre
   ella. Y si querés ver también lo que quedó ignorado (un `dist/` que la IA construyó para
   probar): `git status --ignored --short --untracked-files=all`.

   Deshacer no es fracasar; es parte del juego.
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
