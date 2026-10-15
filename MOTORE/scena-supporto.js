/* Metodo 21 — strumenti geometrici neutrali per le scene.
 *
 * Questo modulo non sceglie layout, attori, stati o animazioni. Rende invece
 * espliciti tre passaggi tecnici che non devono essere simulati con valori
 * presunti: attesa delle risorse, misure nello stesso riferimento e
 * separazione dei layer che possiedono trasformazione e rivelazione.
 */

function element(value, label) {
  if (!value || value.nodeType !== 1 || typeof value.getBoundingClientRect !== "function") {
    throw new TypeError(`[Metodo21Scene] ${label} deve essere un elemento DOM`);
  }
  return value;
}

function finite(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new TypeError(`[Metodo21Scene] ${label} non e' un numero finito: ${String(value)}`);
  }
  return number;
}

function abortError() {
  const error = new Error("[Metodo21Scene] operazione annullata");
  error.name = "AbortError";
  return error;
}

function throwIfAborted(signal) {
  if (signal?.aborted) throw signal.reason instanceof Error ? signal.reason : abortError();
}

function waitForImage(image, signal) {
  throwIfAborted(signal);
  if (image.complete) {
    if (image.naturalWidth > 0) return Promise.resolve();
    return Promise.reject(new Error(`[Metodo21Scene] immagine non caricata: ${image.currentSrc || image.src || "senza src"}`));
  }
  return new Promise((resolve, reject) => {
    let settled = false;
    const clear = () => {
      image.removeEventListener("load", loaded);
      image.removeEventListener("error", failed);
      signal?.removeEventListener("abort", cancelled);
    };
    const loaded = () => {
      if (settled) return;
      settled = true;
      clear();
      if (image.naturalWidth > 0) resolve();
      else reject(new Error(`[Metodo21Scene] immagine senza dimensioni: ${image.currentSrc || image.src || "senza src"}`));
    };
    const failed = () => {
      if (settled) return;
      settled = true;
      clear();
      reject(new Error(`[Metodo21Scene] immagine non caricata: ${image.currentSrc || image.src || "senza src"}`));
    };
    const cancelled = () => {
      if (settled) return;
      settled = true;
      clear();
      reject(signal.reason instanceof Error ? signal.reason : abortError());
    };
    image.addEventListener("load", loaded, { once: true });
    image.addEventListener("error", failed, { once: true });
    signal?.addEventListener("abort", cancelled, { once: true });
    // decode() forza anche il caricamento di immagini lazy prima delle misure,
    // senza cambiare loading/src o la struttura consegnata dal cliente.
    if (typeof image.decode === "function") {
      image.decode().then(loaded, () => { if (image.complete) failed(); });
    }
  });
}

/** Attende font e immagini della root; un errore resta esplicito. */
export async function waitForSceneResources(root, { signal } = {}) {
  const container = root?.nodeType === 9 ? root : element(root, "root");
  const documentRef = container.ownerDocument || container;
  throwIfAborted(signal);
  if (documentRef.fonts?.ready) await documentRef.fonts.ready;
  throwIfAborted(signal);
  const images = Array.from(container.querySelectorAll("img"));
  await Promise.all(images.map((image) => waitForImage(image, signal)));
  throwIfAborted(signal);
  return Object.freeze({ fontsReady: true, imageCount: images.length });
}

function transformedLineage(frame) {
  const view = frame.ownerDocument?.defaultView;
  if (!view?.getComputedStyle) return [];
  const transformed = [];
  for (let node = frame; node && node.nodeType === 1; node = node.parentElement) {
    const style = view.getComputedStyle(node);
    const zoom = style.zoom && style.zoom !== "normal" ? Number.parseFloat(style.zoom) : 1;
    if ((style.transform && style.transform !== "none") ||
        (style.perspective && style.perspective !== "none") ||
        (Number.isFinite(zoom) && zoom !== 1)) transformed.push(node);
  }
  return transformed;
}

function rawRect(node) {
  const rect = element(node, "target").getBoundingClientRect();
  const values = [rect.left, rect.top, rect.right, rect.bottom, rect.width, rect.height];
  values.forEach((value, index) => finite(value, `rettangolo[${index}]`));
  return rect;
}

function union(rectangles) {
  if (!rectangles.length) throw new Error("[Metodo21Scene] nessun rettangolo da unire");
  const left = Math.min(...rectangles.map((rect) => rect.left));
  const top = Math.min(...rectangles.map((rect) => rect.top));
  const right = Math.max(...rectangles.map((rect) => rect.right));
  const bottom = Math.max(...rectangles.map((rect) => rect.bottom));
  return { left, top, right, bottom, width: right - left, height: bottom - top };
}

function frozenBox(rect, origin) {
  const left = finite(rect.left - origin.left, "box.left");
  const top = finite(rect.top - origin.top, "box.top");
  const right = finite(rect.right - origin.left, "box.right");
  const bottom = finite(rect.bottom - origin.top, "box.bottom");
  return Object.freeze({
    left, top, right, bottom,
    width: finite(right - left, "box.width"),
    height: finite(bottom - top, "box.height"),
    centerX: finite((left + right) / 2, "box.centerX"),
    centerY: finite((top + bottom) / 2, "box.centerY"),
  });
}

/**
 * Crea un riferimento metrico della root.
 *
 * Le misure sono AABB proiettate nello spazio visivo della root e sono adatte
 * a ingombri, lettura e destinazioni quando la sua linea di antenati non e'
 * trasformata. Per SVG, WebGL o antenati trasformati la scena deve usare le
 * coordinate native e dichiarare la conversione: questo helper fallisce
 * invece di fingere che sottrarre due rettangoli viewport sia corretto.
 */
export function createMeasurementFrame(frame) {
  const root = element(frame, "frame");
  const transformed = transformedLineage(root);
  if (transformed.length) {
    const names = transformed.map((node) => node.id ? `#${node.id}` : node.tagName.toLowerCase()).join(", ");
    throw new Error(`[Metodo21Scene] frame con antenati trasformati (${names}): usare coordinate native o un frame non trasformato`);
  }
  const origin = rawRect(root);
  const measure = (target, { include = [] } = {}) => {
    const nodes = [target, ...include].map((node) => element(node, "target/include"));
    return frozenBox(union(nodes.map(rawRect)), origin);
  };
  const delta = (from, to) => Object.freeze({
    x: finite(to.centerX - from.centerX, "delta.x"),
    y: finite(to.centerY - from.centerY, "delta.y"),
  });
  return Object.freeze({
    element: root,
    width: finite(origin.width, "frame.width"),
    height: finite(origin.height, "frame.height"),
    measure,
    measureMany: (targets) => Array.from(targets, (target) => measure(target)),
    delta,
  });
}

/** Unisce box gia' misurati nello stesso frame. */
export function unionBoxes(boxes) {
  const values = Array.from(boxes || []);
  if (!values.length) throw new Error("[Metodo21Scene] unionBoxes richiede almeno un box");
  return frozenBox(union(values), { left: 0, top: 0 });
}

/** Espande un box per riservare un varco di lettura reale. */
export function expandBox(box, gap = 0) {
  const amount = finite(gap, "gap");
  return frozenBox({
    left: box.left - amount,
    top: box.top - amount,
    right: box.right + amount,
    bottom: box.bottom + amount,
  }, { left: 0, top: 0 });
}

/** Relazione geometrica, non un giudizio artistico o un gate di consegna. */
export function boxesIntersect(a, b) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

/** Valida e congela le entita' numeriche prodotte dalla scenografia. */
export function finiteGeometry(value, path = "geometry") {
  if (value === undefined) throw new TypeError(`[Metodo21Scene] ${path} e' undefined`);
  if (value === null) return null;
  if (typeof value === "number") return finite(value, path);
  if (Array.isArray(value)) return Object.freeze(value.map((item, index) => finiteGeometry(item, `${path}[${index}]`)));
  if (typeof value !== "object" || value.nodeType) return value;
  const result = {};
  for (const [key, item] of Object.entries(value)) result[key] = finiteGeometry(item, `${path}.${key}`);
  return Object.freeze(result);
}

/**
 * Associa nodi distinti ai canali di layout, movimento e rivelazione.
 * Non crea wrapper e non modifica il DOM: la scenografia decide la struttura.
 */
export function actorLayers({ layout, motion, reveal, content = reveal }) {
  const layers = {
    layout: element(layout, "layout"),
    motion: element(motion, "motion"),
    reveal: element(reveal, "reveal"),
    content: element(content, "content"),
  };
  if (layers.layout === layers.motion) {
    throw new Error("[Metodo21Scene] layout e motion devono essere nodi distinti: la posizione strutturale non condivide transform con la coreografia");
  }
  if (!layers.layout.contains(layers.motion) || !layers.motion.contains(layers.reveal) || !layers.reveal.contains(layers.content)) {
    throw new Error("[Metodo21Scene] gerarchia layer non valida: layout > motion > reveal > content");
  }
  return Object.freeze(layers);
}

/** Prenota i canali coerenti con la loro responsabilita' nel SiteScenes scope. */
export function claimActorLayers(scope, layers) {
  if (!scope || typeof scope.claim !== "function") throw new TypeError("[Metodo21Scene] scope SiteScenes mancante");
  scope.claim(layers.motion, "transform");
  scope.claim(layers.reveal, ["clip-path", "opacity", "visibility"]);
  return layers;
}
