# Fase 2 — la mini-tool de terminal (idea, alcance, y por qué va después)

> Estado: **no construido**. Idea registrada el 2026-08-03, decisión explícita del autor:
> *"Fase 2, después de la app"*. Este archivo es el punto de partida, no una especificación
> aprobada.

## La idea

El lado de tu terminal, mientras una IA (Pi / gentle-shell, Claude Code, lo que uses)
escribe el código de un paso, una ventanita muestra las cuatro cosas que este repo promete
por etapa:

```
┌── Pod Search · step 07 singleton de config ──────────────┐
│  CÓDIGO        src/config/appConfig.ts (+12 −0)          │
│                src/application/searchPodcasts.ts (+1 −1) │
│                                                          │
│  ARQUITECTURA  ui → application → port ⇠ infrastructure  │
│                                                          │
│  PATRÓN        Singleton ✔ detectado                     │
│                ┌──────────────────┐                      │
│   getAppConfig │  instance?  ──┐  │                      │
│   ────────────▶│  no → create  │  │──▶ misma instancia   │
│                └───────────────┼──┘                      │
│                                └─▶ (si no existía)       │
│                                                          │
│  RESULTADO   3 files · tests 4 passed · http://localhost:5173
└──────────────────────────────────────────────────────────┘
```

Lo valioso no es el dibujito: es que **te avisa cuando la IA no hizo lo que pediste**.
Si el archivo no tiene el `if` que chequea la instancia y siempre crea una nueva, el
diagrama muestra el flujo roto y el test del patrón falla. Sin esa señal, un principiante
no tiene forma de notar la diferencia entre código correcto y código que "anda igual".

## Dónde viviría

- **ghostty / herbr:** un panel o ventana flotante al lado de la sesión.
- **gentle-shell · Pi:** una extensión de Pi con su propio TUI component. Acá es donde hay
  más chances de que salga barato: Pi ya tiene extensiones, custom tools y TUI primitives
  (documentados en `docs/extensions.md` y `docs/tui.md` de la instalación de Pi, junto con
  ejemplos en `examples/extensions/`), y este repo ya corre con Pi. Hay que leer eso antes
  de escribir una línea.

## Por qué NO va primero

1. **Es más difícil que la app entera.** Leer código ajeno, sacarle la estructura, decidir
   "esto es un singleton" y dibujarlo sin mentir es un problema de análisis de código
   (AST, no regex). La app son fetch + list + searchbox. Si esta fuera el paso 1,
   repitiéramos exactamente el error del proyecto grande que frenó a todos.
2. **Necesita algo real que visualizar.** Su insumo son diffs, arquitecturas y patrones de
   una app que todavía no existe. Hacerla antes es diseñar sobre supuesto.
3. **Ya existe una versión ejecutable y gratis de la señal:** un test que pide la config dos
   veces y afirma que devuelve la misma instancia. Eso *es* el grafo del singleton, pero
   pasa o rompe, sin ambigüedad y sin escribir una tool. El paso 07 lo usa.

## Alcance sugerido cuando llegue el momento (para no repetir el error)

Mínimo viable, en este orden, con un corte después de cada punto:

1. Leer el `git diff` del paso y listar archivos tocados. **Sin analizar nada.**
2. Leer `ARCHITECTURE.md` del repo y pintar su diagrama (lo mantenemos a mano, sin
   parser). Ya cubre "arquitectura" sin AST.
3. **Detectar** el patrón ejecutando el test del patrón del paso (`pattern.spec.ts`), no
   interpretando el código. Verde = patrón presente. El dibujito se pinta según el resultado.
4. Recién ahí: AST liviano con [ts-morph](https://ts-morph.com) para el caso puntual de
   "¿hay un campo estático + un guard?", con fallback honesto ("no lo pude determinar")
   cuando no sea un singleton ni ninguna de las 3 formas conocidas.

Un detalle que hay que respetar en la Fase 2: **"no lo pude determinar" tiene que ser una
respuesta visible**. Una herramienta que inventa un diagrama para un código que no entendió
es peor que ninguna, sobre todo para alguien que está aprendiendo.
