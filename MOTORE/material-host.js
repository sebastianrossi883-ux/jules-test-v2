/* Metodo 21 Universale — host per componenti isolati.
   Mantiene CSS, globali e generazioni di librerie dentro un iframe dedicato. */
(function (global) {
  'use strict';
  if (global.MaterialHost) return;

  const mounted = new Map();
  let manifestUrl = 'MOTION_COMPONENTE/ARCHIVIO/materials.manifest.json';
  let manifestPromise = null;

  function configure(options = {}) {
    if (options.manifestUrl) manifestUrl = options.manifestUrl;
    manifestPromise = null;
  }

  function loadManifest() {
    if (!manifestPromise) {
      manifestPromise = fetch(manifestUrl, { credentials: 'same-origin' })
        .then(response => {
          if (!response.ok) throw Error('MaterialHost: manifest non caricato ('+response.status+')');
          return response.json();
        });
    }
    return manifestPromise;
  }

  function resolveRoot(root) {
    const node = typeof root === 'string' ? global.document.querySelector(root) : root;
    if (!node || typeof node.appendChild !== 'function') throw Error('MaterialHost: contenitore non valido');
    return node;
  }

  async function mount({ id, slug, root, variant = null, minHeight = '70vh', title = null, autoHeight = false } = {}) {
    if (!id || mounted.has(id)) throw Error('MaterialHost: id mancante o gia montato');
    if (!slug) throw Error('MaterialHost: slug materiale mancante');
    const host = resolveRoot(root);
    host.classList.add('method-material-host');
    host.dataset.materialState = 'loading';
    host.style.setProperty('--material-min-height', minHeight);

    const manifest = await loadManifest();
    const material = manifest.materials?.find(item => item.slug === slug);
    if (!material) throw Error('MaterialHost: materiale sconosciuto: '+slug);
    const selected = variant || material.defaultVariant;
    const entry = material.variants?.find(item => item.id === selected);
    if (!entry) throw Error('MaterialHost: variante sconosciuta: '+slug+'/'+selected);

    const iframe = global.document.createElement('iframe');
    iframe.src = entry.url;
    iframe.title = title || material.title || slug;
    iframe.loading = 'eager';
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-pointer-lock');
    iframe.setAttribute('allow', 'autoplay; fullscreen');
    host.replaceChildren(iframe);
    mounted.set(id, { host, iframe, slug, autoHeight });

    iframe.addEventListener('load', () => { host.dataset.materialState = 'ready'; }, { once: true });
    iframe.addEventListener('error', () => { host.dataset.materialState = 'failed'; }, { once: true });
    return () => unmount(id);
  }

  function onMessage(event) {
    const data = event.data;
    if (!data || data.source !== 'metodo21-capsule') return;
    for (const state of mounted.values()) {
      if (state.iframe.contentWindow !== event.source) continue;
      if (data.type === 'height' && state.autoHeight && Number.isFinite(data.value) && data.value > 0) {
        state.host.style.setProperty('--material-height', Math.ceil(data.value)+'px');
      } else if (data.type === 'ready') {
        state.host.dataset.materialState = 'ready';
      } else if (data.type === 'error') {
        state.host.dataset.materialState = 'failed';
        global.console?.error?.('[MaterialHost:'+state.slug+']', data.message);
      }
      break;
    }
  }

  function unmount(id) {
    const state = mounted.get(id);
    if (!state) return false;
    state.iframe.remove();
    state.host.classList.remove('method-material-host');
    delete state.host.dataset.materialState;
    state.host.style.removeProperty('--material-min-height');
    state.host.style.removeProperty('--material-height');
    mounted.delete(id);
    return true;
  }

  function dispose() {
    for (const id of Array.from(mounted.keys())) unmount(id);
    global.removeEventListener('message', onMessage);
  }

  global.addEventListener('message', onMessage);
  global.MaterialHost = Object.freeze({ configure, loadManifest, mount, unmount, dispose });
})(window);
