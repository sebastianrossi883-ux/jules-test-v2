/* Metodo 21 Universale — dipendenze runtime note.
   Caricare questo file prima di regia-coordinatore.js. */
(function (global) {
  'use strict';
  global.METHOD_PLUGIN_REGISTRY = Object.freeze({
    gsap3: {
      scripts: ['MOTORE/vendor/gsap.min.js'],
      globals: ['gsap']
    },
    scrollTrigger: {
      dependsOn: ['gsap3'],
      scripts: ['MOTORE/vendor/ScrollTrigger.min.js'],
      globals: ['ScrollTrigger']
    },
    motionPath: {
      dependsOn: ['gsap3'],
      scripts: ['MOTORE/vendor/MotionPathPlugin.min.js'],
      globals: ['MotionPathPlugin']
    },
    lenis: {
      scripts: ['MOTORE/vendor/lenis.min.js'],
      styles: ['MOTORE/vendor/lenis.css'],
      globals: ['Lenis']
    },
    splitting: {
      scripts: ['MOTORE/vendor/splitting.min.js'],
      styles: [
        'MOTORE/vendor/splitting.css',
        'MOTORE/vendor/splitting-cells.css'
      ],
      globals: ['Splitting']
    },
    splitText: { dependsOn: ['gsap3'], scripts: ['MOTORE/vendor/SplitText.min.js'], globals: ['SplitText'] },
    flip: { dependsOn: ['gsap3'], scripts: ['MOTORE/vendor/Flip.min.js'], globals: ['Flip'] },
    draggable: { dependsOn: ['gsap3'], scripts: ['MOTORE/vendor/Draggable.min.js'], globals: ['Draggable'] },
    inertia: { dependsOn: ['gsap3'], scripts: ['MOTORE/vendor/InertiaPlugin.min.js'], globals: ['InertiaPlugin'] },
    observer: { dependsOn: ['gsap3'], scripts: ['MOTORE/vendor/Observer.min.js'], globals: ['Observer'] },
    customEase: { dependsOn: ['gsap3'], scripts: ['MOTORE/vendor/CustomEase.min.js'], globals: ['CustomEase'] },
    customWiggle: { dependsOn: ['customEase'], scripts: ['MOTORE/vendor/CustomWiggle.min.js'], globals: ['CustomWiggle'] },
    customBounce: { dependsOn: ['customEase'], scripts: ['MOTORE/vendor/CustomBounce.min.js'], globals: ['CustomBounce'] },
    easePack: { dependsOn: ['gsap3'], scripts: ['MOTORE/vendor/EasePack.min.js'], globals: ['ExpoScaleEase', 'RoughEase', 'SlowMo'] },
    drawSVG: { dependsOn: ['gsap3'], scripts: ['MOTORE/vendor/DrawSVGPlugin.min.js'], globals: ['DrawSVGPlugin'] },
    morphSVG: { dependsOn: ['gsap3'], scripts: ['MOTORE/vendor/MorphSVGPlugin.min.js'], globals: ['MorphSVGPlugin'] },
    scrambleText: { dependsOn: ['gsap3'], scripts: ['MOTORE/vendor/ScrambleTextPlugin.min.js'], globals: ['ScrambleTextPlugin'] },
    scrollTo: { dependsOn: ['gsap3'], scripts: ['MOTORE/vendor/ScrollToPlugin.min.js'], globals: ['ScrollToPlugin'] },
    text: { dependsOn: ['gsap3'], scripts: ['MOTORE/vendor/TextPlugin.min.js'], globals: ['TextPlugin'] },
    physics2D: { dependsOn: ['gsap3'], scripts: ['MOTORE/vendor/Physics2DPlugin.min.js'], globals: ['Physics2DPlugin'] },
    physicsProps: { dependsOn: ['gsap3'], scripts: ['MOTORE/vendor/PhysicsPropsPlugin.min.js'], globals: ['PhysicsPropsPlugin'] },
    imagesLoaded: {
      scripts: ['MOTORE/vendor/imagesloaded.pkgd.min.js'],
      globals: ['imagesLoaded']
    },
    anime: {
      scripts: ['MOTORE/vendor/anime.min.js'],
      globals: ['anime']
    },
    charming: {
      scripts: ['MOTORE/vendor/charming.min.js'],
      globals: ['charming']
    },
    gsap2CapsuleOnly: {
      scripts: ['MOTORE/vendor/TweenMax-1.20.3.min.js'],
      globals: ['TweenMax', 'TimelineMax'],
      isolateOnly: true
    }
  });
})(window);
