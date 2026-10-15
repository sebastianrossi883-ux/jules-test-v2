import { misuraScena, preparaLayerAttore } from "../scenografie/scena-001.js";
import * as materiale01 from "../meccaniche/01-imagetocontent-main.js";
import * as materiale02 from "../meccaniche/02-slicerevealer-master.js";

// Conservare soltanto gli import pertinenti a questa scena e chiamarne davvero
// le funzioni in setup. Nel sito completo ogni materiale deve essere usato
// almeno da una scena, non necessariamente da tutte.
export const availableMaterials = Object.freeze({
  "imagetocontent-main": materiale01,
  "slicerevealer-master": materiale02,
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
