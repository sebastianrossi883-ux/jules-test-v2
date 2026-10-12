/* Regia unica del sito. Un runtime, un ingresso, una scena per sezione strutturale. */
MotionKit.ready.then(async (runtime) => {
  if (runtime.reducedMotion) return;
  const structural = Array.from(document.querySelectorAll("header, section, footer"));
  const sceneRoots = structural.filter((element) =>
    !element.parentElement?.closest("header, section, footer")
  );

  function mountScene01(root) {
    // Scena 1: Podere Bricco Sereno — Serralunga d'Alba. Integra qui solo la meccanica utile al suo ruolo nella regia globale.
    return SiteScenes.mount({
      id: "site:01-podere-bricco-sereno-serralunga-d-alba",
      root,
      writes: [],
      setup(scope) {
        // Dichiarare con scope.claim le proprieta' animate e restituire il cleanup locale.
        return () => {};
      },
    });
  }

  function mountScene02(root) {
    // Scena 2: section-1. Integra qui solo la meccanica utile al suo ruolo nella regia globale.
    return SiteScenes.mount({
      id: "site:02-section-1",
      root,
      writes: [],
      setup(scope) {
        // Dichiarare con scope.claim le proprieta' animate e restituire il cleanup locale.
        return () => {};
      },
    });
  }

  function mountScene03(root) {
    // Scena 3: component-textblock8. Integra qui solo la meccanica utile al suo ruolo nella regia globale.
    return SiteScenes.mount({
      id: "site:03-component-textblock8",
      root,
      writes: [],
      setup(scope) {
        // Dichiarare con scope.claim le proprieta' animate e restituire il cleanup locale.
        return () => {};
      },
    });
  }

  function mountScene04(root) {
    // Scena 4: seed-parallax-1. Integra qui solo la meccanica utile al suo ruolo nella regia globale.
    return SiteScenes.mount({
      id: "site:04-seed-parallax-1",
      root,
      writes: [],
      setup(scope) {
        // Dichiarare con scope.claim le proprieta' animate e restituire il cleanup locale.
        return () => {};
      },
    });
  }

  function mountScene05(root) {
    // Scena 5: seed-paths. Integra qui solo la meccanica utile al suo ruolo nella regia globale.
    return SiteScenes.mount({
      id: "site:05-seed-paths",
      root,
      writes: [],
      setup(scope) {
        // Dichiarare con scope.claim le proprieta' animate e restituire il cleanup locale.
        return () => {};
      },
    });
  }

  function mountScene06(root) {
    // Scena 6: seed-parallax-2. Integra qui solo la meccanica utile al suo ruolo nella regia globale.
    return SiteScenes.mount({
      id: "site:06-seed-parallax-2",
      root,
      writes: [],
      setup(scope) {
        // Dichiarare con scope.claim le proprieta' animate e restituire il cleanup locale.
        return () => {};
      },
    });
  }

  function mountScene07(root) {
    // Scena 7: section-6. Integra qui solo la meccanica utile al suo ruolo nella regia globale.
    return SiteScenes.mount({
      id: "site:07-section-6",
      root,
      writes: [],
      setup(scope) {
        // Dichiarare con scope.claim le proprieta' animate e restituire il cleanup locale.
        return () => {};
      },
    });
  }

  function mountScene08(root) {
    // Scena 8: Contatti. Integra qui solo la meccanica utile al suo ruolo nella regia globale.
    return SiteScenes.mount({
      id: "site:08-contatti",
      root,
      writes: [],
      setup(scope) {
        // Dichiarare con scope.claim le proprieta' animate e restituire il cleanup locale.
        return () => {};
      },
    });
  }

  if (sceneRoots[0]) mountScene01(sceneRoots[0]);
  if (sceneRoots[1]) mountScene02(sceneRoots[1]);
  if (sceneRoots[2]) mountScene03(sceneRoots[2]);
  if (sceneRoots[3]) mountScene04(sceneRoots[3]);
  if (sceneRoots[4]) mountScene05(sceneRoots[4]);
  if (sceneRoots[5]) mountScene06(sceneRoots[5]);
  if (sceneRoots[6]) mountScene07(sceneRoots[6]);
  if (sceneRoots[7]) mountScene08(sceneRoots[7]);
}).catch((error) => {
  console.error("[regia-sito] avvio interrotto", error);
});
