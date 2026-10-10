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
