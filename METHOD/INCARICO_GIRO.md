# Incarico del giro

## Sito fornito

Giro ordinario: sito completo, un componente e due semi.

Le scene strutturali di `index.html`, nell'ordine:

1. `<section id="scena-podere">` — «Il gesto e la vigna» — 4 media, 3 titoli, 7 testi, 0 controlli; root `[data-m21-root="scene-001"]`

Questo inventario descrive il DOM iniziale: i conteggi non sono limiti agli attori o alla composizione,
né quantità da raggiungere. Per la ricomposizione applica «Cosa deve rimanere del sito» della missione.
Gli agganci effettivi sono in `METHOD/SITO_ATTORI.json`: root, nodi, selettori e relazioni parentali.
Non stabiliscono la scenografia. Costruiscila secondo la regia, conservando gli agganci dei nodi
riusati e assegnando nomi stabili ai nuovi attori, senza dipendere dalle classi estetiche.

## Brief

Prova isolata della creazione di una nuova scenografia da tre materiali: Sticky Grid governa lo spazio e la progressione; MotionPath e RotatingOnScroll trasformano traiettorie, profondità e comportamento degli attori. Usare i contenuti reali del Podere, senza riprodurre il layout delle demo.

## Tre materiali Vanilla

- **Componente: `codrops-sticky-grid-scroll-main`** — sorgente completa `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/`; testi collegati: `MOTION_COMPONENTE/REFERENZE/codrops-sticky-grid-scroll-main/originale-69eb2cea87adb275.txt`, `MOTION_COMPONENTE/REFERENZE/codrops-sticky-grid-scroll-main/articolo-completo.md`; modulo da realizzare: `assets/js/meccaniche/01-codrops-sticky-grid-scroll-main.js`.
- **Seme 1: `codrops-motion-path-transition-main-2`** — sorgente completa `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/`; testi collegati: `MOTION_COMPONENTE/REFERENZE/codrops-motion-path-transition-main-2/originale-ac8c549039854f62.txt`, `MOTION_COMPONENTE/REFERENZE/codrops-motion-path-transition-main-2/articolo-completo.md`; modulo da realizzare: `assets/js/meccaniche/02-codrops-motion-path-transition-main-2.js`.
- **Seme 2: `rotatingonscrollanimations-main`** — sorgente completa `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/`; testi collegati: `MOTION_COMPONENTE/REFERENZE/rotatingonscrollanimations-main/originale-32659649b6cf04d4.txt`, `MOTION_COMPONENTE/REFERENZE/rotatingonscrollanimations-main/articolo-completo.md`; modulo da realizzare: `assets/js/meccaniche/03-rotatingonscrollanimations-main.js`.

## Piano del giro

Sequenza operativa della missione, compilata con i materiali e le sezioni di questo giro. Il piano iniziale conserva questi lavori e può dettagliarli; non sostituisce lo studio con la redazione di REGIA.md, né le scene con effetti locali ridotti. La descrizione di un lavoro non completa la sua implementazione.

1. **Studio componente `codrops-sticky-grid-scroll-main`.** Leggi per primo il testo collegato `MOTION_COMPONENTE/REFERENZE/codrops-sticky-grid-scroll-main/originale-69eb2cea87adb275.txt` (618 righe), `MOTION_COMPONENTE/REFERENZE/codrops-sticky-grid-scroll-main/articolo-completo.md` (527 righe): è la guida, non lo studio. Poi leggi per intero, uno per uno, questi 9 file: `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/README.md` (61 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/package-lock.json` (1111 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/package.json` (19 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/src/index.html` (101 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/src/scripts/index.js` (280 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/src/scripts/utils.js` (19 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/src/styles/base.css` (226 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/src/styles/index.css` (130 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/vite.config.ts` (17 righe). Pagine della demo: `src/index.html`. Deriva gli otto aspetti di «Studio integrale delle demo» dalle funzioni effettive: questa analisi alimenta la ricostruzione, non una relazione che la dichiara gia' eseguita.
2. **Studio seme 1 `codrops-motion-path-transition-main-2`.** Leggi per primo il testo collegato `MOTION_COMPONENTE/REFERENZE/codrops-motion-path-transition-main-2/originale-ac8c549039854f62.txt` (226 righe), `MOTION_COMPONENTE/REFERENZE/codrops-motion-path-transition-main-2/articolo-completo.md` (135 righe): è la guida, non lo studio. Poi leggi per intero, uno per uno, questi 11 file: `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/README.md` (27 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/css/base.css` (272 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/css/style.css` (182 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/index.html` (177 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/index2.html` (159 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/index3.html` (219 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/index4.html` (156 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/js/script.js` (161 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/js/script2.js` (167 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/js/script3.js` (156 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/js/script4.js` (145 righe). Pagine della demo: `index.html`, `index2.html`, `index3.html`, `index4.html`. Deriva gli otto aspetti di «Studio integrale delle demo» dalle funzioni effettive: questa analisi alimenta la ricostruzione, non una relazione che la dichiara gia' eseguita.
3. **Studio seme 2 `rotatingonscrollanimations-main`.** Leggi per primo il testo collegato `MOTION_COMPONENTE/REFERENZE/rotatingonscrollanimations-main/originale-32659649b6cf04d4.txt` (33 righe), `MOTION_COMPONENTE/REFERENZE/rotatingonscrollanimations-main/articolo-completo.md` (33 righe): è la guida, non lo studio. Poi leggi per intero, uno per uno, questi 13 file: `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/README.md` (25 righe), `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/css/base.css` (352 righe), `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/index.html` (88 righe), `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/index2.html` (85 righe), `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/index3.html` (85 righe), `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/index4.html` (88 righe), `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/index5.html` (85 righe), `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/js/index.js` (161 righe), `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/js/index2.js` (156 righe), `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/js/index3.js` (139 righe), `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/js/index4.js` (162 righe), `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/js/index5.js` (179 righe), `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/js/lenis.min.js` (772 righe). Pagine della demo: `index.html`, `index2.html`, `index3.html`, `index4.html`, `index5.html`. Deriva gli otto aspetti di «Studio integrale delle demo» dalle funzioni effettive: questa analisi alimenta la ricostruzione, non una relazione che la dichiara gia' eseguita.
4. **Regia globale.** Scrivi in `REGIA.md` la regia («Regia globale prima delle scene»), con una voce per ognuna delle 1 sezioni dei passi seguenti. Anticipa le decisioni dei tre livelli della mappa di trasposizione di «Studio integrale delle demo» della missione per i materiali appena studiati; progetta la nuova scenografia hero-footer secondo «Regia globale prima delle scene» e usa i precedenti come indicato in «Unicità senza divieti meccanici». Collega le decisioni agli stati spaziali, alle misure e alle funzioni da costruire per questo sito. Per ogni materiale identifica la variante scelta con file e funzioni originali e le relazioni che la nuova scena deve realizzare, come richiesto dalla mappa della missione.
5. **Allestimento 1 — `[data-m21-root="scene-001"]`.** Costruisci in HTML e CSS la scenografia progettata per questa root e, dove richiesto, nel renderer nativo. Implementa in `assets/js/scenografie/scena-001.js` misure e stati spaziali effettivi secondo «Meccaniche del giro prima del montaggio»: attori, geometria, gruppi, maschere, ingombri di lettura e coordinate coerenti. Le funzioni producono le configurazioni e le grandezze che i moduli dei materiali e il montaggio useranno realmente: realizza la derivazione dalle misure degli attori e dei contenuti alle destinazioni, distinguendo i parametri della regia dalle relazioni geometriche necessarie. Costruisci la base leggibile prima dell'enhancement locale, secondo la missione; non scrivere ancora tween dipendenti da coordinate della demo. Usa il riferimento locale della root e gli ingombri trasformati reali.
6. **Ricostruzione componente `codrops-sticky-grid-scroll-main`.** Scrivi in `assets/js/meccaniche/01-codrops-sticky-grid-scroll-main.js` le funzioni della meccanica secondo «Meccaniche del giro prima del montaggio» della missione e le decisioni della mappa di trasposizione. Parti dalle funzioni originali e dal loro incastro: ricostruisci il nucleo fedele alla variante scelta usando l'allestimento appena costruito. Il modulo riceve attori e misure della nuova scenografia e scambia gli stati assegnati dalla regia. Non montare il bootstrap della demo. Questa ricostruzione precede il montaggio nelle scene e non assegna il materiale a una sola sezione.
7. **Ricostruzione seme 1 `codrops-motion-path-transition-main-2`.** Scrivi in `assets/js/meccaniche/02-codrops-motion-path-transition-main-2.js` le funzioni della meccanica secondo «Meccaniche del giro prima del montaggio» della missione e le decisioni della mappa di trasposizione. Parti dalle funzioni originali e dal loro incastro: ricostruisci il nucleo fedele alla variante scelta usando l'allestimento appena costruito. Il modulo riceve attori e misure della nuova scenografia e scambia gli stati assegnati dalla regia. Non montare il bootstrap della demo. Questa ricostruzione precede il montaggio nelle scene e non assegna il materiale a una sola sezione.
8. **Ricostruzione seme 2 `rotatingonscrollanimations-main`.** Scrivi in `assets/js/meccaniche/03-rotatingonscrollanimations-main.js` le funzioni della meccanica secondo «Meccaniche del giro prima del montaggio» della missione e le decisioni della mappa di trasposizione. Parti dalle funzioni originali e dal loro incastro: ricostruisci il nucleo fedele alla variante scelta usando l'allestimento appena costruito. Il modulo riceve attori e misure della nuova scenografia e scambia gli stati assegnati dalla regia. Non montare il bootstrap della demo. Questa ricostruzione precede il montaggio nelle scene e non assegna il materiale a una sola sezione.
9. **Scena 1 — `[data-m21-root="scene-001"]` («Il gesto e la vigna»).** Realizza `setup(scope)` della scena in `assets/js/scene/scena-001.js`, importando e chiamando le funzioni di `assets/js/scenografie/scena-001.js` e importando e chiamando le funzioni dei moduli delle meccaniche pertinenti. Gli stati spaziali dell'allestimento guidano la coreografia secondo «Scene e passaggi» e `REGIA.md`: ruolo di fotografie e titoli, ingressi di testi e controlli, causa, sviluppo, geometria degli stati leggibili, ritorno, resize, passaggio e cleanup locale. Quando i materiali cooperano, usa lo stato raggiunto dal precedente nello spazio di coordinate dichiarato dall'allestimento; collega gli intervalli di lettura e uso alle configurazioni e ai percorsi effettivi, come richiesto dalla missione. Le pause sono stati leggibili della scena realizzata. Scrivere la sua descrizione non realizza questo setup.
10. **Collegamento dei passaggi.** Collega nel codice lo stato conclusivo e l'apertura delle sezioni consecutive, fino alla chiusura del footer. Passa realmente le grandezze condivise fra i moduli secondo il filo narrativo, con ownership locale. Non aggiungere effetti indipendenti; realizza i passaggi definiti nella regia. Questo passo costruisce la continuità, non è una verifica dei file.
11. **Consegna.** Il sito completo, i moduli effettivamente usati e `SITE_SIGNATURE.json` compilato. Completa nella stessa `REGIA.md` la sintesi degli otto aspetti dello studio, i tre livelli della mappa di trasposizione e i riferimenti alle funzioni e alle scene che li realizzano, senza dichiarare intenzioni come codice eseguito.

## Relazioni dei materiali da trasformare nel sito

Queste indicazioni descrivono i materiali scelti. Le sorgenti complete definiscono formule e varianti;
Jules sceglie attori e composizione nella regia globale e realizza le funzioni per questo giro.

Per ogni materiale, anche quando non esiste un riferimento specifico qui sotto, lo studio identifica variante, file e funzioni originali, relazioni da conservare e contenuti del sito che le portano, secondo la mappa della missione. I riferimenti seguenti orientano lo studio, non lo sostituiscono.

- **Componente `codrops-sticky-grid-scroll-main`:** Ingresso alternato dei gruppi, espansione della formazione, separazione laterale e centrale, rivelazione del contenuto e risposta alla direzione dello scroll. Derivare le relazioni da gridRevealTimeline, gridZoomTimeline, toggleContent e animateGridOnScroll in src/scripts/index.js. Il numero delle fotografie di una sezione non e' il numero massimo di attori: progettare la formazione con contenuti pertinenti senza ricostruire la galleria della demo.
- **Seme 1 `codrops-motion-path-transition-main-2`:** Relazione fra più attori, passaggio fra formazioni, traiettorie misurate, ordine di distribuzione, ritorno e ricostruzione su resize mantenendo il progresso. Studiare updateMeasurements, buildTimeline, onResize e i controller in tutte le varianti js/script.js, js/script2.js, js/script3.js e js/script4.js. Scegliere la variante per la regia: l'ingresso di una sola immagine su una curva non realizza questa relazione.
- **Seme 2 `rotatingonscrollanimations-main`:** Ricavare dalle sorgenti complete attori, stati, formule, fasi, reversibilità e lifecycle; trasformare queste relazioni nei contenuti del sito prima di scrivere la meccanica.

## Dossier di orientamento

I dossier non certificano la completezza del lavoro: orientano la lettura integrale del codice. I JSON completi sono in `METHOD/DOSSIER/`.

### Componente: `codrops-sticky-grid-scroll-main`

- Indice sintattico: **indexed**; copertura semantica dichiarata **partial**.
- Sorgenti da leggere integralmente: 9.
- `src/index.html` — parsing `parsed`, 0 import, 1 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-101: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
- `src/scripts/index.js` — parsing `parsed`, 4 import, 19 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-281: eventi nessuno; movimento gsap.registerPlugin; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `constructor` righe 9-18: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `getElements` righe 24-36: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 8; condizioni 1.
  - `initContent` righe 42-58: eventi nessuno; movimento gsap.set; controlli nessuno; assegnazioni/formule 2; condizioni 4.
  - `groupItemsByColumn` righe 64-74: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 2; condizioni 0.
  - `Array.from:callback[1]` righe 68-68: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `this.items.forEach:callback[0]` righe 71-73: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `addParallaxOnScroll` righe 80-97: eventi nessuno; movimento gsap.from; controlli nessuno; assegnazioni/formule 0; condizioni 2.
  - `animateTitleOnScroll` righe 103-120: eventi nessuno; movimento gsap.from; controlli nessuno; assegnazioni/formule 0; condizioni 2.
  - `gridRevealTimeline` righe 129-157: eventi nessuno; movimento gsap.timeline; controlli nessuno; assegnazioni/formule 3; condizioni 0.
  - `columns.forEach:callback[0]` righe 137-154: eventi nessuno; movimento timeline.from; controlli nessuno; assegnazioni/formule 1; condizioni 2.
  - `gridZoomTimeline` righe 166-190: eventi nessuno; movimento gsap.timeline, timeline.to; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `yPercent` righe 182-182: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 1.
  - `toggleContent` righe 198-222: eventi nessuno; movimento gsap.timeline, gsap.timeline.to, gsap.timeline.to.to; controlli nessuno; assegnazioni/formule 0; condizioni 8.
  - `animateGridOnScroll` righe 230-251: eventi nessuno; movimento gsap.timeline, timeline.add, timeline.add.add, timeline.add.add.add; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `timeline.add.add.add:callback[0]` righe 250-250: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `initSmoothScrolling` righe 255-273: eventi scroll; movimento gsap.ticker.add, gsap.ticker.lagSmoothing; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `gsap.ticker.add:callback[0]` righe 267-269: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `preloadImages.then:callback[0]` righe 276-280: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - 41 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.
- `src/scripts/utils.js` — parsing `parsed`, 1 import, 3 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-19: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `preloadImages` righe 9-14: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `funzione@10:23` righe 10-13: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - 3 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.
- `vite.config.ts` — parsing `parsed`, 1 import, 1 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-18: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - 1 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.

File da studiare di `codrops-sticky-grid-scroll-main` (9): `README.md` (61 righe), `package-lock.json` (1111 righe), `package.json` (19 righe), `src/index.html` (101 righe), `src/scripts/index.js` (280 righe), `src/scripts/utils.js` (19 righe), `src/styles/base.css` (226 righe), `src/styles/index.css` (130 righe), `vite.config.ts` (17 righe).
Il dossier e' una mappa di navigazione. Il codice e gli eventuali testi collegati restano la fonte completa.
### Seme 1: `codrops-motion-path-transition-main-2`

- Indice sintattico: **indexed**; copertura semantica dichiarata **partial**.
- Sorgenti da leggere integralmente: 11.
- `index.html` — parsing `parsed`, 0 import, 1 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-177: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
- `index2.html` — parsing `parsed`, 0 import, 1 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-159: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
- `index3.html` — parsing `parsed`, 0 import, 1 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-219: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
- `index4.html` — parsing `parsed`, 0 import, 1 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-156: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
- `js/script.js` — parsing `parsed`, 0 import, 15 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-162: eventi DOMContentLoaded; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `preloadImages` righe 2-6: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `funzione@3:21` righe 3-5: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `constructor` righe 9-24: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 6; condizioni 0.
  - `this.thumbnails.map:callback[0]` righe 16-16: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `scale` righe 26-28: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 1.
  - `updateMeasurements` righe 30-47: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 6; condizioni 0.
  - `buildTimeline` righe 49-119: eventi nessuno; movimento gsap.timeline; controlli this.tl.kill; assegnazioni/formule 1; condizioni 1.
  - `motionPath` righe 71-91: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `onResize` righe 121-132: eventi nessuno; movimento nessuna; controlli this.tl.progress, this.tl.progress.pause; assegnazioni/formule 1; condizioni 0.
  - `addEventListeners` righe 134-150: eventi click, resize; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `this.btnOpen.addEventListener:callback[1]` righe 137-142: eventi nessuno; movimento nessuna; controlli this.tl.play; assegnazioni/formule 2; condizioni 0.
  - `this.btnClose.addEventListener:callback[1]` righe 144-149: eventi nessuno; movimento nessuna; controlli this.tl.reverse; assegnazioni/formule 2; condizioni 0.
  - `window.addEventListener:callback[1]` righe 153-161: eventi nessuno; movimento gsap.registerPlugin, gsap.set; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `zIndex` righe 155-155: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - 32 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.
- `js/script2.js` — parsing `parsed`, 0 import, 14 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-168: eventi DOMContentLoaded; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `preloadImages` righe 2-6: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `funzione@3:21` righe 3-5: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `constructor` righe 9-23: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 5; condizioni 0.
  - `scale` righe 25-27: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 1.
  - `updateMeasurements` righe 29-41: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 5; condizioni 0.
  - `buildTimeline` righe 43-116: eventi nessuno; movimento gsap.timeline; controlli this.tl.kill; assegnazioni/formule 1; condizioni 1.
  - `motionPath` righe 64-100: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 1.
  - `onResize` righe 118-130: eventi nessuno; movimento nessuna; controlli this.tl.progress, this.tl.progress.pause; assegnazioni/formule 1; condizioni 0.
  - `addEventListeners` righe 132-152: eventi click, resize; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `this.btnOpen.addEventListener:callback[1]` righe 135-142: eventi nessuno; movimento nessuna; controlli this.tl.play, this.tl.progress; assegnazioni/formule 2; condizioni 2.
  - `this.btnClose.addEventListener:callback[1]` righe 144-151: eventi nessuno; movimento nessuna; controlli this.tl.progress, this.tl.reverse; assegnazioni/formule 2; condizioni 2.
  - `window.addEventListener:callback[1]` righe 155-167: eventi nessuno; movimento gsap.registerPlugin, gsap.set; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `zIndex` righe 157-157: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - 33 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.
- `js/script3.js` — parsing `parsed`, 0 import, 14 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-157: eventi DOMContentLoaded; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `preloadImages` righe 2-6: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `funzione@3:21` righe 3-5: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `constructor` righe 9-24: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 6; condizioni 0.
  - `this.thumbnails.map:callback[0]` righe 16-16: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `updateMeasurements` righe 26-43: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 6; condizioni 0.
  - `buildTimeline` righe 45-109: eventi nessuno; movimento gsap.timeline; controlli this.tl.kill; assegnazioni/formule 1; condizioni 1.
  - `motionPath` righe 66-82: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `onResize` righe 111-123: eventi nessuno; movimento nessuna; controlli this.tl.progress, this.tl.progress.pause; assegnazioni/formule 1; condizioni 0.
  - `addEventListeners` righe 125-141: eventi click, resize; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `this.btnOpen.addEventListener:callback[1]` righe 128-133: eventi nessuno; movimento nessuna; controlli this.tl.play; assegnazioni/formule 2; condizioni 0.
  - `this.btnClose.addEventListener:callback[1]` righe 135-140: eventi nessuno; movimento nessuna; controlli this.tl.reverse; assegnazioni/formule 2; condizioni 0.
  - `window.addEventListener:callback[1]` righe 144-156: eventi nessuno; movimento gsap.registerPlugin, gsap.set; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `zIndex` righe 146-146: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - 33 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.
- `js/script4.js` — parsing `parsed`, 0 import, 13 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-146: eventi DOMContentLoaded; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `preloadImages` righe 2-10: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `funzione@3:21` righe 3-9: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `constructor` righe 13-28: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 5; condizioni 0.
  - `scale` righe 30-32: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 1.
  - `updateMeasurements` righe 34-43: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 5; condizioni 0.
  - `buildTimeline` righe 45-102: eventi nessuno; movimento gsap.timeline; controlli this.tl.kill; assegnazioni/formule 1; condizioni 1.
  - `motionPath` righe 60-96: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 2; condizioni 2.
  - `onResize` righe 104-116: eventi nessuno; movimento nessuna; controlli this.tl.progress, this.tl.progress.pause; assegnazioni/formule 1; condizioni 0.
  - `addEventListeners` righe 118-134: eventi click, resize; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `this.leftBtn.addEventListener:callback[1]` righe 121-126: eventi nessuno; movimento nessuna; controlli this.tl.play; assegnazioni/formule 0; condizioni 0.
  - `this.bottomBtn.addEventListener:callback[1]` righe 128-133: eventi nessuno; movimento nessuna; controlli this.tl.reverse; assegnazioni/formule 0; condizioni 0.
  - `window.addEventListener:callback[1]` righe 137-145: eventi nessuno; movimento gsap.registerPlugin; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - 30 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.

File da studiare di `codrops-motion-path-transition-main-2` (11): `README.md` (27 righe), `css/base.css` (272 righe), `css/style.css` (182 righe), `index.html` (177 righe), `index2.html` (159 righe), `index3.html` (219 righe), `index4.html` (156 righe), `js/script.js` (161 righe), `js/script2.js` (167 righe), `js/script3.js` (156 righe), `js/script4.js` (145 righe).
Il dossier e' una mappa di navigazione. Il codice e gli eventuali testi collegati restano la fonte completa.
### Seme 2: `rotatingonscrollanimations-main`

- Indice sintattico: **indexed**; copertura semantica dichiarata **partial**.
- Sorgenti da leggere integralmente: 13.
- `index.html` — parsing `parsed`, 0 import, 1 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-88: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
- `index2.html` — parsing `parsed`, 0 import, 1 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-85: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
- `index3.html` — parsing `parsed`, 0 import, 1 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-85: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
- `index4.html` — parsing `parsed`, 0 import, 1 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-88: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
- `index5.html` — parsing `parsed`, 0 import, 1 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-85: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
- `js/index.js` — parsing `parsed`, 0 import, 17 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-162: eventi DOMContentLoaded; movimento gsap.registerPlugin; controlli nessuno; assegnazioni/formule 5; condizioni 0.
  - `preloadImages` righe 8-12: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `funzione@9:21` righe 9-11: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `initSmoothScrolling` righe 18-28: eventi scroll; movimento gsap.ticker.add, gsap.ticker.lagSmoothing; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `gsap.ticker.add:callback[0]` righe 23-25: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `createGalleryWrappers` righe 34-46: eventi nessuno; movimento gsap.utils.toArray, items.forEach; controlli nessuno; assegnazioni/formule 2; condizioni 0.
  - `items.forEach:callback[0]` righe 37-43: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `positionGalleryItems` righe 52-65: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `wraps.forEach:callback[0]` righe 56-64: eventi nessuno; movimento gsap.set; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `initGalleryAnimation` righe 71-106: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `items.forEach:callback[0]` righe 72-105: eventi nessuno; movimento gsap.fromTo, gsap.quickSetter, gsap.utils.random; controlli nessuno; assegnazioni/formule 4; condizioni 0.
  - `onUpdate` righe 97-101: eventi nessuno; movimento setZ; controlli nessuno; assegnazioni/formule 2; condizioni 0.
  - `animateMarquee` righe 111-131: eventi nessuno; movimento gsap.timeline, gsap.timeline.fromTo; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `initEvents` righe 137-142: eventi resize; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `window.addEventListener:callback[1]` righe 138-141: eventi nessuno; movimento ScrollTrigger.refresh; controlli ScrollTrigger.refresh; assegnazioni/formule 0; condizioni 0.
  - `init` righe 148-155: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `document.addEventListener:callback[1]` righe 157-161: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - 35 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.
- `js/index2.js` — parsing `parsed`, 0 import, 17 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-157: eventi DOMContentLoaded; movimento gsap.registerPlugin; controlli nessuno; assegnazioni/formule 5; condizioni 0.
  - `preloadImages` righe 8-12: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `funzione@9:21` righe 9-11: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `initSmoothScrolling` righe 18-28: eventi scroll; movimento gsap.ticker.add, gsap.ticker.lagSmoothing; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `gsap.ticker.add:callback[0]` righe 23-25: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `createGalleryWrappers` righe 34-46: eventi nessuno; movimento gsap.utils.toArray, items.forEach; controlli nessuno; assegnazioni/formule 2; condizioni 0.
  - `items.forEach:callback[0]` righe 37-43: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `positionGalleryItems` righe 52-62: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `wraps.forEach:callback[0]` righe 55-61: eventi nessuno; movimento gsap.set; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `initGalleryAnimation` righe 68-101: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `items.forEach:callback[0]` righe 69-100: eventi nessuno; movimento gsap.fromTo, gsap.quickSetter, gsap.utils.random; controlli nessuno; assegnazioni/formule 4; condizioni 0.
  - `onUpdate` righe 93-96: eventi nessuno; movimento setZ; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `animateMarquee` righe 106-126: eventi nessuno; movimento gsap.timeline, gsap.timeline.fromTo; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `initEvents` righe 132-137: eventi resize; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `window.addEventListener:callback[1]` righe 133-136: eventi nessuno; movimento ScrollTrigger.refresh; controlli ScrollTrigger.refresh; assegnazioni/formule 0; condizioni 0.
  - `init` righe 143-150: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `document.addEventListener:callback[1]` righe 152-156: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - 36 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.
- `js/index3.js` — parsing `parsed`, 0 import, 15 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-140: eventi DOMContentLoaded; movimento gsap.registerPlugin; controlli nessuno; assegnazioni/formule 5; condizioni 0.
  - `preloadImages` righe 8-12: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `funzione@9:21` righe 9-11: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `initSmoothScrolling` righe 18-28: eventi scroll; movimento gsap.ticker.add, gsap.ticker.lagSmoothing; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `gsap.ticker.add:callback[0]` righe 23-25: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `createGalleryWrappers` righe 34-46: eventi nessuno; movimento gsap.utils.toArray, items.forEach; controlli nessuno; assegnazioni/formule 2; condizioni 0.
  - `items.forEach:callback[0]` righe 37-43: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `initGalleryAnimation` righe 52-86: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `items.forEach:callback[0]` righe 53-85: eventi nessuno; movimento ScrollTrigger.create, gsap.quickSetter; controlli nessuno; assegnazioni/formule 2; condizioni 0.
  - `onUpdate` righe 64-83: eventi nessuno; movimento setFilter, setTransform; controlli nessuno; assegnazioni/formule 6; condizioni 0.
  - `animateMarquee` righe 91-111: eventi nessuno; movimento gsap.timeline, gsap.timeline.fromTo; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `initEvents` righe 117-121: eventi resize; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `window.addEventListener:callback[1]` righe 118-120: eventi nessuno; movimento ScrollTrigger.refresh; controlli ScrollTrigger.refresh; assegnazioni/formule 0; condizioni 0.
  - `init` righe 127-133: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `document.addEventListener:callback[1]` righe 135-139: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - 43 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.
- `js/index4.js` — parsing `parsed`, 0 import, 20 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-163: eventi DOMContentLoaded; movimento gsap.registerPlugin; controlli nessuno; assegnazioni/formule 8; condizioni 0.
  - `preloadImages` righe 12-16: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `funzione@13:21` righe 13-15: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `initSmoothScrolling` righe 22-42: eventi scroll; movimento gsap.ticker.add, gsap.ticker.lagSmoothing; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `lenis.on:callback[1]` righe 25-28: eventi nessuno; movimento ScrollTrigger.update; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `gsap.ticker.add:callback[0]` righe 30-39: eventi nessuno; movimento gsap.utils.interpolate; controlli nessuno; assegnazioni/formule 5; condizioni 0.
  - `filterSetters.forEach:callback[0]` righe 38-38: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `createGalleryWrappers` righe 48-61: eventi nessuno; movimento gsap.utils.toArray, items.forEach, items.map; controlli nessuno; assegnazioni/formule 3; condizioni 0.
  - `items.forEach:callback[0]` righe 51-57: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `items.map:callback[0]` righe 60-60: eventi nessuno; movimento gsap.quickSetter; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `positionGalleryItems` righe 67-75: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `wraps.forEach:callback[0]` righe 70-74: eventi nessuno; movimento gsap.set; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `initGalleryAnimation` righe 81-107: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `items.forEach:callback[0]` righe 82-106: eventi nessuno; movimento ScrollTrigger.create, gsap.quickSetter, gsap.utils.random; controlli nessuno; assegnazioni/formule 4; condizioni 0.
  - `onUpdate` righe 94-104: eventi nessuno; movimento gsap.utils.interpolate, setTransform; controlli nessuno; assegnazioni/formule 2; condizioni 0.
  - `animateMarquee` righe 112-132: eventi nessuno; movimento gsap.timeline, gsap.timeline.fromTo; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `initEvents` righe 138-143: eventi resize; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `window.addEventListener:callback[1]` righe 139-142: eventi nessuno; movimento ScrollTrigger.refresh; controlli ScrollTrigger.refresh; assegnazioni/formule 0; condizioni 0.
  - `init` righe 149-156: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `document.addEventListener:callback[1]` righe 158-162: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - 46 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.
- `js/index5.js` — parsing `parsed`, 0 import, 18 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-180: eventi DOMContentLoaded; movimento gsap.registerPlugin; controlli nessuno; assegnazioni/formule 5; condizioni 0.
  - `preloadImages` righe 8-12: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `funzione@9:21` righe 9-11: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `initSmoothScrolling` righe 18-28: eventi scroll; movimento gsap.ticker.add, gsap.ticker.lagSmoothing; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `gsap.ticker.add:callback[0]` righe 23-25: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `createGalleryWrappers` righe 34-46: eventi nessuno; movimento gsap.utils.toArray, items.forEach; controlli nessuno; assegnazioni/formule 2; condizioni 0.
  - `items.forEach:callback[0]` righe 37-43: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `positionGalleryItems` righe 52-62: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `wraps.forEach:callback[0]` righe 55-61: eventi nessuno; movimento gsap.set; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `holdAtMiddle` righe 68-80: eventi nessuno; movimento gsap.utils.mapRange; controlli nessuno; assegnazioni/formule 1; condizioni 2.
  - `initGalleryAnimation` righe 86-124: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `items.forEach:callback[0]` righe 87-123: eventi nessuno; movimento ScrollTrigger.create, gsap.quickSetter, gsap.utils.random; controlli nessuno; assegnazioni/formule 4; condizioni 0.
  - `onUpdate` righe 101-121: eventi nessuno; movimento gsap.utils.interpolate, setFilter, setTransform; controlli nessuno; assegnazioni/formule 8; condizioni 0.
  - `animateMarquee` righe 133-153: eventi nessuno; movimento gsap.timeline, gsap.timeline.fromTo; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `initEvents` righe 155-160: eventi resize; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `window.addEventListener:callback[1]` righe 156-159: eventi nessuno; movimento ScrollTrigger.refresh; controlli ScrollTrigger.refresh; assegnazioni/formule 0; condizioni 0.
  - `init` righe 166-173: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `document.addEventListener:callback[1]` righe 175-179: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - 47 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.
- `js/lenis.min.js` — parsing `parsed`, 0 import, 88 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-773: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `callback:callback[-1]` righe 1-771: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 10; condizioni 0.
  - `t` righe 3-5: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `n` righe 6-8: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `r` righe 9-11: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `i` righe 12-14: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `advance` righe 25-40: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 11; condizioni 7.
  - `stop` righe 41-43: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `fromTo` righe 44-54: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 9; condizioni 0.
  - `o` righe 56-64: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `funzione@58:11` righe 58-63: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `setTimeout:callback[0]` righe 60-62: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `constructor` righe 73-85: eventi `resize`; movimento nessuna; controlli nessuno; assegnazioni/formule 5; condizioni 2.
  - `destroy` righe 86-92: eventi `resize`; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 2.
  - `resize` righe 93-95: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `onWrapperResize` righe 96-100: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 4; condizioni 1.
  - `onContentResize` righe 101-107: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 4; condizioni 1.
  - `limit` righe 108-110: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `emit` righe 114-117: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 4; condizioni 2.
  - `on` righe 118-125: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 1.
  - `funzione@121:10` righe 121-123: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `this.events[e].filter:callback[0]` righe 122-122: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `off` righe 126-128: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `this.events[e].filter:callback[0]` righe 127-127: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `destroy` righe 129-131: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `u` righe 134-136: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 2.
  - `constructor` righe 142-151: eventi `resize`, `touchend`, `touchmove`, `touchstart`, `wheel`; movimento nessuna; controlli nessuno; assegnazioni/formule 2; condizioni 0.
  - `on` righe 152-154: eventi e; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `destroy` righe 155-162: eventi `resize`, `touchend`, `touchmove`, `touchstart`, `wheel`; movimento nessuna; controlli this.emitter.destroy; assegnazioni/formule 0; condizioni 0.
  - `onTouchStart` righe 163-169: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 4; condizioni 1.
  - `onTouchMove` righe 170-178: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 6; condizioni 1.
  - `onTouchEnd` righe 179-181: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `onWheel` righe 182-191: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 7; condizioni 0.
  - `onWindowResize` righe 192-194: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `f` righe 196-196: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `constructor` righe 217-295: eventi `click`, `pointerdown`, `scroll`, `scrollend`, `transitionend`; movimento requestAnimationFrame; controlli nessuno; assegnazioni/formule 14; condizioni 14.
  - `destroy` righe 296-307: eventi `click`, `pointerdown`, `scroll`, `scrollend`; movimento nessuna; controlli this.dimensions.destroy, this.emitter.destroy, this.virtualScroll.destroy; assegnazioni/formule 0; condizioni 3.
  - `on` righe 308-310: eventi e; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `off` righe 311-313: eventi e; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `onScrollEnd` righe 314-317: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 3.
  - `dispatchScrollendEvent` righe 318-325: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `overflow` righe 326-329: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 1.
  - `checkOverflow` righe 330-332: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 1.
  - `onTransitionEnd` righe 333-335: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 2.
  - `setScroll` righe 336-340: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 1.
  - `onClick` righe 341-366: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 5; condizioni 6.
  - `e.composedPath.filter:callback[0]` righe 344-344: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 1.
  - `e.composedPath.filter.map:callback[0]` righe 345-345: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `t.find:callback[0]` righe 348-348: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 2.
  - `t.some:callback[0]` righe 361-361: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 1.
  - `onPointerDown` righe 367-369: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 1.
  - `onVirtualScroll` righe 370-450: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 19; condizioni 45.
  - `c.find:callback[0]` righe 404-412: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 13.
  - `resize` righe 451-455: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 2; condizioni 0.
  - `emit` righe 456-458: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `onNativeScroll` righe 459-484: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 10; condizioni 6.
  - `setTimeout:callback[0]` righe 477-482: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 3; condizioni 0.
  - `reset` righe 485-491: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 6; condizioni 0.
  - `start` righe 492-500: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 2.
  - `internalStart` righe 501-503: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 1.
  - `stop` righe 504-512: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 2.
  - `internalStop` righe 513-515: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 1.
  - `raf` righe 516-521: eventi nessuno; movimento requestAnimationFrame; controlli nessuno; assegnazioni/formule 3; condizioni 2.
  - `scrollTo` righe 522-629: eventi nessuno; movimento requestAnimationFrame; controlli nessuno; assegnazioni/formule 30; condizioni 36.
  - `requestAnimationFrame:callback[0]` righe 592-594: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `onStart` righe 605-607: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 2; condizioni 1.
  - `onUpdate` righe 608-626: eventi nessuno; movimento requestAnimationFrame; controlli nessuno; assegnazioni/formule 7; condizioni 3.
  - `requestAnimationFrame:callback[0]` righe 622-624: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `preventNextNativeScrollEvent` righe 630-635: eventi nessuno; movimento requestAnimationFrame; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `requestAnimationFrame:callback[0]` righe 632-634: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
  - `hasNestedScroll` righe 636-703: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 49; condizioni 17.
  - `rootElement` righe 704-706: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 1.
  - `limit` righe 707-713: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 3.
  - `isHorizontal` righe 714-716: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `actualScroll` righe 717-720: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 3.
  - `scroll` righe 721-723: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 1.
  - `progress` righe 724-726: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 1.
  - `isScrolling` righe 727-729: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `isScrolling` righe 730-732: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 1.
  - `isStopped` righe 733-735: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `isStopped` righe 736-738: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 1.
  - `isLocked` righe 739-741: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `isLocked` righe 742-744: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 1.
  - `isSmooth` righe 745-747: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `className` righe 748-758: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 6; condizioni 5.
  - `updateClassName` righe 759-764: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `this.className.split.forEach:callback[0]` righe 761-763: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `cleanUpClassName` righe 765-768: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 2.
  - 151 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.

File da studiare di `rotatingonscrollanimations-main` (13): `README.md` (25 righe), `css/base.css` (352 righe), `index.html` (88 righe), `index2.html` (85 righe), `index3.html` (85 righe), `index4.html` (88 righe), `index5.html` (85 righe), `js/index.js` (161 righe), `js/index2.js` (156 righe), `js/index3.js` (139 righe), `js/index4.js` (162 righe), `js/index5.js` (179 righe), `js/lenis.min.js` (772 righe).
Il dossier e' una mappa di navigazione. Il codice e gli eventuali testi collegati restano la fonte completa.

## Plugin richiesti dalle sorgenti

`motionPath`. Ogni scena usa `SiteScenes.mountRequired`; dichiara soltanto le dipendenze che usa davvero.

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
