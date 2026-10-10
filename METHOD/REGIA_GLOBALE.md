# Regia globale del sito

Questo documento è un promemoria di architettura. La missione completa e vincolante è `METHOD/MISSIONE_JULES.md`.

Progetta insieme layout e movimento. La pagina ha una macroregia dall'hero al footer e ogni sezione principale ha una microregia adatta ai propri contenuti. Tutti i materiali assegnati in `METHOD/INCARICO_GIRO.md` restano scene protagoniste con meccanismo preservato. Le altre scene danno identità al sito e raccordano i momenti principali.

Porta normalmente i meccanismi assegnati nel DOM del sito. Usa una capsula soltanto per un runtime incompatibile e conserva comunque il rapporto con la regia e lo scroll della pagina. Coordina un solo driver di scroll nella pagina principale.

Non creare dossier o gate. Il manifest JSON è generato dall'importatore ed è un indice operativo, non un documento da compilare a mano.
