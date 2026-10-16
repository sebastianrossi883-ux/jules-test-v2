/**
 * Seme 1: codrops-motion-path-transition-main-2
 * Responsabile dell'ingresso degli attori lungo traiettorie curve
 * tramite MotionPathPlugin.
 */

export const materialDefinition = Object.freeze({
  "slug": "codrops-motion-path-transition-main-2",
  "role": "Seme",
  "sourceRoot": "MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2"
});

/**
 * buildIntroPathTimeline
 * Crea la timeline di ingresso lungo un path curvilineo.
 * @param {Object} scope - il contesto della scena che contiene gsap.
 * @param {Array} images - gli array di layer (layout, motion, reveal, content).
 * @param {Array} pathData - array di percorsi per ciascuna immagine.
 */
export function buildIntroPathTimeline({ scope, images, pathData }) {
  const { gsap } = scope;
  const tl = gsap.timeline();

  images.forEach((img, i) => {
    // Set initial opacity to 0 so they don't pop in
    gsap.set(img.motion, { autoAlpha: 0 });

    tl.to(img.motion, {
      autoAlpha: 1,
      duration: 0.5,
      ease: "none"
    }, i * 0.1);

    // Apply the motion path on the motion layer, leaving the layout layer for the grid
    tl.from(img.motion, {
      motionPath: {
        path: pathData[i],
        alignOrigin: [0.5, 0.5],
      },
      duration: 1.5,
      ease: "power2.out",
    }, i * 0.1); // Stagger entrance
  });

  return tl;
}
export const implementationStatus = "implemented";
