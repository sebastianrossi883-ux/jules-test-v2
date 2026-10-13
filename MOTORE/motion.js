/* Metodo 21 Unificato — bootstrap neutro.
   Infrastruttura soltanto: una Lenis, GSAP/ScrollTrigger coordinati, nessun
   preset artistico, nessun attributo trasformato e nessun default globale. */
(function (global) {
  "use strict";
  if (global.MotionKit) return;

  let resolveReady;
  let rejectReady;
  let destroyed = false;
  let readySettled = false;
  let cancelBoot;
  let releaseDOMReady = null;
  const preference = global.matchMedia("(prefers-reduced-motion: reduce)");
  const cancelled = new Promise((_, reject) => { cancelBoot = reject; });
  cancelled.catch(() => {});
  const ready = new Promise((resolve, reject) => {
    resolveReady = (value) => {
      if (readySettled) return;
      readySettled = true;
      resolve(value);
    };
    rejectReady = (error) => {
      if (readySettled) return;
      readySettled = true;
      reject(error);
    };
  });
  ready.catch(() => {});

  function abortError() {
    const error = new Error("[MotionKit] avvio o visita annullati");
    error.name = "AbortError";
    return error;
  }
  function assertAlive() {
    if (destroyed) throw abortError();
  }
  async function waitFor(promise) {
    assertAlive();
    await Promise.race([promise, cancelled]);
    assertAlive();
  }

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
      assertAlive();
      const dependencies = Array.isArray(names) ? names : [names];
      const loaded = await global.SiteScenes.loadDependencies({ id, dependencies });
      assertAlive();
      return loaded;
    },
  });

  const api = {
    ready,
    plugins,
    get reducedMotion() {
      return preference.matches;
    },
    get lenis() {
      return global.__mLenis || null;
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      const error = abortError();
      rejectReady(error);
      cancelBoot(error);
      releaseDOMReady?.();
      if (preference.removeEventListener) preference.removeEventListener("change", onPreferenceChange);
      else preference.removeListener?.(onPreferenceChange);
      try { global.SiteScenes?.dispose(); }
      finally { revealStaticContent(); }
    },
  };
  global.MotionKit = Object.freeze(api);

  function onPreferenceChange(event) {
    if (!event.matches) return;
    try { api.destroy(); }
    catch (error) { global.console?.error?.("[MotionKit] arresto reduced motion", error); }
  }
  if (preference.addEventListener) preference.addEventListener("change", onPreferenceChange);
  else preference.addListener?.(onPreferenceChange);

  async function boot() {
    if (global.document.readyState === "loading") {
      const domReady = new Promise((resolve) => {
        const onReady = () => { releaseDOMReady(); resolve(); };
        releaseDOMReady = () => global.document.removeEventListener("DOMContentLoaded", onReady);
        global.document.addEventListener("DOMContentLoaded", onReady, { once: true });
      });
      try { await waitFor(domReady); }
      finally { releaseDOMReady?.(); releaseDOMReady = null; }
    }
    if (!preference.matches && global.document.fonts?.ready) await waitFor(global.document.fonts.ready);
    assertAlive();

    const scenes = global.SiteScenes;
    if (!scenes) throw new Error("[MotionKit] regia-coordinatore.js non caricato");
    scenes.init();

    const reducedMotion = preference.matches;
    const gsap = global.gsap || null;
    const ScrollTrigger = global.ScrollTrigger || null;
    if (gsap && ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    if (reducedMotion) {
      scenes.configureScroll({ enabled: false });
      revealStaticContent();
      return { reducedMotion: true, gsap, ScrollTrigger, lenis: null };
    }

    const config = Object.assign({ lenis: true, scroll: {} }, global.MOTION_CONFIG || {});
    if (!gsap) throw new Error("[MotionKit] GSAP obbligatorio non caricato");
    if (!ScrollTrigger) throw new Error("[MotionKit] ScrollTrigger obbligatorio non caricato");
    const scrollEnabled = config.scroll?.enabled ?? (config.lenis !== false);
    if (scrollEnabled && !global.Lenis && !config.scroll?.instance && !global.__mLenis) {
      throw new Error("[MotionKit] Lenis attiva ma non caricata");
    }
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
    if (error.name !== "AbortError") global.console?.error?.("[MotionKit] avvio fallito", error);
  });
})(window);
