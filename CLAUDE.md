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
| `/` | `Hero` + `HorizontalScroller` (`HomeIntro`, `LocationTeaser`, `Faq`) — vedi sotto |
| `/la-dimora` | `About` + `Gallery` |
| `/servizi-comfort` | `Amenities` |
| `/posizione` | `Location` |
| `/partner` | `Partners` |

Le FAQ **non hanno più una route dedicata**: vivono come terzo pannello
della home e la voce corrispondente è stata tolta da `navLinks`. La cartella
`src/app/faq/` è stata eliminata. `ContactCta` (`components/sections/`) era
usato solo da quella pagina ed è oggi orfano: resta in repo come blocco
riutilizzabile, ma non è montato da nessuna route.

`StickyHeader` e `Footer` sono montati una sola volta in `app/layout.tsx` e
compaiono su ogni route (chrome globale). `StickyHeader` ha un comportamento
diverso in base alla pagina (`usePathname`):

- su `/` resta nascosto finché non si scrolla oltre l'altezza della Hero
  (che ha il proprio overlay full-bleed indipendente, vedi sotto), poi
  compare come barra solida fissa;
- su tutte le altre route è sempre visibile da subito, perché non c'è una
  Hero che lo sostituisca in cima alla pagina.

Lo `StickyHeader` include la CTA **"Prenota ora"** (link WhatsApp, terracotta
pieno) a destra della nav: essendo montata nel chrome globale, è
l'unico punto in cui la CTA è raggiungibile da **ogni pagina**. La gemella
nella barra promo della Hero resta, ma vive solo in home e scompare appena
si scrolla. La CTA è sempre attiva anche con `showFullNav = false`, perché
punta a un link esterno e non a una route del sito.

Entrambe le CTA "Prenota ora" sono **sempre piene** (`bg-terracotta` +
`text-cream`, hover `terracotta-dark`): la variante outline provata in
precedenza si perdeva sul crema dello header e sul gradiente della barra promo.

### Scroll orizzontale della home (solo desktop)

Da `lg:` in su la home, **dopo la Hero**, scorre in orizzontale: la rotellina
del mouse continua a muoversi in verticale, ma ciò che si vede è una fila di
pannelli a piena schermata che traslano lateralmente. È la stessa architettura
del riferimento di design fornito dal cliente (che la ottiene con GSAP
ScrollTrigger; qui è riprodotta in JS puro, senza dipendenze aggiuntive):

- `HorizontalScroller` (`components/ui/`) assegna via JS al proprio wrapper
  un'altezza pari a `viewport + corsa orizzontale`. Quello spazio verticale
  fittizio è ciò che lo scroll "consuma" mentre la track, tenuta a schermo da
  `position: sticky`, trasla di pari passo (mappatura 1:1).
- Ogni figlio passato al componente diventa un pannello `100vw × 100dvh`,
  quindi le sezioni usate come pannelli devono valorizzare `lg:h-full`.
  I pannelli oggi sono tre: `HomeIntro`, `LocationTeaser`, `Faq`. Aggiungerne
  uno allunga automaticamente la corsa (`travel` è calcolato da
  `track.scrollWidth`), non serve toccare `HorizontalScroller`.
- **Vincolo per chi aggiunge pannelli**: la track sta dentro un contenitore
  `lg:overflow-hidden`, quindi il contenuto che sfora i `100dvh` viene
  **tagliato**, non reso scrollabile. Un pannello va progettato per stare
  nell'altezza del viewport anche nel suo stato "più alto" (vedi la FAQ, che
  con la risposta più lunga aperta arriva a ~540px su 720 di viewport).
- La Hero **non** fa parte della track: resta una schermata verticale
  normale, e lo scroll orizzontale inizia subito dopo.
- Sotto `lg` l'effetto è completamente disattivato (altezza forzata e
  `transform` azzerati): i pannelli tornano a impilarsi in verticale.

## Struttura del progetto

```
src/
  app/
    fonts/             # Flaviotte + General Sans (font del cliente, next/font/local)
    layout.tsx        # font, metadata, StickyHeader + Footer globali
    page.tsx           # Homepage: <Hero /> + <HorizontalScroller />
    la-dimora/page.tsx
    servizi-comfort/page.tsx
    posizione/page.tsx
    partner/page.tsx
    faq/page.tsx
    globals.css        # design token (colori, font) via @theme
  components/
    layout/             # StickyHeader, Footer — montati in layout.tsx
    sections/           # Un componente per blocco di contenuto, riusato dalla route dedicata
    ui/                 # Primitive riutilizzabili (Button, Container, SectionHeading, ImagePlaceholder, HorizontalScroller, NavLink)
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

- **Titoli** (`font-display`): **Flaviotte**, font commerciale fornito dal
  cliente. Lo usano **tutti gli heading** del sito (h1/h2/h3), il wordmark
  "Cuore della Città" e il claim della Hero. Non è su Google Fonts: il
  `.woff2` (18 KB, dal kit "Web-PS") vive in `src/app/fonts/` e si carica con
  `next/font/local`.
  **Vincolo**: ha un solo peso (regular) e nessun corsivo, quindi con
  `font-display` non vanno usate utility di peso (`font-semibold`, `font-bold`)
  né `italic` — il browser le sintetizzerebbe sporcando le aste. Oggi nessun
  heading lo fa: i titoli si differenziano per corpo, non per peso.
- **Font editoriale della nav** (`font-hero`): [Newsreader](https://fonts.google.com/specimen/Newsreader) —
  serif editoriale con grazie morbide (preferito a un Didone ad alto
  contrasto come Bodoni Moda, giudicato troppo estremo per un brand di
  ospitalità). Da quando i titoli sono passati a Flaviotte gli resta la nav
  dell'overlay Hero, le voci del drawer mobile e il glifo decorativo di
  `ImagePlaceholder`. Va usato **solo a dimensioni ampie** — per questo la
  nav dello `StickyHeader` (compatta, su fondo crema) resta nel font body.
- **Tutto il resto** (`font-body` / `font-brand`): **General Sans**, anch'esso
  fornito dal cliente e caricato da `src/app/fonts/` — copy, barra promo, nav
  dello `StickyHeader`, logo header/footer, etichette. Ha sostituito Work Sans,
  che non è più caricato.
  Nel repo stanno **solo i quattro tagli in uso**: 400, 400 corsivo, 500
  (`font-medium`) e 600 (`font-semibold`). Se serve un peso nuovo va aggiunto
  il file corrispondente in `layout.tsx`, altrimenti il browser lo sintetizza.

Newsreader è caricato con `style: ["normal", "italic"]` (corsivo tipografico
reale, non sintetizzato dal browser); di General Sans il corsivo è il file
`GeneralSans-Italic.otf`. Il corsivo non è più usato per l'hover della nav —
vedi `NavLink` — ma serve ai testi in `italic` sparsi nelle sezioni (es. il
segnaposto "Risposta in arrivo." delle FAQ).

Newsreader arriva da `next/font/google`, Flaviotte e General Sans da
`next/font/local`; tutti e tre sono esposti come CSS var in
`src/app/layout.tsx` (`--font-newsreader`, `--font-flaviotte`,
`--font-general-sans`) e mappati sui token semantici in `globals.css`:
`--font-display` → Flaviotte, `--font-hero` → Newsreader, `--font-body` e
`--font-brand` → General Sans.

I file dei due font locali sono **OTF/WOFF2 non subsettati** (≈200 KB in
tutto): `next/font/local` li serve così come sono, senza convertirli. Prima
della messa online conviene passare ai `.woff2` — vedi `HANDOFF.md`.

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

### Link di navigazione (`components/ui/NavLink.tsx`)

Unico punto in cui vive il markup delle voci di nav: lo usano sia l'overlay
della Hero sia lo `StickyHeader` (prima il blocco era duplicato quattro volte,
per via del ramo `showFullNav`, che ora è dentro il componente).

L'hover è un **filetto che si espande**: a riposo una lineetta di `w-1/3`
centrata sotto la voce, all'hover `w-full` con virata al colore acceso. Le
misure sono in `em` (`bottom-[-0.28em]`, `h-px`) perché la stessa primitiva
serve la nav grande della Hero (`text-2xl`) e quella compatta dello header
(`text-sm`). Il colore del filetto è per-contesto via `lineClassName`:
terracotta scuro → terracotta sul crema dello header, sabbia → avorio sulla
foto della Hero, dove il terracotta scompariva. Ha sostituito il precedente
hover corsivo + slide orizzontale.

### Hero (`components/sections/Hero.tsx`)

- Occupa **sempre l'intero viewport**: la `<section>` usa `min-h-dvh`
  (dynamic viewport height, robusto anche su mobile con barra URL variabile).
- Il titolo "Cuore della Città" è il wordmark in alto a sinistra, in
  `font-display` (Flaviotte) su tre righe: la `max-w-[10ch]` sull'`<h1>` forza
  il ritorno a capo e la `leading-[0.9]` chiude l'interlinea. È un `<Link>` a
  `/`, quindi fa anche da logo. (Una prima bozza lo rendeva full-bleed
  bordo-a-bordo via SVG `textLength`; l'approccio è stato abbandonato con il
  passaggio all'impaginato attuale, dove il wordmark convive con la nav
  verticale sullo stesso asse.)
- Overlay foto: gradiente scuro dal basso + filtro `brightness-90 saturate-95`
  sull'immagine per ammorbidire le luci calde e garantire leggibilità.

### FAQ (`components/sections/Faq.tsx`)

Terzo e ultimo pannello dello scroll orizzontale. Layout a due colonne
(`lg:grid-cols-[5fr_7fr]`): a sinistra un blocco editoriale (occhiello, titolo,
testo, CTA WhatsApp in outline chiaro) sopra la foto della statua di Ovidio, con
`bg-ink` sotto come fallback se `faqImageSrc` è `undefined`; a destra
l'accordion su `bg-cream-soft`.

- Sulla foto ci sono due livelli di scurimento, entrambi tarati sulla
  leggibilità del testo avorio: `brightness-[0.75] saturate-95` sull'immagine e
  un gradiente `from-ink/90 via-ink/65 to-ink/40` sopra. Il contenuto sta in un
  wrapper `relative` perché immagine e gradiente sono in `absolute inset-0`.
- L'accordion è marcato con `<dl>` / `<dt>` / `<dd>`, con `aria-expanded` e
  `aria-controls` sul bottone e `hidden` sulla risposta: una sola aperta
  alla volta.
- Riferimento visivo scelto dal cliente: righe separate da hairline
  (`divide-stone-light`), icona tonda `CirclePlus`/`CircleMinus` a destra e
  filetto verticale terracotta a sinistra della voce aperta. Il filetto è un
  `border-l-2` sempre presente e `border-transparent` da chiuso, così l'apertura
  non sposta il testo.
- Le righe sono volutamente compatte (`py-3.5`, domanda a `text-base`)
  perché nove domande più una risposta aperta devono stare nei `100dvh` del
  pannello — vedi il vincolo nella sezione sullo scroll orizzontale.
- `faqs` in `content.ts` ha `answer` **opzionale**: finché la proprietaria non
  fornisce la risposta, l'accordion mostra "Risposta in arrivo." invece di un
  testo inventato. Stessa filosofia di `ImagePlaceholder` per le foto. Oggi
  otto risposte su nove sono quelle reali; resta senza risposta solo "Qual è
  la politica di cancellazione?".

### Placeholder immagini

Non tutte le foto reali sono ancora disponibili. `src/lib/content.ts` espone
i sorgenti come `string | undefined` — quando sono `undefined` i componenti
mostrano `ImagePlaceholder` invece di un `next/image` rotto:

| Campo | Usato da | Stato |
|---|---|---|
| `heroImageSrc` | `Hero`, `About`, `Gallery` | `/images/hero.jpg` (provvisoria) |
| `positionImageSrc` | `LocationTeaser` | `/images/sulmona-piazza-garibaldi-tramonto.webp` (scatto al tramonto, dal cliente) |
| `faqImageSrc` | `Faq` | `/images/statua-di-ovidio.jpg` (fondo della colonna editoriale) |
| — | `HomeIntro` | placeholder: manca la foto de "La Nostra Storia" |

Quando arrivano le foto definitive:

1. Copiarle in `public/images/`
2. Valorizzare il campo corrispondente (o aggiungerne uno nuovo) in
   `content.ts`
3. Verificare che `next.config.ts` non richieda configurazione aggiuntiva per
   asset locali (non serve, a meno di query string nell'URL — vedi note v16)

**Formato**: `next.config.ts` ha `images.unoptimized: true`, quindi `next/image`
non genera né varianti né `srcset` — il browser scarica esattamente il file
indicato. La codifica è quindi una scelta nostra: convertire in **WebP** (q92 è
indistinguibile dall'originale a queste dimensioni e pesa circa metà del JPEG
equivalente) prima di copiare in `public/images/`. `sharp` è già tra le
dipendenze del progetto e basta per la conversione. Le altre foto in repo sono
ancora JPEG: vanno convertite quando si sostituiranno con gli scatti definitivi.

### Crediti fotografici

Le foto non scattate dal cliente vanno attribuite. `photoCredits` in
`content.ts` è `string | undefined` e il `Footer` rende la riga (sopra il
copyright, quindi visibile su ogni pagina) **solo se è valorizzata**.

Oggi è `undefined`: serviva per lo scatto di Piazza Garibaldi ripreso da
Wikimedia Commons (Lorenzo Testa), sostituito dalla foto al tramonto fornita dal
cliente — con quella foto fuori dal sito, tenere il credito in footer sarebbe
un'attribuzione falsa. Il file `public/images/sulmona-piazza-garibaldi.jpg`
resta in repo ma non è più referenziato.

Se una foto torna a richiedere attribuzione basta valorizzare la stringa; se le
foto da attribuire diventano più d'una, conviene passare a un array.

## Contatti rapidi

`src/lib/contact.ts` genera i link `tel:`, `https://wa.me/...` e
`https://t.me/...` a partire dai valori in `siteConfig` (`content.ts`).
Telefono/WhatsApp e indirizzo sono quelli reali; email, Telegram e Instagram
sono ancora placeholder — vedi `HANDOFF.md`.

Il messaggio precompilato dei link WhatsApp sta in **un solo posto**,
`whatsappMessage` in `content.ts`, ed è il valore di default di
`whatsappHref()`: i sei punti del sito che aprono WhatsApp la chiamano senza
argomenti. Passare una stringa resta possibile per un messaggio contestuale, ma
oggi nessuno lo fa (prima il testo era duplicato in tutti e sei i componenti).

Il **nome visualizzato** nella schermata di WhatsApp non dipende dal sito: è il
nome del profilo WhatsApp Business della proprietaria. Nessun parametro di
`wa.me` può cambiarlo.

## Convenzioni di sviluppo

- Componenti server di default; `"use client"` solo dove serve interattività
  (`StickyHeader` per il menu mobile e lo scroll-detection, `Hero` per il
  menu mobile del proprio overlay, `Gallery` per la lightbox, `Faq` per
  l'accordion, `HorizontalScroller` per lo scroll orizzontale della home).
  Dei pannelli passati a `HorizontalScroller`, `HomeIntro` e `LocationTeaser`
  restano componenti server; `Faq` è client perché l'accordion ha stato.
- Niente `<a href="...">` verso route interne: ESLint
  (`@next/next/no-html-link-for-pages`) lo blocca, si usa `<Link>` di
  `next/link`. Gli `<a>` rimasti puntano tutti a risorse esterne
  (`wa.me`, `tel:`, `mailto:`, Instagram) o sono link disattivati da
  `showFullNav`.
- Niente `setState` dentro `useEffect`: la regola
  `react-hooks/set-state-in-effect` lo segnala come errore. Per il classico
  flag "sono sul client" (serve a `MobileMenu` per il portale) si usa
  `useSyncExternalStore` con snapshot server `false` e client `true`.
- Niente commenti che spiegano cosa fa il codice — solo dove c'è un motivo
  non ovvio (es. i `TODO` in `content.ts` per i placeholder).
- Un file, una responsabilità: ogni blocco di contenuto è un componente
  dedicato in `components/sections/`, montato dalla propria route in `app/`.
- `npm run lint` usa ESLint flat config (Next.js 16 ha rimosso `next lint`).
