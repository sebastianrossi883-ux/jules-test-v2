// assets/js/regia-sito.js
MotionKit.ready.then(async (runtime) => {
  if (runtime.reducedMotion) return;
  const sceneRoots = Array.from(document.querySelectorAll("[data-m21-root]"));
  const createStickyGrid = (scope, root, gridItems, numColumns = 3, targetZoomElement = null, targetTextElements = null) => {
    const columns = Array.from({ length: numColumns }, () => []);
    gridItems.forEach((item, index) => {
      columns[index % numColumns].push(item);
    });
    const wh = window.innerHeight;
    scope.measure(() => {
    });
    const tl = scope.gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top 25%",
        end: "bottom bottom",
        scrub: 1.2
      }
    });
    const revealTl = scope.gsap.timeline();
    columns.forEach((col, idx) => {
      const fromTop = idx % 2 === 0;
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
    if (targetZoomElement || columns.length >= 3) {
      const zoomTl = scope.gsap.timeline({ defaults: { duration: 1, ease: "power3.inOut" } });
      if (targetZoomElement) zoomTl.to(targetZoomElement, { scale: 2.05 }, 0);
      if (columns[0]) zoomTl.to(columns[0], { xPercent: -40 }, 0);
      if (columns[columns.length - 1]) zoomTl.to(columns[columns.length - 1], { xPercent: 40 }, 0);
      if (columns[1]) {
        zoomTl.to(columns[1], {
          yPercent: (index, _, arr) => (index < Math.floor(arr.length / 2) ? -1 : 1) * 40,
          duration: 0.5,
          ease: "power1.inOut"
        }, "-=0.5");
      }
      tl.add(zoomTl, "-=0.6");
    }
    if (targetTextElements) {
      tl.fromTo(
        targetTextElements,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power1.out" },
        "-=0.32"
      );
    }
    return tl;
  };
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
    const activeTimelines = /* @__PURE__ */ new Set();
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
        tl.to(el, {
          x: "+=" + deltaX * 1.6,
          rotation: (Math.random() - 0.5) * 40,
          ease: "power1.in",
          duration: 0.3
        });
        tl.to(el, {
          yPercent: 150,
          ease: "back.in(" + (1.5 + (1 - yPos / H)) + ")",
          duration: 0.3
        }, "<");
        indexItem = (indexItem + 1) % shapes.length;
      }
      oldIncrX = valX;
      oldIncrY = valY;
    };
    const rmMove = scope.listen(container, "mousemove", (e) => onMove(e.clientX, e.clientY));
    const rmTouch = scope.listen(container, "touchmove", (e) => {
      if (e.touches && e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    return () => {
      rmMove();
      rmTouch();
      activeTimelines.forEach((tl) => {
        tl.kill();
      });
      activeTimelines.clear();
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  };
  const createMotionPathSpread = (scope, items, getPositionsCallback) => {
    const tl = scope.gsap.timeline({
      defaults: { duration: 1.2, ease: "expo.inOut", easeReverse: true },
      paused: true
    });
    tl.to(items, {
      motionPath: (index) => {
        const target = getPositionsCallback(index);
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
    { "id": "site:01-podere-bricco-sereno-serralunga-d-alba", "label": "Podere Bricco Sereno \u2014 Serralunga d'Alba", "selector": '[data-m21-root="scene-001"]', "fallbackIndex": 0, "dependencies": [], "setup": (scope) => {
      const bg = scope.claim("img", "transform");
      const lines = scope.claim(".motion-line", ["transform", "autoAlpha"]);
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
    } },
    { "id": "site:02-section-1", "label": "section-1", "selector": '[data-m21-root="scene-002"]', "fallbackIndex": 1, "dependencies": [], "setup": (scope) => {
      const gridItems = scope.claim(".gallery__item", ["transform", "opacity", "xPercent", "yPercent", "y"]);
      const zoomTarget = scope.claim(".gallery__grid", ["transform", "scale"]);
      const textTarget = scope.claim(".content", ["transform", "opacity", "y"]);
      const tl = createStickyGrid(scope, scope.root, Array.from(gridItems), 3, zoomTarget, textTarget);
      return () => {
        tl.kill();
      };
    } },
    { "id": "site:03-section-2", "label": "section-2", "selector": '[data-m21-root="scene-003"]', "fallbackIndex": 2, "dependencies": ["motionPath"], "setup": (scope) => {
      scope.gsap.registerPlugin(window.MotionPathPlugin);
      const items = scope.claim(".motion-card", ["transform", "opacity", "scale"]);
      const container = document.querySelector(".motion-path-container");
      let containerRect = null;
      let itemRect = null;
      scope.measure(() => {
        if (items.length > 0) {
          containerRect = container.getBoundingClientRect();
          itemRect = items[0].getBoundingClientRect();
        }
      });
      const layoutFn = (index) => {
        const gap = 15;
        const scale = 0.85;
        const col = index % 2;
        const row = Math.floor(index / 2);
        const scaledWidth = itemRect.width * scale;
        const scaledHeight = itemRect.height * scale;
        const targetX = col * (scaledWidth + gap);
        const targetY = row * (scaledHeight + gap) - 100;
        return { x: targetX, y: targetY, scale };
      };
      const spreadTl = createMotionPathSpread(scope, Array.from(items), layoutFn);
      const scrollTl = scope.gsap.timeline({
        scrollTrigger: {
          trigger: scope.root,
          start: "top center",
          end: "center center",
          scrub: 1.2
        }
      });
      scrollTl.add(spreadTl.tweenFromTo(0, spreadTl.duration()));
      return () => {
        scrollTl.kill();
        spreadTl.kill();
      };
    } },
    { "id": "site:04-section-3", "label": "section-3", "selector": '[data-m21-root="scene-004"]', "fallbackIndex": 3, "dependencies": [], "setup": (scope) => {
      const textContainer = scope.root.querySelector('[data-motion-text="words"]');
      const title = scope.claim(".custom-script", ["transform", "opacity"]);
      const image = scope.claim(".lg\\:col-span-7 img", ["transform", "scale"]);
      const cleanupSteps = [];
      if (textContainer) {
        const paragraphs = textContainer.querySelectorAll("p");
        paragraphs.forEach((p) => {
          const text = p.textContent || "";
          const parts = text.split(/(\s+)/);
          p.textContent = "";
          p.setAttribute("aria-label", text.trim());
          parts.forEach((part) => {
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
        wordsTl.fromTo(
          words,
          { yPercent: 110, opacity: 0, filter: "blur(8px)" },
          { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power4.out", stagger: 0.02 }
        );
        cleanupSteps.push(() => wordsTl.kill());
      }
      const titleTl = scope.gsap.timeline({
        scrollTrigger: {
          trigger: title,
          start: "top 85%",
          once: true
        }
      });
      titleTl.from(title, { opacity: 0, y: 30, duration: 1.2, ease: "power3.out" });
      cleanupSteps.push(() => titleTl.kill());
      const parallaxTl = scope.gsap.timeline({
        scrollTrigger: {
          trigger: scope.root,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
      parallaxTl.fromTo(image, { yPercent: -10, scale: 1.1 }, { yPercent: 10, scale: 1, ease: "none" });
      cleanupSteps.push(() => parallaxTl.kill());
      return () => {
        cleanupSteps.forEach((fn) => fn());
      };
    } },
    { "id": "site:05-section-4", "label": "section-4", "selector": '[data-m21-root="scene-005"]', "fallbackIndex": 4, "dependencies": [], "setup": (scope) => {
      const textElements = scope.claim(".lg\\:col-span-6 .flex-col > *", ["transform", "opacity"]);
      const image = scope.claim(".lg\\:col-span-6 img", ["transform", "scale"]);
      const imageContainer = scope.claim(".overflow-hidden.relative.shadow-sm", ["clipPath"]);
      const cleanupSteps = [];
      const textTl = scope.gsap.timeline({
        scrollTrigger: {
          trigger: scope.root,
          start: "top 75%",
          once: true
        }
      });
      textTl.from(textElements, { opacity: 0, y: 20, duration: 0.8, ease: "power2.out", stagger: 0.1 });
      cleanupSteps.push(() => textTl.kill());
      const imgTl = scope.gsap.timeline({
        scrollTrigger: {
          trigger: imageContainer,
          start: "top 80%",
          once: true
        }
      });
      scope.gsap.set(imageContainer, { clipPath: "inset(0 100% 0 0)" });
      imgTl.to(imageContainer, { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power3.inOut" }).from(image, { scale: 1.2, duration: 1.2, ease: "power3.out" }, "-=1.2");
      cleanupSteps.push(() => imgTl.kill());
      return () => {
        cleanupSteps.forEach((fn) => fn());
      };
    } },
    { "id": "site:06-section-5", "label": "section-5", "selector": '[data-m21-root="scene-006"]', "fallbackIndex": 5, "dependencies": ["motionPath"], "setup": (scope) => {
      scope.gsap.registerPlugin(window.MotionPathPlugin);
      const textElements = scope.claim(".text-center > *", ["transform", "opacity"]);
      const imageContainers = scope.claim(".grid .aspect-\\[3\\/4\\.2\\]", ["transform"]);
      const cleanupSteps = [];
      const textTl = scope.gsap.timeline({
        scrollTrigger: {
          trigger: scope.root,
          start: "top 75%",
          once: true
        }
      });
      textTl.from(textElements, { opacity: 0, y: 20, duration: 0.8, ease: "power2.out", stagger: 0.1 });
      cleanupSteps.push(() => textTl.kill());
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
            path: [{ x: -100, y: -50 }, { x: 0, y: 0 }],
            curviness: 1
          },
          ease: "none"
        }, 0);
        scrollTl.from(imageContainers[1], {
          motionPath: {
            path: [{ x: 100, y: 50 }, { x: 0, y: 0 }],
            curviness: 1
          },
          ease: "none"
        }, 0);
      }
      cleanupSteps.push(() => scrollTl.kill());
      return () => {
        cleanupSteps.forEach((fn) => fn());
      };
    } },
    { "id": "site:07-section-6", "label": "section-6", "selector": '[data-m21-root="scene-007"]', "fallbackIndex": 6, "dependencies": [], "setup": (scope) => {
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
    } },
    { "id": "site:08-contatti", "label": "Contatti", "selector": '[data-m21-root="scene-008"]', "fallbackIndex": 7, "dependencies": [], "setup": (scope) => {
      const trailContainer = scope.root.querySelector(".trail-container");
      const textElements = scope.claim(".max-w-6xl > div", ["transform", "opacity"]);
      const tl = scope.gsap.timeline({
        scrollTrigger: {
          trigger: scope.root,
          start: "top 80%",
          once: true
        }
      });
      tl.from(textElements, { opacity: 0, y: 30, duration: 1, ease: "power2.out", stagger: 0.1 });
      const cleanupTrail = createTrailEffect(scope, scope.root, trailContainer);
      return () => {
        tl.kill();
        cleanupTrail();
      };
    } }
  ];
  for (const [index, slot] of sceneSlots.entries()) {
    if (typeof slot.setup !== "function") continue;
    const root = slot.selector ? document.querySelector(slot.selector) : sceneRoots[slot.fallbackIndex];
    if (!root) {
      console.error(`[regia-sito] root mancante per la scena ${index + 1}`);
      continue;
    }
    try {
      await SiteScenes.mountRequired({
        id: slot.id,
        root,
        writes: [],
        requires: { dependencies: slot.dependencies },
        setup: slot.setup
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
//# sourceMappingURL=regia-sito.bundle.js.map
