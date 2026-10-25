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

## Si algo no funciona

- <problema real y su causa real. Máximo 3 bullets.>
```

## prompt.md

Un prompt listo para copiar/pegar en Claude/ChatGPT/Cursor. Formato:

````
Copiá esto y pegalo tal cual en tu IA:

​```
<el prompt>
​```
​
<1 o 2 líneas sobre qué hacer cuando devuelve algo>
````

Reglas del prompt (importan, son el corazón del repo):

1. **Se pide el comportamiento, no sólo "haceme X"**. Un prompt que dice
   "haceme un config" produce un config cualquiera; uno que dice "la URL tiene que
   vivir en un archivo, que se cree una sola vez y que cualquiera la pida" produce
   un singleton. Los detalles del patrón van **dentro** del prompt.
2. Pide **el test junto con el código**, y dice qué tiene que probar el test.
3. Dice **qué archivo crear y dónde**, porque un principiante no sabe nombres de
   carpeta, y porque así podés comparar contra `expected.md`.
4. Pide que la IA **explique qué hizo en 3 líneas** al final. Sin explicación no hay
   aprendizaje.
5. En español, con vocales y acentos correctos: se copia y pega, no se traduce.
6. Un prompt por paso. No se mezclan dos ideas.

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

## Qué NO va en un paso

- Código fuente pegado completo: se ve en `git checkout step-NN`, y si lo pegamos
  acá la IA lo copia sin pensar.
- Dos conceptos juntos. Un paso, una idea.
- Requisitos que nadie pidió. El paso 06 no agrega "y de paso hacelo responsive".
- Comandos que no probamos. Todo lo que esté escrito acá fue ejecutado.
