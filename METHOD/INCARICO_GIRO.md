# Incarico del giro

## Sito fornito

Le scene strutturali di `index.html`, nell'ordine:

1. `<header>` — «Podere Bricco Sereno — Serralunga d'Alba» — 1 media, 1 titoli, 0 testi, 14 controlli
2. `<section id="section-1">` — «Bricco» — 2 media, 2 titoli, 1 testi, 0 controlli
3. `<section id="component-textblock8">` — «L'ospitalità firmata Bricco Sereno. Il podere nel cuore delle Langhe unisce tradizione agricola, silenzi e profonda quie» — 1 media, 3 titoli, 3 testi, 2 controlli
4. `<section id="seed-parallax-1">` — «la cantina» — 1 media, 1 titoli, 2 testi, 0 controlli
5. `<section id="seed-paths">` — «I Vigneti di Serralunga» — 1 media, 1 titoli, 1 testi, 0 controlli
6. `<section id="seed-parallax-2">` — «La Tradizione e il Tempo» — 2 media, 1 titoli, 1 testi, 0 controlli
7. `<section id="section-6">` — «esperienze e memorie» — 0 media, 1 titoli, 1 testi, 1 controlli
8. `<footer>` — «Contatti» — 0 media, 3 titoli, 4 testi, 4 controlli

## Brief

Realizza Motion Atlas come nuovo sito editoriale immersivo e originale dedicato a tre linguaggi del movimento digitale: griglia, gravità e traiettorie. In questo incarico la sostituzione dei contenuti del sito di partenza è esplicitamente richiesta: il repository è soltanto la base tecnica. Costruisci un'esperienza completa dall'hero al footer con un'unica regia narrativa, identità editoriale riconoscibile, composizione e tipografia di altissima qualità, contenuti originali, navigazione reale e comportamento mobile. Sticky Grid deve fornire la meccanica strutturale dominante; MWG e MotionPath devono trasformare scene, passaggi e continuità, non apparire come demo incollate. Studia integralmente codice, varianti e tutorial consegnati; conserva causalità, fasi, geometria e lifecycle delle meccaniche, reinterpretandoli nella regia globale. Usa soltanto Vanilla, la Lenis globale e GSAP/ScrollTrigger del motore. Completa tutto nello stesso giro, senza approvazioni intermedie, gate, punteggi o cicli verifica-correzione.

## Tre materiali Vanilla

- **Componente: `codrops-sticky-grid-scroll-main`** — sorgente completa `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/`; testi collegati: `MOTION_COMPONENTE/REFERENZE/codrops-sticky-grid-scroll-main/articolo-completo.md`.
- **Seme 1: `codrops-mwg`** — sorgente completa `MOTION_COMPONENTE/ARCHIVIO/codrops-mwg/`; testi collegati: `MOTION_COMPONENTE/REFERENZE/codrops-mwg/articolo-completo.md`.
- **Seme 2: `codrops-motion-path-transition-main-2`** — sorgente completa `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/`; testi collegati: `MOTION_COMPONENTE/REFERENZE/codrops-motion-path-transition-main-2/articolo-completo.md`.

## Dossier di orientamento

I dossier non certificano la completezza del lavoro: orientano la lettura integrale del codice. I JSON completi sono in `METHOD/DOSSIER/`.

### Componente: `codrops-sticky-grid-scroll-main`

- Stato dell'analisi strutturale: **complete**.
- Sorgenti da leggere integralmente: 6.
- `src/scripts/index.js` — AST `complete`, 4 import, 8 unita' con logica.
  - `initContent` righe 42-58: eventi nessuno; movimento gsap.set; controlli nessuno; formule 0.
  - `addParallaxOnScroll` righe 80-97: eventi nessuno; movimento gsap.from; controlli nessuno; formule 0.
  - `animateTitleOnScroll` righe 103-120: eventi nessuno; movimento gsap.from; controlli nessuno; formule 0.
  - `gridRevealTimeline` righe 129-157: eventi nessuno; movimento gsap.timeline; controlli nessuno; formule 1.
  - `gridZoomTimeline` righe 166-190: eventi nessuno; movimento gsap.timeline; controlli nessuno; formule 0.
  - `toggleContent` righe 198-222: eventi nessuno; movimento gsap.timeline; controlli nessuno; formule 0.
  - `animateGridOnScroll` righe 230-251: eventi nessuno; movimento gsap.timeline; controlli nessuno; formule 0.
  - `initSmoothScrolling` righe 255-273: eventi scroll; movimento nessuna; controlli nessuno; formule 0.
- `src/scripts/utils.js` — AST `complete`, 1 import, 0 unita' con logica.

File da studiare di `codrops-sticky-grid-scroll-main` (6): `README.md` (62 righe), `src/index.html` (101 righe), `src/scripts/index.js` (281 righe), `src/scripts/utils.js` (19 righe), `src/styles/base.css` (227 righe), `src/styles/index.css` (131 righe).
Il dossier e' una mappa di navigazione. Il codice e gli eventuali testi collegati restano la fonte completa.
### Seme 1: `codrops-mwg`

- Stato dell'analisi strutturale: **complete**.
- Sorgenti da leggere integralmente: 3.
- `assets/script.js` — AST `complete`, 0 import, 4 unita' con logica.
  - `modulo` righe 1-139: eventi DOMContentLoaded; movimento nessuna; controlli nessuno; formule 0.
  - `window.addEventListener(DOMContentLoaded)` righe 1-139: eventi mousemove, touchmove, touchstart; movimento nessuna; controlli nessuno; formule 3.
  - `createMedia` righe 57-121: eventi nessuno; movimento gsap.timeline; controlli nessuno; formule 1.
  - `onComplete` righe 69-72: eventi nessuno; movimento nessuna; controlli tl.kill; formule 0.

File da studiare di `codrops-mwg` (3): `assets/script.js` (139 righe), `assets/style.css` (77 righe), `index.html` (36 righe).
Il dossier e' una mappa di navigazione. Il codice e gli eventuali testi collegati restano la fonte completa.
### Seme 2: `codrops-motion-path-transition-main-2`

- Stato dell'analisi strutturale: **complete**.
- Sorgenti da leggere integralmente: 11.
- `js/script.js` — AST `complete`, 0 import, 9 unita' con logica.
  - `modulo` righe 1-162: eventi DOMContentLoaded; movimento nessuna; controlli nessuno; formule 0.
  - `updateMeasurements` righe 30-47: eventi nessuno; movimento nessuna; controlli nessuno; formule 1.
  - `buildTimeline` righe 49-119: eventi nessuno; movimento gsap.timeline; controlli this.tl.kill; formule 0.
  - `motionPath` righe 71-91: eventi nessuno; movimento nessuna; controlli nessuno; formule 1.
  - `onResize` righe 121-132: eventi nessuno; movimento nessuna; controlli this.tl.progress, this.tl.progress.pause; formule 1.
  - `addEventListeners` righe 134-150: eventi click, resize; movimento nessuna; controlli nessuno; formule 0.
  - `this.btnOpen.addEventListener(click)` righe 137-142: eventi nessuno; movimento nessuna; controlli this.tl.play; formule 0.
  - `this.btnClose.addEventListener(click)` righe 144-149: eventi nessuno; movimento nessuna; controlli this.tl.reverse; formule 0.
  - `window.addEventListener(DOMContentLoaded)` righe 153-161: eventi nessuno; movimento gsap.set; controlli nessuno; formule 0.
- `js/script2.js` — AST `complete`, 0 import, 8 unita' con logica.
  - `modulo` righe 1-168: eventi DOMContentLoaded; movimento nessuna; controlli nessuno; formule 0.
  - `buildTimeline` righe 43-116: eventi nessuno; movimento gsap.timeline; controlli this.tl.kill; formule 0.
  - `motionPath` righe 64-100: eventi nessuno; movimento nessuna; controlli nessuno; formule 1.
  - `onResize` righe 118-130: eventi nessuno; movimento nessuna; controlli this.tl.progress, this.tl.progress.pause; formule 1.
  - `addEventListeners` righe 132-152: eventi click, resize; movimento nessuna; controlli nessuno; formule 0.
  - `this.btnOpen.addEventListener(click)` righe 135-142: eventi nessuno; movimento nessuna; controlli this.tl.play, this.tl.progress; formule 0.
  - `this.btnClose.addEventListener(click)` righe 144-151: eventi nessuno; movimento nessuna; controlli this.tl.progress, this.tl.reverse; formule 0.
  - `window.addEventListener(DOMContentLoaded)` righe 155-167: eventi nessuno; movimento gsap.set; controlli nessuno; formule 0.
- `js/script3.js` — AST `complete`, 0 import, 8 unita' con logica.
  - `modulo` righe 1-157: eventi DOMContentLoaded; movimento nessuna; controlli nessuno; formule 0.
  - `buildTimeline` righe 45-109: eventi nessuno; movimento gsap.timeline; controlli this.tl.kill; formule 0.
  - `motionPath` righe 66-82: eventi nessuno; movimento nessuna; controlli nessuno; formule 1.
  - `onResize` righe 111-123: eventi nessuno; movimento nessuna; controlli this.tl.progress, this.tl.progress.pause; formule 1.
  - `addEventListeners` righe 125-141: eventi click, resize; movimento nessuna; controlli nessuno; formule 0.
  - `this.btnOpen.addEventListener(click)` righe 128-133: eventi nessuno; movimento nessuna; controlli this.tl.play; formule 0.
  - `this.btnClose.addEventListener(click)` righe 135-140: eventi nessuno; movimento nessuna; controlli this.tl.reverse; formule 0.
  - `window.addEventListener(DOMContentLoaded)` righe 144-156: eventi nessuno; movimento gsap.set; controlli nessuno; formule 0.
- `js/script4.js` — AST `complete`, 0 import, 7 unita' con logica.
  - `modulo` righe 1-146: eventi DOMContentLoaded; movimento nessuna; controlli nessuno; formule 0.
  - `buildTimeline` righe 45-102: eventi nessuno; movimento gsap.timeline; controlli this.tl.kill; formule 0.
  - `motionPath` righe 60-96: eventi nessuno; movimento nessuna; controlli nessuno; formule 2.
  - `onResize` righe 104-116: eventi nessuno; movimento nessuna; controlli this.tl.progress, this.tl.progress.pause; formule 1.
  - `addEventListeners` righe 118-134: eventi click, resize; movimento nessuna; controlli nessuno; formule 0.
  - `this.leftBtn.addEventListener(click)` righe 121-126: eventi nessuno; movimento nessuna; controlli this.tl.play; formule 0.
  - `this.bottomBtn.addEventListener(click)` righe 128-133: eventi nessuno; movimento nessuna; controlli this.tl.reverse; formule 0.

File da studiare di `codrops-motion-path-transition-main-2` (11): `README.md` (28 righe), `css/base.css` (273 righe), `css/style.css` (183 righe), `index.html` (177 righe), `index2.html` (159 righe), `index3.html` (219 righe), `index4.html` (156 righe), `js/script.js` (162 righe), `js/script2.js` (168 righe), `js/script3.js` (157 righe), `js/script4.js` (146 righe).
Il dossier e' una mappa di navigazione. Il codice e gli eventuali testi collegati restano la fonte completa.

## Plugin richiesti dalle sorgenti

`motionPath`, `observer`. Per le tre meccaniche assegnate usare `SiteScenes.mountRequired`.

## Skill integrali da leggere

Prima la mappa `MOTION_COMPONENTE/SAPERE/PRECEDENZE_E_AMBITI.md`, poi:

- `MOTION_COMPONENTE/SAPERE/00_INDEX.md` — integrale
- `MOTION_COMPONENTE/SAPERE/PRECEDENZE_E_AMBITI.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/cinematic-gsap-lenis-motion-system/REFERENCES.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/cinematic-gsap-lenis-motion-system/SKILL.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/gsap-scrolltrigger/SKILL.md` — integrale
- `MOTION_COMPONENTE/SAPERE/complete/ui-animation/SKILL.md` — integrale
- `MOTION_COMPONENTE/SAPERE/vanilla/emil-design-eng/MESTIERE.md` — integrale
- `MOTION_COMPONENTE/SAPERE/vanilla/gsap-core/SKILL.md` — integrale
- `MOTION_COMPONENTE/SAPERE/vanilla/gsap-performance/SKILL.md` — integrale
- `MOTION_COMPONENTE/SAPERE/vanilla/gsap-plugins/SKILL.md` — integrale
- `MOTION_COMPONENTE/SAPERE/vanilla/gsap-timeline/SKILL.md` — integrale
- `MOTION_COMPONENTE/SAPERE/vanilla/gsap-utils/SKILL.md` — integrale

## Design del sito

- Colori rilevati: `#080808`, `#1a1a1a`, `#1b2c24`, `#9e9987`, `#b38f48`, `#b5a36b`, `#bda170`, `#c5a059`, `#c5b5b5`, `#d4ccbf`, `#dad4ca`, `#ded2d2`, `#ded5d5`, `#fbfbfa`, `#fcfbf8`, `#ffffff`.
- Caratteri: `Cormorant Garamond`, `Italianno`, `Montserrat`, `Playfair Display`, `cursive`.
- Variabili CSS: nessuna.
- CSS letti: `index.html:<style>`, `MOTORE/vendor/lenis.css`.

## Anteprime che richiedono npm

Nessuno: le anteprime selezionate sono già locali.

## Memoria creativa

Nessuna firma precedente.

## Esecuzione unica

Studia integralmente sito, tre materiali, testi e skill pertinenti. Scrivi una regia globale hero-footer, quindi realizza tutte le scene nello stesso giro. Consegna sito, `REGIA.md` breve e `SITE_SIGNATURE.json`. Non produrre gate, punteggi, tabelle di conformità o richieste di approvazione intermedia.
