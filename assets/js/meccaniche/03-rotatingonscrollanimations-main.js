/**
 * Seme 2: rotatingonscrollanimations-main
 * Responsabile della rotazione delle immagini e dell'interpolazione
 * legata al progresso dello scroll.
 */

export const materialDefinition = Object.freeze({
  "slug": "rotatingonscrollanimations-main",
  "role": "Seme",
  "sourceRoot": "MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main"
});

/**
 * buildRotationEffect
 * Crea un ScrollTrigger che intercetta il progresso dello scroll e applica
 * rotazione ai layer di contenuto.
 * @param {Object} scope - il contesto della scena che contiene gsap.
 * @param {Array} images - gli array di layer (layout, motion, reveal, content).
 * @param {Element} triggerElement - l'elemento trigger (la root).
 */
export function buildRotationEffect({ scope, images, triggerElement }) {
  const { gsap, ScrollTrigger } = scope;

  // Per ogni immagine, creiamo dei setter veloci
  const items = images.map((img, i) => {
    // Alternate rotation direction
    const maxRot = (i % 2 === 0 ? 1 : -1) * gsap.utils.random(15, 30);
    return {
      element: img.content,
      setter: gsap.quickSetter(img.content, "rotation", "deg"),
      maxRotation: maxRot
    };
  });

  // Questo trigger gira indipendentemente per interpolare
  const st = ScrollTrigger.create({
    trigger: triggerElement,
    start: "top top",
    end: "+=200%",
    onUpdate: (self) => {
      const progress = self.progress;
      items.forEach(item => {
        // Interpolate da 0 a maxRotation usando il progresso
        const currentRot = gsap.utils.interpolate(0, item.maxRotation, progress);
        item.setter(currentRot);
      });
    }
  });

  return st;
}
export const implementationStatus = "implemented";
