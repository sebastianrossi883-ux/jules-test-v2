# Missione Jules — Metodo 21, sito Podere

Lavora sul vero `index.html` di questa repository e consegna il sito statico completo, animato e usabile dall'hero al footer. Conserva contenuti, navigazione e identità del Podere mentre evolvi insieme design e movimento. Non consegnare un piano, una preview della libreria o un hero animato con il resto fermo.

## L'incarico del giro

Leggi `METHOD/INCARICO_GIRO.md`: contiene i percorsi esatti del componente e dei semi obbligatori. Studia e integra **tutti** gli assegnati; non sceglierne altri al loro posto perché sembrano più facili. La grande libreria in `MOTION_COMPONENTE/ARCHIVIO` è una riserva di sorgenti, non la lista da montare tutta nel sito. I materiali React e React Three Fiber sono esclusi.

Per ogni assegnato segui l'entrypoint, il JavaScript, il CSS, gli asset, le varianti pertinenti e le dipendenze fino all'effetto sul DOM. Ricava dalla sorgente gli elementi del gruppo, input, formule, misure, coordinate, stati, trigger, progressione, interazione e uscita. Il componente deve conservare il suo meccanismo completo e gli stati significativi; ogni seme deve conservare la propria legge di movimento. Puoi cambiare soggetto e composizione solo derivando l'equivalenza dal codice reale. Non sostituire un gruppo con una singola immagine, una sequenza con un fade o una formula con percentuali arbitrarie.

Se la sorgente usa lo scroll come orologio continuo, mantieni il rapporto diretto fra progressione dello scroll e stato visivo. Se usa lo scroll solo come trigger di una sequenza autonoma, mantieni la sua temporizzazione. Ricava la distinzione dal codice, non dal nome del materiale. Ricalcola geometria e coordinate quando cambia il DOM; una conversione da `backgroundPosition` a `transform` richiede l'escursione reale in pixel rispetto alle due geometrie.

## Implementazione nel sito

Inserisci davvero HTML, CSS e JavaScript delle scene nella pagina. Una sezione con il nome del componente, un import, un commento, una demo originale in iframe o una chiamata che non produce movimento non sono integrazione. Le scene assegnate devono essere visibili e riconoscibili nel percorso normale della pagina, non soltanto in una preview o dietro un hover non evidente.

La soluzione normale è adattare le scene nel DOM nativo del sito. Usa `MaterialHost` solo se il runtime richiede isolamento e adatta comunque contenuto, proporzioni e raccordo alla pagina; per una scena guidata dallo scroll non creare uno scroll separato che cambi il meccanismo. Mantieni intatte le cartelle sorgente e modifica i file del sito.

Carica le dipendenze dai percorsi **esistenti** nella repository. `MOTORE/plugin-registry.js` elenca i plugin locali; leggi `MOTORE/MOTION.md` e la firma reale di `MOTORE/regia-coordinatore.js`. Per una scena assegnata carica ciò che serve con `SiteScenes.loadDependencies`, poi monta con `SiteScenes.mount` e un root DOM reale. Non usare `mountAsyncSafe` per nascondere l'errore di una scena richiesta: se manca una dipendenza o il montaggio fallisce, correggilo. Coordina le proprietà animate con wrapper separati o una sola timeline quando più scene toccano lo stesso nodo.

`MOTION_CONFIG.auto=false` significa che la regia editoriale non compare da sola. Progetta una macroregia dall'hero al footer e scene di raccordo coerenti. Mantieni accessibilità, tastiera, link, mobile e `prefers-reduced-motion`; un controllo interattivo deve poter ricevere click e focus nel layout finale.

Apri il sito via HTTP durante il lavoro e correggi direttamente gli errori osservati. Non creare gate, dossier, prove simulate o cicli di approvazione. Consegna il sito funzionante e indica brevemente, per ciascun assegnato, dove vive la scena e quale formula o rapporto causale è stato conservato. Se un assegnato resta impossibile dopo lo studio delle varianti e delle dipendenze, indica il blocco preciso e non dichiarare il giro completo.
