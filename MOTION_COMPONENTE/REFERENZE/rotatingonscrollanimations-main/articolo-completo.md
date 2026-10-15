<!-- articolo preparato per Jules -->
# Articolo dell'autore: Exploring 3D Image Rotations on Scroll

Autore: Manoela Ilic, June 18, 2026. Demo collegata: `MOTION_COMPONENTE/ARCHIVIO/rotatingonscrollanimations-main/`.

È la spiegazione dell'autore della demo. Come si usa lo dicono «Unica gerarchia delle fonti» e «Studio integrale delle demo» in `METHOD/MISSIONE_JULES.md`. La demo ha 5 pagine: `index.html`, `index2.html`, `index3.html`, `index4.html`, `index5.html`.

---

*Some ideas for animating images in 3D while scrolling.*
I really liked how the images rotate as they move through the viewport, and it got me thinking about how many different variations could be built from the same core idea. These demos are the result of that exploration.

The Concept

The main idea behind these effects is to arrange the images along a wave-like path and animate their transforms based on scroll progress. As each image enters and leaves the viewport, it rotates through 3D space while also moving along the z-axis, creating different depth and orientation changes throughout the interaction.

The animations are driven by GSAP's ScrollTrigger, with Lenis providing smooth scrolling. From there, everything comes down to how the transforms are calculated and mapped to the scroll progress.

Variations

Once the basic setup is in place, there are lots of directions you can take it. Different easing curves, interpolation functions, rotation ranges, depth mapping, scaling, and CSS filters all produce very different results while relying on the same underlying structure. Some demos exaggerate the 3D motion, others emphasize depth or use blur and brightness to reinforce the illusion of movement.

Variation 1: A simple combination of 3D rotation and depth, with images following a wave-like layout as they move through the viewport.

Variation 2: Increased rotation angles and stronger depth movement create a more pronounced 3D effect while preserving the same scroll-driven structure.

Variation 3: A non-linear rotation combined with depth, vertical movement, and color adjustments creates a more dynamic transition through the viewport with depth.

Variation 4: Scroll velocity is used to introduce motion blur and saturation changes, making the animation react to how quickly the page is scrolled.

Variation 5: Scale, blur, brightness, and a held midpoint are combined with 3D transforms to create a more stylized transition.

These examples are meant as a starting point, so feel free to tweak the maths, combine ideas from different demos, and see what kinds of interactions you can come up with.
