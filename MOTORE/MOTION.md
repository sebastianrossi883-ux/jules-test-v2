# Motore 12 Cinematico R2 — integrazione reale

La guida operativa e `METHOD/MISSIONE_JULES.md` prevalgono sulle istruzioni storiche e sui template delle skill. Il motore originale resta intatto in `RIFERIMENTO_12_ORIGINALE/`. Il CSS e le skill sono preservati. Il JS operativo mantiene tutti i 25 gesti, più cursore e preloader, collegandoli allo stesso coordinatore delle scene custom. Non usare in parallelo il motore originale e quello R2.

## Avvio Vanilla

Metti questi import una volta, dopo il markup del sito (oppure usa tutti gli script `defer` nell'ordine indicato). Nessun CDN e nessun template estetico sono richiesti.

```html
<link rel="stylesheet" href="MOTORE/vendor/lenis.css">
<link rel="stylesheet" href="MOTORE/motion.css">
<link rel="stylesheet" href="MOTORE/regia-accessibilita.css">
<script src="MOTORE/vendor/gsap.min.js"></script>
<script src="MOTORE/vendor/ScrollTrigger.min.js"></script>
<script src="MOTORE/vendor/lenis.min.js"></script>
<script>
window.MOTION_CONFIG = { auto: false, lenis: true, intensity: 'hero', pinOnMobile: false };
</script>
<script src="MOTORE/regia-coordinatore.js"></script>
<script src="MOTORE/motion.js"></script>
<script src="assets/js/regia-sito.js"></script>
```

Le versioni locali sono GSAP/ScrollTrigger 3.15.0 (dalla R0) e Lenis 1.3.26 (JS, CSS e licenza MIT inclusi). Se il progetto possiede già librerie equivalenti, integra UNA sola build compatibile. Non aggiungere le copie locali a una seconda istanza già attiva. In progetti ESM importa le stesse dipendenze una sola volta e adatta il bootstrap, senza introdurre globali concorrenti.

`motion.js` aspetta DOM e font prima dello split, funziona anche se caricato dopo `load` e restituisce `MotionKit.ready`. `assets/js/regia-sito.js` deve aspettarlo:

```js
(async function () {
  await MotionKit.ready;
  // Qui monta le scene reali del progetto, con DOM e formule effettivi.
  // Ogni scene setup restituisce una funzione di cleanup.
})().catch(console.error);
```

Se l'utente richiede reduced motion, il motore editoriale rispetta la preferenza. Anche le scene custom devono usare condizioni media equivalenti e mantenere contenuti e funzioni. Non confondere questa preferenza con il permesso di impoverire la versione ordinaria.

`regia-accessibilita.css` completa il CSS originale senza modificarlo: nasconde gli overlay editoriali quando il motore non è attivo, dopo un errore o dopo il teardown. Il preloader non copre il contenuto con reduced motion o senza GSAP. Il motore gestisce la classe `m-motion-active`; non rimuoverla durante una normale intro. Gli overlay dentro `data-m-skip` restano di competenza del componente. Se usi la guardia `m-js`, mantieni il timeout di uscita nel head già previsto dal Metodo 12 per il caso in cui lo script non arrivi.

## Vocabolario editoriale preservato

`text`, `text-focus`, `fade`, `node`, `stagger`, `reveal`, `curtain`, `parallax`, `scale`, `cinema`, `skew`, `draw`, `pin`, `hrail`, `story`, `word-scrub`, `outline-fill`, `typewriter`, `monochrome`, `scatter-stack`, `magnetic`, `marquee`, `count`, `hover-media`, `mouse-parallax`; inoltre preloader e cursore.

Assegna `data-m` intenzionalmente a tutta la pagina, usando il markup richiesto dai casi reali del JS. Le scene protagoniste e i raccordi possono usare GSAP diretto e skill. Non affidare l'identità del sito alla distribuzione casuale di attributi.

`data-m-skip` esclude effettivamente la propria sottogerarchia, anche quando è taggata esplicitamente. Mettilo sul nucleo DOM minimo del componente. Lo stagger non prende figli già taggati o esclusi; non aggiungere due writer sullo stesso elemento. Un wrapper esterno può muoversi mentre il componente anima elementi interni: va progettato anche l'effetto combinato su hit test, clipping e geometria.

Lo split storico `text/word-scrub/typewriter` utilizza `textContent`: non assegnarlo a nodi con link, enfasi o altri elementi inline da preservare. Per quella tipografia costruisci una coreografia custom con split che preservi il markup; non appiattire i contenuti e non sostituire automaticamente la scena con un fade. `count` si usa soltanto su un nodo testuale per numeri reali: per valori formattati indica `data-to` numerico, ed eventualmente `data-locale`. L'animazione mantiene i decimali e restituisce il testo originale completo alla fine, senza cambiare unità o significato.

## API del coordinatore, senza documenti aggiuntivi

Il contratto vive nel codice della scena:

```js
const destroy = SiteScenes.mount({
  id: 'identificatore-specifico-del-progetto',
  root: sceneElement,
  writes: [
    { element: innerTrack, property: 'transform' },
    { element: caption, property: 'autoAlpha' }
  ],
  setup(scene) {
    // La timeline reale si crea qui; il GSAP context la registra.
    // Proprietà ulteriori: scene.claim(target, ['clipPath', 'filter']).
    // Driver click/pointer originale: scene.listen(target, 'click', handler).
    // Risorse non GSAP: scene.defer(() => renderer.dispose()).
    return () => { /* cleanup dell'adattatore originale, se necessario */ };
  }
});
```

Questo è un esempio di contratto, non una coreografia predefinita. `root` e i target sono gli elementi effettivi del sito. Tutte le proprietà scritte dalla demo, dallo shader, da CSS/WAAPI o dall'adattatore vanno dichiarate; il coordinatore non legge automaticamente il loro codice. Gli alias GSAP del transform vengono trattati come una sola risorsa; `autoAlpha` prenota opacity e visibility. Una collisione produce un errore di montaggio da correggere nella struttura, non il permesso di cancellare l'effetto.

- `scene.claim(element, propertyOrArray)`: registra target DOM, anche creati durante il setup (split e canvas). Per risorse non DOM condivise, come uniform/shader o stato di un renderer, utilizza invece `scene.own('id-risorsa-shared')`.
- `scene.own('resource-id')`: risorsa globale esclusiva, per esempio un canvas condiviso o uno specifico input globale. Non prenotare l'intero scroll per ogni scena.
- `scene.listen(target, event, handler, options)`: listener con cleanup; le nuove animazioni create dal callback entrano nel context.
- `scene.safe(handler)`: stesso contesto per callback di librerie esterne; dopo teardown non esegue la funzione.
- `scene.defer(cleanup)`: listener/observer/renderer/risorsa non GSAP si libera anche se il setup fallisce.
- `scene.media(query, (local, context) => { ... })`: varianti responsive con cleanup dei listener e delle proprietà a ogni cambio di condizione. Usa `local`, non il parent, per le risorse del breakpoint.
- `scene.portal(element)`: overlay creato dalla scena e inserito fuori dal root; registra il target, poi lo rimuove al teardown. Progetta z-index, stacking e pointer-events secondo la regia del sito; il helper non sceglie uno stile.
- `scene.onFrame(render)`: loop canvas/WebGL sul ticker GSAP condiviso; usa attività/visibilità della scena per evitare rendering inutile. Se una sorgente richiede un RAF proprio, conserva quel driver e registra cancel/pause/cleanup; non usarlo per un secondo Lenis.
- `scene.measure(recalculate)`: misure prima del refresh comune. Ricalcola senza trasformazioni arbitrarie o refresh ricorsivi.
- `scene.afterRefresh(callback)`: callback dopo il refresh comune.
- `scene.requestRefresh()`: una richiesta coalescata nello stesso frame; niente timeout di riparazione per tutte le scene.
- `scene.lockScroll()`: restituisce il rilascio; menu e preloader possono possedere lock distinti. L'ultimo rilascio ripristina overflow e priorità CSS per entrambi gli assi e riavvia solo il driver che era attivo prima del lock. Un driver registrato mentre un lock è aperto viene fermato subito; il teardown rilascia i lock pendenti. Il preloader acquisisce il lock prima di attendere `load`.

Un setup GSAP fallito viene revertito prima di liberare i claim. `SiteScenes.unmount(id)` distrugge una scena; `SiteScenes.dispose()` distrugge tutte le scene e il driver posseduto. `MotionKit.destroy()` distrugge solo il vocabolario editoriale; su navigazione SPA chiama entrambi, poi ricrea il bootstrap per il nuovo DOM. Il bootstrap corrente è per una pagina: non riutilizzare `MotionKit.ready` come se montasse automaticamente una pagina nuova.

## Pin, scroll e passaggi tra scene

Per i nuovi pin usa:

```js
scene.pin({
  trigger: sceneElement,
  pin: pinnedInnerShell,
  animation: actualTimeline,
  distance: () => measuredDistance,
  scrub: 1,
  pinSpacing: true
});
```

La distanza deve essere finita, positiva e derivata da contenuti/geometria reali. Non animare lo stesso transform del guscio pinnato: anima i suoi livelli interni. Il helper rifiuta pin duplicati o annidati simultaneamente registrati. Un handoff sequenziale della stessa risorsa richiede teardown/release della scena precedente prima del nuovo mount; la sovrapposizione narrativa su wrapper differenti resta consentita.

`pinSpacing:false` è una scelta cinematografica, non un fix generale: serve anche `overlapWith: nextSceneElement`, con spazio naturale, ordine e punto di rilascio progettati. Il gesto `pin` storico a fogli mantiene questa sovrapposizione intenzionale e registra la scena successiva. `hrail` non crea un pin quando il track entra interamente; ricostruisce la variante quando il resize cambia questa condizione. `story` e `hrail` mantengono il comportamento desktop storico: la regia del progetto deve progettare una versione mobile altrettanto curata, senza contenuti tagliati.

`SiteScenes.configureScroll` crea una sola istanza Lenis e un ticker, anche quando viene chiamato di nuovo. Un driver del progetto già esistente va dichiarato prima di `motion.js`:

```js
SiteScenes.configureScroll({ instance: existingLenis, externalTicker: true, externalUpdate: true });
```

`externalUpdate:true` indica che il progetto collega già Lenis a ScrollTrigger.update. Non distruggere il driver esterno da una singola scena. In un'app che gestisce già il refresh imposta `MOTION_CONFIG.managedRefresh=false`; nelle pagine standalone la R2 centralizza resize, font, caricamento immagini/video e refresh.

La registrazione non dimostra da sola assenza di clipping, errori responsive o collisioni visive. Progetta la macroregia nel CSS e nel codice, verifica numericamente ciò che è possibile, e consegna per la revisione visiva manuale.
