# MISSIONE — METODO 21 UNIVERSALE

Costruisci il sito completo nella stessa sessione: design, movimento, componenti e footer funzionante. Il Metodo è **risolutivo**, non ispettivo. Non creare gate, dossier di controllo, liste di errori da restituire al committente o cicli `controllo → correzione → nuovo controllo`.

## Principio operativo

La libreria può contenere decine o centinaia di demo incompatibili fra loro. Non leggerle tutte manualmente e non caricarle tutte nella pagina. Il comando `METHOD/import_materials.py` le trasforma una volta in una libreria utilizzabile:

```bash
python3 METHOD/import_materials.py \
  --library MOTION_COMPONENTE/ARCHIVIO \
  /percorso/componente-1 /percorso/componente-2 /percorso/cartella-con-molti-componenti
```

L'importatore:

- conserva file, immagini, CSS, JavaScript e tutte le varianti `index*.html`;
- copia automaticamente le dipendenze note dal vendor locale;
- prova a localizzare le altre dipendenze remote;
- ripara un riferimento locale soltanto quando trova un candidato univoco;
- genera `MOTION_COMPONENTE/ARCHIVIO/materials.manifest.json`.

Il manifest è la sorgente operativa. Non trasformarlo in un gate e non ripetere la scansione durante la costruzione del sito.

## Due modalità, una scelta automatica sicura

## Architettura Vanilla/Vite per siti statici

Vite compila JavaScript, CSS e asset in file statici distribuibili. React non fa parte del runtime scelto dal committente. Per i siti Stitch di questo Metodo applica questa architettura:

1. **Sito principale:** HTML semantico statico, CSS e JavaScript vanilla/GSAP. Vite puo essere usato come build tool, senza obbligare il sito a diventare React.
2. **Componenti vanilla:** integrarli nativamente o con `MaterialHost` secondo il loro livello di isolamento.
3. **React escluso:** usa soltanto record del manifest con `julesEligible: true`. Non installare, compilare, convertire o montare record con `framework: "react"`.
4. **WebGL Vanilla:** usa soltanto implementazioni Vanilla/Three.js gia pronte. React Three Fiber resta archiviato ma escluso.
5. **Frammenti `.tsx` senza entrypoint:** restano in `MOTION_COMPONENTE/FRAMMENTI` come archivio e non sono candidati per il sito.
6. **Consegna:** il risultato pubblicabile resta statico. Jules consegna i file prodotti dalla build, non `node_modules` e non un server applicativo.

Se un effetto esiste soltanto in React, scegli un'altra variante Vanilla presente nel manifest. Non avviare una conversione React durante la generazione del sito.

### 1. Capsula isolata — modalità predefinita

Usa `MaterialHost` per componenti completi, demo legacy, GSAP 2, anime.js, canvas/WebGL, CSS globali o materiali con una propria navigazione. Ogni capsula conserva il runtime originale dentro un iframe same-origin: le sue globali, i ticker e gli stili non possono rompere il sito o gli altri 252 componenti.

```html
<link rel="stylesheet" href="MOTORE/material-host.css">
<div id="materiale-protagonista"></div>
<script src="MOTORE/material-host.js"></script>
<script>
MaterialHost.mount({
  id: 'materiale-protagonista',
  slug: 'nome-cartella-importata',
  root: '#materiale-protagonista',
  minHeight: '82vh'
});
</script>
```

La capsula è una soluzione effettiva, non un placeholder. Inseriscila nel percorso narrativo, dimensiona il contenitore e raccordala visivamente con le sezioni adiacenti. Per demo guidate dallo scroll, lascia che il visitatore scorra dentro la capsula; non riscrivere alla cieca il loro driver.

### 2. Scena nativa — quando serve fondere il meccanismo nel DOM del sito

Usa una scena nativa solo per i pochi materiali scelti come meccanismi editoriali del sito. Conserva la matematica originale, ma mappa i target sui veri nodi semantici. Le dipendenze si dichiarano per nome e vengono caricate dal registro; non inventare path e non copiare CDN a mano.

```js
SiteScenes.mountAsyncSafe({
  id: 'scena-nativa',
  root: document.querySelector('#scena-nativa'),
  requires: { dependencies: ['gsap3', 'scrollTrigger', 'splitting'] },
  writes: [{ element: media, property: 'transform' }],
  setup(scene) {
    const timeline = scene.gsap.timeline();
    timeline.to(media, { yPercent: -18 });
    return () => timeline.kill();
  }
});
```

`mountAsyncSafe` aspetta le dipendenze, monta la scena e confina un eventuale errore: una scena fallita non può impedire l'avvio di hero, sezioni successive o footer.

## Import del motore

Carica una volta i file nell'ordine seguente:

```html
<link rel="stylesheet" href="MOTORE/vendor/lenis.css">
<link rel="stylesheet" href="MOTORE/motion.css">
<link rel="stylesheet" href="MOTORE/regia-accessibilita.css">
<link rel="stylesheet" href="MOTORE/material-host.css">

<script src="MOTORE/plugin-registry.js"></script>
<script src="MOTORE/regia-coordinatore.js"></script>
<script src="MOTORE/material-host.js"></script>
<script src="MOTORE/motion.js"></script>
<script src="assets/js/regia-sito.js"></script>
```

Se `motion.js` è usato, carica prima GSAP 3, ScrollTrigger e Lenis locali oppure falli caricare nel bootstrap con `SiteScenes.loadDependencies`. Non caricare GSAP 2 nella pagina principale: resta dentro le capsule.

## Regole che evitano i crash senza fermare il lavoro

1. Ogni scena possiede il proprio root, le proprietà che scrive e il cleanup. Usa `SiteScenes.mountAsyncSafe`, non un unico blocco globale che può abortire tutto.
2. Non annidare hero, sezioni o footer dentro il loop di un componente. Ogni scena globale si monta indipendentemente.
3. Non assegnare allo stesso nodo sia una scena manuale sia un `data-m` che scrive la stessa proprietà. Se due movimenti devono sommarsi, usa wrapper distinti.
4. I marcatori geometrici devono mantenere dimensioni reali: `opacity:0; pointer-events:none`, mai `display:none`.
5. Le coordinate assolute vanno calcolate rispetto al vero genitore posizionato del nodo.
6. Non alterare una cartella sorgente originale. L'importatore lavora sulla copia in `ARCHIVIO`.
7. Non sostituire un meccanismo complesso con un fade generico. Se l'adattamento nativo non è affidabile, monta la capsula completa.

## Regia del sito

La pagina deve essere viva dall'hero al footer. Disegna una macroregia con apertura, sviluppo, climax, rilascio e uscita. Le sezioni normali usano il vocabolario editoriale del Motore; i componenti importati diventano scene protagoniste, non decorazioni sovrapposte casualmente.

Non inserire tutti i componenti solo perché esistono nella libreria. Seleziona quelli pertinenti al contenuto e alterna densità e respiro. La libreria da 253 elementi serve a dare scelta e affidabilità, non a eseguire 253 runtime contemporaneamente.

Mantieni contenuto, link, gerarchia, accessibilità, tastiera e `prefers-reduced-motion`. Su mobile ricomponi le scene native; le capsule restano isolate e ricevono un'altezza adatta al viewport.

## Fine del lavoro, senza loop

Avvia il sito via HTTP e osservalo una volta nel browser disponibile, dal primo frame al footer, a desktop e mobile. Correggi soltanto un problema concreto che impedisce uso o visione (pagina bloccata, asset essenziale assente, footer irraggiungibile). Non introdurre un gate, non produrre una suite di controlli e non ricominciare l'intero processo dopo ogni correzione.

La consegna finale indica: componenti scelti, modalità capsula/nativa, posizione nel sito e dipendenze caricate automaticamente. Non consegnare solo un piano o un rapporto.
