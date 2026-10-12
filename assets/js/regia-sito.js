/* Regia specifica del sito: le scene riusano il runtime globale Metodo 21. */
MotionKit.ready.then(() => {
    // Registrazione Plugin GSAP (se non già caricati dal motore o se serve explicit)
    if (window.MotionPathPlugin) {
        gsap.registerPlugin(MotionPathPlugin);
    }

    // ==========================================
    // SEZIONE 5: COMPONENTE sticky-grid-scroll
    // ==========================================
    const section5 = document.querySelector("#section-5");
    if (section5) {
        // Preparazione DOM per rispecchiare la demo (9 items, 3 colonne) come richiesto da missione:
        // "usa le foto del sito anche ripetute o ritagliate in modo diverso, senza ridurre la formazione"
        const originalGrid = section5.querySelector('.grid');
        const originalCards = Array.from(originalGrid.querySelectorAll('.w-full'));

        // Creiamo wrapper e content
        const contentContainer = section5.querySelector('.max-w-4xl');
        // Aggiungiamo un contenitore "wrapper" per la logica di scroll
        section5.classList.add('relative');
        section5.style.height = "500vh"; // come in css demo

        // Costruiamo la griglia da 9 items copiando i 2 originali
        const newGrid = document.createElement('div');
        newGrid.className = 'gallery__grid absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[150vh] grid grid-cols-3 gap-[2vw] pointer-events-none opacity-0';

        for (let i = 0; i < 9; i++) {
            const clone = originalCards[i % 2].cloneNode(true);
            clone.classList.remove('aspect-[3/4.2]', 'w-full');
            clone.classList.add('gallery__item', 'w-full', 'h-full', 'object-cover', 'will-change-transform');
            // Ritocco style per la griglia
            clone.style.height = '100%';
            newGrid.appendChild(clone);
        }

        // Nascondiamo l'originale
        originalGrid.style.display = 'none';

        // Inseriamo in un wrapper appiccicoso come `.block__wrapper`
        const stickyWrapper = document.createElement('div');
        stickyWrapper.className = 'sticky top-0 w-full h-screen overflow-hidden';

        // Riposizioniamo contentContainer e newGrid dentro stickyWrapper
        contentContainer.parentNode.insertBefore(stickyWrapper, contentContainer);
        stickyWrapper.appendChild(contentContainer);
        stickyWrapper.appendChild(newGrid);

        // Render visibile per script
        newGrid.style.opacity = '1';

        SiteScenes.mount({
            id: "scena-tradizione",
            root: section5,
            setup() {
                // 1. getElements()
                // demo: src/scripts/index.js:18
                const block = section5;
                const wrapper = stickyWrapper;
                const content = contentContainer;
                const title = contentContainer.querySelector('h2');
                const description = contentContainer.querySelector('p');
                const button = null; // Nessun bottone qui
                const grid = newGrid;
                const items = Array.from(newGrid.querySelectorAll('.gallery__item'));

                // 2. initContent()
                // demo: src/scripts/index.js:37
                if (description) gsap.set([description], { opacity: 0, pointerEvents: "none" });
                let titleOffsetY = 0;
                if (content && title) {
                    const dy = (content.offsetHeight - title.offsetHeight) / 2;
                    titleOffsetY = (dy / content.offsetHeight) * 100;
                    gsap.set(title, { yPercent: titleOffsetY });
                }

                // 3. groupItemsByColumn()
                // demo: src/scripts/index.js:55
                const numColumns = 3;
                const columns = Array.from({ length: numColumns }, () => []);
                items.forEach((item, index) => {
                    columns[index % numColumns].push(item);
                });

                // 4. addParallaxOnScroll()
                // demo: src/scripts/index.js:71
                gsap.from(wrapper, {
                    yPercent: -100,
                    ease: "none",
                    scrollTrigger: {
                        trigger: block,
                        start: "top bottom",
                        end: "top top",
                        scrub: true,
                    },
                });

                // 5. animateTitleOnScroll()
                // demo: src/scripts/index.js:90
                gsap.from(title, {
                    opacity: 0,
                    duration: 0.7,
                    ease: "power1.out",
                    scrollTrigger: {
                        trigger: block,
                        start: "top 57%",
                        toggleActions: "play none none reset",
                    },
                });

                // 6. gridRevealTimeline()
                // demo: src/scripts/index.js:108
                function gridRevealTimeline() {
                    const timeline = gsap.timeline();
                    const wh = window.innerHeight;
                    const dy = wh - (wh - grid.offsetHeight) / 2;

                    columns.forEach((column, colIndex) => {
                        const fromTop = colIndex % 2 === 0;
                        timeline.from(
                            column,
                            {
                                y: dy * (fromTop ? -1 : 1),
                                stagger: {
                                    each: 0.06,
                                    from: fromTop ? "end" : "start",
                                },
                                ease: "power1.inOut",
                            },
                            "grid-reveal"
                        );
                    });
                    return timeline;
                }

                // 7. gridZoomTimeline()
                // demo: src/scripts/index.js:141
                function gridZoomTimeline() {
                    const timeline = gsap.timeline({ defaults: { duration: 1, ease: "power3.inOut" } });
                    timeline.to(grid, { scale: 2.05 });
                    timeline.to(columns[0], { xPercent: -40 }, "<");
                    timeline.to(columns[2], { xPercent: 40 }, "<");
                    timeline.to(
                        columns[1],
                        {
                            yPercent: (index) => (index < Math.floor(columns[1].length / 2) ? -1 : 1) * 40,
                            duration: 0.5,
                            ease: "power1.inOut",
                        },
                        "-=0.5"
                    );
                    return timeline;
                }

                // toggleContent()
                // demo: src/scripts/index.js:174
                function toggleContent(isVisible = true) {
                    gsap.timeline({ defaults: { overwrite: true } })
                        .to(title, {
                            yPercent: isVisible ? 0 : titleOffsetY,
                            duration: 0.7,
                            ease: "power2.inOut",
                        })
                        .to(
                            [description],
                            {
                                opacity: isVisible ? 1 : 0,
                                duration: 0.4,
                                ease: `power1.${isVisible ? "inOut" : "out"}`,
                                pointerEvents: isVisible ? "all" : "none",
                            },
                            isVisible ? "-=90%" : "<"
                        );
                }

                // animateGridOnScroll()
                // demo: src/scripts/index.js:203
                const timeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: block,
                        start: "top 25%",
                        end: "bottom bottom",
                        scrub: true,
                    },
                });

                timeline
                    .add(gridRevealTimeline())
                    .add(gridZoomTimeline(), "-=0.6")
                    .add(() => toggleContent(timeline.scrollTrigger.direction === 1), "-=0.32");

                return () => {
                    ScrollTrigger.getAll().forEach(t => t.kill());
                };
            }
        });
    }

});

    // ==========================================
    // SEZIONE 1: SEME codrops-mwg
    // ==========================================
    const section1 = document.querySelector("#section-1");
    if (section1) {
        // legge: mwg:createMedia
        SiteScenes.mount({
            id: "scena-hero",
            root: section1,
            setup() {
                const imgOriginal = section1.querySelector('img');
                const imgSrc = imgOriginal ? imgOriginal.src : '';

                // Nascondiamo l'immagine di background fissa, useremo la logica mwg
                if (imgOriginal) imgOriginal.style.opacity = '0';

                const W = window.innerWidth;
                const H = window.innerHeight;
                let lastScroll = 0;
                let isFirstScroll = true;

                function createMedia(x, y, deltaX, deltaY) {
                    if (y > H - 200) return;
                    const image = document.createElement("img");
                    image.setAttribute('src', imgSrc);
                    image.style.position = 'absolute';
                    image.style.width = '150px';
                    image.style.height = 'auto';
                    image.style.zIndex = '0';
                    section1.appendChild(image);

                    const tl = gsap.timeline({
                        onComplete: () => {
                            if (section1.contains(image)) section1.removeChild(image);
                            tl && tl.kill();
                        }
                    });

                    tl.fromTo(image, {
                        xPercent: -50 + (Math.random() - 0.5) * 80,
                        yPercent: -50 + (Math.random() - 0.5) * 10,
                        scaleX: 1.3,
                        scaleY: 1.3,
                        rotation: (Math.random() - 0.5) * 20
                    }, {
                        scaleX: 1,
                        scaleY: 1,
                        ease: 'elastic.out(2, 0.6)',
                        duration: 0.4
                    });

                    tl.fromTo(image, { x }, {
                        x: '+=' + deltaX * 2,
                        rotation: 0,
                        ease: 'power1.in',
                        duration: 0.4
                    }, '<');

                    tl.fromTo(image, { y }, {
                        y: '+=' + (H - y),
                        scale: 0.9,
                        yPercent: -95,
                        ease: 'back.in(1.1)',
                        duration: 0.4
                    }, '<');

                    // BOUNCE
                    tl.to(image, {
                        x: '+=' + deltaX * 1.6,
                        rotation: (Math.random() - 0.5) * 40,
                        ease: 'power1.in',
                        duration: 0.3
                    });
                    tl.to(image, {
                        yPercent: 150,
                        ease: 'back.in(' + (1.5 + (1 - y/H)) + ')',
                        duration: 0.3
                    }, '<');
                }

                ScrollTrigger.create({
                    trigger: section1,
                    start: "top top",
                    end: "bottom top",
                    onUpdate: (self) => {
                        const currentScroll = self.scroll();
                        if (isFirstScroll) {
                            lastScroll = currentScroll;
                            isFirstScroll = false;
                            return;
                        }
                        const delta = currentScroll - lastScroll;
                        if (Math.abs(delta) > window.innerHeight / 8) {
                            lastScroll = currentScroll;
                            // Generiamo l'immagine in punti random lungo lo scroll o fissi al centro
                            const randomX = window.innerWidth / 2 + (Math.random() - 0.5) * 400;
                            const randomY = window.innerHeight / 3 + (Math.random() - 0.5) * 100;
                            createMedia(randomX, randomY, delta > 0 ? 50 : -50, delta > 0 ? 50 : -50);
                        }
                    }
                });

                return () => {};
            }
        });
    }

    // ==========================================
    // SEZIONE 2: SEME motion-path-transition (index2.html / script2.js)
    // ==========================================
    const section2 = document.querySelector("#section-2");
    if (section2) {
        // legge: motion-path-transition:buildTimeline
        SiteScenes.mount({
            id: "scena-selezione",
            root: section2,
            setup() {
                const img = section2.querySelector('img');
                const textContainer = section2.querySelector('.lg\\:col-span-6:last-child');

                // Impostiamo l'ingresso su curva per l'immagine
                if (img && textContainer) {
                    const rect = img.getBoundingClientRect();
                    const targetX = -rect.left + 10;
                    const targetY = window.innerHeight - rect.bottom + (rect.height * 0.5) / 2 + 10;

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: section2,
                            start: "top 80%",
                            end: "top 20%",
                            scrub: true
                        }
                    });

                    tl.fromTo(img, {
                        x: 10,
                        y: targetY * 0.45,
                        scale: (1 - 0.5) * 0.5 + 0.5
                    }, {
                        motionPath: {
                            path: [
                                { x: targetX * 0.35 + 10, y: targetY * 0.95, scale: (1 - 0.5) * 0.25 + 0.5 },
                                { x: 0, y: 0, scale: 1 } // Arriva alla sua posizione finale nel layout
                            ],
                            curviness: 0.45
                        },
                        duration: 1.2,
                        ease: "expo.inOut"
                    });

                    tl.fromTo(textContainer, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, "<0.5");
                }
                return () => {};
            }
        });
    }


    // ==========================================
    // SEZIONE 4: SEME motion-path-transition (index3.html / script3.js)
    // ==========================================
    const section4 = document.querySelector("#section-4");
    if (section4) {
        // legge: motion-path-transition:buildTimeline (index3)
        SiteScenes.mount({
            id: "scena-vigneti",
            root: section4,
            setup() {
                const imgContainer = section4.querySelector('.lg\\:col-span-6:last-child');
                const textContainer = section4.querySelector('.lg\\:col-span-6:first-child');

                if (imgContainer && textContainer) {
                    const rect = imgContainer.getBoundingClientRect();
                    const targetY = ((window.innerHeight - rect.height + rect.top - 20) / 2) * -1;

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: section4,
                            start: "top 80%",
                            end: "top 20%",
                            scrub: true
                        }
                    });

                    // Sale dal fondo in linea verticale curvata leggermente all'arrivo
                    tl.fromTo(imgContainer, {
                        y: window.innerHeight * 0.5
                    }, {
                        motionPath: {
                            path: [
                                { x: 0, y: targetY * 0.15 },
                                { x: 0, y: 0 }
                            ],
                            curviness: 0.5
                        },
                        duration: 1.2,
                        ease: "expo.inOut"
                    });

                    tl.from(textContainer.querySelectorAll('h2, p, span, div'), {
                        opacity: 0,
                        yPercent: 50,
                        stagger: 0.045,
                        duration: 1.2,
                        ease: "expo.inOut"
                    }, "<");
                }
                return () => {};
            }
        });
    }


    // ==========================================
    // SEZIONE 3: Variabile del componente / Parallasse
    // ==========================================
    const section3 = document.querySelector("#section-3");
    if (section3) {
        // legge: codrops-sticky-grid-scroll-main:addParallaxOnScroll (riadattato)
        SiteScenes.mount({
            id: "scena-cantina",
            root: section3,
            setup() {
                const bgImage = section3.querySelector('img');
                const title = section3.querySelector('h2');

                if (bgImage) {
                    gsap.fromTo(bgImage, { yPercent: -15 }, {
                        yPercent: 15,
                        ease: "none",
                        scrollTrigger: {
                            trigger: section3,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    });
                }

                if (title) {
                    gsap.from(title, {
                        opacity: 0,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: section3,
                            start: "top 60%",
                            toggleActions: "play none none reverse"
                        }
                    });
                }
                return () => {};
            }
        });
    }

    // ==========================================
    // SEZIONE 6 & FOOTER: Seme motion-path-transition uscita a stack / Parallasse
    // ==========================================
    const section6 = document.querySelector("#section-6");
    const footer = document.querySelector("footer");

    if (section6 && footer) {
        // legge: motion-path-transition:script4 (stack/uscita)
        SiteScenes.mount({
            id: "scena-accoglienza",
            root: section6,
            setup() {
                const title = section6.querySelector('h2');
                const p = section6.querySelector('p');
                const btn = section6.querySelector('a');

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section6,
                        start: "top 70%",
                        end: "top 30%",
                        scrub: true
                    }
                });

                tl.from([title, p], {
                    xPercent: -50,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 1,
                    ease: "power3.out"
                });

                tl.from(btn, { scale: 0.8, opacity: 0, duration: 0.5 }, "-=0.5");

                // footer emerge
                gsap.fromTo(footer, { yPercent: -50 }, {
                    yPercent: 0,
                    ease: "none",
                    scrollTrigger: {
                        trigger: footer,
                        start: "top bottom",
                        end: "bottom bottom",
                        scrub: true
                    }
                });

                return () => {};
            }
        });
    }

    // ==========================================
    // PASSAGGI TRA SEZIONI
    // ==========================================
    // Per garantire la regola "// passaggio: sezione-A→sezione-B"
    // I passaggi condividono un valore visivo nell'ultimo quinto della A e primo quinto della B.

    // passaggio: sezione-1→sezione-2
    if (section1 && section2) {
        gsap.to(section1, {
            backgroundColor: "#ffffff",
            scrollTrigger: {
                trigger: section1,
                start: "bottom 20%",
                end: "bottom top",
                scrub: true
            }
        });
        gsap.fromTo(section2, { backgroundColor: "#ffffff" }, {
            backgroundColor: "#ffffff",
            scrollTrigger: {
                trigger: section2,
                start: "top bottom",
                end: "top 80%",
                scrub: true
            }
        });
    }

    // passaggio: sezione-2→sezione-3
    if (section2 && section3) {
        const title2 = section2.querySelector('h2');
        if (title2) {
            gsap.to(title2, {
                color: "#c5a059",
                scrollTrigger: {
                    trigger: section2,
                    start: "bottom 20%",
                    end: "bottom top",
                    scrub: true
                }
            });
        }
        const subtitle3 = section3.querySelector('span.text-stone-300\\/80');
        if (subtitle3) {
            gsap.fromTo(subtitle3, { color: "#c5a059" }, {
                color: "rgba(214, 211, 209, 0.8)",
                scrollTrigger: {
                    trigger: section3,
                    start: "top bottom",
                    end: "top 80%",
                    scrub: true
                }
            });
        }
    }

    // passaggio: sezione-3→sezione-4
    if (section3 && section4) {
        gsap.to(section3, {
            backgroundColor: "#fbfbfa",
            scrollTrigger: {
                trigger: section3,
                start: "bottom 20%",
                end: "bottom top",
                scrub: true
            }
        });
        gsap.fromTo(section4, { backgroundColor: "#fbfbfa" }, {
            backgroundColor: "#fbfbfa",
            scrollTrigger: {
                trigger: section4,
                start: "top bottom",
                end: "top 80%",
                scrub: true
            }
        });
    }

    // passaggio: sezione-4→sezione-5
    if (section4 && section5) {
        const divider = section4.querySelector('.bg-\\[\\#c5a059\\]');
        if (divider) {
            gsap.to(divider, {
                scaleX: 2,
                scrollTrigger: {
                    trigger: section4,
                    start: "bottom 20%",
                    end: "bottom top",
                    scrub: true
                }
            });
        }
        const subtitle5 = section5.querySelector('.text-\\[\\#bda170\\]');
        if (subtitle5) {
            gsap.fromTo(subtitle5, { x: -20 }, {
                x: 0,
                scrollTrigger: {
                    trigger: section5,
                    start: "top bottom",
                    end: "top 80%",
                    scrub: true
                }
            });
        }
    }

    // passaggio: sezione-5→sezione-6
    if (section5 && section6) {
        gsap.to(section5, {
            backgroundColor: "#1b2c24",
            scrollTrigger: {
                trigger: section5,
                start: "bottom 20%",
                end: "bottom top",
                scrub: true
            }
        });
        gsap.fromTo(section6, { backgroundColor: "#1b2c24" }, {
            backgroundColor: "#1b2c24",
            scrollTrigger: {
                trigger: section6,
                start: "top bottom",
                end: "top 80%",
                scrub: true
            }
        });
    }
