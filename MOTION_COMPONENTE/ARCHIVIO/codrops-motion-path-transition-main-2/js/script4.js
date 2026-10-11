// Preloads images (and background images if used)
const preloadImages = (selector = "img") => {
  return new Promise((resolve) => {
    imagesLoaded(
      document.querySelectorAll(selector),
      { background: true },
      resolve,
    );
  });
};

class App {
  constructor() {
    this.gap = 10;

    // Final stack position.
    this.stackOffset = 5;

    this.bottomBtn = document.querySelector("#bottom");
    this.leftBtn = document.querySelector("#left");

    this.thumbnails = [...document.querySelectorAll(".thumbnail")];

    this.updateMeasurements();

    this.buildTimeline();
    this.addEventListeners();
  }

  get scale() {
    return window.innerWidth < 768 ? 0.6 : 1;
  }

  updateMeasurements() {
    this.thumbnailRect = this.thumbnails[0].getBoundingClientRect();

    this.vh = window.innerHeight;
    this.vw = window.innerWidth;

    // Final stack position in the top-left area.
    this.targetX = this.stackOffset;
    this.targetY = this.stackOffset;
  }

  buildTimeline() {
    if (this.tl) {
      this.tl.kill();
    }

    this.tl = gsap.timeline({
      defaults: {
        duration: 1.1,
        ease: "expo.inOut",
        easeReverse: true,
      },
      paused: true,
    });

    this.tl.to(this.thumbnails, {
      motionPath: (index) => {
        const top = this.thumbnails[index].getBoundingClientRect().top;

        const targetYItem =
          this.targetY +
          index * (this.thumbnailRect.height * this.scale + this.gap);

        // The first thumbnail becomes the top card in the final strip,
        // so it moves directly into position without a curve.
        if (index === 0) {
          return {
            path: [
              {
                x: this.targetX,
                y: targetYItem,
                scale: this.scale,
              },
            ],
          };
        }

        return {
          path: [
            {
              x: this.targetX * 1.5,
              y: targetYItem > top ? top + 25 : top - 25,
              scale: (1 - this.scale) * 0.25 + this.scale,
            },
            {
              x: this.targetX,
              y: targetYItem,
              scale: this.scale,
            },
          ],
          curviness: 0.25,
        };
      },
      stagger: {
        from: "start",
        each: 0.035,
      },
    });
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

    this.leftBtn.addEventListener("click", () => {
      this.leftBtn.classList.add("trigger__button--active");
      this.bottomBtn.classList.remove("trigger__button--active");

      this.tl.play();
    });

    this.bottomBtn.addEventListener("click", () => {
      this.bottomBtn.classList.add("trigger__button--active");
      this.leftBtn.classList.remove("trigger__button--active");

      this.tl.reverse();
    });
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  await preloadImages();

  document.body.classList.remove("loading");

  gsap.registerPlugin(MotionPathPlugin);

  new App();
});
