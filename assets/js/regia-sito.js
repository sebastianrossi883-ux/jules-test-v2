/* Regia unica del sito. Un runtime, un ingresso, una scena per sezione strutturale. */
import { waitForSceneResources } from "../../MOTORE/scena-supporto.js";
import { sceneDefinition as scene001, implementationStatus as scene001Status } from "./scene/scena-001.js";

window.SITE_SCENES_READY = MotionKit.ready.then(async (runtime) => {
  if (runtime.reducedMotion) {
    document.documentElement.dataset.motionState = 'reduced-motion';
    return { status: 'reduced-motion', scenes: [] };
  }
  const sceneRoots = Array.from(document.querySelectorAll("[data-m21-root]"));

  const sceneSlots = [
    { ...scene001, implementationStatus: scene001Status }
  ];

  // La consegna preparata resta leggibile ma non finge scene attive. Il comando
  // finale rifiuta ogni slot ancora pending o senza setup.
  if (sceneSlots.some(slot => slot.implementationStatus !== 'implemented' || typeof slot.setup !== 'function')) {
    document.documentElement.dataset.motionState = 'prepared';
    return { status: 'prepared', scenes: [] };
  }
  const failures = [];
  for (const [index, slot] of sceneSlots.entries()) {
    try {
      const root = slot.selector ? document.querySelector(slot.selector) : sceneRoots[slot.fallbackIndex];
      if (!root) throw Error(`Root mancante: ${slot.id} (${slot.selector})`);
      // Font e immagini reali precedono le misure. Un asset rotto fallisce esplicitamente
      // questa scena; non viene sostituito con una dimensione presunta.
      await waitForSceneResources(root);
      await SiteScenes.mountRequired({
        id: slot.id, root, writes: [],
        requires: { dependencies: slot.dependencies },
        setup: slot.setup,
      });
    } catch (error) {
      if (error.name === "AbortError") throw error;
      failures.push(error);
    }
  }
  if (failures.length) throw new AggregateError(failures, 'Regia: avvio incompleto');
  document.documentElement.dataset.motionState = 'active';
  SiteScenes.requestRefresh();
  return { status: 'active', scenes: sceneSlots.map(slot => slot.id) };
});
window.SITE_SCENES_READY.catch((error) => {
  if (error.name === "AbortError") return;
  document.documentElement.dataset.motionState = 'failed';
  console.error("[regia-sito] avvio interrotto", error);
});
