/* TABELLA DI TRADUZIONE:
 - Nodo Demo textblock8: .content__text (testi) e .trigger (bottone)
 - Nodo Sito textblock8: .content__text (h2 con data-splitting) e .trigger-textblock8 (button)
 - Traduzione Fisica textblock8: Applicazione di Splitting.js ai nodi di testo e listener sul bottone. Stessa matematica GSAP (scaleY da 1 a 0 e da 0 a 1).

 - Nodo Demo parallax: .bg (div con background-image)
 - Nodo Sito parallax: .parallax-img (tag <img>) in .seed-parallax-section
 - Traduzione Fisica parallax: Poiché il sito usa tag <img> anziché background-image, backgroundPosition non funzionerà. Sostituisco con yPercent calcolato tramite getRatio per lo stesso effetto di scorrimento differenziale.

 - Nodo Demo paths: #seed-paths > posizioni vuote e .path-img
 - Nodo Sito paths: #seed-paths con .seed-paths-inner (sticky), marcatori (.path-pos1, .path-pos2, .path-pos3) e .path-img
 - Traduzione Fisica paths: Il contenitore è sticky. La geometria dei marcatori (.path-posX) viene calcolata sottraendo le coordinate di .seed-paths-inner (il genitore diretto). Animo width, height, x e y del wrapper dell'immagine (.path-img) tramite MotionPathPlugin e scrollTrigger su .seed-paths. I marcatori sono nascosti con opacity-0 pointer-events-none, mai display:none.
*/

document.addEventListener("DOMContentLoaded", () => {
    // Inizializza Splitting globale (richiesto da textblock8)
    if (typeof Splitting !== 'undefined') {
        Splitting();
    }
});

window.MotionKit.ready.then(() => {

    // =========================================================================
    // COMPONENTE: textblock8
    // =========================================================================
    const tb8Root = document.getElementById("component-textblock8");
    if (tb8Root) {
        const texts = [...tb8Root.querySelectorAll('.content__text')];
        const triggerBtn = tb8Root.querySelector('.trigger-textblock8');

        if (texts.length === 2 && triggerBtn) {
            let currentTextPos = 0;
            let isAnimating = false;

            // Impostiamo l'opacità iniziale (il secondo testo ha opacity-0 da CSS)
            texts[0].style.opacity = '1';
            texts[1].style.opacity = '0';

            window.SiteScenes.mount({
                id: "scene-textblock8",
                root: tb8Root,
                writes: [
                    { element: texts[0], property: 'opacity' },
                    { element: texts[1], property: 'opacity' }
                ],
                setup: function(scope) {

                    const switchTexts = () => {
                        if ( isAnimating ) return false;
                        isAnimating = true;

                        const upcomingTextPos = currentTextPos ? 0 : 1;

                        // Assumiamo che Splitting abbia creato i .word o possiamo fare fallback
                        // Le classi .word sono generate da Splitting.
                        const currentWords = texts[currentTextPos].querySelectorAll('.word');
                        const upcomingtWords = texts[upcomingTextPos].querySelectorAll('.word');

                        if (!currentWords.length || !upcomingtWords.length) {
                             isAnimating = false;
                             return;
                        }

                        // Registriamo le risorse animate
                        scope.claim(currentWords, 'transform');
                        scope.claim(upcomingtWords, 'transform');
                        scope.claim(texts[upcomingTextPos], 'opacity');

                        gsap.timeline({
                            defaults: {
                                duration: 0.05,
                                ease: 'expo'
                            },
                            onComplete: () => {
                                currentTextPos = upcomingTextPos;
                                isAnimating = false;
                            }
                        })
                        .fromTo(currentWords, {
                            willChange: 'transform',
                            scaleY: 1
                        }, {
                            duration: .5,
                            ease: 'back.in(3)',
                            scaleY: 0,
                            stagger: {
                                each: 0.03,
                                from: 'start'
                            },
                            onComplete: () => {
                                gsap.set(texts[currentTextPos], { opacity: 0 });
                            }
                        }, 0)
                        .fromTo(upcomingtWords, {
                            willChange: 'transform',
                            scaleY: 0,
                        }, {
                            onStart: () => {
                                gsap.set(texts[upcomingTextPos], { opacity: 1 });
                            },
                            duration: .7,
                            ease: 'elastic.out(0.7)',
                            scaleY: 1,
                            stagger: {
                                each: 0.025,
                                from: 'start'
                            }
                        }, '>-=0.65');
                    };

                    scope.listen(triggerBtn, 'click', switchTexts);

                    return function cleanup() {
                        // GSAP ripulisce la root tramite context, noi puliamo inline style opacità
                        gsap.set(texts, { clearProps: 'all' });
                        gsap.set(texts[0].querySelectorAll('.word'), { clearProps: 'all' });
                        gsap.set(texts[1].querySelectorAll('.word'), { clearProps: 'all' });
                    };
                }
            });
        }
    }

    // =========================================================================
    // SEME: parallax
    // =========================================================================
    const parallaxSections = document.querySelectorAll('.seed-parallax-section');

    // Funzione dal seme per calcolare la ratio
    let getRatio = el => window.innerHeight / (window.innerHeight + el.offsetHeight);

    parallaxSections.forEach((section, i) => {
        // Le demo usa img come .bg
        const imgs = section.querySelectorAll('.parallax-img');
        if (!imgs.length) return;

        window.SiteScenes.mount({
            id: `scene-parallax-${i}`,
            root: section,
            writes: Array.from(imgs).map(img => ({ element: img, property: 'transform' })),
            setup: function(scope) {
                // Poiché abbiamo img reali anziché background-image in un div vuoto,
                // dobbiamo animare il transform yPercent in modo analogo alla formula originale di backgroundPosition.
                // Original: backgroundPosition: 50% ${-window.innerHeight * getRatio(section)}px

                imgs.forEach(img => {
                    scope.claim(img, 'transform');
                    // Facciamo in modo che il ratio calcoli l'offset.
                    // Moltiplichiamo per un fattore per trasformarlo in percentuale di traslazione
                    // oppure calcoliamo i px e passiamo a y. Usiamo yPercent per responsività.
                    // Invece di usare yPercent a caso, ci atteniamo all'idea: far muovere l'immagine dal top al bottom
                    // rispetto all'altezza del contenitore. L'immagine ha h-[120%] e -top-[10%].
                    // Muoviamola in yPercent da -10% a 10% del SUO size per coprire il 20% di extra.
                    // Oppure applichiamo esattamente la ratio. Usiamo yPercent per sicurezza CSS.

                    gsap.fromTo(img, {
                        yPercent: () => i ? -10 * getRatio(section) : 0
                    }, {
                        yPercent: () => 10 * (1 - getRatio(section)),
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: () => i ? "top bottom" : "top top",
                            end: "bottom top",
                            scrub: true,
                            invalidateOnRefresh: true
                        }
                    });
                });

                return function cleanup() {
                    gsap.set(imgs, { clearProps: 'all' });
                };
            }
        });
    });

    // =========================================================================
    // SEME: paths
    // =========================================================================
    const pathsSection = document.getElementById("seed-paths");
    if (pathsSection) {
        const inner = pathsSection.querySelector('.seed-paths-inner');
        const img = pathsSection.querySelector('.path-img');
        const pos1 = pathsSection.querySelector('.path-pos1');
        const pos2 = pathsSection.querySelector('.path-pos2');
        const pos3 = pathsSection.querySelector('.path-pos3');

        if (inner && img && pos1 && pos2 && pos3) {
            window.SiteScenes.mount({
                id: "scene-paths",
                root: pathsSection,
                writes: [
                    { element: img, property: 'transform' },
                    { element: img, property: 'width' },
                    { element: img, property: 'height' }
                ],
                setup: function(scope) {
                    gsap.registerPlugin(MotionPathPlugin);

                    let positions = [];
                    let currentControlPoints = [];

                    function getPositions() {
                        const rectInner = inner.getBoundingClientRect();
                        return [pos1, pos2, pos3].map((el) => {
                            const r = el.getBoundingClientRect();
                            return {
                                // GEOMETRIA RELATIVA: offset dal contenitore
                                x: r.left - rectInner.left + r.width / 2,
                                y: r.top - rectInner.top + r.height / 2,
                                width: r.width,
                                height: r.height,
                            };
                        });
                    }

                    function calculateDefaultControlPoints(pos) {
                        return [
                            { x: pos[0].x, y: pos[0].y + (pos[1].y - pos[0].y) * 0.8 },
                            { x: pos[1].x, y: pos[1].y - Math.min(800, (pos[1].y - pos[0].y) * 0.3) },
                            { x: pos[1].x, y: pos[1].y + Math.min(80, (pos[2].y - pos[1].y) * 0.3) },
                            { x: pos[1].x + (pos[2].x - pos[1].x) * 0.6, y: pos[2].y - (pos[2].y - pos[1].y) * 0.2 }
                        ];
                    }

                    function buildPathString() {
                        return `M${positions[0].x},${positions[0].y} ` +
                            `C${currentControlPoints[0].x},${currentControlPoints[0].y} ${currentControlPoints[1].x},${currentControlPoints[1].y} ${positions[1].x},${positions[1].y} ` +
                            `C${currentControlPoints[2].x},${currentControlPoints[2].y} ${currentControlPoints[3].x},${currentControlPoints[3].y} ${positions[2].x},${positions[2].y}`;
                    }

                    let tl;
                    function buildAnimation() {
                        if (tl) tl.kill();

                        positions = getPositions();
                        if (positions[0].width === 0) return; // Non visibile o non pronto

                        currentControlPoints = calculateDefaultControlPoints(positions);

                        gsap.set(img, {
                            x: positions[0].x,
                            y: positions[0].y,
                            xPercent: -50, // Allineiamo il centro all'ancora
                            yPercent: -50,
                            width: positions[0].width,
                            height: positions[0].height,
                        });

                        tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: pathsSection,
                                start: 'top top',
                                end: 'bottom bottom',
                                scrub: true,
                                invalidateOnRefresh: true
                            },
                        });

                        const pathString = buildPathString();

                        tl.to(img, {
                            duration: 1.5,
                            motionPath: {
                                path: pathString,
                                autoRotate: false,
                            },
                            ease: 'none',
                            onUpdate: function () {
                                const progress = this.progress();
                                if (progress <= 0.5) {
                                    const normalizedProgress = progress * 2;
                                    const width = positions[0].width + (positions[1].width - positions[0].width) * normalizedProgress;
                                    const height = positions[0].height + (positions[1].height - positions[0].height) * normalizedProgress;
                                    img.style.width = `${width}px`;
                                    img.style.height = `${height}px`;
                                } else {
                                    const normalizedProgress = (progress - 0.5) * 2;
                                    const width = positions[1].width + (positions[2].width - positions[1].width) * normalizedProgress;
                                    const height = positions[1].height + (positions[2].height - positions[1].height) * normalizedProgress;
                                    img.style.width = `${width}px`;
                                    img.style.height = `${height}px`;
                                }
                            }
                        });
                    }

                    // Ritardiamo leggermente la build per assicurarci che layout e sticky siano a posto
                    scope.defer(() => {
                        buildAnimation();
                    });

                    // Registriamo resize ricalcolo
                    let resizeTimeout;
                    const onResize = () => {
                        clearTimeout(resizeTimeout);
                        resizeTimeout = setTimeout(() => {
                            buildAnimation();
                        }, 200);
                    };
                    scope.listen(window, 'resize', onResize);

                    return function cleanup() {
                        if (tl) tl.kill();
                        gsap.set(img, { clearProps: 'all' });
                    };
                }
            });
        }
    }

    // =========================================================================
    // MACRO REGIA: HERO
    // =========================================================================
    const header = document.querySelector('header');
    if (header) {
        window.SiteScenes.mount({
            id: 'scene-hero',
            root: header,
            writes: [
                { element: header.querySelector('img'), property: 'transform' },
                { element: header.querySelector('img'), property: 'scale' },
                { element: header.querySelector('h1'), property: 'opacity' }
            ],
            setup: function(scope) {
                const img = header.querySelector('img');
                const h1 = header.querySelector('h1');
                const texts = header.querySelectorAll('p, span, nav, a');

                scope.claim(img, ['scale', 'opacity', 'transform']);
                scope.claim(h1, ['opacity', 'transform']);
                scope.claim(texts, ['opacity', 'transform']);

                // Beat 1: Ingresso (load) - scala e fade dell'immagine
                gsap.fromTo(img,
                    { scale: 1.1, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 2.5, ease: 'power3.out' }
                );

                // Beat 2: Ingresso (load) - comparsa progressiva del testo
                gsap.fromTo(h1,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.5 }
                );

                gsap.fromTo(texts,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.8 }
                );

                // Beat 3: Sviluppo (scroll) - Parallax leggero all'uscita dalla hero
                gsap.to(img, {
                    yPercent: 20,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: header,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true
                    }
                });

                return function cleanup() {
                    gsap.set([img, h1, texts], { clearProps: 'all' });
                };
            }
        });
    }

    // =========================================================================
    // MACRO REGIA: SEZIONE 1
    // =========================================================================
    /* TABELLA DI TRADUZIONE:
     - Nodo Sito: #section-1 (section), h3, p, span
     - Traduzione Fisica: 3 beat collegati: 1. stagger dei testi; 2. leggera scalatura in ingresso; 3. traslazione sottile dell'intero blocco h3 per chiudere la sequenza (Sviluppo richiesto per evitare scene quasi statiche).
    */
    const section1 = document.getElementById('section-1');
    if (section1) {
        window.SiteScenes.mount({
            id: 'scene-section1',
            root: section1,
            writes: [
                { element: section1, property: 'opacity' }
            ],
            setup: function(scope) {
                const h3 = section1.querySelector('h3');
                const els = section1.querySelectorAll('p, span');
                scope.claim(els, ['opacity', 'transform']);
                scope.claim(h3, ['opacity', 'transform', 'scale']);

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section1,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                });

                // Beat 1 & 2: Ingresso (scale & opacity)
                tl.fromTo(h3, { y: 40, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' });

                // Beat 2: Ingresso elementi testuali (stagger)
                tl.fromTo(els, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', stagger: 0.1 }, "-=0.8");

                // Beat 3: Sviluppo (micro-traslazione in uscita/chiusura)
                tl.to(h3, { x: 5, duration: 1.5, ease: 'sine.inOut' }, "-=0.5");

                return function cleanup() {
                    tl.kill();
                    gsap.set([h3, els], { clearProps: 'all' });
                };
            }
        });
    }

    // =========================================================================
    // MACRO REGIA: SEZIONE 6 E FOOTER
    // =========================================================================
    /* TABELLA DI TRADUZIONE:
     - Nodo Sito: #section-6 (section), h2, p, a, span
     - Traduzione Fisica: 3 beat collegati: 1. fade/tracking dello span; 2. ingresso h2 e p; 3. bottone che fa un leggero scale.
    */
    const section6 = document.getElementById('section-6');
    if (section6) {
        window.SiteScenes.mount({
            id: 'scene-section6',
            root: section6,
            writes: [
                { element: section6, property: 'opacity' }
            ],
            setup: function(scope) {
                const s6Title = section6.querySelector('h2');
                const s6Subtitle = section6.querySelector('span');
                const s6Content = section6.querySelector('p');
                const s6Btn = section6.querySelector('a');

                scope.claim(s6Subtitle, ['opacity', 'transform', 'letter-spacing']);
                scope.claim(s6Title, ['opacity', 'transform']);
                scope.claim(s6Content, ['opacity', 'transform']);
                scope.claim(s6Btn, ['opacity', 'transform', 'scale']);

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section6,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                });

                // Beat 1: Subtitle fade up and track out
                tl.fromTo(s6Subtitle, { opacity: 0, y: 15, letterSpacing: "0px" }, { opacity: 1, y: 0, letterSpacing: "4px", duration: 0.8, ease: "power2.out" });

                // Beat 2: Title and Content enter
                tl.fromTo([s6Title, s6Content], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }, "-=0.4");

                // Beat 3: Content and button enter, button scales
                tl.fromTo(s6Btn, { opacity: 0, scale: 0.9, y: 20 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.5)" }, "-=0.4");

                return function cleanup() {
                    tl.kill();
                    gsap.set([s6Subtitle, s6Title, s6Content, s6Btn], { clearProps: 'all' });
                };
            }
        });
    }

    const footer = document.querySelector('footer');
    if (footer) {
        window.SiteScenes.mount({
            id: 'scene-footer',
            root: footer,
            writes: [
                { element: footer, property: 'opacity' }
            ],
            setup: function(scope) {
                const cols = footer.querySelectorAll('div > div > h4, div > div > p');
                const bottom = footer.querySelectorAll('.border-t');
                scope.claim(cols, ['opacity', 'transform']);
                scope.claim(bottom, ['opacity', 'transform']);

                gsap.fromTo(cols,
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: 'power2.out', stagger: 0.05,
                      scrollTrigger: { trigger: footer, start: 'top 90%' }
                    }
                );

                gsap.fromTo(bottom,
                    { opacity: 0 },
                    { opacity: 1, duration: 1, ease: 'power2.out', delay: 0.5,
                      scrollTrigger: { trigger: footer, start: 'top 90%' }
                    }
                );

                return function cleanup() {
                    gsap.set([cols, bottom], { clearProps: 'all' });
                };
            }
        });
    }

});
