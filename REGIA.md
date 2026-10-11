# Regia - Motion Atlas

## Arco Narrativo e Struttura
Motion Atlas è un'esplorazione di tre diversi linguaggi del movimento digitale, organizzata come un atlante in tre capitoli progressivi.
L'arco narrativo parte dall'ordine assoluto (La Griglia), passa attraverso la perdita di controllo tramite la fisica e la caduta (La Gravità), per ricomporsi infine in un tracciato fluido ed elegante (Le Traiettorie).
Ogni sezione possiede una meccanica cinetica distintiva ma è coordinata da un unico flusso di scroll che guida l'esperienza dell'utente.

## Trasformazione dei Materiali

### Componente: `codrops-sticky-grid-scroll-main` (Capitolo 1)
- **Ruolo:** Presentare "La Griglia", l'ordine architettonico dell'informazione.
- **Integrazione:** Il comportamento nativo (costruito con classi JS che attivavano animazioni su scroll) è stato tradotto in un'unica timeline GSAP con `scrub: true` sincronizzata al motore del sito. La griglia entra divisa in colonne (movimento verticale sfalsato), si espande (zoom) e sposta lateralmente e verticalmente le colonne per svelare il testo centrale. Le 12 immagini creano un muro visivo impattante.

### Seme 1: `codrops-mwg` (Capitolo 2)
- **Ruolo:** Rappresentare "La Gravità", il peso del movimento.
- **Integrazione:** La demo originale reagiva al movimento del mouse, generando dinamicamente immagini che cadevano e scomparivano. Nel sito, questo concetto è stato reimmaginato: 10 immagini sono già presenti ma nascoste. Lo scroll funge da attivatore temporale (timeline con scrub). Scendendo nella sezione, i frammenti cadono progressivamente dall'alto con rimbalzi e rotazioni casuali, accumulandosi prima di cadere ulteriormente fuori dallo schermo.

### Seme 2: `codrops-motion-path-transition-main-2` (Capitolo 3)
- **Ruolo:** Rappresentare "Le Traiettorie", il flusso sinuoso dell'informazione.
- **Integrazione:** La demo srotolava una pila di immagini lungo un tracciato curvo (tramite MotionPathPlugin) alla pressione di un pulsante. Questa meccanica è stata trasformata in un'evoluzione legata allo scroll. All'ingresso della sezione, le immagini sono in pila; scrollando, si distribuiscono su una curva (curviness: 1.2) svelandosi una alla volta lungo l'asse orizzontale.
