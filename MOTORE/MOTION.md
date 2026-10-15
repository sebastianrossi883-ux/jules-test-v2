# Runtime Metodo 21

Il motore è infrastruttura neutra. Collega una sola copia locale di GSAP, ScrollTrigger e Lenis; non crea animazioni, non legge attributi estetici e non imposta `gsap.defaults()`.

## Avvio

Tutta la regia specifica del sito parte una sola volta. Il punto d'ingresso generato attende ogni scena e registra l'errore della singola scena senza bloccare le successive:

```js
window.SITE_SCENES_READY = MotionKit.ready.then(async ({ reducedMotion }) => {
  if (reducedMotion) return { status: 'reduced-motion', scenes: [] };
  // await SiteScenes.mountRequired(...) per ciascuna scena, nell'ordine della pagina
});
```

Il preparatore fornisce `sceneSlots` con id, root, dipendenze e `setup: null`. Quando tutti gli slot sono ancora null, `SITE_SCENES_READY` restituisce `prepared`: il sito di partenza resta statico. Jules scrive le meccaniche del giro e assegna a ogni slot un `setup(scope)` reale che seleziona e prenota i target tramite `scope.one`/`scope.all` e restituisce il cleanup. Nodi già disponibili o generati si prenotano con `scope.claim`. La promessa di avvio restituisce `active` solo dopo il montaggio di tutti gli slot; una consegna parzialmente montata la rifiuta, con gli errori concreti. Nessun errore artificiale o animazione è inserito nello slot.

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
  setup(scope) {
    const media = scope.one('[data-scene-media]', ['transform', 'opacity']);
    const timeline = scope.gsap.timeline({
      scrollTrigger: { trigger: root, start: "top top", end: "+=100%", scrub: true },
    });
    timeline.to(media, { xPercent: 30, ease: "none" });
    return () => { timeline.scrollTrigger?.kill(); timeline.kill(); };
  },
});
```

`scope` offre selezione senza scritture (`findOne/findAll`), selezione con prenotazione (`one/all`), `claim`, `enhance`, `own`, `defer`, `listen`, `portal`, `media`, `pin`, `measure`, `afterRefresh`, `onFrame`, `requestRefresh`, `lockScroll` e `lenis`. La scena pulisce soltanto ciò che ha creato. Non usare `ScrollTrigger.getAll()`.

`MOTORE/scena-supporto.js` e' un modulo ESM neutro consegnato integralmente. Il punto d'ingresso usa `waitForSceneResources(root)` prima del montaggio, cosi' font e immagini precedono le misure e un asset rotto resta un errore esplicito. I moduli generati in `assets/js/scenografie/` usano `createMeasurementFrame` tramite `misuraScena`: misurano attori, didascalie o controlli indicati dal progetto nello stesso frame e rifiutano numeri non finiti. `actorLayers`/`claimActorLayers` separano il nodo che porta il layout dal nodo che riceve `transform` e da quello che riceve rivelazione/opacita'; non creano wrapper o animazioni. `boxesIntersect`, `expandBox` e `unionBoxes` sono relazioni geometriche disponibili, non gate artistici o ricette di composizione.

Il frame metrico 2D rifiuta antenati trasformati: in quel caso una sottrazione di rettangoli viewport non produce coordinate locali corrette. SVG, canvas, WebGL, parent ruotati/scalati e altre geometrie native usano invece la loro conversione esplicita. Gli strumenti non scelgono attori, stati, densita', percorsi, tempi o easing e non certificano la qualita' della scena.

`METHOD/SITO_ATTORI.json` contiene gli agganci reali del DOM iniziale: root, nodi e parentela. Seleziona con `[data-m21-actor="node-00001"]` usando la chiave effettiva della root corrente, non con classi estetiche come `aspect-[3/4.2]`. Gli agganci non stabiliscono attori obbligatori o layout: Jules compone la scenografia, conserva quelli dei nodi riusati e nomina stabilmente i nuovi nodi. Per animare la root stessa usa `scope.claim(scope.root, props)`: `one/all` cercano i discendenti.

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

- `findOne(selector)` seleziona esattamente un discendente della root senza prenotare proprieta: usarlo per trigger, contenitori o misure che non vengono animati. `findAll(selector)` restituisce un array anche vuoto per letture o gruppi opzionali. Non autorizzano scritture sui nodi: prima di animarli usare `claim`, `one` o `all` con proprieta esplicite.
- `one(selector, propertyOrArray)` cerca nei discendenti della root e richiede esattamente un elemento. Lo prenota tramite `claim` e restituisce sempre un elemento DOM. Un selettore mancante o ambiguo segnala id della scena e selettore.
- `all(selector, propertyOrArray)` cerca nei discendenti della root e richiede almeno un elemento. Prenota i nodi tramite `claim` e restituisce sempre un array. Un gruppo opzionale si cerca esplicitamente con `scope.root.querySelectorAll`, poi si prenota soltanto se esiste: non si trasforma in scena omessa.
- `claim(elementOrCollection, propertyOrArray)` prenota nodi già disponibili nella root/portal. Non accetta stringhe: `scope.claim('.card', ...)` è una chiamata invalida. Per elementi generati: aggiungerli alla root/layer posseduto, quindi prenotarli. `x`, `scale`, rotazioni e altre trasformazioni condividono la proprietà `transform`; `autoAlpha` prenota opacity e visibility. Restituisce target o array, non crea tween.
- Il secondo argomento di `one/all/claim` e' obbligatorio. Per sola lettura preferire `findOne/findAll`, non omettere le proprieta da `one/all`. I tipi e l'ownership delle chiamate esistenti restano invariati.
- `enhance(className = 'm21-enhanced')` aggiunge alla sola root una classe di attivazione locale e ne possiede il cleanup. Chiamarlo prima delle misure della scenografia animata. Su errore di setup, unmount o reduced motion la classe aggiunta viene rimossa; una classe gia presente viene preservata. Il motore non scrive stili: il CSS del sito deve avere una base leggibile e confinare nella classe gli stati che dipendono dal movimento.
- `own(name)` prenota una risorsa globale nominata; non trasferisce proprietà di oggetti esterni.
- Per WebGL, canvas, fisica o animazioni di oggetti: `one/all/claim` riguardano i nodi DOM. Camera, mesh, vettori, uniform e controller interni restano oggetti della scena; si animano con le loro API o `scope.gsap`, si possiedono come risorse nominate con `own` e si distruggono localmente con `defer`. Non passarli a `claim` e non forzare una meccanica WebGL dentro tween di elementi HTML. Il canvas DOM si prenota quando ne si modificano trasformazioni o opacità.
- `defer(cleanup)` registra una funzione sincrona di cleanup, eseguita in ordine inverso. Anche il risultato di `setup(scope)` deve essere una funzione di cleanup.
- `listen(target, type, handler, options)` conserva gli argomenti e il `this` dell'evento, cattura GSAP nel contesto della scena e restituisce una funzione che rimuove il listener.
- `portal(element, parent = document.body)` amplia esplicitamente l'ownership; l'elemento viene rimosso al cleanup. Non usare per appropriarsi di contenuti di un'altra scena.
- `media(query, setup(childScope, gsapContext))` possiede i contesti responsive locali e i loro cleanup.
- `pin({distance, overlapWith, ...scrollTriggerVars})` accetta `distance` in pixel finiti e positivi, oppure una funzione senza argomenti ricalcolata al refresh. Costruisce `end` come `+=distance`: non passare una stringa `end` al posto della distanza. `pin` è un elemento oppure `true`; `pinSpacing:false` richiede `overlapWith` come elemento della scena intenzionalmente sovrapposta. Pin duplicati/annidati sono rifiutati.
- `measure(fn)` chiama `fn()` subito e prima dei refresh, senza argomenti; restituisce il callback callable registrato. `const measure = scope.measure(rebuild); measure()` conserva la misura manuale; `measure.remove()` cancella idempotentemente la registrazione dai refresh. Il cleanup dello scope la cancella comunque: non occorre ripeterlo. Un errore iniziale fallisce il setup della scena; un errore durante refresh è segnalato localmente e non impedisce misure o refresh delle altre scene.
- `afterRefresh(fn)` chiama `fn()` senza argomenti dopo il refresh; errori isolati per scena.
- `onFrame(fn)` riceve gli argomenti nativi del ticker GSAP `(time, deltaTime, frame, ...)`, non un oggetto progress. Restituisce `stop()`, una funzione idempotente di cancellazione locale (anche `stop.remove()`); il listener viene rimosso automaticamente al cleanup anche se non chiami `stop`. Non crea un secondo RAF o driver Lenis.
- `requestRefresh()` pianifica e accorpa il refresh globale dopo le misure locali. `lockScroll()` restituisce la funzione di rilascio del lock posseduto dalla scena; non creare altri driver.

La base HTML/CSS deve essere leggibile senza GSAP. Il motore non applica override globali a menu, maschere o opacità del sito: il contesto della scena deve ripristinare ciò che ha modificato.

Per le geometrie responsive, misura il layout senza trasformazioni correnti. Se la timeline dipende da coordinate calcolate, conserva il progresso, riportala al suo stato di misura, ricostruiscila in `scope.measure`, poi ripristina il progresso. `invalidateOnRefresh` da solo non ricostruisce numeri o array di punti già calcolati. I nodi transitori hanno un insieme o pool locale: il cleanup rimuove soltanto quei nodi e le relative timeline, mai tutti i figli della root. Le posizioni strutturali di centratura possono stare in un wrapper CSS; anima un figlio, evitando di cancellare la trasformazione che realizza il layout.

`node BUILD/compila.mjs` compila e controlla gli usi letterali incompatibili di `claim` e gli argomenti mancanti nelle chiamate dirette `scope.one/all` nel codice del sito. A build riuscita collega automaticamente il bundle ESM e il CSS generato a `index.html`, lasciando intatti gli altri script; dopo l'ultima modifica al sorgente usa questo stesso comando. Non modificare manualmente il bundle. Fonti e derivati sono rintracciabili in `BUILD/ultimo-build.json`. L'avvio resta una proprietà del programma: `SITE_SCENES_READY` e `SiteScenes.report()` mostrano montaggi reali. Un HTTP 200 o un bundle prodotto non dimostrano che le scene siano partite. Questi stati tecnici non assegnano punteggi o giudizi artistici e non avviano correzioni automatiche.

`document.documentElement.dataset.motionState` espone `prepared`, `active`, `failed`, `reduced-motion` o `disposed`. La promessa descrive l'avvio; il report descrive i montaggi correnti, anche dopo una distruzione. Al cambio di preferenza il motore aggiorna lo stato e non lascia il vecchio `active` mentre le scene sono smontate.

## Rettifiche tecniche delle fonti GSAP consegnate

Le skill originali restano integrali. Per i punti seguenti valgono il comportamento di GSAP 3.15.0 locale e queste firme, non gli esempi inesatti nelle fonti. Sono correzioni di API, non nuovi vincoli artistici o passaggi di verifica.

- `gsap.utils.unitize(fn, unit?)` restituisce una funzione: `gsap.utils.unitize(v => v * 2, 'px')(10)` produce `'20px'`. Il primo argomento non e' un valore da suffissare; gli esempi `unitize(100, 'px')` e `unitize('2rem', 'px')` della skill utils non producono le stringhe dichiarate. Riferimento: https://gsap.com/docs/v3/GSAP/UtilityMethods/unitize%28%29/.
- `gsap.utils.shuffle(array)` modifica e restituisce lo stesso array. Se la formazione o il ritorno devono conservarne l'ordine, usa una copia, per esempio `gsap.utils.shuffle([...attori])`; non introdurre casualita' se la regia non la richiede. La skill utils lo descrive erroneamente come un nuovo array. Riferimento: https://gsap.com/docs/v3/GSAP/UtilityMethods/shuffle%28%29/.
- `refreshPriority` maggiore viene elaborato prima: `1` precede `0`, non viceversa come scritto nella skill ScrollTrigger. Rimane preferibile creare i trigger nell'ordine della pagina; una priorita' non corregge una geometria o un ordine di pin sbagliati. Riferimento: https://gsap.com/docs/v3/Plugins/ScrollTrigger/.
- Nell'esempio orizzontale della skill ScrollTrigger `Max.max` non esiste; inoltre una distanza in pixel non e' un `xPercent`. Per un contenuto allineato a sinistra da traslare fino al suo margine destro, senza scale sui genitori, la distanza locale e' `x: () => -Math.max(0, contenuto.scrollWidth - finestra.clientWidth)`. Altri ancoraggi o spazi trasformati richiedono la loro derivazione. Il driver scroll usa `scrub` ed `ease: 'none'`; contenitore di pin e attore mobile restano distinti. Distanza di scroll e configurazioni vengono dal progetto, non da questo esempio.
- La tabella Flip della skill plugins descrive male tre opzioni: senza `scale: true` il ridimensionamento usa normalmente `width/height`; `nested: true` compensa le trasformazioni di parent e figli entrambi coinvolti, non misura solo il primo livello; `simple: true` salta calcoli necessari per contenitori ruotati/scalati/skewed, non significa animare soltanto posizione e scala. Non usarlo quando quelle trasformazioni sono presenti. Flip e' una possibilita' tecnica solo se assegnata dalla regia e dichiarata come dipendenza locale, non un nuovo effetto obbligatorio. Riferimento: https://gsap.com/docs/v3/Plugins/Flip/.

## Regole invarianti

MotionPath accetta array di punti che comprendono proprieta come `scale` oltre a `x/y`: la scala puo evolvere lungo il percorso. Non sostituirla con una scala costante sulla base di una review generica. Comportamento documentato in https://gsap.com/docs/v3/Plugins/MotionPathPlugin/ e presente nel plugin locale. I valori e le geometrie restano scelti dalla regia, non da questo riferimento tecnico.

- Una sola Lenis: usare `scope.lenis`, mai `new Lenis()`.
- Registrare i plugin dopo il caricamento locale.
- Creare i trigger nell'ordine delle sezioni; chiamare `scope.requestRefresh()` dopo cambiamenti di geometria.
- Ogni `setup` restituisce una funzione di cleanup.
- Il motore non decide easing, durata, composizione o densità: appartengono alla regia del sito.
