/* ==========================================================================
   MOTION KIT — motore unico
   Dipendenze: GSAP + ScrollTrigger (+ Lenis opzionale). Nessun plugin a pagamento.
   Lo split di righe/parole/caratteri è interno: non serve SplitText.

   R2: i gesti storici convivono con coreografie GSAP originali.
   SiteScenes coordina i proprietari e il lifecycle di ENTRAMBI.
   Le sorgenti dei materiali sono separate in MOTION_COMPONENTE/ARCHIVIO.
   ========================================================================== */

(function () {
  "use strict";

  if (window.MotionKit) return;
  var ids = [], textScenes = new Map(), destroyed = false;
  var resolveReady, rejectReady;
  var ready = new Promise(function (resolve, reject) { resolveReady = resolve; rejectReady = reject; });
  ready.catch(function () {}); // i chiamanti possono comunque await/reject
  window.MotionKit = Object.freeze({ ready: ready, destroy: function () {
    destroyed = true;
    var first;
    ids.slice().reverse().forEach(function (id) {
      try { window.SiteScenes.unmount(id); } catch (e) { first = first || e; }
    });
    ids.length = 0;
    if (first) throw first;
  }});
  async function boot() {
  if (document.readyState === 'loading') await new Promise(function (resolve) {
    document.addEventListener('DOMContentLoaded', resolve, { once: true });
  });
  if (document.fonts && document.fonts.ready) await document.fonts.ready;
  if (destroyed) return;
  var root = document.documentElement;
  var CFG = Object.assign(
    {
      auto: false,         // regia esplicita, niente contaminazione delle demo
      lenis: true,         // smooth scroll
      intensity: "medium", // subtle | medium | hero  → scala durate e distanze
      pinOnMobile: false,
      debug: false,
    },
    window.MOTION_CONFIG || {}
  );

  function unlock() {
    root.classList.remove("m-js");
  }
  function staticMode() {
    document.querySelectorAll('[data-m="preloader"], [data-m="cursor"]').forEach(function (el) {
      if (!el.closest('[data-m-skip]')) el.style.display = 'none';
    });
    unlock();
  }

  // ---- Guardie di uscita -------------------------------------------------
  if (typeof window.gsap === "undefined") {
    console.warn("[motion] GSAP non trovato: sito servito statico, nessuna animazione.");
    return staticMode();
  }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return staticMode();
  }

  window.__mAlive = true; // il failsafe inline nel <head> sa che il motore è vivo
  var gsap = window.gsap;
  var ST = window.ScrollTrigger;
  if (ST) gsap.registerPlugin(ST);

  var K = { subtle: 0.6, medium: 1, hero: 1.4 }[CFG.intensity] || 1;
  // Le durate seguono l'intensità: `subtle` diventa scattante (0.8s, cruscotto operativo),
  // `hero` si allarga. Prima l'intensità muoveva solo le distanze: mezza regia.
  var D = { subtle: 0.8, medium: 1, hero: 1.15 }[CFG.intensity] || 1;

  gsap.defaults({ ease: "power3.out", duration: 0.9 * D }); // token SKILL_01

  // Le firme legate al viewport o al puntatore si armano e si disarmano da sole.
  var Scenes = window.SiteScenes;
  if (!Scenes) throw Error('[motion] caricare regia-coordinatore.js PRIMA del motore');
  if (CFG.managedRefresh !== false) Scenes.init();
  function mount(id, el, setup) {
    Scenes.mount({ id: id, root: el, setup: setup });
    if (ids.indexOf(id) < 0) ids.push(id);
  }
  var DESKTOP = "(min-width: 769px)";
  var FINE = "(hover: hover) and (pointer: fine)";

  // =========================================================================
  // 1. SMOOTH SCROLL — una sola istanza, mai due
  // =========================================================================
  Scenes.configureScroll(Object.assign({ enabled: CFG.lenis,
    options: { lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.9, anchors: true }
  }, CFG.scroll || {}));

  // =========================================================================
  // 2. SPLIT TIPOGRAFICO INTERNO
  //    Ogni unità va dentro una maschera overflow:hidden, così il testo
  //    entra "da sotto la riga" invece di sfumare banalmente.
  //    Usa textContent solo dopo aver verificato che non ci sia markup inline.
  //    Per titoli ricchi serve uno split custom che preservi il DOM.
  // =========================================================================
  function makeUnit(txt) {
    var mask = document.createElement("span");
    mask.className = "m-mask";
    mask.setAttribute("aria-hidden", "true"); // le maschere non si leggono
    var unit = document.createElement("span");
    unit.className = "m-unit";
    unit.textContent = txt;
    mask.appendChild(unit);
    return mask;
  }

  // Testo con markup in linea: ogni parola viene avvolta dove si trova, <em>/<strong>/<br> restano.
  // Le righe si ricavano dalla posizione delle parole; ogni unita' porta l'indice della sua riga.
  function splitInline(el, mode) {
    if (el.__mSplit) return el.__mSplit;
    var text = (el.textContent || "").replace(/\s+/g, " ").trim();
    if (!text) return [];
    el.__mHTML = el.innerHTML;
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", text);
    var units = [];
    (function walk(node) {
      Array.from(node.childNodes).forEach(function (child) {
        if (child.nodeType === 1) { walk(child); return; }
        if (child.nodeType !== 3 || !child.textContent) return;
        var frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (!part.trim()) { frag.appendChild(document.createTextNode(" ")); return; }
          var m = makeUnit(part);
          frag.appendChild(m);
          units.push(m.firstChild);
        });
        child.parentNode.replaceChild(frag, child);
      });
    })(el);
    var last = null, line = -1;
    units.forEach(function (u) {
      var top = Math.round(u.parentNode.getBoundingClientRect().top);
      if (last === null || Math.abs(top - last) > 2) { line++; last = top; }
      u.__mLine = line;
    });
    el.__mSplit = units;
    return units;
  }

  function split(el, mode) {
    if (el.__mSplit) return el.__mSplit;
    var text = (el.textContent || "").replace(/\s+/g, " ").trim();
    if (!text) return [];
    el.__mHTML = el.innerHTML;
    // Il testo intero resta leggibile agli screen reader: le unità sono aria-hidden.
    if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", text);
    el.innerHTML = "";

    if (mode === "chars") {
      var chars = [];
      var charsOfText = typeof Intl.Segmenter === 'function'
        ? Array.from(new Intl.Segmenter(document.documentElement.lang || undefined, { granularity: 'grapheme' }).segment(text), function (entry) { return entry.segment; })
        : Array.from(text);
      charsOfText.forEach(function (c) {
        if (c === " ") return el.appendChild(document.createTextNode(" "));
        var m = makeUnit(c);
        el.appendChild(m);
        chars.push(m.firstChild);
      });
      el.__mSplit = chars;
      return chars;
    }

    // words → base anche per il calcolo delle righe
    var wordMasks = [];
    text.split(" ").forEach(function (w, i) {
      if (i) el.appendChild(document.createTextNode(" "));
      var m = makeUnit(w);
      el.appendChild(m);
      wordMasks.push(m);
    });

    if (mode === "words") {
      el.__mSplit = wordMasks.map(function (m) { return m.firstChild; });
      return el.__mSplit;
    }

    // lines: raggruppo le parole per offsetTop reale dopo il wrapping
    var groups = [];
    var last = null;
    wordMasks.forEach(function (m) {
      var top = Math.round(m.offsetTop);
      if (last === null || Math.abs(top - last) > 2) { groups.push([]); last = top; }
      groups[groups.length - 1].push(m.firstChild.textContent);
    });

    el.innerHTML = "";
    var lines = [];
    groups.forEach(function (words) {
      var wrap = document.createElement("span");
      wrap.className = "m-line m-mask";
      wrap.setAttribute("aria-hidden", "true");
      var inner = document.createElement("span");
      inner.className = "m-unit";
      inner.textContent = words.join(" ");
      wrap.appendChild(inner);
      el.appendChild(wrap);
      lines.push(inner);
    });
    el.__mSplit = lines;
    return lines;
  }

  // =========================================================================
  // 3. AUTO-TARGETING
  //    Risponde a "voglio che si muova ogni scritta e ogni componente"
  //    senza che nessuno debba taggare 400 elementi a mano.
  //    Non tocca mai chi ha già un data-m: la scelta esplicita vince sempre.
  // =========================================================================
  function tag(el, value, split) {
    // chi ha già un data-m, chi è marcato data-m-skip e i figli di uno
    // stagger restano fuori: niente doppie animazioni sullo stesso elemento.
    if (el.hasAttribute("data-m")) return;
    if (el.closest("[data-m-skip]") || el.closest('[data-m="stagger"]')) return;
    el.setAttribute("data-m", value);
    if (split) el.dataset.split = split;
  }

  // IL VOCABOLARIO DELLA SKILL E' VIVO — 7 settembre 2026, misurato.
  // La skill cinematic-gsap-lenis-motion-system, che viene consegnata nella
  // repo e che il prompt chiama obbligatoria, insegna `data-motion-text="lines"`
  // e `"words"`. Questo motore non lo leggeva: zero occorrenze. Una sessione
  // ha seguito la skill alla lettera e ha prodotto SEI ScrollTrigger e una
  // pagina che il collaudo ha giudicato vuota, mentre quella che aveva usato
  // `data-m` ne aveva ventuno. Stessa repo, stesso giorno: cambiava solo quale
  // dei due vocabolari aveva seguito.
  // La semantica e' identica - lines/words/chars da una parte, data-split
  // dall'altra - quindi invece di vietare quello della skill lo si traduce.
  // Cosi' qualunque dei due venga scritto, la pagina si anima.
  document.querySelectorAll("[data-motion-text]").forEach(function (el) {
    if (el.hasAttribute("data-m")) return;          // un data-m esplicito vince
    var modo = (el.getAttribute("data-motion-text") || "").trim().toLowerCase();
    el.setAttribute("data-m", "text");
    el.dataset.split = (modo === "words" || modo === "chars") ? modo : "lines";
  });

  if (CFG.auto) {
    document.querySelectorAll("h1, h2").forEach(function (el) { tag(el, "text", "lines"); });
    document.querySelectorAll("h3, h4, blockquote, li").forEach(function (el) { tag(el, "text", "words"); });
    document.querySelectorAll("p, .btn, button, a.cta").forEach(function (el) { tag(el, "fade"); });

    // I media si taggano sul GENITORE, mai sull'<img>: la maschera deve
    // stare fuori, altrimenti l'immagine si deforma.
    document.querySelectorAll("img, video").forEach(function (media) {
      var p = media.parentElement;
      if (!p || p.children.length !== 1) return;
      tag(p, "reveal");
    });
  }

  // =========================================================================
  // 4. LE 11 FIRME
  // =========================================================================
  function inView(el, extra) {
    if (!el.nodeType) el = el[0] && (el[0].closest('[data-m]') || el[0]);
    return Object.assign({ id: el && el.__mSceneId, trigger: el, start: "top 82%", once: true }, extra || {}); // token SKILL_01
  }

  // I 5 preset di ingresso della SKILL_01. `data-preset` sceglie, il default è fade-up.
  var PRESET = {
    "fade-up":     { y: 34 * K, autoAlpha: 0 },
    "blur-in":     { y: 18 * K, autoAlpha: 0, filter: "blur(10px)" },
    "scale":       { scale: 0.96, autoAlpha: 0 },
    "slide-left":  { x: 48 * K, autoAlpha: 0 },
    "slide-right": { x: -48 * K, autoAlpha: 0 },
  };

  // Hero: mai ScrollTrigger sulla prima schermata. Parte al load, da sola.
  var heroTL;
  mount('motion:hero', root, function (scope) {
    root.classList.add('m-motion-active');
    scope.defer(function () { root.classList.remove('m-motion-active'); });
    heroTL = gsap.timeline({ paused: true, delay: 0.25 });
    return function () { heroTL.kill(); };
  });
  var heroCount = 0;

  function play(el, vars, hero, slot) {
    if (hero) { heroTL.from(el, vars, slot != null ? slot : (heroCount++ ? "-=0.75" : 0)); return heroTL.recent(); }
    return gsap.from(el, Object.assign({}, vars, { scrollTrigger: inView(el) }));
  }

  function splitOwned(el, mode, scope) {
    var inline = el.children.length > 0;
    // Un link o un controllo dentro il testo perderebbe il suo nome accessibile: il blocco entra intero.
    if (inline && el.querySelector('a, button, input, select, textarea, [tabindex]')) return null;
    scope.claim(el, 'content');
    var oldHTML = el.innerHTML, oldLabel = el.getAttribute('aria-label');
    scope.defer(function () {
      el.innerHTML = oldHTML;
      if (oldLabel === null) el.removeAttribute('aria-label'); else el.setAttribute('aria-label', oldLabel);
      delete el.__mHTML; delete el.__mSplit;
    });
    return inline ? splitInline(el, mode) : split(el, mode);
  }
  function claimMany(scope, elements, props) {
    Array.from(elements).forEach(function (el) { scope.claim(el, props); });
  }
  function freeChild(el) { return !el.closest('[data-m-skip]') && !el.hasAttribute('data-m'); }
  function freeTarget(el) { return el && !el.closest('[data-m-skip]'); }
  function innerMedia(el) { return Array.from(el.querySelectorAll('img, video')).find(freeTarget) || null; }
  function buildText(el, hero, scope, progress) {
    var mode = el.dataset.split || "lines";
    var units = splitOwned(el, mode, scope);
    if (units === null) {
      scope.claim(el, ['transform', 'autoAlpha']);
      return play(el, Object.assign({ duration: 0.9 * D }, PRESET["fade-up"]), hero, progress && progress.slot);
    }
    scope.claim(el, 'opacity');
    claimMany(scope, units, ['transform', 'autoAlpha', 'filter']);
    gsap.set(el, { opacity: 1 });
    if (!units.length) return;
    var stagger = { lines: 0.11, words: 0.055, chars: 0.022 }[mode] * (hero ? 1.2 : 1);
    if (mode === "lines" && units.length && units[0].__mLine != null) {
      var perLine = stagger;
      stagger = function (i, target) { return (target.__mLine || 0) * perLine; };
    }
    var tween = play(units, {
      yPercent: 110,
      autoAlpha: 0,
      filter: mode === "chars" ? "blur(0px)" : "blur(8px)", // blur solo su righe e parole
      duration: (mode === "lines" ? 1 : 0.9) * D * (hero ? 1.15 : 1),
      ease: "power4.out",
      stagger: stagger,
    }, hero, progress && progress.slot);
    if (progress != null) tween.progress(progress.value);
    return tween;
  }

  function safeGesture(el, id, previousProgress) {
    try { mountGesture(el, id, previousProgress); }
    catch (error) { console.error('[motion] gesto saltato (' + id + '):', error && error.message ? error.message : error, el); }
  }

  function mountGesture(el, id, previousProgress) {
    var kind = el.getAttribute('data-m');
    var hero = !!el.closest('[data-m-hero]');
    mount(id, el, function (scope) {
    el.__mSceneId = id;
    scope.defer(function () { delete el.__mSceneId; });
    switch (kind) {
      // ---- TIPOGRAFIA -----------------------------------------------------
      case "text":
        var textTween = buildText(el, hero, scope, previousProgress);
        var textKey = el.clientWidth + '|' + getComputedStyle(el).font;
        textScenes.set(el, id);
        scope.defer(function () { textScenes.delete(el); });
        if ((el.dataset.split || 'lines') === 'lines') scope.measure(function () {
          var nextKey = el.clientWidth + '|' + getComputedStyle(el).font;
          if (nextKey === textKey || !el.isConnected) return;
          var at = { value: textTween ? textTween.progress() : 1, slot: textTween ? textTween.startTime() : 0 };
          Scenes.unmount(id);
          safeGesture(el, id, at);
        });
        break;

      case "text-focus": // titolo che va a fuoco: da sfocato a nitido
        scope.claim(el, ['opacity', 'filter']);
        if (hero) { // nella hero entra in coreografia, non parte da solo
          gsap.set(el, { opacity: 1, filter: "blur(0px)" });
          play(el, { opacity: 0.55, filter: "blur(12px)", duration: 1, ease: "power2.out" }, true);
        } else {
          gsap.set(el, { opacity: 0.55, filter: "blur(12px)" });
          var focusScrub = el.dataset.scrub; // Melius mette a fuoco col dito sullo scroll
          gsap.to(el, { opacity: 1, filter: "blur(0px)", duration: 1, ease: "power2.out",
            scrollTrigger: focusScrub
              ? { id: id, trigger: el, start: "top 85%", end: "bottom center", scrub: Number(focusScrub) || 0.5 }
              : inView(el, { start: "top 88%" }) });
        }
        break;

      // ---- BLOCCHI --------------------------------------------------------
      case "fade":
        scope.claim(el, ['transform', 'autoAlpha']);
        if (el.dataset.preset === 'blur-in') scope.claim(el, 'filter');
        gsap.set(el, { opacity: 1 });
        play(el, Object.assign({ duration: 0.85 }, PRESET[el.dataset.preset] || PRESET["fade-up"]), hero);
        break;

      case "stagger": // il contenitore orchestra i figli, ritmo di lettura
        
        var kids = Array.from(el.children).filter(freeChild);
        claimMany(scope, kids, ['transform', 'autoAlpha', 'filter']);
        gsap.set(kids, { opacity: 1 });
        gsap.from(kids, {
          y: 36 * K, autoAlpha: 0, filter: "blur(8px)",
          duration: 0.95 * D, ease: "power4.out", stagger: 0.075,
          scrollTrigger: inView(el),
        });
        break;

      // ---- MEDIA ----------------------------------------------------------
      case "reveal": // sipario clip-path + micro-scala interna
        scope.claim(el, ['opacity', 'clipPath']);
        gsap.set(el, { opacity: 1 });
        var inner = innerMedia(el);
        if (inner) scope.claim(inner, ['transform', 'autoAlpha']);
        var tl = gsap.timeline({ paused: hero, scrollTrigger: hero ? undefined : inView(el, { start: "top 88%" }) });
        tl.fromTo(el,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1 * D, ease: "power4.out" });
        if (inner) tl.fromTo(inner,
          { scale: 1.08, autoAlpha: 0.75 },
          { scale: 1, autoAlpha: 1, duration: 1.2 * D, ease: "power4.out" }, 0);
        if (hero) heroTL.add(tl, 0);
        break;

      case "parallax": // media e contenitore a velocità diverse
        var pImg = innerMedia(el) || (freeTarget(el.firstElementChild) ? el.firstElementChild : null);
        if (!pImg || !ST) break;
        scope.claim(pImg, 'transform');
        var pSpeed = Number(el.dataset.speed || 0.18); // token SKILL_01
        gsap.set(pImg, { scale: 1 + pSpeed * 1.2 }); // copre lo scostamento, niente bordi vuoti
        gsap.to(pImg, {
          y: function () { return window.innerHeight * pSpeed * -1; },
          ease: "none",
          scrollTrigger: { id: id, trigger: el, start: "top bottom", end: "bottom top",
            scrub: 1.2, invalidateOnRefresh: true },
        });
        break;

      case "scale": // zoom lento agganciato allo scroll
        if (!ST) break;
        scope.claim(innerMedia(el) || el, 'transform');
        gsap.fromTo(innerMedia(el) || el,
          { scale: 1.14 }, { scale: 1, ease: "none",
            scrollTrigger: { id: id, trigger: el, start: "top bottom", end: "top 20%", scrub: 1.2 } });
        break;

      // ---- SCENA ----------------------------------------------------------
      case "pin": // sezioni a fogli: si inchioda, la prossima le scivola sopra
        if (!ST) break;
        scope.media(CFG.pinOnMobile ? 'all' : DESKTOP, function (local) {
          var next = el.nextElementSibling;
          if (!next) throw Error('[motion] pin a fogli senza scena successiva');
          local.pin({ id: id, trigger: el, distance: function () { return el.offsetHeight; },
            pinSpacing: false, overlapWith: next });
        });
        break;

      case "hrail": // scroll verticale che muove contenuto orizzontale
        if (!ST || !el.firstElementChild) break;
        var railHasDistance = el.firstElementChild.scrollWidth > el.clientWidth;
        scope.measure(function () {
          var nextHasDistance = el.firstElementChild.scrollWidth > el.clientWidth;
          if (nextHasDistance === railHasDistance || !el.isConnected) return;
          Scenes.unmount(id);
          safeGesture(el, id);
        });
        scope.media(DESKTOP, function (local) {
          var track = el.firstElementChild;
          function distance() { return Math.max(0, track.scrollWidth - el.clientWidth); }
          // Track che entra interamente: non esiste una distanza orizzontale da pinnare.
          if (!distance()) return;
          local.claim(track, 'transform');
          var railTween = gsap.to(track, { x: function () { return -distance(); }, ease: 'none', paused: true });
          local.pin({ id: id, trigger: el, distance: function () { return Math.max(1, distance()); },
            animation: railTween, scrub: 1 });
        });
        break;

      case "story": // scena pinnata a pannelli — initStoryScenes della SKILL_01
        if (!ST) break;
        scope.media(DESKTOP, function (local) {
          var panels = el.querySelectorAll('[data-panel]');
          if (!panels.length) return;
          local.claim(el, 'opacity');
          claimMany(local, panels, 'transform');
          gsap.set(el, { opacity: 1 });
          var storyTL = gsap.timeline({ paused: true }).to(panels,
            { yPercent: -100 * (panels.length - 1), ease: 'none' });
          local.pin({ id: id, trigger: el, animation: storyTL, scrub: 1.1,
            distance: function () { return panels.length * window.innerHeight; } });
        });
        break;

      // ---- MICROINTERAZIONI -----------------------------------------------
      case "magnetic":
        scope.media(FINE, function (scope) {
        scope.claim(el, 'transform');
        var strength = Number(el.dataset.magnetic || 0.18); // token SKILL_01, non 0.32
        var mx = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
        var my = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
        scope.listen(el, "pointermove", function (e) {
          var r = el.getBoundingClientRect();
          mx((e.clientX - r.left - r.width / 2) * strength);
          my((e.clientY - r.top - r.height / 2) * strength);
        });
        scope.listen(el, "pointerleave", function () { mx(0); my(0); });
        });
        break;

      case "mouse-parallax": // strati che reagiscono al puntatore — profondità appena percettibile
        scope.media(FINE, function (scope) {
        var layers = Array.from(el.querySelectorAll("[data-depth]")).filter(freeTarget).map(function (layer) {
          scope.claim(layer, 'transform');
          return {
            depth: Number(layer.dataset.depth || 0.04),
            xTo: gsap.quickTo(layer, "x", { duration: 0.8, ease: "power3.out" }),
            yTo: gsap.quickTo(layer, "y", { duration: 0.8, ease: "power3.out" }),
          };
        });
        if (!layers.length) return;
        scope.listen(el, "pointermove", function (e) { // un solo listener per sezione
          var r = el.getBoundingClientRect();
          var dx = e.clientX - r.left - r.width / 2;
          var dy = e.clientY - r.top - r.height / 2;
          layers.forEach(function (l) { l.xTo(dx * l.depth); l.yTo(dy * l.depth); });
        });
        scope.listen(el, "pointerleave", function () {
          layers.forEach(function (l) { l.xTo(0); l.yTo(0); });
        });
        });
        break;

      case "marquee":
        var first = el.firstElementChild;
        if (!first) break;
        scope.claim(el, 'content');
        if (el.children.length === 1) {
          var clone = first.cloneNode(true);
          clone.setAttribute('aria-hidden', 'true');
          clone.querySelectorAll('[id]').forEach(function (node) { node.removeAttribute('id'); });
          clone.removeAttribute('id');
          clone.inert = true;
          el.appendChild(clone);
          scope.defer(function () { clone.remove(); });
        }
        claimMany(scope, el.children, 'transform');
        gsap.to(el.children, {
          xPercent: -100, ease: "none", repeat: -1,
          duration: parseFloat(el.dataset.speed) || 22,
        });
        break;

      case "node": // ingresso meccanico da dashboard — mk-line di Melius
        scope.claim(el, ['transform', 'autoAlpha']);
        gsap.set(el, { opacity: 1 });
        var nodeVars = { y: 40, scale: 0.95, autoAlpha: 0, duration: 0.8, ease: "back.out(1.2)" };
        if (hero) { play(el, nodeVars, true); }
        else {
          gsap.from(el, Object.assign({}, nodeVars, {
            scrollTrigger: { id: id, trigger: el, start: "top 90%",
              toggleActions: "play none none reverse" }, // Melius riavvolge, non resta fermo
          }));
        }
        break;

      case "curtain": // sipario che apre dal centro — da mk-curtain-center (Forme)
        scope.claim(el, ['opacity', 'clipPath']);
        gsap.set(el, { opacity: 1 });
        var curtainTL = gsap.timeline({
          paused: hero,
          scrollTrigger: hero ? undefined : inView(el, { start: "top 88%" }),
        });
        curtainTL.fromTo(el,
          { clipPath: "inset(0% 50% 0% 50%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.25, ease: "expo.inOut" });
        if (hero) heroTL.add(curtainTL, 0);
        break;

      case "cinema": // video che si accende entrando in scena — da mk-cinema (Forme)
        scope.claim(el, 'opacity');
        var vid = Array.from(el.querySelectorAll('video')).find(freeTarget) || (el.tagName === 'VIDEO' ? el : null);
        scope.claim(vid || el, 'transform');
        if (vid) { scope.claim(vid, 'playback'); scope.defer(function () { vid.pause(); }); }
        gsap.set(el, { opacity: 1 });
        if (!ST) { if (vid) vid.play().catch(function () {}); break; }
        ST.create({
          id: id, trigger: el, start: "top 85%", end: "bottom top",
          onEnter: function () { if (vid) vid.play().catch(function () {}); },
          onEnterBack: function () { if (vid) vid.play().catch(function () {}); },
          onLeave: function () { if (vid) vid.pause(); },
          onLeaveBack: function () { if (vid) vid.pause(); },
        });
        gsap.fromTo(vid || el, { scale: 1.12 }, { scale: 1, ease: "none",
          scrollTrigger: { id: id, trigger: el, start: "top bottom", end: "top 25%", scrub: 1.2 } });
        break;

      case "draw": // firma SVG disegnata dallo scroll — da mk-svg-draw (Duo San Felice)
        scope.claim(el, 'opacity');
        if (!ST) break;
        var paths = el.querySelectorAll("path, line, polyline, circle, rect, ellipse");
        if (!paths.length) break;
        gsap.set(el, { opacity: 1 });
        paths.forEach(function (path) {
          var len = typeof path.getTotalLength === "function" ? path.getTotalLength() : 0;
          if (!len) return;
          scope.claim(path, ['strokeDasharray', 'strokeDashoffset', 'fill']);
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, fill: "none" });
          gsap.to(path, {
            strokeDashoffset: 0, ease: "none",
            scrollTrigger: { id: id, trigger: el, start: "top 85%", end: "bottom 55%", scrub: 1 },
          });
        });
        break;

      case "skew": // reazione alla velocità di scroll: il media si inclina
        if (!ST) break;
        scope.media(FINE, function (local) {
        var skewTarget = innerMedia(el) || el;
        local.claim(skewTarget, 'transform');
        var setSkew = gsap.quickTo(skewTarget, "skewY", { duration: 0.5, ease: "power3" });
        ST.create({
          id: id, trigger: el, start: "top bottom", end: "bottom top",
          onUpdate: function (self) { setSkew(gsap.utils.clamp(-7, 7, self.getVelocity() / -320)); },
        });
        });
        break;

      case "hover-media": // lista progetti: l'immagine appare accanto al cursore
        scope.media(FINE, function (scope) {
        var float = document.createElement("div");
        float.className = "m-hover-media";
        var floatImg = document.createElement("img");
        float.appendChild(floatImg);
        scope.portal(float);
        scope.claim(float, ['transform', 'opacity']);
        scope.claim(floatImg, 'src');
        gsap.set(float, { opacity: 0, scale: 0.92, xPercent: -50, yPercent: -50 });
        var hx = gsap.quickTo(float, "x", { duration: 0.55, ease: "power3" });
        var hy = gsap.quickTo(float, "y", { duration: 0.55, ease: "power3" });
        scope.listen(el, "mousemove", function (e) { hx(e.clientX); hy(e.clientY); });
        el.querySelectorAll("[data-media]").forEach(function (item) {
          scope.listen(item, "mouseenter", function () {
            floatImg.src = item.dataset.media;
            gsap.to(float, { opacity: 1, scale: 1, duration: 0.5, overwrite: "auto" });
          });
          scope.listen(item, "mouseleave", function () {
            gsap.to(float, { opacity: 0, scale: 0.92, duration: 0.4, overwrite: "auto" });
          });
        });
        });
        break;

      case "word-scrub": // manifesto che si illumina parola per parola — statement-opacity-scrub
        var wsUnits = splitOwned(el, 'words', scope);
        scope.claim(el, 'opacity');
        claimMany(scope, wsUnits, 'autoAlpha');
        gsap.set(el, { opacity: 1 });
        if (!wsUnits.length || !ST) break;
        gsap.fromTo(wsUnits, { autoAlpha: 0.15 },
          { autoAlpha: 1, ease: "none", stagger: 0.08,
            scrollTrigger: { id: id, trigger: el, start: "top 80%", end: "bottom 55%", scrub: true } });
        break;

      case "monochrome": // la fotografia riprende colore mentre sale — monochrome-resolve
        scope.claim(el, 'opacity');
        gsap.set(el, { opacity: 1 });
        if (!ST) break;
        scope.claim(innerMedia(el) || el, 'filter');
        gsap.fromTo(innerMedia(el) || el,
          { filter: "grayscale(1)" },
          { filter: "grayscale(0)", ease: "none",
            scrollTrigger: { id: id, trigger: el, start: "top 80%", end: "top 30%", scrub: 1 } });
        break;

      case "outline-fill": // titolo che passa da contorno a pieno — outline-to-fill-type
        scope.claim(el, ['opacity', 'color']);
        var fillColor = getComputedStyle(el).color;
        gsap.set(el, { opacity: 1 });
        if (!ST) break;
        gsap.fromTo(el, { color: "rgba(0,0,0,0)" },
          { color: fillColor, ease: "none",
            scrollTrigger: { id: id, trigger: el, start: "top 85%", end: "top 45%", scrub: 1 } });
        break;

      case "scatter-stack": // le card si appoggiano storte, come un mazzo sul tavolo
        var scards = Array.from(el.children).filter(freeChild);
        claimMany(scope, scards, ['transform', 'autoAlpha']);
        if (!scards.length) break;
        gsap.set(scards, { opacity: 1 });
        gsap.from(scards, {
          autoAlpha: 0, y: 40 * K,
          rotation: function () { return gsap.utils.random(-4, 4); },
          duration: 0.9, ease: "power3.out", stagger: 0.075,
          scrollTrigger: inView(el),
        });
        break;

      case "typewriter": // il testo cresce da vuoto, carattere per carattere
        var twUnits = splitOwned(el, 'chars', scope);
        scope.claim(el, 'opacity');
        claimMany(scope, twUnits, 'autoAlpha');
        gsap.set(el, { opacity: 1 });
        if (!twUnits.length) break;
        play(twUnits, { autoAlpha: 0, duration: 0.01, ease: "none", stagger: 0.03 }, hero);
        break;

      case "count":
        scope.claim(el, 'content');
        if (el.children.length) throw Error('[motion] count richiede un nodo testuale senza markup inline');
        var countText = el.textContent;
        scope.defer(function () { el.textContent = countText; });
        var target = Number(el.dataset.to != null ? el.dataset.to : countText.trim());
        if (!Number.isFinite(target) || !countText.trim()) throw Error('[motion] count: specificare data-to numerico per contenuti formattati');
        var decimals = Math.min(20, (String(target).split('.')[1] || '').length);
        var obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 1.8, ease: "power2.out",
          scrollTrigger: inView(el),
          onUpdate: function () { el.textContent = obj.v.toLocaleString(el.dataset.locale || document.documentElement.lang || 'it-IT', { maximumFractionDigits: decimals }); },
          onComplete: function () { el.textContent = countText; },
        });
        break;
    }
    return function () {};
    });
  }
  var gestures = new Set(['text','text-focus','fade','stagger','reveal','parallax','scale','pin','hrail','story',
    'magnetic','mouse-parallax','marquee','node','curtain','cinema','draw','skew','hover-media','word-scrub',
    'monochrome','outline-fill','scatter-stack','typewriter','count']);
  document.querySelectorAll('[data-m]').forEach(function (el, i) {
    if (el.closest('[data-m-skip]') || !gestures.has(el.dataset.m)) return;
    safeGesture(el, 'motion:g:' + i);
  });

  // =========================================================================
  // 5. CURSORE CUSTOM — uno solo, con lag di 0.35s (token SKILL_01)
  // =========================================================================
  var cursorEl = document.querySelector('[data-m="cursor"]');
  if (cursorEl && !cursorEl.closest('[data-m-skip]')) mount('motion:cursor', cursorEl, function (outer) {
    outer.own('custom-cursor');
    outer.media(FINE, function (scope) {
    scope.claim(cursorEl, ['transform', 'opacity']);
    var cursorTxt = cursorEl.querySelector("[data-cursor-text]");
    if (cursorTxt) scope.claim(cursorTxt, 'content');
    gsap.set(cursorEl, { xPercent: -50, yPercent: -50, opacity: 0 });
    var cx = gsap.quickTo(cursorEl, "x", { duration: 0.35, ease: "power3" });
    var cy = gsap.quickTo(cursorEl, "y", { duration: 0.35, ease: "power3" });
    scope.listen(document, "pointermove", function (e) {
      cx(e.clientX); cy(e.clientY);
      gsap.to(cursorEl, { opacity: 1, duration: 0.3, overwrite: "auto" });
    });
    document.querySelectorAll("a, button, [data-cursor-label]").forEach(function (t) {
      if (cursorEl.contains(t)) return;
      scope.listen(t, "pointerenter", function () {
        gsap.to(cursorEl, { scale: t.dataset.cursorLabel ? 2.6 : 1.75, duration: 0.35, ease: "power3.out", overwrite: "auto" });
        if (cursorTxt && t.dataset.cursorLabel) cursorTxt.textContent = t.dataset.cursorLabel;
      });
      scope.listen(t, "pointerleave", function () {
        gsap.to(cursorEl, { scale: 1, duration: 0.35, ease: "power3.out", overwrite: "auto" });
        if (cursorTxt) cursorTxt.textContent = "";
      });
    });
    });
    return function () {};
  });

  // =========================================================================
  // 6. AVVIO
  // =========================================================================
  unlock(); // gli stati iniziali ora li tiene GSAP, la guardia CSS può cadere

  // Un elemento troppo vicino al fondo pagina ha uno start oltre lo scroll massimo:
  // il suo trigger non scatta MAI e resta invisibile per sempre. Tipico dei footer.
  // Dopo ogni refresh completo quelli irraggiungibili.
  function rescueUnreachable() {
    if (!ST) return;
    var max = ST.maxScroll(window);
    ST.getAll().forEach(function (st) {
      if (!st.animation || st.vars.scrub) return;
      if (typeof st.vars.id !== 'string' || !st.vars.id.startsWith('motion:g:')) return;
      if (st.start > max + 1) st.animation.progress(1);
    });
  }

  var pre = document.querySelector('[data-m="preloader"]:not([data-m-skip])');
  if (pre && pre.closest('[data-m-skip]')) pre = null;

  mount('motion:intro', pre || root, function (scope) {
    scope.afterRefresh(rescueUnreachable);
    var release;
    if (pre) {
      scope.own('preloader');
      scope.claim(pre, ['transform', 'display']);
      release = scope.lockScroll(); // l'overlay blocca gia mentre gli asset caricano
    }
    function intro() {
      Scenes.requestRefresh();
      if (!pre) return heroTL.play();
      var counter = pre.querySelector('[data-m-counter]');
      if (counter) scope.claim(counter, 'content');
      var n = { v: 0 };
      var preTL = gsap.timeline({ onComplete: scope.safe(function () {
        release(); heroTL.play(); Scenes.requestRefresh();
      }) });
      if (counter) preTL.to(n, { v: 100, duration: 1.5, ease: 'power2.inOut',
        onUpdate: function () { counter.textContent = Math.round(n.v); } });
      else preTL.to({}, { duration: 0.9 });
      preTL.to(pre, { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, '+=0.15')
           .set(pre, { display: 'none' });
    }
    if (document.readyState === 'complete') intro();
    else scope.listen(window, 'load', intro, { once: true });
    return function () {};
  });
  Scenes.requestRefresh();

  if (CFG.debug) {
    console.log("[motion] elementi animati:", document.querySelectorAll("[data-m]").length,
      "| intensity:", CFG.intensity, "| lenis:", !!window.__mLenis);
  }
  }
  boot().then(resolveReady, function (error) {
    document.documentElement.classList.remove('m-js');
    try { window.MotionKit.destroy(); } catch (_) {}
    console.error('[motion] montaggio fallito:', error);
    rejectReady(error);
  });
})();
