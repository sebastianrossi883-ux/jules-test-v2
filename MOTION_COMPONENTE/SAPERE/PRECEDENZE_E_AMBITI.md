# Mappa operativa delle skill

Le skill consegnate sono integrali: questa pagina non le riassume. Stabilisce soltanto quale competenza decide ogni aspetto e quali esempi non sono compatibili con il Metodo 21.

## Precedenza

1. `METHOD/MISSIONE_JULES.md` decide risultato, stack, contenuti e processo.
2. `METHOD/INCARICO_GIRO.md` decide sito e tre materiali del giro.
3. Questa mappa risolve i conflitti fra skill.
4. La singola skill decide la tecnica soltanto nel proprio ambito.

## Nucleo completo di ogni giro

| Fonte integrale | Ambito autorevole |
|---|---|
| `complete/cinematic-gsap-lenis-motion-system` | Arco hero-footer, ritmo, profondità e relazione fra scene. |
| `complete/ui-animation` | Stati, continuità, feedback, gesture, fisica, accessibilità e prestazioni. |
| `vanilla/emil-design-eng/MESTIERE.md` | Qualità percettiva di curve, trasformazioni, clip, 3D e interazioni. |
| `vanilla/gsap-core` | API dei tween e delle proprietà. |
| `vanilla/gsap-timeline` | Sequenze, etichette, sovrapposizioni e controllo delle timeline. |
| `complete/gsap-scrolltrigger` | Trigger, scrub, pin, refresh e ordine dei trigger. |
| `vanilla/gsap-performance` | Costo, lifecycle, resize e cleanup locale. |

## Specialisti completi, scelti per il giro

| Fonte | Quando viene consegnata | Ambito autorevole |
|---|---|---|
| `vanilla/gsap-plugins` | Almeno uno dei tre materiali usa un plugin registrato. | API del plugin richiesto. |
| `vanilla/gsap-utils` | Il dossier contiene distribuzione, wrapping, randomizzazione o trasformazioni numeriche GSAP. | Utilità matematiche di GSAP. |
| Riferimenti tematici di `ui-animation` | Sempre disponibili con la skill completa; si leggono solo per i temi presenti nella regia. | Dettaglio tecnico del tema. |

## Parti non operative

Le seguenti parti restano visibili nelle fonti, ma non si eseguono:

- installazioni, scaffolding, React, Vue, Vite, Tailwind e deploy;
- creazione di Lenis, GSAP, ScrollTrigger o ticker aggiuntivi;
- `gsap.defaults()`, `ScrollSmoother`, `ScrollTrigger.getAll()` e cleanup globali;
- preset `data-motion-*`, valori d'esempio, token fissi e ricette visuali da applicare automaticamente;
- procedure QA, Validation, Discovery, registrazione video, misurazione, Block/Approve o riesame il giorno dopo;
- indicazioni di ridurre sempre intensità, pin, scene o rimbalzi quando la meccanica studiata li richiede. Tali limiti valgono per UI ripetitiva, non cancellano la fisica narrativa delle demo.

## Esclusioni

- `apple-design` resta archiviata e non viene consegnata.
- `gsap-awwwards-website` resta archiviata come esempio React e non viene consegnata.
- Una skill non decide la firma del sito. Easing, ritmo, distanze, trigger e composizione nascono dalla regia corrente e dalla fisica dei materiali.
