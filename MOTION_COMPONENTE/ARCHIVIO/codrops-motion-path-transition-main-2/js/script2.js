// Preloads images (and background images if used)
const preloadImages = (selector = "img") => {
  return new Promise((resolve) => {
    imagesLoaded(document.querySelectorAll(selector), { background: true }, resolve);
  });
};

class App {
  constructor() {
    this.gap = 10;

    this.btnOpen = document.querySelector(".open-button");
    this.btnClose = document.querySelector(".close-button");

    this.thumbnails = [...document.querySelectorAll(".thumbnail")];

    this.featuredContainer = document.querySelector(".big-featured__container");

    this.updateMeasurements();

    this.buildTimeline();
    this.addEventListeners();
  }

  get scale() {
    return window.innerWidth < 768 ? 0.6 : 0.5;
  }

  updateMeasurements() {
    this.thumbnailRect = this.thumbnails[0].getBoundingClientRect();

    this.vh = window.innerHeight;
    this.vw = window.innerWidth;

    // Aligns the first thumbnail with the left viewport edge.
    this.targetX = -this.thumbnailRect.left + this.gap;

    // Aligns the thumbnail strip near the bottom of the viewport.
    this.targetY =
      this.vh - this.thumbnailRect.bottom + (this.thumbnailRect.height * this.scale) / 2 + this.gap;
  }

  buildTimeline() {
    if (this.tl) {
      this.tl.kill();
    }

    this.tl = gsap.timeline({
      defaults: {
        duration: 1.2,
        ease: "expo.inOut",
        easeReverse: true,
      },
      paused: true,
    });

    this.tl.to(this.btnOpen, {
      opacity: 0,
    });

    this.tl.to(
      this.thumbnails,
      {
        motionPath: (index) => {
          const targetXItem =
            this.targetX + index * (this.thumbnailRect.width * this.scale + this.gap);

          if (index === 0) {
            return {
              path: [
                {
                  x: targetXItem,
                  y: this.targetY,
                  scale: this.scale,
                },
              ],
            };
          }

          return {
            path: [
              {
                x: this.gap,
                y: this.targetY * 0.45,
                scale: (1 - this.scale) * 0.5 + this.scale,
              },
              {
                x: this.targetX * 0.35 + index * 0.45 + this.gap,
                y: this.targetY * 0.95,
                scale: (1 - this.scale) * 0.25 + this.scale,
              },
              {
                x: targetXItem,
                y: this.targetY,
                scale: this.scale,
              },
            ],
            curviness: 0.45,
          };
        },
        stagger: {
          from: "end",
          each: 0.02,
        },
      },
      "<",
    );

    this.tl.to(
      this.featuredContainer,
      {
        opacity: 1,
      },
      "<",
    );
  }

  onResize() {
    const progress = this.tl.progress();

    // Measure from the original layout rather than the transformed state.
    this.tl.progress(0).pause();

    this.updateMeasurements();

    this.buildTimeline();

    // Restore the previous visual state after rebuilding.
    this.tl.progress(progress).pause();
  }

  addEventListeners() {
    window.addEventListener("resize", this.onResize.bind(this));

    this.btnOpen.addEventListener("click", () => {
      if (this.tl.progress() !== 0 && this.tl.reversed()) return;

      this.btnOpen.style.pointerEvents = "none";
      this.btnClose.style.pointerEvents = "auto";

      this.tl.play();
    });

    this.btnClose.addEventListener("click", () => {
      if (this.tl.progress() === 0 && !this.tl.reversed()) return;

      this.btnOpen.style.pointerEvents = "auto";
      this.btnClose.style.pointerEvents = "none";

      this.tl.reverse();
    });
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  gsap.set(".thumbnail", {
    zIndex: (i, _, arr) => arr.length - i,
  });

  await preloadImages();

  document.body.classList.remove("loading");

  gsap.registerPlugin(MotionPathPlugin);

  new App();
});
