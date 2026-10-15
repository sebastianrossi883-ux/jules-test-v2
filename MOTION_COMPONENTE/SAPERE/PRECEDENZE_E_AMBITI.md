# Mappa operativa delle skill

Le skill consegnate sono integrali: questa pagina non le riassume. Stabilisce soltanto quale competenza decide ogni aspetto e quali esempi non sono compatibili con il Metodo 21.

## Precedenza

1. `METHOD/MISSIONE_JULES.md` decide risultato, stack, contenuti e processo.
2. `METHOD/INCARICO_GIRO.md` decide sito e tre materiali del giro.
3. `MOTORE/MOTION.md` descrive le API effettive: pin, misure, callback e cleanup, e rettifica gli esempi tecnici GSAP inesatti individuati nelle fonti originali. Per quei punti prevale sulla skill integrale.
4. Questa mappa risolve i conflitti fra skill.
5. La singola skill è una fonte tecnica soltanto nel proprio ambito.

## Nucleo completo di ogni giro

Restano tutte disponibili e integrali; ciascuna si legge e si applica nel passo indicato da `METHOD/SKILL_ROUTING_GIRO.md`, senza caricare insieme ricette estranee alla decisione corrente.

| Fonte integrale | Ambito autorevole | In quale passo della missione |
|---|---|---|
| `complete/build-awwwards-quality-sites` | Direzione artistica specifica del sito: tesi visiva, gerarchie, trattamento dei media, continuità e idea distintiva; non modifica l'identità del cliente. | «Regia globale prima delle scene» (composizione e racconto); «Scene e passaggi» (traduzione negli stati visivi) |
| `complete/cinematic-gsap-lenis-motion-system` | Arco hero-footer, ritmo, profondità e relazione fra scene. | «Regia globale prima delle scene» (arco, ritmo, profondità); «Scene e passaggi» (coreografia) |
| `complete/emil-design-eng` | Coerenza spaziale, origini, continuità, trasformazioni, gesti e dettagli percettivi; non stabilisce la fisica dei materiali o la firma del sito. | «Scene e passaggi» (qualità dei dettagli); menu, link, pulsanti e form |
| `complete/animate` | Costruzione e interruzione delle transizioni dei controlli reali; ricette tecniche, non scene narrative precostruite. | Menu, link, pulsanti e form; dettagli di transizione assegnati dalla regia |
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
- ordine fisso degli ingressi, stessa composizione per tutte le scene, quantità di layer e ricette di fusione da imporre a ogni sito;
- procedure QA, Validation, Discovery, registrazione video, misurazioni di conformita' o benchmark rispetto alle demo, Block/Approve o riesame il giorno dopo. Le misure di layout, font, coordinate e renderer necessarie a costruire gli stati e le animazioni restano parte della realizzazione;
- preferenze stilistiche generiche di sobrietà o valori d'esempio delle skill quando cancellerebbero una meccanica studiata o la regia del sito. Le indicazioni su leggibilità, accessibilità, prestazioni, gestione dei pin, resize e cleanup restano operative anche nelle scene; non sono licenza per ridurre la scena a un fade.

## Ambito di Emil e della skill cinematografica

Le fonti restano integrali, comprese le parti non operative. La decisione «non animare», le durate brevi dei feedback e la sobrietà si applicano a menu, form, pulsanti e controlli frequenti. Non autorizzano a omettere scene narrative, trasformazioni del contenuto centrale, fasi, emissioni, cadute o ritorni. Una scena nata da un clic nella demo non diventa per questo un semplice controllo: il suo sviluppo narrativo segue la missione. La lettura e l'uso dei controlli si stabilizzano dopo l'ingresso.

La preferenza generica contro bounce/elastic della skill cinematografica non cancella la fisica del materiale. Le ricette di reveal, i token fissi, i nuovi ticker/Lenis e i default globali degli esempi non si copiano automaticamente. Le curve temporali interne e gli eventuali scrub hanno orologi diversi: la regia conserva le relazioni della meccanica e il runtime fornisce ownership e cleanup.

Gli esempi tecnici aiutano a realizzare gli stati progettati, non li sostituiscono. La qualità delle relazioni originali e la trasposizione nel nuovo design sono definite nella missione; una skill non autorizza a tagliare fasi, uniformare la fisica o usare un semplice reveal al posto di una meccanica strutturale.

## Distinzione delle fonti e ambito di Meng To / Animate

Il sito del cliente è la fonte di identità, contenuti, media e funzioni; le demo selezionate sono sorgenti tecniche di meccaniche; eventuali altri esempi visivi sono referenze estetiche. Il divieto di ricalcare referenze di Meng To protegge la composizione: non vieta lo studio integrale e la ricostruzione delle meccaniche consegnate, né autorizza a inventare un'altra identità, copy o fotografie al posto del cliente. La tesi visiva e il momento distintivo devono nascere da quel sito, non da un modello settoriale.

L'ordine heading → copy → media, il word-by-word, Solar/Iconify e le ricette della skill non sono obblighi compositivi. Il divieto illustrativo SVG/CSS/canvas non riguarda maschere, geometrie, shader o renderer necessari al materiale. Si mantengono gli strumenti e la singola Lenis del motore; la valutazione di Locomotive, l'installazione di altre librerie e i workflow di validazione delle fonti non si eseguono.

`animate` è una competenza specialistica di Emil, non la riattivazione di `ui-animation`. Le sue decisioni di frequenza, durate e ricette riguardano i controlli; non decidono se realizzare le scene richieste. Divieti di ease-in, scale piccole di ingresso, limiti di bounce, tabelle di valori e reveal once non sostituiscono le leggi delle demo, la reversibilità o il tempo delle scene. Esempi Motion/React/WAAPI non introducono un altro writer sulle proprietà possedute da GSAP. Le curve CSS non si passano automaticamente a `ease` di GSAP: si usa un easing GSAP valido oppure il plugin CustomEase locale, dichiarato come dipendenza.

Prestazioni: si riduce il costo senza cambiare la meccanica; trasformazioni e opacity sono preferibili quando adatte, ma non garantiscono da sole accelerazione o fluidità. Clip, blur, layout e renderer richiedono valutazioni tecniche locali, non un divieto che cancelli la scena. Formato delle revisioni, invocazioni di altre skill, gate e riesame il giorno dopo non sono passaggi operativi. Gli originali di queste fonti restano completi e immutati; l'estratto storico `MESTIERE.md` non è più la competenza attiva.

## Esclusioni

- `ui-animation` e i suoi riferimenti restano originali nell'archivio del metodo ma sono esclusi dalla consegna. Le competenze della tabella restano integrali. Questa esclusione non attribuisce alla skill i guasti tecnici osservati.
- `apple-design` resta archiviata e non viene consegnata.
- `gsap-awwwards-website` resta archiviata come esempio React e non viene consegnata.
- Una skill non decide la firma del sito. Easing, ritmo, distanze, trigger e composizione nascono dalla regia corrente e dalla fisica dei materiali.
