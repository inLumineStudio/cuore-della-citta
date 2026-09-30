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
| `/la-dimora` | `About` (a sua volta `Hero` + racconto editoriale + CTA) |
| `/galleria` | `Hero` + `Gallery` |
| `/servizi-comfort` | `Hero` + `Amenities` |
| `/posizione` | `Hero` + `Location` |
| `/partner` | `Hero` + `Partners` |

`/la-dimora` e `/galleria` erano un'unica pagina (`About` + `Gallery` insieme)
finché la nav non ha guadagnato una voce dedicata alla galleria: a quel punto
tenerle sullo stesso URL avrebbe significato due voci di menu con la stessa
destinazione, quindi sono state separate. `Gallery` non aveva dipendenze da
`About`, la separazione è stata un taglio netto.

**Nessuna sezione resta più vuota di proposito**: `Gallery` era rimasta
smontata più a lungo delle altre tre (`Amenities`, `Location`, `Partners`)
perché i suoi contenuti erano ancora quelli esemplificativi della prima
bozza (`galleryImages`, quattro voci che puntavano tutte alla stessa foto) e
il cliente non doveva vederli. Il 31 luglio 2026 ha ricevuto le prime due
foto reali (di quattro previste) ed è stata rimontata — vedi § "Galleria"
più sotto.

La Hero di ogni sezione si configura da **`pageHeroes`** (`content.ts`): un
record con `claim` (la riga sotto il wordmark) e, opzionalmente, `imageSrc` +
`imageAlt`. Le pagine la passano con lo spread — `<Hero {...pageHeroes.galleria}
subtitle="" showClaimOnMobile />` — quindi aggiungere una sezione significa
aggiungere una voce lì, non toccare `Hero`. Chi omette `imageSrc` **non** ottiene
un segnaposto ma i default della Hero, cioè la foto della camera: è una foto
vera, solo non dedicata alla sezione.

Le FAQ **non hanno più una route dedicata**: vivono come terzo pannello
della home e la voce corrispondente è stata tolta da `navLinks`. La cartella
`src/app/faq/` è stata eliminata, e con essa `ContactCta` — il blocco che
chiudeva quella pagina — insieme alla primitiva `Button`, che usava solo lui, e
all'helper `telegramHref()`. Se servisse di nuovo una CTA di contatto a piena
larghezza, il codice è in `git log` (fino al commit `40a9763`).

`StickyHeader`, `Footer` e `ScrollToTop` sono montati una sola
volta in `app/layout.tsx` e valgono per ogni route (chrome globale). `StickyHeader` ha un comportamento
diverso in base alla pagina (`usePathname`):

- sulle route che montano una propria `<Hero />` (oggi tutte, elencate in
  `routesWithHero`) resta nascosto finché non si scrolla oltre l'altezza
  della Hero, poi compare come barra solida fissa — ed è **l'unico posto
  dove le voci di nav sono visibili senza aprire il drawer**, perché la
  Hero non le espone;
- su tutte le altre route è sempre visibile da subito, perché non c'è una
  Hero che lo sostituisca in cima alla pagina.

L'effect che ascolta lo scroll ha `pathname` in dipendenza **anche se non lo
legge nel corpo**: serve a forzare il ricalcolo quando si naviga via `<Link>`
tra due route che montano entrambe una Hero (`hasHero` non cambia, quindi
senza `pathname` l'effect non rieseguiva `handleScroll()` e l'header restava
visibile in cima alla pagina appena aperta, invece di nascondersi di nuovo).

**Bug corretto (segnalato dal cliente con un video, 27 luglio 2026)**: su
mobile l'header lampeggiava — appariva e spariva per un istante — durante
uno scroll continuo nella stessa direzione. Causa: la soglia era
`window.innerHeight * 0.85`, ricalcolata a **ogni evento scroll**; sui
browser mobile `window.innerHeight` cambia mentre la barra degli indirizzi
si espande/collassa durante lo scroll stesso, quindi la soglia oscillava in
tempo reale insieme alla UI del browser. Individuato analizzando un video
dell'utente frame per frame (estratti con `ffmpeg`, confrontati con `sharp`
per isolare i frame con variazione anomala nella sola fascia superiore dello
schermo). Fix: la soglia si misura **una sola volta** all'avvio dell'effect e
si aggiorna solo su `resize`, con un debounce di 200ms — così un resize
transitorio dovuto all'animazione della toolbar (che altrimenti
ripresenterebbe lo stesso problema) viene ignorato finché il layout non si
stabilizza.

**Bug corretto (segnalato dal cliente con uno screenshot da iPhone 17 Pro, 30
luglio 2026)**: sotto `md` il wordmark "Cuore della Città" andava a capo su
due righe nella riga dell'header. Causa: l'aggiunta del `LanguageSwitcher`
accanto all'hamburger (vedi § Multilingua) ha stretto lo spazio disponibile
per il logo, che non aveva `whitespace-nowrap` — il browser lo spezzava per
non sforare invece di andare in overflow. Fix su più fronti, tutti confinati
a `md:hidden`/sotto `sm:` (il layout da `sm:` in su è identico a prima):
`whitespace-nowrap` sul logo con un corpo più piccolo (`text-base` invece di
`text-lg`, tracking ridotto a `0.08em`), gap e padding orizzontale del
container ridotti (`gap-1 px-4` invece di `gap-4 px-6`), CTA "Prenota ora"
con meno padding orizzontale sotto `sm:`. Verificato senza overflow né
a-capo da 360px a 430px (Android compatti, tutta la gamma iPhone attuale,
IT ed EN) misurando `scrollWidth` vs `clientWidth` della riga header.

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

## Multilingua IT/EN

Traduzione inglese prevista dal preventivo, implementata il 30 luglio 2026.
**Nessuna libreria i18n** (niente `next-intl`): il cliente ha lasciato la
scelta a inLumine Studio, e il pattern scelto — route groups per più root
layout — è **documentato ufficialmente da Next.js stesso** per questo
scenario (locale di default senza prefisso + locale secondaria con
prefisso), verificato su `node_modules/next/dist/docs/` prima di deciderlo.
L'alternativa (un solo root layout, locale letta da `headers()`/`proxy.ts`)
avrebbe forzato l'intero sito a rendering dinamico: Next 16 ha appena
rimosso `unstable_rootParams`, l'unica API pensata per evitarlo, senza
sostituto. Con i route groups la locale è nota staticamente per ogni file, e
il sito resta **interamente statico** come prima. Coerente con la filosofia
già in uso nel repo (`HorizontalScroller`, `Reveal`, `AbruzzoMap`): niente
dipendenze nuove quando il problema si risolve con le API native.

**Trade-off accettato**: cambiare lingua è un **full page reload**, non una
transizione SPA — conseguenza diretta di avere due root layout distinti
(`(it)/layout.tsx` ed `en/layout.tsx`). Per un click esplicito "cambia
lingua" è normale, non un bug.

### Struttura URL

- **Italiano**: nessun cambio rispetto a prima, `showFullNav` a parte — `/`,
  `/la-dimora`, `/galleria`, `/servizi-comfort`, `/posizione`, `/partner`.
  Vive nel route group `src/app/(it)/`: le parentesi lo rendono invisibile
  nell'URL.
- **Inglese**: stessi slug, prefisso `/en` — `/en`, `/en/la-dimora`,
  `/en/galleria`, `/en/servizi-comfort`, `/en/posizione`, `/en/partner`. Vive
  in `src/app/en/`, un segmento di route reale (non un route group), quindi
  compare nell'URL. Nessuna traduzione degli slug: protegge il lavoro SEO già
  fatto sull'albero italiano e tiene la mappatura fra le due lingue banale.

### Contenuto: split di `content.ts`

- **`src/lib/content.shared.ts`** — tutto ciò che non si traduce e non deve
  rischiare di disallinearsi fra le lingue: `siteConfigShared` (nome,
  telefono, email, indirizzo), `addressParts`, `propertyCoordinates`,
  `propertyFacts`, `siteUrl`, `showFullNav`, `navRoutes` (id + href, senza
  etichetta), i percorsi immagine (`heroImageSrc`, ecc.), le chiavi icona,
  `partnerTierIds` (id delle fasce di sconto, senza etichetta — stesso
  criterio di `navRoutes`). `partners` invece **non** è più qui: dal 31
  luglio 2026, con il primo partner reale, si è spostato per lingua (vedi
  sotto) perché categoria e descrizione sono prosa da tradurre — il nome
  proprio dell'attività resta comunque identico in entrambi i file, come gli
  altri nomi propri.
- **`src/lib/content.it.ts`** / **`src/lib/content.en.ts`** — stessa forma
  esportata, solo prosa tradotta: `heroClaim`, `aboutPage`, `amenitiesPage`,
  `faqs`, `locationPage`, `homeIntro`, `navLabels`, `partners`,
  `partnerTierLabels`, e un namespace **`ui`**
  che raccoglie le ~25 stringhe che prima del 30 luglio 2026 erano hardcoded
  nel JSX dei componenti (aria-label, segnaposto come "Risposta in arrivo.",
  copy delle sezioni ancora smontate) — un solo posto dove chi traduce deve
  guardare, non due meccanismi diversi. `content.en.ts` apre con un commento
  che elenca i nomi propri **mai tradotti**: Sulmona, Cuore della Città,
  Valle Peligna, Acquedotto Svevo, Majella, Gran Sasso, i nomi dei monumenti,
  la citazione latina "Sulmo mihi patria est" e la sua fonte (Tristia),
  l'indirizzo completo. "Ovidio" diventa "Ovid" (il nome inglese standard del
  poeta, non una traduzione di toponimo); "Dimora" resta in italiano come
  parola-firma della struttura in tutto il copy inglese (stesso criterio con
  cui molte strutture italiane tengono una parola italiana per carattere
  anche nel copy in lingua).
- **`src/lib/content.ts`** esporta `getContent(locale)`, che unisce
  `content.shared.ts` con il modulo della lingua richiesta e ricostruisce
  `navLinks`. Spiana anche `siteConfigShared` e il `siteConfig` per-lingua
  (shortTagline/metaDescription/metaTitleSuffix) a livello piatto, così i
  componenti leggono `content.name`/`content.email`/`content.metaDescription`
  senza sapere in quale file vive ciascun campo.
- **Verifica statica di forma**: `content.ts` dichiara
  `const _localeShapeCheck: typeof it = en; void _localeShapeCheck;` — se
  `content.en.ts` perde o rinomina un campo rispetto a `content.it.ts` (o
  viceversa), la build smette di compilare invece di far scoprire il
  disallineamento a runtime in una sola lingua. Ha richiesto di **non** usare
  `as const` sugli oggetti condivisi fra le due lingue (narrowerebbe a tipi
  letterali, producendo falsi positivi) e di annotare esplicitamente `: string`
  le costanti stringa top-level per lo stesso motivo.
- **`src/lib/i18n.ts`**: `type Locale = "it" | "en"`, `localizeHref(href,
  locale)` (aggiunge/toglie il prefisso `/en`), `alternateLocalePath(pathname,
  locale)` (usata dallo switch: calcola l'URL equivalente nell'altra lingua
  per la pagina corrente, non solo l'homepage).

### Componenti

Ogni componente che legge da `content.ts` riceve un prop `locale: Locale` e
chiama `getContent(locale)` internamente (Server Component) o lo riceve così
per i Client Component (prop drilling — l'albero è poco profondo, non serve
un Context React). Ogni pagina (6 IT + 6 EN) passa `locale="it"` /
`locale="en"` esplicito. `routesWithHero` in `StickyHeader` è derivato da
`navRoutes` + `localizeHref` per entrambe le lingue (`locales.flatMap(...)`),
non scritto a mano.

`whatsappHref()` (`contact.ts`) non ha più un messaggio precompilato di
default hardcoded (era solo italiano): ogni chiamante passa esplicitamente
`content.whatsappMessage` della lingua corrente.

### Switch lingua (`components/ui/LanguageSwitcher.tsx`)

Client Component, un solo link che mostra la bandierina della lingua **di
destinazione** (non quella attiva): SVG di pubblico dominio da Wikimedia
Commons (stessa fonte già usata per `AbruzzoMap.tsx`), non emoji (rendering
incoerente fra piattaforme). Il link punta ad `alternateLocalePath(pathname,
locale)` — l'equivalente della pagina corrente nell'altra lingua, non sempre
l'homepage. Montato **due volte**: accanto all'hamburger della `Hero` (visibile
a ogni larghezza, stesso trattamento dell'hamburger stesso) e accanto
all'hamburger/nav dello `StickyHeader` (una copia in `md:hidden` accanto
all'hamburger, una in `hidden md:block` vicino alla nav desktop — necessario
perché l'hamburger dello `StickyHeader` sparisce da `md` in su, ma lo switch
deve restare raggiungibile a ogni larghezza).

### SEO bilingue

- Ogni `metadata` export (12 pagine, IT+EN) resta **statico**: la locale è
  nota a build-time, non serve `generateMetadata`. Ciascuno ha
  `alternates.languages: { "it-IT": ..., "en-US": ... }` e `openGraph.locale`
  corretto (`it_IT` / `en_US`).
- `sitemap.ts` emette un entry per URL (24 in tutto, 12 route × 2 lingue),
  ciascuno con `alternates.languages` che punta alla coppia IT/EN.
- Immagini OG: riusate le stesse foto (una foto non si traduce). Le pagine
  `en/la-dimora` ed `en/posizione` impostano `metadata.openGraph.images`
  esplicito con `alt` inglese, invece di affidarsi al file `.alt.txt` di
  sidecar (che resta solo per l'albero italiano) — asimmetria minore,
  accettata per non duplicare ~1MB di JPEG.
- `structuredData.ts`: le tre funzioni (`lodgingBusinessJsonLd`,
  `breadcrumbListJsonLd`, `faqPageJsonLd`) prendono tutte un parametro
  `locale` e leggono da `getContent(locale)`. La stringa "Homepage" del
  breadcrumb, unica hardcoded fuori da `content.ts` in tutto il repo prima
  di questa modifica, si è spostata in `ui.homepageBreadcrumb`.

## Struttura del progetto

```
src/
  app/
    fonts.ts           # le 4 chiamate next/font, condivise da entrambi i root layout
    global-not-found.tsx  # 404 per URL del tutto sconosciuti, bypassa i root layout — vedi § Pagina 404
    (it)/               # route group italiano — invisibile nell'URL, nessun prefisso
      layout.tsx        # root layout <html lang="it">, chrome globale (StickyHeader, Footer, ScrollToTop)
      page.tsx           # Homepage: <Hero /> + <HorizontalScroller />
      not-found.tsx      # 404 con chrome completo, per `notFound()` lanciato dentro l'albero IT
      la-dimora/page.tsx
      galleria/page.tsx
      servizi-comfort/page.tsx
      posizione/page.tsx
      partner/page.tsx
    en/                  # route group inglese — segmento reale, prefisso "/en"
      layout.tsx        # root layout <html lang="en">, stesso chrome, canonical "/en"
      not-found.tsx      # equivalente inglese
      page.tsx / la-dimora/ / galleria/ / servizi-comfort/ / posizione/ / partner/
    icon.svg / icon.png / apple-icon.png      # favicon (convenzioni file di Next)
    opengraph-image.jpg / .alt.txt            # preview per social, di default (IT)
    sitemap.ts / robots.ts                    # generati da Next su /sitemap.xml e /robots.txt, entrambe le lingue
    globals.css        # design token (colori, font) via @theme
  components/
    layout/             # StickyHeader, Footer, MobileMenu — montati nei layout, ricevono `locale`
    sections/           # Un componente per blocco di contenuto, riusato dalla route dedicata, riceve `locale` (incluso `NotFound`)
    ui/                 # Primitive riutilizzabili (Container, SectionHeading, ImagePlaceholder, HorizontalScroller, NavLink, Reveal, ScrollToTop, AbruzzoMap, LanguageSwitcher, icons)
  lib/
    content.shared.ts    # Dati strutturali e nomi propri, identici in ogni lingua (indirizzo, telefono, percorsi immagine, navRoutes)
    content.it.ts / content.en.ts  # Prosa tradotta, stessa forma nei due file (vedi § Multilingua)
    content.ts          # getContent(locale) — unisce shared + la lingua richiesta
    i18n.ts              # Locale, localizeHref(), alternateLocalePath()
    contact.ts           # Helper per i link rapidi (tel:, wa.me)
    structuredData.ts     # Dati strutturati JSON-LD (LodgingBusiness, FAQPage, BreadcrumbList), presi con getContent(locale)
    seo.ts                # buildOpenGraph() — vedi § SEO e metadati
public/
  images/                # Asset immagine statici
    opengraph/            # Foto OG dedicate (la-dimora.jpg, posizione.jpg) — asset statici, non convenzione-file di Next, vedi § SEO e metadati
```

**Regola guida**: i componenti in `sections/` non contengono testo hardcoded
— chiamano `getContent(locale)` (o ricevono `locale` come prop, per i Client
Component). Questo permette di aggiornare i contenuti reali (quando
arriveranno dal cliente) modificando un solo file per lingua, senza toccare
il JSX. Le sezioni sono componenti "puri" senza `id` di ancoraggio: la
navigazione avviene per route, non per scroll-to-anchor.

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
- **Font editoriale del drawer** (`font-hero`): [Newsreader](https://fonts.google.com/specimen/Newsreader) —
  serif editoriale con grazie morbide (preferito a un Didone ad alto
  contrasto come Bodoni Moda, giudicato troppo estremo per un brand di
  ospitalità). Dopo il passaggio dei titoli a Flaviotte e la rimozione della nav
  dalla Hero gli restano **le voci del drawer** e il glifo decorativo di
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
`GeneralSans-Italic.woff2`. Il corsivo non è più usato per l'hover della nav —
vedi `NavLink` — ma serve ai testi in `italic` sparsi nelle sezioni (es. il
segnaposto "Risposta in arrivo." delle FAQ).

Newsreader arriva da `next/font/google`, Flaviotte, General Sans e Megdira da
`next/font/local`; tutti sono esposti come CSS var in `src/app/fonts.ts`
(`--font-newsreader`, `--font-flaviotte`, `--font-general-sans`,
`--font-megdira`) e mappati sui token semantici in `globals.css`:
`--font-wordmark` → Megdira, `--font-display` → Flaviotte, `--font-hero` →
Newsreader, `--font-body` e `--font-brand` → General Sans.

I file dei font locali sono tutti **WOFF2 non subsettati** (≈115 KB in
tutto): `next/font/local` li serve così come sono. I quattro tagli di General
Sans erano ancora `.otf` (≈186 KB) alla consegna del kit del cliente —
convertiti in `.woff2` il 30 luglio 2026 con `wawoff2` (pacchetto JS puro,
nessuna dipendenza nativa; installato temporaneamente con `--no-save` solo
per la conversione, non è nelle dipendenze del progetto), -48% di peso, stesso
ordine di grandezza del risparmio già visto sulle immagini WebP. Subsetting al
latino non fatto: nessuno strumento disponibile in questo ambiente senza
Python/`fonttools`, e il guadagno oltre alla sola conversione sarebbe comunque
marginale.

> **Licenza d'uso web non confermata** per Flaviotte e General Sans (il
> cliente non ne ha una, dichiarato il 30 luglio 2026): sono comunque
> serviti pubblicamente da questo sito. Da chiarire con la proprietaria prima
> della messa online — vedi TODO 6 in `HANDOFF.md`.

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

### Animazioni di ingresso (`components/ui/Reveal.tsx`)

Fade + micro-movimento quando un blocco entra nel viewport, valutato come
alternativa "soft" a GSAP ScrollTrigger: `IntersectionObserver` + CSS
transition, zero dipendenze aggiunte, stessa filosofia di
`HorizontalScroller` (che riproduce un effetto GSAP del riferimento in JS
puro).

- **`variant="slide"`** (default, per i testi): `translate-y-4 opacity-0` →
  `translate-y-0 opacity-100`. Usato per i blocchi editoriali — `About`
  (titolo+sottotitolo, un `Reveal` per paragrafo con `delayMs` scaglionato,
  CTA finale), `HomeIntro`, `LocationTeaser`, la colonna editoriale di `Faq`.
- **`variant="scale"`** (per le immagini): `scale-95 opacity-0` →
  `scale-100 opacity-100`. Applicato ai contenitori immagine di `HomeIntro`,
  `LocationTeaser` e `Faq` (non alla Hero, che resta ferma — un eventuale
  Ken Burns lì sarebbe un'animazione continua, non un ingresso, e non è stato
  ancora implementato).
- **Attenzione Tailwind v4**: `translate-y-*` scrive `translate`, `scale-*`
  scrive `scale` — **non** `transform`, in entrambi i casi (stessa trappola
  già vista su `NavLink` con `scale-x-*`). Le classi `transition-[...]` dei
  due varianti elencano la proprietà per nome, non `transform`.
- Il `div` di `Reveal` **sostituisce** il contenitore originale (stesso
  `className` passato via prop), non lo avvolge in più: per le immagini con
  `fill` di `next/image` il wrapper riceve `absolute inset-0 h-full w-full`
  al posto del contenitore che prima portava quelle classi, altrimenti
  l'immagine perderebbe il riferimento di dimensionamento.
- Rispetta `prefers-reduced-motion` **letto in modo sincrono** con
  `useSyncExternalStore` (stesso pattern del flag "sono sul client" di
  `MobileMenu`): chi lo attiva vede il contenuto già visibile, senza passare
  dalla transizione. Leggerlo con un `setState` in un effect avrebbe violato
  `react-hooks/set-state-in-effect`.
- Funziona anche **dentro lo scroll orizzontale** della home: i pannelli
  fuori vista sono traslati (non nascosti), e `IntersectionObserver` valuta
  la posizione reale a schermo dopo il transform, quindi non scattano finché
  non entrano davvero in vista scorrendo.
- L'accordion delle FAQ (a destra) **non** ha `Reveal`: è una lista
  interattiva, non testo editoriale — resta fuori dal perimetro di questa
  animazione.

### Ritorno in cima

Provato e scartato un cursore custom a quadrato (`CursorSquare`,
`mix-blend-mode: difference`, riferimento mondriantribute.com): il cursore è
tornato a quello di sistema. Il codice resta recuperabile da `git log`.

`ScrollToTop` (`components/ui/`) è il pulsante terracotta in basso a destra,
**solo sotto `md`**: su desktop rotellina e scrollbar bastano e un elemento
fisso finirebbe sopra i contenuti. Compare oltre un viewport di scroll e riporta
in cima con `behavior: "instant"`, che sovrascrive lo `scroll-behavior: smooth`
globale — con lo scroll orizzontale la home è alta tre viewport e l'animazione
morbida durerebbe secondi.

Perché non copra la firma "Realizzato da inLumine Studio", l'ultima riga del
`Footer` **riserva spazio in fondo** (`pb-24 md:pb-6`) invece di nascondere il
pulsante quando il footer entra in campo: in fondo alla pagina è proprio il
momento in cui serve. Attenzione all'ordine delle utility: `py-6 pb-24` non
funziona, la scorciatoia verticale vince sul `pb`; va scritto `pt-6 pb-24`.

La scrollbar globale (`globals.css`) è in stile "classico": track scuro
(`#57534E`), thumb bianco arrotondato con bordo che fa da padding, e pulsanti
freccia su/giù (SVG inline via `::-webkit-scrollbar-button`). Su Firefox si
usa `scrollbar-color: #ffffff #57534e` (i pulsanti freccia non sono
supportati).

### Link di navigazione (`components/ui/NavLink.tsx`)

Unico punto in cui vive il markup delle voci di nav, incluso il ramo
`showFullNav` (prima il blocco era duplicato quattro volte). Da quando la Hero
non ha più una nav, **l'unico consumatore è lo `StickyHeader`**.

L'hover è un **filetto che si espande**: il `<span>` è sempre a `w-full` e a
riposo viene compresso a `scale-x-[0.34]`, all'hover torna a `scale-x-100` con
virata al colore acceso. L'offset verticale è in `em` (`bottom-[-0.28em]`,
`h-px`) così l'effetto resta proporzionato a qualsiasi corpo. Ha sostituito il
precedente hover corsivo + slide orizzontale.

Due parametri per contesto — **oggi lo `StickyHeader` usa entrambi sui valori
di default**, ma restano parametrizzati perché la primitiva è pensata per
tornare in un punto allineato a destra o su uno sfondo scuro:

- `align` (`"start"` default, `"end"`) decide il `transform-origin`, cioè da
  quale lato il filetto si espande. **Va fatto combaciare con l'allineamento
  della lista**, altrimenti la lineetta a riposo sembra fuori asse rispetto alla
  bandiera del testo — era il caso della vecchia nav verticale della Hero
  (`items-end`, quindi `align="end"`), rimossa insieme alla nav stessa.
- `lineClassName` decide il colore: il default terracotta scuro → terracotta
  funziona sul crema dello header. Su uno sfondo scuro servirebbe una coppia
  chiara (es. sabbia/avorio), perché il terracotta ci sparisce sopra.

**Attenzione**: in Tailwind v4 `scale-x-*` scrive la proprietà `scale`, non
`transform`. La transizione deve quindi elencare `scale`
(`transition-[scale,background-color]`): con `transition-[transform,...]`
l'animazione non parte e il filetto scatta.

**"Homepage" resta sempre cliccabile**, anche con `showFullNav = false`: la
condizione è `!showFullNav && href !== "/"`, non il solo `!showFullNav`. La
home esiste già ed è raggiungibile a bozza attiva, quindi non ha senso
disattivarla come le altre voci — sono le route ancora vuote a dover restare
dietro al flag. Stessa eccezione duplicata in `MobileMenu.tsx`, che non usa
`NavLink` per le proprie voci (vedi sotto) e ha il suo ramo `showFullNav ||
link.href === "/"`. Il flag `showFullNav` oggi è `true`: il sito è uscito
dalla bozza, ma l'eccezione resta nel codice come rete di sicurezza per un
eventuale ritorno a `false` in una fase di redesign.

### Drawer di navigazione (`components/layout/MobileMenu.tsx`)

Nonostante il nome del file, **non è più mobile-only**: da quando l'hamburger
della Hero è visibile a ogni larghezza (era `md:hidden`, ora non lo è più —
vedi § Hero), anche il drawer deve funzionare su desktop. In precedenza il suo
wrapper aveva **anch'esso `md:hidden`**: su desktop il pannello restava
invisibile per CSS anche quando lo stato React passava a `open = true`, ma
l'effect che blocca lo scroll del body guarda solo quello stato, non la
visibilità — risultato, un bug reale: click che sembrava non fare nulla e
`body { overflow: hidden }` bloccato senza alcuna UI visibile per chiuderlo
(l'unica via d'uscita era l'Escape, che nessuno prova a scoprire). Rimosso.

**Due istanze** vivono nel DOM contemporaneamente: una montata da `Hero`, una
da `StickyHeader` — ognuna con il proprio hamburger e il proprio stato
`isMenuOpen`, ma stesso componente. Ha senso perché ciascuna Hero/header apre
*il proprio* drawer; non c'è uno stato condiviso da sincronizzare. Chi debugga
via `document.querySelector('aside[role="dialog"]')` prende la prima
istanza incontrata (quella dello `StickyHeader`, montato prima nell'albero),
non necessariamente quella aperta — va filtrata per `aria-hidden` o per
antenato (`closest('header')` vs `closest('section')`).

Il drawer **entra da sinistra** (`left-0`, chiuso a `-translate-x-full`). Per
questo l'hamburger è a sinistra **sia nella Hero sia nello `StickyHeader`**:
un trigger a destra con un drawer che entra da sinistra sarebbe un disallineamento
percepibile a ogni apertura. Nello `StickyHeader` l'hamburger è il primo figlio
della riga (prima del logo) solo per effetto del suo stesso `md:hidden`: da
`md` in su sparisce e il logo torna a essere il primo elemento visibile,
esattamente come prima di questo cambio.

**Intestazione del pannello** (riferimento scelto dal cliente: il drawer di
Six Senses Rome): la X sta da sola sulla sua riga, il nome del sito segue
**sulla riga sotto**, non più affiancato — sono stati provati insieme sulla
stessa riga in una prima versione, ma il cliente ha chiesto esplicitamente
l'ordine di lettura verticale del riferimento. Il nome resta in `font-brand`
(General Sans, non Newsreader): una prova col font editoriale in corsivo è
stata scartata, "non toccare il font" è stato esplicito. La nav sotto è
`mt-10` e non più centrata verticalmente (`justify-center`), per aprirsi
subito dopo l'intestazione come nel riferimento.

### Hero (`components/sections/Hero.tsx`)

**Un solo impaginato a tutte le larghezze**: lockup centrato, sul modello del
riferimento Six Senses Rome scelto dal cliente. Mobile è la versione stretta
dello stesso blocco, non un layout separato — prima erano due impaginati
alternativi con due `<h1>` che si escludevano a vicenda.

- Occupa **sempre l'intero viewport**: la `<section>` usa `min-h-dvh`
  (dynamic viewport height, robusto anche su mobile con barra URL variabile).
- Il blocco centrale, in ordine: wordmark (`<h1>`, `<Link>` a `/` così fa anche
  da logo), `heroLocation` ("Sulmona, Abruzzo"), `heroDescriptor` ("Una casa
  vacanze di charme nel cuore del centro storico."), claim e sottotitolo.
  Wordmark, località e descrittore sono un **gruppo stretto** (`gap-3` in un
  wrapper dedicato) mentre il contenitore usa `gap-7`/`md:gap-9`: con gap
  uniformi la gerarchia dipendeva solo dal corpo del testo e il ritmo
  risultava piatto.
- **Il claim compare solo da `md`** (`hidden md:block` di default, tramite
  `showClaimOnMobile`): su 375px il claim della home sarebbe un muro di testo
  sulla foto, e il racconto lo riprende `HomeIntro` subito dopo. Il
  **sottotitolo invece c'è sempre**, anche su mobile, ma a corpo ridotto
  (`text-sm`, cresce da `md`). `heroLocation` è sempre presente, perché
  altrimenti la Hero non dice **dove** siamo a chi arriva da un link o dai
  social. `heroDescriptor` è nato da un'osservazione del cliente: senza di
  lui, su mobile (dove il claim è nascosto) non era chiaro a colpo d'occhio
  **che tipo di attività** fosse — il claim ("Arrivare. Vivere. Restare.") è
  puro tono, il sottotitolo parla di "dimora" ma non lo dice esplicitamente.
  Usa deliberatamente "casa vacanze", la query con cui le persone cercano
  questo tipo di alloggio: la stessa dicitura vive già in
  `siteConfig.metaDescription` e nel JSON-LD, ma quei due posti non li legge
  un visitatore, solo i motori di ricerca. **Solo in home**: tutte le altre
  route che riusano `Hero` passano esplicitamente `descriptor=""` (stessa
  convenzione di `subtitle=""` — stringa vuota nasconde il paragrafo,
  ometterlo userebbe il default) per non ripetere lo stesso messaggio su ogni
  pagina, richiesta esplicita del cliente.
- **Riusata su `/la-dimora`** (`About` → `<Hero imageSrc=... claim=...
  descriptor="" subtitle="" showClaimOnMobile />`): stessa struttura, tre cose
  diverse dalla home — la foto (Piazza Garibaldi di giorno, non l'interno),
  il claim ("La Nostra Storia" invece di "Arrivare. Vivere. Restare.") e
  nessun sottotitolo (`subtitle=""`, che è diverso da ometterlo: una stringa
  vuota nasconde il paragrafo, ometterlo userebbe il default `heroSubtitle`
  della home). Con un claim così corto ha senso **non** nasconderlo su
  mobile, quindi lì `showClaimOnMobile` passa a `true`; sulla home resta
  `false`. Stesso `descriptor=""` su `/servizi-comfort`, `/posizione`,
  `/galleria` e `/partner`.
- In fondo due chevron sovrapposti fanno da indicatore di scroll, senza testo
  (`aria-hidden`: sono decorativi, e `motion-reduce:animate-none` ferma il
  rimbalzo per chi riduce le animazioni).
- **Nella Hero non c'è nav e non c'è barra promo**: la riga in alto ha solo
  l'hamburger a sinistra e la CTA "Prenota ora" a destra, direttamente sulla
  foto, a ogni larghezza. L'hamburger apre `MobileMenu`, unico accesso alle
  sezioni dalla Hero; le voci tornano visibili nello `StickyHeader` appena si
  scrolla oltre la Hero. Anche questo viene dal riferimento, dove il desktop
  non espone né la nav né una fascia sopra la riga hamburger/CTA (prima qui
  c'era una barra promo ambra/terracotta, rimossa insieme a `promoBarMessage`).
- Oltre al gradiente c'è un velo piatto (`bg-ink/35`, `md:bg-ink/25`): il lockup
  cade a metà foto, dove il copriletto chiaro mangerebbe il testo avorio. Su
  schermi larghi il testo occupa una fascia più stretta, quindi serve meno velo.
- Overlay foto: gradiente scuro dal basso + filtro `brightness-90 saturate-95`
  sull'immagine per ammorbidire le luci calde e garantire leggibilità.

### "La Dimora" (`components/sections/About.tsx`)

Tre blocchi in sequenza: `Hero` riusata (vedi sopra), il racconto editoriale,
una CTA a piena larghezza su `bg-gradient-to-br from-terracotta to-terracotta-dark`.

- Il racconto vive in `aboutPage` (`content.ts`): `title`, `subtitle` e
  `paragraphs` (un array, uno per `<p>` — stesso pattern di `homeIntro.body`).
  È la versione estesa, "director's cut", del teaser breve mostrato in home da
  `HomeIntro`: stesso racconto (un guscio dimenticato trasformato in rifugio,
  a Sulmona), qui per intero. **Riscritto il 27 luglio 2026** su richiesta
  esplicita del cliente: la prima versione era una narrazione personale in
  prima persona (l'acquisto della casa al posto di un'auto, i figli coinvolti
  nella ristrutturazione, una citazione diretta di chi visitava il cantiere).
  Il cliente l'ha sostituita con un tono più istituzionale, incentrato sulla
  visione del progetto e sul legame con Sulmona, senza dettagli familiari —
  `homeIntro.body` è stato riallineato allo stesso tono nella stessa occasione,
  altrimenti teaser e racconto esteso avrebbero raccontato due storie diverse,
  non la stessa in forma breve e lunga.
- La CTA finale ha **due bottoni distinti**, non due volte lo stesso contatto:
  `ctaPrimaryLabel` ("Verifica disponibilità") è un `tel:` (`telHref()`),
  `ctaSecondaryLabel` ("Contattaci su WhatsApp") è `whatsappHref()`. Rispecchia
  la risposta della FAQ sulla prenotazione ("per telefono o su WhatsApp"), solo
  su bottoni separati invece che nello stesso testo.
- Sfondo terracotta pieno: il bottone primario è **pieno crema** (inverte i
  colori, massimo contrasto), il secondario è **outline crema** — stesso
  trattamento outline-su-scuro già usato nella CTA della FAQ.

### Galleria (`components/sections/Gallery.tsx`)

Ultima delle quattro sezioni inizialmente vuote a uscire da quello stato: il
31 luglio 2026 ha ricevuto il set completo delle quattro foto reali fornite
dalla proprietaria (due scattate il 22 luglio, due il 31 — trovate tutte sul
Desktop del cliente, non nella sottocartella con un lotto diverso di scatti
con nome simile). **Ampliata il 6 agosto 2026** con 14 nuove foto trovate
nella cartella "galleria" sul Desktop (facciata esterna della Dimora — la
prima foto reale dell'edificio, mai avuta prima —, portone d'ingresso,
ingresso interno, cucina, entrambe le camere da letto, balconi, bagno):
convertite in WebP q92 con `sharp` (stesso processo delle quattro foto di
luglio), nomi file descrittivi (`sulmona-dimora-<soggetto>.webp`). Una delle
14 è stata rimossa subito dopo (**"queste due foto sono uguali, rimuovi
quella di sotto"**): due scatti dello stesso ingresso, uno a luce calda
serale e uno a luce naturale diurna, quasi identici nell'inquadratura — il
cliente ha scelto di tenere solo quello a luce diurna
(`sulmona-dimora-ingresso-luce-giorno.webp`), rimuovendo
`sulmona-dimora-ingresso-appendiabiti.webp` sia dall'array sia dal repo.
Totale attuale: **17 foto**.

- **Layout a cascata (masonry), non griglia**: `columns-2 sm:columns-3
  lg:columns-4` (CSS multi-column, non CSS grid) con ogni card
  `break-inside-avoid`. A differenza di una grid a righe, le colonne
  ridistribuiscono da sole ogni card nella colonna più corta — necessario
  perché le foto non condividono tutte lo stesso rapporto d'aspetto (a
  differenza della vecchia griglia `aspect-square`, che forzava ogni cella
  allo stesso formato tagliando le foto). Scelta CSS pura, senza libreria
  (stessa filosofia di `HorizontalScroller`/`AbruzzoMap`): un vero layout
  Pinterest via JS (che rioordina gli elementi per bilanciare l'altezza delle
  colonne) sarebbe stato overkill per un numero di foto a una cifra.
- **`GalleryImage` (`content.shared.ts`) ha `width`/`height` obbligatori**:
  servono a `next/image` (usato qui **senza** `fill`, a differenza delle
  altre immagini del sito) per riservare lo spazio corretto di ogni card
  prima che la foto finisca di caricare, evitando un salto di layout (CLS) —
  in un layout a cascata l'altezza di ogni card dipende dal suo stesso
  rapporto d'aspetto, non da un contenitore a dimensione fissa come nelle
  griglie `aspect-square`/`fill` usate altrove.
- **Nessuna didascalia**: un primo giro aveva `description` come campo
  obbligatorio su `GalleryImage`, mostrata in overlay al passaggio del mouse
  e sotto la foto nel lightbox — tolta su richiesta esplicita del cliente
  ("non serve"). Solo `alt` resta, per accessibilità, mai mostrato a schermo.
- **Lightbox** (riusato dalla versione precedente, mai smontato con il resto
  del componente): overlay scuro a piena pagina, frecce prev/next che
  ciclano con il modulo (`% galleryImages.length`), chiusura in due modi
  (bottone X o click sullo sfondo, non sulla foto grazie a
  `stopPropagation`). "Zoomabile" qui significa apertura di una versione
  ingrandita a schermo intero, non pan/pinch-zoom interattivo — coerente con
  l'uso di un hotel che vuole mostrare gli ambienti, non un editor immagini.
- **`ImagePlaceholder` ha guadagnato un prop `style`** (era `label`/
  `className` soli) per poter passare `aspectRatio` inline quando una foto
  non è ancora disponibile ma le sue dimensioni finali sono già note — non
  sfruttato oggi (tutte e quattro le foto sono reali) ma pronto per il
  prossimo giro di scatti.

### "Comfort & Informazioni" (`components/sections/Amenities.tsx`)

Prima sezione tra le quattro inizialmente vuote a ricevere i contenuti reali
dalla proprietaria (vedi TODO 3 in `HANDOFF.md`). A differenza di `Gallery`,
`Location` e `Partners` — dove Hero e sezione restano due elementi separati
montati dalla stessa `page.tsx` — questo è ancora il caso qui:
`servizi-comfort/page.tsx` monta `<Hero {...pageHeroes.comfort} ... />` e poi
`<Amenities />`, la Hero non fa parte del componente (a differenza di `About`,
che invece la incorpora). **Foto Hero dedicata dal 6 agosto 2026**
(`pageHeroes.comfort.imageSrc`, riusa lo stesso file di `galleryImages` con
la vista dal balcone sul campanile del centro storico, ingrandito con AI —
vedi § AI upscaling): prima ereditava il default della Hero (la foto della
camera).

- I dati vivono in **`amenitiesPage`** (`content.ts`): `eyebrow`/`title`/
  `subtitle` per l'intestazione, poi due blocchi — `comfortGroups` (Spazi &
  Ospitalità, Cucina & Risveglio, Clima & Servizi) e `infoGroups` (Orari &
  Soggiorno, Arrivo & Parcheggio, Cura della Dimora & Politiche) — infine la
  CTA finale (`ctaTitle`/`ctaDescription`/`ctaPrimaryLabel`/`ctaSecondaryLabel`).
  Ogni gruppo (`AmenityGroup`) ha un titolo e una lista di voci icona+titolo+
  testo (`AmenityItem`), rese da `AmenityBlock` in una griglia a tre colonne
  da `lg:`. **Niente titolo di blocco sopra i due `AmenityBlock`**: un'intestazione
  come "Comfort & Dotazioni" subito sotto "Comfort & Informazioni" ripeteva la
  stessa parola a un rigo di distanza — provato e scartato. I due blocchi si
  distinguono con un cambio di sfondo (`bg-cream-soft` sul secondo,
  `infoGroups`) invece che con un'altra intestazione.
- **I titoli delle singole voci (`item.title`, es. "Cucina Completa",
  "Microclima Ideale") sono in `font-semibold` del font body, non
  `font-display`**: Flaviotte ha un solo peso regular (vedi § Font), quindi su
  un testo così breve il contrasto con la descrizione doveva venire dal peso,
  non da un cambio di famiglia — usarlo qui avrebbe reso il blocco un muro di
  serif senza gerarchia.
- **Check-in/checkout, cancellazione, parcheggio/ZTL e cucina ripetono
  volutamente le stesse informazioni già presenti nelle FAQ della home**: è
  una scelta deliberata, non una dimenticanza — chi arriva direttamente su
  questa pagina (da un link diretto, dai social, da un motore di ricerca) non
  deve dover tornare in home per trovarle.
- La CTA finale riusa esattamente il trattamento di quella di `About`
  (sfondo `bg-gradient-to-br from-terracotta to-terracotta-dark`, bottone
  primario pieno crema per `tel:`, secondario outline crema per WhatsApp), ma
  con testo e bottoni dedicati (`amenitiesPage.cta*`, non `aboutPage.cta*`).
- `iconMap` in `Amenities.tsx` mappa ogni `AmenityIcon` (union di stringhe in
  `content.ts`) al componente `lucide-react` corrispondente — stesso pattern
  già visto con `Amenity["icon"]` prima di questa riscrittura, solo con più
  voci (16 icone contro le 8 originali).

### "Dove ci Troviamo" (`components/sections/Location.tsx`)

Seconda sezione tra le quattro inizialmente vuote a uscire da quello stato.
A differenza di `Amenities`/`About`, qui **Hero e sezione restano due elementi
separati**: `posizione/page.tsx` monta `<Hero {...pageHeroes.posizione} ... />`
e poi `<Location />`. La Hero ha finalmente una foto dedicata (vedi
`pageHeroes.posizione` — gli archi dell'acquedotto medievale di Sulmona in
Piazza Garibaldi, luce diurna), non più il default camera da letto. Quattro
blocchi in sequenza dentro `Location`: intestazione + elenco punti di
interesse (colonna sinistra) accanto alla mappa illustrativa dell'Abruzzo
(colonna destra); poi indirizzo e contatti; poi il link "Indicazioni
stradali"; infine a piena larghezza la mappa Google Maps vera.

- **Testi** in **`locationPage`** (`content.ts`), non `positionTeaser`: quel
  secondo oggetto resta il pannello breve della home (`LocationTeaser`), che
  ha titolo e descrizione propri e più corti. Il titolo di `locationPage`
  ("La bellezza di Sulmona, appena fuori dalla porta") e la descrizione sono
  copy scritto dal cliente, non generato.
- **Mappa illustrativa** (`components/ui/AbruzzoMap.tsx`): un SVG con la
  sagoma reale delle quattro province abruzzesi (non un disegno stilizzato),
  ispirato al riferimento del cliente (sylverrappresentanze.it, § Scroll
  orizzontale) che evidenzia in tinta unita la regione di competenza con un
  pallino sulla sede. I confini vengono da un file di pubblico dominio di
  Wikimedia Commons ("Map of region of Abruzzo, Italy", autore Vonvikken):
  disegna già ogni provincia come un'unica sagoma colorata in modo uniforme,
  quindi bastava isolare i quattro `path`, traslarli in una viewBox comune e
  colorarli con `fill-ink` (nessuno `stroke` a parte un filo dello stesso
  colore, per eliminare il micro-gap di anti-aliasing tra sagome adiacenti).
  Sulmona **non è nei dati sorgente** (che disegnano solo i confini di
  provincia): il pallino è posizionato a mano confrontando le coordinate
  reali della città con l'estensione della provincia di L'Aquila, verificato
  rendendo l'SVG a schermo e controllando che cadesse nella Valle Peligna,
  vicino al confine con Pescara e Chieti (dove realmente si trova). Il
  pallino non anima da solo (scartato un `animate-ping` continuo, giudicato
  di troppo): mostra **sempre** l'etichetta "Sulmona" accanto a sé (non solo
  all'hover, come in una prima versione: su mobile l'hover non esiste, e il
  cliente ha chiesto che l'etichetta sia visibile a ogni larghezza). Stessa
  struttura pallino+testo dei quattro capoluoghi qui sotto (in una prima
  versione l'etichetta di Sulmona era un badge scuro sopra il pallino,
  scartato su richiesta del cliente per uniformità visiva): la differenza è
  solo di colore e dimensione. Il cerchio visibile ha raggio 18 in una
  viewBox da oltre 2000 unità.
  **`PROVINCE_CAPITALS`** aggiunge un pallino con etichetta anche per i
  quattro capoluoghi (L'Aquila, Teramo, Pescara, Chieti), ma smorzato per
  gerarchia rispetto a Sulmona — raggio 10 invece di 18, testo a 50px invece
  che 68px, `fill-stone-light` invece di `fill-terracotta` — così Sulmona
  resta l'unico punto che spicca davvero, pur condividendo lo stesso
  linguaggio visivo. A differenza del pallino di Sulmona (posizionato a
  occhio), questi quattro sono calcolati:
  trasformazione lineare longitudine/latitudine → viewBox, calibrata su due
  punti noti — il bounding box reale della regione Abruzzo (Nominatim/
  OpenStreetMap) e la posizione già verificata di Sulmona, usata per
  correggere il piccolo scarto introdotto dalla semplificazione dei confini
  nel file sorgente (i vertici del tracciato sono meno numerosi di quelli
  reali). Le coordinate dei quattro capoluoghi vengono anch'esse da
  Nominatim (centroide del comune, non della provincia — occhio a
  `addresstype`: `city`/`town`, non `county`). Scarto misurato sul punto di
  controllo: sotto l'1% delle dimensioni della mappa. **`labelSide`** decide
  se l'etichetta sta a destra o a sinistra del pallino: di default a destra,
  ma Pescara è a ridosso della costa (il lato orientale della sagoma) e
  un'etichetta a destra cadrebbe fuori dalla forma, su crema, illeggibile —
  quindi va a sinistra, verso l'interno. **Nessuno sfondo card
  dietro l'SVG**: il cliente ha chiesto esplicitamente lo stesso crema della
  pagina, non un riquadro
  `bg-cream-soft` — la sagoma scura galleggia direttamente sul fondo, come
  nel riferimento.
- **Indirizzo e contatti** ripetuti sopra la mappa Google (nome della
  struttura, indirizzo, icone WhatsApp/telefono/mail/Instagram — stesso set
  del `Footer`, colori adattati al fondo chiaro): richiesta esplicita del
  cliente, perché chi scorre fino in fondo alla pagina non deve risalire per
  trovarli. Il link **"Indicazioni stradali" sta fra questo blocco e la mappa
  Google**, non più accanto all'elenco punti di interesse in alto: posizione
  scelta dal cliente, apre Google Maps con l'indirizzo (`mapsDirectionsHref()`
  in `contact.ts`), non la scheda dell'attività.
- **Mappa Google** (`mapsEmbedSrc()` in `contact.ts`): un `<iframe>` a piena
  larghezza in fondo, generato dal solo indirizzo (`siteConfig.addressLine`),
  non da un Place ID — il profilo Google Business della struttura non è
  ancora pubblicato (va aperto col cliente in seguito). Quando lo sarà,
  `mapsEmbedSrc()`/`mapsDirectionsHref()` vanno aggiornati con l'ID del
  profilo.
- **`pointsOfInterest` (`content.ts`) ha guadagnato un campo `description`**
  (opzionale): un cenno editoriale su cosa rende ciascun luogo degno di una
  visita, non solo nome e distanza. `LocationTeaser` (il pannello breve della
  home) continua a leggere lo stesso array ma ignora `description` — mostra
  ancora solo nome e distanza, il formato compatto ha senso lì. In
  `Location`, viceversa, **la distanza non viene resa affatto**: ripeterla
  qui sopra la mappa vera (che dà indicazioni precise) era ridondante, tolta
  su richiesta esplicita del cliente — il campo resta nel tipo solo per
  `LocationTeaser`. Aggiunta anche una quarta voce, la statua di Ovidio in
  Piazza XX Settembre (il poeta latino è nato a Sulmona), con una distanza
  stimata alla pari delle altre tre — vedi il TODO in `content.ts` sulla
  verifica dei tempi di percorrenza.
- **`locationPage.mapCaption`** (sotto la mappa illustrativa, non sotto quella
  Google) nomina in prosa vera i quattro capoluoghi già presenti come
  etichette nell'SVG (`AbruzzoMap`): un pallino con un nome accanto non è
  testo indicizzabile (l'SVG ha `role="img"` con un unico `aria-label`, i
  `<text>` interni non sono esposti singolarmente), quindi se i nomi devono
  contare per la SEO vanno ripetuti come contenuto reale. **Non** dice che
  Sulmona è "centrale" fra i quattro capoluoghi (richiesta iniziale del
  cliente): verificato che è falso — il baricentro geografico dei quattro
  capoluoghi cade ~46 km a nord di Sulmona, che sta ai margini sud del
  gruppo, non al centro. Riformulato come raggiungibilità: i tempi (Chieti
  ~50 min, Pescara ~1h, L'Aquila ~1h15, Teramo ~1h30) vengono da un servizio
  di routing stradale reale (OSRM), non dalla distanza in linea d'aria —
  quest'ultima li avrebbe sottostimati parecchio, vista l'Appennino di mezzo.

### "I Nostri Partner" (`components/sections/Partners.tsx`)

Terza sezione tra le quattro inizialmente vuote a uscire da quello stato: il
30 luglio 2026 era ancora uno **stato vuoto onesto** al posto dei tre partner
di fantasia che c'erano prima (`Trattoria del Borgo` e simili); il 31 luglio
2026 ha ricevuto i primi due partner reali — **Cafè Piazza Tresca** (fascia
20%) e **inLumine Studio** (fascia 10%, lo studio che ha realizzato il sito:
consulenza web, siti, eCommerce, identità digitale, design, condizioni
dedicate agli ospiti della Dimora) — e in quell'occasione è stata
ristrutturata da griglia piatta a **fasce di sconto** su richiesta del
cliente. Il 1 agosto 2026 si sono aggiunti un terzo e un quarto partner:
**White N'More** (camiceria uomo, fascia 20%), con un logo di partenza più
scadente degli altri due (un ritaglio di volantino, non un file vettoriale
— vedi il punto sui loghi qui sotto), e **Nerocaffè** (pub irlandese a 7 km
da Sulmona, fascia 10%, sconto riservato esplicitamente alla cena — sito
web realizzato in passato dallo stesso studio). In questa occasione anche
Cafè Piazza Tresca ha guadagnato la stessa precisione: la descrizione ora
dice esplicitamente che il 20% è sulla colazione, non sull'intero locale
— la fascia da sola indicava la percentuale ma non a cosa si applicasse.

- **Stato vuoto**: icona `Handshake` + "Le prime convenzioni sono in arrivo",
  quando non c'è nessuna fascia con almeno un partner. Stessa filosofia di
  `Location` prima di avere l'indirizzo definitivo (segnaposto testuale
  onesto, non un contenuto inventato).
- **Fasce di sconto fisse** (`partnerTierIds` in `content.shared.ts`): `10`,
  `15`, `20`, `gift` (omaggi gratuiti, senza percentuale) — quest'ordine è
  anche l'ordine in cui compaiono in pagina. Ogni `Partner` ha un campo
  `tier` che lo assegna a una fascia; **non ha più un campo `benefit` a testo
  libero** (es. "15% di sconto sul menu") — lo sconto lo dice la fascia in
  cui il partner si trova, non si ripete su ogni singola card. Le etichette
  delle fasce (`partnerTierLabels`, per lingua) e l'icona (`Tag` per le
  percentuali, `Gift` per gli omaggi — inizialmente `Percent`, cambiata
  perché ripeteva il simbolo "%" già presente nel testo dell'etichetta,
  segnalato dal cliente) sono le uniche cose che indicano la fascia; il
  raggruppamento vero e proprio (partner filtrati per `tier`, fasce vuote
  escluse) è calcolato una volta sola in `getContent()` (`content.ts`, campo
  `partnerTiers`), non in `Partners.tsx` — stesso motivo per cui `navLinks`
  è ricomposto lì e non nei componenti. Il titolo della fascia è in
  `font-display` (Flaviotte, **senza** `font-semibold`: quel font ha un solo
  peso, vedi § Font) per distinguersi dalla categoria del singolo partner
  subito sotto, che resta in `font-body` — altra richiesta del cliente, le
  due etichette si assomigliavano troppo.
- **`Partner` (`content.shared.ts`) ha `logoSrc`/`logoAlt` opzionali**: se
  assente, la cella mostra un riquadro tratteggiato con la scritta "Logo in
  arrivo", **non** `ImagePlaceholder` — quel componente ha un glifo "CC"
  pensato per foto a piena cella (Hero, gallery), a scala di logo
  risulterebbe sproporzionato e leggibile male. Un logo è anche l'identità
  visiva di un'altra attività: simularne uno finto sarebbe più fuorviante che
  utile, a differenza di una foto della Dimora in arrivo. Il riquadro logo è
  `h-32` (non `h-20` come nella prima versione): a `h-20`, con il padding sia
  sul contenitore sia sull'`<Image fill>`, lo spazio effettivo per il logo
  crollava a ~32px — troppo poco per un logotipo a più righe come quello di
  Cafè Piazza Tresca, segnalato illeggibile dal cliente. Rimosso il padding
  duplicato (restava solo quello del contenitore, l'`<Image fill>` si
  posiziona già rispetto al suo *padding box*, non serve un secondo giro).
- **Loghi con sfondo bianco**: se il file arriva come JPEG a sfondo bianco
  pieno (tipico export da programmi di grafica o foto di un logo stampato),
  va reso trasparente prima di salvarlo in `public/images/partners/` —
  altrimenti il rettangolo bianco stona sulla cella scura (`bg-ink`) attorno
  al riquadro crema del logo. Fatto per Cafè Piazza Tresca con `sharp`: letti
  i pixel raw, mappata una soglia di "bianchezza" (media RGB) a un canale
  alpha con una piccola zona di sfumatura (248→222) per non lasciare bordi
  dentellati sulle aste sottili del carattere serif, poi ricomposto come PNG.
  Script usa-e-getta, non conservato nel repo (stesso approccio delle
  conversioni font, vedi § Font).
- **Logo di inLumine Studio** (`public/images/partners/inlumine-studio.svg`):
  copiato da `inlumine-logo-on-white.svg` nel repo di brand dell'agenzia
  (`inlumine/brand/`), **non** dalla variante `-on-black` inizialmente
  indicata — quella ha un badge nero pieno che avrebbe stonato allo stesso
  modo (rettangolo scuro dentro il riquadro crema del logo, opposto al
  problema del punto sopra ma stesso effetto). La variante `-on-white` è già
  un badge quadrato bianco con testo vettorializzato (nessun font richiesto),
  pensata apposta per stare su sfondi chiari — si integra nel riquadro crema
  senza bisogno di lavorazione.
- **Logo di White N'More** (`public/images/partners/white-n-more.png`): il
  cliente non aveva un file logo, solo un volantino promozionale (foto del
  negozio + testo + contatti). Ritagliata solo la fascia con la scritta
  "WHITE N'MORE di Malvestuto Melita", stesso trattamento di trasparenza del
  punto sopra, poi **aggiunto padding verticale trasparente** prima del
  salvataggio: il ritaglio grezzo era un'unica riga di testo con un rapporto
  larghezza/altezza di circa 22:1, che dentro il riquadro `h-32` a `object-
  contain` si sarebbe rimpicciolito a pochi pixel di altezza per stare nella
  larghezza della card. Portato a ~4.75:1 aggiungendo margine trasparente
  sopra e sotto (non ai lati, la larghezza non è il vincolo), verificato a
  scala di card reale prima di salvare.
- **Logo di Nerocaffè** (`public/images/partners/nerocaffe.png`): problema
  opposto ai due punti sopra — il file arrivava già con sfondo trasparente,
  ma il logotipo (testo con texture "graffiata") è bianco/grigio chiaro,
  pensato per stare su sfondi scuri: sul riquadro crema del logo sarebbe
  stato quasi invisibile, esattamente come lo era su una preview a sfondo
  bianco. Non essendoci una variante scura fornita dal cliente ("è questo il
  logo, purtroppo"), risolto via `sharp` **senza** toccare il peperoncino a
  colori accanto al testo: letti i pixel raw, invertiti solo quelli a bassa
  saturazione (differenza max-min tra i canali RGB sotto una soglia — il
  testo, grigio/bianco neutro) lasciando intatti quelli saturi (il rosso e
  il verde del peperoncino). L'inversione ha convertito il bianco quasi puro
  in un nero quasi puro mantenendo la texture graffiata del font, con lo
  stesso effetto di un logotipo disegnato apposta in nero.
  **Corretto il 2 agosto 2026** ("il logo tocca i bordi", segnalato due volte
  dal cliente con screenshot): il primo giro di `sharp` chiudeva con `.trim()`,
  che rimuove **tutto** il margine trasparente fino al bounding box esatto del
  contenuto (verificato via scansione pixel: il bordo del logotipo toccava
  l'estremo di tutti e quattro i lati del canvas, 0px di margine proprio). Con
  un'immagine così, il margine visivo a schermo dipende **solo** dal rapporto
  larghezza/altezza del riquadro `h-32` rispetto a quello del logo: a
  determinate larghezze di card il riquadro diventa vincolato dall'altezza
  invece che dalla larghezza, e il logo arriva a riempire i 128px di altezza
  bordo a bordo (il `p-4` del contenitore resta l'unico margine, appena 16px).
  Stesso identico problema — e stessa causa — già risolto per White N'More
  (vedi punto sopra) ma non applicato qui al primo giro. Fix: aggiunto margine
  trasparente incorporato nel file con `sharp().extend()` (40px sopra/sotto,
  30px ai lati, alla risoluzione nativa), portando il rapporto larghezza/
  altezza del logo da 3.99:1 a 3.22:1 — verificato in browser da 375px a
  1920px di viewport, margine visibile su tutti i lati a ogni larghezza.
- **Loghi di Ristorante Clemente e Cocco Pelletterie** (30 settembre 2026,
  entrambi fascia 10%, descrizioni ricavate dai rispettivi siti ufficiali).
  Clemente non aveva un file logo: **ritagliato da una foto del biglietto da
  visita** (`IMG_3383` sul Desktop del cliente), luminanza convertita in
  canale alpha con glifi in nero pieno (stesso principio della trasparenza
  di Cafè Piazza Tresca), ingrandito ×3 lanczos prima della soglia per bordi
  puliti, e **raddrizzato di 1.68°**: il biglietto nella foto era inclinato
  e il logo risultava storto (segnalato dal cliente). L'angolo è misurato sul
  bordo superiore della ciotola, che nel marchio è orizzontale. Cocco arriva
  dal sito ufficiale (`logo_cocco-pelletterie.png`, già trasparente, colore
  bruno leggibile sul crema): solo `trim()` + margine trasparente con
  `extend()`, per non ripetere il problema "logo che tocca i bordi" di
  Nerocaffè.
- **`websiteUrl` opzionale** rende l'intera scheda un link (`target="_blank"`)
  verso il sito o il profilo social del partner; se assente la scheda resta
  statica (`<div>` invece di `<a>` — stesso contenuto, il branch sceglie
  l'elemento, non lo stile). Cafè Piazza Tresca punta al proprio profilo
  Facebook, White N'More al proprio profilo Instagram (nessuno dei due ha un
  sito), Nerocaffè al proprio sito (realizzato in passato dallo stesso
  studio), inLumine Studio al proprio sito (`inlumine.it`).
- **Nessun `eyebrow`** sulla `SectionHeading`: come `Amenities`, la riga sotto
  il wordmark della Hero (`pageHeroes.partner.claim`, "Vantaggi Esclusivi")
  copre già quel ruolo, un'etichetta aggiuntiva era ridondante — convenzione
  non applicata a `Location`, che la usa (`eyebrow="Posizione"`), inconsistenza
  nota ma non ancora risolta lì.
- **Griglia a celle divise da hairline** (`gap-px` su `bg-cream/10`, sfondo
  scuro `bg-ink`) **dentro ogni fascia**, non più su tutti i partner insieme:
  pensata per restare equilibrata con poche voci per fascia (3-6), non per
  decine di partner — da rivedere se una singola fascia crescesse molto oltre
  quella scala.

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

### Pagina 404

Aggiunta il 6 agosto 2026, giorno della messa online (prima non esisteva: gli
URL sbagliati mostravano la pagina 404 generica di Next, senza logo né
lingua). Due livelli distinti, non uno solo, perché questo sito ha **due
root layout separati** ((it) ed en, vedi § Multilingua) e non uno unico da
cui comporre un 404 completo — verificato sia sulla documentazione ufficiale
(`node_modules/next/dist/docs/.../not-found.md`, che cita esplicitamente
"multiple root layouts... no single layout to compose a global 404 from"
come caso limite) sia empiricamente: prima di aggiungere il secondo livello,
un URL a caso digitato male (`/pagina-inesistente`) cadeva comunque sulla
404 generica di Next nonostante `not-found.tsx` esistesse già nei due
alberi — perché quel file cattura solo `notFound()` lanciato **dentro** una
route già risolta in quell'albero, non un URL che non corrisponde a
nessuna route da nessuna parte.

- **`(it)/not-found.tsx` e `en/not-found.tsx`** — chrome completo
  (StickyHeader/Footer, perché vivono dentro il rispettivo root layout),
  rendono `<NotFound locale="..." />` (`components/sections/NotFound.tsx`).
  Oggi non esiste alcun `notFound()` esplicito nel codice (le route con
  `showFullNav = false` usano `redirect()`, non `notFound()`), quindi questi
  due file non sono raggiungibili da un click reale al momento — restano
  comunque corretti da avere, pronti per il giorno in cui una route
  dinamica (es. un futuro `/partner/[slug]`) dovesse chiamare `notFound()`
  per uno slug inesistente.
- **`global-not-found.tsx`** (alla radice di `app/`, fuori da entrambi gli
  alberi) — cattura invece **qualsiasi URL che non corrisponde a nessuna
  route**, in nessuna delle due lingue: è il caso pratico più comune (link
  rotto, URL digitato male). Richiede il flag sperimentale
  `experimental.globalNotFound: true` in `next.config.ts` — sperimentale ma
  è la soluzione che i docs stessi indicano per lo scenario "root layout
  multipli", non un workaround improvvisato. **Bypassa entrambi i root
  layout**: niente StickyHeader/Footer, deve importare da sé `globals.css`
  (altrimenti le classi Tailwind come `bg-terracotta` non avrebbero nessuna
  regola CSS caricata in pagina) e non carica i font custom via `next/font`
  — scelta deliberata, non dimenticanza: i docs stessi suggeriscono "a
  simpler font family" per una pagina che in pratica quasi nessuno vede
  davvero, `font-sans` di Tailwind (system-ui) basta ed evita di appesantire
  l'unica pagina del sito priva di chrome. **Bilingue in un'unica pagina**:
  non può sapere quale lingua intendesse chi ha sbagliato URL (nessun
  `middleware.ts` in questo progetto per leggere il pathname prima del
  routing), quindi mostra l'italiano in evidenza (stessa convenzione di
  `x-default` nella sitemap) con l'inglese come riga secondaria sotto un
  separatore, invece di indovinare.

### Placeholder immagini

Non tutte le foto reali sono ancora disponibili. `src/lib/content.ts` espone
i sorgenti come `string | undefined` — quando sono `undefined` i componenti
mostrano `ImagePlaceholder` invece di un `next/image` rotto:

| Campo | Usato da | Stato |
|---|---|---|
| `heroImageSrc` | `Hero`, `About` | `/images/hero.webp` (foto reale, 6 agosto 2026 — vedi § AI upscaling sotto) |
| `positionImageSrc` | `LocationTeaser` | `/images/sulmona-piazza-garibaldi-tramonto.webp` (scatto al tramonto, dal cliente) |
| `faqImageSrc` | `Faq` | `/images/statua-di-ovidio.jpg` (fondo della colonna editoriale) |
| `homeIntroImageSrc` | `HomeIntro` | foto reale (6 agosto 2026), riusa il portone d'ingresso già in Galleria |
| `pageHeroes.comfort.imageSrc` | `Hero` (su `/servizi-comfort`) | foto reale (6 agosto 2026), riusa una foto già in Galleria |
| `pageHeroes.galleria.imageSrc` | `Hero` (su `/galleria`) | foto reale (6 agosto 2026), riusa una foto già in Galleria |
| `galleryImages[].src` | `Gallery` | 17 foto reali (`public/images/gallery/`) |

Tutti i campi immagine della home sono ora valorizzati: nessun `ImagePlaceholder`
resta più nel percorso principale del sito.

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

### AI upscaling per foto a bassa risoluzione (Real-ESRGAN)

Le foto ricevute il 6 agosto 2026 (cartella "galleria" sul Desktop del
cliente) sono export WhatsApp: compressione pesante, spesso sotto i 1600px
sul lato lungo — inadatto a una Hero a piena pagina (`min-h-dvh`, `object-
cover`), che su schermi grandi avrebbe ingrandito l'immagine oltre la sua
risoluzione nativa con sfocatura visibile (il sito non ha ottimizzazione
lato server, `images.unoptimized: true`, quindi nessuna rete di sicurezza).

Nessun tool di AI upscaling era installato sulla macchina (né Python/pip,
né un binario) nonostante fosse stato usato in un altro repo — probabilmente
un ambiente diverso. Scaricare l'intera catena Python + PyTorch + pesi del
modello sarebbe stato pesante (Python stesso non era installato, solo lo
stub dello Store). Usato invece **`realesrgan-ncnn-vulkan`**
([xinntao/Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN), rilascio
`v0.2.5.0`, non l'ultimo tag del repo wrapper che manca dei modelli):
binario standalone (~45 MB con i modelli inclusi), nessuna dipendenza
Python, accelerato via Vulkan — sulla GPU disponibile (RTX 5090) un upscale
×4 con il modello `realesrgan-x4plus` (generico, adatto a foto reali, non
`-anime`) impiega pochi secondi. Processo: upscale ×4 con
`realesrgan-ncnn-vulkan.exe -n realesrgan-x4plus -s 4`, poi ridimensionato
via `sharp` alla risoluzione finale voluta (downscale dopo l'upscale AI
produce un risultato più pulito del solo upscale diretto, lo downscale
finale fa da anti-aliasing) e convertito in WebP q92.

- **`heroImageSrc`**: sorgente 1351×760 → upscale ×4 (5404×3040) → salvato
  così com'è (`hero.webp`, nessun downscale: risoluzione comunque utile per
  una Hero a piena pagina).
- **`pageHeroes.comfort.imageSrc`** (riusa la stessa foto di
  `galleryImages`, "il balcone di una delle camere"): sorgente 1600×1064 →
  upscale ×4 (6400×4256) → downscale a 2400px di larghezza → sostituisce il
  file esistente in Galleria (stesso asset, qualità migliorata per
  entrambi gli usi, non duplicato).
- **`pageHeroes.galleria.imageSrc`** (riusa la stessa foto di
  `galleryImages`, "la camera matrimoniale con il balcone aperto"): stesso
  processo e stessa risoluzione finale (sorgente 1600×1064 → upscale ×4 →
  downscale a 2400px di larghezza), stesso principio di riuso dell'asset
  condiviso invece di duplicarlo.

Il binario e i modelli non sono conservati nel repo (scaricati in una
cartella temporanea ed eliminati dopo l'uso, stesso approccio delle
conversioni font e degli script `sharp` usa-e-getta per i loghi partner).

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

Favicon e icone passano dalle **convenzioni file dell'App Router**
(`icon.svg`/`icon.png`/`apple-icon.png` in `src/app/`); tutto il resto
(title, description, Open Graph, canonical, hreflang) passa da `metadata`
export scritti a mano, **completi su ogni singolo segmento** — vedi il bug
sotto sul perché non ci si affida al merge automatico fra layout e pagina.

| File | Cosa produce |
|---|---|
| `icon.svg` + `icon.png` (32px) | favicon; l'SVG copre i browser moderni, il PNG quelli che non lo supportano |
| `apple-icon.png` (180px) | icona per la schermata home iOS |
| `app/opengraph-image.jpg` (1200×630) + `.alt.txt` | preview social generica (la camera da letto), per le pagine senza foto dedicata |
| `public/images/opengraph/la-dimora.jpg` / `posizione.jpg` | preview dedicate per quelle due pagine — asset statici, non convenzione-file (vedi bug sotto) |
| `sitemap.ts` | `/sitemap.xml`, 24 URL (12 route × 2 lingue) con `alternates.languages` (incluso `x-default`) per coppia |
| `robots.ts` | `/robots.txt`, che punta alla sitemap |

`metadata` in ogni `layout.tsx` definisce `metadataBase` (obbligatorio:
senza, gli URL Open Graph resterebbero relativi e i social non li
risolvono), `title` con `template` per le sottopagine, `twitter: { card:
"summary_large_image" }` (la card pesca da `og:image`, non serve un
`twitter-image` separato) e un `openGraph` di default per l'home (nessun
`page.tsx` dedicato lì). Ogni `page.tsx` sotto imposta il proprio `title`/
`description` **e il proprio `openGraph`**, costruito con **`buildOpenGraph()`**
(`src/lib/seo.ts`): prende locale, percorso neutro, titolo, descrizione e
foto della pagina e restituisce un oggetto `openGraph` completo
(`type`/`locale`/`url`/`siteName`/`title`/`description`/`images`).

### Bug corretto (5 agosto 2026): anteprime social sbagliate su quasi tutte le pagine

Verificato con `curl` sull'HTML servito da `next start` (non solo dedotto
dai docs) durante un giro di pulizia pre-lancio. Due problemi distinti,
scoperti in sequenza:

1. **Titolo/descrizione/URL sbagliati su ogni pagina tranne l'home.** Solo i
   due root layout dichiaravano un blocco `openGraph` (con titolo/descrizione/
   URL dell'home scritti lì dentro); ogni `page.tsx` sotto impostava solo
   `title`/`description` a livello radice (che aggiornano correttamente
   `<title>` e `meta description`) ma **non** il proprio `openGraph`. Per
   Next.js, un segmento che non dichiara `openGraph` eredita **quello
   dell'antenato più vicino così com'è**, non solo per i campi mancanti
   (confermato sulla sezione "Merging" di
   `node_modules/next/dist/docs/.../generate-metadata.md`, poi verificato
   empiricamente). Condividendo `/partner` o `/la-dimora` su WhatsApp o
   Facebook, la card mostrava titolo, descrizione e URL **dell'home** — su un
   sito che vive di condivisione diretta di link, un problema serio, non
   cosmetico.
2. **Nessuna immagine nella card della home**, in nessuna lingua (`curl`
   sull'HTML: zero tag `og:image`). E le due pagine con foto dedicata
   (`en/la-dimora`, `en/posizione`, le uniche che già dichiaravano un
   `openGraph.images` manuale) puntavano a un percorso fisso scritto a mano
   (`/la-dimora/opengraph-image.jpg`), assumendo che la convenzione-file di
   Next servisse lì l'immagine. Per le route **annidate** Next genera invece
   un percorso con hash casuale, ricalcolato a ogni build (es.
   `/la-dimora/opengraph-image-1l2mkp.jpg?...`); il percorso "pulito" senza
   hash **risponde 404** (verificato con `curl`). Le due pagine inglesi
   condividevano quindi un'anteprima con immagine rotta. Il file alla radice
   di `app/` (`/opengraph-image.jpg`, senza segmenti) è invece stabile —
   200 verificato a ogni build — perché non passa dalla stessa route
   dinamica.

**Fix**: le due foto dedicate sono uscite dalla convenzione-file di Next e
sono diventate asset statici normali in `public/images/opengraph/` (un
percorso `public/` è per definizione stabile, niente hash; `.alt.txt` non
serve più, l'alt si passa come parametro di codice a `buildOpenGraph()`).
Ogni `metadata` export (12 pagine + 2 root layout per l'home) ora dichiara
il proprio `openGraph` completo: foto dedicata per La Dimora e Posizione,
`/opengraph-image.jpg` (file di convenzione, verificato stabile) per le
pagine senza scatto proprio (home, Comfort & Informazioni, Galleria,
Partner). Verificato per tutte le 12 route in entrambe le lingue con
`npm run build && npm start` + `curl`, controllando `og:title`/
`og:description`/`og:url`/`og:image` uno per uno e lo status HTTP di ogni
immagine referenziata.

### hreflang `x-default`

Aggiunto lo stesso giorno a ogni `alternates.languages` (12 pagine) e alla
sitemap, mancava del tutto prima: punta sempre alla versione italiana
(lingua di default, senza prefisso), per chi arriva da un browser con una
lingua diversa da IT/EN — convenzione raccomandata da Google per siti
multilingua.

Ogni pagina imposta solo `title` nel proprio `metadata` (es. `"La Dimora"`,
mai `"La Dimora | Cuore della Città"`): il `template` in `layout.tsx` aggiunge
già il suffisso. Scriverlo in entrambi i posti produceva un titolo doppio nel
tab del browser. Lo stesso vale per `buildOpenGraph()`: lì il suffisso va
aggiunto a mano nel `title` passato (`openGraph.title` non passa dal
`template`, solo il tag `<title>` lo fa), altrimenti l'anteprima social
mostra il titolo senza il nome del sito.

Il dominio vive in **`siteUrl`** (`content.shared.ts`) ed è l'unico punto da
cambiare: lo leggono `metadataBase`, la sitemap e robots. Oggi è
`https://www.dimoracuoredellacitta.it` — **confermato dalla proprietaria il
30 luglio 2026** (era prima un placeholder, `cuoredellacitta.it` senza
"dimora"), ma il dominio **non è ancora acquistato né pubblicato** — vedi
TODO 8 in `HANDOFF.md`.

La **favicon** è un marchio disegnato a mano (`icon.svg`): fondo terracotta,
casa in tratto avorio e la sagoma di una statua dentro l'arcata — casa +
statua, i due segni chiesti dal cliente per evocare Sulmona. È stata verificata
rasterizzando a 32px e 16px: a 16px la statua diventa una macchia e regge solo
la casa, che è il segno portante. Se si ridisegna, va rifatta quella verifica —
un marchio che funziona a 128px non dice nulla su come si comporta in una tab.

La sitemap **si adatta a `showFullNav`**: finché è `false` le altre route
reindirizzano alla home, quindi elencarle segnalerebbe a Google pagine che
rimandano altrove. Con `showFullNav = true` entrano automaticamente — tranne
la voce "Homepage" di `navLinks` (punta a `/`), esclusa esplicitamente per non
duplicare l'entry `home` già presente.

`siteConfig.metaDescription` (IT ed EN, `content.it.ts`/`content.en.ts`) è
**tenuto sotto i ~155 caratteri**: oltre, Google tronca lo snippet in SERP.
Accorciato il 5 agosto 2026 (era 167/175 caratteri) nello stesso giro di
pulizia SEO — stesso criterio già in uso per `metaTitleSuffix` (~60
caratteri).

### Dati strutturati (JSON-LD)

`src/lib/structuredData.ts` esporta tre funzioni, tutte pure e senza stato:
ricalcolano l'oggetto ogni volta leggendo da `content.ts`, quindi **si
aggiornano da sole** quando cambiano i contenuti reali (indirizzo, contatti,
comfort, FAQ) — non serve toccare questo file quando cambia un dato che già
esiste altrove nel sito. Va toccato solo per aggiungere un tipo di dato che
oggi il sito non ha ancora (es. recensioni, tariffe, orari di apertura di una
reception).

- **`lodgingBusinessJsonLd(locale)`** — tipo `LodgingBusiness`, montato una
  sola volta in ciascuno dei due root layout (`(it)/layout.tsx`,
  `en/layout.tsx`, come `StickyHeader`/`Footer`): è l'entità del sito,
  presente su ogni pagina non solo in home. Legge `siteConfig`
  (nome, telefono, email, `instagramUrl`), `addressParts` (indirizzo
  scomposto in `PostalAddress`), `propertyCoordinates` (`geo`,
  `GeoCoordinates`), `propertyFacts` (check-in/checkout, `petsAllowed`,
  `numberOfRooms`) e `amenitiesPage.comfortGroups` (mappati su
  `amenityFeature`, un `LocationFeatureSpecification` per voce).
  `addressParts` e `propertyFacts` (`content.ts`) esistono solo per questo:
  duplicano in forma strutturata dati già scritti come prosa altrove
  (`siteConfig.addressLine`, i testi di `amenitiesPage`/`faqs`) — i commenti
  su ciascuno segnalano quale prosa va tenuta in sync se cambia il fatto
  sottostante (es. cambia il numero di camere). **`propertyCoordinates` è una
  stima**: geocoding di `siteConfig.addressLine` via Nominatim/OpenStreetMap
  (precisione di via, non di numero civico), non un dato fornito dal cliente
  — da sostituire con le coordinate esatte quando arriverà il profilo Google
  Business (vedi TODO in `HANDOFF.md`).
- **`faqPageJsonLd(locale)`** — tipo `FAQPage`, montato solo nelle due home
  (`(it)/page.tsx`, `en/page.tsx`): è l'unica pagina dove il pannello FAQ è
  davvero visibile, i dati
  strutturati devono rispecchiare il contenuto reso e non esistere altrove nel
  sito senza contenuto corrispondente. Filtra `faqs` scartando le domande
  senza risposta reale (`answer` `undefined`, quelle ancora "Risposta in
  arrivo." nell'accordion): un `FAQPage` con risposte segnaposto sarebbe dato
  falso in pasto a Google, non solo un placeholder visivo. Se un giorno tutte
  le risposte restassero `undefined`, la funzione ritorna `null` e lo script
  non viene reso — gestito in `page.tsx` con un controllo prima del render.
- **`breadcrumbListJsonLd(locale, href)`** — tipo `BreadcrumbList` a due
  livelli (Homepage > pagina corrente): il sito non ha gerarchie più
  profonde. `href` è il percorso neutro (senza prefisso di lingua, come in
  `navRoutes`) e deve combaciare con una voce di `navLinks`, da cui la
  funzione legge l'etichetta — così titolo del breadcrumb e voce di menu non
  possono disallinearsi. Montato in tutte le pagine con contenuto reale
  sotto la Hero (`la-dimora`, `servizi-comfort`, `posizione`, `galleria`,
  `partner`, entrambe le lingue), non in home (è già la radice).
- Resi con `<script type="application/ld+json" dangerouslySetInnerHTML={{
  __html: JSON.stringify(...) }} />`: JSON-LD non deve stare per forza in
  `<head>` (Google lo legge ovunque nell'HTML), quindi vive dove ha senso nel
  componente — dentro `<body>` in `layout.tsx`, in cima al JSX in `page.tsx`.
- **`siteConfigShared.email`** (`info@dimoracuoredellacitta.it`) è reale,
  **confermata dalla proprietaria il 5 agosto 2026** (era allineata al
  dominio come ipotesi dal 2 agosto, non più un placeholder da quel
  momento) e finisce anche nei dati strutturati. `instagramUrl` è
  anch'esso quello reale della struttura, corretto il 2 agosto 2026 da
  `instagram.com/cuoredellacittadimora` a
  `instagram.com/dimoracuoredellacitta` (la proprietaria aveva comunicato
  il link sbagliato la prima volta).

## Contatti rapidi

`src/lib/contact.ts` genera i link `tel:` e `https://wa.me/...` a partire dai
valori in `siteConfigShared` (`content.shared.ts`). Telefono/WhatsApp,
indirizzo, Instagram ed email sono tutti recapiti reali, confermati dalla
proprietaria. Il ramo Telegram è stato rimosso con `ContactCta`, che era
l'unico a usarlo.

Lo stesso file espone anche `mapsEmbedSrc()` e `mapsDirectionsHref()`, usati
da `Location` (§ "Dove ci Troviamo"): entrambi costruiscono l'URL Google Maps
dal solo `siteConfig.addressLine`, in attesa del profilo Google Business
della struttura (non ancora pubblicato).

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
  (`wa.me`, `tel:`, `mailto:`, Instagram). Eccezione nota: in `MobileMenu.tsx`
  le voci di `navLinks` restano `<a href={link.href}>` anche verso route
  interne — la regola non lo intercetta perché `link.href` è un'espressione,
  non una stringa letterale, ma resta un `<a>` a tutti gli effetti. Da
  convertire a `<Link>` se un giorno si tocca di nuovo quel file.
- Niente lineette tipografiche (`—`/`–`) nei testi del sito: solo trattini
  (`-`). Verifica con `grep -rn "[—–]" src/lib/content.ts` prima di considerare
  chiuso un intervento sui copy.
- Niente `setState` dentro `useEffect`: la regola
  `react-hooks/set-state-in-effect` lo segnala come errore. Per il classico
  flag "sono sul client" (serve a `MobileMenu` per il portale) si usa
  `useSyncExternalStore` con snapshot server `false` e client `true`.
- Niente commenti che spiegano cosa fa il codice — solo dove c'è un motivo
  non ovvio (es. i `TODO` in `content.ts` per i placeholder).
- Un file, una responsabilità: ogni blocco di contenuto è un componente
  dedicato in `components/sections/`, montato dalla propria route in `app/`.
- `npm run lint` usa ESLint flat config (Next.js 16 ha rimosso `next lint`).
