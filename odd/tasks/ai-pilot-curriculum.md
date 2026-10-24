# Feature: AI Pilot Learning — step-by-step curriculum (podcast search app)

Hand a beginner duo a repo where each step is one small AI prompt, one visible result, and
one picture of what "done" looks like. The app is a podcast searcher over the free iTunes
Search API. Every step teaches one idea from The Amazing Gentleman Programming Book and
shows it in code, architecture, pattern, and result.

## Specs

S1. Audience, verbatim: "unos amigos que tienen un conocimiento muy basico de que es
    programar, solo hicieron un par de cursos, pero no trabajaron nunca en programacion, ni
    y seguro si los dejamos solos para que hagan algo no tienen mucha idea. Pero ahora
    quieren meterse con la IA a hacer cosas, apps web, o apps en general, pero no saben como
    empezar". They have Claude/ChatGPT, no tooling habits, no idea how to start.

S2. Why small, verbatim: "les habia dado un proyecto (que era grande) y no sabian como
    empezar, asique quiero hacer algo mas pequeno para que puedan empezar". Consequence: the
    first thing in the repo must be runnable in minutes, and no step may require a decision a
    beginner cannot make.

S3. Book credit, verbatim: "/Users/eduardo.graciano/Downloads/gentleman-programming-book.pdf,
    este recurso es muy bueno y excelente donde explica todo desde las bases hasta la IA y
    como programar con IA, sacado de
    https://the-amazing-gentleman-programming-book.vercel.app/en, nombremoslo cualquier cosa
    y damos credito a Alan." The book/site is named briefly and visually, with credit to Alan
    Buscaglia. Do NOT restate the PDF: "No quiero TODO lo que esta en el pdf, sino lo mas
    importante de a poco".

S4. The four-panel ritual, verbatim: "Quiero capaz que se nombre el libro o web para leer,
    pero de una forma muy breve y visual por etapas quiero que la app que se arme con la IA se
    pueda visualizar el codigo, la arquitectura, el patron, y el resultado". Every step
    exposes: code touched, architecture, pattern, result.

S5. App choice, verbatim: "capaz pensaba en una app que lea RSS o temas de IA, nose de donde
    sacar, o podcast usando la api de iTunes que creo que es gratis". Chosen: iTunes Search
    API (verified: no API key, `access-control-allow-origin: *`, so a browser can fetch it
    directly with no backend).

S6. The pattern, verbatim: "patron a aplicar, singleton, dentro de la app vamos a hacer un
    config file donde este la url de itunes y solo creamos una instancia, para poder usar,
    escribir el prompt de como seria." The step must (a) put the iTunes URL in a config file,
    (b) create exactly one instance, (c) ship the ready-to-paste prompt that asks for it.

S7. The pattern must be *visible*, verbatim: "en una ventana se ve una caja donde dice el
    nombre del file, la IA detecta si es efectivamente un singleton, muestra el 'flujo' una
    flecha que entra, otra que checkea si existe la instancia, si existe la devuelve sino la
    crea, y una flecha que sale devolviendo la misma instancia, si el codigo que se produjo NO
    hace eso, falta el if y siempre crea, entonces eso se refleja en el grafico". Delivered as
    two diagrams (correct singleton vs the broken no-`if` version) plus a test that fails when
    the `if` is missing. A code-parser visualizer is Phase 2 (S10), not this repo.

S8. Step list, verbatim: "vamos haciendo paso a paso, que se cree el proyecto, se cree la
    home, se cree la lista que fetchea datos mock, tests, despues fetchea de verdad, muestra,
    un searchbox, se usa arquitectura hexagonal para X cosa, etc etc." The step order follows
    this sequence; hexagonal is applied to the fetching seam only, not everywhere.

S9. Deliverable, verbatim: "lo principal ahora es hacer la app, para pasar el repositorio y
    que empiece, ya sea una carpeta con Steps, y al final de cada step una imagen de como
    deberia verse". So: real working app + `steps/` folder + one screenshot per step showing
    how it should look.

S10. Terminal side-panel tool, verbatim: "nose si estaria genial poder hacer una mini tool o
    nose como seria para agregar a las terminales, como el side panel de herbr o la ventana
    flotante de Status ahora, que soporte ghosty herbr y gentle-shell, osea Pi". User decided
    "Fase 2, despues de la app": documented in `docs/tool-idea.md` with scope and why it is
    not first. Not built here.

S11. Stack, user-selected: React + Vite + TypeScript, web only, Vitest for tests. Preview
    structure agreed: `src/main.tsx`, `src/app/App.tsx`, `src/domain/Podcast.ts`,
    `src/application/searchPodcasts.ts`, `src/infrastructure/iTunesRepository.ts`,
    `src/config/appConfig.ts` (the singleton), `src/ui/SearchInput.tsx`,
    `src/ui/PodcastCard.tsx`.

S12. Depth, user-selected: steps + prompts + reference code. Each step folder has
    `README.md` (what/why/how to check), `prompt.md` (copy-paste prompt), `expected.md` (what
    done looks like). The app has one commit per step so `git checkout step-05` reproduces
    that step's state.

## Tasks

- T1 — Repo skeleton: README with brief visual stage map + book credit (S1-S4), `docs/`
  (book notes, Phase-2 tool idea S10). Route: inline. Commit: `docs: curriculum skeleton`.
- T2 — App steps 1-4: Vite+React+TS project, home, mock list of podcasts, first Vitest tests.
  Route: inline (one coherent hand over shared files). Commits: one per step.
- T3 — App steps 5-7: singleton config with iTunes URL (S6-S7), real fetch, searchbox.
  Route: inline. Commits: one per step.
- T4 — App steps 8-10: hexagonal seam for fetching (S8), loading/empty/error states, UX
  polish. Route: inline. Commits: one per step.
- T5 — One screenshot per step into `steps/step-NN-*/expected.png`, browser or terminal as
  appropriate (S9). Route: inline, `agent-device`/Chrome once the app runs.
- T6 — `steps/step-NN-*/{README.md,prompt.md,expected.md}` for all 10 steps, written against
  the code that exists. Route: two workers, disjoint surfaces (`steps/step-01..05`,
  `steps/step-06..10`).
- T7 — Verify every step from a clean clone: each `git checkout step-NN` builds, tests pass,
  and the picture matches. Route: `gentle-ai-verify`. Commit: fixes as needed.
- T8 — Native review of the work-unit commits + close-out. Route: `gentle_review`.

## Log

L1. "podes clonar aca este repo: https://github.com/gedu/ai-pilot-learning.git"

L2. Full request as quoted in S1-S10 above (audience, small-first, book credit to Alan,
    four-panel visual by stages, iTunes/podcast idea, singleton-config pattern with the
    flow diagram, not the whole PDF, step list, deliverable = app + steps + picture per step,
    terminal side-panel tool idea).

L3. Assistant pushback accepted by silence: a code-parsing pattern visualizer is harder than
    the whole app and is not an MVP, so it becomes Phase 2; the pattern is taught with a
    failing test plus hand-drawn diagrams instead.

L4. User decisions (`ask_user_question`): stack = "React + Vite (solo web)"; depth = "Steps +
    prompts + reference"; terminal tool = "Fase 2, despues de la app".

L5a. Slice boundary recorded deliberately: `c08b72e` is the docs slice (391 lines). The step
     01 commit `154601a` is ~2795 lines of Vite scaffold output, which trips the 400-line
     review slice. Not split: it is generated boilerplate that beginners must receive whole
     as one runnable unit (the whole point of step 01 is "it runs"), and no hand-written
     logic rides along with it. Evidence for steps: tags `step-00`..`step-10` on the app
     commits, one per step, so `git checkout step-NN` reproduces a step.

L5. Verified facts, not assumptions: iTunes Search API returns 200 with
    `access-control-allow-origin: *` and no key requirement (so no proxy/backend needed); the
    book has 21 chapters, relevant ones 01 Clean-Agile, 03 Hexagonal, 07/08 Clean
    Architecture, 09 React, 10 TypeScript, 15 IA-Driven Development, 19 AI Orchestration
    Patterns, 20 From Token to Agent; Chrome, Playwright chromium and `agent-device` are
    installed locally, so per-step screenshots are reproducible.
L6. Observed while proving step 08's claim (swap one container line to the fake
    repository): the screen goes blank, because the initial term
    "inteligencia artificial" matches none of the three local fixtures. The fake
    repository behaves correctly (empty result); the app has no empty state, so the
    user sees nothing and cannot tell "no results" from "broken". Reverted the swap.
    Consequence: step 10 must cover the empty state, and its prompt must ask for it
    explicitly; the swap itself becomes step 10's exercise for seeing it happen
    without touching the network.
L7. T2-T4 evidence (app commits, one per step, each tagged): step-01 `154601a`,
    step-02 `9eb375a`, step-03 `c64d97d`, step-04 `b224313`, step-05 `3c46ed0`,
    step-06 `0a68cd5`, step-07 `04db128`, step-08 `5a16dd1`, step-09 `16567e9`,
    step-10 `9057b5e`. Screenshots commit `c3f4f4d` (10 expected.png + pattern.png,
    captured from detached worktrees of each tag). Counts by tag, re-run after the
    fact: 1/3/8/15/21/24/30/34/38/46 passing.

L8. Behaviour checks that were not test-only: browser runs through Playwright for
    steps 03/05/06/08/09/10, including live iTunes searches, and the four step-10
    states captured with the network cut, aborted, emptied and filled. Mutation
    probes: removing the singleton `if` fails exactly the two identity tests;
    replacing the loose-filter guard fails three tests; replacing searchNow with a
    no-op fails the Enter test (after that test was rewritten with fake timers,
    because with real timers it passed while Enter did nothing).

L9. T5/T6 done. T7 evidence: fresh clone of the repo installed with `npm install`
    (exit 0, no audit errors reported in log) and, at every one of the ten tags,
    `npx vitest run` and `npm run build` both succeeded (counts as in L7). An
    independent verify pass over docs vs each tag found 4 claims that would mislead
    a beginner and 4 minor ones; all fixed in `19de510` and re-checked by hand.

L10. Open, needs a user decision (destructive git): the fixed code comments exist
     only on the branch tip. Tags step-06/07/08 still carry the `isTypingAhead`
     comment naming an identifier that does not exist, and tag step-08 still says
     the repository is chosen "in main.tsx" instead of app/container.ts. Fixing them
     at the tag requires rewriting two local commits and moving those tags; nothing
     is published (origin/main is still the initial commit), but history rewrite plus
     tag moves is a destructive operation and was blocked by policy pending explicit
     authorization.
