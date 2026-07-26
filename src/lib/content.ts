// Contenuti testuali e dati strutturali della Homepage.
// Tutto ciò che è marcato con TODO è un placeholder in attesa dei contenuti
// definitivi forniti dal cliente (testi, numeri di contatto, foto, partner reali).

export const siteConfig = {
  name: "Cuore della Città",
  fullName: 'Dimora "Cuore della Città"',
  shortTagline: "Un rifugio autentico nel cuore del centro storico",
  metaDescription:
    "Casa vacanze nel centro storico di Sulmona, in Abruzzo: ambienti curati, prenotazione diretta senza intermediari e le meraviglie della città a pochi passi dalla porta.",
  phoneDisplay: "+39 351 496 4713",
  phoneHref: "+393514964713",
  whatsappHref: "393514964713",
  // TODO: email reale del cliente
  email: "info@cuoredellacitta.it",
  // TODO: URL profilo Instagram reale del cliente
  instagramUrl: "https://instagram.com/cuoredellacitta",
  addressLine: "Via Panfilo Scudieri, 1, 67039 Sulmona AQ",
} as const;

// Dominio di produzione: serve a `metadataBase`, alla sitemap e agli URL
// assoluti di Open Graph, che non accettano percorsi relativi.
// TODO: confermare il dominio definitivo con il cliente prima della messa online
export const siteUrl = "https://www.cuoredellacitta.it";

// Messaggio precompilato di ogni link WhatsApp del sito: nomina la struttura
// così come la proprietaria la vede su WhatsApp, per farle capire da dove
// arriva il contatto. È il default di `whatsappHref()`.
export const whatsappMessage =
  "Ciao! Ho visto Cuore Della Città Dimora sul sito e vorrei informazioni sulla disponibilità.";

// TODO: foto provvisoria fornita dal cliente — sostituire con lo scatto definitivo
export const heroImageSrc: string | undefined = "/images/hero.jpg";

// Claim della Hero (mostrato in basso, in maiuscolo via CSS).
// TODO: testo placeholder — da validare col cliente.
export const heroClaim = "Arrivare. Vivere. Restare.";

// Riga sotto il wordmark nel lockup centrato della Hero mobile: dice subito
// dove siamo a chi arriva da un link o dai social.
export const heroLocation = "Sulmona, Abruzzo";

// Etichetta condivisa da tutte le CTA di prenotazione (Hero, header).
export const bookCtaLabel = "Prenota ora";

// Sottotitolo introduttivo della Hero.
export const heroSubtitle =
  "Svegliati nel cuore di Sulmona, tra le vie del centro storico. Una dimora accogliente ed esclusiva, punto di partenza per la Valle Peligna e le bellezze abruzzesi.";

// Interruttore temporaneo per la bozza mostrata al cliente: quando false,
// la nav espone solo la Homepage e le altre route reindirizzano a "/".
// Rimettere a true per riattivare tutte le pagine.
export const showFullNav = false;

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "La Dimora", href: "/la-dimora" },
  { label: "Servizi & Comfort", href: "/servizi-comfort" },
  { label: "Dove ci Troviamo", href: "/posizione" },
  { label: "I Nostri Partner", href: "/partner" },
];

// Teaser Intro in home — la storia della Dimora (testo fornito dalla proprietaria).
// La foto definitiva arriverà dopo: per ora ImagePlaceholder.
export const homeIntro = {
  eyebrow: "La nostra storia",
  title: "Il cuore, prima di tutto.",
  body: [
    "Abbiamo cercato un luogo da far crescere, qualcosa che restasse ai nostri figli e che non perdesse mai di valore. L'abbiamo trovata in condizioni difficili e l'abbiamo ristrutturata da cima a fondo, con il tempo, la cura e i sacrifici di tutta la famiglia.",
    "Per questo non è soltanto una casa vacanze, ma un affetto che abbiamo deciso di condividere: il cuore che ci abbiamo messo, oggi, nel cuore della città.",
  ],
  cta: "Scopri la Dimora",
  ctaHref: "/la-dimora",
};

export type Amenity = {
  icon:
    | "bed"
    | "wifi"
    | "wind"
    | "coffee"
    | "key"
    | "washing-machine"
    | "parking"
    | "shower";
  title: string;
  description: string;
};

export const amenities: Amenity[] = [
  {
    icon: "bed",
    title: "Camere curate",
    description: "Ambienti rifiniti nei dettagli, pensati per il riposo dopo una giornata in città.",
  },
  {
    icon: "wifi",
    title: "Wi-Fi ad alta velocità",
    description: "Connessione veloce in tutta la struttura, per restare collegati senza pensieri.",
  },
  {
    icon: "wind",
    title: "Climatizzazione",
    description: "Aria condizionata e riscaldamento autonomo in ogni ambiente.",
  },
  {
    icon: "key",
    title: "Check-in autonomo",
    description: "Arrivo flessibile con self check-in, senza vincoli di orario.",
  },
  {
    icon: "coffee",
    title: "Colazione su richiesta",
    description: "Prodotti tipici locali per iniziare la giornata con gusto.",
  },
  {
    icon: "washing-machine",
    title: "Lavanderia",
    description: "Servizio lavanderia disponibile per i soggiorni più lunghi.",
  },
];

export type Partner = {
  category: string;
  name: string;
  perk: string;
};

// TODO: elenco esemplificativo — sostituire con la rete partner reale e le convenzioni attive
export const partners: Partner[] = [
  {
    category: "Ristorazione",
    name: "Trattoria del Borgo",
    perk: "10% di sconto per gli ospiti della Dimora",
  },
  {
    category: "Tour ed Esperienze",
    name: "Città in Bici",
    perk: "Noleggio bici scontato del 15%",
  },
  {
    category: "Benessere",
    name: "Terme del Centro",
    perk: "Ingresso agevolato con voucher dedicato",
  },
];

export type GalleryImage = {
  src?: string;
  alt: string;
};

// TODO: sostituire i placeholder con le foto definitive fornite dal cliente
export const galleryImages: GalleryImage[] = [
  { alt: "La camera principale" },
  { alt: "Vista dal balcone sul centro storico" },
  { alt: "Dettaglio degli arredi" },
  { alt: "Angolo lettura" },
];

// Pannello "posizione" della home (secondo pannello dello scroll orizzontale desktop).
// WebP q92: con `images.unoptimized` il browser riceve esattamente questo file,
// quindi il formato lo scegliamo noi (a pari qualità pesa la metà di un JPEG).
export const positionImageSrc: string | undefined =
  "/images/sulmona-piazza-garibaldi-tramonto.webp";

// Reso dal Footer su ogni pagina quando è valorizzato. Serviva per lo scatto di
// Piazza Garibaldi ripreso da Wikimedia Commons (Lorenzo Testa), che non è più
// usato da nessun componente: se una foto del sito richiede attribuzione va
// rimessa qui.
// TODO: confermare che la foto del tramonto sia della proprietaria
export const photoCredits: string | undefined = undefined;

export const positionTeaser = {
  eyebrow: "Dove ci troviamo",
  title: "Nel cuore della città, letteralmente",
  description:
    "A pochi passi dalle meraviglie del centro storico: la base ideale per scoprire la storia di Sulmona a piedi.",
  cta: "Scopri dove ci troviamo",
  ctaHref: "/posizione",
};

export type PointOfInterest = {
  name: string;
  distance: string;
};

// Ordinati per distanza crescente: l'elenco è reso nell'ordine dell'array.
// TODO: verificare i tempi di percorrenza con la proprietaria
export const pointsOfInterest: PointOfInterest[] = [
  { name: "Complesso della Santissima Annunziata", distance: "2 min a piedi" },
  { name: "Cattedrale di San Panfilo", distance: "4 min a piedi" },
  { name: "Piazza Garibaldi", distance: "6 min a piedi" },
];

// Terzo pannello dello scroll orizzontale della home. L'immagine fa da fondo
// alla colonna editoriale: se è undefined resta il pieno `bg-ink`.
export const faqImageSrc: string | undefined = "/images/statua-di-ovidio.jpg";

export const faqPanel = {
  eyebrow: "Domande frequenti",
  title: "Tutto quello che c'è da sapere",
  description:
    "Le risposte alle domande che ci fate più spesso. Se la tua non è in elenco, scrivici: rispondiamo noi, senza intermediari.",
  cta: "Scrivici su WhatsApp",
};

export type Faq = {
  question: string;
  // Le risposte saranno fornite dalla proprietaria: finché `answer` è
  // undefined l'accordion mostra un segnaposto invece di una risposta finta.
  answer?: string;
};

// Domande e risposte definitive fornite dal cliente.
export const faqs: Faq[] = [
  {
    question: "Quali sono gli orari di check-in e check-out?",
    answer:
      "Check-in dalle 15:00 alle 20:00; check-out tra le 8:00 e le 10:00.",
  },
  {
    question: "Come posso prenotare?",
    answer:
      "Tramite prenotazione diretta, per telefono o su WhatsApp. Il soggiorno minimo è di due notti.",
  },
  {
    question: "Qual è la politica di cancellazione?",
    answer:
      "Puoi cancellare la tua prenotazione senza alcuna penale fino a 5 giorni prima della data di arrivo prevista. In caso di cancellazione effettuata nei 5 giorni precedenti al check-in o di mancata presentazione (no-show), verrà addebitato l'intero importo del soggiorno.",
  },
  {
    question: "Il Wi-Fi è gratuito?",
    answer: "Sì, la connessione Wi-Fi è gratuita.",
  },
  {
    question: "È disponibile un parcheggio?",
    answer:
      "Sì, un parcheggio gratuito a 100 metri. È inoltre possibile scaricare i bagagli sotto la struttura dalle 15:00 alle 17:00, esclusi sabato e domenica per la ZTL.",
  },
  {
    question: "Gli animali domestici sono ammessi?",
    answer: "No, gli animali non sono ammessi.",
  },
  {
    question: "Lenzuola e asciugamani sono inclusi?",
    answer: "Sì, lenzuola e asciugamani sono inclusi.",
  },
  {
    question: "La cucina è completamente attrezzata?",
    answer:
      "Sì, la cucina è completa e attrezzata, con microonde e macchina del caffè a capsule.",
  },
  {
    question: "Come posso contattarvi durante il soggiorno?",
    answer:
      "Siamo raggiungibili per telefono o su WhatsApp, allo stesso numero della prenotazione.",
  },
];
