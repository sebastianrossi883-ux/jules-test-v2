# SKILLS_VANILLA — riferimenti tecnici

## Autorità in questa missione

`METHOD/MISSIONE_JULES.md` stabilisce il risultato creativo e la copertura richiesta. Queste skill descrivono API, compatibilità, lifecycle, accessibilità e prestazioni. Indicazioni generiche come "prefer subtlety", limiti di frequenza per prodotti d'uso quotidiano o "2-4 scroll moments" non sono un tetto per questo sito editoriale cinematografico e non possono ridurre scene e invarianti dei materiali forniti. Applicale dove compatibili con contenuto, sorgente, leggibilità e missione.

8 skill, **zero React**. Tutto qui dentro funziona su HTML statico con tag `<script>`.
Se il tuo ambiente supporta le Agent Skills, caricale per nome. Se non le supporta, leggi i file di questa cartella.

## Ordine di lettura

| # | Skill | Leggila per |
|---|---|---|
| 1 | `cinematic-gsap-lenis-motion-system/SKILL.md` | La regia: init order, token, reveal/parallax/pin/cursore, QA checklist finale |
| 2 | `gsap-core/SKILL.md` | Tween, stagger, `matchMedia`, reduced-motion |
| 3 | `gsap-timeline/SKILL.md` | Timeline hero, position parameter, sequenze |
| 4 | `gsap-scrolltrigger/SKILL.md` | `start`/`end`, scrub, pin, `refresh()`, cleanup |
| 5 | `gsap-plugins/SKILL.md` | SplitText, Flip, CustomEase, Observer, Draggable+Inertia — tutti gratuiti |
| 6 | `gsap-utils/SKILL.md` | `random`, `snap`, `mapRange`: varietà misurata |
| 7 | `gsap-performance/SKILL.md` | Solo transform, batching, niente layout thrashing |
| 8 | `ui-animation/` | Riferimenti tecnici per easing, sequenziamento, accessibilità e prestazioni; la missione decide copertura e intensità complessive |

## Cosa è stato tolto di proposito

- `gsap-react` e `gsap-frameworks` (Vue/Svelte): fuori stack.
- `gsap-awwwards-website`: è React 19 + Tailwind 4.
- I reference framer-motion di `ui-animation` (`contextual-animations`, `component-patterns`, `svg-animation`, `code-output`, `clip-path-techniques`, `gesture-drag`).

## Limite di autorità

Le skill danno il **come** (API corretta, cleanup, performance), non scelgono i materiali né sostituiscono le loro formule.
I componenti e i semi consegnati in `MOTION_COMPONENTE/COMPONENTI/` e `MOTION_COMPONENTE/SEMI/` sono la fonte per meccanismi, stati e invarianti matematici.
In caso di conflitto tra un esempio della skill e una sorgente fornita, **vince la sorgente**. La regia visiva originale si progetta sul sito concreto.
