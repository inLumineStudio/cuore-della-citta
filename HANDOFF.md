# Handoff — Dimora "Cuore della Città"

Stato al 23 luglio 2026. Riferimento: preventivo inLumine Studio del 22 luglio
2026 (Fase 1 - UI/UX Design & Wireframing → in corso).

## Cosa esiste oggi

Sito multi-pagina (Next.js 16 + TS + Tailwind v4), componentizzato, con
routing reale (non single-page ad anchor):

- **`/`** — solo Hero: full-bleed, barra promo + logo + nav verticale
  ancorati ai bordi (scompaiono scorrendo), titolo "Cuore della Città" in
  Bodoni Moda, CTA WhatsApp/Chiamata
- **`/la-dimora`** — racconto della struttura + galleria fotografica con
  lightbox (click per ingrandire, frecce prev/next)
- **`/servizi-comfort`** — griglia servizi con icone
- **`/posizione`** — punti di interesse + placeholder mappa
- **`/partner`** — rete partner e convenzioni
- **`/faq`** — domande frequenti (accordion) + CTA di contatto finale

`StickyHeader` e `Footer` sono globali (montati in `app/layout.tsx`): su `/`
lo header resta nascosto finché non si scrolla oltre la Hero, sulle altre
pagine è sempre visibile fin da subito (non c'è una Hero da sostituire).

**Hero**: occupa sempre l'intero viewport (`min-h-dvh`) e il titolo "Cuore
della Città" è full-bleed edge-to-edge tramite SVG `textLength` (vedi CLAUDE.md
§ Hero). La scrollbar del sito è colorata come la barra promo (gradiente
sabbia/terracotta).

Direzione estetica validata con il cliente: stile editoriale/caldo ispirato
al riferimento "BEPD:HOTEL". Font: Bodoni Moda **solo** per il titolo Hero,
Inter per tutto il resto. Palette terracotta/ambra. Dettagli in `CLAUDE.md`.

Verificato: type-check pulito (`npx tsc --noEmit`), nessun errore console,
testato visivamente su viewport desktop e mobile (menu hamburger incluso) e
su tutte le route.

## Cosa manca / TODO prima della messa online

Tutti i placeholder sono marcati con `TODO` in `src/lib/content.ts`.

1. **Foto reali** — ad oggi solo la foto della camera (fornita dal cliente
   come provvisoria) è pronta per essere inserita; nel resto della homepage
   (Gallery, About) è mostrato un placeholder elegante finché non arrivano
   gli scatti definitivi. Azione: salvare le foto in `public/images/` e
   valorizzare `heroImageSrc` in `content.ts` (vedi istruzioni in `CLAUDE.md`
   § Placeholder immagini).
2. **Recapiti reali** — telefono, WhatsApp, Telegram, email, indirizzo sono
   placeholder (`+39 000 000 0000`, `info@cuoredellacitta.it`, "Piazza
   Centrale"). Da sostituire in `siteConfig` (`content.ts`).
3. **Rete partner reale** — l'elenco in `partners` (`content.ts`) è
   esemplificativo. Da sostituire con le convenzioni effettive.
4. **Mappa** — al momento un placeholder testuale; da collegare a Google
   Maps/OpenStreetMap con l'indirizzo definitivo.
5. **Multilingua IT/EN** — offerto nel preventivo ma non ancora implementato
   (richiede decisione su approccio: `next-intl` vs routing manuale).
6. **SEO on-page** — metadata di base già presenti in `layout.tsx`; mancano
   ancora Open Graph image, sitemap, robots.txt e favicon dedicato (quello
   di default è stato rimosso in fase di pulizia scaffold).
7. **Contenuti FAQ** — le risposte in `faqs` (`content.ts`) sono ipotesi
   ragionevoli per una casa vacanze, da validare con il cliente (orari reali,
   politica di cancellazione effettiva, animali sì/no).

## Come continuare a lavorarci

```bash
npm run dev
```

Apre il sito su `http://localhost:3000`. Il file `.claude/launch.json`
configura già l'anteprima per lo strumento Browser di Claude Code.

Prima di ogni commit: `npx tsc --noEmit` e `npm run lint`.

## Prossimo passo consigliato

Raccogliere dal cliente i contenuti reali elencati sopra (punto 2 e 3 sono i
più veloci da chiudere) e le foto definitive, così da passare dalla Fase 1
(UI/UX) alla Fase 2 (sviluppo front-end con contenuti reali) del workflow
concordato nel preventivo.
