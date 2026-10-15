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
    this.numbers = this.thumbnails.map((item) => item.querySelector(".thumbnail__number"));

    this.featuredContainer = document.querySelector(".big-featured__container");

    this.updateMeasurements();

    this.buildTimeline();
    this.addEventListeners();
  }

  get scale() {
    return window.innerWidth < 768 ? 0.6 : 0.4;
  }

  updateMeasurements() {
    this.thumbnailRect = this.thumbnails[0].getBoundingClientRect();

    this.vh = window.innerHeight;
    this.vw = window.innerWidth;

    const scaledWidth = this.thumbnailRect.width * this.scale;

    // Final x-position of the stacked thumbnails.
    // Accounts for the reduced width caused by scaling.
    this.targetX =
      this.vw - this.thumbnailRect.right + (this.thumbnailRect.width - scaledWidth) / 2;

    // Vertically centers the thumbnail stack.
    this.targetY =
      (this.vh - this.thumbnailRect.height * this.scale + this.thumbnailRect.top - this.gap * 2) /
      2;
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
      duration: 0.5,
    });

    this.tl.to(
      this.thumbnails,
      {
        motionPath: (index) => {
          const targetYItem =
            this.targetY - index * (this.thumbnailRect.height * this.scale + this.gap);

          return {
            path: [
              {
                // Slight overshoot before settling into the final stack position.
                x: this.targetX * 0.95,
                y: -targetYItem * 0.095,
                scale: (1 - this.scale) * 0.25 + this.scale,
              },
              {
                x: this.targetX,
                y: -targetYItem,
                scale: this.scale,
              },
            ],
            curviness: 0.45,
          };
        },
        stagger: {
          from: "start",
          each: 0.02,
        },
      },
      "<",
    );

    this.tl.fromTo(
      this.numbers,
      { opacity: 0, yPercent: 50 },
      {
        opacity: 1,
        yPercent: 0,
        stagger: 0.045,
      },
      "<",
    );

    this.tl.to(
      this.featuredContainer,
      {
        scale: 1,
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
      this.btnOpen.style.pointerEvents = "none";
      this.btnClose.style.pointerEvents = "auto";

      this.tl.play();
    });

    this.btnClose.addEventListener("click", () => {
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
