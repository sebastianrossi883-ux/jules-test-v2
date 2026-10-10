# Incarico del giro — Podere Bricco Sereno

Evolvi il sito esistente in `index.html`; non sostituirlo con una galleria di demo. Questa è la lista chiusa delle sorgenti obbligatorie per il giro. La libreria in `ARCHIVIO` rimane disponibile, ma non va montata tutta.

1. **Componente — Textblock8**: `MOTION_COMPONENTE/COMPONENTI/textblock8/index8.html` e i file CSS/JS/asset richiamati. Integra nel contenuto del Podere lo scambio completo fra due testi con Splitting, stati e sequenza delle parole. Il pulsante deve essere realmente cliccabile e utilizzabile da tastiera.
2. **Seme — Parallax**: `MOTION_COMPONENTE/SEMI/parallax/index.html` e `js/index.js`. Trasferisci la legge `getRatio` e la progressione scroll→immagine nelle sezioni del Podere. Se usi `<img>` al posto di `backgroundPosition`, deriva l'escursione in pixel dalla geometria reale; non scegliere `yPercent` a occhio.
3. **Seme — Paths**: `MOTION_COMPONENTE/SEMI/paths/index.html` e `js/index.js`. Conserva i tre ancoraggi, il percorso Bézier con i suoi punti di controllo, il movimento guidato dallo scroll e l'interpolazione delle dimensioni. Adatta soggetto e impaginazione al sito; non ridurlo a un semplice reveal.

Il sito attuale contiene già riferimenti a questi nomi, ma questo non prova l'integrazione. Nel codice esistente la sezione di Textblock8 ha `pointer-events-none` su un antenato del pulsante; il Parallax dichiara esplicitamente una conversione con percentuali approssimate. Risolvi questi problemi nel sito reale, non soltanto nei commenti o nel rapporto finale. Studia anche gli altri dettagli delle tre sorgenti prima di concludere.

Tutti e tre devono essere scene visibili e funzionanti nel normale percorso della pagina. Segui `METHOD/MISSIONE_JULES.md`; non sostituire gli assegnati con alternative più facili. Non creare gate o dossier. Se un impedimento reale resta dopo aver studiato sorgenti e dipendenze, riportalo precisamente senza dichiarare completato il giro.
