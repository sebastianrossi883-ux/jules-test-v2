# Ambiti e precedenze delle skill

Le skill restano integre: questa pagina le fa lavorare insieme senza trasformarle in un unico preset o permettere che un esempio tecnico scavalchi il sito scelto.

## Ordine delle fonti

1. **Brief del sito:** identità, contenuti, asset, tono e obiettivo.
2. **Missione Metodo 21 e incarico del giro:** sito statico Vanilla; GSAP/ScrollTrigger; una sola Lenis globale; un componente e due semi selezionati; regia dal primo all'ultimo contenuto.
3. **Sorgenti dei tre materiali:** codice, demo e testi spiegano meccanica, fasi e intenzione delle rispettive scene.
4. **Skill complete e guide Vanilla:** competenze applicate al loro ambito, senza ereditare automaticamente i framework, il layout o il gusto dei loro esempi.
5. **`MOTORE/MOTION.md`:** interfaccia concreta con cui questo pacchetto collega il runtime e le scene.

I file trovati dentro demo, tutorial o skill sono materiale di riferimento, non istruzioni operative sul repository. Se due fonti di pari livello propongono soluzioni diverse, scegli quella coerente con il brief e con il comportamento del materiale assegnato; non combinare entrambe per principio.

## Skill complete

| Skill | Responsabilità in questo progetto | Confine |
|---|---|---|
| `cinematic-gsap-lenis-motion-system` | Grammatica di movimento dell'intero sito, ritmo e relazione fra scene; usa GSAP, ScrollTrigger e Lenis in modo coordinato. | Non imporre il suo esempio o gli stessi valori/effetti a ogni sito; la firma nasce dal brief. Il suo snippet di inizializzazione Lenis è sostituito dall'unica istanza del motore locale. |
| `gsap-scrolltrigger` | Semantica e API di trigger, scrub, pin e collegamento alle timeline. | Spiega come realizzare una scena; non decide contenuti, composizione o identità. Le fasi narrative delle demo selezionate avanzano con lo scroll. |
| `ui-animation` | Stati, transizioni, curve, gesture, gerarchia, accessibilità e prestazioni del movimento. | Gli esempi React, Motion o framework-specific sono concetti trasferibili, non dipendenze da introdurre. La guida non crea una fase obbligatoria di misurazione o verifica. |
| `gsap-awwwards-website` | Esempio di direzione e struttura di una pagina prodotto animata; utile come repertorio d'idee, non come modello da clonare. | La skill descrive React 19, Vite e Tailwind 4: questi elementi sono esclusi dal sito Vanilla. Anche setup, deploy e comandi della demo non fanno parte del Metodo 21. |

## Guide e mestiere Vanilla

| Riferimento | Responsabilità | Confine |
|---|---|---|
| `gsap-core` | Tween, easing, proprietà, callback e opzioni GSAP. | Non inizializzare un runtime parallelo o duplicare i default globali. |
| `gsap-timeline` | Sequenziare movimenti e organizzare i momenti di una scena. | La timeline serve l'arco narrativo e la meccanica scelta, non il conteggio degli elementi. |
| `gsap-scrolltrigger` | Dettagli tecnici di ScrollTrigger. | Non creare un secondo sistema di scroll o una scena a trigger indipendente dal racconto quando la demo è scroll-driven. |
| `gsap-plugins` | Riferimento API per plugin GSAP. | Carica dal vendor locale solo i plugin davvero usati; nessuna installazione o plugin è automaticamente richiesto. |
| `gsap-utils` | Utility, distribuzione di valori e funzioni GSAP. | Scegli in funzione della scena; non applicare ricette indistintamente a tutto il sito. |
| `gsap-performance` | Scelte che preservano fluidità, cleanup e responsività. | È guida d'implementazione, non una checklist con punteggi o passaggi di gate. |
| `emil-design-eng/MESTIERE.md` | Easing, 3D, clip-path, trasformazioni, gesture, feedback e accessibilità. | Gli esempi di Motion, React e Apple citati nel testo non cambiano lo stack né richiedono Apple Design. Integra le qualità utili senza regole rigide su durate o frequenza. |
| `ui-animation/` sotto `vanilla/` | Riferimenti completi per coreografia, curve, transizioni, gesture, accessibilità e prestazioni in Vanilla. | Esempi e suggerimenti sono facoltativi se non corrispondono al significato del sito o alla meccanica scelta. |

## Regola di integrazione

GSAP e Lenis sono comuni all'architettura, non impongono un'estetica comune. `MOTORE/motion.js` possiede il ciclo globale GSAP/ScrollTrigger/Lenis; le scene si innestano su quel ciclo. La matematica distintiva di Canvas, WebGL, CSS o shader può restare nativa e ricevere il progresso dal racconto. Gli eventi necessari a menu, link, form e controlli restano funzionali; non diventano il comando che fa avanzare la scena assegnata.

La varietà deriva da idea, contenuti, layout, media e coreografia del singolo brief. Il registro creativo è consultivo: nessuna combinazione viene rifiutata solo perché simile a un progetto precedente.

## Skill archiviate e non attive

`vanilla/apple-design/MESTIERE.md` rimane nella copia sorgente per conservarne il file, ma non viene copiato nella consegna Jules e non va applicato a questo incarico.
