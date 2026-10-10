# Regia globale del sito

Questo documento è un promemoria di architettura. La missione completa e vincolante è `METHOD/MISSIONE_JULES.md`; questo file non introduce requisiti artistici paralleli e non riduce quelli descritti lì.

Progetta insieme layout e movimento. La pagina ha una macroregia dall'hero al footer e ogni sezione principale ha una microregia adatta ai propri contenuti. I materiali forniti restano scene protagoniste con meccanismo e invarianti preservati. Le altre scene danno identità al sito e raccordano i momenti principali.

Registra nel codice i proprietari di nodi e proprietà, usa livelli DOM distinti quando le scene devono sommarsi, coordina un solo driver di scroll e controlla ogni confine in entrambe le direzioni e su mobile. La dichiarazione di proprietà non prova che la geometria composta sia priva di sovrapposizioni: osserva il sito nel browser secondo la missione.

Non creare un dossier o una selezione JSON. Non dichiarare il lavoro riuscito sulla base del solo gate statico.
