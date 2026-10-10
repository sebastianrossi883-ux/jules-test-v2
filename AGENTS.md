# Missione operativa

`METHOD/MISSIONE_JULES.md` è il contratto principale. Il Metodo è risolutivo: non creare gate, audit o cicli ripetuti di controllo.

Per librerie grandi usa `METHOD/import_materials.py` una sola volta e lavora dal manifest generato. Non leggere manualmente centinaia di cartelle e non inventare i path delle dipendenze.

Usa esclusivamente materiali con `julesEligible: true`. React/TSX e React Three Fiber sono conservati ma esclusi per scelta del committente: non installarli, non compilarli e non convertirli durante la costruzione del sito.

I componenti legacy o incompatibili si montano con `MaterialHost` in capsule isolate. Le scene fuse nel DOM usano `SiteScenes.mountAsyncSafe` e il registro `MOTORE/plugin-registry.js`, così un errore non blocca il resto della pagina.

Costruisci design e regia nella stessa sessione. Osserva il risultato finale nel browser senza trasformare l'osservazione in un nuovo sistema di gate.
