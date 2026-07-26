# Handoff — Dimora "Cuore della Città"

Stato al 26 luglio 2026. Riferimento: preventivo inLumine Studio del 22 luglio
2026. Il sito è **uscito dalla bozza** (`showFullNav = true`): tutte le route
sono raggiungibili e cliccabili, non solo la homepage — si passa dalla Fase 1
(UI/UX) alla Fase 2 (contenuti reali) del workflow concordato nel preventivo.

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
  esteso della proprietaria (il "director's cut" del teaser di `HomeIntro`) e
  da una CTA finale a piena larghezza con due bottoni distinti — "Verifica
  disponibilità" (chiamata) e "Contattaci su WhatsApp"
- **`/galleria`**, **`/servizi-comfort`**, **`/posizione`**, **`/partner`** —
  per ora **solo la Hero, senza contenuto sotto**: i blocchi già costruiti
  (`Gallery`, `Amenities`, `Location`, `Partners`) contengono ancora dati
  esemplificativi della prima bozza, quindi sono stati **smontati** e il cliente
  non li vede. I componenti restano in repo, pronti da riagganciare quando
  arrivano i contenuti reali.

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

**Nota sullo `StickyHeader` in queste quattro sezioni**: la barra crema non
compare, perché la pagina è alta solo Hero + footer e non si arriva mai alla
soglia dell'85% del viewport. È il comportamento giusto e non serve toccarlo:
appena avranno contenuto sotto la Hero, la soglia diventerà raggiungibile e la
barra comparirà da sé.

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
Su desktop un **quadrato terracotta pieno segue il puntatore invertendo i
colori sotto di sé** (`CursorSquare`, `mix-blend-mode: difference`, riferimento
mondriantribute.com; la freccia di sistema resta visibile) e un pulsante in
basso a destra riporta in cima alla pagina (`ScrollToTop`). Dettagli in
`CLAUDE.md`.

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
preview 1200×630 per i social, Open Graph e Twitter card, canonical,
`/sitemap.xml` e `/robots.txt`. Verificato nel `<head>` servito. Manca solo il
dominio definitivo in `siteUrl` — vedi TODO 8. Dettagli in `CLAUDE.md` § SEO.

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
   formato in `CLAUDE.md` § Placeholder immagini), Piazza Garibaldi di giorno
   nella Hero di "/la-dimora" (`sulmona-piazza-garibaldi-giorno.webp`) e la
   statua di Ovidio come fondo della colonna editoriale delle FAQ
   (`statua-di-ovidio.jpg`) — **da chiarire se servono attribuzioni**, vedi
   punto 9.
   **Manca ancora la foto de "La Nostra Storia"**, che in
   home mostra tuttora `ImagePlaceholder`. Mancano inoltre le **foto dedicate
   alle Hero** di galleria, comfort, posizione e partner: finché `imageSrc` non
   è valorizzato in `pageHeroes`, quelle sezioni usano la foto della camera.
   Azione: salvare le foto in `public/images/` e valorizzare il campo
   corrispondente in `content.ts` (vedi `CLAUDE.md` § Placeholder immagini).
2. **Recapiti reali** — telefono/WhatsApp (`+39 351 496 4713`) e indirizzo
   (Via Panfilo Scudieri 1, Sulmona) sono quelli veri. Restano placeholder
   **email e URL Instagram** in `siteConfig` (`content.ts`).
3. **Contenuti delle quattro sezioni vuote** — galleria, comfort, posizione e
   partner mostrano solo la Hero. I componenti esistono già ma sono smontati
   perché i dati sono esemplificativi: `partners` (convenzioni inventate),
   `amenities` (elenco generico), `galleryImages` (quattro voci che puntano
   tutte alla stessa foto) e il segnaposto mappa di `Location`. Azione:
   riscrivere i contenuti col cliente e rimontare i componenti nelle rispettive
   `page.tsx`.
4. **Mappa** — al momento un placeholder testuale in `Location` (smontato); da
   collegare a Google Maps/OpenStreetMap con l'indirizzo definitivo.
5. **Punti di interesse** — i nomi in `pointsOfInterest` (`content.ts`) sono
   ora quelli reali forniti dal cliente e l'elenco è **ordinato per distanza
   crescente** (Annunziata 2 min, San Panfilo 4 min, Piazza Garibaldi 6 min):
   l'ordine dell'array è l'ordine reso a schermo, quindi va mantenuto
   aggiungendo voci. Restano da **verificare i tempi di percorrenza**.
6. **Font locali da ottimizzare** — in `src/app/fonts/` stanno tre famiglie nel
   formato consegnato dal cliente: `.woff2` per Flaviotte (18 KB) e Megdira
   (17 KB), ma **quattro `.otf` da ~46 KB** per General Sans (400, 400 corsivo,
   500, 600), circa 215 KB in tutto. `next/font/local` serve i file così come
   sono, senza convertirli né subsettarli. Prima della messa online: procurarsi
   i `.woff2` di General Sans (il kit di Fontshare li include) o convertirli, ed
   eventualmente subsettare al latino. Verificare anche la **licenza d'uso web**
   dei tre font, dato che ora sono serviti dal sito.
7. **Multilingua IT/EN** — offerto nel preventivo ma non ancora implementato
   (richiede decisione su approccio: `next-intl` vs routing manuale).
8. **Dominio definitivo** — `siteUrl` in `content.ts` è un **placeholder**
   (`https://www.cuoredellacitta.it`) e alimenta `metadataBase`, la sitemap e
   robots.txt: va confermato col cliente, altrimenti canonical e `og:url`
   puntano a un dominio che potrebbe non essere il suo. È l'unico punto da
   cambiare. Il resto del SEO on-page è fatto — vedi `CLAUDE.md` § SEO e
   metadati: favicon casa+statua, immagine di preview per i social, Open Graph,
   canonical, sitemap e robots.
9. **Crediti fotografici** — `photoCredits` (`content.ts`) è oggi `undefined` e
   il Footer non mostra alcuna riga di attribuzione: la foto Wikimedia di
   Lorenzo Testa che la richiedeva è stata sostituita dallo scatto al tramonto
   fornito dal cliente, e tenere il credito con quella foto fuori dal sito
   sarebbe un'attribuzione falsa. **Da confermare con la proprietaria** che le
   foto ora in uso (`sulmona-piazza-garibaldi-tramonto.webp`,
   `sulmona-piazza-garibaldi-giorno.webp`, `statua-di-ovidio.jpg`) siano scatti
   suoi: se una viene da terzi va rimessa l'attribuzione (autore + licenza +
   link se è una CC), e con più foto da attribuire conviene passare da stringa
   singola a array.

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

Homepage e "/la-dimora" sono le due sezioni complete. Le altre quattro esistono
con la loro Hero ma **aspettano i contenuti**: il lavoro naturale è prenderle
una alla volta col cliente, come è stato fatto per "La Dimora" (copy scritto
insieme, foto dedicata, blocchi rimontati).

Da chiedere alla proprietaria, in ordine di impatto: la **foto de "La Nostra
Storia"** (l'unico segnaposto ancora visibile in homepage), le **foto dedicate**
alle quattro Hero, i **contenuti reali** di servizi, partner e posizione
(punti 3, 4 e 5), e i **recapiti mancanti** — email e Instagram (punto 2).
