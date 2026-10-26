# Cómo se ve el paso 05 terminado

![Paso 05](expected.png)

> **Y una nota de libertad:** todo lo de abajo es la vara del prompt **Advanced**
> (`prompt.md`, último bloque). Si jugaste con el Starter o el Medium, tu pantalla
> **no** tiene que parecerse a esta foto: ahí lo que vale es qué decidió la IA por su
> cuenta y qué le hubieras agregado al pedido. Para cuando quieras el resultado exacto
> del curso, pegá el Advanced.

## Debe estar

- [ ] Arriba, igual que antes: **Pod Search**, el subtítulo y la caja vacía con
      `ej: inteligencia artificial`.
- [ ] Una lista larga: **20 tarjetas**, cada una con su **foto real de portada** (ya no son
      los cuadraditos de colores con iniciales), el título en blanco, el autor en gris y los
      episodios en azul.
- [ ] La primera tarjeta es **Inteligencia Artificial** de **Diego Coria García** con
      `1 episodios`, y se ven títulos como **IA al día**, **Inteligencia Artificial para los
      Negocios** (EvoAcademy, 186 episodios) o **Big Data e Inteligencia Artificial**.
- [ ] `npm test` → `Test Files  4 passed (4)` y `Tests  21 passed (21)`.
- [ ] Ninguna caja roja de error a la vista (si aparece, el test sigue pasando: es el
      camino de red caída funcionando).

## El detalle que delata que quedó bien

**Las tapas son fotos reales y todas distintas**, con podcasts que nadie escribió a mano.
Ahí se ve que los datos vienen de internet. Y el detalle raro de la primera tarjeta,
`1 episodios`, es real: todavía no corregimos el singular, eso lo arregla el paso 10. Si te
apareció "0 episodios" en todas o todo con `undefined`, el traductor de campos de Apple no
está leyendo `trackCount`.

## Si te quedó distinto

Si la lista está vacía y no hay error, el `useEffect` no disparó o el término por defecto no
llega. Si el navegador muestra una página en blanco y la consola dice `CORS`, la URL está
mal: tiene que ser `https://itunes.apple.com/search`. Para comparar:
`git checkout step-05`, mirá `app/src/infrastructure/itunesRepository.ts`; volvé con
`git checkout -`.
