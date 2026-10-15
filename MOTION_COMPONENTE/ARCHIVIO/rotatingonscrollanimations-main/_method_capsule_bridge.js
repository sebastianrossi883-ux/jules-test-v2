(function () {
  'use strict';
  function send(type, value) {
    try { parent.postMessage({ source: 'metodo21-capsule', type: type, value: value, message: value }, '*'); }
    catch (_) {}
  }
  function height() {
    var body = document.body, root = document.documentElement;
    var value = Math.max(
      body ? body.scrollHeight : 0,
      body ? body.offsetHeight : 0,
      root ? root.scrollHeight : 0,
      root ? root.offsetHeight : 0,
      window.innerHeight || 0
    );
    send('height', value);
  }
  window.addEventListener('error', function (event) { send('error', event.message || 'Errore runtime nella capsula'); });
  window.addEventListener('unhandledrejection', function (event) {
    send('error', event.reason && event.reason.message ? event.reason.message : String(event.reason || 'Promise rifiutata'));
  });
  window.addEventListener('load', function () { send('ready', true); height(); });
  window.addEventListener('resize', height);
  document.addEventListener('click', function (event) {
    var anchor = event.target && event.target.closest ? event.target.closest('a[href]') : null;
    if (!anchor) return;
    try {
      var target = new URL(anchor.href, location.href);
      if (target.origin !== location.origin) {
        event.preventDefault();
        event.stopPropagation();
        send('external-link-blocked', target.href);
      }
    } catch (_) {}
  }, true);
  if (window.ResizeObserver) new ResizeObserver(height).observe(document.documentElement);
  setTimeout(height, 0);
})();
