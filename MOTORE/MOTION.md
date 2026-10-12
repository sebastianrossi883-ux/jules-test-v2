# Runtime Metodo 21

Il motore è infrastruttura neutra. Collega una sola copia locale di GSAP, ScrollTrigger e Lenis; non crea animazioni, non legge attributi estetici e non imposta `gsap.defaults()`.

## Avvio

Tutta la regia specifica del sito parte una sola volta:

```js
MotionKit.ready.then(({ reducedMotion }) => {
  if (reducedMotion) return;
  // monta le scene nell'ordine della pagina
});
```

`MotionKit.ready` si risolve anche con `prefers-reduced-motion: reduce`. In quel caso `reducedMotion` è `true`, Lenis non viene creato e il contenuto resta immediatamente visibile.

API pubblica:

- `MotionKit.ready`: promessa con `{ reducedMotion, gsap, ScrollTrigger, lenis }`;
- `MotionKit.plugins.ensure(names, id)`: carica plugin registrati o rifiuta la promessa;
- `MotionKit.lenis`: unica istanza globale, oppure `null`;
- `MotionKit.destroy()`: smonta le scene e il driver posseduto dal metodo.

## Scene

Ogni scena possiede una root, le proprietà che scrive e il proprio cleanup:

```js
SiteScenes.mount({
  id: "scena-storia",
  root,
  writes: [{ element: media, property: ["transform", "opacity"] }],
  setup(scope) {
    const timeline = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top top", end: "+=100%", scrub: true },
    });
    timeline.to(media, { xPercent: 30, ease: "none" });
    return () => timeline.kill();
  },
});
```

`scope` offre `claim`, `own`, `defer`, `listen`, `portal`, `media`, `pin`, `measure`, `afterRefresh`, `onFrame`, `requestRefresh`, `lockScroll` e `lenis`. La scena pulisce soltanto ciò che ha creato. Non usare `ScrollTrigger.getAll()`.

Per un plugin indispensabile usa la variante rigorosa:

```js
await SiteScenes.mountRequired({
  id: "scena-percorso",
  root,
  requires: { dependencies: ["motionPath"] },
  setup(scope) {
    gsap.registerPlugin(MotionPathPlugin);
    const timeline = gsap.timeline();
    return () => timeline.kill();
  },
});
```

`mountRequired` non salta la scena: se una dipendenza manca, registra l'errore e rifiuta la promessa. `mountAsyncSafe` resta disponibile solo per effetti realmente opzionali e non va usato per le tre meccaniche assegnate.

## Regole invarianti

- Una sola Lenis: usare `scope.lenis`, mai `new Lenis()`.
- Registrare i plugin dopo il caricamento locale.
- Creare i trigger nell'ordine delle sezioni; chiamare `scope.requestRefresh()` dopo cambiamenti di geometria.
- Ogni `setup` restituisce una funzione di cleanup.
- Il motore non decide easing, durata, composizione o densità: appartengono alla regia del sito.
