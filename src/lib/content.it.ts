// Testi in italiano. Stessa forma di `content.en.ts`: chi aggiorna un
// contenuto qui deve specularmente controllare l'altro file. Nomi propri e
// dati condivisi (indirizzo, telefono, percorsi immagine) vivono in
// `content.shared.ts`, non qui.
import type {
  AmenityGroup,
  Faq,
  GalleryImage,
  NavRouteId,
  PageHero,
  Partner,
  PartnerTierId,
  PointOfInterest,
} from "./content.shared";

export const siteConfig = {
  shortTagline: "Un rifugio autentico nel cuore del centro storico",
  // Tenuta sotto i ~155 caratteri: oltre, Google tronca lo snippet in SERP.
  metaDescription:
    "Casa vacanze nel centro storico di Sulmona, Abruzzo: ambienti curati, prenotazione diretta senza intermediari, a pochi passi dalle meraviglie della città.",
  // Tenuto sotto i ~60 caratteri: oltre, Google tronca il titolo in SERP.
  metaTitleSuffix: "Casa vacanze a Sulmona",
};

export const navLabels: Record<NavRouteId, string> = {
  home: "Homepage",
  laDimora: "La Dimora",
  galleria: "Galleria",
  comfort: "Comfort & Informazioni",
  posizione: "Dove ci Troviamo",
  partner: "I Nostri Partner",
};

// Messaggio precompilato di ogni link WhatsApp del sito: nomina la struttura
// così come la proprietaria la vede su WhatsApp, per farle capire da dove
// arriva il contatto. È il default di `whatsappHref()`.
export const whatsappMessage: string =
  "Ciao! Ho visto Cuore Della Città Dimora sul sito e vorrei informazioni sulla disponibilità.";

// Claim della Hero (mostrato in basso, in maiuscolo via CSS).
export const heroClaim: string = "Arrivare. Vivere. Restare.";

// Riga sotto il wordmark nel lockup centrato della Hero: dice subito dove
// siamo a chi arriva da un link o dai social.
export const heroLocation: string = "Sulmona, Abruzzo";

// Riga subito sotto `heroLocation`: il claim è puramente evocativo e su
// mobile resta nascosto, quindi senza questa riga non era chiaro a colpo
// d'occhio che tipo di attività fosse. Sempre visibile, a differenza del claim.
export const heroDescriptor: string = "Una casa vacanze di charme, autentica e raffinata.";

// Etichetta condivisa da tutte le CTA di prenotazione (Hero, header).
export const bookCtaLabel: string = "Prenota ora";

// Sottotitolo introduttivo della Hero.
export const heroSubtitle: string =
  "Svegliati nel cuore di Sulmona, tra le vie del centro storico. Una dimora accogliente ed esclusiva, punto di partenza per la Valle Peligna e le bellezze abruzzesi.";

// Teaser Intro in home - la storia della Dimora. Foto in `homeIntroImageSrc`
// (content.shared.ts).
export const homeIntro = {
  eyebrow: "La nostra storia",
  title: "Il cuore, prima di tutto.",
  body: [
    "Un guscio dimenticato dal tempo, in cui abbiamo intravisto fin da subito la promessa di un rifugio autentico nel cuore della Valle Peligna. Da lì è iniziato un lungo percorso di ristrutturazione, curato nei minimi dettagli.",
    "Non una struttura ricettiva gestita a distanza, ma un progetto nato dalla passione per il nostro territorio: il cuore che ci abbiamo messo, oggi, nel cuore della città.",
  ],
  cta: "Scopri la Dimora",
  ctaHref: "/la-dimora",
};

// Hero delle sezioni interne. Tutte riusano la Hero della home: cambiano
// solo la riga sotto il wordmark e la fotografia, il resto della struttura
// no. `imageSrc` è ripetuto identico anche in `content.en.ts` (stesso file,
// nessuna traduzione possibile per un percorso immagine).
export const pageHeroes = {
  laDimora: {
    claim: "La Nostra Storia",
    imageSrc: "/images/sulmona-piazza-garibaldi-giorno.webp",
    imageAlt: "Piazza Garibaldi a Sulmona, con l'acquedotto medievale e la fontana settecentesca",
  },
  galleria: {
    claim: "La Dimora, Senza Filtri",
    imageSrc: "/images/gallery/sulmona-dimora-camera-balcone-centro-storico.webp",
    imageAlt: "La camera matrimoniale con il balcone aperto sul centro storico di Sulmona",
  },
  comfort: {
    claim: "L'Esperienza in Dimora",
    imageSrc: "/images/gallery/sulmona-dimora-camera-vista-centro-storico.webp",
    imageAlt: "Il balcone della Dimora, con vista sul campanile del centro storico di Sulmona",
  },
  posizione: {
    claim: "La Posizione & Il Territorio",
    imageSrc: "/images/sulmona-acquedotto-medievale.webp",
    imageAlt: "Gli archi dell'acquedotto medievale di Sulmona, in Piazza Garibaldi",
  },
  partner: {
    claim: "Vantaggi Esclusivi",
    imageSrc: "/images/sulmona-portale-santissima-annunziata.webp",
    imageAlt: "Il portale scolpito del Complesso della Santissima Annunziata a Sulmona",
  },
} satisfies Record<string, PageHero>;

// Racconto esteso per la pagina "/la-dimora" (componente `About`). È la
// versione "director's cut" del teaser `homeIntro`: stessa storia, qui per
// intero.
export const aboutPage = {
  title: "Costruita con il cuore, immersa nella storia di Sulmona.",
  subtitle: "Dove la cura per ogni dettaglio incontra l'anima millenaria della Valle Peligna.",
  paragraphs: [
    "Ci sono luoghi che non nascono per caso, ma dalla volontà precisa di dare nuova vita a una visione.",
    "Quando ne abbiamo varcato la soglia per la prima volta, questa struttura era un guscio dimenticato, segnato dal tempo. Ma in quelle pietre e in quegli spazi abbiamo intravisto fin da subito un potenziale unico: la promessa di un rifugio autentico nel cuore della Valle Peligna.",
    "È iniziato così un lungo e appassionato percorso di ristrutturazione totale. Un lavoro curato nei minimi dettagli, giorno dopo giorno, guidato da una dedizione costante per trasformare un cantiere impegnativo in un ambiente elegante, calmo e accogliente.",
    "Non è un caso che tutto questo prenda forma a Sulmona. Patria di Ovidio, il poeta delle Metamorfosi, Sulmona è da secoli la città della pazienza artigiana e dell'accoglienza sincera, racchiusa tra la maestosità dell'Acquedotto Svevo e le vette della Majella.",
    "Proprio come la nostra città ha saputo trasformare nel tempo la pietra e la tradizione in bellezza eterna, abbiamo voluto restituire a questo spazio un'anima contemporanea senza perderne la radice storica.",
    "Questa non è una semplice struttura ricettiva gestita a distanza: è un progetto nato dalla passione per il nostro territorio e dal desiderio di offrire un'esperienza autentica. Ogni angolo, ogni arredo e ogni comfort sono stati pensati con cura, perché crediamo che un soggiorno indimenticabile non sia fatto solo di design, ma dell'energia di chi in un luogo ha investito sogni, tempo e dedizione.",
  ],
  ctaTitle: "Senti il calore di casa nel cuore di Sulmona.",
  ctaDescription:
    "Prenota il tuo soggiorno direttamente con noi: vivi un'esperienza autentica, protetta dalla maestosità dell'Abruzzo e curata in ogni dettaglio.",
  ctaPrimaryLabel: "Verifica disponibilità",
  ctaSecondaryLabel: "Contattaci su WhatsApp",
};

// Contenuti reali forniti dalla proprietaria per "/servizi-comfort"
// (componente `Amenities`). Check-in/checkout, cancellazione, parcheggio/ZTL
// e cucina ripetono volutamente le stesse informazioni delle FAQ in home.
export const amenitiesPage = {
  title: "Comfort & Informazioni",
  subtitle: "Ogni dettaglio è pensato per offrirvi un soggiorno di fascino, relax e massima cura nel cuore di Sulmona.",
  comfortGroups: [
    {
      title: "Spazi & Ospitalità",
      items: [
        { icon: "bed-double", title: "2 Raffinate Camere Matrimoniali", description: "Fino a 4 posti letto ampi e confortevoli." },
        { icon: "baby", title: "Accoglienza Famiglie", description: "Lettino o culla per bambini disponibile su richiesta." },
        { icon: "shirt", title: "Set di Benvenuto", description: "Biancheria da letto e set di asciugamani completi inclusi." },
      ],
    },
    {
      title: "Cucina & Risveglio",
      items: [
        { icon: "utensils", title: "Cucina Completa", description: "Ambiente interamente attrezzato con elettrodomestici e microonde." },
        {
          icon: "coffee",
          title: "Il Tuo Buongiorno",
          description: "Macchina del caffè espresso a capsule in struttura, oppure colazione presso il bar convenzionato.",
        },
      ],
    },
    {
      title: "Clima & Servizi",
      items: [
        { icon: "air-vent", title: "Microclima Ideale", description: "Aria condizionata a controllo autonomo per ogni stagione." },
        { icon: "wifi", title: "Connessione", description: "Wi-Fi ad alta velocità gratuito in tutta la struttura." },
        { icon: "wand-sparkles", title: "Beauty", description: "Asciugacapelli in dotazione." },
      ],
    },
  ] satisfies AmenityGroup[],
  infoGroups: [
    {
      title: "Orari & Soggiorno",
      items: [
        { icon: "clock", title: "Check-in", description: "Dalle 15:00 alle 20:00." },
        { icon: "clock", title: "Check-out", description: "Tra le 8:00 e le 10:00." },
        { icon: "calendar-days", title: "Soggiorno Minimo", description: "Due notti, per garantire un'esperienza di pieno relax." },
      ],
    },
    {
      title: "Arrivo & Parcheggio",
      items: [
        { icon: "square-parking", title: "Parcheggio Gratuito", description: "A soli 100 metri dalla struttura." },
        {
          icon: "luggage",
          title: "Accesso Bagagli (ZTL)",
          description:
            "Scarico bagagli sotto la struttura dalle 15:00 alle 17:00, dal lunedì al venerdì. Sabato e domenica la zona è interamente pedonale.",
        },
      ],
    },
    {
      title: "Cura della Dimora & Politiche",
      items: [
        { icon: "cigarette-off", title: "Ambienti Non Fumatori", description: "Struttura interamente non fumatori, con area riservata all'esterno." },
        { icon: "paw-print", title: "Animali Non Ammessi", description: "Per garantire la massima igiene a tutti gli ospiti." },
        {
          icon: "utensils-crossed",
          title: "Rispetto degli Spazi",
          description: "Cibo e bevande solo nella zona cucina o pranzo, per mantenere freschi gli ambienti notte.",
        },
        { icon: "moon", title: "Tranquillità", description: "Fasce di rispetto del riposo dalle 22:00 alle 8:00 e dalle 14:00 alle 16:00." },
      ],
    },
  ] satisfies AmenityGroup[],
  ctaTitle: "Prenota direttamente tramite il sito web",
  ctaDescription:
    "Nessun costo di intermediazione, miglior tariffa garantita e assistenza telefonica dedicata prima e durante il tuo soggiorno a Sulmona.",
  ctaPrimaryLabel: "Chiama ora",
  ctaSecondaryLabel: "Contattaci su WhatsApp",
};

// Set completo di quattro foto reali fornite dalla proprietaria (due il 22
// luglio, due il 31 luglio 2026).
export const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery/sulmona-dimora-camera-matrimoniale.webp",
    alt: "La camera matrimoniale della Dimora, con soffitto a volta in mattoni e vista sul centro storico",
    width: 2048,
    height: 1536,
  },
  {
    src: "/images/gallery/sulmona-dimora-seconda-camera.webp",
    alt: "La seconda camera della Dimora, con angolo scrittoio",
    width: 2048,
    height: 1536,
  },
  {
    src: "/images/gallery/sulmona-dimora-soggiorno-cucina.webp",
    alt: "Il soggiorno con angolo cottura della Dimora, con vista sulla camera da letto",
    width: 1600,
    height: 1200,
  },
  {
    src: "/images/gallery/sulmona-centro-storico-piazza.webp",
    alt: "Una piazza del centro storico di Sulmona, a pochi passi dalla Dimora",
    width: 1600,
    height: 1200,
  },
  {
    src: "/images/gallery/sulmona-dimora-facciata-esterna.webp",
    alt: "La facciata della Dimora nel centro storico di Sulmona",
    width: 1600,
    height: 1064,
  },
  {
    src: "/images/gallery/sulmona-dimora-portone-ingresso.webp",
    alt: "Il portone d'ingresso della Dimora, nel cuore del centro storico di Sulmona",
    width: 1199,
    height: 1600,
  },
  {
    src: "/images/gallery/sulmona-dimora-ingresso-luce-giorno.webp",
    alt: "L'ingresso della Dimora in piena luce del giorno, con la cucina sullo sfondo",
    width: 1064,
    height: 1600,
  },
  {
    src: "/images/gallery/sulmona-dimora-cucina-luce-naturale.webp",
    alt: "La cucina della Dimora in piena luce del giorno, con il balcone aperto sul centro storico",
    width: 989,
    height: 1319,
  },
  {
    src: "/images/gallery/sulmona-dimora-cucina-tavolo-apparecchiato.webp",
    alt: "La cucina della Dimora con il tavolo apparecchiato, sotto il soffitto a volta in mattoni",
    width: 1200,
    height: 1600,
  },
  {
    src: "/images/gallery/sulmona-dimora-cucina-corridoio.webp",
    alt: "La cucina della Dimora vista dal tavolo da pranzo, con il corridoio verso le camere",
    width: 1600,
    height: 1064,
  },
  {
    src: "/images/gallery/sulmona-dimora-camera-soffitto-a-volta.webp",
    alt: "La camera matrimoniale al calar della sera, con il soffitto a volta in mattoni e il balcone affacciato sulla strada",
    width: 1199,
    height: 1600,
  },
  {
    src: "/images/gallery/sulmona-dimora-camera-balcone-centro-storico.webp",
    alt: "La camera matrimoniale con il balcone aperto sul centro storico di Sulmona",
    width: 2400,
    height: 1596,
  },
  {
    src: "/images/gallery/sulmona-dimora-camera-angolo-toeletta.webp",
    alt: "La seconda camera, con l'angolo toeletta e le porte-finestre sul balcone",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/sulmona-dimora-camera-comodini-illuminati.webp",
    alt: "La seconda camera con i comodini illuminati, la sera",
    width: 1351,
    height: 760,
  },
  {
    src: "/images/gallery/sulmona-dimora-camera-vista-centro-storico.webp",
    alt: "Il balcone di una delle camere, con vista sul campanile del centro storico",
    width: 2400,
    height: 1596,
  },
  {
    src: "/images/gallery/sulmona-dimora-balcone-fiorito-piazza.webp",
    alt: "Il balcone fiorito della Dimora, affacciato sulla piazza del centro storico",
    width: 1600,
    height: 1199,
  },
  {
    src: "/images/gallery/sulmona-dimora-bagno-doccia.webp",
    alt: "Il bagno della Dimora, con doccia e porta-finestra su un piccolo balcone",
    width: 1061,
    height: 1415,
  },
];

// Reso dal Footer su ogni pagina quando è valorizzato.
export const photoCredits: string | undefined =
  "Le immagini presenti in questo sito sono di proprietà dei rispettivi autori.";

export const positionTeaser = {
  eyebrow: "Dove ci troviamo",
  title: "Nel cuore della città, letteralmente",
  description: "A pochi passi dalle meraviglie del centro storico: la base ideale per scoprire la storia di Sulmona a piedi.",
  cta: "Scopri dove ci troviamo",
  ctaHref: "/posizione",
};

// Pagina "Dove ci Troviamo" (`/posizione`, componente `Location`) - diversa
// da `positionTeaser` qui sopra, che resta il pannello breve della home.
export const locationPage = {
  eyebrow: "Posizione",
  title: "La bellezza di Sulmona, appena fuori dalla porta",
  description:
    "Abitare in Via Panfilo Scudieri significa immergersi nel ritmo più autentico di Sulmona. Varcata la soglia di casa, non servono mappe né auto: i vicoli storici, le piazze scenografiche, i caffè storici e le meraviglie dell'architettura secolare si svelano tutti intorno a voi, a pochissimi passi di passeggiata. Una posizione privilegiata che vi permette di vivere la città non da semplici turisti, ma da veri protagonisti.",
  poiLabel: "Alcuni dei monumenti da non perdere",
  mapCaption:
    "Da Sulmona si raggiungono comodamente tutti e quattro i capoluoghi di provincia: Chieti in circa 50 minuti, Pescara in un'ora, L'Aquila in un'ora e un quarto, Teramo in un'ora e mezza. Una base strategica per esplorare l'intera regione, dal mare Adriatico alle vette del Gran Sasso e della Majella.",
};

// Ordinati per distanza crescente: l'elenco è reso nell'ordine dell'array.
// `name` (nomi di monumenti) è identico in `content.en.ts`: sono nomi
// propri, non si traducono.
export const pointsOfInterest: PointOfInterest[] = [
  {
    name: "Complesso della Santissima Annunziata",
    distance: "2 min a piedi",
    description: "Il monumento simbolo di Sulmona: facciata tardo-gotica e rinascimentale affiancate, oggi sede del Museo Civico.",
  },
  {
    name: "Cattedrale di San Panfilo",
    distance: "4 min a piedi",
    description: "Sorge su un tempio italico-romano: cripta e origini romaniche dedicate al patrono della città.",
  },
  {
    name: "Statua di Ovidio, Piazza XX Settembre",
    distance: "5 min a piedi",
    description: "Omaggio al poeta latino nato a Sulmona: \"Sulmo mihi patria est\", come scrisse lui stesso nei Tristia.",
  },
  {
    name: "Piazza Garibaldi",
    distance: "6 min a piedi",
    description: "Il salotto della città, bordato dagli archi dell'acquedotto medievale: qui si corre la Giostra Cavalleresca.",
  },
];

export const faqPanel = {
  eyebrow: "Domande frequenti",
  title: "Tutto quello che c'è da sapere",
  description: "Le risposte alle domande che ci fate più spesso. Se la tua non è in elenco, scrivici: rispondiamo noi, senza intermediari.",
  cta: "Scrivici su WhatsApp",
};

export const faqs: Faq[] = [
  { question: "Quali sono gli orari di check-in e check-out?", answer: "Check-in dalle 15:00 alle 20:00; check-out tra le 8:00 e le 10:00." },
  { question: "Come posso prenotare?", answer: "Tramite prenotazione diretta, per telefono o su WhatsApp. Il soggiorno minimo è di due notti." },
  {
    question: "Qual è la politica di cancellazione?",
    answer:
      "Puoi cancellare la tua prenotazione senza alcuna penale fino a 5 giorni prima della data di arrivo prevista. In caso di cancellazione effettuata nei 5 giorni precedenti al check-in o di mancata presentazione (no-show), verrà addebitato l'intero importo del soggiorno.",
  },
  { question: "Il Wi-Fi è gratuito?", answer: "Sì, la connessione Wi-Fi è gratuita." },
  {
    question: "È disponibile un parcheggio?",
    answer: "Sì, un parcheggio gratuito a 100 metri. È inoltre possibile scaricare i bagagli sotto la struttura dalle 15:00 alle 17:00, esclusi sabato e domenica per la ZTL.",
  },
  { question: "Gli animali domestici sono ammessi?", answer: "No, gli animali non sono ammessi." },
  { question: "Lenzuola e asciugamani sono inclusi?", answer: "Sì, lenzuola e asciugamani sono inclusi." },
  { question: "La cucina è completamente attrezzata?", answer: "Sì, la cucina è completa e attrezzata, con microonde e macchina del caffè a capsule." },
  { question: "Come posso contattarvi durante il soggiorno?", answer: "Siamo raggiungibili per telefono o su WhatsApp, allo stesso numero della prenotazione." },
];

// Etichette delle fasce di sconto (`partnerTierIds` in content.shared.ts).
export const partnerTierLabels: Record<PartnerTierId, string> = {
  "10": "10% di sconto",
  "15": "15% di sconto",
  "20": "20% di sconto",
  gift: "Omaggi gratuiti",
};

// Rete di convenzioni con attività del territorio: sconti riservati a chi
// soggiorna alla Dimora. Tutte le descrizioni sono testo definitivo,
// confermato dalla proprietaria il 5 agosto 2026.
export const partners: Partner[] = [
  {
    name: "Cafè Piazza Tresca",
    category: "Tabaccheria & Ricevitoria",
    tier: "20",
    description:
      "Il bar convenzionato degli ospiti della Dimora, con il 20% di sconto sulla colazione: caffetteria completa a pochi passi dalla struttura, nel cuore del centro storico.",
    logoSrc: "/images/partners/piazza-tresca-cafe.png",
    logoAlt: "Logo di Cafè Piazza Tresca",
    websiteUrl: "https://www.facebook.com/piazzatrescacafe",
  },
  {
    name: "White N'More",
    category: "Camiceria Uomo",
    tier: "20",
    description:
      "Camiceria e abbigliamento uomo nel centro di Sulmona, capi curati per ogni occasione.",
    logoSrc: "/images/partners/white-n-more.png",
    logoAlt: "Logo di White N'More",
    websiteUrl: "https://www.instagram.com/whitenmore.sulmona",
  },
  {
    name: "Nerocaffè",
    category: "Pub Irlandese",
    tier: "10",
    description:
      "Pub irlandese a Introdacqua, a 7 km da Sulmona: hamburger, pinse e fritti in un ambiente conviviale. Il 10% di sconto è riservato alla cena.",
    logoSrc: "/images/partners/nerocaffe.png",
    logoAlt: "Logo di Nerocaffè",
    websiteUrl: "https://www.pubnerocaffe.it/",
  },
  {
    name: "inLumine Studio",
    category: "Consulenza Web & Design",
    tier: "10",
    description:
      "Consulenza web, creazione di siti e negozi online, identità digitale e design: condizioni dedicate a chi soggiorna alla Dimora.",
    logoSrc: "/images/partners/inlumine-studio.svg",
    logoAlt: "Logo di inLumine Studio",
    websiteUrl: "https://www.inlumine.it",
  },
];

// Stringhe di interfaccia finora hardcoded nel JSX dei componenti (mai state
// in `content.ts`): aria-label, segnaposto, testi di sezioni non ancora
// popolate. Un solo posto dove chi traduce deve guardare.
export const ui = {
  openMenu: "Apri il menu",
  closeMenu: "Chiudi il menu",
  navMenuLabel: "Menu di navigazione",
  backToTop: "Torna in cima",
  whatsappLabel: "Scrivici su WhatsApp",
  callLabel: "Chiamaci",
  emailLabel: "Scrivici una mail",
  instagramLabel: "Seguici su Instagram",
  contactsHeading: "Contatti",
  abruzzoMapAriaLabel: "Mappa della regione Abruzzo con indicata la posizione di Sulmona",
  directions: "Indicazioni stradali",
  mapLabel: "Mappa",
  galleryEyebrow: "Galleria",
  galleryTitle: "Gli ambienti della Dimora",
  galleryDescription: "Un assaggio visivo degli spazi che troverai al tuo arrivo.",
  galleryCloseLabel: "Chiudi",
  galleryPrevLabel: "Immagine precedente",
  galleryNextLabel: "Immagine successiva",
  partnersTitle: "Convenzioni riservate ai nostri ospiti",
  partnersDescription: "Una selezione di attività del territorio che offrono condizioni dedicate a chi soggiorna alla Dimora.",
  partnersComingSoon: "Le prime convenzioni sono in arrivo",
  partnersLogoComingSoon: "Logo in arrivo",
  partnerLogoAltPrefix: "Logo di",
  heroImagePlaceholder: "Foto hero in arrivo",
  imagePlaceholder: "Foto in arrivo",
  heroDefaultImageAlt: "Interno della Dimora Cuore della Città",
  locationTeaserImageAlt: "Piazza Garibaldi a Sulmona al tramonto, con gli archi dell'acquedotto medievale",
  homeIntroImageAlt: "Il portone d'ingresso della Dimora, nel centro storico di Sulmona",
  faqImageAlt: "La statua di Ovidio a Sulmona",
  faqAnswerPending: "Risposta in arrivo.",
  homepageBreadcrumb: "Homepage",
  allRightsReserved: "Tutti i diritti riservati.",
  madeBy: "Realizzato da",
};
