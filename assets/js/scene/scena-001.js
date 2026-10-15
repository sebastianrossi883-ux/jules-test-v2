import { misuraScena, preparaLayerAttore } from "../scenografie/scena-001.js";
import * as materiale01 from "../meccaniche/01-codrops-sticky-grid-scroll-main.js";
import * as materiale02 from "../meccaniche/02-codrops-motion-path-transition-main-2.js";
import * as materiale03 from "../meccaniche/03-rotatingonscrollanimations-main.js";

// Conservare soltanto gli import pertinenti a questa scena e chiamarne davvero
// le funzioni in setup. Nel sito completo ogni materiale deve essere usato
// almeno da una scena, non necessariamente da tutte.
export const availableMaterials = Object.freeze({
  "codrops-sticky-grid-scroll-main": materiale01,
  "codrops-motion-path-transition-main-2": materiale02,
  "rotatingonscrollanimations-main": materiale03,
});

export { misuraScena, preparaLayerAttore };
export const implementationStatus = "pending";
export const sceneDefinition = {
  id: "site:01-scena-podere",
  label: "scena-podere",
  selector: "[data-m21-root=\"scene-001\"]",
  fallbackIndex: 0,
  dependencies: [],
  setup: null,
};
