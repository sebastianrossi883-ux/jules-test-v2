/* Metodo 12 Cinematico R2. Ownership, lifecycle, geometria e scroll condivisi.
   Nessun preset artistico, nessuna libreria creata in parallelo al sito. */
(function (global) {
  'use strict';
  if (global.SiteScenes) return;
  const active = new Map(), claims = new WeakMap(), resources = new Map();
  const pins = new Set(), measures = new Set(), refreshHooks = new Set(), locks = new Set();
  let scroll = null, frame = null, refreshing = false, initialized = false, nativeOverflow = null, lockedDriver = null;
  const transform = /^(x|y|z|xPercent|yPercent|scale|scaleX|scaleY|scaleZ|rotation|rotationX|rotationY|rotationZ|rotate|translate|skewX|skewY|transform|transformOrigin)$/i;
  function properties(prop) {
    if (typeof prop !== 'string' || !prop.trim()) throw Error('SiteScenes: proprieta mancante');
    if (prop === 'autoAlpha') return ['opacity', 'visibility'];
    const key = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    return [transform.test(key) ? 'transform' : key];
  }
  function requestRefresh() {
    if (frame !== null || refreshing) return;
    frame = global.requestAnimationFrame(() => {
      frame = null;
      refreshing = true;
      try {
        for (const fn of Array.from(measures)) fn();
        if (scroll?.instance?.resize) scroll.instance.resize();
        const ST = global.ScrollTrigger;
        if (ST) { ST.sort(); ST.refresh(); }
        for (const fn of Array.from(refreshHooks)) fn();
      } finally { refreshing = false; }
    });
  }
  function init() {
    if (initialized) return;
    initialized = true;
    // Solo per il sito standalone: un punto di refresh dopo le misure.
    global.ScrollTrigger?.config({ autoRefreshEvents: 'visibilitychange' });
    global.addEventListener('resize', requestRefresh);
    global.addEventListener('load', requestRefresh);
    global.document.addEventListener('load', requestRefresh, true);
    global.document.addEventListener('loadedmetadata', requestRefresh, true);
    global.document.fonts?.ready.then(() => { if (initialized) requestRefresh(); });
  }
  function configureScroll({ enabled = true, instance = null, externalTicker = false,
                             externalUpdate = false, options = {} } = {}) {
    if (scroll) {
      if (instance && scroll.instance !== instance) throw Error('SiteScenes: secondo driver scroll');
      return scroll.instance;
    }
    const gsap = global.gsap, ST = global.ScrollTrigger;
    if (gsap && ST) gsap.registerPlugin(ST);
    const existing = instance || global.__mLenis;
    let owned = false;
    if (existing) {
      instance = existing;
      if (!externalTicker) throw Error('SiteScenes: Lenis esistente; dichiarare externalTicker:true o rimuovere il vecchio driver');
    } else if (enabled && gsap && global.Lenis) {
      instance = new global.Lenis(Object.assign({}, options, { autoRaf: false }));
      owned = true;
    }
    const update = () => ST?.update();
    const tick = t => instance.raf(t * 1000);
    if (instance && !externalUpdate) instance.on('scroll', update);
    if (instance && !externalTicker) { gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0); }
    scroll = { instance, owned, update, tick, externalTicker, externalUpdate };
    if (instance) global.__mLenis = instance;
    if (instance && locks.size) {
      lockedDriver = { instance, resume: !instance.isStopped };
      instance.stop();
    }
    return instance;
  }
  function lockScroll() {
    const token = {};
    if (!locks.size) {
      const instance = scroll?.instance;
      lockedDriver = instance ? { instance, resume: !instance.isStopped } : null;
      instance?.stop();
      const style = global.document.documentElement.style;
      nativeOverflow = ['overflow', 'overflow-x', 'overflow-y'].map(name =>
        [name, style.getPropertyValue(name), style.getPropertyPriority(name)]);
      style.setProperty('overflow', 'hidden');
    }
    locks.add(token);
    return () => {
      if (!locks.delete(token) || locks.size) return;
      const style = global.document.documentElement.style;
      for (const [name] of nativeOverflow) style.removeProperty(name);
      for (const [name, value, priority] of nativeOverflow) {
        if (value) style.setProperty(name, value, priority);
      }
      nativeOverflow = null;
      if (lockedDriver?.resume) lockedDriver.instance.start();
      lockedDriver = null;
      requestRefresh();
    };
  }
  function makeScope(id, root, ctx, allowed = new Set([root])) {
    const cleanups = [], booked = [], ownResources = new Set(), seen = new WeakMap();
    let alive = true;
    function defer(fn) {
      if (typeof fn !== 'function') throw Error('SiteScenes: cleanup non valido');
      if (!alive) fn(); else cleanups.push(fn);
      return fn;
    }
    function claim(element, props) {
      if (!alive) throw Error('SiteScenes: scena gia distrutta');
      if (!element || typeof element !== 'object') throw Error('SiteScenes: target non valido');
      if (![...allowed].some(r => r === element || r.contains(element))) throw Error('SiteScenes: target fuori scena; registrare un portal esplicito');
      const keys = (Array.isArray(props) ? props : [props]).flatMap(properties);
      const owners = claims.get(element) || new Map();
      for (const prop of keys) {
        const prior = owners.get(prop);
        if (prior && prior.id !== id) throw Error('SiteScenes: conflitto '+prop+' fra '+prior.id+' e '+id);
      }
      claims.set(element, owners);
      const previous = seen.get(element) || new Set();
      seen.set(element, previous);
      for (const prop of new Set(keys)) {
        if (previous.has(prop)) continue;
        previous.add(prop);
        const prior = owners.get(prop);
        owners.set(prop, { id, refs: (prior?.refs || 0) + 1 });
        booked.push({ element, prop });
      }
      return element;
    }
    function own(name) {
      if (typeof name !== 'string' || !name) throw Error('SiteScenes: risorsa globale non valida');
      const prior = resources.get(name);
      if (prior && prior.id !== id) throw Error('SiteScenes: risorsa '+name+' posseduta da '+prior.id);
      if (!ownResources.has(name)) {
        resources.set(name, { id, refs: (prior?.refs || 0) + 1 });
        ownResources.add(name);
      }
    }
    function safe(fn) {
      return function (...args) {
        if (!alive) return;
        let value;
        const self = this;
        if (ctx) ctx.add(() => { value = fn.apply(self, args); });
        else value = fn.apply(self, args);
        return value;
      };
    }
    function listen(target, type, fn, options) {
      const handler = safe(fn);
      target.addEventListener(type, handler, options);
      return defer(() => target.removeEventListener(type, handler, options));
    }
    function portal(element, parent = global.document.body) {
      allowed.add(element);
      if (!element.parentNode) parent.appendChild(element);
      defer(() => { element.remove(); allowed.delete(element); });
      return element;
    }
    function media(query, setup) {
      const mm = global.gsap.matchMedia();
      defer(() => mm.revert());
      mm.add(query, context => {
        const child = makeScope(id, root, context, new Set(allowed));
        try {
          const result = setup(child, context);
          if (typeof result === 'function') child.defer(result);
        } catch (e) { try { child.destroy(); } catch (_) {} throw e; }
        return () => child.destroy();
      });
      return mm;
    }
    function pin({ distance, overlapWith = null, ...vars }) {
      const ST = global.ScrollTrigger;
      if (!ST) throw Error('SiteScenes: ScrollTrigger richiesto per pin');
      const element = vars.pin === true || vars.pin == null ? (vars.trigger || root) : vars.pin;
      if (!element || typeof element.contains !== 'function') throw Error('SiteScenes: pin richiede un elemento DOM');
      if (vars.pinSpacing === false && (!overlapWith || typeof overlapWith.contains !== 'function' || overlapWith === element)) {
        throw Error('SiteScenes: pinSpacing:false richiede la scena overlapWith intenzionale');
      }
      for (const p of pins) {
        if (p.element === element || p.element.contains(element) || element.contains(p.element)) {
          throw Error('SiteScenes: pin duplicati/annidati fra '+p.id+' e '+id);
        }
      }
      const getDistance = typeof distance === 'function' ? distance : () => distance;
      const end = () => {
        const value = getDistance();
        if (!Number.isFinite(value) || value <= 0) throw Error('SiteScenes: distanza pin non positiva in '+id);
        return '+=' + value;
      };
      end();
      claim(element, ['pin', 'transform']);
      const record = { id, element, overlapWith };
      pins.add(record);
      defer(() => pins.delete(record));
      const st = ST.create(Object.assign({ trigger: root, start: 'top top', pinSpacing: true,
        invalidateOnRefresh: true, anticipatePin: 1 }, vars, { pin: element, end }));
      defer(() => st.kill(true));
      requestRefresh();
      return st;
    }
    function measure(fn) {
      const wrapped = safe(fn);
      measures.add(wrapped);
      defer(() => measures.delete(wrapped));
      wrapped();
      return wrapped;
    }
    function afterRefresh(fn) {
      const wrapped = safe(fn);
      refreshHooks.add(wrapped);
      defer(() => refreshHooks.delete(wrapped));
    }
    function onFrame(fn) {
      const wrapped = safe(fn);
      global.gsap.ticker.add(wrapped);
      defer(() => global.gsap.ticker.remove(wrapped));
    }
    function destroy() {
      if (!alive) return;
      alive = false;
      let first;
      for (const fn of cleanups.reverse()) { try { fn(); } catch (e) { first ||= e; } }
      for (const { element, prop } of booked) {
        const owners = claims.get(element), prior = owners?.get(prop);
        if (prior?.id === id && --prior.refs === 0) owners.delete(prop);
      }
      for (const name of ownResources) {
        const prior = resources.get(name);
        if (prior?.id === id && --prior.refs === 0) resources.delete(name);
      }
      if (first) throw first;
    }
    return { id, root, gsap: global.gsap || null, ScrollTrigger: global.ScrollTrigger || null,
      get lenis() { return scroll?.instance || null; }, claim, own, defer, safe, listen,
      portal, media, pin, measure, afterRefresh, onFrame, requestRefresh,
      lockScroll: () => { const release = lockScroll(); defer(release); return release; }, destroy };
  }
  function mount({ id, root, writes = [], resources: names = [], setup }) {
    if (typeof id !== 'string' || !id || active.has(id)) throw Error('SiteScenes: id non valido o gia montato');
    if (!root || typeof root.contains !== 'function' || !Array.isArray(writes) || typeof setup !== 'function') throw Error('SiteScenes: root/writes/setup obbligatori');
    const ctx = global.gsap?.context(() => {}, root);
    const scope = makeScope(id, root, ctx);
    active.set(id, { ctx, scope });
    try {
      for (const { element, property } of writes) scope.claim(element, property);
      for (const name of names) scope.own(name);
      let cleanup;
      if (ctx) ctx.add(() => { cleanup = setup(scope); }); else cleanup = setup(scope);
      if (typeof cleanup !== 'function') throw Error('SiteScenes: setup deve restituire cleanup');
      scope.defer(cleanup);
    } catch (e) { try { unmount(id); } catch (_) {} throw e; }
    return () => unmount(id);
  }
  function unmount(id) {
    const state = active.get(id);
    if (!state) return false;
    let first;
    try { state.ctx?.revert(); } catch (e) { first = e; }
    try { state.scope.destroy(); } catch (e) { first ||= e; }
    active.delete(id);
    requestRefresh();
    if (first) throw first;
    return true;
  }
  function dispose() {
    let first;
    for (const id of Array.from(active.keys()).reverse()) { try { unmount(id); } catch (e) { first ||= e; } }
    if (initialized) {
      global.removeEventListener('resize', requestRefresh);
      global.removeEventListener('load', requestRefresh);
      global.document.removeEventListener('load', requestRefresh, true);
      global.document.removeEventListener('loadedmetadata', requestRefresh, true);
      initialized = false;
    }
    if (frame !== null) global.cancelAnimationFrame(frame);
    frame = null;
    if (scroll) {
      if (scroll.instance && !scroll.externalUpdate) scroll.instance.off('scroll', scroll.update);
      if (scroll.instance && !scroll.externalTicker) global.gsap.ticker.remove(scroll.tick);
      if (scroll.owned) { scroll.instance.destroy(); if (global.__mLenis === scroll.instance) delete global.__mLenis; }
      scroll = null;
    }
    if (first) throw first;
  }
  function positiveModulo(value, period = 1) {
    if (!Number.isFinite(value) || !Number.isFinite(period) || period <= 0) throw Error('SiteScenes: progresso non finito');
    return ((value % period) + period) % period;
  }
  global.SiteScenes = Object.freeze({ mount, unmount, dispose, init, configureScroll, requestRefresh,
    positiveModulo, activeCount: () => active.size });
})(window);
