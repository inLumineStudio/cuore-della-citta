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
`src/app/faq/` è stata eliminata, e con essa `ContactCta` — il blocco che
chiudeva quella pagina — insieme alla primitiva `Button`, che usava solo lui, e
all'helper `telegramHref()`. Se servisse di nuovo una CTA di contatto a piena
larghezza, il codice è in `git log` (fino al commit `40a9763`).

`StickyHeader`, `Footer`, `ScrollToTop` e `CursorSquare` sono montati una sola
volta in `app/layout.tsx` e valgono per ogni route (chrome globale). `StickyHeader` ha un comportamento
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
    fonts/             # Flaviotte, General Sans, Megdira (font del cliente, next/font/local)
    layout.tsx        # font, metadata, chrome globale (StickyHeader, Footer, ScrollToTop, CursorSquare)
    page.tsx           # Homepage: <Hero /> + <HorizontalScroller />
    la-dimora/page.tsx
    servizi-comfort/page.tsx
    posizione/page.tsx
    partner/page.tsx
    icon.svg / icon.png / apple-icon.png      # favicon (convenzioni file di Next)
    opengraph-image.jpg / .alt.txt            # preview per social
    sitemap.ts / robots.ts                    # generati da Next su /sitemap.xml e /robots.txt
    globals.css        # design token (colori, font) via @theme
  components/
    layout/             # StickyHeader, Footer — montati in layout.tsx
    sections/           # Un componente per blocco di contenuto, riusato dalla route dedicata
    ui/                 # Primitive riutilizzabili (Container, SectionHeading, ImagePlaceholder, HorizontalScroller, NavLink, ScrollToTop, CursorSquare, icons)
  lib/
    content.ts          # TUTTI i testi/dati del sito (copy, nav, servizi, partner, faq...)
    contact.ts           # Helper per i link rapidi (tel:, wa.me)
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

- **Wordmark e claim della Hero** (`font-wordmark`): **Megdira**, in prova su
  questi due soli elementi — "Cuore della Città" (in entrambi gli impaginati
  della Hero) e "Arrivare. Vivere. Restare.". Del kit sta in repo solo il
  `.woff2` regular (17 KB): il corsivo non serve a nessuno dei due. Verificato
  che copra `à`/`À` e la punteggiatura, quindi "Città" e i punti del claim non
  cadono sul fallback.
- **Titoli** (`font-display`): **Flaviotte**, font commerciale fornito dal
  cliente. Lo usano **tutti gli altri heading** del sito (h2/h3). Non è su
  Google Fonts: il `.woff2` (18 KB, dal kit "Web-PS") vive in `src/app/fonts/`
  e si carica con `next/font/local`.
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

Newsreader arriva da `next/font/google`, Flaviotte, General Sans e Megdira da
`next/font/local`; tutti sono esposti come CSS var in `src/app/layout.tsx`
(`--font-newsreader`, `--font-flaviotte`, `--font-general-sans`,
`--font-megdira`) e mappati sui token semantici in `globals.css`:
`--font-wordmark` → Megdira, `--font-display` → Flaviotte, `--font-hero` →
Newsreader, `--font-body` e `--font-brand` → General Sans.

I file dei font locali sono **OTF/WOFF2 non subsettati** (≈215 KB in tutto):
`next/font/local` li serve così come sono, senza convertirli. Flaviotte e
Megdira sono già `.woff2`; General Sans no — vedi `HANDOFF.md`.

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

### Cursore e ritorno in cima

`CursorSquare` (`components/ui/`) disegna un **quadratino terracotta
semitrasparente** (14px, `bg-terracotta/60`) che segue il puntatore. Non è un
`cursor: url(...)`: quello **sostituirebbe** la freccia di sistema, che invece
deve restare visibile insieme al quadratino. Conseguenze di questa scelta:

- la posizione viene scritta con `style.transform` direttamente sul nodo DOM,
  senza stato React — un `setState` per `pointermove` ri-renderizzerebbe
  l'albero decine di volte al secondo;
- il componente rende sempre il `div` (anche dal server) con `opacity-0`, e
  l'opacità passa a 1 al primo movimento. Con un gate "sono sul client" il
  primo render restituiva `null`, quindi l'effect trovava il ref vuoto e non
  agganciava mai il listener;
- gira solo dove c'è un puntatore vero (`(hover: hover) and (pointer: fine)`):
  su touch il quadratino resterebbe fermo dove capita l'ultimo tap.

`ScrollToTop` (`components/ui/`) è il pulsante terracotta in basso a destra:
compare oltre un viewport di scroll e riporta in cima con
`behavior: "instant"`, che sovrascrive lo `scroll-behavior: smooth` globale —
con lo scroll orizzontale la home è alta tre viewport e l'animazione morbida
durerebbe secondi.

La scrollbar globale (`globals.css`) è in stile "classico": track scuro
(`#57534E`), thumb bianco arrotondato con bordo che fa da padding, e pulsanti
freccia su/giù (SVG inline via `::-webkit-scrollbar-button`). Su Firefox si
usa `scrollbar-color: #ffffff #57534e` (i pulsanti freccia non sono
supportati).

### Link di navigazione (`components/ui/NavLink.tsx`)

Unico punto in cui vive il markup delle voci di nav: lo usano sia l'overlay
della Hero sia lo `StickyHeader` (prima il blocco era duplicato quattro volte,
per via del ramo `showFullNav`, che ora è dentro il componente).

L'hover è un **filetto che si espande**: il `<span>` è sempre a `w-full` e a
riposo viene compresso a `scale-x-[0.34]`, all'hover torna a `scale-x-100` con
virata al colore acceso. L'offset verticale è in `em` (`bottom-[-0.28em]`,
`h-px`) perché la stessa primitiva serve la nav grande della Hero (`text-2xl`) e
quella compatta dello header (`text-sm`). Ha sostituito il precedente hover
corsivo + slide orizzontale.

Due parametri per contesto:

- `align` (`"start"` default, `"end"`) decide il `transform-origin`, cioè da
  quale lato il filetto si espande. **Va fatto combaciare con l'allineamento
  della lista**: la nav della Hero è `items-end`, quindi `align="end"` e il
  filetto cresce da destra verso il testo; lo `StickyHeader` è una riga normale
  e resta su `start`. Con l'ancoraggio al centro (la prima versione) la lineetta
  a riposo sembrava fuori asse rispetto alla bandiera del testo.
- `lineClassName` decide il colore: terracotta scuro → terracotta sul crema
  dello header, sabbia → avorio sulla foto della Hero, dove il terracotta
  scompariva.

**Attenzione**: in Tailwind v4 `scale-x-*` scrive la proprietà `scale`, non
`transform`. La transizione deve quindi elencare `scale`
(`transition-[scale,background-color]`): con `transition-[transform,...]`
l'animazione non parte e il filetto scatta.

### Hero (`components/sections/Hero.tsx`)

La Hero ha **due impaginati diversi**, non uno responsive: sotto `md` un lockup
centrato, da `md` in su l'impaginato editoriale asimmetrico. I due non
convivono mai, si escludono con `hidden` / `md:hidden`.

- Occupa **sempre l'intero viewport**: la `<section>` usa `min-h-dvh`
  (dynamic viewport height, robusto anche su mobile con barra URL variabile).
- **Da `md` in su**: il titolo "Cuore della Città" è il wordmark in alto a
  sinistra, in `font-display` (Flaviotte) su tre righe — la `max-w-[10ch]`
  sull'`<h1>` forza il ritorno a capo e la `leading-[0.9]` chiude l'interlinea.
  È un `<Link>` a `/`, quindi fa anche da logo. In basso a destra sottotitolo e
  claim. (Una prima bozza rendeva il wordmark full-bleed bordo-a-bordo via SVG
  `textLength`; l'approccio è stato abbandonato con il passaggio
  all'impaginato attuale, dove il wordmark convive con la nav verticale sullo
  stesso asse.)
- **Sotto `md`** (riferimento scelto dal cliente: Six Senses Rome) al centro
  dello schermo stanno wordmark e `heroLocation` ("Sulmona, Abruzzo"), la CTA di
  prenotazione sta in alto a sinistra — nel posto liberato dal wordmark, a
  bilanciare l'hamburger a destra — e in fondo due chevron sovrapposti fanno da
  indicatore di scroll, senza testo (`aria-hidden`: sono decorativi, e
  `motion-reduce:animate-none` ferma il rimbalzo per chi riduce le animazioni).
  Sottotitolo e claim sono nascosti: su 375px sarebbero un muro di testo sulla
  foto, e il racconto lo riprende `HomeIntro` subito dopo. `heroLocation` esiste
  perché la Hero altrimenti non dice **dove** siamo a chi arriva da un link o
  dai social.
- Ci sono due `<h1>` nel markup, uno per impaginato, entrambi con il nome del
  sito. Non si sovrappongono mai: `display: none` toglie l'altro anche
  dall'albero di accessibilità.
- La CTA della barra promo è `hidden md:inline-block`: sotto `md` la
  prenotazione è già in alto a sinistra, a pochi pixel da lì, e due CTA
  identiche si indebolirebbero. Su mobile resta comunque raggiungibile anche
  dallo `StickyHeader` appena si scrolla.
- Sotto `md` c'è un velo piatto in più (`bg-ink/35`) oltre al gradiente: il
  lockup cade a metà foto, dove il copriletto chiaro mangerebbe il testo avorio.
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
- Le righe sono volutamente compatte (`py-3`, domanda a `text-base`, colonna a
  `lg:py-10`) perché nove domande più una risposta aperta devono stare nei
  `100dvh` del pannello — vedi il vincolo nella sezione sullo scroll
  orizzontale. Il caso peggiore è la risposta sulla cancellazione (cinque righe,
  ~107px): l'elenco arriva a ~550px e su 720 di viewport resta un margine di
  ~87px. **Se si allunga una risposta o si aggiunge una domanda va rimisurato**:
  con le spaziature precedenti (`py-3.5`, colonna a `py-12`) quella risposta
  faceva già sbordare l'ultima riga sotto i 700px di viewport.
- `faqs` in `content.ts` ha `answer` **opzionale**: se una risposta manca
  l'accordion mostra "Risposta in arrivo." invece di un testo inventato, stessa
  filosofia di `ImagePlaceholder` per le foto. Oggi tutte e nove le risposte
  sono quelle reali fornite dalla proprietaria, quindi il segnaposto non è
  visibile da nessuna parte.

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
un'attribuzione falsa. Il file Wikimedia è stato rimosso dal repo insieme agli
altri asset non referenziati.

Se una foto torna a richiedere attribuzione basta valorizzare la stringa; se le
foto da attribuire diventano più d'una, conviene passare a un array.

## SEO e metadati

Tutto passa dalle **convenzioni file dell'App Router**, non da `<head>` scritti
a mano: Next genera i `<link>` e i `<meta>` dai file in `src/app/`.

| File | Cosa produce |
|---|---|
| `icon.svg` + `icon.png` (32px) | favicon; l'SVG copre i browser moderni, il PNG quelli che non lo supportano |
| `apple-icon.png` (180px) | icona per la schermata home iOS |
| `opengraph-image.jpg` (1200×630) + `.alt.txt` | preview per social, con `og:image:*` e dimensioni compilate da Next |
| `sitemap.ts` | `/sitemap.xml` |
| `robots.ts` | `/robots.txt`, che punta alla sitemap |

`metadata` in `layout.tsx` definisce `metadataBase` (obbligatorio: senza, gli
URL Open Graph resterebbero relativi e i social non li risolvono), `title` con
`template` per le sottopagine, `alternates.canonical`, il blocco `openGraph` e
`twitter: { card: "summary_large_image" }` — la card di X pesca da `og:image`,
quindi non serve un `twitter-image` separato.

Il dominio vive in **`siteUrl`** (`content.ts`) ed è l'unico punto da cambiare:
lo leggono `metadataBase`, la sitemap e robots. Oggi è un **placeholder**
(`https://www.cuoredellacitta.it`), da confermare col cliente.

La **favicon** è un marchio disegnato a mano (`icon.svg`): fondo terracotta,
casa in tratto avorio e la sagoma di una statua dentro l'arcata — casa +
statua, i due segni chiesti dal cliente per evocare Sulmona. È stata verificata
rasterizzando a 32px e 16px: a 16px la statua diventa una macchia e regge solo
la casa, che è il segno portante. Se si ridisegna, va rifatta quella verifica —
un marchio che funziona a 128px non dice nulla su come si comporta in una tab.

La sitemap **si adatta a `showFullNav`**: finché è `false` le altre route
reindirizzano alla home, quindi elencarle segnalerebbe a Google pagine che
rimandano altrove. Con `showFullNav = true` entrano automaticamente.

## Contatti rapidi

`src/lib/contact.ts` genera i link `tel:` e `https://wa.me/...` a partire dai
valori in `siteConfig` (`content.ts`). Telefono/WhatsApp e indirizzo sono quelli
reali; email e Instagram sono ancora placeholder — vedi `HANDOFF.md`. Il ramo
Telegram è stato rimosso con `ContactCta`, che era l'unico a usarlo.

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
