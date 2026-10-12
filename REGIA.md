# REGIA

## 1. Studio del componente `codrops-sticky-grid-scroll-main`

### File
- `src/index.html`
- `src/scripts/index.js`
- `src/scripts/utils.js`
- `src/styles/base.css`
- `src/styles/index.css`

### Schede delle 7 funzioni (da `src/scripts/index.js`)

1. **`getElements()`**
   - Seleziona gli elementi DOM principali: `.block--main`, `.block__wrapper`, `.content`, `.content__title`, `.content__description`, `.content__button`, `.gallery__grid`, `.gallery__item`.
2. **`initContent()`**
   - Tween: 2. Setta opacità a 0 e `pointerEvents: none` per `.content__description` e `.content__button`. Setta `yPercent` di `.content__title` in base al calcolo `dy / content.offsetHeight * 100` per centrare il titolo.
3. **`groupItemsByColumn()`**
   - Divide gli elementi in `this.numColumns` (3 di default).
4. **`addParallaxOnScroll()`**
   - Tween: 1. Crea un effetto parallasse dal -100% all'inizio animando `this.wrapper` basato su scroll (scrub: true). Inizia quando la top del blocco colpisce il bottom del viewport.
5. **`animateTitleOnScroll()`**
   - Tween: 1. Appare il titolo animando l'opacità da 0 a 1 quando il blocco tocca il 57% della viewport (durata 0.7s, non scrub).
6. **`gridRevealTimeline(columns)`**
   - Tween: `columns.length` (3). Anima ciascuna colonna: le colonne pari da `dy * -1`, le dispari da `dy * 1`. Stagger ciascuna voce di `0.06s` da inizio/fine. Ease `power1.inOut`.
7. **`gridZoomTimeline(columns)`**
   - Tween: 4. Aumenta scala della griglia intera a `2.05`. Colonna 0 va a `xPercent: -40`. Colonna 2 va a `xPercent: 40`. Colonna centrale animata su `yPercent` per -40 o +40 a seconda dell'indice (durata 0.5s).

### Regia nel CSS (`src/styles/index.css` / `base.css`)
- Definisce un blocco adesivo in `.block` con `height: 500vh` e `.block__wrapper` come `sticky top-0 h-screen`.
- Usa grid CSS (`grid-template-columns: repeat(3, 1fr)`) centrata assolutamente.
- Tween totali contati nelle funzioni: 9 tween + 2 in `toggleContent` che però la traccia non elenca esplicitamente nelle "7 funzioni" o lo ingloba. Contando le 7 listate, ne ha trovate alcune in più/in meno? Vediamo l'elenco: `getElements`, `initContent`, `groupItemsByColumn`, `addParallaxOnScroll`, `animateTitleOnScroll`, `gridRevealTimeline`, `gridZoomTimeline`. Ci sono anche `toggleContent` e `animateGridOnScroll` nel file JS (totale 9 funzioni). La documentazione chiede 7 funzioni.

## 2. Studio del seme `codrops-mwg`
### File
- `index.html`
- `assets/style.css`
- `assets/script.js`

### Leggi
- **Mouse move**: Genera un'immagine lungo il percorso ogni volta che il mouse (o touch) percorre una distanza fissa (`window.innerWidth / 8` o `/ 6`).
- **Funzione `createMedia(x, y, deltaX, deltaY)`**:
  - Un elemento img viene creato in `(x,y)`.
  - Animazione 1: scala da 1.3 a 1.0, e opacità o rotazione (random rotation da start), ease `elastic.out`.
  - Animazione 2: `x` incrementa di `deltaX * 2`. `y` scende al fondo della pagina (scale a 0.9, yPercent a -95), ease `back.in`.
  - Animazione 3 (BOUNCE): x incrementa di `deltaX * 1.6`, ruota. `yPercent: 150`, scende giù oltre lo schermo, ease `back.in`.

## 3. Studio del seme `codrops-motion-path-transition-main-2`
### File
- 11 file. `index.html` - `index4.html`, file js relativi, e plugin GSAP.

### Leggi pagina per pagina
- **Pagina `index.html` (script.js)**: Thumbnail scorrono verticalmente e convergono usando MotionPath su una curva. L'elemento in cima si sposta sulla curva in una posizione specifica, scalando dalla base alla thumbnail target, dal centro al bordo dx.
- **Pagina `index2.html` (script2.js)**: Thumbnail lungo una riga in basso, la prima espande sul lato. Entrano e scalano dalla sinistra lungo una curva orizzontale/dal basso, allineandosi a destra. Usa `stagger from: "end"`.
- **Pagina `index3.html` (script3.js)**: Thumbnail entrano dal fondo a sinistra verso l'alto a sinistra (colonna singola). `stagger from: "start"`. La curva porta l'oggetto x: target, y: path da *0.15 a target.
- **Pagina `index4.html` (script4.js)**: Impilamento in alto a sinistra. Thumbnail si spostano lungo una piccola curva uscendo e poi assestandosi nell'offset della stack in (targetX, targetY).


## 4. Sceneggiatura (Firma e Tabella)

### Firma del sito
- **Idea**: Il percorso del tempo, la sedimentazione delle esperienze (dalle origini, al vigneto, al vino).
- **Metafora**: La cantina come scrigno di memoria; la vigna come organismo vivo in costante adattamento.
- **Movimento**: Un flusso discendente e stratificato, in cui i blocchi emergono dolcemente dal basso come viti che germogliano, accompagnati da un rallentamento ponderato nei momenti chiave.
- **Filo (Motion Signature)**: Il colore oro polvere (`#c5a059`) guida la narrazione, unificando le sezioni in un "fil rouge" visivo, e gli elementi chiave (immagini o linee) crescono e si assestano seguendo traiettorie curve e organiche, richiamando la meccanica del seme `motion-path-transition-main-2` unita a un progressivo scivolamento/zoom del componente `sticky-grid-scroll`.

### Tabella della Sceneggiatura

| Sezione | Ruolo | Materiale & Legge | Ingresso | Sviluppo | Uscita | Filo e Transizione |
|---------|-------|-------------------|----------|----------|--------|--------------------|
| **#section-1** (Hero / Percorsi) | Apertura | Seme `mwg` (creazione a scia) adattato a scroll. | Le immagini si formano in scia durante lo scroll iniziale. | Il titolo appare con `yPercent`. | Le immagini escono in fade e sprofondano. | Transizione cromatica tenue verso il bianco. `// passaggio: sezione-1→sezione-2` |
| **#section-2** (Selezione Storica) | Sviluppo | Seme `motion-path-transition` (`index2/4` - allineamento curvo). | Immagine e testi entrano seguendo una curva organica. | Svelamento testi in dissolvenza sfalsata. | Scivolamento in alto asincrono. | Il color oro guida il titolo successivo. `// passaggio: sezione-2→sezione-3` |
| **#section-3** (Cantina Storica) | Culmine | Componente `sticky-grid-scroll` riadattato / o variante `motion-path` se grid. | Sfondo scuro entra a sfumare (`#1b2c24`). Titolo custom-script in fade in. | Immagine in pin con parallasse (`addParallaxOnScroll`). | Fade out verso crema. | Scivolamento verso sfondi chiari. `// passaggio: sezione-3→sezione-4` |
| **#section-4** (I Vigneti) | Ripresa | Seme `motion-path-transition` (`index3` - entrata verticale). | Immagine vigneto sale dal basso su asse verticale. | Parallasse morbida tra immagine e testo. | Leggero zoom-out. | Linea dorata passa alla sezione dopo. `// passaggio: sezione-4→sezione-5` |
| **#section-5** (Tradizione e Tempo)| Focus | Componente `sticky-grid-scroll` completo (Grid Reveal + Zoom + Pin). | Le due card e il testo si svelano ad incastro (grid reveal). | Zoom in su immagine principale, testi (`toggleContent`). | Blocco rilasciato. | Raccordo con lo sfondo verde profondo. `// passaggio: sezione-5→sezione-6` |
| **#section-6** (Accoglienza) & Footer | Chiusura | Seme `motion-path-transition` (uscita a stack) / Parallasse. | Testo custom-script entra lateralmente. | Sospensione ed evidenza del tasto Prenota. | Footer emerge in parallasse `yPercent: -100`. | Il filo si ferma e completa l'arco visivo. |


## 5. Tabelle Componente `sticky-grid-scroll`

### `getElements()`
| Elemento Demo | Quantità Demo | Elemento Sito | Quantità Sito |
| ------------- | ------------- | ------------- | ------------- |
| `.block--main`| 1 | `#section-5` | 1 |
| `.block__wrapper` | 1 | `#section-5 > .max-w-4xl` (o wrapper aggiunto) | 1 |
| `.content` | 1 | `#section-5 .text-center` (header testi) | 1 |
| `.content__title` | 1 | `#section-5 h2` | 1 |
| `.content__description` | 1 | `#section-5 p` | 1 |
| `.content__button` | 1 | *Assente* (Sostituito con un divisore o un altro elemento se serve) | 0 |
| `.gallery__grid` | 1 | `#section-5 .grid` | 1 |
| `.gallery__item` | 9 | `#section-5 .grid .w-full` (Le due immagini presenti, clonate se la logica di `groupItemsByColumn` richiede multipli) | 2 |

### `initContent()`
- Elementi coinvolti: `.content__description` (1) e `.content__button` (0 -> rimosso).
- Title offset: `.content__title` (1).

### `groupItemsByColumn()`
- Colonne: 3 (Da adattare al sito che ha 2 elementi reali, magari distribuendoli o alterando il `numColumns` o duplicando in DOM virtuale per la grid). Per mantenere la *regia matematica identica*, se sono 2 immagini, verranno inserite in 2 colonne o si adeguerà la grid per 3. Nel sito la sezione 5 ha un grid con 2 colonne `md:grid-cols-2`. Mantenendo l'elenco come dice "Ogni chiamata dell'elenco entra... numero di elementi per gruppo... Cambia il fotogramma. Un valore cambia solo se dipende dal numero degli elementi". Poiché numColumns=3 nella demo, qui creeremo logicamente 3 colonne, magari con alcune vuote se non ritagliamo le foto (o ritaglieremo dinamicamente le foto per farne 3 o 9 come richiesto: "Se una sezione ha meno foto degli elementi della demo, usa le foto del sito anche ripetute o ritagliate in modo diverso, senza ridurre la formazione."). Per questo incarico ripeteremo le 2 foto fino a formare 9 items per mantenere "9 items" della demo.

### `addParallaxOnScroll()`
- `wrapper` animato su Y.

### `animateTitleOnScroll()`
- Titolo animato opacità a 57% viewport.

### `gridRevealTimeline()`
- Le 3 colonne animate con stagger.

### `gridZoomTimeline()`
- `grid` in `scale: 2.05`. Colonna 0 `xPercent: -40`, colonna 2 `xPercent: 40`.
