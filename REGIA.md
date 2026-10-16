# Regia globale

## 1. Studio componente `codrops-sticky-grid-scroll-main`
- **Variante**: src/scripts/index.js.
- **Relazioni da conservare**: animazione all'apparizione della griglia e lo zoom in allontanamento allo scroll.
- **Contenuti del sito**: Le 4 foto della sezione.

## 2. Studio seme 1 `codrops-motion-path-transition-main-2`
- **Variante**: js/script4.js.
- **Relazioni da conservare**: Elementi che appaiono e seguono un percorso predefinito, la funzione motionPath.
- **Contenuti del sito**: Le 4 foto che seguono un percorso al loro ingresso.

## 3. Studio seme 2 `rotatingonscrollanimations-main`
- **Variante**: js/index5.js.
- **Relazioni da conservare**: Rotazione degli elementi allo scroll collegata al progresso.
- **Contenuti del sito**: Le 4 foto ruotano allo scroll.

## 4. Regia globale
- La scena inizia con i testi nascosti. Le 4 foto entrano seguendo un `motionPath` dall'esterno, radunandosi in una griglia al centro.
- Durante lo scroll verso il basso (scrub), le foto si separano, rivelando al centro i testi (titoli e didascalie).
- Contemporaneamente all'espansione della griglia e lungo tutto lo scroll, le singole foto ruotano (Rotating on Scroll).

## 5. Allestimento 1
- **Root**: `[data-m21-root="scene-001"]`.
- `assets/scena.css` conterrà il layout che sovrappone testi e immagini per formare una griglia.
- `assets/js/scenografie/scena-001.js` calcola il bounding box centrale.

## 6. Ricostruzione `codrops-sticky-grid-scroll-main`
- Funzione `gridRevealTimeline` (modificata per scrub), `animateGridOnScroll`.

## 7. Ricostruzione `codrops-motion-path-transition-main-2`
- `buildTimeline` con `motionPath` plugin di GSAP.

## 8. Ricostruzione `rotatingonscrollanimations-main`
- Funzioni di interpolazione per rotazione continua collegata a ScrollTrigger.

## 9. Scena 1
- Coreografia completa nel setup.

## 10. Collegamento
- Chiusura della scena completata e rimozione pin.
