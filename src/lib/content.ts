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

// TODO: foto provvisoria fornita dal cliente - sostituire con lo scatto definitivo
export const heroImageSrc: string | undefined = "/images/hero.jpg";

// Claim della Hero (mostrato in basso, in maiuscolo via CSS).
// TODO: testo placeholder - da validare col cliente.
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
export const showFullNav = true;

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Homepage", href: "/" },
  { label: "La Dimora", href: "/la-dimora" },
  { label: "Galleria", href: "/galleria" },
  { label: "Comfort & Informazioni", href: "/servizi-comfort" },
  { label: "Dove ci Troviamo", href: "/posizione" },
  { label: "I Nostri Partner", href: "/partner" },
];

// Teaser Intro in home - la storia della Dimora (testo fornito dalla proprietaria).
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

export type PageHero = {
  // Riga sotto il wordmark: prende il posto del claim della home.
  claim: string;
  // Omesso = la Hero usa i propri default, cioè `heroImageSrc` (la foto della
  // camera) con l'alt che la descrive. Non è un segnaposto: è una foto vera,
  // solo non dedicata alla sezione.
  imageSrc?: string;
  imageAlt?: string;
};

// Hero delle sezioni interne. Tutte riusano la Hero della home: cambiano solo
// la riga sotto il wordmark e la fotografia, il resto della struttura no.
// TODO: foto dedicate per galleria, comfort, posizione e partner - finché
// mancano quelle sezioni mostrano la foto della camera.
export const pageHeroes = {
  laDimora: {
    claim: "La Nostra Storia",
    imageSrc: "/images/sulmona-piazza-garibaldi-giorno.webp",
    imageAlt:
      "Piazza Garibaldi a Sulmona, con l'acquedotto medievale e la fontana settecentesca",
  },
  galleria: { claim: "La Dimora, Senza Filtri" },
  comfort: { claim: "Il Tuo Soggiorno" },
  posizione: { claim: "La Posizione & Il Territorio" },
  partner: { claim: "Vantaggi Esclusivi" },
} satisfies Record<string, PageHero>;

// Racconto esteso della proprietaria per la pagina "/la-dimora" (componente
// `About`). È la versione "director's cut" del teaser `homeIntro`: stessa
// storia, qui per intero.
export const aboutPage = {
  title: "Costruita con il cuore, immersa nella storia di Sulmona.",
  subtitle:
    "Dove il calore di una storia di famiglia incontra l'anima millenaria della Valle Peligna.",
  paragraphs: [
    "Ci sono luoghi che non nascono da un semplice calcolo, ma da una scelta di vita.",
    "Un paio d'anni fa, di fronte alla decisione di acquistare una nuova auto, ci siamo fermati a riflettere. Volevamo qualcosa che restasse nel tempo, qualcosa capace di raccogliere valore e trasformarsi in un'eredità d'affetto per i nostri figli. La risposta è stata questa casa.",
    "Quando ne abbiamo varcato la soglia per la prima volta, era poco più di un guscio dimenticato, disastrato dal tempo. Ma in quella pietra e in quegli spazi abbiamo visto una promessa. Insieme a tutta la nostra famiglia, abbiamo iniziato una ristrutturazione totale: giornate infinite che cominciavano alle 6 del mattino e finivano ben oltre il tramonto, sacrifici condivisi anche dai nostri figli e un'attenzione quasi maniacale per ogni singolo dettaglio.",
    "Mano a mano che le pareti riprendevano vita e gli arredi trovavano la loro collocazione, chiunque venisse a trovarci ripeteva la stessa frase: “È davvero bellissima, è venuta benissimo.”",
    "Non è un caso che tutto questo sia accaduto a Sulmona. Patria di Ovidio, il poeta dell'amore e delle Metamorfosi, Sulmona è da secoli la città della pazienza artigiana - la stessa che racchiude nei suoi celebri confetti - e dell'accoglienza sincera racchiusa tra l'Acquedotto Svevo e le vette della Majella.",
    "Proprio come la nostra città ha saputo trasformare nel corso della storia la pietra e la tradizione in bellezza eterna, noi abbiamo trasformato un cantiere impegnativo in un rifugio accogliente. Questa non è una semplice casa vacanze gestita a distanza: è un pezzo della nostra famiglia che abbiamo scelto di aprire al mondo.",
    "Ogni angolo che vivrete, ogni comfort di cui godrete, è il frutto di un lavoro fatto a mano con il cuore. Perché crediamo che un soggiorno indimenticabile non sia fatto solo di bei mobili, ma dell'energia di chi in quel posto ha investito sogni, tempo e passione.",
  ],
  ctaTitle: "Senti il calore di casa nel cuore di Sulmona.",
  ctaDescription:
    "Prenota il tuo soggiorno direttamente con noi: vivi un'esperienza autentica, protetta dalla maestosità dell'Abruzzo e curata in ogni dettaglio.",
  ctaPrimaryLabel: "Verifica disponibilità",
  ctaSecondaryLabel: "Contattaci su WhatsApp",
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

// TODO: elenco esemplificativo - sostituire con la rete partner reale e le convenzioni attive
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
