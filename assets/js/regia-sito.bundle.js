var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// MOTORE/scena-supporto.js
function element(value, label) {
  if (!value || value.nodeType !== 1 || typeof value.getBoundingClientRect !== "function") {
    throw new TypeError(`[Metodo21Scene] ${label} deve essere un elemento DOM`);
  }
  return value;
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
    if (typeof image.decode === "function") {
      image.decode().then(loaded, () => {
        if (image.complete) failed();
      });
    }
  });
}
async function waitForSceneResources(root, { signal } = {}) {
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
function actorLayers({ layout, motion, reveal, content = reveal }) {
  const layers = {
    layout: element(layout, "layout"),
    motion: element(motion, "motion"),
    reveal: element(reveal, "reveal"),
    content: element(content, "content")
  };
  if (layers.layout === layers.motion) {
    throw new Error("[Metodo21Scene] layout e motion devono essere nodi distinti: la posizione strutturale non condivide transform con la coreografia");
  }
  if (!layers.layout.contains(layers.motion) || !layers.motion.contains(layers.reveal) || !layers.reveal.contains(layers.content)) {
    throw new Error("[Metodo21Scene] gerarchia layer non valida: layout > motion > reveal > content");
  }
  return Object.freeze(layers);
}
function claimActorLayers(scope, layers) {
  if (!scope || typeof scope.claim !== "function") throw new TypeError("[Metodo21Scene] scope SiteScenes mancante");
  scope.claim(layers.motion, "transform");
  scope.claim(layers.reveal, ["clip-path", "opacity", "visibility"]);
  return layers;
}

// assets/js/scenografie/scena-001.js
var pathCoordinates = [
  [{ x: -800, y: -400 }, { x: -200, y: -300 }, { x: 0, y: 0 }],
  [{ x: 800, y: -400 }, { x: 200, y: -300 }, { x: 0, y: 0 }],
  [{ x: -800, y: 400 }, { x: -200, y: 300 }, { x: 0, y: 0 }],
  [{ x: 800, y: 400 }, { x: 200, y: 300 }, { x: 0, y: 0 }]
];
function preparaLayerAttore(scope, specifica) {
  return claimActorLayers(scope, actorLayers(specifica));
}

// assets/js/meccaniche/01-codrops-sticky-grid-scroll-main.js
var codrops_sticky_grid_scroll_main_exports = {};
__export(codrops_sticky_grid_scroll_main_exports, {
  buildGridTimeline: () => buildGridTimeline,
  implementationStatus: () => implementationStatus,
  materialDefinition: () => materialDefinition
});
var materialDefinition = Object.freeze({
  "slug": "codrops-sticky-grid-scroll-main",
  "role": "Componente",
  "sourceRoot": "MOTION_COMPONENTE/ARCHIVIO/codrops-sticky-grid-scroll-main"
});
function buildGridTimeline({ scope, images, textBlock }) {
  const { gsap } = scope;
  const tl = gsap.timeline();
  const initialPositions = [
    { xPercent: -55, yPercent: -55, scale: 1 },
    { xPercent: 55, yPercent: -55, scale: 1 },
    { xPercent: -55, yPercent: 55, scale: 1 },
    { xPercent: 55, yPercent: 55, scale: 1 }
  ];
  const expandedPositions = [
    { xPercent: -150, yPercent: -100, scale: 1.2 },
    { xPercent: 150, yPercent: -100, scale: 1.2 },
    { xPercent: -150, yPercent: 100, scale: 1.2 },
    { xPercent: 150, yPercent: 100, scale: 1.2 }
  ];
  images.forEach((img, i) => {
    gsap.set(img.layout, initialPositions[i]);
  });
  images.forEach((img, i) => {
    tl.to(img.layout, {
      xPercent: expandedPositions[i].xPercent,
      yPercent: expandedPositions[i].yPercent,
      scale: expandedPositions[i].scale,
      ease: "power2.inOut"
    }, 0);
  });
  tl.fromTo(
    textBlock,
    { autoAlpha: 0, scale: 0.8 },
    { autoAlpha: 1, scale: 1, ease: "power2.out" },
    0.2
    // start slightly after expansion begins
  );
  return tl;
}
var implementationStatus = "implemented";

// assets/js/meccaniche/02-codrops-motion-path-transition-main-2.js
var codrops_motion_path_transition_main_2_exports = {};
__export(codrops_motion_path_transition_main_2_exports, {
  buildIntroPathTimeline: () => buildIntroPathTimeline,
  implementationStatus: () => implementationStatus2,
  materialDefinition: () => materialDefinition2
});
var materialDefinition2 = Object.freeze({
  "slug": "codrops-motion-path-transition-main-2",
  "role": "Seme",
  "sourceRoot": "MOTION_COMPONENTE/ARCHIVIO/codrops-motion-path-transition-main-2"
});
function buildIntroPathTimeline({ scope, images, pathData }) {
  const { gsap } = scope;
  const tl = gsap.timeline();
  images.forEach((img, i) => {
    gsap.set(img.motion, { autoAlpha: 0 });
    tl.to(img.motion, {
      autoAlpha: 1,
      duration: 0.5,
      ease: "none"
    }, i * 0.1);
    tl.from(img.motion, {
      motionPath: {
        path: pathData[i],
        alignOrigin: [0.5, 0.5]
      },
      duration: 1.5,
      ease: "power2.out"
    }, i * 0.1);
  });
  return tl;
}
var implementationStatus2 = "implemented";

// assets/js/meccaniche/03-rotatingonscrollanimations-main.js
var rotatingonscrollanimations_main_exports = {};
__export(rotatingonscrollanimations_main_exports, {
  buildRotationEffect: () => buildRotationEffect,
  implementationStatus: () => implementationStatus3,
  materialDefinition: () => materialDefinition3
});
var materialDefinition3 = Object.freeze({
  "slug": "rotatingonscrollanimations-main",
  "role": "Seme",
  "sourceRoot": "MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main"
});
function buildRotationEffect({ scope, images, triggerElement }) {
  const { gsap, ScrollTrigger } = scope;
  const items = images.map((img, i) => {
    const maxRot = (i % 2 === 0 ? 1 : -1) * gsap.utils.random(15, 30);
    return {
      element: img.content,
      setter: gsap.quickSetter(img.content, "rotation", "deg"),
      maxRotation: maxRot
    };
  });
  const st = ScrollTrigger.create({
    trigger: triggerElement,
    start: "top top",
    end: "+=200%",
    onUpdate: (self) => {
      const progress = self.progress;
      items.forEach((item) => {
        const currentRot = gsap.utils.interpolate(0, item.maxRotation, progress);
        item.setter(currentRot);
      });
    }
  });
  return st;
}
var implementationStatus3 = "implemented";

// assets/js/scene/scena-001.js
var availableMaterials = Object.freeze({
  "codrops-sticky-grid-scroll-main": codrops_sticky_grid_scroll_main_exports,
  "codrops-motion-path-transition-main-2": codrops_motion_path_transition_main_2_exports,
  "rotatingonscrollanimations-main": rotatingonscrollanimations_main_exports
});
var implementationStatus4 = "implemented";
var sceneDefinition = {
  id: "site:01-scena-podere",
  label: "scena-podere",
  selector: '[data-m21-root="scene-001"]',
  fallbackIndex: 0,
  dependencies: ["MotionPathPlugin"],
  setup: function(scope) {
    const { gsap, ScrollTrigger } = scope;
    gsap.registerPlugin(window.MotionPathPlugin);
    const textBlock = scope.one(".testi-scena", ["autoAlpha", "scale"]);
    const images = [];
    for (let i = 1; i <= 4; i++) {
      images.push(preparaLayerAttore(scope, {
        layout: scope.root.querySelector(`.layout-${i}`),
        motion: scope.root.querySelector(`.motion-${i}`),
        reveal: scope.root.querySelector(`.reveal-${i}`),
        content: scope.root.querySelector(`.content-${i}`)
      }));
    }
    const masterTl = gsap.timeline();
    const introTl = buildIntroPathTimeline({
      scope,
      images,
      pathData: pathCoordinates
    });
    masterTl.add(introTl, 0);
    const scrollTl = buildGridTimeline({
      scope,
      images,
      textBlock
    });
    scope.pin({
      distance: () => scope.root.offsetHeight * 2,
      trigger: scope.root,
      start: "top top",
      animation: scrollTl,
      scrub: 1,
      pin: true,
      pinSpacing: true
    });
    buildRotationEffect({
      scope,
      images,
      triggerElement: scope.root
    });
    return () => {
    };
  }
};

// assets/js/regia-sito.js
window.SITE_SCENES_READY = MotionKit.ready.then(async (runtime) => {
  if (runtime.reducedMotion) {
    document.documentElement.dataset.motionState = "reduced-motion";
    return { status: "reduced-motion", scenes: [] };
  }
  const sceneRoots = Array.from(document.querySelectorAll("[data-m21-root]"));
  const sceneSlots = [
    { ...sceneDefinition, implementationStatus: implementationStatus4 }
  ];
  if (sceneSlots.some((slot) => slot.implementationStatus !== "implemented" || typeof slot.setup !== "function")) {
    document.documentElement.dataset.motionState = "prepared";
    return { status: "prepared", scenes: [] };
  }
  const failures = [];
  for (const [index, slot] of sceneSlots.entries()) {
    try {
      const root = slot.selector ? document.querySelector(slot.selector) : sceneRoots[slot.fallbackIndex];
      if (!root) throw Error(`Root mancante: ${slot.id} (${slot.selector})`);
      await waitForSceneResources(root);
      await SiteScenes.mountRequired({
        id: slot.id,
        root,
        writes: [],
        requires: { dependencies: slot.dependencies },
        setup: slot.setup
      });
    } catch (error) {
      if (error.name === "AbortError") throw error;
      failures.push(error);
    }
  }
  if (failures.length) throw new AggregateError(failures, "Regia: avvio incompleto");
  document.documentElement.dataset.motionState = "active";
  SiteScenes.requestRefresh();
  return { status: "active", scenes: sceneSlots.map((slot) => slot.id) };
});
window.SITE_SCENES_READY.catch((error) => {
  if (error.name === "AbortError") return;
  document.documentElement.dataset.motionState = "failed";
  console.error("[regia-sito] avvio interrotto", error);
});
//# sourceMappingURL=regia-sito.bundle.js.map
