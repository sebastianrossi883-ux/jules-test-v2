# Mappa operativa delle skill

Le skill consegnate sono integrali: questa pagina non le riassume. Stabilisce soltanto quale competenza decide ogni aspetto e quali esempi non sono compatibili con il Metodo 21.

## Precedenza

1. `METHOD/MISSIONE_JULES.md` decide risultato, stack, contenuti e processo.
2. `METHOD/INCARICO_GIRO.md` decide sito e tre materiali del giro.
3. `MOTORE/MOTION.md` descrive le API effettive: pin, misure, callback e cleanup.
4. Questa mappa risolve i conflitti fra skill.
5. La singola skill è una fonte tecnica soltanto nel proprio ambito.

## Nucleo completo di ogni giro

Si leggono tutte all'inizio; ognuna si applica nel passo indicato.

| Fonte integrale | Ambito autorevole | In quale passo della missione |
|---|---|---|
| `complete/cinematic-gsap-lenis-motion-system` | Arco hero-footer, ritmo, profondità e relazione fra scene. | «Regia globale prima delle scene» (arco, ritmo, profondità); «Scene e passaggi» (coreografia) |
| `complete/ui-animation` e i suoi riferimenti integrali | Transizioni fra stati, causalità delle gesture, fisica, coreografia, accessibilità e prestazioni. | Studio e ricostruzione delle meccaniche; composizione e coreografia delle scene; feedback dei controlli |
| `vanilla/emil-design-eng/MESTIERE.md` | Qualità percettiva di curve, trasformazioni, clip, 3D e interazioni. | «Scene e passaggi» (qualità dei dettagli); menu, link, pulsanti e form |
| `vanilla/gsap-core` | API dei tween e delle proprietà. | «Studio integrale delle demo» (leggere il codice); «Scene e passaggi» (scrivere il codice) |
| `vanilla/gsap-timeline` | Sequenze, etichette, sovrapposizioni e controllo delle timeline. | «Studio integrale delle demo» (leggere il codice); «Scene e passaggi» (scrivere il codice) |
| `complete/gsap-scrolltrigger` | Trigger, scrub, pin, refresh e ordine dei trigger. | «Studio integrale delle demo» (leggere il codice); «Scene e passaggi» (scrivere il codice) |
| `vanilla/gsap-performance` | Costo, lifecycle, resize e cleanup locale. | «Studio integrale delle demo» (leggere il codice); «Scene e passaggi» (scrivere il codice) |
| `vanilla/gsap-plugins` | API dei plugin GSAP. | «Studio integrale delle demo» (leggere il codice); «Scene e passaggi» (scrivere il codice) |
| `vanilla/gsap-utils` | Utilità matematiche di GSAP. | «Studio integrale delle demo» (leggere il codice); «Scene e passaggi» (scrivere il codice) |

## Parti non operative

Le seguenti parti restano visibili nelle fonti, ma non si eseguono:

- installazioni, scaffolding, React, Vue, Vite, Tailwind e deploy;
- creazione di Lenis, GSAP, ScrollTrigger o ticker aggiuntivi;
- `gsap.defaults()`, `ScrollSmoother`, `ScrollTrigger.getAll()` e cleanup globali;
- preset `data-motion-*`, valori d'esempio, token fissi e ricette visuali da applicare automaticamente;
- procedure QA, Validation, Discovery, registrazione video, misurazione, Block/Approve o riesame il giorno dopo;
- preferenze stilistiche generiche di sobrietà o valori d'esempio delle skill quando cancellerebbero una meccanica studiata o la regia del sito. Le indicazioni su leggibilità, accessibilità, prestazioni, gestione dei pin, resize e cleanup restano operative anche nelle scene; non sono licenza per ridurre la scena a un fade.

## Ambito di `ui-animation`, Emil e della skill cinematografica

Le fonti restano integrali, comprese le parti non operative. La decisione «non animare», le durate brevi dei feedback e la sobrietà si applicano a menu, form, pulsanti e controlli frequenti. Non autorizzano a omettere scene narrative, trasformazioni del contenuto centrale, fasi, emissioni, cadute o ritorni. Una scena nata da un clic nella demo non diventa per questo un semplice controllo: il suo sviluppo narrativo segue la missione. La lettura e l'uso dei controlli si stabilizzano dopo l'ingresso.

La preferenza generica contro bounce/elastic della skill cinematografica non cancella la fisica del materiale. Le ricette di reveal, i token fissi, i nuovi ticker/Lenis e i default globali degli esempi non si copiano automaticamente. Le curve temporali interne e gli eventuali scrub hanno orologi diversi: la regia conserva le relazioni della meccanica e il runtime fornisce ownership e cleanup.

I riferimenti di `ui-animation` su scroll, coreografia, curve/spring, gesture, clip/SVG e prestazioni sono disponibili integralmente per la tecnica pertinente. Review, Discovery, misurazioni video ed evaluazioni sono riferimenti non operativi, non nuovi passi dell'incarico. Gli esempi React/Framer Motion insegnano relazioni, non cambiano lo stack Vanilla.

## Esclusioni

- `apple-design` resta archiviata e non viene consegnata.
- `gsap-awwwards-website` resta archiviata come esempio React e non viene consegnata.
- Una skill non decide la firma del sito. Easing, ritmo, distanze, trigger e composizione nascono dalla regia corrente e dalla fisica dei materiali.
