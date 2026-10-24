# AI Pilot Learning

> ¿No sabés por dónde empezar con la IA? Este es el mejor lugar.

Aprender a programar **con** IA, haciendo una app real de a un paso por día.
Nada de proyectos gigantes que paralizan: cada paso es **un prompt**, **un resultado**,
**una foto de cómo debería verse**.

**Para quién:** alguien que hizo un par de cursos, nunca programó en serio, y tiene
Claude/ChatGPT pero no sabe qué pedirle.

**Qué vamos a construir:** [Pod Search](https://localhost:5173) 🔎 — un buscador de
podcasts de IA que usa la [iTunes Search API](https://performance-partners.apple.com/search-api)
(gratis, sin API key, sin backend).

> 📚 Casi todo lo que vas a leer acá está mejor explicado en
> **The Amazing Gentleman Programming Book** de **Alan Buscaglia** —
> [leelo gratis online](https://the-amazing-gentleman-programming-book.vercel.app/en) ·
> [PDF](https://the-amazing-gentleman-programming-book.vercel.app/gentleman-programming-book.pdf).
> Este repo **no** resume el libro: en cada paso te dice exactamente qué capítulo leer.

---

## El ritual de cada paso

Cada carpeta `steps/step-NN-*/` tiene tres archivos que se leen en 2 minutos y se leen
siempre igual:

```
┌────────────────────────────────────────────────────────────┐
│ 1. prompt.md      →  copialo y pegalo en tu IA. Tal cual.  │
│ 2. README.md      →  qué estamos haciendo, y el CÓDIGO     │
│                      que tocamos + la ARQUITECTURA (diagrama)│
│ 3. expected.md    →  cómo sé que quedó bien  +  📷 expected.png
└────────────────────────────────────────────────────────────┘
     CÓDIGO        ARQUITECTURA        PATRÓN        RESULTADO
```

Si te trabás, no pelees: `git checkout step-05` y ves el código de ese paso hecho.
Después `git checkout main` (o `git checkout -` ) y seguís.

## Las 10 etapas

| # | Etapa | Qué vas a ver funcionando | Capítulo del libro |
|---|-------|---------------------------|--------------------|
| 01 | 🏗️ [El proyecto](steps/step-01-proyecto/) | `npm run dev` abre una página en el browser | 09 · 10 |
| 02 | 🏠 [La home](steps/step-02-home/) | Título y un searchbox que todavía no hace nada | 01 (atomic design) |
| 03 | 📋 [Lista con datos mock](steps/step-03-lista-mock/) | 3 podcasts escritos a mano, en pantalla | 01 (atomic design) |
| 04 | 🧪 [Tests](steps/step-04-tests/) | Un test que falla y lo hacemos pasar (TDD) | 01 (TDD) |
| 05 | 🌐 [Fetch real a iTunes](steps/step-05-itunes-real/) | Búsqueda real contra la API de Apple | 09 |
| 06 | 🔍 [Searchbox funcionando](steps/step-06-searchbox/) | Escribís → la lista cambia | 09 |
| 07 | 🧩 [Singleton de config](steps/step-07-singleton-config/) | La URL vive en un config, **una** instancia | 07 · 18 |
| 08 | ⬡ [Hexagonal en el fetch](steps/step-08-hexagonal/) | La UI deja de conocer a iTunes | 03 |
| 09 | 🧹 [Refactor limpio](steps/step-09-refactor-clean/) | Mismo behavior, código que se lee solo | 07 · 08 |
| 10 | ✨ [Detalles de UX](steps/step-10-detalles-ux/) | Loading, error, vacío, Enter para buscar | 15 |

Cada etapa tiene su `expected.png`. Si tu pantalla no se parece, no terminaste. 📷

## Cómo se usa (el loop completo)

1. **Leé** el `README.md` del paso (2 min). Elegí *un* paso, siempre en orden.
2. **Copiá** el `prompt.md` y pegalo en Claude/ChatGPT/Cursor. Si no sabés abrir
   la terminal o crear archivos, pedile eso primero, en español, como a una persona.
3. **Ejecutá** lo que te diga. Algo va a fallar: pegale el error **completo** y
   dejalo arreglarlo. Eso también es programar.
4. **Compará** contra `expected.md` + `expected.png`.
5. **Commiteá** (`git add -A && git commit -m "step 03: lista mock"`). Un commit por
   paso, siempre. Si mañana rompiste todo, `git diff` te salva la vida.

## Qué necesitás

- [Node.js](https://nodejs.org) 20 o más (un `node -v` alcanza para checkear)
- Cualquier IA con la que te sientas cómodo
- Un browser

## Qué esto **no** es

- ❌ No es el libro entero. Es un camino mínimo: 10 pasos, una app, y los capítulos
  exactos que hay que leer en cada uno.
- ❌ La mini-tool de terminal que muestra código/arquitectura/patrón/resultado al
  lado de tu sesión (estilo side panel de herbr o ventana flotante de Status, para
  ghostty / herbr / gentle-shell·Pi) **es la Fase 2**: tiene su idea y su alcance en
  [`docs/tool-idea.md`](docs/tool-idea.md). Primero la app; visualizar algo que no
  existe todavía es decorar un castillo en el aire.

## Crédito

Idea, estructura pedagógica y concepto de "visual por etapas": Eduardo Graciano.
Contenido técnico de referencia: Alan Buscaglia —
[The Amazing Gentleman Programming Book](https://the-amazing-gentleman-programming-book.vercel.app/en).
Mapa de capítulos → pasos: [`docs/the-book.md`](docs/the-book.md).
