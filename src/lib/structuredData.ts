// Dati strutturati (JSON-LD) per i motori di ricerca. Ogni funzione legge da
// `content.ts`, quindi si aggiorna da sola quando cambiano i contenuti reali
// (indirizzo, contatti, comfort, FAQ) - non serve toccare questo file per
// quello. Va toccato solo per aggiungere un tipo di dato nuovo (es. recensioni,
// tariffe) quando arriveranno informazioni che oggi il sito non ha ancora.
import {
  addressParts,
  amenitiesPage,
  faqs,
  heroImageSrc,
  navLinks,
  propertyCoordinates,
  propertyFacts,
  siteConfig,
  siteUrl,
} from "./content";

export function lodgingBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: siteConfig.fullName,
    description: siteConfig.metaDescription,
    url: siteUrl,
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    ...(heroImageSrc ? { image: new URL(heroImageSrc, siteUrl).toString() } : {}),
    address: {
      "@type": "PostalAddress",
      ...addressParts,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: propertyCoordinates.latitude,
      longitude: propertyCoordinates.longitude,
    },
    sameAs: [siteConfig.instagramUrl],
    checkinTime: propertyFacts.checkinTime,
    checkoutTime: propertyFacts.checkoutTime,
    petsAllowed: propertyFacts.petsAllowed,
    numberOfRooms: propertyFacts.numberOfRooms,
    amenityFeature: amenitiesPage.comfortGroups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "LocationFeatureSpecification",
        name: item.title,
        value: true,
      }))
    ),
  };
}

// Breadcrumb a due livelli (Homepage > pagina corrente): il sito non ha
// gerarchie più profonde di questa. `href` deve combaciare con una voce di
// `navLinks`, da cui viene letta l'etichetta - così titolo del breadcrumb e
// voce di menu non possono disallinearsi. Va chiamata solo dalle pagine reali
// (oggi "/la-dimora", "/servizi-comfort", "/posizione"): non ha senso su "/"
// (è già la radice) né sulle sezioni ancora smontate (galleria, partner).
export function breadcrumbListJsonLd(href: string) {
  const current = navLinks.find((link) => link.href === href);
  if (!current) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Homepage", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: current.label,
        item: new URL(href, siteUrl).toString(),
      },
    ],
  };
}

// Solo le domande con una risposta reale: un `FAQPage` con risposte segnaposto
// sarebbe dato falso in pasto a Google, non solo un placeholder visivo.
export function faqPageJsonLd() {
  const answered = faqs.filter(
    (faq): faq is { question: string; answer: string } => Boolean(faq.answer)
  );
  if (answered.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: answered.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
