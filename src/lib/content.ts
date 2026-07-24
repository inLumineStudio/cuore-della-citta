// Contenuti testuali e dati strutturali della Homepage.
// Tutto ciò che è marcato con TODO è un placeholder in attesa dei contenuti
// definitivi forniti dal cliente (testi, numeri di contatto, foto, partner reali).

export const siteConfig = {
  name: "Cuore della Città",
  fullName: 'Dimora "Cuore della Città"',
  shortTagline: "Un rifugio autentico nel cuore del centro storico",
  metaDescription:
    "Dimora Cuore della Città: casa vacanze nel centro storico. Camere curate, ospitalità italiana e la città a due passi dalla porta.",
  // TODO: sostituire con i recapiti reali forniti dal cliente (telefono/WhatsApp/Telegram/email)
  phoneDisplay: "+39 000 000 0000",
  phoneHref: "+390000000000",
  whatsappHref: "390000000000",
  telegramUsername: "cuoredellacitta",
  email: "info@cuoredellacitta.it",
  addressLine: "Via Panfilo Scudieri, 1, 67039 Sulmona AQ",
} as const;

// TODO: foto provvisoria fornita dal cliente — sostituire con lo scatto definitivo
export const heroImageSrc: string | undefined = "/images/hero.jpg";

// Claim della Hero (mostrato in basso, in maiuscolo via CSS).
// TODO: testo placeholder — da validare col cliente.
export const heroClaim = "Arrivare. Vivere. Restare.";

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
  { label: "Posizione & Mappa", href: "/posizione" },
  { label: "I Nostri Partner", href: "/partner" },
  { label: "FAQ", href: "/faq" },
];

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

export type PointOfInterest = {
  name: string;
  distance: string;
};

// TODO: sostituire con indirizzo reale e punti di interesse effettivi
export const pointsOfInterest: PointOfInterest[] = [
  { name: "Piazza principale", distance: "2 min a piedi" },
  { name: "Centro storico", distance: "5 min a piedi" },
  { name: "Parcheggio pubblico", distance: "3 min a piedi" },
];

export type Faq = {
  question: string;
  answer: string;
};

// TODO: rivedere le risposte con il cliente (orari, politiche reali)
export const faqs: Faq[] = [
  {
    question: "A che ora sono il check-in e il check-out?",
    answer:
      "Il check-in è disponibile dalle 15:00 tramite self check-in autonomo, il check-out entro le 11:00. Orari diversi possono essere concordati in base alla disponibilità.",
  },
  {
    question: "È possibile ospitare animali domestici?",
    answer:
      "Sì, gli animali di piccola taglia sono i benvenuti previa comunicazione al momento della prenotazione.",
  },
  {
    question: "C'è un parcheggio disponibile?",
    answer:
      "Nelle vicinanze della struttura è disponibile un parcheggio pubblico a pochi minuti a piedi.",
  },
  {
    question: "Qual è la politica di cancellazione?",
    answer:
      "La cancellazione è gratuita fino a 48 ore prima dell'arrivo. Scrivici per maggiori dettagli sul tuo soggiorno.",
  },
  {
    question: "Come posso prenotare?",
    answer:
      "Puoi scriverci direttamente su WhatsApp o Telegram, oppure chiamarci: ti risponderemo con la disponibilità in tempo reale, senza intermediari.",
  },
];
