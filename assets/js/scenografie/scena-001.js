import { actorLayers, claimActorLayers, createMeasurementFrame, finiteGeometry } from "../../../MOTORE/scena-supporto.js";

// Allestimento della root: [data-m21-root="scene-001"]
// Questa funzione misura attori e contenuti nel riferimento reale della root.
// Ogni voce puo' essere un elemento oppure { element, include: [didascalie/controlli] }.
// Jules progetta gli stati e le destinazioni: il preparatore non ne inventa.
export function misuraScena({ root, attori = [], letture = [] }) {
  const frame = createMeasurementFrame(root);
  const misura = (voce) => {
    const specifica = voce?.element ? voce : { element: voce, include: [] };
    return frame.measure(specifica.element, { include: specifica.include || [] });
  };
  return finiteGeometry({
    frame: { width: frame.width, height: frame.height },
    attori: attori.map(misura),
    letture: letture.map(misura),
  }, 'scena');
}

// Usa questa associazione soltanto per attori la cui struttura e' stata costruita
// come layout > motion > reveal > content. Non crea wrapper e non modifica il DOM.
export function preparaLayerAttore(scope, specifica) {
  return claimActorLayers(scope, actorLayers(specifica));
}
