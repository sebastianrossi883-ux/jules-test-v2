# MATERIALI FORNITI PER QUESTO SITO

Il committente ha fornito ESATTAMENTE queste sorgenti. Non scegliere altre demo, non sostituirle e non creare una lista di candidate. Studia tutti i file e le versioni presenti in ciascuna cartella, poi integra ogni materiale nel sito.

- `textblock8` — componente integrale; sorgente `MOTION_COMPONENTE/COMPONENTI/textblock8`; scena `component-textblock8`.
- `parallax` — seme matematico; sorgente `MOTION_COMPONENTE/SEMI/parallax`; scena `seed-parallax`.
- `paths` — seme matematico; sorgente `MOTION_COMPONENTE/SEMI/paths`; scena `seed-paths`.

---

# MISSIONE JULES — METODO 12, SCENE COMPLETE E REGIA DEL SITO

Sei responsabile della direzione artistica e dello sviluppo frontend di questa repository. Studia il sito e i materiali forniti, poi costruisci nella stessa sessione un sito completo, originale, ricco di movimento e funzionante fino al footer. Non fermarti a studio, piano, import, markup preparatorio o una pagina quasi statica.

> [!WARNING] REGOLA QUALITÀ DEL CODICE (TOLLERANZA ZERO)
> È severamente vietato generare funzioni vuote o stubs (es. `gsap.to({}, {})`). Devi scrivere il codice finale funzionante al primo colpo, estraendo e scrivendo per intero la VERA MATEMATICA della demo. Le scatole vuote equivalgono al fallimento critico della missione.


> [!CAUTION] I 5 COMANDAMENTI TECNICI (ANTI-CRASH)
> Per superare i rigidi test di sicurezza del Motore V12, devi applicare matematicamente queste 5 regole. Ignorarle causa il fallimento critico immediato:
> 
> 1. SINTASSI API RIGIDA: Il motore V12 usa Object.freeze. Non inventare metodi.
>    ESATTO: `window.SiteScenes.mount({ id: "scena", root: el, writes: [{element: nodo, property: "transform"}], setup(scene) { scene.claim(nodo, ["opacity"]); ... } });`
>    ERRATO: `mount("scena", {...})` o `scene.writes(...)`
> 
> 2. REGOLA DEL DOM CIECO: Se inserisci nodi fisici "marcatori" (posizioni vuote per far calcolare a GSAP le curve o i bounding rect), NON applicare MAI la classe `hidden` o `display:none`, altrimenti la loro geometria diventa 0x0. Usa SEMPRE `opacity-0 pointer-events-none`.
> 
> 3. GEOMETRIA RELATIVA: Le demo Codrops misurano lo spazio rispetto all'intero schermo. Quando porti quella matematica nel sito (es. in una griglia Tailwind), devi sempre calcolare l'offset sottraendo le coordinate del GENITORE DIRETTO dell'elemento assoluto, non dell'intera sezione, altrimenti l'animazione fionderà l'elemento fuori dallo schermo (es. `x: r.left - parentRect.left`).
> 
> 4. DIVIETO DI LOOP GLOBALI: Non annidare mai le chiamate di mount() di scene diverse (hero, footer, ecc.) all'interno di un loop `forEach` dedicato a un singolo componente. Ogni scena globale deve vivere isolata nello scope principale del file JS.
> 
> 5. CONFLITTI MOTORE: Se decidi di animare manualmente un nodo tramite `regia-sito.js`, NON assegnargli MAI attributi automatici come `data-m="parallax"` o `data-m="reveal"` nell'HTML. Il motore rileverà la doppia scrittura sulla stessa proprietà e crasherà l'intero sito.

> 6. DELIMITAZIONE DELLE SKILL: Le ricette contenute nella cartella SAPERE (Skill) servono per animare ESCLUSIVAMENTE la "cornice" del sito (Macro-regia, Hero, Footer, Testi normali di transizione). Per i SEMI e i COMPONENTI FORNITI è severamente vietato applicare le Skill generiche: devi usare rigorosamente la matematica originale dei loro file sorgente.




## Ordine delle istruzioni

1. Questa missione definisce il risultato creativo e il lavoro richiesto.
2. I sorgenti consegnati definiscono i meccanismi e gli invarianti specifici di ogni componente o seme.
3. Il MOTORE e le skill descrivono API, sincronizzazione, accessibilità, cleanup e prestazioni.
4. Gli esempi generici di stile o prudenza nelle skill non riducono il movimento richiesto qui e non sostituiscono le formule delle sorgenti. Se un suggerimento tecnico è incompatibile con un meccanismo, trova un adattamento corretto o dichiara il blocco preciso; non amputare il meccanismo.

Non creare dossier, piano o selezione in JSON. I file JSON che appartengono già alle demo restano parte delle sorgenti. Il committente ha già scelto i materiali: non sceglierne altri e non ignorare quelli ricevuti.

## Materiali ricevuti in questa repository

La sezione iniziale generata sopra questa missione elenca i materiali esatti e i rispettivi ID di scena. Integra **ogni cartella** dentro `MOTION_COMPONENTE/COMPONENTI/` e `MOTION_COMPONENTE/SEMI/`. Il loro numero varia da progetto a progetto. La cartella assegnata è l'intera sorgente da leggere, non soltanto il file o la variante che sembra più semplice.

Per ciascun materiale:

1. Leggi gli entrypoint, le versioni, gli esempi, gli asset e le dipendenze effettivamente presenti. Confronta le varianti rilevanti e scegli quella adatta al sito spiegando la scelta nel riepilogo finale.
2. Ricava dal codice il gruppo, la causalità, la formula, gli stati, l'ordine, l'ampiezza, l'innesco, le interazioni, l'uscita, i breakpoint e il lifecycle. Non inventare invarianti che la demo non ha e non appiattire quelli che possiede.
3. Trova elementi reali e semanticamente adatti nel sito e mappali uno per uno. Adatta soggetto, layout, contenuti e direzione visiva al sito. Non copiare la pelle della demo, ma conserva il suo meccanismo.
4. Costruisci la scena effettiva nella pagina. L'import, la descrizione, una foto che si muove da sola, un fade o un piccolo spostamento generico non sono un'integrazione del materiale.
5. Se una variante non funziona per limiti concreti, prova un'altra variante completa presente nella stessa sorgente. Se nessuna è integrabile, conserva il materiale, indica il limite tecnico e non dichiarare completata quella scena.

Un componente conserva il meccanismo completo della sorgente: gruppo reale, rapporti e formule, sequenza, stati, timeline e uscita. Un seme conserva gli invarianti matematici e la progressione che rendono riconoscibile la demo; cambia liberamente soggetto, composizione e racconto per adattarli al sito. Non esiste un numero universale di stati: conserva tutti quelli significativi della sorgente. Non duplicare elementi o fotografie per fingere un gruppo che non esiste.

## Progettazione prima del codice

Leggi il sito intero, il MOTORE e le sorgenti. La progettazione resta nel tuo processo e nel codice: non fermarti a scrivere un dossier e non attendere approvazioni intermedie.

> [!IMPORTANT] FASE OBBLIGATORIA: LA TABELLA DI TRADUZIONE DEL DOM
> Prima di scrivere anche solo una riga di codice Javascript dentro `setup: function(scene) { ... }`, DEVI obbligatoriamente scrivere un commento Javascript multilinea (`/* ... */`) che contenga l'esatta traduzione tra i nodi usati nella Demo e i veri nodi semantici del Sito Reale.
>
> USA I TUOI STRUMENTI (es. `view_file` o equivalenti) per leggere il vero file `index.html` del sito prima di dedurre questa tabella, per trovare i veri ID e i veri Tag. Non indovinare le classi!
>
> *Esempio di formato obbligatorio:*
> `/* TABELLA DI TRADUZIONE:`
> ` - Nodo Demo: .parallax-bg (div con background)`
> ` - Nodo Sito: img-rkhck (tag <img> che ho letto nell'index.html)`
> ` - Traduzione Fisica: Poiché il sito usa un tag <img>, il backgroundPosition non funzionerà. Sostituisco con yPercent.`
> `*/`
> Applica rigorosamente le deduzioni fatte nella tabella al codice JS successivo.


Prima di costruire ciascuna scena, stabilisci internamente: meccanismo in una frase; invarianti da preservare; gruppo reale; mappatura demo-elemento; contenuti e dettagli visivi del sito da cui derivare la composizione; sequenza con ingresso, sviluppo, momento culminante e uscita; proprietà possedute, API e cleanup.

## Regia cinematografica dell'intero sito

La pagina deve avere una firma visiva propria e una progressione leggibile dall'apertura al footer. Definisci una macroregia con introduzione, sviluppo, scene protagoniste, transizioni, brevi respiri, climax e uscita. Disegna anche la microregia di ciascuna unità: cosa si muove, come cambia il contenuto centrale, quale relazione spaziale racconta e come lascia spazio alla successiva.

La macroregia viene decisa prima delle microregie e resta il riferimento per tutte: annota ordine narrativo, densità/intensità relativa, durata percepita, ingresso/uscita e passaggio fra unità. Poi progetta ogni microregia affinché contribuisca a quel disegno senza diventare una sua copia miniaturizzata. Le scene dei materiali sono integrate nel ritmo globale con transizioni e spazi di rilascio espliciti; non devono partire tutte insieme né restare isolate come demo separate.

La hero comunica subito e inizia la sua introduzione al caricamento; non aspettare lo scroll. Ogni sezione principale deve avere un gesto dominante pertinente al suo contenuto, non soltanto un titolo che appare, un hover o un controllo. `MOTION_CONFIG.auto=false` disattiva i gesti automatici del motore ma non riduce questo incarico: assegna nel codice la motion editoriale esplicita a tutte le unità. Le pause narrative sono deliberate e brevi: non lasciare unità importanti accidentalmente immobili. Le fotografie e i media consecutivi ricevono trattamenti diversi quando contenuto e geometria lo permettono. La varietà nasce dalla funzione e dalla composizione, non da valori casuali.

Le scene dei materiali sono i momenti protagonisti, coordinate con il resto della pagina. Il resto della pagina sostiene e collega quelle scene con una coreografia originale: non compete con esse e non le rimpiazza. Non imporre lo stesso effetto, trigger, durata, distanza, pin o numero di movimenti a tutti i siti o a tutte le sezioni. Deriva ogni decisione dal sito e dalla sorgente concreta.

### Soglia di coreografia: niente consegne quasi statiche

La ricchezza richiesta è quella di un'esperienza editoriale cinematografica, non di una pagina con soli titoli in fade. Per ogni unità principale, dalla hero al footer, progetta e implementa una sequenza leggibile di **almeno tre beat collegati**: ingresso, sviluppo e raccordo/uscita. In ciascuna unità almeno due famiglie di target reali devono cambiare stato in modo percepibile; almeno una trasformazione deve riguardare il contenuto centrale (media, gruppo, composizione o relazione spaziale), non soltanto etichette, link o decorazioni. Per la hero l'ingresso parte al caricamento e i beat successivi si svolgono senza ritardare la comunicazione iniziale.

Questa soglia è un minimo di copertura e sviluppo, non una ricetta visiva: non ripetere gli stessi tre effetti, gli stessi target o lo stesso trigger in ogni sezione. Ricava i beat da contenuto, geometria e ritmo specifici; possono appartenere a una timeline coerente e non richiedono tre trigger indipendenti. Non contare come beat distinti un semplice fade duplicato, un hover isolato, un cursore, un cambiamento impercettibile o una trasformazione che il visitatore non può incontrare nel normale percorso della pagina. Le pause sono brevi e intenzionali, non sostituiscono lo sviluppo della scena.

Prima della consegna, percorri ogni unità in avanti e all'indietro e verifica che i beat siano visibili, reversibili quando legati allo scroll, distinti tra sezioni consecutive e raccordati alla macroregia. Se una sezione resta sostanzialmente immobile, se la motion si limita a un reveal d'ingresso o se i beat non sono osservabili sul contenuto, il lavoro è incompleto: correggi la coreografia, senza rimuovere materiali o ridurre i meccanismi delle sorgenti per far passare il controllo.

Costruisci la scena nel normale percorso di navigazione. Se il meccanismo sorgente dipende da clic, hover, trascinamento o altro input, conserva e rendi accessibile quell'interazione quando è causale; aggiungi la regia ordinaria della sezione senza fingere che un'azione nascosta equivalga a una scena scroll. Se il meccanismo è legato allo scroll, mantienilo reversibile: tornando indietro, stati e geometria devono tornare coerentemente.

## Proprietà, scene e raccordi

Prima di animare un elemento, stabilisci quale scena ne possiede ciascuna risorsa: `transform`, `opacity`/`visibility`, `clip-path`, dimensioni, pin, canvas/WebGL, pointer e contenuto. MOTORE, componenti, semi e scene editoriali non devono scrivere contemporaneamente la stessa proprietà sullo stesso nodo. Quando i movimenti devono sommarsi, usa wrapper o livelli DOM distinti e verifica il risultato composto, non solo l'assenza di conflitti dichiarati.

Per ogni materiale usa esattamente l'ID `component-...` o `seed-...` fornito nell'intestazione generata. Registra la scena con `SiteScenes.mount`, root reale, target DOM reali in `writes`, setup con movimento reale e cleanup completo. Per target creati dinamicamente o scritture CSS, WAAPI, canvas e callback, registra le risorse e le proprietà effettivamente possedute tramite l'API del coordinatore. Un mount vuoto, non raggiungibile o senza effetto visibile non conta.

Carica una sola istanza compatibile di GSAP, ScrollTrigger e, se usato, Lenis. Il coordinatore deve precedere `motion.js`; attendi `MotionKit.ready` prima di montare le scene. Lenis governa lo scroll e non sostituisce la matematica della sorgente. Non introdurre un secondo motore, un secondo ticker o listener duplicati.

Per ogni coppia di unità adiacenti controlla il passaggio in entrambe le direzioni: confini dei trigger, spazio dopo un pin, sovrapposizione, stacking, clipping, hit-test, header, footer e layout mobile. Ordina i trigger secondo la pagina o assegna priorità di refresh coerenti. Non animare il guscio pinnato; anima i suoi figli. Il pin ha durata finita e spazio di rilascio progettato. Non combinare `scrub` e `toggleActions` sullo stesso trigger. Non bloccare o riscrivere lo scroll.

## Responsive, accessibilità e lifecycle

La composizione a riposo resta leggibile. Contenuti, link e sezioni rimangono utilizzabili senza JavaScript. Rispetta `prefers-reduced-motion`, focus da tastiera e touch: la variante ridotta mantiene struttura e significato senza animazioni continue o scroll forzato. Hover e cursori custom non devono diventare l'unica via per capire o usare un contenuto. Su telefono riprogetta pin, distanze e composizione in base al viewport; non limitarti a scalare tutta la pagina o tagliare i contenuti.

Ogni scena deve pulire timeline, ScrollTrigger, listener, ticker, observer, nodi temporanei, split del testo, canvas, portal, lock e classi/stili posseduti. Dopo font, immagini, video o resize aggiorna misure e trigger in modo coordinato, senza refresh ricorsivi. Un errore in una scena deve essere segnalato con ID e causa e non impedire l'avvio delle scene indipendenti; la scena fallita non viene conteggiata come completata.

Mantieni il contenuto, la gerarchia informativa, l'ordine narrativo, i link, le funzioni e i media della base. Una ricomposizione è ammessa se migliora la gerarchia e conserva tutto. Non aggiungere contenuti finti, pagine o servizi per riempire una scena.

## Collaudo svolto da Jules prima della PR

Servi il sito via HTTP e prova la pagina effettiva nel browser disponibile. Non usare un test testuale come sostituto dell'osservazione. Playwright non è necessario per questo flusso. Se non puoi usare un browser, dichiara `BLOCKED_RUNTIME_NOT_PROVEN` e non presentare la consegna come visivamente verificata.

Controlla almeno desktop 1280×900 e mobile 390×844, dall'inizio al footer e poi di ritorno, quindi ricarica e ridimensiona. Verifica:

1. che la hero parta senza aspettare lo scroll e non scopra bande;
2. che ogni materiale fornito abbia una scena effettiva nel percorso normale, conservi il suo meccanismo e cambi davvero stato; scorri avanti e indietro;
3. che ogni unità principale abbia una trasformazione centrale percepibile e specifica, con pause intenzionali e raccordi leggibili;
4. che i confini fra scene e sezioni non producano sovrapposizioni accidentali, salti, clipping, spazi vuoti anomali o blocchi dello scroll;
5. che il footer sia raggiungibile, i contenuti siano conservati e non ci sia overflow orizzontale;
6. che le interazioni, i link, il focus da tastiera, reduced-motion e contenuto senza JavaScript restino utilizzabili;
7. che console e richieste di rete non mostrino errori del sito o asset mancanti;
8. che canvas, video o shader usati nelle scene producano immagini e stati visibilmente diversi, non solo un fallback statico.

Se un controllo fallisce, correggi la scena o il file responsabile e riprova il punto interessato. Se non puoi risolverlo, riferisci l'errore preciso e lascia la consegna incompleta. Non inventare prove né descrivere come visto ciò che hai solo letto nel codice.

## Consegna

La PR deve contenere il sito completo funzionante e il codice delle scene; non consegnare solo studio, documenti, import inutilizzati, placeholder o scene vuote. Nel messaggio finale indica, senza frasi generiche: per ogni materiale, versione scelta e differenze considerate, gruppo reale, posizione, meccanismo e stati osservati; la regia globale e i raccordi principali; verifiche realmente eseguite su desktop/mobile; errori rimasti o limiti. Se un test browser non è stato eseguito, scrivi `NON PROVATO` per quel punto. Non dichiarare completa una consegna bloccata o solo statica.
