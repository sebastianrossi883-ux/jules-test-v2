# Incarico del giro

## Sito fornito

Prova isolata: una scena, due materiali. Il sito completo non e' oggetto di questo giro.

Le scene strutturali di `index.html`, nell'ordine:

1. `<section id="scena-podere">` — «Il gesto e la vigna» — 4 media, 3 titoli, 7 testi, 0 controlli; root `[data-m21-root="scene-001"]`

Questo inventario descrive il DOM iniziale: i conteggi non sono limiti agli attori o alla composizione,
né quantità da raggiungere. Per la ricomposizione applica «Cosa deve rimanere del sito» della missione.
Gli agganci effettivi sono in `METHOD/SITO_ATTORI.json`: root, nodi, selettori e relazioni parentali.
Non stabiliscono la scenografia. Costruiscila secondo la regia, conservando gli agganci dei nodi
riusati e assegnando nomi stabili ai nuovi attori, senza dipendere dalle classi estetiche.

## Brief

Prova tecnica isolata: trasformare i contenuti reali della scena con ImageToContent come componente e SliceRevealer come seme, preservando identità, leggibilità e struttura del sito.

## Due materiali Vanilla

- **Componente: `imagetocontent-main`** — sorgente completa `MOTION_COMPONENTE/ARCHIVIO/imagetocontent-main/`; testi collegati: nessuno; modulo da realizzare: `assets/js/meccaniche/01-imagetocontent-main.js`.
- **Seme: `slicerevealer-master`** — sorgente completa `MOTION_COMPONENTE/ARCHIVIO/slicerevealer-master/`; testi collegati: nessuno; modulo da realizzare: `assets/js/meccaniche/02-slicerevealer-master.js`.

## Piano del giro

Sequenza operativa della missione, compilata con i materiali e le sezioni di questo giro. Il piano iniziale conserva questi lavori e può dettagliarli; non sostituisce lo studio con la redazione di REGIA.md, né le scene con effetti locali ridotti. La descrizione di un lavoro non completa la sua implementazione.

1. **Studio componente `imagetocontent-main`.** Leggi per primo `MOTION_COMPONENTE/ARCHIVIO/imagetocontent-main/README.md`: è la guida, non lo studio. Poi leggi per intero, uno per uno, questi 9 file: `MOTION_COMPONENTE/ARCHIVIO/imagetocontent-main/README.md` (48 righe), `MOTION_COMPONENTE/ARCHIVIO/imagetocontent-main/package.json` (32 righe), `MOTION_COMPONENTE/ARCHIVIO/imagetocontent-main/src/css/base.css` (459 righe), `MOTION_COMPONENTE/ARCHIVIO/imagetocontent-main/src/index.html` (291 righe), `MOTION_COMPONENTE/ARCHIVIO/imagetocontent-main/src/js/content.js` (36 righe), `MOTION_COMPONENTE/ARCHIVIO/imagetocontent-main/src/js/index.js` (298 righe), `MOTION_COMPONENTE/ARCHIVIO/imagetocontent-main/src/js/preview.js` (39 righe), `MOTION_COMPONENTE/ARCHIVIO/imagetocontent-main/src/js/textLinesReveal.js` (123 righe), `MOTION_COMPONENTE/ARCHIVIO/imagetocontent-main/src/js/utils.js` (65 righe). Pagine della demo: `dist/index.html`. Deriva gli otto aspetti di «Studio integrale delle demo» dalle funzioni effettive: questa analisi alimenta la ricostruzione, non una relazione che la dichiara gia' eseguita.
2. **Studio seme `slicerevealer-master`.** Leggi per primo `MOTION_COMPONENTE/ARCHIVIO/slicerevealer-master/README.md`: è la guida, non lo studio. Poi leggi per intero, uno per uno, questi 10 file: `MOTION_COMPONENTE/ARCHIVIO/slicerevealer-master/README.md` (30 righe), `MOTION_COMPONENTE/ARCHIVIO/slicerevealer-master/css/base.css` (443 righe), `MOTION_COMPONENTE/ARCHIVIO/slicerevealer-master/css/uncover.css` (53 righe), `MOTION_COMPONENTE/ARCHIVIO/slicerevealer-master/index.html` (97 righe), `MOTION_COMPONENTE/ARCHIVIO/slicerevealer-master/index2.html` (142 righe), `MOTION_COMPONENTE/ARCHIVIO/slicerevealer-master/index3.html` (142 righe), `MOTION_COMPONENTE/ARCHIVIO/slicerevealer-master/js/demo1.js` (132 righe), `MOTION_COMPONENTE/ARCHIVIO/slicerevealer-master/js/demo2.js` (125 righe), `MOTION_COMPONENTE/ARCHIVIO/slicerevealer-master/js/demo3.js` (189 righe), `MOTION_COMPONENTE/ARCHIVIO/slicerevealer-master/js/uncover.js` (107 righe). Pagine della demo: `index.html`, `index2.html`, `index3.html`. Deriva gli otto aspetti di «Studio integrale delle demo» dalle funzioni effettive: questa analisi alimenta la ricostruzione, non una relazione che la dichiara gia' eseguita.
3. **Regia globale.** Scrivi in `REGIA.md` la regia («Regia globale prima delle scene»), con una voce per ognuna delle 1 sezioni dei passi seguenti. Anticipa le decisioni dei tre livelli della mappa di trasposizione di «Studio integrale delle demo» della missione per i materiali appena studiati; progetta la nuova scenografia della sola scena secondo «Regia globale prima delle scene» e usa i precedenti come indicato in «Unicità senza divieti meccanici». Collega le decisioni agli stati spaziali, alle misure e alle funzioni da costruire per questo sito. Per ogni materiale identifica la variante scelta con file e funzioni originali e le relazioni che la nuova scena deve realizzare, come richiesto dalla mappa della missione.
4. **Allestimento 1 — `[data-m21-root="scene-001"]`.** Costruisci in HTML e CSS la scenografia progettata per questa root e, dove richiesto, nel renderer nativo. Implementa in `assets/js/scenografie/scena-001.js` misure e stati spaziali effettivi secondo «Meccaniche del giro prima del montaggio»: attori, geometria, gruppi, maschere, ingombri di lettura e coordinate coerenti. Le funzioni producono le configurazioni e le grandezze che i moduli dei materiali e il montaggio useranno realmente: realizza la derivazione dalle misure degli attori e dei contenuti alle destinazioni, distinguendo i parametri della regia dalle relazioni geometriche necessarie. Costruisci la base leggibile prima dell'enhancement locale, secondo la missione; non scrivere ancora tween dipendenti da coordinate della demo. Usa il riferimento locale della root e gli ingombri trasformati reali.
5. **Ricostruzione componente `imagetocontent-main`.** Scrivi in `assets/js/meccaniche/01-imagetocontent-main.js` le funzioni della meccanica secondo «Meccaniche del giro prima del montaggio» della missione e le decisioni della mappa di trasposizione. Parti dalle funzioni originali e dal loro incastro: ricostruisci il nucleo fedele alla variante scelta usando l'allestimento appena costruito. Il modulo riceve attori e misure della nuova scenografia e scambia gli stati assegnati dalla regia. Non montare il bootstrap della demo. Questa ricostruzione precede il montaggio nelle scene e non assegna il materiale a una sola sezione.
6. **Ricostruzione seme `slicerevealer-master`.** Scrivi in `assets/js/meccaniche/02-slicerevealer-master.js` le funzioni della meccanica secondo «Meccaniche del giro prima del montaggio» della missione e le decisioni della mappa di trasposizione. Parti dalle funzioni originali e dal loro incastro: ricostruisci il nucleo fedele alla variante scelta usando l'allestimento appena costruito. Il modulo riceve attori e misure della nuova scenografia e scambia gli stati assegnati dalla regia. Non montare il bootstrap della demo. Questa ricostruzione precede il montaggio nelle scene e non assegna il materiale a una sola sezione.
7. **Scena 1 — `[data-m21-root="scene-001"]` («Il gesto e la vigna»).** Realizza `setup(scope)` della scena in `assets/js/scene/scena-001.js`, importando e chiamando le funzioni di `assets/js/scenografie/scena-001.js` e importando e chiamando le funzioni dei moduli delle meccaniche pertinenti. Gli stati spaziali dell'allestimento guidano la coreografia secondo «Scene e passaggi» e `REGIA.md`: ruolo di fotografie e titoli, ingressi di testi e controlli, causa, sviluppo, geometria degli stati leggibili, ritorno, resize, passaggio e cleanup locale. Quando i materiali cooperano, usa lo stato raggiunto dal precedente nello spazio di coordinate dichiarato dall'allestimento; collega gli intervalli di lettura e uso alle configurazioni e ai percorsi effettivi, come richiesto dalla missione. Le pause sono stati leggibili della scena realizzata. Scrivere la sua descrizione non realizza questo setup.
8. **Collegamento dei passaggi.** Collega nel codice gli stati interni della sola scena fino alla sua conclusione. Passa realmente le grandezze condivise fra i moduli secondo il filo narrativo, con ownership locale. Non aggiungere effetti indipendenti; realizza i passaggi definiti nella regia. Questo passo costruisce la continuità, non è una verifica dei file.
9. **Consegna.** La sola scena completa, i moduli effettivamente usati e `SITE_SIGNATURE.json` compilato. Completa nella stessa `REGIA.md` la sintesi degli otto aspetti dello studio, i tre livelli della mappa di trasposizione e i riferimenti alle funzioni e alle scene che li realizzano, senza dichiarare intenzioni come codice eseguito.

## Relazioni dei materiali da trasformare nel sito

Queste indicazioni descrivono i materiali scelti. Le sorgenti complete definiscono formule e varianti;
Jules sceglie attori e composizione nella regia globale e realizza le funzioni per questo giro.

Per ogni materiale, anche quando non esiste un riferimento specifico qui sotto, lo studio identifica variante, file e funzioni originali, relazioni da conservare e contenuti del sito che le portano, secondo la mappa della missione. I riferimenti seguenti orientano lo studio, non lo sostituiscono.

- **Componente `imagetocontent-main`:** Ricavare dalle sorgenti complete attori, stati, formule, fasi, reversibilità e lifecycle; trasformare queste relazioni nei contenuti del sito prima di scrivere la meccanica.
- **Seme `slicerevealer-master`:** Ricavare dalle sorgenti complete attori, stati, formule, fasi, reversibilità e lifecycle; trasformare queste relazioni nei contenuti del sito prima di scrivere la meccanica.

## Dossier di orientamento

I dossier non certificano la completezza del lavoro: orientano la lettura integrale del codice. I JSON completi sono in `METHOD/DOSSIER/`.

### Componente: `imagetocontent-main`

- Indice sintattico: **indexed**; copertura semantica dichiarata **partial**.
- Sorgenti da leggere integralmente: 9.
- `src/index.html` — parsing `parsed`, 0 import, 2 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-292: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 2; condizioni 1.
  - `supportsCssVars` righe 13-13: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 3; condizioni 2.
  - 5 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.
- `src/js/content.js` — parsing `parsed`, 1 import, 2 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-36: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `constructor` righe 27-35: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 7; condizioni 0.
  - 6 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.
- `src/js/index.js` — parsing `parsed`, 6 import, 20 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-298: eventi nessuno; movimento gsap.registerPlugin; controlli nessuno; assegnazioni/formule 13; condizioni 0.
  - `previewElems.forEach:callback[0]` righe 15-17: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `initSmoothScrolling` righe 27-39: eventi nessuno; movimento requestAnimationFrame; controlli nessuno; assegnazioni/formule 2; condizioni 0.
  - `scrollFn` righe 34-37: eventi nessuno; movimento requestAnimationFrame; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `animateOnScroll` righe 41-67: eventi nessuno; movimento gsap.set, gsap.timeline, gsap.timeline.addLabel, gsap.timeline.addLabel.to, gsap.timeline.addLabel.to.to; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `getAdjacentItems` righe 69-79: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 2.
  - `showContent` righe 81-188: eventi nessuno; movimento gsap.timeline, gsap.timeline.addLabel, tl.add, tl.add.to, tl.add.to.to, tl.add.to.to.to, tl.add.to.to.to.addLabel, tl.add.to.to.to.addLabel.to, tl.add.to.to.to.addLabel.to.to, tl.add.to.to.to.addLabel.to.to.to, tl.add.to.to.to.addLabel.to.to.to.to, tl.add.to.to.to.addLabel.to.to.to.to.add, tl.to; controlli nessuno; assegnazioni/formule 4; condizioni 1.
  - `onStart` righe 90-117: eventi nessuno; movimento gsap.set; controlli nessuno; assegnazioni/formule 2; condizioni 0.
  - `onComplete` righe 118-118: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `tl.add:callback[0]` righe 130-138: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `tl.add.to.to.to.addLabel.to.to.to.to.add:callback[0]` righe 179-186: eventi nessuno; movimento gsap.set; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `hideContent` righe 190-271: eventi nessuno; movimento gsap.timeline, gsap.timeline.addLabel, gsap.timeline.addLabel.to, gsap.timeline.addLabel.to.to, gsap.timeline.addLabel.to.to.to, gsap.timeline.addLabel.to.to.to.to, gsap.timeline.addLabel.to.to.to.to.add, gsap.timeline.addLabel.to.to.to.to.add.addLabel, gsap.timeline.addLabel.to.to.to.to.add.addLabel.to, gsap.timeline.addLabel.to.to.to.to.add.addLabel.to.add, gsap.timeline.addLabel.to.to.to.to.add.addLabel.to.add.to, gsap.timeline.addLabel.to.to.to.to.add.addLabel.to.add.to.to, gsap.timeline.addLabel.to.to.to.to.add.addLabel.to.add.to.to.to; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `onComplete` righe 197-210: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `gsap.timeline.addLabel.to.to.to.to.add:callback[0]` righe 235-237: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `item.adjacentItems.map:callback[0]` righe 242-242: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `gsap.timeline.addLabel.to.to.to.to.add.addLabel.to.add:callback[0]` righe 246-254: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `initEvents` righe 274-289: eventi click; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `item.DOM.imageWrap.addEventListener:callback[1]` righe 276-281: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 2; condizioni 1.
  - `backCtrl.addEventListener:callback[1]` righe 284-288: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 1.
  - `preloadImages.then:callback[0]` righe 292-298: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - 73 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.
- `src/js/preview.js` — parsing `parsed`, 1 import, 2 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-39: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `constructor` righe 29-38: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 8; condizioni 0.
  - 7 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.
- `src/js/textLinesReveal.js` — parsing `parsed`, 3 import, 6 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-123: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `constructor` righe 26-37: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 2; condizioni 0.
  - `in` righe 44-71: eventi nessuno; movimento gsap.killTweensOf, gsap.timeline, gsap.timeline.addLabel, gsap.timeline.addLabel.set; controlli nessuno; assegnazioni/formule 2; condizioni 1.
  - `out` righe 78-102: eventi nessuno; movimento gsap.killTweensOf, gsap.timeline, gsap.timeline.addLabel; controlli nessuno; assegnazioni/formule 2; condizioni 1.
  - `initEvents` righe 107-122: eventi resize; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `window.addEventListener:callback[1]` righe 109-121: eventi nessuno; movimento gsap.set; controlli nessuno; assegnazioni/formule 0; condizioni 1.
  - 17 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.
- `src/js/utils.js` — parsing `parsed`, 1 import, 8 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-65: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 6; condizioni 0.
  - `lerp` righe 9-9: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `getCursorPos` righe 15-20: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `preloadImages` righe 26-30: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `funzione@27:23` righe 27-29: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `wrapLines` righe 38-45: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `arr.forEach:callback[0]` righe 39-44: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 2; condizioni 0.
  - `isInViewport` righe 51-57: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 11.
  - 9 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.

File da studiare di `imagetocontent-main` (9): `README.md` (48 righe), `package.json` (32 righe), `src/css/base.css` (459 righe), `src/index.html` (291 righe), `src/js/content.js` (36 righe), `src/js/index.js` (298 righe), `src/js/preview.js` (39 righe), `src/js/textLinesReveal.js` (123 righe), `src/js/utils.js` (65 righe).
Il dossier e' una mappa di navigazione. Il codice e gli eventuali testi collegati restano la fonte completa.
### Seme: `slicerevealer-master`

- Indice sintattico: **indexed**; copertura semantica dichiarata **partial**.
- Sorgenti da leggere integralmente: 10.
- `index.html` — parsing `parsed`, 0 import, 2 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-97: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 2; condizioni 1.
  - `supportsCssVars` righe 17-17: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 3; condizioni 2.
  - 5 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.
- `index2.html` — parsing `parsed`, 0 import, 2 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-142: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 2; condizioni 1.
  - `supportsCssVars` righe 17-17: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 3; condizioni 2.
  - 5 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.
- `index3.html` — parsing `parsed`, 0 import, 2 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-142: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 2; condizioni 1.
  - `supportsCssVars` righe 17-17: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 3; condizioni 2.
  - 5 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.
- `js/demo1.js` — parsing `parsed`, 0 import, 12 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-132: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `constructor` righe 51-59: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 5; condizioni 0.
  - `this.DOM.slides.forEach:callback[0]` righe 57-57: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `init` righe 60-71: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `this.uncoverItems[this.current].show.then:callback[0]` righe 70-70: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `navigate` righe 72-92: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 4.
  - `this.uncoverItems[this.current].hide.then:callback[0]` righe 76-91: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 2; condizioni 0.
  - `newItem.show.then:callback[0]` righe 90-90: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `imagesLoaded:callback[2]` righe 96-131: eventi keydown; movimento nessuna; controlli nessuno; assegnazioni/formule 3; condizioni 0.
  - `triggers.forEach:callback[0]` righe 103-113: eventi click; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 1.
  - `trigger.addEventListener:callback[1]` righe 107-112: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 1.
  - `document.addEventListener:callback[1]` righe 115-130: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 3; condizioni 6.
  - 37 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.
- `js/demo2.js` — parsing `parsed`, 0 import, 14 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-125: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 2; condizioni 0.
  - `delay` righe 52-52: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `delay` righe 55-55: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `constructor` righe 60-68: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 5; condizioni 0.
  - `this.DOM.slides.forEach:callback[0]` righe 66-66: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `init` righe 69-73: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `this.uncoverItems[this.current].show.then:callback[0]` righe 72-72: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `navigate` righe 74-87: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 4.
  - `this.uncoverItems[this.current].hide.then:callback[0]` righe 78-86: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 2; condizioni 0.
  - `newItem.show.then:callback[0]` righe 85-85: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `imagesLoaded:callback[2]` righe 90-124: eventi keydown; movimento nessuna; controlli nessuno; assegnazioni/formule 3; condizioni 0.
  - `triggers.forEach:callback[0]` righe 96-106: eventi click; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 1.
  - `trigger.addEventListener:callback[1]` righe 100-105: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 1.
  - `document.addEventListener:callback[1]` righe 108-123: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 3; condizioni 6.
  - 37 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.
- `js/demo3.js` — parsing `parsed`, 0 import, 23 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-190: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 5; condizioni 0.
  - `delay` righe 77-77: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `delay` righe 80-80: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `delay` righe 85-85: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `delay` righe 88-88: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `delay` righe 93-93: eventi nessuno; movimento anime.random; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `delay` righe 96-96: eventi nessuno; movimento anime.random; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `delay` righe 101-101: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `delay` righe 104-104: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `delay` righe 109-109: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `delay` righe 112-112: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `delay` righe 117-117: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `delay` righe 120-120: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `delay` righe 125-125: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `delay` righe 133-133: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `delay` righe 138-138: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `delay` righe 147-147: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `delay` righe 152-152: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `delay` righe 161-161: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `funzione@168:46` righe 168-177: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `entries.forEach:callback[0]` righe 169-176: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 1.
  - `imagesLoaded:callback[2]` righe 181-188: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `items.forEach:callback[0]` righe 184-187: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - 26 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.
- `js/uncover.js` — parsing `parsed`, 0 import, 8 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-107: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `constructor` righe 13-38: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 3; condizioni 1.
  - `layout` righe 39-52: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 10; condizioni 1.
  - `show` righe 53-56: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 1.
  - `hide` righe 57-60: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 1.
  - `toggle` righe 61-104: eventi nessuno; movimento anime, anime.remove; controlli nessuno; assegnazioni/formule 3; condizioni 10.
  - `this.DOM.slices.forEach:callback[0]` righe 64-68: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 2.
  - `delay` righe 75-75: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - 14 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.

File da studiare di `slicerevealer-master` (10): `README.md` (30 righe), `css/base.css` (443 righe), `css/uncover.css` (53 righe), `index.html` (97 righe), `index2.html` (142 righe), `index3.html` (142 righe), `js/demo1.js` (132 righe), `js/demo2.js` (125 righe), `js/demo3.js` (189 righe), `js/uncover.js` (107 righe).
Il dossier e' una mappa di navigazione. Il codice e gli eventuali testi collegati restano la fonte completa.

## Plugin richiesti dalle sorgenti

`flip`. Ogni scena usa `SiteScenes.mountRequired`; dichiara soltanto le dipendenze che usa davvero.

## Skill integrali da leggere nel passo pertinente

Prima `METHOD/SKILL_ROUTING_GIRO.md` e la mappa `MOTION_COMPONENTE/SAPERE/PRECEDENZE_E_AMBITI.md`.
I pacchetti completi restano disponibili e si leggono nella fase assegnata, non tutti insieme all'inizio:

- `MOTION_COMPONENTE/SAPERE/00_INDEX.md` — integrale
- `MOTION_COMPONENTE/SAPERE/PRECEDENZE_E_AMBITI.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/animate/RECIPES.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/animate/SKILL.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/build-awwwards-quality-sites/SKILL.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/build-awwwards-quality-sites/agents/openai.yaml` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/cinematic-gsap-lenis-motion-system/REFERENCES.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/cinematic-gsap-lenis-motion-system/SKILL.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/cinematic-gsap-lenis-motion-system/demo/PROMPT.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/cinematic-gsap-lenis-motion-system/demo/index.html` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/emil-design-eng/SKILL.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/gsap-scrolltrigger/SKILL.md` — integrale
- `MOTION_COMPONENTE/SAPERE/vanilla/gsap-core/SKILL.md` — integrale
- `MOTION_COMPONENTE/SAPERE/vanilla/gsap-performance/SKILL.md` — integrale
- `MOTION_COMPONENTE/SAPERE/vanilla/gsap-plugins/SKILL.md` — integrale
- `MOTION_COMPONENTE/SAPERE/vanilla/gsap-timeline/SKILL.md` — integrale
- `MOTION_COMPONENTE/SAPERE/vanilla/gsap-utils/SKILL.md` — integrale

## Design del sito

- Colori rilevati: nessun valore esplicito rilevato.
- Caratteri: `Montserrat`, `Playfair Display`.
- Variabili CSS: nessuna.
- CSS letti: `MOTORE/vendor/lenis.css`.

## Preparazione tecnica e dipendenze locali

Preparazione tecnica locale: `BUILD/DIPENDENZE.json`, `BUILD/README.md`, compilatore offline `node BUILD/compila.mjs`. Dipendenze rilevate dei materiali selezionati predisposte; nessun bootstrap artistico fornito.

## Memoria creativa

Nessun precedente pertinente.

## Esecuzione

Segui il «Piano del giro», passo per passo. Consegna sito, `REGIA.md` e `SITE_SIGNATURE.json`, quindi esegui una volta `node BUILD/compila.mjs`. Il comando controlla soltanto che scene, scenografie e materiali siano collegati e implementati; non giudica l'arte. Non produrre gate, punteggi, tabelle di conformità o richieste di approvazione intermedia.
