window.MotionKit.ready.then(() => {

    // =========================================================================
    // MACRO REGIA: HERO
    // =========================================================================
    const header = document.querySelector('header');
    if (header) {
        window.SiteScenes.mount({
            id: 'scene-hero',
            root: header,
            writes: [
                { element: header.querySelector('.hero-bg-img'), property: 'transform' },
                { element: header.querySelector('.hero-bg-img'), property: 'scale' },
                { element: header.querySelector('#hero-content'), property: 'opacity' },
                { element: header.querySelector('#hero-content'), property: 'transform' }
            ],
            setup: function(scope) {
                const img = header.querySelector('.hero-bg-img');
                const content = header.querySelector('#hero-content');

                scope.claim(img, ['scale', 'opacity', 'transform']);
                scope.claim(content, ['opacity', 'transform']);

                // Beat 1: Ingresso (load) - scala e fade
                gsap.fromTo(img,
                    { scale: 1.1, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 2.5, ease: 'power3.out' }
                );

                gsap.fromTo(content,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.5 }
                );

                // Beat 2: Sviluppo (scroll)
                gsap.to(img, {
                    yPercent: 30,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: header,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true
                    }
                });

                gsap.to(content, {
                    yPercent: 50,
                    opacity: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: header,
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true
                    }
                });

                return function cleanup() {
                    gsap.set([img, content], { clearProps: 'all' });
                };
            }
        });
    }

    // =========================================================================
    // MACRO REGIA: CHAPTER 1 (Grid)
    // =========================================================================
    /* TABELLA DI TRADUZIONE:
     - Nodo Componente: .block.block--main (sezione), .block__wrapper (sticky container), .gallery__grid, .gallery__item, .content (text)
     - Nodo Sito: #chapter-1 (section), .chapter-1-wrapper (sticky container), .chapter-1-grid, .grid-image-wrapper, .chapter-1-content
     - Traduzione Fisica: Il componente originale 'StickyGridScroll' usa classi JS per gestire il reveal e lo zoom della griglia su scroll. Lo traduciamo in una timeline di ScrollTrigger con scrub legato allo scroll della sezione.
     - Beat 1: Intro Parallax - Il container generale sale come parallax
     - Beat 2: Grid Reveal - Le colonne laterali partono da sopra, la centrale da sotto
     - Beat 3: Grid Zoom - La griglia si ingrandisce, le colonne laterali si separano in X, la centrale si sposta in Y
     - Beat 4: Text Reveal - Il testo svaniva per lasciare spazio, qui lo facciamo comparire mentre la griglia si apre
    */
    const chapter1 = document.getElementById('chapter-1');
    if (chapter1) {
        window.SiteScenes.mount({
            id: 'scene-chapter1',
            root: chapter1,
            setup: function(scope) {
                const wrapper = chapter1.querySelector('.chapter-1-wrapper');
                const grid = chapter1.querySelector('.chapter-1-grid');
                const items = chapter1.querySelectorAll('.grid-image-wrapper');
                const textContent = chapter1.querySelector('.chapter-1-content');
                const textElements = chapter1.querySelectorAll('.chapter-1-title, .chapter-1-desc');

                scope.claim(wrapper, ['transform']);
                scope.claim(grid, ['transform', 'scale']);
                scope.claim(items, ['transform']);
                scope.claim(textElements, ['opacity', 'transform']);

                // Raggruppa in colonne (3 colonne)
                const numColumns = 3;
                const columns = Array.from({ length: numColumns }, () => []);
                items.forEach((item, index) => {
                    columns[index % numColumns].push(item);
                });

                const wh = window.innerHeight;

                // Impostiamo stato iniziale dei testi a 0
                gsap.set(textElements, { opacity: 0, yPercent: 50 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: chapter1,
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: true
                    }
                });

                // Beat 2: Grid Reveal (inizia leggermente dopo)
                const dy = wh; // Partono da fuori schermo
                columns.forEach((column, colIndex) => {
                    const fromTop = colIndex % 2 === 0;
                    tl.from(column, {
                        y: dy * (fromTop ? -1 : 1),
                        stagger: {
                            each: 0.05,
                            from: fromTop ? "end" : "start"
                        },
                        ease: "power1.inOut",
                        duration: 1
                    }, 0);
                });

                // Beat 3: Grid Zoom & Translate
                tl.to(grid, { scale: 2.5, duration: 1, ease: "power2.inOut" }, 0.8);
                tl.to(columns[0], { xPercent: -60, duration: 1, ease: "power2.inOut" }, 0.8);
                tl.to(columns[2], { xPercent: 60, duration: 1, ease: "power2.inOut" }, 0.8);

                // Muoviamo la colonna centrale in base all'indice
                tl.to(columns[1], {
                    yPercent: (index) => (index < Math.floor(columns[1].length / 2) ? -1 : 1) * 60,
                    duration: 1,
                    ease: "power2.inOut"
                }, 0.8);

                // Beat 4: Text Reveal (mentre la griglia si allarga)
                tl.to(textElements, {
                    opacity: 1,
                    yPercent: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out"
                }, 1.2);


                return function cleanup() {
                    if (tl) tl.kill();
                    gsap.set([wrapper, grid, items, textElements], { clearProps: 'all' });
                };
            }
        });
    }

    // =========================================================================
    // MACRO REGIA: CHAPTER 2 (Gravity / MWG)
    // =========================================================================
    /* TABELLA DI TRADUZIONE:
     - Nodo Seme: .codrops_mwg (root), .medias img
     - Nodo Sito: #chapter-2 (section), .chapter-2-canvas, .gravity-img
     - Traduzione Fisica: Il seme originale crea dinamicamente immagini al movimento del mouse, facendole cadere con un effetto elastico, rimbalzo e rotazione per poi rimuoverle.
     - Traduzione Regia: Adattiamo l'effetto per lo scroll. Man mano che scendiamo nella sezione, le 10 immagini preesistenti appaiono (cadendo dall'alto o rimbalzando), accumulandosi e ruotando, creando l'illusione della gravità attivata dallo scroll.
    */
    const chapter2 = document.getElementById('chapter-2');
    if (chapter2) {
        window.SiteScenes.mount({
            id: 'scene-chapter2',
            root: chapter2,
            setup: function(scope) {
                const images = chapter2.querySelectorAll('.gravity-img');
                scope.claim(images, ['transform', 'opacity', 'scale']);

                const W = window.innerWidth;
                const H = window.innerHeight;

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: chapter2,
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 1
                    }
                });

                // Posizioniamo inizialmente in modo random, sopra lo schermo
                images.forEach((img, i) => {
                    const startX = (Math.random() * (W - 200));
                    const startY = -300 - (Math.random() * 200);
                    const endX = startX + (Math.random() - 0.5) * 100;
                    // Calcoliamo una posizione finale y
                    const endY = H - 200 - (Math.random() * 200);

                    gsap.set(img, { x: startX, y: startY, opacity: 0, scale: 1.3, rotation: (Math.random() - 0.5) * 40 });

                    // Ingresso
                    tl.to(img, {
                        y: endY,
                        x: endX,
                        opacity: 1,
                        scale: 1,
                        rotation: (Math.random() - 0.5) * 20,
                        duration: 1,
                        ease: 'bounce.out'
                    }, i * 0.15); // Stagger progressivo basato sullo scroll

                    // Uscita (caduta ulteriore) alla fine della timeline
                    tl.to(img, {
                        y: H + 300,
                        opacity: 0,
                        rotation: (Math.random() - 0.5) * 60,
                        duration: 0.5,
                        ease: 'power2.in'
                    }, (images.length * 0.15) + (i * 0.05) + 0.5);
                });

                return function cleanup() {
                    if (tl) tl.kill();
                    gsap.set(images, { clearProps: 'all' });
                };
            }
        });
    }

    // =========================================================================
    // MACRO REGIA: CHAPTER 3 (Motion Path Transition)
    // =========================================================================
    /* TABELLA DI TRADUZIONE:
     - Nodo Seme: .content (wrapper), .thumbnail
     - Nodo Sito: #chapter-3 (section), .chapter-3-canvas, .thumbnail
     - Traduzione Fisica: Il seme originale sposta una pila di miniature (bottom-left) srotolandole lungo un percorso 'motionPath' curvo per disporle a nastro orizzontale o verticale in base ai bottoni.
     - Traduzione Regia: Attiviamo questo srotolamento con lo scroll. All'inizio (top della sezione) le miniature sono impilate, allo scroll si distribuiscono lungo la curva fino alla loro posizione finale.
    */
    const chapter3 = document.getElementById('chapter-3');
    if (chapter3) {
        window.SiteScenes.loadDependencies({
            id: 'scene-chapter3',
            dependencies: [
                { name: 'MotionPathPlugin', path: 'MOTORE/vendor/MotionPathPlugin.min.js', global: 'MotionPathPlugin' }
            ]
        }).then(() => {
            gsap.registerPlugin(MotionPathPlugin);

            window.SiteScenes.mount({
                id: 'scene-chapter3',
                root: chapter3,
                setup: function(scope) {
                    const thumbnails = Array.from(chapter3.querySelectorAll('.thumbnail'));
                    scope.claim(thumbnails, ['transform', 'opacity', 'scale']);

                    // Configurazione layout iniziale come nel seme
                    // stackOffset (basso a sinistra)
                    const vh = window.innerHeight;
                    const vw = window.innerWidth;

                    const scale = vw < 768 ? 0.6 : 1;
                    const thumbRect = thumbnails[0].getBoundingClientRect();
                    const thumbWidth = thumbRect.width || 120;
                    const thumbHeight = thumbRect.height || 168;
                    const padding = 40;
                    const gap = 15;

                    // Posizione pila (in basso a sinistra)
                    const stackX = padding;
                    const stackY = vh - padding - thumbHeight;

                    // Setup iniziale: tutti alla pila
                    gsap.set(thumbnails, { x: stackX, y: stackY, scale: 0.8, opacity: 0 });

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: chapter3,
                            start: 'top top',
                            end: 'bottom bottom',
                            scrub: true
                        }
                    });

                    // Facciamo comparire la pila all'inizio
                    tl.to(thumbnails, { opacity: 1, duration: 0.1, ease: 'none' }, 0);

                    // Distribuzione lungo il Path
                    tl.to(thumbnails, {
                        motionPath: (index) => {
                            // Target finale: una riga a metà schermo (come demo-5)
                            const targetY = (vh / 2) - (thumbHeight / 2);
                            const targetX = padding + (index * (thumbWidth * scale + gap));

                            if (index === 0) {
                                return { path: [{ x: targetX, y: targetY, scale: scale }] };
                            }

                            return {
                                path: [
                                    { x: stackX + 100, y: stackY - 100, scale: (1 - scale) * 0.25 + scale }, // Punto intermedio curvo
                                    { x: targetX, y: targetY, scale: scale }
                                ],
                                curviness: 1.2
                            };
                        },
                        stagger: {
                            from: "start",
                            each: 0.05
                        },
                        ease: "power2.inOut",
                        duration: 1
                    }, 0.1);

                    return function cleanup() {
                        if (tl) tl.kill();
                        gsap.set(thumbnails, { clearProps: 'all' });
                    };
                }
            });
        });
    }

});
