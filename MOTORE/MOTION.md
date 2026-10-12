# Regia tecnica del sito

Questo pacchetto consegna un runtime statico Vanilla con GSAP, ScrollTrigger e Lenis locali. In ogni sito la pagina ha **una sola istanza globale Lenis**, collegata a GSAP e ScrollTrigger dal motore. Le scene la riusano: non dichiarare un altro `new Lenis()`, un secondo RAF o un ticker indipendente.

## Collegamento nella pagina

`METHOD/prepara_incarico.py` inserisce questi riferimenti nel sito base consegnato. Se stai lavorando su un checkout diverso, mantieni lo stesso ordine e verifica che non restino inizializzazioni GSAP/Lenis duplicate:

```html
<link rel="stylesheet" href="MOTORE/vendor/lenis.css">
<script src="MOTORE/vendor/gsap.min.js"></script>
<script src="MOTORE/vendor/ScrollTrigger.min.js"></script>
<script src="MOTORE/vendor/lenis.min.js"></script>
<script src="MOTORE/plugin-registry.js"></script>
<script src="MOTORE/regia-coordinatore.js"></script>
<script>window.MOTION_CONFIG = { auto: false, lenis: true, pinOnMobile: false };</script>
<script src="MOTORE/motion.js"></script>
<script src="assets/js/regia-sito.js"></script>
```

Carica i file JavaScript in fondo al `body`, nell'ordine mostrato. Il preparatore aggiunge il motore una sola volta alla pagina base; `regia-sito.js` è il punto d'ingresso delle scene specifiche del sito. I plugin GSAP già inclusi si caricano solo quando una scena li usa.

## Avvio delle scene

`motion.js` aspetta che il documento sia disponibile, registra ScrollTrigger, inizializza il solo Lenis del sito e collega il suo aggiornamento al motore GSAP. Le scene possono aspettare `MotionKit.ready` e riutilizzare gli oggetti globali:

```js
MotionKit.ready.then(() => {
  const root = document.querySelector("#sezione-protagonista");
  if (!root) return;

  SiteScenes.mount({
    id: "scena-protagonista",
    root,
    setup() {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      timeline.to(root.querySelector(".elemento-scenico"), {
        xPercent: -10,
        ease: "none",
      });
      return () => timeline.kill();
    },
  });
});
```

È solo un esempio d'integrazione, non un preset estetico o una misura da copiare. Una scena può usare più timeline e tecniche native se la sua meccanica lo richiede; la relazione con lo scroll resta leggibile e appartiene alla regia del sito.

`SiteScenes` offre `mount`, `unmount`, `loadDependencies`, `configureScroll`, `media`, `listen`, `defer`, `pin` e `requestRefresh`. Le scene possono essere organizzate in file separati o nello stesso punto d'ingresso. Usa `scope.media()` quando l'architettura della scena cambia tra layout, e la funzione di cleanup restituita da `setup` per rimuovere risorse create dalla scena.

## Plugin inclusi

I plugin sono in `MOTORE/vendor/`. Il registro in `plugin-registry.js` contiene le associazioni tra nome, percorso e globale. Per caricare quelli necessari a una scena usa `SiteScenes.loadDependencies({ id, dependencies: [...] })`, quindi registra il plugin con GSAP se la sua API lo richiede. Non caricare una seconda copia di GSAP o ScrollTrigger.

## Scroll ridotto e leggibilità

Il runtime lascia il contenuto visibile quando `prefers-reduced-motion: reduce` è attivo e non avvia lo smooth scroll. Su quel profilo non vincolare il movimento della pagina. Mantieni stati di contenuto validi anche se l'animazione non parte; navigazione, link e controlli restano indipendenti dalle scene.

## Confini del motore

Il motore coordina runtime, scroll e lifecycle; non sceglie la firma creativa del sito. Il sito fornito e il brief decidono l'identità, il componente e i semi forniscono le meccaniche delle scene assegnate, le skill informano le tecniche nel proprio ambito. Non serve usare tutte le funzioni del motore in ogni pagina.
