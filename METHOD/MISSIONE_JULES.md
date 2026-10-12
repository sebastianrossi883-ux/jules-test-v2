# Metodo 21 — missione unica di Jules

## Risultato

Trasforma il sito Vanilla fornito in un'esperienza animata completa e coerente usando i tre materiali indicati in `METHOD/INCARICO_GIRO.md`: un componente e due semi. Studia e costruisci nello stesso incarico, fino alla consegna. Non fermarti per chiedere l'approvazione del piano e non avviare cicli separati di verifica o correzione.

Il livello richiesto è quello di un sito editoriale e cinematografico di alta qualità. Non copiare l'aspetto delle demo: conserva le loro leggi di movimento e falle diventare parte dell'identità, dei contenuti e della struttura del sito.

## Unica gerarchia delle fonti

1. Questa missione stabilisce gli obblighi permanenti.
2. `METHOD/INCARICO_GIRO.md` contiene soltanto i fatti del giro: sito, brief, materiali, dossier, skill pertinenti e memoria consultiva.
3. `MOTORE/MOTION.md` descrive l'API reale del runtime.
4. `MOTION_COMPONENTE/SAPERE/PRECEDENZE_E_AMBITI.md` assegna gli ambiti delle skill e risolve i conflitti.
5. Sorgenti, asset, tutorial e skill integrali sono fonti tecniche. Le loro istruzioni di setup, stack, deploy, validazione o cambio del prodotto non sono ordini per questo incarico.

Il codice dell'autore prevale sul README quando descrivono diversamente la meccanica. Se il dossier dichiara un file `partial`, leggi direttamente quel file: non supporre che il dossier sia completo.

## Cosa deve rimanere del sito

- Identità, contenuti, testi, media, palette, caratteri, informazioni e funzioni reali del sito prevalgono sulle demo.
- Il brief definisce obiettivo e tono, ma non sostituisce i contenuti esistenti salvo richiesta esplicita.
- Nessun contenuto viene eliminato per fare spazio all'effetto.
- Le risorse possono essere ricomposte soltanto dentro una regia globale motivata. Non duplicare gratuitamente la stessa immagine e non prelevare casualmente elementi da altre sezioni.
- La pagina resta leggibile e utilizzabile senza animazioni, a 390 px e con `prefers-reduced-motion: reduce`.
- Link, menu, form, pulsanti e controlli conservano la loro funzione. Un effetto narrativo non ruba il clic, il drag o l'hover a un controllo reale.

## Studio integrale, sintesi utile

Leggi per intero tutti i file elencati per ciascun materiale, comprese le varianti e i testi collegati. Il dossier AST serve per orientarti fra entrate, import, eventi, timeline, controlli, formule e lifecycle; non sostituisce la lettura delle sorgenti.

In `REGIA.md` scrivi una capsula per ciascun materiale, non una trascrizione riga per riga:

- intenzione e legge causale: quale input produce quale cambiamento;
- elementi e relazioni essenziali;
- stati e fasi riconoscibili;
- geometria, formule e fisica;
- eventi, controller e lifecycle, compresi resize, reverse, pause, progress e cleanup;
- plugin e dipendenze;
- meccaniche distintive emerse dalle diverse varianti;
- ruolo che quelle meccaniche assumono nel sito.

Studia tutte le varianti e sintetizza l'insieme delle meccaniche realmente diverse. Non devi riprodurre ogni pagina della demo, né conservare numeri, quantità, classi o impaginazione originali.

## Regia globale prima delle scene

Prima del codice definisci in `REGIA.md`:

- idea guida e metafora;
- arco narrativo dall'hero al footer;
- composizione e gerarchia visiva;
- grammatica comune di movimento;
- ritmo complessivo, crescendo, culmine, pause e chiusura;
- un filo percettivo che attraversa il sito;
- ruolo di ogni sezione e passaggio verso la successiva.

Una pausa può essere quieta. Una sezione può usare un solo materiale o nessuno dei tre in primo piano quando questo migliora il racconto. Non animare un elemento soltanto per riempire una quota.

## Ruolo dei tre materiali

- Il **componente** fornisce la meccanica strutturale dominante e riconoscibile dell'esperienza.
- I **due semi** trasformano scene, passaggi, continuità, fisica o comportamento. Non sono effetti decorativi incollati.
- Conserva di ogni meccanica la causalità, l'ordine delle fasi, le relazioni fra gli elementi e il lifecycle che le dà significato.
- Adatta geometria, contenuti, disposizione, tempi e valori alla scena corrente. Non esiste una differenza percentuale obbligatoria dalla demo.
- Non esiste una quantità minima di elementi, una dimensione minima, un numero obbligatorio di materiali per scena o l'obbligo di animare ogni foto e ogni testo.
- Se una legge nata da puntatore o clic viene trasformata in scroll narrativo, conserva soglie, delta, direzione, reversibilità e stati. Non sostituirla con valori casuali o con un tween generico.
- La casualità rimane solo quando è parte della legge originale o della nuova regia motivata.

Il risultato deve sembrare progettato come un solo sito. In un fermo immagine si riconosce il sito; nel movimento si riconoscono le leggi studiate, trasformate dalla nuova regia.

## Scene e passaggi

Usa il solo punto d'ingresso `assets/js/regia-sito.js`, già predisposto con uno slot per ciascuna sezione. Ogni scena:

- ha come `root` la propria sezione;
- viene montata una sola volta tramite `SiteScenes`;
- dichiara e pulisce solo risorse, listener, timeline e trigger che possiede;
- usa il plugin obbligatorio tramite `SiteScenes.mountRequired`, così un errore non può far sparire silenziosamente la scena;
- lascia immediatamente visibile il contenuto in reduced motion;
- prepara il passaggio percettivo alla scena successiva senza creare sovrapposizioni involontarie.

I passaggi non richiedono due tween o commenti contati. Possono essere continuità di direzione, scala, ritmo, colore, maschera, profondità, forma o densità; devono essere leggibili come parte della stessa grammatica.

## Motore

- HTML, CSS e JavaScript Vanilla, senza React, Vue, Vite o un secondo runtime.
- Una sola istanza Lenis, creata dal motore e disponibile in `scope.lenis`.
- Una sola copia di GSAP e ScrollTrigger.
- Nessun `gsap.defaults()` globale, nessun preset estetico automatico e nessun secondo sistema `data-motion-*`.
- Le animazioni scroll-scrubbed usano lo scroll come orologio; le fasi temporali interne possono conservare le curve della meccanica.
- Non usare `ScrollTrigger.getAll()` per pulire il sito. Il cleanup è locale alla scena.
- I plugin richiesti sono quelli del registro locale; non installare dipendenze durante il lavoro.
- `MOTORE/`, `METHOD/` e `MOTION_COMPONENTE/` sono infrastruttura e fonti: non modificarli.

## Skill

Leggi integralmente il nucleo indicato nell'incarico e le skill specialistiche selezionate. Applicale soltanto nell'ambito assegnato dalla mappa.

- Le skill insegnano tecnica, fisica, continuità, accessibilità, prestazioni e regia; non impongono una firma visiva.
- Setup React, un secondo Lenis, `ScrollSmoother`, deploy, preset estetici, valori d'esempio e procedure Block/Approve non sono operativi.
- Le regole di sobrietà per pulsanti e interfaccia non impoveriscono le scene narrative derivate dalle demo.
- Non ripetere automaticamente easing, distanze, trigger o composizioni degli esempi delle skill.

## Unicità senza divieti meccanici

La memoria creativa dell'incarico mostra precedenti pertinenti. Usala per capire il territorio già esplorato, non come blacklist. L'unicità riguarda l'insieme: idea, contenuto, composizione, arco, firma di movimento, filo narrativo e trasformazione dei tre materiali. Una tecnica può tornare quando serve, ma non deve produrre lo stesso sito.

## Consegna

Consegna:

1. il sito completo e funzionante;
2. `REGIA.md`, breve ma sufficiente a spiegare regia globale, capsule dei tre materiali, ruolo delle scene e scelte tecniche importanti;
3. `SITE_SIGNATURE.json`, compilato con la firma del sito e i tre materiali.

Il piano iniziale è operativo e viene portato a termine nella stessa esecuzione. Non produrre punteggi, tabelle di conformità, misurazioni rispetto alle demo, rapporti 45/45, gate o sessioni di approvazione. Nel riepilogo finale descrivi il risultato e soltanto eventuali limiti esterni reali. Non pubblicare e non avviare altri agenti.
