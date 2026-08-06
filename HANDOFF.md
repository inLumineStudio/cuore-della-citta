# Handoff — Dimora "Cuore della Città"

Stato al 6 agosto 2026, **giorno previsto per la messa online**. Riferimento:
preventivo inLumine Studio del 22 luglio 2026. Il sito è **uscito dalla
bozza** (`showFullNav = true`): tutte le route sono raggiungibili e
cliccabili, non solo la homepage — si passa dalla Fase 1 (UI/UX) alla Fase 2
(contenuti reali) del workflow concordato nel preventivo. Il sito è ora
anche **bilingue** (italiano + inglese, `/en/...`), vedi § sotto.

Il 5 agosto 2026 è stato fatto un **giro di pulizia pre-lancio**: scansione
dell'intera codebase per codice morto/file in disuso (poco da rimuovere, il
repo era già pulito - solo un tipo TypeScript mai importato) e un audit SEO
approfondito che ha trovato e corretto un bug reale nelle anteprime social
(titolo/descrizione/immagine sbagliati su quasi tutte le pagine) — vedi
`CLAUDE.md` § SEO e metadati per il dettaglio tecnico completo. Il 6 agosto
2026 la Galleria si è ampliata da 4 a 17 foto reali e sono state riempite
le ultime foto placeholder del sito (Hero della home, "La Nostra Storia",
Hero di "/servizi-comfort" e di "/galleria") — nessun `ImagePlaceholder`
resta più nel percorso principale. Alcune foto sorgente, a bassa risoluzione (export
WhatsApp), sono state ingrandite con AI (Real-ESRGAN) prima dell'uso — vedi
`CLAUDE.md` § AI upscaling.

## Cosa esiste oggi

Sito multi-pagina (Next.js 16 + TS + Tailwind v4), componentizzato, con
routing reale (non single-page ad anchor):

- **`/`** — Hero full-bleed con **lockup centrato a tutte le larghezze**, sul
  modello del riferimento Six Senses scelto dal cliente: niente barra promo,
  solo hamburger a sinistra e CTA "Prenota ora" a destra direttamente sulla
  foto (nella Hero non c'è nav: le voci compaiono nello `StickyHeader` appena
  si scrolla), al centro wordmark, "Sulmona, Abruzzo", claim e sottotitolo (il
  sottotitolo resta visibile anche su mobile, a corpo ridotto) — e in fondo
  l'indicatore di scroll. Segue lo **scroll orizzontale desktop**: tre
  pannelli a piena schermata — "La Nostra Storia", "Dove ci Troviamo" e le
  **FAQ** (accordion su crema accanto al blocco editoriale sulla foto della
  statua di Ovidio, tutte e nove le risposte reali) — che scorrono lateralmente
  mentre si usa la rotellina in verticale (vedi sotto)
- **`/la-dimora`** — la **stessa Hero della home**, riusata con un'altra foto
  (Piazza Garibaldi di giorno) e un claim diverso ("La Nostra Storia" al posto
  di "Arrivare. Vivere. Restare.", senza sottotitolo), seguita dal racconto
  esteso della Dimora (il "director's cut" del teaser di `HomeIntro`, tono
  istituzionale non più personale/familiare - riscritto il 27 luglio 2026 su
  richiesta del cliente) e da una CTA finale a piena larghezza con due
  bottoni distinti — "Verifica
  disponibilità" (chiamata) e "Contattaci su WhatsApp"
- **`/servizi-comfort`** — Hero + **`Amenities`**, con i contenuti reali forniti
  dalla proprietaria: due blocchi ("Comfort & Dotazioni" e "Informazioni &
  Logistica", ciascuno diviso in tre gruppi tematici) e una CTA finale con
  chiamata/WhatsApp. È la prima delle quattro sezioni inizialmente vuote a
  uscire da quello stato.
- **`/posizione`** — Hero (foto dedicata: gli archi dell'acquedotto medievale
  di Sulmona) + **`Location`**: elenco punti di interesse con un cenno
  editoriale su ciascuno (compresa la statua di Ovidio, nato a Sulmona), una
  mappa illustrativa dell'Abruzzo disegnata a partire da dati geografici
  reali (`AbruzzoMap`, confini di pubblico dominio da Wikimedia Commons) con
  un pallino su Sulmona con la scritta "Sulmona" in un badge sempre visibile
  (anche su mobile) più un pallino più piccolo e smorzato per ciascuno dei
  quattro capoluoghi di provincia (posizioni calcolate via geocoding
  Nominatim, non a occhio), indirizzo e contatti ripetuti con link
  "Indicazioni stradali", e la mappa Google Maps
  vera basata sull'indirizzo. È la seconda delle quattro sezioni inizialmente
  vuote a uscire da quello stato.
- **`/galleria`** — Hero + **`Gallery`**, con **17 foto reali** in tutto: le
  quattro del 31 luglio 2026 (camera matrimoniale, seconda camera, soggiorno
  con angolo cottura, scorcio del centro storico) più 13 aggiunte il 6
  agosto 2026 (facciata esterna della Dimora, portone d'ingresso, ingresso
  interno, cucina, entrambe le camere, balconi, bagno). Layout a cascata
  (masonry, non griglia uniforme), foto cliccabili per una versione
  ingrandita — senza didascalia, tolta su richiesta della cliente. Non è più
  tra le sezioni smontate — vedi `CLAUDE.md` § "Galleria".
- **`/partner`** — Hero + **`Partners`**, con quattro partner reali: **Cafè
  Piazza Tresca** (tabaccheria & ricevitoria con bar colazioni, Sulmona,
  fascia 20% sulla colazione, scheda verso il suo profilo Facebook),
  **inLumine Studio** (lo studio che ha realizzato il sito — consulenza web,
  siti, eCommerce, identità digitale, design, fascia 10%, scheda verso
  inlumine.it) e, dal 1 agosto 2026, **White N'More** (camiceria uomo,
  Sulmona, fascia 20%, scheda verso il suo profilo Instagram) e
  **Nerocaffè** (pub irlandese a 7 km da Sulmona, fascia 10% sulla cena,
  scheda verso pubnerocaffe.it — sito realizzato in passato dallo stesso
  studio). La sezione è organizzata per **fasce di sconto** (10%, 15%, 20%,
  omaggi gratuiti) invece che come griglia piatta —
  vedi `CLAUDE.md` § "I Nostri Partner". Non è più tra le sezioni smontate.

La nav (`navLinks` in `content.ts`) ha oggi sei voci: **Homepage** (punta a `/`),
La Dimora, Galleria, Comfort & Informazioni (rinominata da "Servizi & Comfort",
l'URL `/servizi-comfort` non è cambiato), Dove ci Troviamo, I Nostri Partner.

La riga sotto il wordmark nella Hero di ogni sezione ha un testo proprio,
diverso dall'etichetta di menu, tutti in `pageHeroes` (`content.ts`):

| Route | Voce di menu | Riga nella Hero |
|---|---|---|
| `/la-dimora` | La Dimora | La Nostra Storia |
| `/galleria` | Galleria | La Dimora, Senza Filtri |
| `/servizi-comfort` | Comfort & Informazioni | Il Tuo Soggiorno |
| `/posizione` | Dove ci Troviamo | La Posizione & Il Territorio |
| `/partner` | I Nostri Partner | Vantaggi Esclusivi |

**Nota storica sullo `StickyHeader`** (risolta il 31 luglio 2026, quando
`/galleria` ha ricevuto contenuto sotto la Hero, ultima route a farlo): finché
una pagina restava alta solo Hero + footer, la soglia dell'85% del viewport
non si raggiungeva mai scrollando e la barra crema non compariva — non un
bug, solo la conseguenza naturale di non avere contenuto sotto. Oggi tutte le
route la superano.

Le FAQ **non hanno più una pagina dedicata**: sono il pannello di chiusura
della home (accordion su fondo scuro/crema) e la voce è stata tolta dal menu.
`src/app/faq/` è stata eliminata, e con essa il componente `ContactCta` che
chiudeva quella pagina, la primitiva `Button` (la usava solo lui) e l'helper
`telegramHref()`. Rimossi anche gli asset non più referenziati
(`hero-temp.jpg`, `posizione.jpg`, la versione Wikimedia di Piazza Garibaldi).

> **`showFullNav`** in `content.ts` è oggi **`true`**: tutte le route sono
> raggiungibili e le voci di nav cliccabili. Rimettendolo a `false` si torna
> alla bozza (solo homepage, le altre route reindirizzano a `/`) — con
> un'eccezione: la voce "Homepage" resta comunque cliccabile, perché la home
> esiste anche in bozza.

`StickyHeader` e `Footer` sono globali (montati in `app/layout.tsx`): sulle
route elencate in `routesWithHero` (oggi tutte, perché tutte montano una Hero)
lo header resta nascosto finché non si scrolla oltre la Hero; su una eventuale
pagina senza Hero sarebbe visibile da subito.
Lo header porta la CTA **"Prenota ora"** (WhatsApp) accanto alla nav, così la
prenotazione è a un click da qualsiasi pagina e non solo dalla Hero, che ha la
propria CTA gemella ma solo su `/`. Il suo hamburger (sotto `md`) è a sinistra,
come quello della Hero: il drawer condiviso (`MobileMenu`) entra da sinistra,
quindi il trigger deve stare dallo stesso lato in entrambi i punti in cui
compare.

Il drawer (`MobileMenu`) ha una nuova intestazione — X sola sulla prima riga,
nome del sito sulla riga sotto, sul modello del drawer di Six Senses Rome — ed
è stato corretto un bug per cui **su desktop cliccare l'hamburger bloccava lo
scroll senza aprire nulla di visibile**: il pannello aveva ancora `md:hidden`
da quando l'hamburger era mobile-only, e con l'hamburger della Hero ora
visibile a ogni larghezza quel residuo lasciava lo stato "aperto" attivo (e lo
scroll del body bloccato) dietro un pannello invisibile. Dettagli in
`CLAUDE.md` § Drawer di navigazione.

**Scroll orizzontale della home** (`components/ui/HorizontalScroller.tsx`):
riproduce l'effetto del riferimento di design fornito dal cliente
(sylverrappresentanze.it, che lo ottiene con GSAP ScrollTrigger) ma in JS
puro, **senza aggiungere dipendenze**. Da `lg:` in su i pannelli sono
`100vw × 100dvh` e traslano 1:1 con lo scroll; sotto `lg` l'effetto è
disattivato e i pannelli si impilano in verticale. Dettagli in `CLAUDE.md`.

**Hero**: occupa sempre l'intero viewport (`min-h-dvh`) e ha **un solo
impaginato a tutte le larghezze** — il lockup centrato, non più un layout
desktop separato da quello mobile (vedi `CLAUDE.md` § Hero). La scrollbar del
sito è in stile classico, track scuro e thumb bianco.

Direzione estetica validata con il cliente: stile editoriale/caldo ispirato
al riferimento "BEPD:HOTEL". Font, tutti forniti dal cliente tranne Newsreader:
**Megdira** — **in prova** — sul wordmark e sul claim della Hero; **Flaviotte**
su tutti gli altri titoli; **General Sans** per copy e interfaccia;
**Newsreader** per il drawer mobile. Work Sans,
Bodoni Moda e Inter, usati nelle bozze precedenti, sono stati scartati e non
vengono più caricati. Palette terracotta/ambra. Dettagli in `CLAUDE.md`.

Micro-interazioni della nav e CTA: le voci di menu hanno un **filetto che si
espande** all'hover (`components/ui/NavLink.tsx`, ha sostituito l'hover corsivo)
e le CTA "Prenota ora" sono **sempre piene** in terracotta, non più outline.
Un pulsante in basso a destra riporta in cima alla pagina (`ScrollToTop`).
Il cursore custom a quadrato (`CursorSquare`, provato con `mix-blend-mode:
difference`) è stato rimosso: il cursore è di nuovo quello di sistema.
Dettagli in `CLAUDE.md`.

**Animazioni di ingresso** (`components/ui/Reveal.tsx`): fade + micro-movimento
quando testi e immagini entrano nel viewport, valutata come alternativa
"soft" a GSAP — niente dipendenze nuove, `IntersectionObserver` + CSS
transition. Applicata al racconto di "La Dimora", a `HomeIntro`,
`LocationTeaser` e alla colonna editoriale delle FAQ (variante "slide" per i
testi) e alle loro immagini (variante "scale", leggero ingrandimento). Non
tocca la Hero né l'accordion delle FAQ. Dettagli in `CLAUDE.md` § Animazioni
di ingresso.

**SEO on-page**: fatto, tutto tramite convenzioni file dell'App Router —
favicon disegnata (casa + statua, `icon.svg`), `apple-icon.png`, immagine di
preview 1200×630 per i social (più una dedicata per `/la-dimora` e
`/posizione`, ritagliata dalla foto reale di ciascuna Hero), Open Graph e
Twitter card, canonical, `/sitemap.xml` e `/robots.txt`. Verificato nel
`<head>` servito. Aggiunti anche i **dati strutturati JSON-LD**
(`src/lib/structuredData.ts`): `LodgingBusiness` su ogni pagina (indirizzo,
contatti, comfort, coordinate geografiche stimate via geocoding
dell'indirizzo), `FAQPage` solo in home (dove il pannello FAQ è davvero
visibile) e `BreadcrumbList` sulle pagine con contenuto reale
(`la-dimora`, `servizi-comfort`, `posizione`). Tutti si ricalcolano da
`content.ts`, quindi si aggiornano da soli quando cambia un contenuto reale —
dettagli in `CLAUDE.md` § Dati strutturati. Manca solo il
dominio definitivo in `siteUrl` — vedi TODO 8. Dettagli in `CLAUDE.md` § SEO.

> Il cliente ha chiesto di **potenziare la SEO ogni volta che si aggiungono
> contenuti nuovi**, senza bisogno di richiederlo esplicitamente ogni volta
> (2026-07-27): dati strutturati, immagini OG dedicate, coordinate, breadcrumb
> e simili vanno considerati parte del lavoro standard su ogni nuova sezione,
> non un extra da proporre a parte.

Verificato: type-check pulito (`npx tsc --noEmit`), lint pulito (`npm run
lint`), nessun errore console, testato su viewport desktop e mobile (menu
hamburger incluso) e su tutte le 12 route (6 italiane + 6 inglesi). Lo switch
lingua è stato verificato andata e ritorno pagina per pagina (non solo dalle
rispettive home), `<html lang>` corretto in entrambi gli alberi, `/sitemap.xml`
con 24 URL e `alternates.languages` per coppia IT/EN, dati strutturati JSON-LD
(`LodgingBusiness`/`FAQPage`/`BreadcrumbList`) tradotti correttamente. Lo
scroll orizzontale è stato verificato misurando la traslazione a scroll
crescente: 0 fino a fine Hero, poi lineare 1:1 fino a fondo corsa, con clamp
oltre; su mobile pin disattivato e nessun overflow orizzontale.

**Multilingua IT/EN (30 luglio 2026)**: sito tradotto in inglese, offerto nel
preventivo. Ogni route italiana ha ora una gemella su `/en/...` (stessi slug,
prefisso di lingua) con uno switch a bandierina accanto all'hamburger, in Hero
e `StickyHeader`. Implementato senza librerie i18n: route groups di Next.js
per due root layout separati (`(it)/` invisibile nell'URL, `en/` con
prefisso), che tengono il sito interamente statico — l'alternativa con
`headers()`/`proxy.ts` avrebbe forzato il rendering dinamico su ogni pagina.
Nomi propri (Sulmona, i monumenti, la citazione latina di Ovidio, l'indirizzo)
non tradotti per scelta esplicita del cliente. Sitemap, `alternates.languages`
e dati strutturati JSON-LD aggiornati per entrambe le lingue. Dettagli in
`CLAUDE.md` § Multilingua IT/EN.

**Audit codice morto (27 luglio 2026)**: nessun file, componente o export
inutilizzato nel repo — l'unica eccezione nota (`Gallery` smontato, `Partners`
lo era fino al 30 luglio) è quella documentata più sopra, non un residuo.
Trovata e corretta una cosa
sola: `sharp` (usato per le conversioni immagine, vedi § Placeholder immagini
in `CLAUDE.md`) non era mai stato in `package.json`, risultava installato solo
perché è una `optionalDependency` di `next` (per `next/image`, qui non
sfruttata: `images.unoptimized: true`) — su una macchina dove quell'installazione
opzionale fallisse silenziosamente, le conversioni WebP si sarebbero rotte
senza preavviso. Ora è una devDependency esplicita.

## Locandina pubblicitaria con QR (31 luglio 2026)

Su richiesta della cliente: un PDF A4 pronto per la stampa, consegnato a
parte (non è un asset del sito, non vive in questo repo). Riusa la foto
reale della Hero (`public/images/hero.jpg`), i font del brand (Megdira per
wordmark e claim, General Sans per copy e contatti) e la stessa palette
(`--color-cream`/`--color-ink`/overlay scuro sulla foto) — stesso trattamento
visivo della Hero del sito, non un design a parte.

- **QR statico**, non un servizio a pagamento con redirect dinamico: il link
  è codificato direttamente nell'immagine, generato in locale (libreria
  `qrcode`, nessuna chiamata a servizi esterni), verificato per-decodifica
  (libreria `jsqr`) sia isolato sia ritagliato dal PDF reso, in entrambi i
  casi risolve esattamente in `https://www.dimoracuoredellacitta.it`.
  **Attenzione**: essendo statico, se il dominio finale cambiasse andrebbe
  ristampata — oggi non c'è motivo di aspettarselo (dominio confermato dalla
  proprietaria, vedi TODO 8), ma vale la pena saperlo.
  Il QR punta al dominio **non ancora acquistato/pubblicato**: funziona solo
  da quando il sito sarà online.
- Generato con **Puppeteer** (rendering HTML→PDF headless, font e foto
  incorporati come data URI per garantire fedeltà cromatica in stampa) e
  **qrcode**/**jsqr**, installati temporaneamente con `--no-save` solo per
  questa consegna — non sono dipendenze del progetto, stesso approccio già
  usato per la conversione dei font in `.woff2` (vedi `CLAUDE.md` § Font).
  Lo script di generazione non è stato conservato nel repo: è stato uno
  script usa-e-getta, ricreabile in pochi minuti se serve una nuova versione
  (altro formato, altro testo, altra foto).
- **Blocco "Vantaggi Esclusivi"** (checklist con due righe, aggiunto su
  richiesta della cliente il 31 luglio 2026): la prima ("miglior tariffa
  garantita" prenotando dal sito) riusa copy già reale del sito
  (`amenitiesPage.ctaDescription`), nessun problema. La seconda ("Sconti
  dedicati presso le migliori attività del territorio") **promuoveva le
  convenzioni come già attive quando ancora non lo erano** — richiesta
  esplicita della cliente dopo che glielo avevo segnalato, per motivare la
  prenotazione da subito nonostante le trattative fossero ancora in corso.
  **Riallineato il 31 luglio 2026**: la sezione Partner del sito ha ora
  quattro convenzioni reali (Cafè Piazza Tresca, inLumine Studio, White
  N'More, Nerocaffè — vedi TODO 3), quindi chi scansiona il QR oggi trova
  contenuto vero dietro il tono generico "presso le migliori attività" della
  locandina, non più
  zero.

## Cosa manca / TODO prima della messa online

Tutti i placeholder sono marcati con `TODO` in `src/lib/content.ts`.

1. ~~**Foto reali**~~ — fatto per tutte. La camera (`hero.webp`, sostituita
   il 6 agosto 2026 con uno scatto reale ingrandito via AI, non più
   provvisoria — vedi `CLAUDE.md` § AI upscaling), Piazza Garibaldi al
   tramonto nel pannello "Dove ci Troviamo"
   (`sulmona-piazza-garibaldi-tramonto.webp`, fornita dal cliente il 25 luglio
   2026: PNG da 1,6 MB riconvertito in WebP q92 da 137 KB, vedi la nota sul
   formato in `CLAUDE.md` § Placeholder immagini), Piazza Garibaldi di giorno
   nella Hero di "/la-dimora" (`sulmona-piazza-garibaldi-giorno.webp`), gli
   archi dell'acquedotto medievale nella Hero di "/posizione"
   (`sulmona-acquedotto-medievale.webp`) e la statua di Ovidio come fondo
   della colonna editoriale delle FAQ (`statua-di-ovidio.jpg`).
   **La foto de "La Nostra Storia"** è stata aggiunta il 6 agosto 2026
   (riusa il portone d'ingresso già in Galleria, non più `ImagePlaceholder`).
   Anche le **foto dedicate alle Hero** di galleria e comfort sono state
   completate lo stesso giorno: "/servizi-comfort" riusa quella del balcone
   con vista sul campanile, "/galleria" riusa quella della camera
   matrimoniale con il balcone aperto sul centro storico.
2. ~~**Recapiti reali**~~ — fatto. Telefono/WhatsApp (`+39 351 496 4713`) e
   indirizzo (Via Panfilo Scudieri 1, Sulmona) sono quelli veri, **confermato
   dalla proprietaria il 30 luglio 2026**. **Instagram** è quello reale,
   **corretto il 2 agosto 2026** a `instagram.com/dimoracuoredellacitta`
   (il link ricevuto il 30 luglio, `cuoredellacittadimora`, era sbagliato).
   **Email confermata reale il 5 agosto 2026** (`info@dimoracuoredellacitta.it`):
   nessun recapito è più placeholder.
3. ~~**Contenuti delle sezioni ancora vuote**~~ — fatto per tutte. Partner
   ha ricevuto quattro partner reali: **Cafè Piazza Tresca** (tabaccheria &
   ricevitoria con bar colazioni, fascia 20% sulla colazione, 31 luglio
   2026), **inLumine Studio** (lo studio che ha realizzato il sito, fascia
   10%, 31 luglio 2026), **White N'More** (camiceria uomo, fascia 20%, 1
   agosto 2026, unico logo di partenza non professionale — un ritaglio di
   volantino anziché un file vettoriale, vedi `CLAUDE.md` § "I Nostri
   Partner") e **Nerocaffè** (pub irlandese a 7 km da Sulmona, fascia 10%
   sulla cena, 1 agosto 2026, sito web realizzato in passato dallo stesso
   studio, logo con testo bianco ricolorato via script per leggibilità sulla
   card chiara — vedi `CLAUDE.md`). **Tutte le descrizioni sono testo
   definitivo, confermato dalla proprietaria il 5 agosto 2026** (non più
   bozza). La sezione è stata anche ristrutturata a **fasce di sconto**
   (10%/15%/20%/omaggi, vedi `CLAUDE.md` § "I Nostri Partner") su richiesta
   della cliente — pronta a ricevere altri partner nella fascia ancora vuota
   (15%) non appena firmati.
   **Galleria è stata rimontata** il 31 luglio con le prime quattro foto
   reali, poi **ampliata a 17 foto** il 6 agosto 2026 (layout a cascata,
   vedi `CLAUDE.md` § "Galleria"); niente più `TODO` su `galleryImages`.
   **Comfort e Posizione erano già fatte** (`amenitiesPage`/`locationPage`
   in `content.ts`, contenuti reali).
4. ~~**Mappa**~~ — fatto: `Location` ha sia la mappa illustrativa
   dell'Abruzzo (`AbruzzoMap`) sia l'embed Google Maps vero, entrambi basati
   sull'indirizzo definitivo. Vedi `CLAUDE.md` § "Dove ci Troviamo".
5. ~~**Punti di interesse**~~ — fatto: i nomi in `pointsOfInterest`
   (`content.ts`) sono quelli reali forniti dal cliente, l'elenco è
   **ordinato per distanza crescente** (Annunziata 2 min, San Panfilo 4 min,
   statua di Ovidio ~5 min, Piazza Garibaldi 6 min) e i **tempi di
   percorrenza sono stati confermati dalla proprietaria il 30 luglio 2026**,
   stima della statua di Ovidio inclusa.
6. ~~**Font locali**~~ — ottimizzati il 30 luglio 2026: i quattro `.otf` di
   General Sans (400, 400 corsivo, 500, 600, ~186 KB in tutto) sono stati
   convertiti in `.woff2` (~97 KB, -48%) con `wawoff2`, stesso ordine di
   grandezza del risparmio già visto sulle immagini WebP. Subsetting al
   latino non fatto (nessuno strumento di subsetting disponibile in questo
   ambiente senza Python/fonttools; il guadagno aggiuntivo sarebbe comunque
   marginale rispetto alla conversione). **Licenza d'uso web non
   disponibile**: il cliente ha confermato di non avere la licenza per
   Flaviotte e General Sans (30 luglio 2026) — i font sono comunque serviti
   dal sito pubblico. Rischio da chiarire con la proprietaria prima della
   messa online: verificare presso il fornitore del kit se la licenza
   posseduta copre l'uso su un sito web pubblico (spesso distinta dalla
   licenza desktop), o procurarne una che lo copra.
7. ~~**Multilingua IT/EN**~~ — fatto il 30 luglio 2026: sito interamente
   tradotto in inglese su `/en/...` (route groups, senza dipendenze — vedi
   `CLAUDE.md` § Multilingua), con switch a bandierina accanto all'hamburger
   in Hero e `StickyHeader`. Nomi propri (Sulmona, monumenti, la citazione di
   Ovidio, l'indirizzo) non tradotti; sia Galleria (quattro foto, `alt`
   tradotto per ciascuna) sia Partner (quattro partner, categoria e
   descrizione tradotte, nomi propri no) hanno già i loro contenuti reali in
   entrambe le
   lingue, come da convenzione di `content.it.ts`/`content.en.ts`.
8. **Dominio definitivo** — confermato dalla proprietaria il 30 luglio 2026:
   sarà **`dimoracuoredellacitta.it`** (non più `cuoredellacitta.it`, il
   placeholder usato finora). `siteUrl` in `content.shared.ts` è già stato
   aggiornato a `https://www.dimoracuoredellacitta.it`, ma **il dominio non è
   ancora acquistato né pubblicato** (previsto entro la settimana del 27
   luglio-2 agosto 2026) — fino ad allora `metadataBase`, canonical, `og:url`
   e il QR della locandina pubblicitaria (fuori dal codice, vedi § sotto)
   puntano a un indirizzo che non risponde ancora. Nessun'altra azione di
   codice richiesta una volta acquistato: è già ovunque nel sito. Il resto
   del SEO on-page è fatto e **verificato riga per riga il 5 agosto 2026**
   (`npm run build && npm start` + `curl` su tutte le 12 route, entrambe le
   lingue) — vedi `CLAUDE.md` § SEO e metadati: favicon casa+statua, preview
   per i social corrette pagina per pagina (bug di anteprime sbagliate
   trovato e risolto lo stesso giorno), Open Graph, canonical, hreflang
   (incluso `x-default`), sitemap, robots e dati strutturati JSON-LD
   (`LodgingBusiness`/`FAQPage`/`BreadcrumbList`). Le coordinate in
   `propertyCoordinates` (`content.ts`) sono una stima da geocoding
   dell'indirizzo: da sostituire con quelle esatte quando arriva il profilo
   Google Business (che risolve anche questo punto e il punto successivo
   sull'indirizzo nella mappa embed di `Location`).
9. ~~**Crediti fotografici**~~ — risolto: `photoCredits` (`content.ts`, per
   lingua) mostra nel Footer una riga generica ("Le immagini presenti in
   questo sito sono di proprietà dei rispettivi autori." / l'equivalente
   inglese), **confermata sufficiente dalla proprietaria il 30 luglio 2026**
   invece di un'attribuzione per singola foto.

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

Tutte e sei le sezioni sono ora complete: Homepage, "/la-dimora",
"/servizi-comfort", "/posizione", "/galleria" (17 foto, dal 6 agosto 2026)
e "/partner" (quattro partner al 1 agosto 2026, ma
strutturalmente pronta a crescere). Non resta più nessuna sezione vuota da
riempire da zero.

**Messa online prevista per il 6 agosto 2026.** Recapiti (telefono, indirizzo,
Instagram, email) e le quattro descrizioni partner sono tutti dati reali e
confermati dalla proprietaria — non resta nessun contenuto testuale in
sospeso che blocchi la pubblicazione.

**Foto**: complete. Le quattro della galleria del 31 luglio (due del 22,
due del 31), le 13 aggiunte il 6 agosto (facciata, ingresso, cucina, camere,
balconi, bagno — vedi `CLAUDE.md` § Galleria), la foto Hero della home
(sostituita il 6 agosto, non più provvisoria), quella de "La Nostra Storia"
e quelle dedicate alle Hero di "/servizi-comfort" e "/galleria" (punto 1).
Nessun `ImagePlaceholder` resta nel percorso principale del sito.

Restano due punti aperti prima o subito dopo il lancio:

- **Dominio** (punto 8) — `siteUrl` è già impostato su
  `https://www.dimoracuoredellacitta.it`: verificare che il dominio sia
  effettivamente acquistato e puntato prima di comunicare l'indirizzo,
  altrimenti SEO/condivisioni social puntano a un URL che non risponde.
- **Licenza web di Flaviotte e General Sans** (punto 6) — rischio legale non
  ancora risolto, non solo un dettaglio tecnico: la proprietaria ha
  confermato di non avere una licenza che copra l'uso pubblico su web. Da
  chiarire con il fornitore del kit font indipendentemente dal lancio.

Nice-to-have per dopo il lancio, in ordine di impatto: **un logo vero per
White N'More** (oggi un ritaglio da volantino) e l'**apertura del profilo
Google Business** (per passare `Location` dall'indirizzo stimato al Place ID
esatto, vedi `CLAUDE.md` § "Dove ci Troviamo").

Lato codice il sito **è pronto per andare online**: nessun blocco tecnico
residuo dopo il giro di pulizia e l'audit SEO del 5 agosto 2026.
