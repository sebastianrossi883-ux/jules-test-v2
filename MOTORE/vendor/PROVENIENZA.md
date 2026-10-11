# Dipendenze locali

- `gsap.min.js`, `ScrollTrigger.min.js`: GSAP 3.15.0, preservati byte per byte dalla R0 fornita dall'utente. Licenza nei file e termini del produttore: https://gsap.com/standard-license/.
- `lenis.min.js`, `lenis.css`: pacchetto `lenis@1.3.26`, da https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/; licenza MIT in `LENIS_LICENSE.txt`. Progetto ufficiale: https://github.com/darkroomengineering/lenis.
- `MotionPathPlugin.min.js`: GSAP 3.15.0, distribuzione ufficiale del pacchetto GSAP.
- `splitting.min.js`, `splitting.css`, `splitting-cells.css`: copia locale gia presente nel componente `textblock8` fornito.
- `anime.min.js`: anime.js 2.x, licenza MIT dichiarata nel file, dalla sorgente `SliceRevealer-master` fornita.
- `imagesloaded.pkgd.min.js`, `charming.min.js`: copie locali provenienti dalle demo Codrops fornite.
- `TweenMax-1.20.3.min.js`: runtime legacy presente nelle demo Codrops fornite; utilizzabile solo dentro le capsule isolate.
- `lenis-snap.min.js`: estensione Lenis Snap dal pacchetto `lenis@1.3.23`, destinata alle capsule che la richiedono.

Non caricare una seconda build se il progetto dispone già di queste librerie.

## Plugin GSAP aggiunti (Metodo21_Regia, 10/10/2026)

`SplitText`, `Flip`, `Draggable`, `InertiaPlugin`, `Observer`, `CustomEase`, `CustomWiggle`, `CustomBounce`, `EasePack`, `DrawSVGPlugin`, `MorphSVGPlugin`, `ScrambleTextPlugin`, `ScrollToPlugin`, `TextPlugin`, `Physics2DPlugin`, `PhysicsPropsPlugin`: GSAP 3.15.0, pacchetto npm ufficiale `gsap@3.15.0` (`dist/`), la stessa build di `gsap.min.js` (sha256 identico). Tutti gratuiti anche per uso commerciale (https://gsap.com/standard-license/).
