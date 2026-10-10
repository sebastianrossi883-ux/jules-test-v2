# Provenienza e ruoli

`MOTION_COMPONENTE/ARCHIVIO` è un catalogo ampio di sorgenti, non una collezione di scene già integrate. I tre materiali del giro corrente sono nominati in `METHOD/INCARICO_GIRO.md` e hanno sorgenti originali anche in `MOTION_COMPONENTE/COMPONENTI` e `MOTION_COMPONENTE/SEMI`. Jules deve studiare e adattare tutti e tre nel sito reale; Python ha importato sorgenti, non ha fatto il lavoro creativo.

Il coordinatore va caricato prima di `motion.js`; le scene custom aspettano `MotionKit.ready`. `MOTION_CONFIG.auto=false` richiede regia esplicita. Usa una sola istanza delle dipendenze e i percorsi reali della repository.
