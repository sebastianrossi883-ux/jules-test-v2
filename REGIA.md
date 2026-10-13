# Regia - Podere Bricco Sereno

## Studio — codrops-sticky-grid-scroll-main
1. **Testo collegato:** Letto per intero `originale-69eb2cea87adb275.txt` e `articolo-completo.md` (autore Theo Plawinski). L'autore descrive una galleria basata su scroll: scrolla per far entrare la griglia a colonne alternate, poi espande la griglia (zoom e distanziamento colonne), per poi far apparire il testo al centro e stabilizzare la scena. Le fasi sono guidate da una singola timeline di scroll e una struttura appiccicosa (sticky).
2. **Pagine e varianti:** C'è una sola variante in `src/index.html`. La pagina contiene un `.block--intro` e un `.block--main` con un wrapper sticky. Il wrapper contiene il testo centrale `.content` e la griglia `.gallery`.
3. **Codice completo:**
   - `index.js:129-157` `gridRevealTimeline`: Raggruppa le colonne. Fa entrare gli elementi (y sfalsata e alternata per colonna) con stagger.
   - `index.js:166-190` `gridZoomTimeline`: Ingrandisce la griglia `scale: 2.05`, sposta le colonne laterali su asse X, muove elementi centrali su asse Y.
   - `index.js:198-222` `toggleContent`: Fa apparire il titolo (rimuove l'offset Y) e sfuma la descrizione/bottone quando la griglia fa spazio.
   - `index.js:230-251` `animateGridOnScroll`: Monta tutte le timeline con overlap temporale (`-=0.6` e `-=0.32`).
4. **Eventi:** La navigazione è interamente pilotata dallo Scroll (`index.js:230`, `ScrollTrigger` con `scrub: true`). L'ingresso del titolo ha un suo ScrollTrigger dedicato in `animateTitleOnScroll`.
5. **Fisica e curve:** Curva prevalente `power1.inOut` per reveal, `power3.inOut` per zoom. Stagger `0.06` nell'ingresso. Durate nominali `1s` nella timeline di zoom (modificate dallo scrub).
6. **Misure e lifecycle:** La distanza Y di ingresso è misurata sulla window (`wh - (wh - this.grid.offsetHeight) / 2`). Le colonne sono raggruppate dinamicamente con operazione modulo (`index.js:71`). Cleanup lasciato all'utilizzatore, benché non ci sia un vero unmount.
7. **Stati:** Iniziale: griglia fuori schermo, testo nascosto. Sviluppo: griglia entra e si allarga, testo emerge. Finale: testo visibile, griglia ingrandita a fare da sfondo.
8. **Dettagli dal codice:** L'effetto richiede uno spazio temporale lungo (`height: 425vh` in `index.css:50`) per funzionare bene come scrub. Il titolo centrale pre-calcola il suo offset Y per entrare dal basso. L'effetto parallax fa scorrere il wrapper con `yPercent: -100` su `top bottom` a `top top`.

Ruolo nel sito: Diventerà la meccanica strutturale principale per l'ingresso delle sezioni fotografiche (es. I Vigneti, Le Dimore), permettendo a elementi visuali o testuali mascherati di entrare, espandersi e rivelare i contenuti primari. Legge del movimento: "Il contenitore trattiene gli attori mentre lo scroll ne espande la formazione per rivelare il contenuto centrale."

## Studio — codrops-mwg
1. **Testo collegato:** Letto per intero `originale-c62d1ac428e28d7e.txt` e `articolo-completo.md`. L'autore (Made With Gsap) spiega un effetto trail su mouse/touch dove immagini appaiono, "cadono" sotto gravità, rimbalzano sul fondo e spariscono.
2. **Pagine e varianti:** C'è solo `index.html`. Un contenitore `.medias` nasconde immagini da cui lo script pesca gli src a caso.
3. **Codice completo:**
   - `script.js:22-42` `applyMove`: calcola lo spostamento `incr += Math.abs(valX - oldIncrX) + ...`. Se supera una soglia, lancia `createMedia`.
   - `script.js:57-121` `createMedia`: crea un `<img>`, appende al root, poi lancia timeline:
     - Tween 1 (apparenza): scala da 1.3 a 1 con rotazione casuale, curva `elastic.out(2, 0.6)`.
     - Tween 2 (X): drift in direzione X (`+= deltaX * 2`).
     - Tween 3 (Y): caduta sul fondo (`y: '+=' + (H - y)`) e `yPercent: -95`. Curva `back.in(1.1)`.
     - Tween 4 (X/Y bounce post-caduta): rimbalza e sparisce oltre lo schermo con rotazione extra.
   - Il cleanup avviene su `onComplete` della timeline, rimuovendo il nodo.
4. **Eventi:** Mousemove e touchmove misurano i delta di posizione e superata la soglia creano particelle.
5. **Fisica e curve:** Curva elastica d'ingresso, `power1.in` per le derive X, `back.in` "dinamico" in base all'altezza originaria per il rimbalzo. Gravità apparente determinata da animazioni simultanee X/Y/Rotation.
6. **Misure e lifecycle:** La soglia è dinamica `window.innerWidth / 8`. Le particelle sono istanze effimere, create e distrutte. `MutationObserver` spegne gli eventi se il root è rimosso dal DOM.
7. **Stati:** L'immagine nasce scalata ed elastica al cursore. Poi è in caduta libera. Tocca il fondo, rimbalza, sparisce.
8. **Dettagli dal codice:** I delta X e Y del cursore non influenzano solo la posizione iniziale ma anche la "deriva" X (Tween 2 e 4).

Ruolo nel sito: Può fungere da effetto decorativo per i contatti o durante la permanenza prolungata su alcune foto. Legge del movimento: "Un'azione prolungata genera un'eco visiva che cade seguendo la gravità e scompare rimbalzando."

## Studio — codrops-motion-path-transition-main-2
1. **Testo collegato:** Letto per intero `originale-ac8c549039854f62.txt` e l'articolo. L'autore Iqbal Muthahhary descrive una transizione fluido basata su `MotionPathPlugin`. Una pila di miniature sovrapposte (stack) viene "smazzata" e guidata lungo curve calcolate dinamicamente per formare una striscia di immagini, rivelando l'immagine principale.
2. **Pagine e varianti:** Sono 4 varianti in `index.html` -> `index4.html`. Ognuna ha direzioni, curvature e smazzamenti diversi.
   - Variante 1: dal basso a sinistra a strip laterale destra.
   - Variante 2: dall'alto a sinistra a strip orizzontale in basso.
   - Variante 3: smazza accanto all'immagine principale.
   - Variante 4: interagisce con bottoni (bottom/left) spostandosi su assi dinamici (il primo elemento non usa curva).
3. **Codice completo:**
   - Prendo come riferimento `js/script.js` (Variante 1).
   - `updateMeasurements`: Calcola le distanze di ogni target, includendo lo shift dovuto alla scala (`thumbnailRect.width - scaledWidth`).
   - `buildTimeline`: Usa una timeline principale `tl = gsap.timeline({defaults: {ease: "expo.inOut", duration: 1.2}})`.
   - `motionPath`: I target sono guidati tramite due punti. Il primo funge da punto di flesso (spostamento con `scale` intermedio) per creare un "overshoot" curvo.
4. **Eventi:** La navigazione avviene tramite tasti di open/close, triggerando `tl.play()` e `tl.reverse()`. Su `resize`, le misure vengono aggiornate e la timeline ricostruita mantenendo il `progress`.
5. **Fisica e curve:** Curva lunga e pulita `expo.inOut` (1.2s). Movimento curvo generato dal MotionPath con due waypoints. C'è uno stagger di 0.02s per le immagini.
6. **Misure e lifecycle:** Molto affidabile: `updateMeasurements()` è vitale perché tutte le distanze della strip sono in pixel assolute, calcolate relative alla posizione in cui le miniature giacciono in HTML.
7. **Stati:** Compatto: Le immagini sono impilate. Rivelato: sono distese in fila o colonna. L'elemento grande appare dal nulla, le scritte numeriche `opacity/yPercent` emergono contemporaneamente.
8. **Dettagli dal codice:** I layer delle miniature sono sovrascritti da `gsap.set zIndex` affinché la prima sia in alto. La formula `curviness: 0.45` è fondamentale per la rotondità della smazzata.

Ruolo nel sito: Verrà usato per animare i passaggi dove un gruppo di elementi si sposta da una formazione raccolta ad un layout organizzato, ad esempio le sezioni di galleria (Dimore o Cantina) con maschere testuali o immagini. Legge del movimento: "Elementi originati da un punto focale viaggiano lungo traiettorie curve per raggiungere una nuova configurazione spaziale."

## Regia globale prima delle scene

**Idea guida e metafora:** Il movimento deve trasmettere lentezza, quiete e radicamento: la pazienza dell'agricoltura, le vigne e le botti antiche. La composizione è ampia e ariosa, con l'identità materiale preservata.
**Arco narrativo dall'hero al footer:**
  - *Ingresso (Hero):* Ampio e maestoso, le foto appaiono espandendosi leggermente;
  - *Sviluppo (Sezioni interne):* Il visitatore esplora i terrazzamenti scendendo. Ogni sezione rivela i suoi elementi organizzandoli (Componente e Seme 2) e reagisce al transito.
  - *Chiusura (Footer):* L'esperienza termina lasciando piccoli semi/tracce d'interazione (Seme 1) tra i contatti.
**Composizione e gerarchia visiva:** La tipografia serif ha grande preminenza e si stabilizza con piccoli offset o dissolvenze, la struttura a griglia accoglie le foto (maschere o vere immagini) incanalando l'attenzione verso il centro.
**Grammatica comune di movimento:** Movimento scrubbed `power1.inOut` per transizioni strutturali. I testi hanno ingressi leggeri (es. `power3.out`, durata 0.85s) senza elasticità. Parallax sottile su tutte le immagini ampie.
**Ritmo complessivo:** Scorrere lento. Il culmine avviene nel mezzo tra la Cantina e i Vigneti (espansione massima), poi la Tradizione rallenta verso il Footer.
**Filo percettivo:** Le geometrie sfalzate passano da raggruppate ad aperte, come i filari delle viti, che appaiono in perspective via via che si cammina.

**Ruolo delle sezioni e passaggi:**
1. **Scena 1 (Hero - scene-001):**
   - *Ruolo:* Apertura indipendente dallo scroll. Il background rivela la sua ampiezza, la tipografia scende in posizione (Grammatica comune).
   - *Passaggio:* Lascia che l'immagine fluisca in parallasse quando lo scroll inizia.
2. **Scena 2 (Percorsi - scene-002):**
   - *Ruolo:* Applica il **Componente (Sticky Grid)**. Abbiamo 2 foto in HTML. Aggiungiamo div geometrici per arrivare a 6 "attori" visuali in griglia (2 foto reali + 4 pannelli sfumati o tipografici) per creare la formazione d'espansione. Lo scroll allarga le colonne laterali e sposta verticalmente quelle centrali.
   - *Passaggio:* La griglia si apre lasciando spazio al testo di introduzione della sezione successiva.
3. **Scena 3 (Ospitalità/Dimore - scene-003):**
   - *Ruolo:* Qui si applica il **Seme 2 (Motion Path)**. L'immagine in HTML, insieme ad alcuni elementi grafici (forme o bordi colorati) che simulano la pila di "miniature", partono raggruppati al centro del container e si smazzano in curva per accomodarsi nel layout grid a due colonne finale. La transizione avviene a scroll-scrubbed su base `SiteScenes`.
   - *Passaggio:* Il testo "Le Dimore" si stabilizza, conducendo l'occhio al background scuro successivo.
4. **Scena 4 (Cantina - scene-004):**
   - *Ruolo:* Focus e immersione (Seme 2 e grammatica). Il testo entra a cascata (word stagger). La grande foto a destra riceve un parallax profondo in entrata, richiamando la legge di espansione.
   - *Passaggio:* Stacco cromatico deciso, da scuro a chiaro per la sezione successiva.
5. **Scena 5 (Vigneti - scene-005):**
   - *Ruolo:* Di nuovo influenza del **Componente**. L'immagine della collina entra con un delay laterale, sfalzando l'asse X in scrub come se si stesse aprendo un varco nella griglia.
   - *Passaggio:* La linea dorata fa da guida per l'occhio verso il blocco Valori.
6. **Scena 6 (Valori e Radici - scene-006):**
   - *Ruolo:* Sinergia tra Componente e Seme 2. Le 2 foto delle botti viaggiano su percorsi curvi, incontrandosi a fine scroll.
   - *Passaggio:* Ritorno al colore scuro.
7. **Scena 7 (Esperienze - scene-007):**
   - *Ruolo:* Sezione d'intermezzo. I testi entrano con un fade dal basso, con una pausa respiratoria che attende il visitatore.
   - *Passaggio:* Raccordo fluido col Footer.
8. **Scena 8 (Footer - scene-008):**
   - *Ruolo:* Applica il **Seme 1 (MWG - Fall & Bounce)**. Sulla sezione dei Contatti, le interazioni col mouse provocano la "caduta" visiva di foglie o macchie d'acquerello o frammenti d'uva dorati (elementi grafici creati dinamicamente). È un tocco decorativo, senza rubare click.
   - *Chiusura:* Il sito stabilizza tutte le interazioni, rilasciando l'ownership.
