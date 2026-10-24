# Cómo se ve el paso 03 terminado

![Paso 03](expected.png)

## Debe estar

- [ ] Título, subtítulo y la caja "Buscar podcasts" como en el paso 02.
- [ ] El aviso "Escribí algo arriba para empezar a buscar." **ya no está**.
- [ ] Tres tarjetas, una debajo de otra, cada una con su cuadradito de color a la
      izquierda y, a la derecha, tres renglones: título en blanco, autor en gris y
      cantidad de episodios en azul.
- [ ] Los tres son estos: **The AI Daily Brief** (Nathaniel Whittemore, 900 episodios,
      tapa azul-violeta con "AI"), **Latent Space: The AI Engineer Podcast**
      (Latent.Space, 284 episodios, tapa verde-azul con "LS") y **Practical AI**
      (Daniel Whitenack and Chris Benson, 379 episodios, tapa rosa con "PA").
- [ ] `npm test` → `Test Files  2 passed (2)` y `Tests  8 passed (8)`.

## El detalle que delata que quedó bien

**Las tapas son dibujos nuestros, no fotos reales**: tres cuadrados de color con dos
letras. Se ven así porque a propósito no fuimos a buscar imágenes de verdad: las fotos
reales aparecen recién en el paso 05, cuando iTunes las trae. Si ves fotos reales, la IA
se colgó de internet y perdimos el sentido del paso.

## Si te quedó distinto

Mirá el texto de los episodios: tiene que decir `900 episodios`, no `900 episodes` ni
`Episodios: 900`, porque el test lo busca palabra por palabra. Para comparar contra la
versión buena: `git checkout step-03` y mirá `app/src/ui/PodcastCard.tsx`; volvé con
`git checkout -`.
