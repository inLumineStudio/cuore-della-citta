// Dati strutturali e nomi propri, identici in ogni lingua: numeri di
// contatto, coordinate, percorsi immagine, chiavi icona, percorsi di
// navigazione. Nessuna prosa qui - il testo traducibile vive in
// `content.it.ts` / `content.en.ts`. Vedi CLAUDE.md § Multilingua.

// `name` e `fullName` sono il marchio: non si traducono, come il nome di
// un'attività reale non cambia da una lingua all'altra.
export const siteConfigShared = {
  name: "Cuore della Città",
  fullName: 'Dimora "Cuore della Città"',
  phoneDisplay: "+39 351 496 4713",
  phoneHref: "+393514964713",
  whatsappHref: "393514964713",
  // TODO: email reale del cliente
  email: "info@cuoredellacitta.it",
  instagramUrl: "https://www.instagram.com/cuoredellacittadimora",
  addressLine: "Via Panfilo Scudieri, 1, 67039 Sulmona AQ",
} as const;

// Stesso indirizzo di `siteConfigShared.addressLine`, scomposto nei campi
// richiesti da `PostalAddress` (dati strutturati, `structuredData.ts`). Se
// cambia l'indirizzo va aggiornato in entrambi i punti.
export const addressParts = {
  streetAddress: "Via Panfilo Scudieri, 1",
  postalCode: "67039",
  addressLocality: "Sulmona",
  addressRegion: "AQ",
  addressCountry: "IT",
} as const;

// Coordinate di Via Panfilo Scudieri (precisione di via, non del numero
// civico): geocoding via Nominatim/OpenStreetMap su `siteConfigShared.addressLine`,
// non fornite dal cliente. Da sostituire con quelle esatte se e quando arriva
// il profilo Google Business della struttura (vedi TODO in HANDOFF.md).
export const propertyCoordinates = {
  latitude: 42.051099,
  longitude: 13.923446,
} as const;

// Fatti sulla struttura non ancora esposti come testo altrove (solo per i
// dati strutturati). `numberOfRooms` e `petsAllowed` rispecchiano voci di
// `amenitiesPage` e vanno aggiornati insieme a quelle se cambiano;
// `checkinTime`/`checkoutTime` rispecchiano la FAQ sugli orari.
export const propertyFacts = {
  numberOfRooms: 2,
  petsAllowed: false,
  checkinTime: "15:00",
  checkoutTime: "10:00",
} as const;

// Dominio di produzione: serve a `metadataBase`, alla sitemap e agli URL
// assoluti di Open Graph, che non accettano percorsi relativi. Confermato
// dalla proprietaria il 30 luglio 2026 (non ancora acquistato/pubblicato al
// momento della conferma, vedi TODO 8 in HANDOFF.md) - diverso dal
// placeholder usato finora (era "cuoredellacitta.it", senza "dimora").
export const siteUrl = "https://www.dimoracuoredellacitta.it";

// Interruttore temporaneo per la bozza mostrata al cliente: quando false,
// la nav espone solo la Homepage (in entrambe le lingue) e le altre route
// reindirizzano alla home della lingua corrente. Rimettere a true per
// riattivare tutte le pagine.
export const showFullNav = true;

// Percorsi neutri (senza prefisso di lingua) e id stabile per ogni voce di
// nav: le etichette tradotte vivono in `content.it.ts`/`content.en.ts`
// (`navLabels`), `getContent()` le ricompone in `navLinks`.
export const navRoutes = [
  { id: "home", href: "/" },
  { id: "laDimora", href: "/la-dimora" },
  { id: "galleria", href: "/galleria" },
  { id: "comfort", href: "/servizi-comfort" },
  { id: "posizione", href: "/posizione" },
  { id: "partner", href: "/partner" },
] as const;

export type NavRouteId = (typeof navRoutes)[number]["id"];

// TODO: foto provvisoria fornita dal cliente - sostituire con lo scatto definitivo
export const heroImageSrc: string | undefined = "/images/hero.jpg";

// Pannello "posizione" della home (secondo pannello dello scroll orizzontale
// desktop). WebP q92: con `images.unoptimized` il browser riceve esattamente
// questo file, quindi il formato lo scegliamo noi.
export const positionImageSrc: string | undefined =
  "/images/sulmona-piazza-garibaldi-tramonto.webp";

// Terzo pannello dello scroll orizzontale della home. L'immagine fa da fondo
// alla colonna editoriale: se è undefined resta il pieno `bg-ink`.
export const faqImageSrc: string | undefined = "/images/statua-di-ovidio.jpg";

export type AmenityIcon =
  | "bed-double"
  | "baby"
  | "shirt"
  | "utensils"
  | "coffee"
  | "air-vent"
  | "wifi"
  | "wand-sparkles"
  | "clock"
  | "calendar-days"
  | "square-parking"
  | "luggage"
  | "cigarette-off"
  | "paw-print"
  | "utensils-crossed"
  | "moon";

export type AmenityItem = {
  icon: AmenityIcon;
  title: string;
  description: string;
};

export type AmenityGroup = {
  title: string;
  items: AmenityItem[];
};

// Fasce di sconto fisse: tre percentuali più un gruppo "omaggi" (prodotti
// offerti gratuitamente, senza percentuale). L'ordine di questo array è
// l'ordine in cui le fasce compaiono nella sezione Partner - aggiungerne una
// nuova significa aggiungere un id qui e la relativa etichetta in
// `partnerTierLabels` (`content.it.ts`/`content.en.ts`).
export const partnerTierIds = ["10", "15", "20", "gift"] as const;
export type PartnerTierId = (typeof partnerTierIds)[number];

export type Partner = {
  // Nome proprio dell'attività: non si traduce, stessa logica di `name`/
  // `fullName` qui sopra.
  name: string;
  // Categoria e descrizione sono prosa (si leggono, non sono un dato
  // strutturale) e vivono per lingua in `content.it.ts`/`content.en.ts`
  // insieme al resto dell'array `partners` - questo tipo resta qui solo
  // perché condiviso dai due moduli.
  category: string;
  // Quale fascia di sconto mostra questo partner: la sezione raggruppa le
  // card per fascia, l'etichetta ("20% di sconto") non si ripete più su
  // ogni singola card.
  tier: PartnerTierId;
  // Cosa offre l'attività e a cosa si applica lo sconto/omaggio.
  description: string;
  // Se assente, la cella mostra un segnaposto testuale ("Logo in arrivo"),
  // non un'immagine finta: un logo è un'identità visiva altrui, diversamente
  // da una foto della struttura non ha senso simularlo con un placeholder
  // grafico. Stessa filosofia di `faqs[].answer` ("Risposta in arrivo.").
  // Path condiviso (non per lingua): un'immagine non si traduce.
  logoSrc?: string;
  logoAlt?: string;
  // Se presente, l'intera scheda diventa un link verso il sito/social del
  // partner; se assente resta statica. Condiviso: stesso URL in ogni lingua.
  websiteUrl?: string;
};

export type GalleryImage = {
  src?: string;
  alt: string;
  // Dimensioni reali del file: servono al layout a cascata (CSS columns)
  // per riservare l'altezza corretta di ogni card prima che l'immagine
  // finisca di caricare, evitando che il testo sotto salti in su (CLS).
  width: number;
  height: number;
};

export type PageHero = {
  // Riga sotto il wordmark: prende il posto del claim della home.
  claim: string;
  // Omesso = la Hero usa i propri default, cioè `heroImageSrc` (la foto della
  // camera) con l'alt che la descrive. Non è un segnaposto: è una foto vera,
  // solo non dedicata alla sezione.
  imageSrc?: string;
  imageAlt?: string;
};

export type PointOfInterest = {
  name: string;
  distance: string;
  description?: string;
};

export type Faq = {
  question: string;
  answer?: string;
};
