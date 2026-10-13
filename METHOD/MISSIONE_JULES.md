# Metodo 21 — missione unica di Jules

## Risultato

Trasforma il sito Vanilla fornito in un'esperienza animata completa e coerente usando i tre materiali indicati in `METHOD/INCARICO_GIRO.md`: un componente e due semi. Studia e costruisci nello stesso incarico, fino alla consegna, seguendo il «Piano del giro» di `METHOD/INCARICO_GIRO.md`: non c'è fretta, lo studio completo viene prima della regia e del codice. Non fermarti per chiedere l'approvazione del piano e non avviare cicli separati di verifica o correzione.

Tutto il sito partecipa alla coreografia: hero, ogni sezione e footer. Ogni fotografia e titolo ha un ruolo nel movimento; testi e controlli hanno ingressi coordinati, poi possono stabilizzarsi per lettura e utilizzo. Gli elementi possono partecipare come gruppi significativi, senza muovere necessariamente ogni parola. Tutto animato non significa movimento continuo: le pause sono stati leggibili raggiunti dalle scene, non parti omesse. In reduced motion il contenuto resta immediatamente accessibile.

Il livello richiesto è quello di un sito editoriale e cinematografico di alta qualità. Non copiare l'aspetto delle demo: conserva le loro leggi di movimento e falle diventare parte dell'identità, dei contenuti e della struttura del sito.

## Sequenza operativa del giro

Il «Piano del giro» compila questa sequenza con i tre materiali e le sezioni reali del sito:

1. Studio integrale del componente, del seme 1 e del seme 2, uno alla volta.
2. Regia globale: arco, composizione, attori, stati e passaggi dall'hero al footer.
3. Ricostruzione delle meccaniche del componente, del seme 1 e del seme 2, prima di montarle nelle scene.
4. Composizione HTML/CSS di ogni scena strutturale: attori, geometria, gruppi, maschere e stati necessari; poi coreografia, sviluppo, stato conclusivo e cleanup, nell'ordine del sito.
5. Collegamento dei passaggi nel codice, lungo il filo narrativo fino alla chiusura.
6. Consegna del sito, di `REGIA.md` e di `SITE_SIGNATURE.json`.

Il piano iniziale conserva questi lavori e può dettagliarli, non sostituirli con verifiche dei file. Scrivere lo studio o descrivere una scena in `REGIA.md` non realizza le sue funzioni. Tre materiali non significano tre sole sezioni animate: forniscono le meccaniche e la grammatica di tutte le scene. Non fermarti alla redazione della regia o all'inserimento di tre effetti locali.

## Unica gerarchia delle fonti

1. Questa missione stabilisce gli obblighi permanenti.
2. `METHOD/INCARICO_GIRO.md` contiene i fatti del giro: sito, brief, materiali, dossier, skill e memoria consultiva, più il «Piano del giro» derivato dalla sequenza di questa missione. Non introduce altri obblighi permanenti.
3. `MOTORE/MOTION.md` descrive l'API reale del runtime.
4. `MOTION_COMPONENTE/SAPERE/PRECEDENZE_E_AMBITI.md` assegna gli ambiti delle skill e risolve i conflitti.
5. Sorgenti, asset, tutorial e skill integrali sono fonti tecniche. Le loro istruzioni di setup, stack, deploy, validazione o cambio del prodotto non sono ordini per questo incarico.

Il prompt iniziale contiene il testo completo di queste fonti, con percorsi e righe numerate. I prefissi numerici sono una vista di lettura; i file della repository restano il codice originale da consultare. Il prompt riproduce questa gerarchia, non aggiunge un altro contratto. Le fonti complete vanno studiate anche quando il dossier ne riporta già una descrizione.

Il codice dell'autore prevale sul README e sull'articolo quando descrivono diversamente la meccanica. Se il dossier dichiara un file `partial`, leggi direttamente quel file: non supporre che il dossier sia completo.

Ogni decisione ha un solo padrone. Accessibilità, funzioni del sito e movimento ridotto: questa missione. Aspetto (contenuti, foto, colori, caratteri): il sito. Legge del movimento (cosa provoca cosa, fasi, tipo di fisica, ritorno indietro): la demo, come l'hai studiata. Dove, quanto e come si trasforma: la regia. Tecnica (API, prestazioni, pulizia, dettagli): le skill. Una frase di una fonte che entra nel campo di un'altra, lì non si applica.

## Cosa deve rimanere del sito

- Identità, contenuti, testi, media, palette, caratteri, informazioni e funzioni reali del sito prevalgono sulle demo.
- Il brief definisce obiettivo e tono, ma non sostituisce i contenuti esistenti salvo richiesta esplicita.
- Nessun contenuto viene eliminato per fare spazio all'effetto.
- Le risorse possono essere ricomposte soltanto dentro una regia globale motivata. Non ricostruire la galleria della demo ripetendo le stesse fotografie e non prelevare casualmente elementi da altre sezioni. Ritagli, maschere e istanze transitorie sono ammessi quando realizzano una relazione della meccanica o del racconto, non per riempire la quantità della demo. Se la meccanica richiede più attori, possono esserlo foto distinte già pertinenti alla scena, parti tipografiche, dettagli o maschere motivati dal contenuto: la struttura nasce dal sito, non dal numero di elementi della demo.
- Preservare contenuti e identità non congela il DOM o la disposizione statica: ricomponi blocchi, gruppi, maschere e gerarchie quando servono alla regia. Il numero di foto di una sezione non giustifica la perdita delle fasi; scegli attori pertinenti e una scena capace di ospitare la relazione del materiale.
- I conteggi dell'inventario descrivono il DOM iniziale: non sono limiti agli attori, alla composizione o alle fasi da realizzare, né quantità da raggiungere.
- La pagina resta leggibile e utilizzabile senza animazioni, a 390 px e con `prefers-reduced-motion: reduce`.
- Link, menu, form, pulsanti e controlli conservano la loro funzione. Un effetto narrativo non ruba il clic, il drag o l'hover a un controllo reale.

## Studio integrale delle demo

Prima della regia studi le tre demo una alla volta, nell'ordine di `METHOD/INCARICO_GIRO.md`: componente, seme 1, seme 2. Di ogni demo leggi per intero tutti i file elencati nell'incarico, comprese le pagine, le varianti e i testi collegati. Finisci lo studio di una demo e scrivilo in `REGIA.md` prima di passare alla successiva. Il dossier AST ti orienta fra entrate, import, eventi, timeline, controlli, formule e lifecycle; non sostituisce la lettura dei file.

Per ogni demo, in quest'ordine:

1. **Il testo collegato**, letto per primo e per intero: è la guida dello studio, non lo studio. Lo studio è il codice: ogni punto che scrivi indica il file e le righe del codice da cui viene, e ciò che sta solo nel testo collegato non basta. Scrivi cosa vuole ottenere l'autore, le fasi che descrive e le formule che spiega, ciascuna con il file e le righe del codice che la realizzano. Scrivi anche cosa l'autore dice che si può cambiare e cosa deve restare. Se la demo non ha un testo collegato, la guida è il suo `README.md`; se manca anche quello, il dossier.
2. **Ogni pagina e ogni variante della demo**, anche quando più varianti stanno nella stessa pagina: quale file JavaScript usa e cosa cambia rispetto alla prima (elementi, forma, punti del percorso, ordine, tempi).
3. **Il codice completo**, compresi i file non elencati dal dossier: individua tutte le funzioni; documenta in `REGIA.md` quelle che governano la meccanica, gli stati o il lifecycle, con attori, formule, chiamanti e dipendenze. Le utility accessorie vanno comprese, non trascritte.
4. **Gli eventi**: quale input fa partire quale cambiamento (clic, puntatore, scroll, resize) e cosa succede tornando indietro, compresi i comandi della timeline (play, reverse, pause, progress).
5. **La fisica**: le curve con il loro tipo e la loro direzione, le durate, i ritardi fra gli elementi, le sovrapposizioni, la geometria.
6. **Le misure e il ciclo di vita**: cosa si misura, quando si ricalcola, cosa si crea e cosa si pulisce.
7. **Gli stati**: com'è la scena all'inizio, a metà, al culmine e alla fine.
8. **Quello che il testo collegato non dice** e che hai trovato solo nel codice.

Alla fine di ogni demo scrivi le meccaniche realmente diverse fra le sue pagine e varianti, il ruolo che possono avere nel sito e la sua legge in una frase: ciò che resta in ogni sito che la usa.

Collega lo studio alla costruzione: per ogni meccanica scelta indica in `REGIA.md` quali attori e misure del sito prendono il posto di quelli originali, come si trasformano le formule e gli stati, e il nome della funzione che realizzerai. Le citazioni identificano le sorgenti di quelle decisioni. Studi tutte le varianti e scegli quelle coerenti con la regia, senza trasformare ogni pagina della demo in una sezione del sito.

Lo studio non è una trascrizione riga per riga: sintetizza la catena causa → fasi → stato finale/ritorno, con file e righe delle parti decisive. Se il testo collegato e il codice descrivono diversamente la meccanica, vale il codice. Non devi riprodurre ogni pagina della demo nel sito, né le sue classi o la sua impaginazione; numeri e quantità si adattano come dice «Ruolo dei tre materiali». Lo studio serve al progetto: non sostituisce la realizzazione delle scene.

## Regia globale prima delle scene

Prima del codice definisci in `REGIA.md`:

- idea guida e metafora;
- arco narrativo dall'hero al footer;
- composizione e gerarchia visiva;
- grammatica comune di movimento, nata dalle leggi dei tre materiali: anche titoli, testi, foto e passaggi che non portano una demo si muovono con il loro carattere; le skill danno la tecnica per farlo;
- ritmo complessivo, crescendo, culmine, pause e chiusura;
- un filo percettivo che attraversa il sito;
- ruolo di ogni sezione e passaggio verso la successiva;
- per ogni sezione: stato iniziale, attori reali del sito, causa, sviluppo, stato visivo da raggiungere, conclusione e passaggio alla successiva; assegna un ruolo alle sue fotografie e ai suoi titoli, e gli ingressi dei testi e dei controlli; indica quale legge dei tre materiali porta o come prosegue la grammatica comune. Quando più materiali si incontrano, definisci un solo rapporto causale fra loro, non due effetti sovrapposti.

Ogni sezione strutturale diventa una scena compiuta e riconoscibile nella normale visita del sito: l'hero ha un'apertura senza aspettare lo scroll, le sezioni hanno un'evoluzione legata allo scroll e il footer chiude il filo narrativo. Una pausa è uno stato raggiunto e leggibile della scena, non una sezione lasciata statica, una funzione vuota o un semplice fade generico ripetuto. Le tre leggi devono essere riconoscibili nell'esperienza complessiva; non occorre forzare tutti i materiali in ogni sezione.

## Ruolo dei tre materiali

- Il **componente** fornisce la meccanica strutturale dominante e riconoscibile dell'esperienza.
- I **due semi** trasformano scene, passaggi, continuità, fisica o comportamento. Non sono effetti decorativi incollati.
- Conserva di ogni meccanica la causalità, l'ordine delle fasi, le relazioni fra gli elementi, il lifecycle che le dà significato e l'incastro delle sue funzioni: quelle che si chiamano a vicenda o comandano la stessa timeline restano nella stessa scena.
- Adatta geometria, contenuti, disposizione, tempi e valori alla scena corrente. Non esiste una differenza percentuale obbligatoria dalla demo.
- Le curve delle demo con un carattere fisico (`elastic`, `back`, `bounce`, `steps`, `rough`, `slow`, `expoScale`, `CustomEase`, `CustomBounce`, `CustomWiggle`) restano del loro tipo e della loro direzione: si adattano i parametri.
- Trasformare una meccanica non vuol dire ridurla a un tween o a un dettaglio decorativo: conserva le fasi e le relazioni che la rendono riconoscibile e raggiungi gli stati visivi definiti nella regia. Un piccolo movimento generico non sostituisce una trasformazione strutturale. Non si copia la dimensione della demo e non si impone una soglia numerica uguale per tutti i progetti. Il tono lento riguarda il ritmo: non autorizza a perdere le fasi o il loro ruolo spaziale.
- La regia sceglie come ogni fotografia e titolo partecipa al movimento e come entrano testi e controlli, anche per gruppi e con gerarchie diverse. Dopo l'ingresso possono stabilizzarsi per lettura e utilizzo. Non servono effetti identici o indipendenti su tutti gli elementi; nessuna sezione resta senza sviluppo. La scarsità di foto non si risolve moltiplicando la stessa immagine per imitare la formazione della demo.
- Le fasi narrative dei tre materiali avanzano durante lo scroll. Quando la legge originale nasce da puntatore, drag o clic, traduci nello scroll soglie, delta, direzione, posizione narrativa, reversibilità e stati, senza sostituire le formule con costanti arbitrarie. Un effetto visibile soltanto con hover, drag o clic non realizza lo sviluppo narrativo; l'interazione originale può restare come livello aggiuntivo. Emissioni, cadute e rimbalzi possono partire a soglia e conservare il proprio tempo interno, quando serve alla fisica: non trasformare ogni fase in scrub. Navigazione e controlli reali conservano il proprio input.
- La casualità rimane solo quando è parte della legge originale o della nuova regia motivata.

Il risultato deve sembrare progettato come un solo sito. In un fermo immagine si riconosce il sito; nel movimento si riconoscono le leggi studiate, trasformate dalla nuova regia.

## Meccaniche del giro prima del montaggio

Dopo la regia globale scrivi in `assets/js/regia-sito.js` le funzioni specifiche del componente e dei due semi. Le ricostruisci dalle sorgenti per questo giro: il preparatore non fornisce animazioni pronte. Le funzioni realizzano attori, formule, stati, fasi, ritorno e lifecycle scelti nella regia, e ricevono le misure e i parametri del sito. Le scene usano queste funzioni; gli ingressi generici non prendono il posto delle meccaniche.

Una funzione può servire più scene dello stesso sito, con attori e geometrie pertinenti e ownership locale. Il filo comune viene dalla regia hero-footer. In `REGIA.md` collega le decisioni dello studio alle funzioni effettivamente scritte, senza produrre una relazione di conformità.

## Scene e passaggi

Usa il solo punto d'ingresso `assets/js/regia-sito.js`, predisposto con identificatori e root delle sezioni, dipendenze da compilare e un montaggio atteso. Un solo ingresso non significa un solo file modificabile: componi HTML, CSS e moduli locali del sito quando servono a costruire attori, geometria, maschere e stati. Conserva gli identificatori delle root o aggiorna esplicitamente il loro collegamento. I blocchi dell'inventario ancora da articolare hanno contenuti e funzioni reali: assegna anche loro un ruolo nella regia. Ogni slot ha `setup: null` finché scrivi la sua funzione `setup(scope)`: non è una scena montata o una scelta artistica di pausa. Realizza tutti gli slot secondo la regia. Una scena dichiarata in `REGIA.md` deve esistere nel codice, non soltanto nel racconto. Ogni scena:

- ha come `root` la propria sezione;
- viene montata una sola volta tramite `SiteScenes`;
- dichiara e pulisce solo risorse, listener, timeline e trigger che possiede;
- si monta con `SiteScenes.mountRequired`, mettendo in `requires.dependencies` i plugin di «Plugin richiesti dalle sorgenti» che usa (un elenco vuoto se non ne usa); l'avvio attende il montaggio e un errore resta esplicito senza impedire alle altre scene di montarsi;
- lascia immediatamente visibile il contenuto in reduced motion;
- prepara il passaggio percettivo alla scena successiva senza creare sovrapposizioni involontarie.

Il collegamento dei passaggi è lavoro di implementazione: collega nel codice lo stato conclusivo di una scena all'apertura della successiva, fino alla chiusura del footer. Non basta descriverlo in `REGIA.md`. I passaggi non richiedono due tween o commenti contati. Possono essere continuità di direzione, scala, ritmo, colore, maschera, profondità, forma o densità; devono essere leggibili come parte della stessa grammatica e rispettare l'ownership locale.

## Motore

- HTML, CSS e JavaScript Vanilla, senza React, Vue o un secondo runtime nel sito. Gli strumenti di compilazione offline consegnati sono strumenti tecnici, non uno stack React: possono risolvere moduli, TypeScript, CommonJS, CSS e shader senza scegliere o costruire animazioni.
- Una sola istanza Lenis, creata dal motore e disponibile in `scope.lenis`.
- Una sola copia di GSAP e ScrollTrigger.
- Nessun `gsap.defaults()` globale, nessun preset estetico automatico e nessun secondo sistema `data-motion-*`.
- Le animazioni scroll-scrubbed usano lo scroll come orologio; le fasi temporali interne possono conservare le curve della meccanica.
- Non usare `ScrollTrigger.getAll()` per pulire il sito. Il cleanup è locale alla scena.
- I plugin richiesti sono quelli del registro locale; non installare dipendenze durante il lavoro.
- Usa le dipendenze locali versionate e i collegamenti descritti nell'incarico. GSAP, ScrollTrigger e Lenis importati dai moduli restano le stesse istanze del motore; Three/OGL di versioni incompatibili restano separati, con addon della propria versione. Un requisito tecnico dichiarato irrisolto non autorizza a sostituire la meccanica con un effetto più semplice.
- `MOTORE/`, `METHOD/` e `MOTION_COMPONENTE/` sono infrastruttura e fonti: non modificarli.

## Skill

Leggi integralmente tutte le skill indicate nell'incarico. Applicale soltanto nell'ambito assegnato dalla mappa.

- Le skill insegnano tecnica, fisica, continuità, accessibilità, prestazioni e regia; non impongono una firma visiva.
- Setup React, un secondo Lenis, `ScrollSmoother`, deploy, preset estetici, valori d'esempio e procedure Block/Approve non sono operativi.
- Le regole di sobrietà delle skill valgono per i controlli reali del sito: menu, link, pulsanti e form. Non impoveriscono le scene, comprese quelle che nella demo partono da un clic: lì restano la fisica, le curve, la scala, la reversibilità e le fasi dei materiali, come le decide la regia. Le regole di accessibilità e di prestazioni delle skill valgono ovunque.
- Gli effetti pronti delle skill (cursore personalizzato, pulsanti magnetici, testi spezzati, parallasse del mouse, gallerie orizzontali, preset di reveal) entrano in una sezione solo se la regia ve li assegna in `REGIA.md`, con il motivo. Easing, distanze, trigger, durate e composizioni li decide la regia, non gli esempi delle skill.

## Unicità senza divieti meccanici

La memoria creativa dell'incarico mostra precedenti pertinenti. Usala per capire il territorio già esplorato, non come blacklist. L'unicità riguarda l'insieme: idea, contenuto, composizione, arco, firma di movimento, filo narrativo e trasformazione dei tre materiali. Una tecnica può tornare quando serve, ma non deve produrre lo stesso sito. Lo stesso materiale tornerà in molti siti. Della demo resta la legge che hai scritto nello studio; il resto nasce da questo sito: disposizione, numero di elementi, materiale visivo, fasi aggiunte, ritmo, posizione nel racconto e fusione con gli altri due materiali.

## Consegna

Consegna:

1. il sito completo e funzionante;
2. `REGIA.md`, con lo studio delle tre demo, la regia globale, il ruolo delle scene e le scelte tecniche importanti: completo nello studio, chiaro nella regia;
3. `SITE_SIGNATURE.json`, compilato con la firma del sito e i tre materiali.

Il piano iniziale è operativo e viene portato a termine nella stessa esecuzione. Non produrre punteggi, tabelle di conformità, misurazioni rispetto alle demo, rapporti 45/45, gate o sessioni di approvazione. Nel riepilogo finale descrivi il risultato e soltanto eventuali limiti esterni reali. Non pubblicare e non avviare altri agenti.
