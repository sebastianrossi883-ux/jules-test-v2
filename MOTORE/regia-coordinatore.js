/* Metodo 12 Cinematico R2. Ownership, lifecycle, geometria e scroll condivisi.
   Nessun preset artistico, nessuna libreria creata in parallelo al sito. */
(function (global) {
  'use strict';
  if (global.SiteScenes) return;
  const active = new Map(), claims = new WeakMap(), resources = new Map();
  const pluginRegistry = new Map(), dependencyLoads = new Map();
  const pins = new Set(), measures = new Set(), refreshHooks = new Set(), locks = new Set();
  const diagnostics = { version: '21.1.0', startedAt: new Date().toISOString(), scenes: new Map(), errors: [] };
  let scroll = null, frame = null, refreshing = false, initialized = false, nativeOverflow = null, lockedDriver = null;
  const transform = /^(x|y|z|xPercent|yPercent|scale|scaleX|scaleY|scaleZ|rotation|rotationX|rotationY|rotationZ|rotate|translate|skewX|skewY|transform|transformOrigin)$/i;
  function properties(prop) {
    if (typeof prop !== 'string' || !prop.trim()) throw Error('SiteScenes: proprieta mancante');
    if (prop === 'autoAlpha') return ['opacity', 'visibility'];
    const key = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    return [transform.test(key) ? 'transform' : key];
  }
  function isCollection(value) {
    return Array.isArray(value) ||
      (typeof global.NodeList !== 'undefined' && value instanceof global.NodeList) ||
      (typeof global.HTMLCollection !== 'undefined' && value instanceof global.HTMLCollection);
  }
  function collectionItems(value) {
    if (!isCollection(value)) return [value];
    return Array.from(value).flatMap(collectionItems);
  }
  function errorRecord(type, error, id = null) {
    const message = error?.message || String(error || type);
    const entry = { type, id, message, at: new Date().toISOString() };
    if (error?.stack) entry.stack = String(error.stack).split('\n').slice(0, 8).join('\n');
    diagnostics.errors.push(entry);
    if (diagnostics.errors.length > 100) diagnostics.errors.shift();
    return entry;
  }
  function globalValue(path) {
    if (typeof path !== 'string' || !path) return undefined;
    return path.split('.').reduce((value, key) => value == null ? undefined : value[key], global);
  }
  function normalizeUrl(value) {
    return new URL(value, global.document.baseURI).href;
  }
  function registerDependencies(entries) {
    if (!entries || typeof entries !== 'object' || Array.isArray(entries)) {
      throw Error('SiteScenes: registro dipendenze non valido');
    }
    for (const [name, descriptor] of Object.entries(entries)) {
      if (!name || !descriptor || typeof descriptor !== 'object') {
        throw Error('SiteScenes: descrittore dipendenza non valido');
      }
      pluginRegistry.set(name, Object.assign({}, descriptor));
    }
  }
  function loadStyle(item) {
    const descriptor = typeof item === 'string' ? { src: item } : item;
    if (!descriptor?.src) throw Error('SiteScenes: URL foglio stile mancante');
    const url = normalizeUrl(descriptor.src);
    const key = 'style:'+url;
    if (dependencyLoads.has(key)) return dependencyLoads.get(key);
    const existing = Array.from(global.document.querySelectorAll('link[rel="stylesheet"]'))
      .find(node => node.href === url);
    if (existing) {
      const ready = Promise.resolve(existing);
      dependencyLoads.set(key, ready);
      return ready;
    }
    const promise = new Promise((resolve, reject) => {
      const link = global.document.createElement('link');
      link.rel = 'stylesheet';
      link.href = url;
      if (descriptor.media) link.media = descriptor.media;
      if (descriptor.integrity) { link.integrity = descriptor.integrity; link.crossOrigin = descriptor.crossOrigin || 'anonymous'; }
      link.onload = () => resolve(link);
      link.onerror = () => reject(Error('SiteScenes: stylesheet non caricato: '+url));
      global.document.head.appendChild(link);
    }).catch(error => { dependencyLoads.delete(key); throw error; });
    dependencyLoads.set(key, promise);
    return promise;
  }
  function loadScript(item) {
    const descriptor = typeof item === 'string' ? { src: item } : item;
    if (!descriptor?.src) throw Error('SiteScenes: URL script mancante');
    const url = normalizeUrl(descriptor.src);
    const type = descriptor.type === 'module' ? 'module' : 'classic';
    const key = 'script:'+type+':'+url;
    if (dependencyLoads.has(key)) return dependencyLoads.get(key);
    const existing = Array.from(global.document.scripts).find(node => node.src === url &&
      ((node.type === 'module' ? 'module' : 'classic') === type));
    if (existing) {
      const ready = Promise.resolve(existing);
      dependencyLoads.set(key, ready);
      return ready;
    }
    const promise = new Promise((resolve, reject) => {
      const script = global.document.createElement('script');
      script.src = url;
      script.async = false;
      if (type === 'module') script.type = 'module';
      if (descriptor.integrity) { script.integrity = descriptor.integrity; script.crossOrigin = descriptor.crossOrigin || 'anonymous'; }
      script.onload = () => resolve(script);
      script.onerror = () => reject(Error('SiteScenes: script non caricato: '+url));
      global.document.head.appendChild(script);
    }).catch(error => { dependencyLoads.delete(key); throw error; });
    dependencyLoads.set(key, promise);
    return promise;
  }
  async function loadRegistered(name, trail = []) {
    const descriptor = pluginRegistry.get(name);
    if (!descriptor) throw Error('SiteScenes: plugin sconosciuto: '+name);
    if (trail.includes(name)) throw Error('SiteScenes: dipendenza circolare: '+trail.concat(name).join(' -> '));
    const key = 'plugin:'+name;
    if (dependencyLoads.has(key)) return dependencyLoads.get(key);
    const promise = (async () => {
      for (const parent of descriptor.dependsOn || []) await loadRegistered(parent, trail.concat(name));
      await Promise.all((descriptor.styles || []).map(loadStyle));
      for (const script of descriptor.scripts || []) await loadScript(script);
      const missing = (descriptor.globals || []).filter(path => globalValue(path) == null);
      if (missing.length) throw Error('SiteScenes: '+name+' caricato ma globale assente: '+missing.join(', '));
      return descriptor;
    })().catch(error => { dependencyLoads.delete(key); throw error; });
    dependencyLoads.set(key, promise);
    return promise;
  }
  async function loadDependencies({ id = 'dipendenze', dependencies = [], scripts = [], styles = [], globals = [] } = {}) {
    try {
      for (const name of dependencies) await loadRegistered(name);
      await Promise.all(styles.map(loadStyle));
      for (const script of scripts) await loadScript(script);
      const missing = globals.filter(path => globalValue(path) == null);
      if (missing.length) throw Error('SiteScenes: dipendenze mancanti in '+id+': '+missing.join(', '));
      return Object.fromEntries(globals.map(path => [path, globalValue(path)]));
    } catch (error) {
      errorRecord('dependency-load', error, id);
      throw error;
    }
  }
  function onWindowError(event) {
    const target = event?.target;
    const url = target && target !== global ? (target.currentSrc || target.src || target.href) : '';
    if (url) errorRecord('resource-error', Error('Risorsa non caricata: '+url));
    else errorRecord('window-error', event?.error || event?.message || 'Errore runtime');
  }
  function onUnhandledRejection(event) {
    errorRecord('unhandled-rejection', event?.reason || 'Promise rifiutata');
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
    // Ogni pin tiene il suo spazio nella pagina, anche quando il genitore e' un flex (dove GSAP
    // lo spegnerebbe da solo): senza spazio la pagina finisce prima dell'animazione e la sezione
    // dopo passa sopra quella fissata. Chi vuole la sovrapposizione la chiede con pinSpacing:false.
    global.ScrollTrigger?.defaults({ pinSpacing: true });
    global.addEventListener('resize', requestRefresh);
    global.addEventListener('load', requestRefresh);
    global.document.addEventListener('load', requestRefresh, true);
    global.document.addEventListener('loadedmetadata', requestRefresh, true);
    global.addEventListener('error', onWindowError, true);
    global.addEventListener('unhandledrejection', onUnhandledRejection);
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

      if (isCollection(element)) {
        const items = collectionItems(element);
        if (!items.length) throw Error('SiteScenes: collezione target vuota in '+id);
        items.forEach(el => claim(el, props));
        return items;
      }

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
    diagnostics.scenes.set(id, { id, status: 'mounting', mountedAt: new Date().toISOString() });
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
      diagnostics.scenes.set(id, { id, status: 'mounted', mountedAt: new Date().toISOString() });
      // Una scena montata dopo il motore puo' aver aggiunto pin e trigger: si rimettono in
      // ordine di pagina e si ricalcolano gli spazi, cosi' le sezioni sotto non si sovrappongono.
      requestRefresh();
    } catch (e) {
      try { unmount(id); } catch (_) {}
      diagnostics.scenes.set(id, { id, status: 'failed', message: e?.message || String(e), failedAt: new Date().toISOString() });
      errorRecord('scene-mount', e, id);
      throw e;
    }
    return () => unmount(id);
  }
  function mountSafe(spec) {
    const id = spec?.id || 'scena-senza-id';
    try { return mount(spec); }
    catch (error) {
      global.console?.error?.('[SiteScenes:'+id+']', error);
      return () => false;
    }
  }
  async function mountAsyncSafe(spec) {
    const id = spec?.id || 'scena-senza-id';
    try {
      await loadDependencies(Object.assign({ id }, spec?.requires || {}));
      const mountSpec = Object.assign({}, spec);
      delete mountSpec.requires;
      return mount(mountSpec);
    } catch (error) {
      diagnostics.scenes.set(id, { id, status: 'skipped', message: error?.message || String(error), skippedAt: new Date().toISOString() });
      errorRecord('scene-skipped', error, id);
      global.console?.error?.('[SiteScenes:'+id+']', error);
      return () => false;
    }
  }
  async function mountRequired(spec) {
    const id = spec?.id || 'scena-senza-id';
    try {
      await loadDependencies(Object.assign({ id }, spec?.requires || {}));
      const mountSpec = Object.assign({}, spec);
      delete mountSpec.requires;
      return mount(mountSpec);
    } catch (error) {
      diagnostics.scenes.set(id, { id, status: 'failed', message: error?.message || String(error), failedAt: new Date().toISOString() });
      errorRecord('scene-required-failed', error, id);
      global.console?.error?.('[SiteScenes:'+id+'] dipendenza obbligatoria o montaggio fallito', error);
      throw error;
    }
  }
  function requireGlobals(id, names) {
    const required = Array.isArray(names) ? names : [names];
    const missing = required.filter(name => typeof name !== 'string' || !name || global[name] == null);
    if (missing.length) throw Error('SiteScenes: dipendenze mancanti in '+id+': '+missing.join(', '));
    return Object.fromEntries(required.map(name => [name, global[name]]));
  }
  function report() {
    return {
      version: diagnostics.version,
      startedAt: diagnostics.startedAt,
      generatedAt: new Date().toISOString(),
      active: Array.from(active.keys()),
      scenes: Array.from(diagnostics.scenes.values()).map(item => Object.assign({}, item)),
      errors: diagnostics.errors.map(item => Object.assign({}, item))
    };
  }
  function unmount(id) {
    const state = active.get(id);
    if (!state) return false;
    let first;
    try { state.ctx?.revert(); } catch (e) { first = e; }
    try { state.scope.destroy(); } catch (e) { first ||= e; }
    active.delete(id);
    const prior = diagnostics.scenes.get(id) || { id };
    if (prior.status !== 'failed') diagnostics.scenes.set(id, Object.assign({}, prior, { status: 'unmounted', unmountedAt: new Date().toISOString() }));
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
      global.removeEventListener('error', onWindowError, true);
      global.removeEventListener('unhandledrejection', onUnhandledRejection);
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
  if (global.METHOD_PLUGIN_REGISTRY) registerDependencies(global.METHOD_PLUGIN_REGISTRY);
  global.SiteScenes = Object.freeze({ mount, mountSafe, mountAsyncSafe, mountRequired, loadDependencies, registerDependencies,
    requireGlobals, report, unmount, dispose, init,
    configureScroll, requestRefresh, positiveModulo, activeCount: () => active.size });
})(window);
