# Incarico del giro

## Sito fornito

Le scene strutturali di `index.html`, nell'ordine:

1. `<header>` — «Podere Bricco Sereno — Serralunga d'Alba» — 1 media, 1 titoli, 0 testi, 7 controlli; root `[data-m21-root="scene-001"]`
2. `<section id="section-1">` — «Bricco» — 2 media, 2 titoli, 1 testi, 0 controlli; root `[data-m21-root="scene-002"]`
3. `<section id="section-2">` — «L'ospitalità firmata Bricco Sereno. Il podere nel cuore delle Langhe unisce tradizione agricola, silenzi e profonda quie» — 1 media, 2 titoli, 4 testi, 2 controlli; root `[data-m21-root="scene-003"]`
4. `<section id="section-3">` — «la cantina» — 1 media, 1 titoli, 2 testi, 0 controlli; root `[data-m21-root="scene-004"]`
5. `<section id="section-4">` — «I Vigneti di Serralunga» — 1 media, 1 titoli, 1 testi, 0 controlli; root `[data-m21-root="scene-005"]`
6. `<section id="section-5">` — «La Tradizione e il Tempo» — 2 media, 1 titoli, 1 testi, 0 controlli; root `[data-m21-root="scene-006"]`
7. `<section id="section-6">` — «esperienze e memorie» — 0 media, 1 titoli, 1 testi, 1 controlli; root `[data-m21-root="scene-007"]`
8. `<footer>` — «Contatti» — 0 media, 3 titoli, 4 testi, 4 controlli; root `[data-m21-root="scene-008"]`

Questo inventario descrive il DOM iniziale: i conteggi non sono limiti agli attori o alla composizione,
né quantità da raggiungere. Per la ricomposizione applica «Cosa deve rimanere del sito» della missione.

## Brief

Podere Bricco Sereno: ospitalità e vino nelle Langhe; movimento lento e materico, come la vendemmia.

## Tre materiali Vanilla

- **Componente: `codrops-sticky-grid-scroll-main`** — sorgente completa `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/`; testi collegati: `MOTION_COMPONENTE/REFERENZE/codrops-sticky-grid-scroll-main/originale-69eb2cea87adb275.txt`, `MOTION_COMPONENTE/REFERENZE/codrops-sticky-grid-scroll-main/articolo-completo.md`.
- **Seme 1: `codrops-mwg`** — sorgente completa `MOTION_COMPONENTE/ARCHIVIO/codrops-mwg/`; testi collegati: `MOTION_COMPONENTE/REFERENZE/codrops-mwg/originale-c62d1ac428e28d7e.txt`, `MOTION_COMPONENTE/REFERENZE/codrops-mwg/articolo-completo.md`.
- **Seme 2: `codrops-motion-path-transition-main-2`** — sorgente completa `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/`; testi collegati: `MOTION_COMPONENTE/REFERENZE/codrops-motion-path-transition-main-2/originale-ac8c549039854f62.txt`, `MOTION_COMPONENTE/REFERENZE/codrops-motion-path-transition-main-2/articolo-completo.md`.

## Piano del giro

Sequenza operativa della missione, compilata con i materiali e le sezioni di questo giro. Il piano iniziale conserva questi lavori e può dettagliarli; non sostituisce lo studio con la redazione di REGIA.md, né tutte le scene con tre effetti locali. La descrizione di un lavoro non completa la sua implementazione.

1. **Studio componente `codrops-sticky-grid-scroll-main`.** Leggi per primo il testo collegato `MOTION_COMPONENTE/REFERENZE/codrops-sticky-grid-scroll-main/originale-69eb2cea87adb275.txt` (618 righe), `MOTION_COMPONENTE/REFERENZE/codrops-sticky-grid-scroll-main/articolo-completo.md` (525 righe): è la guida, non lo studio. Poi leggi per intero, uno per uno, questi 9 file: `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/README.md` (61 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/package-lock.json` (1111 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/package.json` (19 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/src/index.html` (98 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/src/scripts/index.js` (280 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/src/scripts/utils.js` (19 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/src/styles/base.css` (226 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/src/styles/index.css` (130 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/vite.config.ts` (17 righe). Pagine della demo: `src/index.html`. Scrivi in `REGIA.md` la sezione «Studio — codrops-sticky-grid-scroll-main» con gli 8 punti di «Studio integrale delle demo», ognuno con il file e le righe da cui viene.
2. **Studio seme 1 `codrops-mwg`.** Leggi per primo il testo collegato `MOTION_COMPONENTE/REFERENZE/codrops-mwg/originale-c62d1ac428e28d7e.txt` (245 righe), `MOTION_COMPONENTE/REFERENZE/codrops-mwg/articolo-completo.md` (155 righe): è la guida, non lo studio. Poi leggi per intero, uno per uno, questi 3 file: `MOTION_COMPONENTE/ARCHIVIO/codrops-mwg/assets/script.js` (139 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-mwg/assets/style.css` (77 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-mwg/index.html` (36 righe). Pagine della demo: `index.html`. Scrivi in `REGIA.md` la sezione «Studio — codrops-mwg» con gli 8 punti di «Studio integrale delle demo», ognuno con il file e le righe da cui viene.
3. **Studio seme 2 `codrops-motion-path-transition-main-2`.** Leggi per primo il testo collegato `MOTION_COMPONENTE/REFERENZE/codrops-motion-path-transition-main-2/originale-ac8c549039854f62.txt` (226 righe), `MOTION_COMPONENTE/REFERENZE/codrops-motion-path-transition-main-2/articolo-completo.md` (135 righe): è la guida, non lo studio. Poi leggi per intero, uno per uno, questi 11 file: `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/README.md` (27 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/css/base.css` (272 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/css/style.css` (182 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/index.html` (177 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/index2.html` (159 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/index3.html` (219 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/index4.html` (156 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/js/script.js` (161 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/js/script2.js` (167 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/js/script3.js` (156 righe), `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/js/script4.js` (145 righe). Pagine della demo: `index.html`, `index2.html`, `index3.html`, `index4.html`. Scrivi in `REGIA.md` la sezione «Studio — codrops-motion-path-transition-main-2» con gli 8 punti di «Studio integrale delle demo», ognuno con il file e le righe da cui viene.
4. **Regia globale.** Scrivi in `REGIA.md` la regia («Regia globale prima delle scene»), con una voce per ognuna delle 8 sezioni dei passi seguenti.
5. **Ricostruzione componente `codrops-sticky-grid-scroll-main`.** Scrivi in `assets/js/regia-sito.js` le funzioni della meccanica, derivate dalle sorgenti studiate e parametrizzate dalla regia: attori, formule, fasi, stati da raggiungere, ritorno e lifecycle. In `REGIA.md` collega le decisioni originali alle funzioni scritte e agli attori del sito. Questa ricostruzione precede il montaggio nelle scene e non assegna il materiale a una sola sezione.
6. **Ricostruzione seme 1 `codrops-mwg`.** Scrivi in `assets/js/regia-sito.js` le funzioni della meccanica, derivate dalle sorgenti studiate e parametrizzate dalla regia: attori, formule, fasi, stati da raggiungere, ritorno e lifecycle. In `REGIA.md` collega le decisioni originali alle funzioni scritte e agli attori del sito. Questa ricostruzione precede il montaggio nelle scene e non assegna il materiale a una sola sezione.
7. **Ricostruzione seme 2 `codrops-motion-path-transition-main-2`.** Scrivi in `assets/js/regia-sito.js` le funzioni della meccanica, derivate dalle sorgenti studiate e parametrizzate dalla regia: attori, formule, fasi, stati da raggiungere, ritorno e lifecycle. In `REGIA.md` collega le decisioni originali alle funzioni scritte e agli attori del sito. Questa ricostruzione precede il montaggio nelle scene e non assegna il materiale a una sola sezione.
8. **Scena 1 — `[data-m21-root="scene-001"]` («Podere Bricco Sereno — Serralunga d'Alba»).** Componi HTML e CSS della scena: attori, geometria, maschere, gruppi e stati necessari. Poi realizza `setup(scope)` dello slot 1 in `assets/js/regia-sito.js`, usando le meccaniche del giro secondo `REGIA.md`: ruolo di fotografie e titoli, ingressi di testi e controlli, causa, sviluppo, stato conclusivo, passaggio e cleanup locale. Le pause sono stati leggibili della scena realizzata. Scrivere la sua descrizione non realizza questo setup.
9. **Scena 2 — `[data-m21-root="scene-002"]` («Bricco»).** Componi HTML e CSS della scena: attori, geometria, maschere, gruppi e stati necessari. Poi realizza `setup(scope)` dello slot 2 in `assets/js/regia-sito.js`, usando le meccaniche del giro secondo `REGIA.md`: ruolo di fotografie e titoli, ingressi di testi e controlli, causa, sviluppo, stato conclusivo, passaggio e cleanup locale. Le pause sono stati leggibili della scena realizzata. Scrivere la sua descrizione non realizza questo setup.
10. **Scena 3 — `[data-m21-root="scene-003"]` («L'ospitalità firmata Bricco Sereno. Il podere nel cuore dell»).** Componi HTML e CSS della scena: attori, geometria, maschere, gruppi e stati necessari. Poi realizza `setup(scope)` dello slot 3 in `assets/js/regia-sito.js`, usando le meccaniche del giro secondo `REGIA.md`: ruolo di fotografie e titoli, ingressi di testi e controlli, causa, sviluppo, stato conclusivo, passaggio e cleanup locale. Le pause sono stati leggibili della scena realizzata. Scrivere la sua descrizione non realizza questo setup.
11. **Scena 4 — `[data-m21-root="scene-004"]` («la cantina»).** Componi HTML e CSS della scena: attori, geometria, maschere, gruppi e stati necessari. Poi realizza `setup(scope)` dello slot 4 in `assets/js/regia-sito.js`, usando le meccaniche del giro secondo `REGIA.md`: ruolo di fotografie e titoli, ingressi di testi e controlli, causa, sviluppo, stato conclusivo, passaggio e cleanup locale. Le pause sono stati leggibili della scena realizzata. Scrivere la sua descrizione non realizza questo setup.
12. **Scena 5 — `[data-m21-root="scene-005"]` («I Vigneti di Serralunga»).** Componi HTML e CSS della scena: attori, geometria, maschere, gruppi e stati necessari. Poi realizza `setup(scope)` dello slot 5 in `assets/js/regia-sito.js`, usando le meccaniche del giro secondo `REGIA.md`: ruolo di fotografie e titoli, ingressi di testi e controlli, causa, sviluppo, stato conclusivo, passaggio e cleanup locale. Le pause sono stati leggibili della scena realizzata. Scrivere la sua descrizione non realizza questo setup.
13. **Scena 6 — `[data-m21-root="scene-006"]` («La Tradizione e il Tempo»).** Componi HTML e CSS della scena: attori, geometria, maschere, gruppi e stati necessari. Poi realizza `setup(scope)` dello slot 6 in `assets/js/regia-sito.js`, usando le meccaniche del giro secondo `REGIA.md`: ruolo di fotografie e titoli, ingressi di testi e controlli, causa, sviluppo, stato conclusivo, passaggio e cleanup locale. Le pause sono stati leggibili della scena realizzata. Scrivere la sua descrizione non realizza questo setup.
14. **Scena 7 — `[data-m21-root="scene-007"]` («esperienze e memorie»).** Componi HTML e CSS della scena: attori, geometria, maschere, gruppi e stati necessari. Poi realizza `setup(scope)` dello slot 7 in `assets/js/regia-sito.js`, usando le meccaniche del giro secondo `REGIA.md`: ruolo di fotografie e titoli, ingressi di testi e controlli, causa, sviluppo, stato conclusivo, passaggio e cleanup locale. Le pause sono stati leggibili della scena realizzata. Scrivere la sua descrizione non realizza questo setup.
15. **Scena 8 — `[data-m21-root="scene-008"]` («Contatti»).** Componi HTML e CSS della scena: attori, geometria, maschere, gruppi e stati necessari. Poi realizza `setup(scope)` dello slot 8 in `assets/js/regia-sito.js`, usando le meccaniche del giro secondo `REGIA.md`: ruolo di fotografie e titoli, ingressi di testi e controlli, causa, sviluppo, stato conclusivo, passaggio e cleanup locale. Le pause sono stati leggibili della scena realizzata. Scrivere la sua descrizione non realizza questo setup.
16. **Collegamento dei passaggi.** Collega nel codice delle scene lo stato conclusivo e l'apertura delle sezioni consecutive, secondo il filo narrativo e con ownership locale, fino alla chiusura del footer. Non aggiungere effetti indipendenti; realizza i passaggi definiti nella regia. Questo passo costruisce la continuità, non è una verifica dei file.
17. **Consegna.** Il sito completo, `REGIA.md` e `SITE_SIGNATURE.json` compilato.

## Relazioni dei materiali da trasformare nel sito

Queste indicazioni descrivono i materiali scelti. Le sorgenti complete definiscono formule e varianti;
Jules sceglie attori e composizione nella regia globale e realizza le funzioni per questo giro.

- **Componente `codrops-sticky-grid-scroll-main`:** Ingresso alternato dei gruppi, espansione della formazione, separazione laterale e centrale, rivelazione del contenuto e risposta alla direzione dello scroll. Derivare le relazioni da gridRevealTimeline, gridZoomTimeline, toggleContent e animateGridOnScroll in src/scripts/index.js. Il numero delle fotografie di una sezione non e' il numero massimo di attori: progettare la formazione con contenuti pertinenti senza ricostruire la galleria della demo.
- **Seme 1 `codrops-mwg`:** Soglia del gesto, emissione, deriva dovuta al delta, caduta, risposta elastica e rimozione degli attori transitori. Derivare formule e stati da applyMove e createMedia in assets/script.js. La trasformazione narrativa deve essere percepibile durante la visita; il puntatore può aggiungere un'interazione, ma non confinare tutto il seme a una foto.
- **Seme 2 `codrops-motion-path-transition-main-2`:** Relazione fra più attori, passaggio fra formazioni, traiettorie misurate, ordine di distribuzione, ritorno e ricostruzione su resize mantenendo il progresso. Studiare updateMeasurements, buildTimeline, onResize e i controller in tutte le varianti js/script.js, js/script2.js, js/script3.js e js/script4.js. Scegliere la variante per la regia: l'ingresso di una sola immagine su una curva non realizza questa relazione.

## Dossier di orientamento

I dossier non certificano la completezza del lavoro: orientano la lettura integrale del codice. I JSON completi sono in `METHOD/DOSSIER/`.

### Componente: `codrops-sticky-grid-scroll-main`

- Indice sintattico: **indexed**; copertura semantica dichiarata **partial**.
- Sorgenti da leggere integralmente: 9.
- `src/index.html` — parsing `parsed`, 0 import, 1 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-98: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 0.
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

File da studiare di `codrops-sticky-grid-scroll-main` (9): `README.md` (61 righe), `package-lock.json` (1111 righe), `package.json` (19 righe), `src/index.html` (98 righe), `src/scripts/index.js` (280 righe), `src/scripts/utils.js` (19 righe), `src/styles/base.css` (226 righe), `src/styles/index.css` (130 righe), `vite.config.ts` (17 righe).
Il dossier e' una mappa di navigazione. Il codice e gli eventuali testi collegati restano la fonte completa.
### Seme 1: `codrops-mwg`

- Indice sintattico: **indexed**; copertura semantica dichiarata **partial**.
- Sorgenti da leggere integralmente: 3.
- `assets/script.js` — parsing `parsed`, 0 import, 10 unita' sintattiche (utility e callback comprese).
  - `modulo` righe 1-139: eventi DOMContentLoaded; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `window.addEventListener:callback[1]` righe 1-139: eventi mousemove, touchmove, touchstart; movimento gsap.utils.clamp; controlli nessuno; assegnazioni/formule 14; condizioni 1.
  - `root.querySelectorAll.forEach:callback[0]` righe 4-6: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `applyMove` righe 22-42: eventi nessuno; movimento clampX, clampY; controlli nessuno; assegnazioni/formule 9; condizioni 2.
  - `handleMouseMove` righe 44-46: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 0.
  - `handleTouchMove` righe 48-51: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 2.
  - `createMedia` righe 57-121: eventi nessuno; movimento gsap.timeline, tl.fromTo, tl.to; controlli nessuno; assegnazioni/formule 4; condizioni 1.
  - `onComplete` righe 69-72: eventi nessuno; movimento tl.kill; controlli tl.kill; assegnazioni/formule 0; condizioni 1.
  - `funzione@125:42` righe 125-137: eventi mousemove, touchmove, touchstart; movimento nessuna; controlli nessuno; assegnazioni/formule 1; condizioni 1.
  - `mutations.some:callback[0]` righe 126-128: eventi nessuno; movimento nessuna; controlli nessuno; assegnazioni/formule 0; condizioni 1.
  - 41 riferimenti esterni/dinamici o ambigui: dettagli nel dossier JSON; non sono una prova di codice mancante.

File da studiare di `codrops-mwg` (3): `assets/script.js` (139 righe), `assets/style.css` (77 righe), `index.html` (36 righe).
Il dossier e' una mappa di navigazione. Il codice e gli eventuali testi collegati restano la fonte completa.
### Seme 2: `codrops-motion-path-transition-main-2`

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

## Plugin richiesti dalle sorgenti

`motionPath`. Ogni scena usa `SiteScenes.mountRequired`; dichiara soltanto le dipendenze che usa davvero.

## Skill integrali da leggere

Prima la mappa `MOTION_COMPONENTE/SAPERE/PRECEDENZE_E_AMBITI.md`, poi:

- `MOTION_COMPONENTE/SAPERE/00_INDEX.md` — integrale
- `MOTION_COMPONENTE/SAPERE/PRECEDENZE_E_AMBITI.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/cinematic-gsap-lenis-motion-system/REFERENCES.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/cinematic-gsap-lenis-motion-system/SKILL.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/cinematic-gsap-lenis-motion-system/demo/PROMPT.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/cinematic-gsap-lenis-motion-system/demo/index.html` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/gsap-scrolltrigger/SKILL.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/ui-animation/SKILL.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/ui-animation/evaluations/discovery-mode.json` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/ui-animation/evaluations/fixtures/settings-panel.tsx` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/ui-animation/references/choreography.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/ui-animation/references/clip-path-techniques.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/ui-animation/references/code-output.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/ui-animation/references/component-patterns.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/ui-animation/references/contextual-animations.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/ui-animation/references/curve-fitting.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/ui-animation/references/debugging-symptoms.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/ui-animation/references/decision-framework.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/ui-animation/references/gesture-drag.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/ui-animation/references/measurement-guide.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/ui-animation/references/performance-deep-dive.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/ui-animation/references/review-format.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/ui-animation/references/scroll-animations.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/ui-animation/references/spring-animations.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/ui-animation/references/svg-animation.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/ui-animation/references/transition-recipes.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/ui-animation/references/vocabulary.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/ui-animation/scripts/extract_frames.py` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/ui-animation/scripts/fit_curves.py` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/ui-animation/scripts/track_motion.py` — integrale
- `MOTION_COMPONENTE/SAPERE/vanilla/emil-design-eng/MESTIERE.md` — integrale
- `MOTION_COMPONENTE/SAPERE/vanilla/gsap-core/SKILL.md` — integrale
- `MOTION_COMPONENTE/SAPERE/vanilla/gsap-performance/SKILL.md` — integrale
- `MOTION_COMPONENTE/SAPERE/vanilla/gsap-plugins/SKILL.md` — integrale
- `MOTION_COMPONENTE/SAPERE/vanilla/gsap-timeline/SKILL.md` — integrale
- `MOTION_COMPONENTE/SAPERE/vanilla/gsap-utils/SKILL.md` — integrale

## Design del sito

- Colori rilevati: `#080808`, `#1a1a1a`, `#1b2c24`, `#9e9987`, `#b38f48`, `#b5a36b`, `#bda170`, `#c2b27d`, `#c5a059`, `#c5b5b5`, `#d4ccbf`, `#dad4ca`, `#ded2d2`, `#ded5d5`, `#fbfbfa`, `#fcfbf8`, `#ffffff`.
- Caratteri: `Cormorant Garamond`, `Italianno`, `Montserrat`, `Playfair Display`, `cursive`.
- Variabili CSS: nessuna.
- CSS letti: `index.html:<style>`, `MOTORE/vendor/lenis.css`.

## Preparazione tecnica e dipendenze locali

Preparazione tecnica locale: `BUILD/DIPENDENZE.json`, `BUILD/README.md`, compilatore offline `node BUILD/compila.mjs`. Dipendenze rilevate dei tre materiali predisposte; nessun bootstrap artistico fornito.

## Memoria creativa

Nessuna firma precedente.

## Esecuzione

Segui il «Piano del giro», passo per passo. Consegna sito, `REGIA.md` e `SITE_SIGNATURE.json`. Non produrre gate, punteggi, tabelle di conformità o richieste di approvazione intermedia.
