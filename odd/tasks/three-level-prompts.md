# Feature: tres niveles de prompt por paso (Starter / Medium / Advanced)

Rama `feat/three-level-prompts` sobre `main` (`1090f16`, PRs #1-#3 mergeados).
Cambia los 10 `steps/step-NN-*/prompt.md` de UN prompt a TRES, ordenados de menos a más
especificidad. Docs en español rioplatense; commits en inglés.

## Specs

**S1** (pedido literal): *"Lo que yo haria dentro de cada nivel, cada prompting.md, poner
al menos 3 prompts, Starter, Medium, Advanced, cada uno con menos especificidad, para que
se pueda ver que pasa, que crea el agente con cada uno, dejamos el expected igual, si puede
llegar a eso genial, sino damos algo de libertad"*
→ Cada `steps/step-NN-*/prompt.md` tiene **exactamente tres** bloques copiables, en este
orden: **Starter** (vago, 1-2 frases), **Medium** (comportamiento y contexto, sin nombres
de archivo), **Advanced** (el prompt detallado que ya existe hoy, texto intacto). Orden
Starter→Advanced arriba: el answer key queda abajo de la página.

**S2** (pedido literal): *"dejamos el expected igual"*
→ Los 10 `expected.md` **no se reescriben**. Son la vara del Advanced. Se agrega como
mucho una nota corta que diga qué hacer cuando se jugó con Starter o Medium (S3).

**S3** (pedido literal): *"si puede llegar a eso genial, sino damos algo de libertad"*
→ Cada paso deja explícito que **Starter y Medium no se juzgan contra `expected.png`**:
lo que se mira es qué decidió la IA sola. `expected.md` sigue siendo obligatorio sólo para
el Advanced, que es el camino que reproduce el tag.

**S4** (pedido literal, la razón de ser): *"para que se pueda ver que pasa, que crea el
agente con cada uno"*
→ Cada trío viene con un **checklist de 3-4 observaciones** comparables entre niveles:
`git diff --stat` (¿dependencias? ¿archivos nuevos? ¿tocó tests?), qué creó sin que se le
pidiera, y qué hubiese que agregar al Starter para que salga más cerca. Las secciones
"Jugá con esto" de los pasos 01/05/06/10 que ya tienen hallazgos **medidos** (L8-L12 de
`prompting-play.md`) se conservan y se enlazan; para los 6 pasos sin medición, el checklist
es instrucciones de observación, **nunca promesa de resultado** (misma regla S4 de la
feature anterior).

**S5** El Advanced **no se toca**: cero ediciones al texto de los diez prompts actuales.
Evolución aditiva (regla de todo este repo). Verificación: extraer el bloque Advanced de
cada `prompt.md` nuevo y comparar que contenga el bloque actual byte a byte.

**S6** `docs/prompting.md`: la "escalera de 4 niveles" se renumera a **tres** (Starter /
Medium / Advanced) para que el concepto y los archivos usen los mismos nombres; el contenido
de los ejemplos se conserva (niveles 1+2 fusionados en Starter, el 3 pasa a Medium, el 4 es
Advanced). Las secciones de reglas y de "cómo jugar sin romperse" quedan.

**S7** `steps/_FORMATO.md` describe el nuevo formato de `prompt.md` (tres bloques, largo de
cada uno, el checklist, qué va arriba) y ajusta el presupuesto de lectura: Starter y Medium
son de 1-2 líneas cada uno; el Advanced conserva lo que ya medimos (293-663 palabras).

**S8** La inversión del ritual queda reflejada en el README raíz: el loop dice
"probá el Starter → mirá qué hizo → subí a Medium → Advanced si querés el resultado del
curso", en vez de "copiá el prompt.md".

**S9** Todo comando que aparezca en texto nuevo: ejecutado antes (zsh, desde `app/` cuando
aplique). Toda cita textual: verificada contra el archivo que cita.

## Tasks

| ID | Spec | Ruta | Responsable | Commit |
|----|------|------|-------------|--------|
| T1 | S7 | `steps/_FORMATO.md`: plantilla del prompt.md de tres niveles + presupuesto | padre inline | docs |
| T2 | S1,S4 | Ejemplo worked: `steps/step-06-searchbox/prompt.md` (tiene la escalera de referencia ya escrita) | padre inline | docs |
| T3 | S1,S4,S5 | Los otros 9 `prompt.md` (01-05, 07-10) siguiendo el ejemplo de T2 | 3 workers, superficies disjuntas | docs |
| T4 | S2,S3 | Nota de latitud en los 10 `expected.md` (una línea, misma redacción) + inversión del ritual en `README.md` (S8) | padre inline | docs |
| T5 | S5,S6,S9 | Verificación: bloque Advanced idéntico en los 10; links; comandos; claims. Enlace de `docs/prompting.md` (S6) | padre inline | docs |

## Log

**L1** · Contexto: tras mergear la feature de prompting (`feat/prompting-play`, PRs #2 y
#3), el usuario pregunta "donde esta subido la progresion de prompt, porque se da todo no?".
El diagnóstico acordado: la progresión real tenía 2 escalones (los niveles 2 y 3 existían
una sola vez, escritos para el paso 06), el `prompt.md` de referencia estaba a la vista y
arriba, y el ritual del README empujaba a pegarlo primero.

**L2** · Decisión del usuario (verbatim, vía la pregunta de alcance): "Lo que yo haria
dentro de cada nivel, cada prompting.md, poner al menos 3 prompts, Starter, Medium,
Advanced, cada uno con menos especificidad, para que se pueda ver que pasa, que crea el
agente con cada uno, dejamos el expected igual, si puede llegar a eso genial, sino damos
algo de libertad". Esto reemplaza el menú de 4 opciones que se le había ofrecido y resuelve
de una los problemas 1, 2 y 3 del diagnóstico (inversión de ritual, tapar la respuesta, y
práctica de la progresión) por estructura de página.

**L3** · Ejemplo worked (step-06) y dos violaciones propias agarradas antes de escalarlo a
los otros nueve: (1) mi Medium inicial: 9 líneas contra el presupuesto 3-6 que yo había
escrito en `_FORMATO.md` diez minutos antes; recortado a 6, y lo que se perdió (el matiz del
match laxo de iTunes) se convirtió en un bullet del checklist: sentir ese hueco ES la lección
de "describir comportamiento vs conocer esta API". (2) Predicción fabricada en el checklist
("el Starter suele dejar una llamada por letra") que la corrida medida L6 desmiente: esa
corrida puso un debounce de 300ms sola. Reescrito como observación que cubre las dos salidas
y cita el 300ms como lo que es: una posibilidad medida, no una promesa.

**L4** · Dos hallazgos de metodología de delegación:
- **El delimitador mata la receta**: los pasos 01-05 envuelven su prompt en CUATRO backticks
  (tienen bloques ``` adentro); 06-10 usan tres. Un worker con la receta ingenua PARÓ y lo
  reportó antes de escribir — bien; el formato ahora tiene una subsección dedicada (commit
  a9a8310) y cada worker verificaba el suyo contando.
- **El worker de 07-10 fracasó idéntico dos veces** ("ahora voy a escribir" y cero archivos,
  70 y 43 turnos). Tercer relanzamiento sería apostar: los cuatro se hicieron inline con la
  misma transformación mecánica. El worker de 01-03 se quedó corriendo después de que el
  padre hiciera su parte; mandado STOP y cancelado, árbol verificado limpio después.

**L5** · T3/T4/T5 cerrados. Los diez pasos con Starter (9-28 palabras) / Medium (92-129) /
Advanced (247-623), bloque Advanced **byte-idéntico** verificado por substring contra el
commit padre en los diez, fences balanceados en todo el repo, 56 links internos OK, app/
cero archivos tocados, suite 54 verde + oxlint + build. Nota de libertad idéntica en los
diez expected.md (script, no a mano). Ritual invertido en README (diagrama y loop). Escalera
de `docs/prompting.md` renumerada a tres con los nombres de los archivos.
Fixes de contenido agarrados en auditoría: tres ejemplos de `git diff` con rutas
dependientes de cwd que daban VACÍO con exit 0 desde `app/` (verificado en zsh contra un
commit que realmente tocaba el archivo: 55 líneas desde la raíz, 0 desde app/) — todos los
comandos git ahora dicen "desde la raíz del repo"; dos typos míos (poné-la, Importe) y una
frase compartida desunificada entre archivos (comparas→compares).
Nativo `assess`: riesgo medium (por el propio doc del feature marcado ejecutable),
`reviewDue: false` (under_budget), plan = autoverificación del escritor sin verificador
separado. Seguido.

**L6** · Criterios: **S1** (tres niveles, orden vago→detallado) ✓ diez archivos medidos;
**S2** (expected.md intactos) ✓ diff no toca checklist alguno, sólo la cita de libertad; **S3**
(Starter/Medium no se juzgan contra la foto) ✓ en README, cita de expected.md y
_FORMATO; **S4** (checklists de observación, nada prometido; citas sólo de corridas L6/L8/L9/L12
con fuente) ✓; **S5** (Advanced byte-idéntico) ✓ por substring en los diez; **S6** (escalera
renumerada) ✓ sin restos de "Nivel N"; **S7** (formato) ✓; **S8** (ritual invertido) ✓;
**S9** (comandos ejecutados antes, citas grepadas) ✓ — incluida la verificación en zsh desde
ambas cwd y el conteo <form|<button en los tags para la afirmación del paso 02.
