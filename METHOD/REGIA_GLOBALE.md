# Regia globale del sito

Questo documento è un promemoria di architettura. La missione completa e vincolante è `METHOD/MISSIONE_JULES.md`.

Progetta insieme layout e movimento. La pagina ha una macroregia dall'hero al footer e ogni sezione principale ha una microregia adatta ai propri contenuti. I materiali scelti dal manifest restano scene protagoniste con meccanismo preservato. Le altre scene danno identità al sito e raccordano i momenti principali.

Usa capsule per runtime incompatibili e scene native isolate per i meccanismi fusi nel DOM. Coordina un solo driver di scroll nella pagina principale; ogni capsula possiede il proprio runtime.

Non creare dossier o gate. Il manifest JSON è generato dall'importatore ed è un indice operativo, non un documento da compilare a mano.
