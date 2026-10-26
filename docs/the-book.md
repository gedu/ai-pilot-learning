# El libro, y qué leer en cada paso

**The Amazing Gentleman Programming Book** — Alan Buscaglia.
🌐 [Leer online](https://the-amazing-gentleman-programming-book.vercel.app/en) ·
🇦🇷 [Versión en español](https://the-amazing-gentleman-programming-book.vercel.app/es) ·
📄 [PDF](https://the-amazing-gentleman-programming-book.vercel.app/gentleman-programming-book.pdf)

El libro son 21 capítulos y **no hace falta leerlo entero para hacer esta app**. Acá está
el índice real del sitio y qué usamos de cada uno.

## Índice completo (21 capítulos)

| # | Capítulo | Lo usamos |
|---|----------|-----------|
| 01 | Clean Agile (TDD, atomic design, user stories) | ✅ pasos 01 · 02 · 03 · 04 |
| 02 | Communication First and Foremost | 💬 todo el proceso con IA |
| 03 | Hexagonal Architecture | ✅ paso 08 |
| 04 | GoLang | ⬜ |
| 05 | NVIM | ⬜ |
| 06 | Algorithms | ⬜ |
| 07 | Clean Architecture | ✅ pasos 07 · 09 |
| 08 | Clean Architecture Front End | ✅ paso 09 |
| 09 | React | ✅ pasos 02 · 05 · 06 |
| 10 | TypeScript | ✅ paso 01 |
| 11 | Front End Radar | ⬜ |
| 12 | Angular | ⬜ |
| 13 | Barrels | 💬 paso 09 (por qué evitamos `index.ts` que re-exporta todo) |
| 14 | Front End History | ⬜ |
| 15 | IA Driven Development | ✅ paso 10 + [`prompting.md`](prompting.md) |
| 16 | Frontend Manual | ⬜ |
| 17 | Soft Skills | 💬 antes de trabajar en duo |
| 18 | Software Architecture | ✅ paso 07 (por qué una config global) |
| 19 | AI Orchestration Patterns | 🔜 Fase 2 |
| 20 | From Token to Agent | 🔜 Fase 2 |
| 21 | Verifiable Trust | 🔜 Fase 2 |

✅ = leerlo antes o durante ese paso · 💬 = conviene, no bloquea · ⬜ = no hace falta ·
🔜 = entra en la Fase 2 (la tool de terminal, [`tool-idea.md`](tool-idea.md))

## Lo que sí necesitamos del capítulo 01 (y por qué va primero)

Tres ideas del capítulo 01 sostienen toda la app; las tres las vamos a *tocar*, no sólo leer:

1. **Pensar en pieces chicos (atomic design).** Un `PodcastCard` es un átomo: si mañana
   cambia la foto, cambiás un archivo y cambia en toda la app. Un `App.tsx` de 400 líneas
   no se puede ni testear.
2. **TDD.** Primero el test que falla, después el código que lo hace pasar. Con IA esto
   vale el doble: el test es la prueba de que la IA no te está mintiendo.
3. **Feedback rápido.** No esperes al final. Cada paso termina en algo que ves en el
   browser en menos de una hora.

## Y del capítulo 03 (hexagonal), la única frase que importa hoy

> La lógica de negocio no debe conocer el mundo de afuera.

Traducido a esta app: `searchPodcasts` no sabe que existís vos, ni iTunes, ni `fetch`.
Recibe una función que le devuelve podcasts. Por eso en el paso 08 podemos cambiar iTunes
por datos mock **sin tocar la pantalla**. Eso es el paso 08, y es lo que hace que el paso
03 (datos mock) no haya sido tiempo perdido.

## Un aviso honesto sobre el patrón Singleton

**El libro no tiene un capítulo de Singleton.** Lo usamos en el paso 07 a propósito y por
una razón concreta: queremos **un solo lugar** donde vive la URL de iTunes, y queremos que
el efecto de "¿lo hice bien?" sea *visible* en un test (ver
[`steps/step-07-singleton-config/`](../steps/step-07-singleton-config/)).

Es un patrón chico, con una trampa conocida: si se usa mal, esconde dependencias y hace los
tests más difíciles. Por eso el paso 07 también muestra el **flujo roto** (el `if` que falta
y crea la instancia siempre) y por qué un test lo detecta al toque. Si querés la versión
amplia de "por qué esto importa", es el capítulo 18.
