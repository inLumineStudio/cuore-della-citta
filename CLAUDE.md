# Dimora "Cuore della Città" — Sito Vetrina

Sito vetrina per una casa vacanze nel centro storico. Realizzato da inLumine
Studio su codice custom (nessun template), come da preventivo del 22 luglio
2026. Vedi `HANDOFF.md` per lo stato attuale e i prossimi passi.

> Questo progetto usa **Next.js 16**, che ha breaking change rilevanti rispetto
> alle versioni precedenti (Turbopack di default, API async, ecc). Prima di
> introdurre pattern non presenti in questo repo, controlla
> `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md` e
> `AGENTS.md`.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS v4** (config CSS-first via `@theme`, niente `tailwind.config.js`)
- **lucide-react** per le icone
- CSS plain solo dove Tailwind non basta (nessun caso ad oggi in `globals.css`
  a parte i design token)

## Architettura: multi-pagina con routing

Il sito **non** è una single-page con anchor (`#sezione`): ogni blocco di
contenuto vive nella propria route, e la nav in `content.ts` punta a percorsi
reali. Questo perché lavoreremo con routing man mano che il progetto cresce
(nuove pagine, contenuti dedicati, eventuale multilingua via segmenti).

| Route | Contenuto |
|---|---|
| `/` | Solo `Hero` — landing a piena pagina, nessun'altra sezione |
| `/la-dimora` | `About` + `Gallery` |
| `/servizi-comfort` | `Amenities` |
| `/posizione` | `Location` |
| `/partner` | `Partners` |
| `/faq` | `Faq` + `ContactCta` |

`StickyHeader` e `Footer` sono montati una sola volta in `app/layout.tsx` e
compaiono su ogni route (chrome globale). `StickyHeader` ha un comportamento
diverso in base alla pagina (`usePathname`):

- su `/` resta nascosto finché non si scrolla oltre l'altezza della Hero
  (che ha il proprio overlay full-bleed indipendente, vedi sotto), poi
  compare come barra solida fissa;
- su tutte le altre route è sempre visibile da subito, perché non c'è una
  Hero che lo sostituisca in cima alla pagina.

## Struttura del progetto

```
src/
  app/
    layout.tsx        # font, metadata, StickyHeader + Footer globali
    page.tsx           # Homepage: solo <Hero />
    la-dimora/page.tsx
    servizi-comfort/page.tsx
    posizione/page.tsx
    partner/page.tsx
    faq/page.tsx
    globals.css        # design token (colori, font) via @theme
  components/
    layout/             # StickyHeader, Footer — montati in layout.tsx
    sections/           # Un componente per blocco di contenuto, riusato dalla route dedicata
    ui/                 # Primitive riutilizzabili (Button, Container, SectionHeading, ImagePlaceholder)
  lib/
    content.ts          # TUTTI i testi/dati del sito (copy, nav, servizi, partner, faq...)
    contact.ts           # Helper per i link rapidi (tel:, wa.me, t.me)
public/
  images/                # Asset immagine statici
```

**Regola guida**: i componenti in `sections/` non contengono testo hardcoded
— leggono da `src/lib/content.ts`. Questo permette di aggiornare i contenuti
reali (quando arriveranno dal cliente) modificando un solo file, senza
toccare il JSX. Le sezioni sono componenti "puri" senza `id` di ancoraggio:
la navigazione avviene per route, non per scroll-to-anchor.

## Design system

Direzione scelta insieme al cliente: stessa estetica del riferimento
"BEPD:HOTEL" fornito — editoriale, calda, hero fullscreen con overlay scuro,
header trasparente su barra promo con gradiente ambra/terracotta.

### Font

- **Font editoriale Hero** (`font-hero`): [Bodoni Moda](https://fonts.google.com/specimen/Bodoni+Moda) —
  didone ad alto contrasto, usato per gli elementi **grandi** dell'overlay
  Hero: il wordmark "Cuore della Città", il claim in basso e la nav
  dell'overlay (mood drammatico/editoriale come il riferimento). Va usato
  **solo a dimensioni ampie**: a misure piccole le aste sottili si spezzano e
  la leggibilità cala — per questo la nav dello `StickyHeader` (compatta, su
  fondo crema) resta in Inter.
- **Tutto il resto** (`font-body` / `font-display` / `font-brand`):
  [Inter](https://fonts.google.com/specimen/Inter) — sans pulito e leggibile,
  usato per copy, nav dello StickyHeader, logo header/footer e ogni altra
  sezione.

Caricati via `next/font/google` in `src/app/layout.tsx`, esposti come CSS var
(`--font-bodoni`, `--font-inter`) e mappati sui token semantici in
`globals.css`: `--font-hero` → Bodoni, gli altri tre → Inter.

### Colore

Palette calda/terracotta (coerente con la foto reale della struttura, volta
in mattoni), definita come CSS custom properties in `src/app/globals.css` e
riesposta a Tailwind via `@theme inline`:

| Token | Uso |
|---|---|
| `cream` / `cream-soft` | Sfondi chiari |
| `ink` / `ink-soft` | Testo scuro, sfondo header mobile, sezione Partner |
| `stone` / `stone-light` | Testo secondario, bordi |
| `terracotta` / `terracotta-dark` | Colore primario (CTA, accenti) |
| `amber` / `amber-soft` | Barra promo, gradienti |
| `hero-ivory` / `hero-sand` | Testi sopra la foto Hero (avorio caldo / sabbia) |

Usa sempre questi token (`bg-terracotta`, `text-ink-soft`, ecc.) invece di
colori Tailwind di default, per mantenere coerenza visiva.

La scrollbar globale (`globals.css`) è in stile "classico": track scuro
(`#57534E`), thumb bianco arrotondato con bordo che fa da padding, e pulsanti
freccia su/giù (SVG inline via `::-webkit-scrollbar-button`). Su Firefox si
usa `scrollbar-color: #ffffff #57534e` (i pulsanti freccia non sono
supportati).

### Hero (`components/sections/Hero.tsx`)

- Occupa **sempre l'intero viewport**: la `<section>` usa `min-h-dvh`
  (dynamic viewport height, robusto anche su mobile con barra URL variabile).
- Il titolo "Cuore della Città" è **full-bleed**: riempie l'intera larghezza
  bordo-a-bordo a qualsiasi risoluzione. Questo NON si ottiene con unità `vw`
  (dipenderebbero dal numero di caratteri): è renderizzato come **SVG** con
  `textLength="1000"` + `lengthAdjust="spacingAndGlyphs"`, che forza il testo
  a occupare esattamente la larghezza del contenitore. C'è uno
  `<span class="sr-only">` con il testo reale per accessibilità e SEO, mentre
  l'SVG è `aria-hidden`.
- Overlay foto: gradiente scuro dal basso + filtro `brightness-90 saturate-95`
  sull'immagine per ammorbidire le luci calde e garantire leggibilità.

### Placeholder immagini

Non tutte le foto reali sono ancora disponibili. `src/lib/content.ts` espone
`heroImageSrc: string | undefined` — quando è `undefined`, i componenti
(`Hero`, `About`, `Gallery`) mostrano `ImagePlaceholder` invece di un
`next/image` rotto. Quando arrivano le foto definitive:

1. Copiarle in `public/images/`
2. Valorizzare `heroImageSrc` (e eventualmente altri campi da aggiungere) in
   `content.ts`
3. Verificare che `next.config.ts` non richieda configurazione aggiuntiva per
   asset locali (non serve, a meno di query string nell'URL — vedi note v16)

## Contatti rapidi

`src/lib/contact.ts` genera i link `tel:`, `https://wa.me/...` e
`https://t.me/...` a partire dai valori in `siteConfig` (`content.ts`). I
numeri attuali sono placeholder (`+39 000 000 0000`) — vedi `HANDOFF.md`.

## Convenzioni di sviluppo

- Componenti server di default; `"use client"` solo dove serve interattività
  (`StickyHeader` per il menu mobile e lo scroll-detection, `Hero` per il
  menu mobile del proprio overlay, `Gallery` per la lightbox, `Faq` per
  l'accordion).
- Niente commenti che spiegano cosa fa il codice — solo dove c'è un motivo
  non ovvio (es. i `TODO` in `content.ts` per i placeholder).
- Un file, una responsabilità: ogni blocco di contenuto è un componente
  dedicato in `components/sections/`, montato dalla propria route in `app/`.
- `npm run lint` usa ESLint flat config (Next.js 16 ha rimosso `next lint`).
