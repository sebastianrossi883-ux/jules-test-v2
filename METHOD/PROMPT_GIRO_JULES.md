# START HERE — Metodo 21

Realizza il sito nella stessa esecuzione. Non fermarti a REGIA.md e non consegnare lo stato preparato.

Ordine obbligatorio: studio delle sorgenti selezionate → regia globale → scenografia HTML/CSS e renderer → funzioni reali delle meccaniche → setup di tutte le scene → passaggi → firma → compilazione finale.

Leggi `METHOD/MISSIONE_JULES.md` prima di modificare il sito. Leggi poi `METHOD/SKILL_ROUTING_GIRO.md`; apri i pacchetti skill completi soltanto nella fase assegnata. Il codice delle demo prevale sui tutorial; il sito fornito prevale sull'impaginazione delle demo.

I file elencati sotto sono presenti integralmente nella repository. SHA-256 e dimensioni identificano ciò che hai ricevuto; non sostituire la lettura con il dossier. Gli esempi storici non fanno parte delle istruzioni operative.

## Incarico concreto del giro

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

## Inventario verificabile delle fonti

| Percorso | Ruolo | Righe | Byte | SHA-256 |
|---|---:|---:|---:|---|
| `MOTORE/MOTION.md` | api | 125 | 16213 | `6e7f645ee6058b81eaf91a468559abd60bc7d0f702185453c1e6d27494adbf8f` |
| `MOTORE/scena-supporto.js` | api-geometria | 230 | 9490 | `7e4ddff52dfd4ec69a1b939d41684fa84d107e6fa5ff5afb16ca684226aa7988` |
| `METHOD/DOSSIER/codrops-motion-path-transition-main-2.json` | dossier-orientamento | 15068 | 489842 | `4a596c89e906d7cc8336a4801d1841da844bc6ca54c7087ef17f00469bf0c013` |
| `METHOD/DOSSIER/codrops-sticky-grid-scroll-main.json` | dossier-orientamento | 6019 | 205785 | `734e91aa86d60cf2a8ac2d55c9a87da83e3e5a86df5761439cacfb474421f62c` |
| `METHOD/DOSSIER/rotatingonscrollanimations-main.json` | dossier-orientamento | 48623 | 1882801 | `df00cf69804860f52300c7a23d4ad1e57a90496c1de5a26634b709064f31037a` |
| `SITE_SIGNATURE.json` | firma | 19 | 457 | `9c21d067110c002a7a0f0681e50cb35e0b8d28b216cb75b6c501bc0bbd313948` |
| `METHOD/INCARICO_GIRO.md` | incarico | 424 | 59031 | `da0e1e728ea2cc3b7f105c84d1ecf77c59e3a8771846a8e2f64c8ba439415bde` |
| `MOTION_COMPONENTE/SAPERE/00_INDEX.md` | indice-skill | 8 | 618 | `a65083bcc0711df5ad1daba6506ce7d66283025916f7e609c20a19c4d0c3c18c` |
| `METHOD/SITO_ATTORI.json` | integrazione | 272 | 8084 | `d310753bf4302ae4d48eb1fccba01bab8b209c784ad85cce95b3ba8844183c79` |
| `assets/js/regia-sito.js` | integrazione | 49 | 2249 | `4e34b7ee17c667b65fb7dac9cfab4e2050425a4fb70c962265b80d1960d211a9` |
| `MOTION_COMPONENTE/ARCHIVIO/materials.manifest.json` | manifest-materiali | 187 | 6599 | `5fc65ce6a51a6638922a1dabe8b99238e767bfa8b5c6851d01bf7826c9d2a021` |
| `MOTION_COMPONENTE/SAPERE/PRECEDENZE_E_AMBITI.md` | mappa-skill | 65 | 8156 | `5fa53765f074a65d765190a7b24591259ef85ef5a5ce23ecb72ad659900633f5` |
| `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/README.md` | materiale | 27 | 1053 | `6456a6985789b3b75494bdb0c3e120284f661344aba40e949fc5f3cbe7337dde` |
| `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/css/base.css` | materiale | 272 | 4629 | `9d3b27116224b8b23434a528f685b18b75ef2341e71e810a95b0dec9db20f407` |
| `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/css/style.css` | materiale | 182 | 3813 | `b5d2d58784f157259b486391d0353380c02b47f63d70bde4a177f75584c53aeb` |
| `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/index.html` | materiale | 177 | 5572 | `024b899078910ac421e153b5af3664224e1cc47d7a0bc93392c55a336c8e4c00` |
| `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/index2.html` | materiale | 159 | 4734 | `f635434bfc82cbb136d15d50846200e85bf1146d46b583a474f3f82cbedc6a98` |
| `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/index3.html` | materiale | 219 | 7124 | `ea26b4b55259a2c9377ec6790e0f99df001c15d66eb4b9f9d45c5de1ecd3c285` |
| `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/index4.html` | materiale | 156 | 5019 | `49d03d5792d67c28ca3d349b477a5e4b54447ff570f8e702a78d0ad18428c088` |
| `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/js/script.js` | materiale | 161 | 3897 | `2d775463ba0b39c31436ea948c90ef635e18223420e49aea1864c0879708c4a6` |
| `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/js/script2.js` | materiale | 167 | 3941 | `cf462d67fc6317d476a098cffbb70911d00b62c7e2f8168162c78e388dad5752` |
| `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/js/script3.js` | materiale | 156 | 3599 | `608bc9ab49731d725cbd14a70baef8e87a8f513d76a8a0af13b312dbec3f7102` |
| `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/js/script4.js` | materiale | 145 | 3381 | `9b188e631a4940a4c1ddbcb5a689863269ca0298149d6a30e6b27afb532b9824` |
| `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/README.md` | materiale | 61 | 1283 | `c20f3238768033c993488ce81fdb77e35b99b5567b982d929dc182a586873017` |
| `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/package-lock.json` | materiale | 1111 | 41541 | `b9a3b92fbb443a77ff07be3de540cc50b1cefe10c339640097cb16f65d383fab` |
| `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/package.json` | materiale | 19 | 388 | `38ca16fcd2dbe134bf2a564cdfd0d0f72dea554ae51caef2e18085163fd2518e` |
| `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/src/index.html` | materiale | 101 | 4472 | `e6509e22a89c73aabdd9d8e4c54c0605816d8b86c63fabd44f95bd771c35aa8b` |
| `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/src/scripts/index.js` | materiale | 280 | 10129 | `906d632264e17ca4acddda24015f553f33f7f6675f551f84ebcd9ce32dfc5f96` |
| `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/src/scripts/utils.js` | materiale | 19 | 628 | `eda836456af1d9123bc214f122045d28b54725d8c1b92ddbafa0c4fd97668a21` |
| `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/src/styles/base.css` | materiale | 226 | 3714 | `c5b288d3f71972b7f0973d7e9293fc8c5cc8a4249f3a67988b226dd580584adf` |
| `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/src/styles/index.css` | materiale | 130 | 2240 | `0a9334310d6d6f2314357ed61fe95bc2665a048cda4bd5d2e0d8d7651097a42b` |
| `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/vite.config.ts` | materiale | 17 | 482 | `1124c5112342326461e9c97ea2aba56d04a2849a893110803d8738e3eaa2a328` |
| `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/README.md` | materiale | 25 | 839 | `e10152583bfa3a3a3941b6550dbb6b35ec8740f5a9a2e7e03346cebd694725e7` |
| `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/css/base.css` | materiale | 352 | 6404 | `b2ecd738afcc168637a81099f614278be62c84e737884192a2f129c529b962df` |
| `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/index.html` | materiale | 88 | 4850 | `65c73405f1891fcd2e2db68ac98f0dc9c1eb84d77307a6108a0c176b86967a31` |
| `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/index2.html` | materiale | 85 | 4612 | `e2f8a119da6c8f75478de472a01d3252b42c5247813d195b0b625b3e6e9d58f2` |
| `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/index3.html` | materiale | 85 | 4627 | `28501a905332708d04b2173626a7fd9a9ee53ee59246c013d190d890c88be115` |
| `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/index4.html` | materiale | 88 | 4638 | `8c358e8337ffa6ea5befd369a44d6fbb1fbc252084f97eea517afa7e18a8bc98` |
| `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/index5.html` | materiale | 85 | 4614 | `59830febaf5bd7cd7d76ed11fe8cdc56d4de3ec0c59636a1c1ceae2dd6e9d579` |
| `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/js/index.js` | materiale | 161 | 3715 | `5fa25c313892bff596638fc6f6124773219431d0e78a278c39c366ddde3d9bb9` |
| `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/js/index2.js` | materiale | 156 | 3501 | `82890da8047e1dbe3bdb55bbab6f04c71c46ace58201aca7ad7a0b5aeecd259b` |
| `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/js/index3.js` | materiale | 139 | 3326 | `0f15d19f3a4e99c4ed504a9e97cb9541c5433b5960195ee39751d8906a7d13fc` |
| `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/js/index4.js` | materiale | 162 | 3994 | `a0ac33b879cbd742d719023558758dfa1ad45ff8dcd99ee2f626dc176b44b689` |
| `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/js/index5.js` | materiale | 179 | 4212 | `1aa0ab6e46c25f04e27a6b295517a7bdc624407d7492ec1afbb0fdba549f5eb2` |
| `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/js/lenis.min.js` | materiale | 772 | 26651 | `502144c36ab16005c74288aae9c37f3494d03a80084528e51e8e60dac49fb518` |
| `METHOD/MISSIONE_JULES.md` | missione | 181 | 38192 | `78e01ec3aac687ca7c3e0361398deeaaaa7117b741c6266f37c327b69a623d72` |
| `METHOD/SKILL_ROUTING_GIRO.md` | routing-skill | 15 | 1357 | `da16b6d25f4aaf1d3e5f86e6b6f7dfa48c099b97763e73400106f4c43e079d0e` |
| `AGENTS.md` | sito | 10 | 1350 | `dc2a3fba22a79b870d8d41ee812e8b69193c3a38d56dc317a165e30e4d0e26d7` |
| `FONTI_SITO_ORIGINALI/index.html` | sito | 40 | 2444 | `9b2a4bf8bf029c8e22bf97ac047c4682a01661c658762aec524fb3a4b25a9bc0` |
| `MOTORE/vendor/lenis.css` | sito | 26 | 513 | `2f668ae84a668327f246faf8a770383a2bf69196d214290fbc4d5548910606c5` |
| `assets/js/meccaniche/01-codrops-sticky-grid-scroll-main.js` | sito | 6 | 517 | `17f8050ee83170f83d179247eeaa38f713463cff27ce673c060db514f1a4f5f8` |
| `assets/js/meccaniche/02-codrops-motion-path-transition-main-2.js` | sito | 6 | 533 | `5643849046ada7805e6b523af38befde744a66c81083505aa3c79f256fca04f5` |
| `assets/js/meccaniche/03-rotatingonscrollanimations-main.js` | sito | 6 | 509 | `6cf6dbd25c900821373cc40250fd9285697a60ed622f13db1e2b85249ff23543` |
| `assets/js/scene/scena-001.js` | sito | 24 | 1041 | `e3f5cbf6599c1f8f6f12d9188b5456ae24ad53b06424bb29675890134e98ed12` |
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
| `BUILD/DIPENDENZE.json` | tecnica | 352 | 8618 | `69c93e553e2ed5e3764d49c82098a81698d144bb4bef9d9e6577414162bf450f` |
| `BUILD/README.md` | tecnica | 11 | 2753 | `55970dffefcb5a6dd531153b211ed2176fed7054a565f77926bc5ce4b7eec053` |
| `BUILD/build_output.mjs` | tecnica | 81 | 4395 | `897f0ae668afc1779d8ce27f53907bdf31037536eec8dfc6c0e17f2f26f62b30` |
| `BUILD/compila.mjs` | tecnica | 151 | 10629 | `f6d32903b114ed3c569421b3f2a80f553854d617363ef96d852a9bfadb90c2e9` |
| `BUILD/config.json` | tecnica | 35 | 1210 | `4aeec0445c6aa657ae716b3ada67295c40fd636d6fa4464549175dcbeab0c5d7` |
| `BUILD/verifica_contratto_finale.mjs` | tecnica | 158 | 8086 | `0a3ec65ff3b7da1e6ba44d0c4a75e5c1dcaeb0999ad877640169fa80ec61dcf4` |
| `MOTION_COMPONENTE/REFERENZE/codrops-motion-path-transition-main-2/articolo-completo.md` | tutorial | 135 | 6393 | `447e5ab86bdb92139cca4828c8a60d56f899ff991138deea875348f8b48e2c52` |
| `MOTION_COMPONENTE/REFERENZE/codrops-motion-path-transition-main-2/originale-ac8c549039854f62.txt` | tutorial | 226 | 7302 | `ac8c549039854f620f2d6d2ae085de44d27940db3f37361b93a9dadc56ff8300` |
| `MOTION_COMPONENTE/REFERENZE/codrops-sticky-grid-scroll-main/articolo-completo.md` | tutorial | 527 | 22561 | `f63024e2cf007a03ec0193a16b06aa0e44bcc145c8fcbf14f3882c66762680cd` |
| `MOTION_COMPONENTE/REFERENZE/codrops-sticky-grid-scroll-main/originale-69eb2cea87adb275.txt` | tutorial | 618 | 23550 | `69eb2cea87adb2753c347fc01972604aa23552231966c40972ffa226b76b6781` |
| `MOTION_COMPONENTE/REFERENZE/rotatingonscrollanimations-main/articolo-completo.md` | tutorial | 33 | 2611 | `008e1b5f44ef1d17614cddc48095e5439f095c3a62c730a4c2850c736c26bba1` |
| `MOTION_COMPONENTE/REFERENZE/rotatingonscrollanimations-main/originale-32659649b6cf04d4.txt` | tutorial | 33 | 2321 | `32659649b6cf04d433406a08a71eaf6285ee325c3302cf6b6a496a4ec3b50e53` |

## Conclusione eseguibile

Completa i moduli `pending`, usa davvero le funzioni dei materiali e la scenografia dentro i moduli scena, quindi esegui una sola volta `node BUILD/compila.mjs`. Il comando controlla il cablaggio tecnico, non la qualità artistica. Consegna sito, `REGIA.md` e `SITE_SIGNATURE.json`; niente approvazioni intermedie, punteggi o rapporti di conformità.
