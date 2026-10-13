# Infrastruttura tecnica offline, non una scena

Le sorgenti dei materiali in MOTION_COMPONENTE/ARCHIVIO sono immutate. Le anteprime in DERIVATI sono copie tecniche separate, non il sito finale. Studiare e ricostruire meccaniche, HTML/CSS e regia resta lavoro di Jules.

`DIPENDENZE.json` distingue librerie, versioni, alias, trasformazioni e limiti di analisi. Le versioni Three/OGL sono isolate per materiale; gli addon devono usare il core del proprio proprietario. Non scambiare oggetti fra versioni incompatibili. Un requisito irrisolto non è autorizzazione a semplificare.

Il sito finale rimane Vanilla. Se la regia usa solo API globali del motore, non serve compilare. Se Jules scrive moduli/TS/CJS/CSS/shader, `node BUILD/compila.mjs` compila offline il suo codice, non il bootstrap delle demo. Entry e output sono in `BUILD/config.json`. Dopo la compilazione collegare il bundle con `<script type="module" src="assets/js/regia-sito.bundle.js"></script>` AL POSTO dell'ingresso regia-sito.js, e l'eventuale CSS generato. Nessuna installazione è necessaria durante il giro.

Gli import `gsap`, `gsap/ScrollTrigger`, plugin GSAP e Lenis sono ponti verso le istanze del motore: GSAP non viene ribundlato. Un plugin importato attende MotionKit e il registro locale. Non usare gsap/all né ScrollSmoother: import espliciti e unica Lenis. La classe Lenis importata non autorizza una nuova istanza: usare scope.lenis.

Le librerie versionate si importano con `@material/SLUG/PACCHETTO` (anche gli addon: `@material/SLUG/three/addons/...`). Gli alias degli autori valgono solo nel loro proprietario; per nuovo codice definire alias progettuali espliciti in config.json, senza montare le classi-scena dell'autore come soluzione. CSS/SCSS, shader GLSL/glslify e asset sono trasformati dal compilatore; TS è transpilation, non type checking. Configurazioni dinamiche, URL remoti, pacchetti non forniti o feature WebGPU restano requisiti espliciti, non equivalenze automatiche.
