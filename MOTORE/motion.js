/* Metodo 21 Unificato — bootstrap neutro.
   Infrastruttura soltanto: una Lenis, GSAP/ScrollTrigger coordinati, nessun
   preset artistico, nessun attributo trasformato e nessun default globale. */
(function (global) {
  "use strict";
  if (global.MotionKit) return;

  let resolveReady;
  let rejectReady;
  let destroyed = false;
  const ready = new Promise((resolve, reject) => {
    resolveReady = resolve;
    rejectReady = reject;
  });
  ready.catch(() => {});

  function revealStaticContent() {
    const root = global.document.documentElement;
    root.classList.remove("m-js", "m-motion-active");
    global.document.querySelectorAll('[data-m="preloader"], [data-m="cursor"]').forEach((element) => {
      if (!element.closest("[data-m-skip]")) element.style.display = "none";
    });
    global.document.querySelectorAll("[data-m], [data-motion-text], [data-reveal], [data-reveal-item]").forEach((element) => {
      element.style.removeProperty("visibility");
      element.style.removeProperty("opacity");
      element.style.removeProperty("transform");
      element.style.removeProperty("filter");
      element.style.removeProperty("clip-path");
    });
  }

  const plugins = Object.freeze({
    async ensure(names, id = "scena") {
      const dependencies = Array.isArray(names) ? names : [names];
      return global.SiteScenes.loadDependencies({ id, dependencies });
    },
  });

  const api = {
    ready,
    plugins,
    get reducedMotion() {
      return global.matchMedia("(prefers-reduced-motion: reduce)").matches;
    },
    get lenis() {
      return global.__mLenis || null;
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      global.SiteScenes?.dispose();
      revealStaticContent();
    },
  };
  global.MotionKit = Object.freeze(api);

  async function boot() {
    if (global.document.readyState === "loading") {
      await new Promise((resolve) => global.document.addEventListener("DOMContentLoaded", resolve, { once: true }));
    }
    if (global.document.fonts?.ready) await global.document.fonts.ready;
    if (destroyed) return;

    const scenes = global.SiteScenes;
    if (!scenes) throw new Error("[MotionKit] regia-coordinatore.js non caricato");
    scenes.init();

    const reducedMotion = global.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gsap = global.gsap || null;
    const ScrollTrigger = global.ScrollTrigger || null;
    if (gsap && ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    if (reducedMotion || !gsap) {
      scenes.configureScroll({ enabled: false });
      revealStaticContent();
      return { reducedMotion: true, gsap, ScrollTrigger, lenis: null };
    }

    const config = Object.assign({ lenis: true, scroll: {} }, global.MOTION_CONFIG || {});
    const lenis = scenes.configureScroll(Object.assign({
      enabled: config.lenis !== false,
      options: { lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.9, anchors: true },
    }, config.scroll || {}));
    global.document.documentElement.classList.remove("m-js");
    scenes.requestRefresh();
    return { reducedMotion: false, gsap, ScrollTrigger, lenis };
  }

  boot().then(resolveReady, (error) => {
    revealStaticContent();
    rejectReady(error);
    global.console?.error?.("[MotionKit] avvio fallito", error);
  });
})(window);
