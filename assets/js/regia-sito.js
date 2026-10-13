/* Regia unica del sito. Un runtime, un ingresso, una scena per sezione strutturale. */
MotionKit.ready.then(async (runtime) => {
  if (runtime.reducedMotion) return;
  const sceneRoots = Array.from(document.querySelectorAll("[data-m21-root]"));

  // Jules scrive qui le funzioni delle tre meccaniche, dopo aver progettato la regia globale.
  // Nessuna animazione o scena finta e' predisposta dal preparatore.

  // COMPONENTE: Sticky Grid Scroll
  // Usa lo scroll per rivelare, espandere e gestire il testo di una galleria
  const createStickyGrid = (scope, root, gridItems, numColumns = 3, targetZoomElement = null, targetTextElements = null) => {
    // Prepariamo l'ingresso con uno stagger diviso per colonne
    const columns = Array.from({ length: numColumns }, () => []);
    gridItems.forEach((item, index) => {
      columns[index % numColumns].push(item);
    });

    const wh = window.innerHeight;

    scope.measure(() => {
       // Misuriamo l'offset necessario per l'ingresso
    });

    // Costruiamo la timeline principale agganciata allo scrub
    const tl = scope.gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top 25%",
        end: "bottom bottom",
        scrub: 1.2
      }
    });

    // Fase 1: Reveal (entrano le colonne dal basso e dall'alto)
    const revealTl = scope.gsap.timeline();
    columns.forEach((col, idx) => {
      const fromTop = idx % 2 === 0;
      // Per evitare di ricalcolare, usiamo un offset fisso generoso che puo' essere sovrascritto o adattato.
      const dist = fromTop ? -wh * 0.6 : wh * 0.6;
      revealTl.from(col, {
        y: dist,
        stagger: {
          each: 0.06,
          from: fromTop ? "end" : "start"
        },
        ease: "power1.inOut"
      }, "grid-reveal");
    });
    tl.add(revealTl);

    // Fase 2: Zoom (Ingrandisce e allarga)
    if (targetZoomElement || columns.length >= 3) {
      const zoomTl = scope.gsap.timeline({ defaults: { duration: 1, ease: "power3.inOut" } });
      if (targetZoomElement) zoomTl.to(targetZoomElement, { scale: 2.05 }, 0);
      if (columns[0]) zoomTl.to(columns[0], { xPercent: -40 }, 0);
      if (columns[columns.length - 1]) zoomTl.to(columns[columns.length - 1], { xPercent: 40 }, 0);

      // La colonna centrale si sfalsa
      if (columns[1]) {
        zoomTl.to(columns[1], {
          yPercent: (index, _, arr) => (index < Math.floor(arr.length / 2) ? -1 : 1) * 40,
          duration: 0.5,
          ease: "power1.inOut"
        }, "-=0.5");
      }
      tl.add(zoomTl, "-=0.6");
    }

    // Fase 3: Text content
    if (targetTextElements) {
       // Testo compare col fade in entrata/uscita
       // toggleActions/scrub gestiscono gia' l'avanzamento, noi mappiamo l'opacità
       tl.fromTo(targetTextElements,
         { opacity: 0, y: 30 },
         { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" },
         "-=0.32"
       );
    }

    return tl;
  };

  // SEME 1: MWG Mouse Trail
  // Spawna e fa cadere elementi seguendo il mouse
  const createTrailEffect = (scope, container) => {
    let incr = 0;
    let oldIncrX = 0;
    let oldIncrY = 0;
    let firstMove = true;
    let indexItem = 0;
    const resetDist = window.innerWidth / 8;

    const shapes = [
      { text: "Quiete", color: "#c5a059", font: "serif" },
      { text: "Vino", color: "#bda170", font: "sans" },
      { text: "Terra", color: "#d4ccbf", font: "serif" },
      { text: "Bricco", color: "#c5b5b5", font: "sans" }
    ];

    // Manteniamo una lista delle timeline attive in modo da killarle nel cleanup, evitando leak.
    const activeTimelines = new Set();

    // Utilizziamo scope.listen per pulire correttamente gli eventi
    const onMove = (clientX, clientY) => {
      const valX = gsap.utils.clamp(0, window.innerWidth, clientX);
      const valY = gsap.utils.clamp(0, window.innerHeight, clientY);

      if (firstMove) {
        firstMove = false;
        oldIncrX = valX;
        oldIncrY = valY;
        return;
      }

      incr += Math.abs(valX - oldIncrX) + Math.abs(valY - oldIncrY);

      if (incr > resetDist) {
        incr = 0;
        const deltaX = valX - oldIncrX;
        const deltaY = valY - oldIncrY;

        // Spawn dell'immagine
        const yPos = valY - container.getBoundingClientRect().top;
        if (yPos > window.innerHeight - 200) {
            oldIncrX = valX;
            oldIncrY = valY;
            return;
        }

        const el = document.createElement("div");
        const shape = shapes[indexItem];
        el.textContent = shape.text;
        el.style.color = shape.color;
        el.style.fontFamily = shape.font === "serif" ? '"Playfair Display", "Cormorant Garamond", serif' : '"Montserrat", sans-serif';
        el.style.fontSize = "2rem";
        el.style.position = "absolute";
        el.style.pointerEvents = "none";
        el.style.zIndex = 5;

        // Inseriamo tramite portal o direttamente
        container.appendChild(el);

        const tl = scope.gsap.timeline({
          onComplete: () => {
            if (container.contains(el)) container.removeChild(el);
            activeTimelines.delete(tl);
            tl.kill();
          }
        });
        activeTimelines.add(tl);

        const H = window.innerHeight;

        tl.fromTo(el, {
          xPercent: -50 + (Math.random() - 0.5) * 80,
          yPercent: -50 + (Math.random() - 0.5) * 10,
          scaleX: 1.3,
          scaleY: 1.3,
          rotation: (Math.random() - 0.5) * 20
        }, {
          scaleX: 1,
          scaleY: 1,
          ease: "elastic.out(2, 0.6)",
          duration: 0.4
        });

        tl.fromTo(el, { x: valX }, {
          x: "+=" + deltaX * 2,
          rotation: 0,
          ease: "power1.in",
          duration: 0.4
        }, "<");

        tl.fromTo(el, { y: yPos }, {
          y: "+=" + (H - yPos),
          scale: 0.9,
          yPercent: -95,
          ease: "back.in(1.1)",
          duration: 0.4
        }, "<");

        // Rimbalzo e uscita
        tl.to(el, {
          x: "+=" + deltaX * 1.6,
          rotation: (Math.random() - 0.5) * 40,
          ease: "power1.in",
          duration: 0.3
        });
        tl.to(el, {
          yPercent: 150,
          ease: "back.in(" + (1.5 + (1 - yPos/H)) + ")",
          duration: 0.3
        }, "<");

        indexItem = (indexItem + 1) % shapes.length;
      }

      oldIncrX = valX;
      oldIncrY = valY;
    };

    const rmMove = scope.listen(container, "mousemove", (e) => onMove(e.clientX, e.clientY));
    const rmTouch = scope.listen(container, "touchmove", (e) => {
        if(e.touches && e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
    }, {passive: true});

    return () => {
       rmMove();
       rmTouch();
       activeTimelines.forEach(tl => {
           tl.kill();
       });
       activeTimelines.clear();
       // Puliamo anche i nodi orfani
       while (container.firstChild) {
           container.removeChild(container.firstChild);
       }
    };
  };

  // SEME 2: MotionPath Transition
  // Prende un array di nodi impilati e li muove su una curva generata calcolando coordinate relative.
  const createMotionPathSpread = (scope, items, getPositionsCallback) => {
      // getPositionsCallback() deve ritornare un array di oggetti {x, y, scale} per ogni item
      // Questa informazione andrà calcolata nello scope.measure() della scena specifica.

      const tl = scope.gsap.timeline({
          defaults: { duration: 1.2, ease: "expo.inOut", easeReverse: true },
          paused: true
      });

      // Dobbiamo estrarre la logica di updateMeasurements fuori perché dipende dal layout del sito
      // Questa funzione generica si aspetta che prima della riproduzione i calcoli siano stati fatti.
      tl.to(items, {
          motionPath: (index) => {
             const target = getPositionsCallback(index);
             // overshoot temporaneo
             return {
                 path: [
                     {
                         x: target.x * 0.95,
                         y: -target.y * 0.095,
                         scale: (1 - target.scale) * 0.25 + target.scale
                     },
                     {
                         x: target.x,
                         y: target.y,
                         scale: target.scale
                     }
                 ],
                 curviness: 0.45
             };
          },
          stagger: { from: "start", each: 0.02 }
      });

      return tl;
  };


  const sceneSlots = [
    {"id": "site:01-podere-bricco-sereno-serralunga-d-alba", "label": "Podere Bricco Sereno — Serralunga d'Alba", "selector": "[data-m21-root=\"scene-001\"]", "fallbackIndex": 0, "dependencies": [], "setup": (scope) => {
        /* TABELLA DI TRADUZIONE:
           - L'immagine di sfondo è la .absolute.inset-0.object-cover
           - Le motion-line sono i target per il text reveal
        */
        const bg = scope.claim("img", "transform");
        const lines = scope.claim(".motion-line", ["transform", "autoAlpha"]);

        // Ingresso maestoso allo startup
        const introTl = scope.gsap.timeline();
        introTl.from(bg, { scale: 1.05, duration: 1.8, ease: "power2.out" }, 0);
        if (lines.length) {
            introTl.from(lines, {
                yPercent: 100,
                autoAlpha: 0,
                duration: 1.2,
                ease: "power4.out",
                stagger: 0.15
            }, 0.2);
        }

        // Parallasse in scrub allo scroll
        const scrollTl = scope.gsap.timeline({
            scrollTrigger: {
                trigger: scope.root,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
        scrollTl.to(bg, { yPercent: 15, ease: "none" }, 0);

        return () => {
            introTl.kill();
            scrollTl.kill();
        };
    }},
    {"id": "site:02-section-1", "label": "section-1", "selector": "[data-m21-root=\"scene-002\"]", "fallbackIndex": 1, "dependencies": [], "setup": (scope) => {
        /* TABELLA DI TRADUZIONE:
           - La scena intera è the root
           - gridItems = li.gallery__item
           - targetZoomElement = ul.gallery__grid
           - targetTextElements = .content
        */
        const gridItems = scope.claim(".gallery__item", ["transform", "opacity", "xPercent", "yPercent", "y"]);
        const zoomTarget = scope.claim(".gallery__grid", ["transform", "scale"]);
        const textTarget = scope.claim(".content", ["transform", "opacity", "y"]);

        const tl = createStickyGrid(scope, scope.root, Array.from(gridItems), 3, zoomTarget, textTarget);

        return () => {
            tl.kill();
        };
    }},
    {"id": "site:03-section-2", "label": "section-2", "selector": "[data-m21-root=\"scene-003\"]", "fallbackIndex": 2, "dependencies": ["motionPath"], "setup": (scope) => {
        /* TABELLA DI TRADUZIONE:
           - items = .motion-card
           - container = .motion-path-container
        */
        scope.gsap.registerPlugin(window.MotionPathPlugin);
        const items = scope.claim(".motion-card", ["transform", "opacity", "scale"]);
        const container = document.querySelector(".motion-path-container");

        let containerRect = null;
        let itemRect = null;

        scope.measure(() => {
            if (items.length > 0) {
               containerRect = container.getBoundingClientRect();
               // Resettiamo eventuali transform prima di misurare (buona pratica con timeline scrubbed, ma la funzione progress(0) lo farà)
               itemRect = items[0].getBoundingClientRect();
            }
        });

        // Definisce dove finiranno le carte: in una griglia 2x2.
        const layoutFn = (index) => {
             // Il target finale è un distanziamento spaziale all'interno del container.
             // Essendo le miniature già in position absolute, definiamo l'offset X/Y rispetto all'originale
             const gap = 15;
             const scale = 0.85;

             // Dividiamo i 4 elementi in 2 righe da 2 colonne
             const col = index % 2;
             const row = Math.floor(index / 2);

             // Larghezza effettiva
             const scaledWidth = itemRect.width * scale;
             const scaledHeight = itemRect.height * scale;

             const targetX = col * (scaledWidth + gap);
             const targetY = row * (scaledHeight + gap) - 100; // shift in alto

             return { x: targetX, y: targetY, scale: scale };
        };

        const spreadTl = createMotionPathSpread(scope, Array.from(items), layoutFn);

        // Creiamo la timeline scroll-driven
        const scrollTl = scope.gsap.timeline({
            scrollTrigger: {
                trigger: scope.root,
                start: "top center",
                end: "center center",
                scrub: 1.2
            }
        });

        // Aggiungiamo la timeline di espansione allo scrub
        scrollTl.add(spreadTl.tweenFromTo(0, spreadTl.duration()));

        return () => {
            scrollTl.kill();
            spreadTl.kill();
        };
    }},
    {"id": "site:04-section-3", "label": "section-3", "selector": "[data-m21-root=\"scene-004\"]", "fallbackIndex": 3, "dependencies": [], "setup": (scope) => {
        /* TABELLA DI TRADUZIONE:
           - title = .custom-script
           - textContainer = div[data-motion-text="words"]
           - imageContainer = .lg\\:col-span-7
           - image = .lg\\:col-span-7 img
        */
        const textContainer = scope.root.querySelector('[data-motion-text="words"]');
        const title = scope.claim(".custom-script", ["transform", "opacity"]);
        const image = scope.claim(".lg\\:col-span-7 img", ["transform", "scale"]);

        const cleanupSteps = [];

        // Applichiamo grammatica dello stagger testuale (simile a cinematic skill)
        if (textContainer) {
            const paragraphs = textContainer.querySelectorAll('p');
            paragraphs.forEach(p => {
                const text = p.textContent || "";
                const parts = text.split(/(\s+)/);
                p.textContent = "";
                p.setAttribute("aria-label", text.trim());

                parts.forEach(part => {
                    if (!part.trim()) {
                        p.appendChild(document.createTextNode(part));
                        return;
                    }
                    const mask = document.createElement("span");
                    const word = document.createElement("span");
                    mask.className = "inline-block overflow-hidden align-top";
                    mask.setAttribute("aria-hidden", "true");
                    word.className = "motion-word inline-block opacity-0";
                    word.textContent = part;
                    mask.appendChild(word);
                    p.appendChild(mask);
                });
            });

            const words = scope.claim(".motion-word", ["transform", "opacity", "filter"]);

            const wordsTl = scope.gsap.timeline({
                scrollTrigger: {
                    trigger: textContainer,
                    start: "top 82%",
                    once: true
                }
            });

            wordsTl.fromTo(words,
                { yPercent: 110, opacity: 0, filter: "blur(8px)" },
                { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power4.out", stagger: 0.02 }
            );

            cleanupSteps.push(() => wordsTl.kill());
        }

        // Animazione titolo
        const titleTl = scope.gsap.timeline({
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
                once: true
            }
        });
        titleTl.from(title, { opacity: 0, y: 30, duration: 1.2, ease: "power3.out" });
        cleanupSteps.push(() => titleTl.kill());

        // Parallasse profondo dell'immagine a destra
        const parallaxTl = scope.gsap.timeline({
            scrollTrigger: {
                trigger: scope.root,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
        // L'immagine è absolute inset-0 e object-cover, facciamo un leggero zoom in entrata e y shift
        parallaxTl.fromTo(image, { yPercent: -10, scale: 1.1 }, { yPercent: 10, scale: 1, ease: "none" });
        cleanupSteps.push(() => parallaxTl.kill());

        return () => {
            cleanupSteps.forEach(fn => fn());
        };
    }},
    {"id": "site:05-section-4", "label": "section-4", "selector": "[data-m21-root=\"scene-005\"]", "fallbackIndex": 4, "dependencies": [], "setup": (scope) => {
        /* TABELLA DI TRADUZIONE:
           - textGroup = .lg\\:col-span-6 .flex-col
           - image = .lg\\:col-span-6 img
           - imageContainer = overflow-hidden relative shadow-sm
        */
        const textElements = scope.claim(".lg\\:col-span-6 .flex-col > *", ["transform", "opacity"]);
        const image = scope.claim(".lg\\:col-span-6 img", ["transform", "scale"]);
        const imageContainer = scope.claim(".overflow-hidden.relative.shadow-sm", ["clipPath"]);

        const cleanupSteps = [];

        // Apparizione testo con stagger
        const textTl = scope.gsap.timeline({
            scrollTrigger: {
                trigger: scope.root,
                start: "top 75%",
                once: true
            }
        });
        textTl.from(textElements, { opacity: 0, y: 20, duration: 0.8, ease: "power2.out", stagger: 0.1 });
        cleanupSteps.push(() => textTl.kill());

        // Reveal immagine stile Componente/Parallax
        const imgTl = scope.gsap.timeline({
            scrollTrigger: {
                trigger: imageContainer,
                start: "top 80%",
                once: true
            }
        });

        // Unclip orizzontale e decrescita scale
        scope.gsap.set(imageContainer, { clipPath: "inset(0 100% 0 0)" });
        imgTl.to(imageContainer, { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power3.inOut" })
             .from(image, { scale: 1.2, duration: 1.2, ease: "power3.out" }, "-=1.2");
        cleanupSteps.push(() => imgTl.kill());

        return () => {
            cleanupSteps.forEach(fn => fn());
        };
    }},
    {"id": "site:06-section-5", "label": "section-5", "selector": "[data-m21-root=\"scene-006\"]", "fallbackIndex": 5, "dependencies": ["motionPath"], "setup": (scope) => {
        /* TABELLA DI TRADUZIONE:
           - text = .text-center elements
           - images = .grid img
           - imageContainers = .grid .aspect-\\[3\\/4\\.2\\]
        */
        scope.gsap.registerPlugin(window.MotionPathPlugin);
        const textElements = scope.claim(".text-center > *", ["transform", "opacity"]);
        const imageContainers = scope.claim(".grid .aspect-\\[3\\/4\\.2\\]", ["transform"]);

        const cleanupSteps = [];

        // Apparizione testo con stagger
        const textTl = scope.gsap.timeline({
            scrollTrigger: {
                trigger: scope.root,
                start: "top 75%",
                once: true
            }
        });
        textTl.from(textElements, { opacity: 0, y: 20, duration: 0.8, ease: "power2.out", stagger: 0.1 });
        cleanupSteps.push(() => textTl.kill());

        // Movimento su curve tramite MotionPath per le botti (Seme 2 ispirazione)
        // Definiamo delle curve leggermente divergenti/convergenti basate sullo scroll
        const scrollTl = scope.gsap.timeline({
            scrollTrigger: {
                trigger: scope.root,
                start: "top bottom",
                end: "bottom center",
                scrub: true
            }
        });

        if (imageContainers.length >= 2) {
            scrollTl.from(imageContainers[0], {
                motionPath: {
                    path: [{x: -100, y: -50}, {x: 0, y: 0}],
                    curviness: 1
                },
                ease: "none"
            }, 0);

            scrollTl.from(imageContainers[1], {
                motionPath: {
                    path: [{x: 100, y: 50}, {x: 0, y: 0}],
                    curviness: 1
                },
                ease: "none"
            }, 0);
        }
        cleanupSteps.push(() => scrollTl.kill());

        return () => {
            cleanupSteps.forEach(fn => fn());
        };
    }},
    {"id": "site:07-section-6", "label": "section-6", "selector": "[data-m21-root=\"scene-007\"]", "fallbackIndex": 6, "dependencies": [], "setup": (scope) => {
        /* TABELLA DI TRADUZIONE:
           - text = .max-w-5xl > *
        */
        const textElements = scope.claim(".max-w-5xl > *", ["transform", "opacity", "filter"]);

        const tl = scope.gsap.timeline({
            scrollTrigger: {
                trigger: scope.root,
                start: "top 70%",
                once: true
            }
        });

        tl.from(textElements, {
            opacity: 0,
            y: 30,
            filter: "blur(10px)",
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.15
        });

        return () => {
            tl.kill();
        };
    }},
    {"id": "site:08-contatti", "label": "Contatti", "selector": "[data-m21-root=\"scene-008\"]", "fallbackIndex": 7, "dependencies": [], "setup": (scope) => {
        /* TABELLA DI TRADUZIONE:
           - container = .trail-container
           - trail effect = usa forme testuali invece di immagini duplicate
        */
        const trailContainer = scope.root.querySelector(".trail-container");

        // Setup entrance degli elementi statici
        const textElements = scope.claim(".max-w-6xl > div", ["transform", "opacity"]);
        const tl = scope.gsap.timeline({
            scrollTrigger: {
                trigger: scope.root,
                start: "top 80%",
                once: true
            }
        });
        tl.from(textElements, { opacity: 0, y: 30, duration: 1, ease: "power2.out", stagger: 0.1 });

        // Creazione del trail effect limitato al footer. Passiamo `scope.root` come zona di ascolto.
        const cleanupTrail = createTrailEffect(scope, scope.root, trailContainer);

        return () => {
            tl.kill();
            cleanupTrail();
        };
    }}
  ];

  // Scrivere per ciascuno slot setup(scope), dichiarare i target con scope.claim e restituire il cleanup.
  // Assegnare a dependencies i plugin effettivamente usati. setup:null indica lavoro da realizzare.
  // Nel sito di partenza gli slot non vengono registrati come scene montate.
  for (const [index, slot] of sceneSlots.entries()) {
    if (typeof slot.setup !== "function") continue;
    const root = slot.selector ? document.querySelector(slot.selector) : sceneRoots[slot.fallbackIndex];
    if (!root) {
      console.error(`[regia-sito] root mancante per la scena ${index + 1}`);
      continue;
    }
    try {
      await SiteScenes.mountRequired({
        id: slot.id, root, writes: [],
        requires: { dependencies: slot.dependencies },
        setup: slot.setup,
      });
    } catch (error) {
      if (error.name === "AbortError") return;
      console.error(`[regia-sito] scena ${index + 1} non montata`, error);
    }
  }
}).catch((error) => {
  if (error.name === "AbortError") return;
  console.error("[regia-sito] avvio interrotto", error);
});
