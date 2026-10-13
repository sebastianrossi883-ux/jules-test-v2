# Runtime Metodo 21

Il motore è infrastruttura neutra. Collega una sola copia locale di GSAP, ScrollTrigger e Lenis; non crea animazioni, non legge attributi estetici e non imposta `gsap.defaults()`.

## Avvio

Tutta la regia specifica del sito parte una sola volta. Il punto d'ingresso generato attende ogni scena e registra l'errore della singola scena senza bloccare le successive:

```js
MotionKit.ready.then(async ({ reducedMotion }) => {
  if (reducedMotion) return;
  // await SiteScenes.mountRequired(...) per ciascuna scena, nell'ordine della pagina
});
```

Il preparatore fornisce `sceneSlots` con id, root, dipendenze e `setup: null`. Gli slot senza una funzione non sono montati; il sito di partenza resta statico. Jules scrive le meccaniche del giro e assegna a ogni slot un `setup(scope)` reale che dichiara i target con `scope.claim` e restituisce il cleanup. Nessun errore artificiale o animazione è inserito nello slot.

`MotionKit.ready` si risolve anche con `prefers-reduced-motion: reduce`. In quel caso `reducedMotion` è `true`, Lenis non viene creato e il contenuto resta immediatamente visibile.

Senza reduced motion, GSAP e ScrollTrigger sono obbligatori; Lenis è obbligatoria se abilitata. Una libreria mancante rifiuta `ready` con un errore esplicito, non simula reduced motion. `destroy()` annulla immediatamente l'avvio e i montaggi pendenti con `AbortError`: il ciclo delle scene termina, non prosegue montando slot dopo la distruzione. Se la preferenza passa a `reduce` durante la visita, il motore arresta e smonta la visita; non rimonta automaticamente tornando a `no-preference`.

Lo scroll del sito è una sola Lenis. Se la regia vuole un passo di scroll diverso, per esempio quello di una demo, lo imposta in `index.html`: `window.MOTION_CONFIG = { lenis: true, scroll: { options: { lerp, smoothWheel, wheelMultiplier, anchors } } }`. `options` sostituisce per intero quelle del motore (`lerp: 0.09`, `smoothWheel: true`, `wheelMultiplier: 0.9`, `anchors: true`): vanno scritte tutte e quattro. Vale per tutto il sito.

API pubblica:

- `MotionKit.ready`: promessa con `{ reducedMotion, gsap, ScrollTrigger, lenis }`;
- `MotionKit.plugins.ensure(names, id)`: carica plugin registrati o rifiuta la promessa;
- `MotionKit.lenis`: unica istanza globale, oppure `null`;
- `MotionKit.destroy()`: smonta le scene e il driver posseduto dal metodo.

## Scene

Ogni scena possiede una root, le proprietà che scrive e il proprio cleanup:

```js
await SiteScenes.mountRequired({
  id: "scena-storia",
  root,
  requires: { dependencies: [] },
  writes: [{ element: media, property: ["transform", "opacity"] }],
  setup(scope) {
    const timeline = scope.gsap.timeline({
      scrollTrigger: { trigger: root, start: "top top", end: "+=100%", scrub: true },
    });
    timeline.to(media, { xPercent: 30, ease: "none" });
    return () => timeline.kill();
  },
});
```

`scope` offre `claim`, `own`, `defer`, `listen`, `portal`, `media`, `pin`, `measure`, `afterRefresh`, `onFrame`, `requestRefresh`, `lockScroll` e `lenis`. La scena pulisce soltanto ciò che ha creato. Non usare `ScrollTrigger.getAll()`.

Per un plugin indispensabile dichiara la dipendenza nella stessa API:

```js
await SiteScenes.mountRequired({
  id: "scena-percorso",
  root,
  requires: { dependencies: ["motionPath"] },
  writes: [{ element: media, property: "transform" }],
  setup(scope) {
    scope.gsap.registerPlugin(window.MotionPathPlugin);
    const timeline = scope.gsap.timeline();
    return () => timeline.kill();
  },
});
```

`mountRequired` non salta silenziosamente la scena: se una dipendenza manca, registra l'errore e rifiuta la promessa. `mountAsyncSafe` e `mount` restano API disponibili nel motore ma non sono usate dalle scene di questo incarico.

Un errore ordinario resta locale alla scena; `AbortError` significa visita annullata e termina la sequenza. Le risorse caricate tardi non possono montare una scena dopo `SiteScenes.dispose()`. Le voci `isolateOnly` (GSAP 2 storico) sono rifiutate dal loader globale: non costituiscono un secondo runtime disponibile.

## Firme effettive dello scope

- `claim(elementOrCollection, propertyOrArray)` prenota proprietà nella root/portal. `x`, `scale`, rotazioni e altre trasformazioni condividono la proprietà `transform`; `autoAlpha` prenota opacity e visibility. Restituisce target o array, non crea tween.
- `own(name)` prenota una risorsa globale nominata; non trasferisce proprietà di oggetti esterni.
- `defer(cleanup)` registra una funzione sincrona di cleanup, eseguita in ordine inverso. Anche il risultato di `setup(scope)` deve essere una funzione di cleanup.
- `listen(target, type, handler, options)` conserva gli argomenti e il `this` dell'evento, cattura GSAP nel contesto della scena e restituisce una funzione che rimuove il listener.
- `portal(element, parent = document.body)` amplia esplicitamente l'ownership; l'elemento viene rimosso al cleanup. Non usare per appropriarsi di contenuti di un'altra scena.
- `media(query, setup(childScope, gsapContext))` possiede i contesti responsive locali e i loro cleanup.
- `pin({distance, overlapWith, ...scrollTriggerVars})` accetta `distance` in pixel finiti e positivi, oppure una funzione senza argomenti ricalcolata al refresh. Costruisce `end` come `+=distance`: non passare una stringa `end` al posto della distanza. `pin` è un elemento oppure `true`; `pinSpacing:false` richiede `overlapWith` come elemento della scena intenzionalmente sovrapposta. Pin duplicati/annidati sono rifiutati.
- `measure(fn)` chiama `fn()` subito e prima dei refresh, senza argomenti; restituisce il callback registrato. Un errore iniziale fallisce il setup della scena; un errore durante refresh è segnalato localmente e non impedisce misure o refresh delle altre scene.
- `afterRefresh(fn)` chiama `fn()` senza argomenti dopo il refresh; errori isolati per scena.
- `onFrame(fn)` riceve gli argomenti nativi del ticker GSAP `(time, deltaTime, frame, ...)`, non un oggetto progress. Il listener viene rimosso al cleanup.
- `requestRefresh()` pianifica e accorpa il refresh globale dopo le misure locali. `lockScroll()` restituisce la funzione di rilascio del lock posseduto dalla scena; non creare altri driver.

La base HTML/CSS deve essere leggibile senza GSAP. Il motore non applica override globali a menu, maschere o opacità del sito: il contesto della scena deve ripristinare ciò che ha modificato.

## Regole invarianti

- Una sola Lenis: usare `scope.lenis`, mai `new Lenis()`.
- Registrare i plugin dopo il caricamento locale.
- Creare i trigger nell'ordine delle sezioni; chiamare `scope.requestRefresh()` dopo cambiamenti di geometria.
- Ogni `setup` restituisce una funzione di cleanup.
- Il motore non decide easing, durata, composizione o densità: appartengono alla regia del sito.
