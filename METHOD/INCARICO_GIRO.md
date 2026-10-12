# Incarico del giro

## Il sito fornito

Le sezioni di `index.html`, nell'ordine. Restano tutte, con i loro testi e le loro foto:

1. `<header>` — «Podere Bricco Sereno — Serralunga d'Alba» — 1 foto
2. `<section id="section-1">` — «Bricco» — 2 foto
3. `<section id="section-2">` — «L'ospitalità firmata Bricco Sereno. Il podere nel cuore delle Langhe u» — 1 foto
4. `<section id="section-3">` — «la cantina» — 1 foto
5. `<section id="section-4">` — «I Vigneti di Serralunga» — 1 foto
6. `<section id="section-5">` — «La Tradizione e il Tempo» — 2 foto
7. `<section id="section-6">` — «esperienze e memorie» — 0 foto
8. `<footer>` — 0 foto

## Brief

Il brief dà obiettivo, tono e direzione del movimento; contenuti e sezioni sono quelli del sito fornito.

Podere Bricco Sereno: ospitalità e vino nelle Langhe; movimento lento e materico, come la vendemmia.

## Materiali scelti dall'utente

- **Componente: `codrops-sticky-grid-scroll-main`** — sorgente: `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/`
  - Testo di accompagnamento: `MOTION_COMPONENTE/REFERENZE/codrops-sticky-grid-scroll-main/articolo-completo.md`
- **Seme 1: `codrops-mwg`** — sorgente: `MOTION_COMPONENTE/ARCHIVIO/codrops-mwg/`
  - Testo di accompagnamento: `MOTION_COMPONENTE/REFERENZE/codrops-mwg/articolo-completo.md`
- **Seme 2: `codrops-motion-path-transition-main-2`** — sorgente: `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/`
  - Testo di accompagnamento: `MOTION_COMPONENTE/REFERENZE/codrops-motion-path-transition-main-2/articolo-completo.md`

I documenti di accompagnamento spiegano la demo a cui sono collegati; leggili insieme al codice e agli asset del rispettivo materiale. Non sostituiscono il sito né il brief.

## Cosa contiene ogni materiale (letto dal codice)

Questo elenco è stato letto dal codice delle demo: è tutto ciò che studi, e il numero delle voci lo dà il codice.

### Componente: `codrops-sticky-grid-scroll-main`

**Pagina `src/index.html`** — script: `src/scripts/index.js`, `src/scripts/utils.js`
- `src/scripts/index.js:initContent` — righe 37–58, 2 tween, chiamata alle righe 12
  - elementi: `.block--main .content` (1 nella pagina demo); `.block--main .content__button` (1 nella pagina demo); `.block--main .content__description` (1 nella pagina demo); `.block--main .content__title` (1 nella pagina demo)
  - valore, riga 50: `const dy = (this.content.offsetHeight - this.title.offsetHeight) / 2`
  - valore, riga 53: `this.titleOffsetY = (dy / this.content.offsetHeight) * 100`
  - riga 45: `gsap.set([this.description, this.button], { opacity: 0, pointerEvents: "none" })`
  - riga 56: `gsap.set(this.title, { yPercent: this.titleOffsetY })`
- `src/scripts/index.js:addParallaxOnScroll` — righe 75–97, 1 tween, con ScrollTrigger, chiamata alle righe 15
  - elementi: `.block--main` (1 nella pagina demo); `.block--main .block__wrapper` (1 nella pagina demo)
  - riga 87: `gsap.from(this.wrapper, { yPercent: -100, ease: "none", scrollTrigger: { trigger: this.block, start: "top bottom", end: "top top", scrub: true, }, })`
- `src/scripts/index.js:animateTitleOnScroll` — righe 98–120, 1 tween, con ScrollTrigger, chiamata alle righe 16
  - elementi: `.block--main` (1 nella pagina demo); `.block--main .content__title` (1 nella pagina demo)
  - riga 110: `gsap.from(this.title, { opacity: 0, duration: 0.7, ease: "power1.out", scrollTrigger: { trigger: this.block, start: "top 57%", toggleActions: "play none none reset", }, })`
- `src/scripts/index.js:gridRevealTimeline` — righe 121–157, 1 tween, chiamata alle righe 243
  - elementi: `.block--main .gallery__grid` (1 nella pagina demo)
  - valore, riga 133: `const wh = window.innerHeight`
  - valore, riga 135: `const dy = wh - (wh - this.grid.offsetHeight) / 2`
  - valore, riga 139: `const fromTop = colIndex % 2 === 0`
  - riga 131: `gsap.timeline()`
  - riga 142: `timeline.from( column, { y: dy * (fromTop ? -1 : 1), stagger: { each: 0.06, from: fromTop ? "end" : "start", }, ease: "power1.inOut", }, "grid-reveal", )`
- `src/scripts/index.js:gridZoomTimeline` — righe 158–190, 4 tween, chiamata alle righe 246
  - elementi: `.block--main .gallery__grid` (1 nella pagina demo)
  - riga 168: `gsap.timeline({ defaults: { duration: 1, ease: "power3.inOut" } })`
  - riga 171: `timeline.to(this.grid, { scale: 2.05 })`
  - riga 174: `timeline.to(columns[0], { xPercent: -40 }, "<")`
  - riga 175: `timeline.to(columns[2], { xPercent: 40 }, "<")`
  - riga 178: `timeline.to( columns[1], { yPercent: (index) => (index < Math.floor(columns[1].length / 2) ? -1 : 1) * 40, duration: 0.5, ease: "power1.inOut", }, "-=0.5", )`
- `src/scripts/index.js:toggleContent` — righe 191–222, 2 tween, chiamata alle righe 250
  - elementi: `.block--main .content__button` (1 nella pagina demo); `.block--main .content__description` (1 nella pagina demo); `.block--main .content__title` (1 nella pagina demo)
  - valore, riga 53: `this.titleOffsetY = (dy / this.content.offsetHeight) * 100`
  - riga 204: `gsap.timeline({ defaults: { overwrite: true } })`
  - riga 206: `.to(this.title, { yPercent: isVisible ? 0 : this.titleOffsetY, duration: 0.7, ease: "power2.inOut", })`
  - riga 212: `.to( [this.description, this.button], { opacity: isVisible ? 1 : 0, duration: 0.4, ease: 'power1.${isVisible ? "inOut" : "out"}', pointerEvents: isVisible ? "all" : "none", }, isVisible ? "-=90%" : "<", )`
- `src/scripts/index.js:animateGridOnScroll` — righe 223–251, 0 tween, con ScrollTrigger, chiamata alle righe 17
  - elementi: `.block--main` (1 nella pagina demo)
  - riga 232: `gsap.timeline({ scrollTrigger: { trigger: this.block, start: "top 25%", end: "bottom bottom", scrub: true, }, })`
  - riga 243: `.add(this.gridRevealTimeline())`
  - riga 246: `.add(this.gridZoomTimeline(), "-=0.6")`
  - riga 250: `.add(() => this.toggleContent(timeline.scrollTrigger.direction === 1), "-=0.32")`
- `src/scripts/index.js:initSmoothScrolling` — righe 255–273: è lo scroll morbido della demo; nel sito lo fa la Lenis unica del motore, non si ricrea
- regia nel CSS: `src/styles/index.css:51` height: 425vh;; `src/styles/index.css:55` position: sticky;

File da studiare di `codrops-sticky-grid-scroll-main` (6): `README.md` (62 righe), `src/index.html` (101 righe), `src/scripts/index.js` (281 righe), `src/scripts/utils.js` (19 righe), `src/styles/base.css` (227 righe), `src/styles/index.css` (131 righe).

I percorsi sono relativi a `MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main/`.

### Seme 1: `codrops-mwg`

**Pagina `index.html`** — script: `assets/script.js`
- `assets/script.js:blocco «window.addEventListener("DOMContentLoaded", () => {»` — righe 1–139, 1 tween
  - elementi: `.codrops_mwg` (1 nella pagina demo); `.medias img` (10 nella pagina demo)
  - valore, riga 3: `const images = []`
  - valore, riga 8: `let incr = 0, oldIncrX = 0, oldIncrY = 0, firstMove = true, indexImg = 0`
  - valore, riga 14: `const isCoarsePointer = window.matchMedia('(hover: none)').matches`
  - valore, riga 15: `const resetDist = window.innerWidth / (isCoarsePointer ? 6 : 8)`
  - valore, riga 19: `const clampX = gsap.utils.clamp(0, W)`
  - valore, riga 20: `const clampY = gsap.utils.clamp(0, H)`
  - valore, riga 23: `const valX = clampX(clientX)`
  - valore, riga 24: `const valY = clampY(clientY)`
  - riga 1: `window.addEventListener("DOMContentLoaded", () => { const root = document.querySelector('.codrops_mwg') const images = [] root.querySelectorAll('.medias img').forEach(image => { images.push(image.getAttribute('src')) }) let incr = 0, oldIncrX = 0, oldIncrY = 0, firstMove = true, indexImg = 0 const isCoarsePointer = window.matchMedia('(hover: none)').matches const resetDist = window.innerWidth / (isCoarsePointer ? 6 : 8) const W = window.innerWidth const H = window.innerHeight const clampX = gsap.utils.clamp(0, W) const clampY = gsap.utils.clamp(0, H) function applyMove(clientX, clientY) { const valX = clampX(clientX) const valY = clampY(clientY) if (firstMove) { firstMove = false oldIncrX = valX oldIncrY = valY return } incr += Math.abs(valX - oldIncrX) + Math.abs(valY - oldIncrY) if (incr > resetDist) { incr = 0 createMedia(valX, valY - root.getBoundingClientRect().top, valX - oldInc…`
  - riga 53: `root.addEventListener('mousemove', handleMouseMove)`
  - riga 54: `root.addEventListener('touchstart', handleTouchMove, { passive: true })`
  - riga 55: `root.addEventListener('touchmove', handleTouchMove, { passive: true })`
- `assets/script.js:createMedia` — righe 57–121, 5 tween, chiamata alle righe 37
  - riga 68: `gsap.timeline({ onComplete: () => { root.removeChild(image); tl && tl.kill() } })`
  - riga 75: `tl.fromTo(image, { xPercent: -50 + (Math.random() - 0.5) * 80, yPercent: -50 + (Math.random() - 0.5) * 10, scaleX: 1.3, scaleY: 1.3, rotation:(Math.random() - 0.5) * 20 }, { scaleX:1, scaleY:1, ease: 'elastic.out(2, 0.6)', duration: 0.4 })`
  - riga 88: `tl.fromTo(image, { x, }, { x: '+=' + deltaX * 2, rotation: 0, ease: 'power1.in', duration: 0.4 }, '<')`
  - riga 97: `tl.fromTo(image, { y }, { y: '+=' + (H - y), scale: 0.9, yPercent: -95, ease: 'back.in(1.1)', duration: 0.4 }, '<')`
  - riga 108: `tl.to(image, { x: '+=' + deltaX * 1.6, rotation:(Math.random() - 0.5) * 40, ease: 'power1.in', duration: 0.3 })`
  - riga 114: `tl.to(image, { yPercent: 150, ease: 'back.in(' + (1.5 + (1 - y/H)) + ')', duration: 0.3 }, '<')`

File da studiare di `codrops-mwg` (3): `assets/script.js` (139 righe), `assets/style.css` (77 righe), `index.html` (36 righe).

I percorsi sono relativi a `MOTION_COMPONENTE/ARCHIVIO/codrops-mwg/`.

### Seme 2: `codrops-motion-path-transition-main-2`

**Pagina `index.html`** — script: `js/script.js`
- `js/script.js:buildTimeline` — righe 48–119, 4 tween, chiamata alle righe 22, 128
  - elementi: `.big-featured__container` (1 nella pagina demo); `.open-button` (1 nella pagina demo); `.thumbnail` (14 nella pagina demo)
  - valore, riga 10: `this.gap = 10`
  - valore, riga 31: `this.thumbnailRect = this.thumbnails[0].getBoundingClientRect()`
  - valore, riga 33: `this.vh = window.innerHeight`
  - valore, riga 34: `this.vw = window.innerWidth`
  - valore, riga 40: `this.targetX = this.vw - this.thumbnailRect.right + (this.thumbnailRect.width - scaledWidth) / 2`
  - valore, riga 44: `this.targetY = (this.vh - this.thumbnailRect.height * this.scale + this.thumbnailRect.top - this.gap * 2) / 2`
  - valore, riga 72: `const targetYItem = this.targetY - index * (this.thumbnailRect.height * this.scale + this.gap)`
  - riga 54: `gsap.timeline({ defaults: { duration: 1.2, ease: "expo.inOut", easeReverse: true, }, paused: true, })`
  - riga 63: `this.tl.to(this.btnOpen, { opacity: 0, duration: 0.5, })`
  - riga 68: `this.tl.to( this.thumbnails, { motionPath: (index) => { const targetYItem = this.targetY - index * (this.thumbnailRect.height * this.scale + this.gap); return { path: [ { x: this.targetX * 0.95, y: -targetYItem * 0.095, scale: (1 - this.scale) * 0.25 + this.scale, }, { x: this.targetX, y: -targetYItem, scale: this.scale, }, ], curviness: 0.45, }; }, stagger: { from: "start", each: 0.02, }, }, "<", )`
  - riga 100: `this.tl.fromTo( this.numbers, { opacity: 0, yPercent: 50 }, { opacity: 1, yPercent: 0, stagger: 0.045, }, "<", )`
  - riga 111: `this.tl.to( this.featuredContainer, { scale: 1, opacity: 1, }, "<", )`
- `js/script.js:blocco «window.addEventListener("DOMContentLoaded", async () => {»` — righe 153–161, 1 tween
  - elementi: `.thumbnail` (14 nella pagina demo)
  - riga 153: `window.addEventListener("DOMContentLoaded", async () => { gsap.set(".thumbnail", { zIndex: (i, _, arr) => arr.length - i, }); await preloadImages(); document.body.classList.remove("loading"); gsap.registerPlugin(MotionPathPlugin); new App(); })`
  - riga 154: `gsap.set(".thumbnail", { zIndex: (i, _, arr) => arr.length - i, })`

**Pagina `index2.html`** — script: `js/script2.js`
- `js/script2.js:buildTimeline` — righe 42–116, 3 tween, chiamata alle righe 21, 126
  - elementi: `.big-featured__container` (1 nella pagina demo); `.open-button` (1 nella pagina demo); `.thumbnail` (20 nella pagina demo)
  - valore, riga 10: `this.gap = 10`
  - valore, riga 30: `this.thumbnailRect = this.thumbnails[0].getBoundingClientRect()`
  - valore, riga 32: `this.vh = window.innerHeight`
  - valore, riga 36: `this.targetX = -this.thumbnailRect.left + this.gap`
  - valore, riga 39: `this.targetY = this.vh - this.thumbnailRect.bottom + (this.thumbnailRect.height * this.scale) / 2 + this.gap`
  - valore, riga 65: `const targetXItem = this.targetX + index * (this.thumbnailRect.width * this.scale + this.gap)`
  - riga 48: `gsap.timeline({ defaults: { duration: 1.2, ease: "expo.inOut", easeReverse: true, }, paused: true, })`
  - riga 57: `this.tl.to(this.btnOpen, { opacity: 0, })`
  - riga 61: `this.tl.to( this.thumbnails, { motionPath: (index) => { const targetXItem = this.targetX + index * (this.thumbnailRect.width * this.scale + this.gap); if (index === 0) { return { path: [ { x: targetXItem, y: this.targetY, scale: this.scale, }, ], }; } return { path: [ { x: this.gap, y: this.targetY * 0.45, scale: (1 - this.scale) * 0.5 + this.scale, }, { x: this.targetX * 0.35 + index * 0.45 + this.gap, y: this.targetY * 0.95, scale: (1 - this.scale) * 0.25 + this.scale, }, { x: targetXItem, y: this.targetY, scale: this.scale, }, ], curviness: 0.45, }; }, stagger: { from: "end", each: 0.02, }, }, "<", )`
  - riga 109: `this.tl.to( this.featuredContainer, { opacity: 1, }, "<", )`
- `js/script2.js:blocco «window.addEventListener("DOMContentLoaded", async () => {»` — righe 155–167, 1 tween
  - elementi: `.thumbnail` (20 nella pagina demo)
  - riga 155: `window.addEventListener("DOMContentLoaded", async () => { gsap.set(".thumbnail", { zIndex: (i, _, arr) => arr.length - i, }); await preloadImages(); document.body.classList.remove("loading"); gsap.registerPlugin(MotionPathPlugin); new App(); })`
  - riga 156: `gsap.set(".thumbnail", { zIndex: (i, _, arr) => arr.length - i, })`

**Pagina `index3.html`** — script: `js/script3.js`
- `js/script3.js:buildTimeline` — righe 44–109, 4 tween, chiamata alle righe 22, 119
  - elementi: `.big-featured__container` (1 nella pagina demo); `.open-button` (1 nella pagina demo); `.thumbnail` (20 nella pagina demo)
  - valore, riga 10: `this.gap = 10`
  - valore, riga 27: `this.thumbnailRect = this.thumbnails[0].getBoundingClientRect()`
  - valore, riga 28: `this.featuredContainerRect = this.featuredContainer.getBoundingClientRect()`
  - valore, riga 30: `this.vh = window.innerHeight`
  - valore, riga 34: `this.targetX = this.featuredContainerRect.left - this.thumbnailRect.left - this.thumbnailRect.width - this.gap`
  - valore, riga 41: `this.targetY = ((this.vh - this.thumbnailRect.height + this.thumbnailRect.top - this.gap * 2) / 2) * -1`
  - valore, riga 67: `const targetYItem = this.targetY + index * (this.thumbnailRect.height + this.gap)`
  - riga 50: `gsap.timeline({ defaults: { duration: 1.2, ease: "expo.inOut", easeReverse: "expo", }, paused: true, })`
  - riga 59: `this.tl.to(this.btnOpen, { opacity: 0, })`
  - riga 63: `this.tl.to( this.thumbnails, { motionPath: (index) => { const targetYItem = this.targetY + index * (this.thumbnailRect.height + this.gap); return { path: [ { x: this.targetX, y: targetYItem * 0.15, }, { x: this.targetX, y: targetYItem, }, ], curviness: 0.5, }; }, stagger: { from: "start", each: 0.035, }, }, "<", )`
  - riga 91: `this.tl.fromTo( this.numbers, { opacity: 0, yPercent: 50 }, { opacity: 1, yPercent: 0, stagger: 0.045, }, "<", )`
  - riga 102: `this.tl.to( this.featuredContainer, { opacity: 1, }, "<", )`
- `js/script3.js:blocco «window.addEventListener("DOMContentLoaded", async () => {»` — righe 144–156, 1 tween
  - elementi: `.thumbnail` (20 nella pagina demo)
  - riga 144: `window.addEventListener("DOMContentLoaded", async () => { gsap.set(".thumbnail", { zIndex: (i, _, arr) => arr.length - i, }); await preloadImages(); document.body.classList.remove("loading"); gsap.registerPlugin(MotionPathPlugin); new App(); })`
  - riga 145: `gsap.set(".thumbnail", { zIndex: (i, _, arr) => arr.length - i, })`

**Pagina `index4.html`** — script: `js/script4.js`
- `js/script4.js:buildTimeline` — righe 44–102, 1 tween, chiamata alle righe 26, 112
  - elementi: `.thumbnail` (20 nella pagina demo)
  - valore, riga 14: `this.gap = 10`
  - valore, riga 17: `this.stackOffset = 5`
  - valore, riga 35: `this.thumbnailRect = this.thumbnails[0].getBoundingClientRect()`
  - valore, riga 41: `this.targetX = this.stackOffset`
  - valore, riga 42: `this.targetY = this.stackOffset`
  - valore, riga 61: `const top = this.thumbnails[index].getBoundingClientRect().top`
  - valore, riga 63: `const targetYItem = this.targetY + index * (this.thumbnailRect.height * this.scale + this.gap)`
  - riga 50: `gsap.timeline({ defaults: { duration: 1.1, ease: "expo.inOut", easeReverse: true, }, paused: true, })`
  - riga 59: `this.tl.to(this.thumbnails, { motionPath: (index) => { const top = this.thumbnails[index].getBoundingClientRect().top; const targetYItem = this.targetY + index * (this.thumbnailRect.height * this.scale + this.gap); if (index === 0) { return { path: [ { x: this.targetX, y: targetYItem, scale: this.scale, }, ], }; } return { path: [ { x: this.targetX * 1.5, y: targetYItem > top ? top + 25 : top - 25, scale: (1 - this.scale) * 0.25 + this.scale, }, { x: this.targetX, y: targetYItem, scale: this.scale, }, ], curviness: 0.25, }; }, stagger: { from: "start", each: 0.035, }, })`

File da studiare di `codrops-motion-path-transition-main-2` (11): `README.md` (28 righe), `css/base.css` (273 righe), `css/style.css` (183 righe), `index.html` (177 righe), `index2.html` (159 righe), `index3.html` (219 righe), `index4.html` (156 righe), `js/script.js` (162 righe), `js/script2.js` (168 righe), `js/script3.js` (157 righe), `js/script4.js` (146 righe).

I percorsi sono relativi a `MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2/`.

## Piano del giro

Il piano che scrivi all'inizio ha questi passi, in quest'ordine. Un passo è finito quando il suo risultato è scritto nel file indicato.

1. **Studio del componente `codrops-sticky-grid-scroll-main`**: in `REGIA.md` una voce per ogni file e una scheda per ogni funzione e per la regia nel CSS, con tutti i tween contati (6 file, 7 funzioni e la regia nel CSS, su 1 pagina).
2. **Studio del seme `codrops-mwg`**: in `REGIA.md` una voce per ogni file e la sua legge, pagina per pagina (3 file, 2 funzioni, su 1 pagina).
3. **Studio del seme `codrops-motion-path-transition-main-2`**: in `REGIA.md` una voce per ogni file e la sua legge, pagina per pagina (11 file, 7 funzioni, su 4 pagine).
4. **Sceneggiatura**: in `REGIA.md` la firma del sito (idea, metafora, movimento, filo) e la tabella della sceneggiatura: per ogni sezione, nell'ordine, ruolo, materiale e legge, ingresso, sviluppo, uscita, come cambia il filo e il passaggio alla sezione dopo.
5. **Componente**: per ogni funzione, in `REGIA.md` la tabella degli elementi (demo e sito, con quanti sono), poi nel codice del sito ogni chiamata dell'elenco, nello stesso ordine e con gli stessi valori, con `// demo: file:riga` accanto.
6. **Semi**: le due scene nuove, ciascuna con tutte le leggi della sua scheda.
7. **Le altre sezioni e i passaggi**: dall'hero al footer, ognuna con la sua scena a scroll e `// legge:` accanto; tra ogni coppia di sezioni il passaggio nel codice, con `// passaggio:` su tutti e due i lati.
8. **Confronto e visione d'insieme**: in `CONFRONTO/` le immagini di ogni demo affiancata alla sua scena, poi la pagina intera a desktop e telefono; completa dove una scena fa meno della sua demo.
9. **Consegna**: i sette punti di «Il lavoro è finito quando» della missione, riletti sui file.

## Memoria creativa non vincolante

Registro ancora vuoto: nessuna firma precedente da usare come riferimento.
