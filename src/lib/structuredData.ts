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
