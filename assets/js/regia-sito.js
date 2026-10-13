/* Regia unica del sito. Un runtime, un ingresso, una scena per sezione strutturale. */
MotionKit.ready.then(async (runtime) => {
  if (runtime.reducedMotion) return;
  const sceneRoots = Array.from(document.querySelectorAll("[data-m21-root]"));

  // Jules scrive qui le funzioni delle tre meccaniche, dopo aver progettato la regia globale.
  // Nessuna animazione o scena finta e' predisposta dal preparatore.
  const sceneSlots = [
    {"id": "site:01-podere-bricco-sereno-serralunga-d-alba", "label": "Podere Bricco Sereno — Serralunga d'Alba", "selector": "[data-m21-root=\"scene-001\"]", "fallbackIndex": 0, "dependencies": [], "setup": null},
    {"id": "site:02-section-1", "label": "section-1", "selector": "[data-m21-root=\"scene-002\"]", "fallbackIndex": 1, "dependencies": [], "setup": null},
    {"id": "site:03-section-2", "label": "section-2", "selector": "[data-m21-root=\"scene-003\"]", "fallbackIndex": 2, "dependencies": [], "setup": null},
    {"id": "site:04-section-3", "label": "section-3", "selector": "[data-m21-root=\"scene-004\"]", "fallbackIndex": 3, "dependencies": [], "setup": null},
    {"id": "site:05-section-4", "label": "section-4", "selector": "[data-m21-root=\"scene-005\"]", "fallbackIndex": 4, "dependencies": [], "setup": null},
    {"id": "site:06-section-5", "label": "section-5", "selector": "[data-m21-root=\"scene-006\"]", "fallbackIndex": 5, "dependencies": [], "setup": null},
    {"id": "site:07-section-6", "label": "section-6", "selector": "[data-m21-root=\"scene-007\"]", "fallbackIndex": 6, "dependencies": [], "setup": null},
    {"id": "site:08-contatti", "label": "Contatti", "selector": "[data-m21-root=\"scene-008\"]", "fallbackIndex": 7, "dependencies": [], "setup": null}
  ];

  // Scrivere per ciascuno slot setup(scope), dichiarare i target con scope.claim e restituire il cleanup.
  // Assegnare a dependencies i plugin effettivamente usati. setup:null indica lavoro da realizzare.
  // Nel sito di partenza gli slot non vengono registrati come scene montate.
  for (const [index, slot] of sceneSlots.entries()) {
    if (typeof slot.setup !== "function") continue;
    const root = slot.selector ? document.querySelector(slot.selector) : sceneRoots[slot.fallbackIndex];
    if (!root) {
      console.error(`[regia-sito] root mancante per la scena ${index + 1}`);
      continue;
    }
    try {
      await SiteScenes.mountRequired({
        id: slot.id, root, writes: [],
        requires: { dependencies: slot.dependencies },
        setup: slot.setup,
      });
    } catch (error) {
      if (error.name === "AbortError") return;
      console.error(`[regia-sito] scena ${index + 1} non montata`, error);
    }
  }
}).catch((error) => {
  if (error.name === "AbortError") return;
  console.error("[regia-sito] avvio interrotto", error);
});
