// Dati strutturati (JSON-LD) per i motori di ricerca. Ogni funzione prende
// `locale` e legge da `getContent(locale)`, quindi si aggiorna da sola quando
// cambiano i contenuti reali (indirizzo, contatti, comfort, FAQ) - non serve
// toccare questo file per quello. Va toccato solo per aggiungere un tipo di
// dato nuovo (es. recensioni, tariffe) quando arriveranno informazioni che
// oggi il sito non ha ancora.
import { getContent } from "./content";
import { addressParts, heroImageSrc, propertyCoordinates, propertyFacts, siteUrl } from "./content.shared";
import { localizeHref, type Locale } from "./i18n";

export function lodgingBusinessJsonLd(locale: Locale) {
  const content = getContent(locale);

  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: content.fullName,
    description: content.metaDescription,
    url: siteUrl,
    telephone: content.phoneDisplay,
    email: content.email,
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
    sameAs: [content.instagramUrl],
    checkinTime: propertyFacts.checkinTime,
    checkoutTime: propertyFacts.checkoutTime,
    petsAllowed: propertyFacts.petsAllowed,
    numberOfRooms: propertyFacts.numberOfRooms,
    amenityFeature: content.amenitiesPage.comfortGroups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "LocationFeatureSpecification",
        name: item.title,
        value: true,
      }))
    ),
  };
}

// Breadcrumb a due livelli (Homepage > pagina corrente): il sito non ha
// gerarchie più profonde di questa. `href` è il percorso neutro (senza
// prefisso di lingua, come in `navLinks`), da cui viene letta l'etichetta -
// così titolo del breadcrumb e voce di menu non possono disallinearsi. Va
// chiamata solo dalle pagine reali (oggi "/la-dimora", "/servizi-comfort",
// "/posizione"): non ha senso su "/" (è già la radice) né sulle sezioni
// ancora smontate (galleria, partner).
export function breadcrumbListJsonLd(locale: Locale, href: string) {
  const content = getContent(locale);
  const current = content.navLinks.find((link) => link.href === href);
  if (!current) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: content.ui.homepageBreadcrumb,
        item: new URL(localizeHref("/", locale), siteUrl).toString(),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: current.label,
        item: new URL(localizeHref(href, locale), siteUrl).toString(),
      },
    ],
  };
}

// Solo le domande con una risposta reale: un `FAQPage` con risposte segnaposto
// sarebbe dato falso in pasto a Google, non solo un placeholder visivo.
export function faqPageJsonLd(locale: Locale) {
  const content = getContent(locale);
  const answered = content.faqs.filter(
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
