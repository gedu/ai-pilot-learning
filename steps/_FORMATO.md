# Formato de un paso

Todos los `steps/step-NN-*/` se escriben igual. Un paso son tres archivos, y se leen
en este orden: `README.md` → `prompt.md` → `expected.md`. Regla de oro: **el paso se
juzga contra `expected.md`, no contra la buena voluntad de la IA.**

## Cuánto texto

El lector hizo dos cursos y nunca trabajó programando. Cada archivo se lee en **2 a
4 minutos**. Si algo necesita más, se corta o se mueve a una nota. Nada de muros.

## README.md

```
# Paso NN — <Nombre>

<2 o 3 líneas: qué vamos a lograr en este paso y por qué existe.>

## Qué tocamos (CÓDIGO)

- `ruta/al/archivo.ts` — qué cambia ahí, en una línea.

## Cómo encaja (ARQUITECTURA)

<diagrama chico en bloque de código ASCII o Mermaid, del paso, no de toda la app>

## La idea de este paso (PATRÓN / concepto)

<3 a 6 líneas explicando la única idea del paso. Sin definiciones de Wikipedia.>
<Si viene del libro, link al capítulo: [capítulo 03](../docs/the-book.md).>

## Cómo lo verificás

1. `npm test` → te tiene que decir `X passed`.
2. <una cosa concreta que mirar en la pantalla o en la terminal>

## Jugá con esto (opcional)

<opcional: sólo en los pasos marcados en la tabla de abajo. Ver la sección final.>

## Si algo no funciona

- <problema real y su causa real. Máximo 3 bullets.>
```

## prompt.md

Tres prompts para el mismo paso, del más vago al más detallado. Se prueban en ese orden:
el **Starter** muestra qué decide la IA sola, el **Advanced** es el que reproduce
`expected.md`. El orden no es cosmético: el answer key queda al final de la página, así
que jugar primero no exige fuerza de voluntad.

````
# Paso NN — tres formas de pedirlo

Arrancá por el Starter y miré qué hace la IA. Si se fue por las ramas, subí a Medium.
Si querés que quede igual que `expected.png`, pegá el Advanced.

## Starter — como se le pide a un amigo

Copiá esto y pegalo tal cual:

​```
<1 o 2 frases. Qué se quiere, en el idioma en que se lo dirías a alguien. Sin nombres de
archivo, sin tipos, sin librerías.>
​```

## Medium — el comportamiento, sin decir cómo

Copiá esto y pegalo tal cual:

​```
<3 a 6 líneas: qué tiene que pasar, qué NO tiene que pasar, y el contexto que la IA no
puede adivinar (en qué carpeta está la app, qué hace hoy). Describe el comportamiento; no
nombra archivos ni funciones.>
​```

## Advanced — el prompt del curso

Es el que reproduce `expected.md` y el tag `step-NN`. Copiá esto y pegalo tal cual:

​```
<el prompt largo de siempre, con nombres de archivo, tipos y qué prueba cada test>
​```

<1 o 2 líneas sobre qué hacer cuando devuelve algo>

## Qué mirar después de cada nivel

- `git diff --stat`: ¿apareció `package.json`? ¿un `.test.tsx`? ¿archivos nuevos?
- <2 o 3 observaciones concretas de ESTE paso: qué decisión tomó la IA que el pedido no
  pidió, y dónde verla>
````

Reglas de los tres niveles (importan, son el corazón del repo):

1. **Starter no nombra nada técnico.** Ni archivo, ni tipo, ni librería, ni comando. Si
   tenés que nombrar algo para que se entienda, eso ya es Medium.
2. **Medium describe el comportamiento y el contexto**, nunca la solución. "La espera se
   reinicia si sigo tecleando" sí; "hacé un hook useDebouncedValue" no. Es el nivel que
   más enseña: sale bien aunque la IA elija otra forma de implementarlo.
3. **Advanced no se edita nunca.** Es el que encastra con el tag y con `expected.png`;
   cambiarlo rompe la comparación. Si algo del paso cambia, se cambia en las tres
   apariciones (paso, tag, expected) o en ninguna.
4. **`expected.md` es la vara del Advanced.** Con Starter y Medium no se compara contra la
   foto: se mira qué decidió la IA. Los tres niveles tienen salida propia y ninguna es
   "estar mal".
5. **"Qué mirar después de cada nivel" es obligatorio**, y es un checklist de observación,
   no una promesa. Se pueden citar resultados medidos (corridas reales, registradas en
   `odd/tasks/`), pero con la fuente: "en la corrida de prueba salió X".
6. El **largo** es presupuesto, no sugerencia: Starter 1-2 líneas, Medium 3-6, Advanced lo
   que venía ocupando (293-663 palabras en los pasos actuales). Si Medium crece, está
   haciendo el trabajo del Advanced.

Reglas del prompt (aplican a los tres, sobre todo al Advanced):

1. **Se pide el comportamiento, no sólo "haceme X"**. Un prompt que dice
   "haceme un config" produce un config cualquiera; uno que dice "la URL tiene que
   vivir en un archivo, que se cree una sola vez y que cualquiera la pida" produce
   un singleton. Los detalles del patrón van **dentro** del prompt.
2. Pide **el test junto con el código**, y dice qué tiene que probar el test.
3. Dice **qué archivo crear y dónde**, porque un principiante no sabe nombres de
   carpeta, y porque así podés comparar contra `expected.md`. (Esto es del Advanced: el
   Starter y el Medium lo omiten a propósito.)
4. Pide que la IA **explique qué hizo en 3 líneas** al final. Sin explicación no hay
   aprendizaje.
5. En español, con vocales y acentos correctos: se copia y pega, no se traduce.
6. Un pedido por nivel. No se mezclan dos ideas en el mismo bloque.

## expected.md

```
# Cómo se ve el paso NN terminado

![Paso NN](expected.png)

## Debe estar

- [ ] <cosa observable 1, en la pantalla o en `npm test`>
- [ ] <cosa observable 2>

## El detalle que delata que quedó bien

<1 o 2 frases con el detalle específico de ESTE paso: qué mirar para saber que no
es una aproximación. Ej: en el paso 07, que dos llamadas devuelvan la MISMA
instancia, no dos objetos parecidos.>

## Si te quedó distinto

<qué hacer: revisar, pedir el arreglo, o `git checkout step-NN` para comparar.>
```

## La sección "Jugá con esto" (opcional)

Existe porque el `prompt.md` es largo y preciso, y alguien que nunca programó puede
creer que promptear es saberse todos los nombres de antemano. La sección muestra el otro
extremo: el mismo pedido, hecho como se le pide a un amigo. Hoy la tienen los pasos
**01, 05, 06 y 10** (donde la ambigüedad enseña algo y el costo de equivocarse es bajo).

Reglas, todas obligatorias:

- **Nunca reemplaza al `prompt.md`.** El juego arranca con el paso ya commiteado y se
  deshace después; el prompt de referencia sigue siendo el camino que reproduce
  `expected.md` y el tag.
- El pedido vago va en **bloque de código, una o dos frases**, sin nombres de archivo ni
  de tipos. Si parece un `prompt.md` corto, está mal.
- Le sigue un **checklist de 3 o 4 cosas para mirar**, en segunda persona, sobre algo que
  se pueda observar (un conteo de pedidos en Network, un `npm test`, qué se ve con la caja
  vacía). Nunca una promesa de resultado ("vas a ver que…"): qué hace una IA con un pedido
  vago cambia entre modelos y versiones.
- Si algo se afirma de **una corrida concreta**, va escrito como tal ("en la corrida de
  prueba salió X") y tiene que estar medido y registrado en el doc de feature. Sin
  medición, no va.
- Link a [`docs/prompting.md`](../docs/prompting.md) para el antes-de-jugar (commit) y el
  deshacer.
- **Presupuesto de lectura.** El techo de 4 minutos de "Cuánto texto" aplica a lo
  **obligatorio** (el README sin esta sección, el `prompt.md`, el `expected.md`). "Jugá con
  esto" es opcional y tiene techo propio: **3 minutos** (~600 palabras). Un README con la
  sección completa puede leerse en 5 o 6 minutos; está bien, porque la sección se puede
  saltear. Lo que no está bien es que lo obligatorio crezca.

## Qué NO va en un paso

- Código fuente pegado completo: se ve en `git checkout step-NN`, y si lo pegamos
  acá la IA lo copia sin pensar.
- Dos conceptos juntos. Un paso, una idea.
- Requisitos que nadie pidió. El paso 06 no agrega "y de paso hacelo responsive".
- Comandos que no probamos. Todo lo que esté escrito acá fue ejecutado.
