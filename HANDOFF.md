# Handoff — Dimora "Cuore della Città"

Stato al 24 luglio 2026. Riferimento: preventivo inLumine Studio del 22 luglio
2026 (Fase 1 - UI/UX Design & Wireframing → in corso).

## Cosa esiste oggi

Sito multi-pagina (Next.js 16 + TS + Tailwind v4), componentizzato, con
routing reale (non single-page ad anchor):

- **`/`** — Hero full-bleed (barra promo + logo + nav verticale ancorati ai
  bordi, che scompaiono scorrendo, titolo "Cuore della Città", CTA
  WhatsApp/Chiamata), seguita dallo **scroll orizzontale desktop**: tre
  pannelli a piena schermata — "La Nostra Storia", "Dove ci Troviamo" e le
  **FAQ** (accordion su crema accanto al blocco editoriale sulla foto della
  statua di Ovidio) — che scorrono lateralmente mentre si usa la rotellina in
  verticale (vedi sotto)
- **`/la-dimora`** — racconto della struttura + galleria fotografica con
  lightbox (click per ingrandire, frecce prev/next)
- **`/servizi-comfort`** — griglia servizi con icone
- **`/posizione`** — punti di interesse + placeholder mappa
- **`/partner`** — rete partner e convenzioni

Le FAQ **non hanno più una pagina dedicata**: sono il pannello di chiusura
della home (accordion su fondo scuro/crema) e la voce è stata tolta dal menu.
`src/app/faq/` è stata eliminata; il componente `ContactCta`, che chiudeva
quella pagina, non è più montato da nessuna route.

> **Nota bozza cliente**: `showFullNav` in `content.ts` è oggi `false`, quindi
> in pratica è online **solo la homepage** — le altre route esistono ma
> reindirizzano a `/`, e le voci di nav non sono cliccabili. Rimettere a
> `true` per riattivare l'intero sito.

`StickyHeader` e `Footer` sono globali (montati in `app/layout.tsx`): su `/`
lo header resta nascosto finché non si scrolla oltre la Hero, sulle altre
pagine è sempre visibile fin da subito (non c'è una Hero da sostituire).
Lo header porta la CTA **"Prenota ora"** (WhatsApp) accanto alla nav, così la
prenotazione è a un click da qualsiasi pagina e non solo dalla barra promo
della Hero, che sparisce appena si scrolla.

**Scroll orizzontale della home** (`components/ui/HorizontalScroller.tsx`):
riproduce l'effetto del riferimento di design fornito dal cliente
(sylverrappresentanze.it, che lo ottiene con GSAP ScrollTrigger) ma in JS
puro, **senza aggiungere dipendenze**. Da `lg:` in su i pannelli sono
`100vw × 100dvh` e traslano 1:1 con lo scroll; sotto `lg` l'effetto è
disattivato e i pannelli si impilano in verticale. Dettagli in `CLAUDE.md`.

**Hero**: occupa sempre l'intero viewport (`min-h-dvh`) e il titolo "Cuore
della Città" è full-bleed edge-to-edge tramite SVG `textLength` (vedi CLAUDE.md
§ Hero). La scrollbar del sito è colorata come la barra promo (gradiente
sabbia/terracotta).

Direzione estetica validata con il cliente: stile editoriale/caldo ispirato
al riferimento "BEPD:HOTEL". Font, tutti e tre in `src/app/fonts/` o da Google:
**Flaviotte** (display fornito dal cliente) per **tutti i titoli**, il wordmark
e il claim della Hero; **General Sans** (anch'esso del cliente) per copy e
interfaccia; **Newsreader** per la nav dell'overlay Hero e del drawer mobile.
Work Sans, Bodoni Moda e Inter, usati nelle bozze precedenti, sono stati
scartati e non vengono più caricati. Palette terracotta/ambra. Dettagli in
`CLAUDE.md`.

Micro-interazioni della nav e CTA: le voci di menu hanno un **filetto che si
espande** all'hover (`components/ui/NavLink.tsx`, ha sostituito l'hover corsivo)
e le due CTA "Prenota ora" sono **sempre piene** in terracotta, non più outline.

Verificato: type-check pulito (`npx tsc --noEmit`), nessun errore console,
testato su viewport desktop e mobile (menu hamburger incluso) e su tutte le
route. Lo scroll orizzontale è stato verificato misurando la traslazione a
scroll crescente: 0 fino a fine Hero, poi lineare 1:1 fino a fondo corsa, con
clamp oltre; su mobile pin disattivato e nessun overflow orizzontale.

## Cosa manca / TODO prima della messa online

Tutti i placeholder sono marcati con `TODO` in `src/lib/content.ts`.

1. **Foto reali** — inserite: la foto della camera (provvisoria, `hero.jpg`),
   Piazza Garibaldi al tramonto nel pannello "Dove ci Troviamo"
   (`sulmona-piazza-garibaldi-tramonto.webp`, fornita dal cliente il 25 luglio
   2026: PNG da 1,6 MB riconvertito in WebP q92 da 137 KB, vedi la nota sul
   formato in `CLAUDE.md` § Placeholder immagini) e la statua di Ovidio come
   fondo della colonna editoriale delle FAQ (`statua-di-ovidio.jpg`, stessa data
   — **da chiarire se servono attribuzioni per entrambe**, vedi punto 10).
   **Manca ancora la foto de "La Nostra Storia"**, che in
   home mostra tuttora `ImagePlaceholder`; idem Gallery e About. Azione:
   salvare le foto in `public/images/` e valorizzare il campo corrispondente
   in `content.ts` (vedi `CLAUDE.md` § Placeholder immagini).
   Nota: `public/images/posizione.jpg`, `hero-temp.jpg` e
   `sulmona-piazza-garibaldi.jpg` (la versione Wikimedia, sostituita dallo
   scatto al tramonto) non sono più referenziati da nessun componente — si
   possono eliminare se non servono.
2. **Recapiti reali** — telefono/WhatsApp (`+39 351 496 4713`) e indirizzo
   (Via Panfilo Scudieri 1, Sulmona) sono quelli veri. Restano placeholder
   **email, Telegram e URL Instagram** in `siteConfig` (`content.ts`).
3. **Rete partner reale** — l'elenco in `partners` (`content.ts`) è
   esemplificativo. Da sostituire con le convenzioni effettive.
4. **Mappa** — al momento un placeholder testuale; da collegare a Google
   Maps/OpenStreetMap con l'indirizzo definitivo.
5. **Punti di interesse** — i nomi in `pointsOfInterest` (`content.ts`) sono
   ora quelli reali forniti dal cliente e l'elenco è **ordinato per distanza
   crescente** (Annunziata 2 min, San Panfilo 4 min, Piazza Garibaldi 6 min):
   l'ordine dell'array è l'ordine reso a schermo, quindi va mantenuto
   aggiungendo voci. Restano da **verificare i tempi di percorrenza**.
6. **Font locali da ottimizzare** — Flaviotte e General Sans stanno in
   `src/app/fonts/` nel formato consegnato dal cliente: un `.woff2` (18 KB) per
   Flaviotte, ma **quattro `.otf` da ~46 KB** per General Sans (400, 400
   corsivo, 500, 600), circa 200 KB in tutto. `next/font/local` serve i file
   così come sono, senza convertirli né subsettarli. Prima della messa online:
   procurarsi i `.woff2` di General Sans (il kit di Fontshare li include) o
   convertirli, ed eventualmente subsettare al latino. Verificare anche la
   **licenza d'uso web** di entrambi i font, dato che ora sono serviti dal sito.
7. **Multilingua IT/EN** — offerto nel preventivo ma non ancora implementato
   (richiede decisione su approccio: `next-intl` vs routing manuale).
8. **SEO on-page** — metadata di base già presenti in `layout.tsx`; mancano
   ancora Open Graph image, sitemap, robots.txt e favicon dedicato (quello
   di default è stato rimosso in fase di pulizia scaffold).
9. **Risposte FAQ** — le **nove domande** in `faqs` (`content.ts`) sono quelle
   definitive fornite dal cliente e **otto risposte su nove** sono inserite
   (orari, prenotazione, Wi-Fi, parcheggio, animali, biancheria, cucina,
   contatti durante il soggiorno). Manca solo **"Qual è la politica di
   cancellazione?"**, che mostra "Risposta in arrivo.". Azione: valorizzare
   `answer` per quella voce, tenendo la risposta breve (2-3 righe) — il pannello
   è vincolato all'altezza del viewport e non scrolla (vedi `CLAUDE.md`).
10. **Crediti fotografici** — `photoCredits` (`content.ts`) è oggi `undefined` e
   il Footer non mostra alcuna riga di attribuzione: la foto Wikimedia di
   Lorenzo Testa che la richiedeva è stata sostituita dallo scatto al tramonto
   fornito dal cliente, e tenere il credito con quella foto fuori dal sito
   sarebbe un'attribuzione falsa. **Da confermare con la proprietaria** che
   `sulmona-piazza-garibaldi-tramonto.jpg` e `statua-di-ovidio.jpg` siano scatti
   suoi: se una delle due viene da terzi va rimessa l'attribuzione (autore +
   licenza + link se è una CC), e con due foto da attribuire conviene passare da
   stringa singola a array.

## Come continuare a lavorarci

```bash
npm run dev
```

Apre il sito su `http://localhost:3000`. Il file `.claude/launch.json`
configura già l'anteprima per lo strumento Browser di Claude Code.

Prima di ogni commit: `npx tsc --noEmit` e `npm run lint`. Entrambi oggi sono
**puliti**: i tre errori ESLint storici (`setState` in effect in `MobileMenu`,
due `<a href="/">` da convertire a `next/link` in `Hero` e `StickyHeader`)
sono stati risolti — vedi le convenzioni in `CLAUDE.md`.

## Prossimo passo consigliato

Raccogliere dal cliente i contenuti reali elencati sopra (punti 2, 3 e 5 sono
i più veloci da chiudere) e soprattutto **la foto de "La Nostra Storia"** e
l'**ultima risposta FAQ mancante** (politica di cancellazione): sono i
placeholder ancora visibili nella homepage mostrata al cliente. Fatto quello,
si può riportare `showFullNav` a `true` e passare dalla Fase 1 (UI/UX) alla
Fase 2 (sviluppo front-end con contenuti reali) del workflow concordato nel
preventivo.
