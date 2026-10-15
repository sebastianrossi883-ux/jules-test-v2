# START HERE — Metodo 21

Realizza il sito nella stessa esecuzione. Non fermarti a REGIA.md e non consegnare lo stato preparato.

Ordine obbligatorio: studio delle sorgenti selezionate → regia globale → scenografia HTML/CSS e renderer → funzioni reali delle meccaniche → setup di tutte le scene → passaggi → firma → compilazione finale.

Leggi `METHOD/MISSIONE_JULES.md` prima di modificare il sito. Leggi poi `METHOD/SKILL_ROUTING_GIRO.md`; apri i pacchetti skill completi soltanto nella fase assegnata. Il codice delle demo prevale sui tutorial; il sito fornito prevale sull'impaginazione delle demo.

I file elencati sotto sono presenti integralmente nella repository. SHA-256 e dimensioni identificano ciò che hai ricevuto; non sostituire la lettura con il dossier. Gli esempi storici non fanno parte delle istruzioni operative.

## Incarico concreto del giro

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

## Inventario verificabile delle fonti

| Percorso | Ruolo | Righe | Byte | SHA-256 |
|---|---:|---:|---:|---|
| `MOTORE/MOTION.md` | api | 125 | 16213 | `6e7f645ee6058b81eaf91a468559abd60bc7d0f702185453c1e6d27494adbf8f` |
| `MOTORE/scena-supporto.js` | api-geometria | 230 | 9490 | `7e4ddff52dfd4ec69a1b939d41684fa84d107e6fa5ff5afb16ca684226aa7988` |
| `METHOD/DOSSIER/imagetocontent-main.json` | dossier-orientamento | 13571 | 532895 | `29b1108dbfbe1ebe66172b31db057ed72a45a6602261ce7ffac9ea1c89809b40` |
| `METHOD/DOSSIER/slicerevealer-master.json` | dossier-orientamento | 14836 | 538713 | `9761a6f4ca6d56f19d1c8117647f64a8ea3a36893ffb7096510ad38660faed20` |
| `SITE_SIGNATURE.json` | firma | 18 | 359 | `f7e8dd63483450e29e61ad46accb57257936de713b7b5b9fc33a3d2a6bf9aec3` |
| `METHOD/INCARICO_GIRO.md` | incarico | 242 | 30777 | `53f145ee478c4c857b91a9d1f714785988f26401a6a535fd2e9a6c5b0eb1567a` |
| `MOTION_COMPONENTE/SAPERE/00_INDEX.md` | indice-skill | 8 | 618 | `a65083bcc0711df5ad1daba6506ce7d66283025916f7e609c20a19c4d0c3c18c` |
| `METHOD/SITO_ATTORI.json` | integrazione | 272 | 8084 | `d310753bf4302ae4d48eb1fccba01bab8b209c784ad85cce95b3ba8844183c79` |
| `assets/js/regia-sito.js` | integrazione | 49 | 2249 | `4e34b7ee17c667b65fb7dac9cfab4e2050425a4fb70c962265b80d1960d211a9` |
| `MOTION_COMPONENTE/ARCHIVIO/materials.manifest.json` | manifest-materiali | 82 | 2160 | `d3b75c4e2caa76387498893baf157acaa562d1f907ca9f60de6f13cb55cf0966` |
| `MOTION_COMPONENTE/SAPERE/PRECEDENZE_E_AMBITI.md` | mappa-skill | 65 | 8156 | `5fa53765f074a65d765190a7b24591259ef85ef5a5ce23ecb72ad659900633f5` |
| `MOTION_COMPONENTE/ARCHIVIO/imagetocontent-main/README.md` | materiale | 48 | 1007 | `a029b7acb35925203eaceb5c588585a05dd188541a19db2dd3a94230aea0562a` |
| `MOTION_COMPONENTE/ARCHIVIO/imagetocontent-main/package.json` | materiale | 32 | 844 | `7c02bb7ba78104f0d03b267ce5ebc7e452aa841365fc51889f1d87849ead408c` |
| `MOTION_COMPONENTE/ARCHIVIO/imagetocontent-main/src/css/base.css` | materiale | 459 | 7169 | `2e8d4051be5c5f17c5bfb155973d351d083a1f8b8c48e076b8241d4db125c3fb` |
| `MOTION_COMPONENTE/ARCHIVIO/imagetocontent-main/src/index.html` | materiale | 291 | 16295 | `669880b5ee728b8948d5b0de004807aff1e236205f1fe5a05150b0aee76dbba4` |
| `MOTION_COMPONENTE/ARCHIVIO/imagetocontent-main/src/js/content.js` | materiale | 36 | 1132 | `e0c12f4726ebc5de58aaf327b6084d8c917a212690301e5f28e1886b5bdcee2d` |
| `MOTION_COMPONENTE/ARCHIVIO/imagetocontent-main/src/js/index.js` | materiale | 298 | 7097 | `d1409fdef30e6d9191d5d144ef66a66227d9106111400d724b2cb50453dbfdf1` |
| `MOTION_COMPONENTE/ARCHIVIO/imagetocontent-main/src/js/preview.js` | materiale | 39 | 1224 | `e393d6c56088bd793179f923e17fb208a4358d59cf2fae16fb38070096c7bbd6` |
| `MOTION_COMPONENTE/ARCHIVIO/imagetocontent-main/src/js/textLinesReveal.js` | materiale | 123 | 3452 | `950c8f13d82b3a952086c6eee6b7e25dabdeffe05f0de1e95369ec2af11532ef` |
| `MOTION_COMPONENTE/ARCHIVIO/imagetocontent-main/src/js/utils.js` | materiale | 65 | 1996 | `5b6e3556f0013d42257203982fc543e81447505fc32b3ecacb8d2a72a35bf3b5` |
| `MOTION_COMPONENTE/ARCHIVIO/slicerevealer-master/README.md` | materiale | 30 | 1480 | `ae6d3cba439f1ce1f5fa01fb4964ab157c4a464f0585e739804ba0ca87895752` |
| `MOTION_COMPONENTE/ARCHIVIO/slicerevealer-master/css/base.css` | materiale | 443 | 8786 | `2096ff183fd949dca8239e77bffc0e6571b3a871dd6c664718cfe699f667d827` |
| `MOTION_COMPONENTE/ARCHIVIO/slicerevealer-master/css/uncover.css` | materiale | 53 | 885 | `c0eb60e4a936307c3b6abdeccf1a98cfe17252d9d4a6a48dbf96057b349174ad` |
| `MOTION_COMPONENTE/ARCHIVIO/slicerevealer-master/index.html` | materiale | 97 | 5275 | `b5a7203f73528bff0453f61adc09d682adc7cde03b94c88fda52e78f37b9bb48` |
| `MOTION_COMPONENTE/ARCHIVIO/slicerevealer-master/index2.html` | materiale | 142 | 7266 | `3d338a13dfd7826618c35fb692a9d46c7b3d6cfc76db1a5abb69899716df4a75` |
| `MOTION_COMPONENTE/ARCHIVIO/slicerevealer-master/index3.html` | materiale | 142 | 7403 | `bd20969a502d614bb2fedf6a7412542b2a009fe079ed4d901cc19ee056153323` |
| `MOTION_COMPONENTE/ARCHIVIO/slicerevealer-master/js/demo1.js` | materiale | 132 | 4932 | `68529fe235dd03bc0aaef395ca5b6de91f980c5fe3d0021db2626458678a7983` |
| `MOTION_COMPONENTE/ARCHIVIO/slicerevealer-master/js/demo2.js` | materiale | 125 | 4759 | `bb00e4da07a6b6150321be00398fa008b34a57be95123e034a96cd9343f11171` |
| `MOTION_COMPONENTE/ARCHIVIO/slicerevealer-master/js/demo3.js` | materiale | 189 | 6086 | `621e4fb5d2dd0dedff1c2b82e5754aee1360eba20f485320f8f7ea44329187c4` |
| `MOTION_COMPONENTE/ARCHIVIO/slicerevealer-master/js/uncover.js` | materiale | 107 | 4978 | `717bc74b162482e74da7bc2cfab9e22590610834eba6de2930e9c02128f3b7e0` |
| `METHOD/MISSIONE_JULES.md` | missione | 181 | 38192 | `78e01ec3aac687ca7c3e0361398deeaaaa7117b741c6266f37c327b69a623d72` |
| `METHOD/SKILL_ROUTING_GIRO.md` | routing-skill | 15 | 1351 | `f33b8d46140e5a367ba21e2f363c45ca78f3802ac51dddbbdc03ccdbbebb4890` |
| `AGENTS.md` | sito | 10 | 1350 | `dc2a3fba22a79b870d8d41ee812e8b69193c3a38d56dc317a165e30e4d0e26d7` |
| `FONTI_SITO_ORIGINALI/index.html` | sito | 40 | 2444 | `9b2a4bf8bf029c8e22bf97ac047c4682a01661c658762aec524fb3a4b25a9bc0` |
| `MOTORE/vendor/lenis.css` | sito | 26 | 513 | `2f668ae84a668327f246faf8a770383a2bf69196d214290fbc4d5548910606c5` |
| `assets/js/meccaniche/01-imagetocontent-main.js` | sito | 6 | 469 | `37a5fb42c267030388ce83e3b2a17e6bf357f823836ab8832ac1ff031b72ee86` |
| `assets/js/meccaniche/02-slicerevealer-master.js` | sito | 6 | 461 | `941fda9bfbe3980c98e09b0ad5b38b9e2d8042f1c9b0a31d2fefeb73aab5ae00` |
| `assets/js/scene/scena-001.js` | sito | 22 | 849 | `41f18d6fc1cc3d646c8d6317b4cbeab02b3ff1812eaf4ec60e10ee88a4476252` |
| `assets/js/scenografie/scena-001.js` | sito | 24 | 1183 | `13c783fbf405f37097d446712d3601b0e697e698aa4a365378bc09973c85f8d0` |
| `index.html` | sito | 50 | 3970 | `4f09a020635e82e8c8b817b48b6fe7da8eebba431932b9e841725f532225e6ff` |
| `MOTION_COMPONENTE/SAPERE/complete/animate/RECIPES.md` | skill | 324 | 7957 | `21ff63d84391db8d96ecdf9170095f55a42c836ccc36fd3269c4772bab031ba2` |
| `MOTION_COMPONENTE/SAPERE/complete/animate/SKILL.md` | skill | 207 | 11860 | `b8ede161270458e6ae2e45e8a1985373515d4c63de5568ddb0f9012d7634356c` |
| `MOTION_COMPONENTE/SAPERE/complete/build-awwwards-quality-sites/SKILL.md` | skill | 65 | 7216 | `1568e003d112e72df0ea2ec925829a5039b762c27174e063c192d7ccf7f4f9e6` |
| `MOTION_COMPONENTE/SAPERE/complete/build-awwwards-quality-sites/agents/openai.yaml` | skill | 4 | 274 | `65f0a30266377d7fd32928ed50171f1bd8dbd38b40dedcb2eadb0801e34d42de` |
| `MOTION_COMPONENTE/SAPERE/complete/cinematic-gsap-lenis-motion-system/REFERENCES.md` | skill | 4 | 165 | `0f4bf70304d3011b22b4f06a27cc13b006a92212857b010850126b2ee50e9c3c` |
| `MOTION_COMPONENTE/SAPERE/complete/cinematic-gsap-lenis-motion-system/SKILL.md` | skill | 617 | 17600 | `7b8f5745f34ef4ba507e19fabd6acf9cd3b8d70efda81746d0f4090af0f84e06` |
| `MOTION_COMPONENTE/SAPERE/complete/cinematic-gsap-lenis-motion-system/demo/PROMPT.md` | skill | 43 | 2101 | `9c9a8412a745d819e0f4db118740196f7db378f9e12a66e854f072bf437f8bdd` |
| `MOTION_COMPONENTE/SAPERE/complete/cinematic-gsap-lenis-motion-system/demo/index.html` | skill | 35 | 16602 | `89559d94e96fd929ba01931006aa61ee0301faacef1a515bb4d8059da59c817a` |
| `MOTION_COMPONENTE/SAPERE/complete/emil-design-eng/SKILL.md` | skill | 674 | 27123 | `ffbe68e6007fb42cb8149f089b400a1ca007d59ba23e8948e2be4476f3175939` |
| `MOTION_COMPONENTE/SAPERE/complete/gsap-scrolltrigger/SKILL.md` | skill | 296 | 18390 | `9351b6666a4749c0740406ea363aaccb99a087ff45cc5e8b99a0f367facf3ef4` |
| `MOTION_COMPONENTE/SAPERE/vanilla/gsap-core/SKILL.md` | skill | 254 | 14792 | `3887b47e050ab5afbe2a9a820f23d39fa02ab785e06a343be44c6f91d84d12b3` |
| `MOTION_COMPONENTE/SAPERE/vanilla/gsap-performance/SKILL.md` | skill | 79 | 4139 | `cb5408d6fba707aabcbfe3320317a14c1f8fca6070074e5261047930f50d441e` |
| `MOTION_COMPONENTE/SAPERE/vanilla/gsap-plugins/SKILL.md` | skill | 433 | 21579 | `5838b856c74c07fbc9fa99b6dfd1eee34ea554c3e530c30e0d58014b707d70a4` |
| `MOTION_COMPONENTE/SAPERE/vanilla/gsap-timeline/SKILL.md` | skill | 107 | 4394 | `1a8b0f39cc4be3ed3d834b89672e4ae2f151b901dc3450bebf10bbc45379fe02` |
| `MOTION_COMPONENTE/SAPERE/vanilla/gsap-utils/SKILL.md` | skill | 284 | 12093 | `1927bcc4ea95b38203404ad5ea1d060b15c4a886c65ae53e885ff1793aabe0ba` |
| `BUILD/DIPENDENZE.json` | tecnica | 227 | 5589 | `e5a1c822c38b31fddb70f83fd1253327d26cf173fb11074086d0c242a47f54a4` |
| `BUILD/README.md` | tecnica | 11 | 2753 | `55970dffefcb5a6dd531153b211ed2176fed7054a565f77926bc5ce4b7eec053` |
| `BUILD/build_output.mjs` | tecnica | 81 | 4395 | `897f0ae668afc1779d8ce27f53907bdf31037536eec8dfc6c0e17f2f26f62b30` |
| `BUILD/compila.mjs` | tecnica | 151 | 10629 | `f6d32903b114ed3c569421b3f2a80f553854d617363ef96d852a9bfadb90c2e9` |
| `BUILD/config.json` | tecnica | 29 | 805 | `c48fe71f756d87d4c7906bd957621746ba7584be0d38ab808905b8c079c2ed21` |
| `BUILD/verifica_contratto_finale.mjs` | tecnica | 158 | 8086 | `0a3ec65ff3b7da1e6ba44d0c4a75e5c1dcaeb0999ad877640169fa80ec61dcf4` |

## Conclusione eseguibile

Completa i moduli `pending`, usa davvero le funzioni dei materiali e la scenografia dentro i moduli scena, quindi esegui una sola volta `node BUILD/compila.mjs`. Il comando controlla il cablaggio tecnico, non la qualità artistica. Consegna sito, `REGIA.md` e `SITE_SIGNATURE.json`; niente approvazioni intermedie, punteggi o rapporti di conformità.
