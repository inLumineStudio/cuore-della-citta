// English text. Same shape as `content.it.ts` — whoever updates a value here
// should check the other file too. Shared/structural data (address, phone,
// image paths) lives in `content.shared.ts`, not here.
//
// Proper nouns kept in Italian on purpose, never translated: Sulmona, Cuore
// della Città (brand), Valle Peligna, Acquedotto Svevo, Majella, Gran Sasso,
// the monument names (Complesso della Santissima Annunziata, Cattedrale di
// San Panfilo, Piazza Garibaldi, Piazza XX Settembre, Giostra Cavalleresca),
// the Latin quote "Sulmo mihi patria est" and its source "Tristia", and the
// full street address. "Ovidio" becomes "Ovid" (the standard English name
// for the poet, not a translation of a place name). "Dimora" is kept
// throughout as a signature word for the property itself (same word used in
// `siteConfigShared.fullName`), the way many Italian properties keep one
// Italian word for character in their English copy.
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
  shortTagline: "An authentic retreat in the heart of the historic center",
  // Kept under ~155 characters: beyond that, Google truncates the SERP snippet.
  metaDescription:
    "Holiday home in the historic center of Sulmona, Abruzzo: carefully finished interiors, direct booking with no middlemen, steps from the wonders of the city.",
  metaTitleSuffix: "Holiday Home in Sulmona",
};

export const navLabels: Record<NavRouteId, string> = {
  home: "Home",
  laDimora: "The Dimora",
  galleria: "Gallery",
  comfort: "Comfort & Information",
  posizione: "Where We Are",
  partner: "Our Partners",
};

// Precompiled WhatsApp message: keeps the same brand phrasing as the Italian
// version, since that's what the owner sees on WhatsApp regardless of the
// visitor's language.
export const whatsappMessage: string =
  "Hi! I saw Cuore Della Città Dimora on the website and I'd like information about availability.";

// Hero claim (shown at the bottom, uppercase via CSS).
export const heroClaim: string = "Arrive. Live. Stay.";

// Line under the wordmark in the Hero's centered lockup: says where we are
// right away to anyone arriving from a link or social media.
export const heroLocation: string = "Sulmona, Abruzzo";

// Line right under `heroLocation`: the claim is purely evocative and stays
// hidden on mobile, so without this line it wasn't clear at a glance what
// kind of place this was. Always visible, unlike the claim.
export const heroDescriptor: string = "A charming, authentic and refined holiday home.";

// Label shared by every booking CTA (Hero, header).
export const bookCtaLabel: string = "Book now";

// Hero's introductory subtitle.
export const heroSubtitle: string =
  "Wake up in the heart of Sulmona, among the streets of the historic center. A welcoming, exclusive residence, and the perfect base for exploring the Valle Peligna and the beauty of Abruzzo.";

// Home "our story" teaser. Photo lives in `homeIntroImageSrc` (content.shared.ts).
export const homeIntro = {
  eyebrow: "Our story",
  title: "Heart, above all.",
  body: [
    "A shell forgotten by time, in which we glimpsed, from the very first moment, the promise of an authentic retreat in the heart of the Valle Peligna. That's where a long restoration journey began, cared for down to the smallest detail.",
    "Not a holiday rental managed from a distance, but a project born from a passion for our region: the heart we poured into it, today, in the heart of the city.",
  ],
  cta: "Discover the Dimora",
  ctaHref: "/la-dimora",
};

// Hero for the inner sections. All of them reuse the home Hero: only the
// line under the wordmark and the photo change, not the rest of the
// structure. `imageSrc` is repeated identically from `content.it.ts` — an
// image path has nothing to translate.
export const pageHeroes = {
  laDimora: {
    claim: "Our Story",
    imageSrc: "/images/sulmona-piazza-garibaldi-giorno.webp",
    imageAlt: "Piazza Garibaldi in Sulmona, with the medieval aqueduct and the eighteenth-century fountain",
  },
  galleria: { claim: "The Dimora, Unfiltered" },
  comfort: {
    claim: "The Dimora Experience",
    imageSrc: "/images/gallery/sulmona-dimora-camera-vista-centro-storico.webp",
    imageAlt: "The Dimora's balcony, with a view of Sulmona's historic center bell tower",
  },
  posizione: {
    claim: "Location & Surroundings",
    imageSrc: "/images/sulmona-acquedotto-medievale.webp",
    imageAlt: "The arches of Sulmona's medieval aqueduct, in Piazza Garibaldi",
  },
  partner: {
    claim: "Exclusive Perks",
    imageSrc: "/images/sulmona-portale-santissima-annunziata.webp",
    imageAlt: "The carved portal of the Complesso della Santissima Annunziata in Sulmona",
  },
} satisfies Record<string, PageHero>;

// Extended narrative for the "/la-dimora" page (`About` component). It's the
// "director's cut" of the `homeIntro` teaser: the same story, told in full.
export const aboutPage = {
  title: "Built with heart, steeped in the history of Sulmona.",
  subtitle: "Where care for every detail meets the thousand-year soul of the Valle Peligna.",
  paragraphs: [
    "Some places are born not by chance, but from the deliberate will to breathe new life into a vision.",
    "When we first crossed its threshold, this building was a forgotten shell, worn down by time. But in those stones and those spaces we immediately glimpsed a unique potential: the promise of an authentic retreat in the heart of the Valle Peligna.",
    "That's how a long, passionate journey of complete restoration began. Work cared for down to the smallest detail, day after day, driven by steady dedication to turn a demanding building site into an elegant, calm and welcoming place.",
    "It's no coincidence that all this is taking shape in Sulmona. Birthplace of Ovid, the poet of the Metamorphoses, Sulmona has for centuries been a city of patient craftsmanship and genuine hospitality, set between the majesty of the Acquedotto Svevo and the peaks of the Majella.",
    "Just as our city has, over time, turned stone and tradition into timeless beauty, we wanted to give this space a contemporary soul without losing its historical roots.",
    "This is not simply a holiday rental managed from a distance: it's a project born from a passion for our region and a desire to offer a genuine experience. Every corner, every piece of furniture and every comfort has been chosen with care, because we believe an unforgettable stay isn't made of design alone, but of the energy of those who have invested dreams, time and dedication in a place.",
  ],
  ctaTitle: "Feel the warmth of home in the heart of Sulmona.",
  ctaDescription:
    "Book your stay directly with us: live an authentic experience, sheltered by the majesty of Abruzzo and cared for in every detail.",
  ctaPrimaryLabel: "Check availability",
  ctaSecondaryLabel: "Contact us on WhatsApp",
};

// Real content provided by the owner for "/servizi-comfort" (`Amenities`
// component). Check-in/check-out, cancellation, parking/limited traffic zone
// and kitchen deliberately repeat the same information as the home FAQ.
export const amenitiesPage = {
  title: "Comfort & Information",
  subtitle: "Every detail is designed to give you a stay full of charm, relaxation and the utmost care in the heart of Sulmona.",
  comfortGroups: [
    {
      title: "Spaces & Hospitality",
      items: [
        { icon: "bed-double", title: "2 Elegant Double Bedrooms", description: "Up to 4 spacious, comfortable beds." },
        { icon: "baby", title: "Family-Friendly", description: "Cot or crib available on request." },
        { icon: "shirt", title: "Welcome Set", description: "Bed linen and a full set of towels included." },
      ],
    },
    {
      title: "Kitchen & Mornings",
      items: [
        { icon: "utensils", title: "Full Kitchen", description: "Fully equipped with appliances and a microwave." },
        {
          icon: "coffee",
          title: "Your Good Morning",
          description: "A capsule espresso machine on site, or breakfast at our partner café.",
        },
      ],
    },
    {
      title: "Climate & Services",
      items: [
        { icon: "air-vent", title: "Ideal Microclimate", description: "Independently controlled air conditioning for every season." },
        { icon: "wifi", title: "Connectivity", description: "Free high-speed Wi-Fi throughout the property." },
        { icon: "wand-sparkles", title: "Beauty", description: "Hairdryer provided." },
      ],
    },
  ] satisfies AmenityGroup[],
  infoGroups: [
    {
      title: "Hours & Stay",
      items: [
        { icon: "clock", title: "Check-in", description: "From 3:00 PM to 8:00 PM." },
        { icon: "clock", title: "Check-out", description: "Between 8:00 AM and 10:00 AM." },
        { icon: "calendar-days", title: "Minimum Stay", description: "Two nights, to ensure a fully relaxing experience." },
      ],
    },
    {
      title: "Arrival & Parking",
      items: [
        { icon: "square-parking", title: "Free Parking", description: "Just 100 meters from the property." },
        {
          icon: "luggage",
          title: "Luggage Access (Limited Traffic Zone)",
          description:
            "Luggage drop-off beneath the property from 3:00 PM to 5:00 PM, Monday to Friday. On Saturdays and Sundays the area is entirely pedestrian.",
        },
      ],
    },
    {
      title: "Caring for the Dimora & Policies",
      items: [
        { icon: "cigarette-off", title: "Non-Smoking Property", description: "The entire property is non-smoking, with a designated outdoor area." },
        { icon: "paw-print", title: "No Pets Allowed", description: "To guarantee the highest hygiene standards for all guests." },
        {
          icon: "utensils-crossed",
          title: "Respect for the Spaces",
          description: "Food and drinks only in the kitchen or dining area, to keep the bedrooms fresh.",
        },
        { icon: "moon", title: "Quiet Hours", description: "Quiet hours from 10:00 PM to 8:00 AM and from 2:00 PM to 4:00 PM." },
      ],
    },
  ] satisfies AmenityGroup[],
  ctaTitle: "Book directly through the website",
  ctaDescription: "No booking fees, best rate guaranteed, and dedicated phone support before and during your stay in Sulmona.",
  ctaPrimaryLabel: "Call now",
  ctaSecondaryLabel: "Contact us on WhatsApp",
};

// Full set of four real photos provided by the owner (two on 22 July, two
// on 31 July 2026).
export const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery/sulmona-dimora-camera-matrimoniale.webp",
    alt: "The Dimora's double bedroom, with a vaulted brick ceiling and a view of the historic center",
    width: 2048,
    height: 1536,
  },
  {
    src: "/images/gallery/sulmona-dimora-seconda-camera.webp",
    alt: "The Dimora's second bedroom, with a small writing nook",
    width: 2048,
    height: 1536,
  },
  {
    src: "/images/gallery/sulmona-dimora-soggiorno-cucina.webp",
    alt: "The Dimora's living room and kitchenette, with a view through to the bedroom",
    width: 1600,
    height: 1200,
  },
  {
    src: "/images/gallery/sulmona-centro-storico-piazza.webp",
    alt: "A square in Sulmona's historic center, just steps from the Dimora",
    width: 1600,
    height: 1200,
  },
  {
    src: "/images/gallery/sulmona-dimora-facciata-esterna.webp",
    alt: "The Dimora's facade in Sulmona's historic center",
    width: 1600,
    height: 1064,
  },
  {
    src: "/images/gallery/sulmona-dimora-portone-ingresso.webp",
    alt: "The Dimora's entrance door, in the heart of Sulmona's historic center",
    width: 1199,
    height: 1600,
  },
  {
    src: "/images/gallery/sulmona-dimora-ingresso-luce-giorno.webp",
    alt: "The Dimora's entryway in full daylight, with the kitchen in the background",
    width: 1064,
    height: 1600,
  },
  {
    src: "/images/gallery/sulmona-dimora-cucina-luce-naturale.webp",
    alt: "The Dimora's kitchen in full daylight, with the balcony open onto the historic center",
    width: 989,
    height: 1319,
  },
  {
    src: "/images/gallery/sulmona-dimora-cucina-tavolo-apparecchiato.webp",
    alt: "The Dimora's kitchen with the table set, beneath the vaulted brick ceiling",
    width: 1200,
    height: 1600,
  },
  {
    src: "/images/gallery/sulmona-dimora-cucina-corridoio.webp",
    alt: "The Dimora's kitchen seen from the dining table, with the hallway toward the bedrooms",
    width: 1600,
    height: 1064,
  },
  {
    src: "/images/gallery/sulmona-dimora-camera-soffitto-a-volta.webp",
    alt: "The double bedroom at dusk, with the vaulted brick ceiling and the balcony overlooking the street",
    width: 1199,
    height: 1600,
  },
  {
    src: "/images/gallery/sulmona-dimora-camera-balcone-centro-storico.webp",
    alt: "The double bedroom with the balcony open onto Sulmona's historic center",
    width: 1600,
    height: 1064,
  },
  {
    src: "/images/gallery/sulmona-dimora-camera-angolo-toeletta.webp",
    alt: "The second bedroom, with the vanity nook and the French doors onto the balcony",
    width: 1600,
    height: 1067,
  },
  {
    src: "/images/gallery/sulmona-dimora-camera-comodini-illuminati.webp",
    alt: "The second bedroom with the lit nightstands, in the evening",
    width: 1351,
    height: 760,
  },
  {
    src: "/images/gallery/sulmona-dimora-camera-vista-centro-storico.webp",
    alt: "One of the bedrooms' balcony, with a view of the historic center's bell tower",
    width: 2400,
    height: 1596,
  },
  {
    src: "/images/gallery/sulmona-dimora-balcone-fiorito-piazza.webp",
    alt: "The Dimora's flower-lined balcony, overlooking the square in the historic center",
    width: 1600,
    height: 1199,
  },
  {
    src: "/images/gallery/sulmona-dimora-bagno-doccia.webp",
    alt: "The Dimora's bathroom, with a shower and French doors onto a small balcony",
    width: 1061,
    height: 1415,
  },
];

// Rendered by the Footer on every page when set.
export const photoCredits: string | undefined =
  "The images on this website are the property of their respective owners.";

export const positionTeaser = {
  eyebrow: "Where we are",
  title: "In the heart of the city, literally",
  description: "Just steps from the wonders of the historic center: the ideal base for discovering Sulmona's history on foot.",
  cta: "Discover where we are",
  ctaHref: "/posizione",
};

// "Where We Are" page ("/posizione", `Location` component) - different from
// `positionTeaser` above, which remains the short home panel.
export const locationPage = {
  eyebrow: "Location",
  title: "The beauty of Sulmona, just outside your door",
  description:
    "Staying on Via Panfilo Scudieri means immersing yourself in the most authentic rhythm of Sulmona. Once you step outside, you won't need a map or a car: historic alleyways, striking piazzas, century-old cafés and centuries of architecture reveal themselves all around you, just a short walk away. A privileged location that lets you experience the city not as a mere tourist, but as a true protagonist.",
  poiLabel: "Some of the landmarks not to miss",
  mapCaption:
    "From Sulmona, all four provincial capitals are within easy reach: Chieti in about 50 minutes, Pescara in an hour, L'Aquila in about an hour and a quarter, Teramo in about an hour and a half. A strategic base for exploring the whole region, from the Adriatic coast to the peaks of the Gran Sasso and the Majella.",
};

// Ordered by increasing distance: the list is rendered in array order.
// `name` (monument names) is identical to `content.it.ts`: these are proper
// names and are not translated.
export const pointsOfInterest: PointOfInterest[] = [
  {
    name: "Complesso della Santissima Annunziata",
    distance: "2 min walk",
    description: "Sulmona's landmark monument: a late-Gothic and Renaissance façade side by side, today home to the Civic Museum.",
  },
  {
    name: "Cattedrale di San Panfilo",
    distance: "4 min walk",
    description: "Built over an Italic-Roman temple: a crypt and Romanesque origins dedicated to the city's patron saint.",
  },
  {
    name: "Statua di Ovidio, Piazza XX Settembre",
    distance: "5 min walk",
    description: "A tribute to the Latin poet born in Sulmona: \"Sulmo mihi patria est,\" as he himself wrote in the Tristia.",
  },
  {
    name: "Piazza Garibaldi",
    distance: "6 min walk",
    description: "The city's living room, lined by the arches of the medieval aqueduct: this is where the Giostra Cavalleresca takes place.",
  },
];

export const faqPanel = {
  eyebrow: "Frequently asked questions",
  title: "Everything you need to know",
  description: "Answers to the questions we're asked most often. If yours isn't listed, get in touch: we'll answer you directly, no middlemen.",
  cta: "Message us on WhatsApp",
};

export const faqs: Faq[] = [
  { question: "What are the check-in and check-out times?", answer: "Check-in from 3:00 PM to 8:00 PM; check-out between 8:00 AM and 10:00 AM." },
  { question: "How can I book?", answer: "Through direct booking, by phone or on WhatsApp. The minimum stay is two nights." },
  {
    question: "What is the cancellation policy?",
    answer:
      "You can cancel your booking free of charge up to 5 days before your scheduled arrival date. If you cancel within 5 days of check-in, or in the case of a no-show, the full amount of the stay will be charged.",
  },
  { question: "Is Wi-Fi free?", answer: "Yes, Wi-Fi is free." },
  {
    question: "Is parking available?",
    answer:
      "Yes, free parking is available 100 meters away. You can also drop off luggage beneath the property from 3:00 PM to 5:00 PM, except on Saturdays and Sundays due to the limited traffic zone.",
  },
  { question: "Are pets allowed?", answer: "No, pets are not allowed." },
  { question: "Are bed linen and towels included?", answer: "Yes, bed linen and towels are included." },
  { question: "Is the kitchen fully equipped?", answer: "Yes, the kitchen is complete and fully equipped, with a microwave and a capsule coffee machine." },
  { question: "How can I contact you during my stay?", answer: "You can reach us by phone or on WhatsApp, at the same number used for booking." },
];

// Discount tier labels (`partnerTierIds` in content.shared.ts).
export const partnerTierLabels: Record<PartnerTierId, string> = {
  "10": "10% off",
  "15": "15% off",
  "20": "20% off",
  gift: "Free perks",
};

// Network of partnerships with local businesses: discounts reserved for
// guests staying at the Dimora. All descriptions are final copy, confirmed
// by the owner on August 5, 2026.
export const partners: Partner[] = [
  {
    name: "Cafè Piazza Tresca",
    category: "Tobacconist & Lottery Point",
    tier: "20",
    description:
      "Our partner café for guests of the Dimora, with 20% off breakfast: a full coffee bar just steps from the property, in the heart of the historic center.",
    logoSrc: "/images/partners/piazza-tresca-cafe.png",
    logoAlt: "Cafè Piazza Tresca logo",
    websiteUrl: "https://www.facebook.com/piazzatrescacafe",
  },
  {
    name: "Nerocaffè",
    category: "Irish Pub",
    tier: "10",
    description:
      "Irish pub in Introdacqua, 7 km from Sulmona: burgers, pinsa, and fried specialties in a lively setting. The 10% discount applies to dinner only.",
    logoSrc: "/images/partners/nerocaffe.png",
    logoAlt: "Nerocaffè logo",
    websiteUrl: "https://www.pubnerocaffe.it/",
  },
  {
    name: "White N'More",
    category: "Men's Shirt Shop",
    tier: "20",
    description:
      "Men's shirts and clothing in the center of Sulmona, well-made pieces for every occasion.",
    logoSrc: "/images/partners/white-n-more.png",
    logoAlt: "White N'More logo",
    websiteUrl: "https://www.instagram.com/whitenmore.sulmona",
  },
  {
    name: "inLumine Studio",
    category: "Web Consulting & Design",
    tier: "10",
    description:
      "Web consulting, website and online store development, digital identity and design: dedicated rates for guests staying at the Dimora.",
    logoSrc: "/images/partners/inlumine-studio.svg",
    logoAlt: "inLumine Studio logo",
    websiteUrl: "https://www.inlumine.it",
  },
];

// Interface strings so far hardcoded in component JSX (never lived in
// `content.ts`): aria-labels, placeholders, copy for not-yet-populated
// sections. One place for translators to check.
export const ui = {
  openMenu: "Open menu",
  closeMenu: "Close menu",
  navMenuLabel: "Navigation menu",
  backToTop: "Back to top",
  whatsappLabel: "Message us on WhatsApp",
  callLabel: "Call us",
  emailLabel: "Email us",
  instagramLabel: "Follow us on Instagram",
  contactsHeading: "Contact",
  abruzzoMapAriaLabel: "Map of the Abruzzo region showing the location of Sulmona",
  directions: "Get directions",
  mapLabel: "Map",
  galleryEyebrow: "Gallery",
  galleryTitle: "Inside the Dimora",
  galleryDescription: "A visual preview of the spaces you'll find when you arrive.",
  galleryCloseLabel: "Close",
  galleryPrevLabel: "Previous image",
  galleryNextLabel: "Next image",
  partnersTitle: "Special offers for our guests",
  partnersDescription: "A selection of local businesses offering dedicated rates to guests staying at the Dimora.",
  partnersComingSoon: "Our first partnerships are on their way",
  partnersLogoComingSoon: "Logo coming soon",
  partnerLogoAltPrefix: "Logo of",
  heroImagePlaceholder: "Hero photo coming soon",
  imagePlaceholder: "Photo coming soon",
  heroDefaultImageAlt: "Interior of Dimora Cuore della Città",
  locationTeaserImageAlt: "Piazza Garibaldi in Sulmona at sunset, with the arches of the medieval aqueduct",
  homeIntroImageAlt: "The Dimora's entrance door, in Sulmona's historic center",
  faqImageAlt: "The statue of Ovid in Sulmona",
  faqAnswerPending: "Answer coming soon.",
  homepageBreadcrumb: "Home",
  allRightsReserved: "All rights reserved.",
  madeBy: "Made by",
};
