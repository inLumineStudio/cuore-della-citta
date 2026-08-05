// Punto d'ingresso unico per il contenuto del sito: unisce i dati condivisi
// (`content.shared.ts`) con la prosa della lingua richiesta (`content.it.ts`
// / `content.en.ts`). I componenti chiamano `getContent(locale)` invece di
// importare le stringhe direttamente. Vedi CLAUDE.md § Multilingua.
import * as en from "./content.en";
import * as it from "./content.it";
import * as shared from "./content.shared";
import type { Locale } from "./i18n";

export type {
  AmenityGroup,
  AmenityIcon,
  AmenityItem,
  Faq,
  GalleryImage,
  NavRouteId,
  PageHero,
  Partner,
  PartnerTierId,
  PointOfInterest,
} from "./content.shared";

const byLocale = { it, en };

// Verifica statica: se `content.en.ts` perde o rinomina un campo rispetto a
// `content.it.ts` (o viceversa), questa riga smette di compilare invece di
// far scoprire il disallineamento a runtime in una sola lingua.
const _localeShapeCheck: typeof it = en;
void _localeShapeCheck;

export function getContent(locale: Locale) {
  const l = byLocale[locale];
  return {
    ...shared,
    // `siteConfigShared` (nome, telefono, email, indirizzo...) e `siteConfig`
    // (shortTagline/metaDescription/metaTitleSuffix, per lingua) sono due
    // oggetti separati nei moduli sorgente - qui riportati anche a livello
    // piatto, così i componenti leggono `content.name`/`content.email`/
    // `content.metaDescription` senza sapere in quale dei due file vive
    // ciascun campo.
    ...shared.siteConfigShared,
    ...l,
    ...l.siteConfig,
    navLinks: shared.navRoutes.map((route) => ({
      href: route.href,
      label: l.navLabels[route.id],
    })),
    // Partner raggruppati per fascia di sconto (`partnerTierIds`), nell'ordine
    // in cui vanno mostrati; le fasce senza partner non compaiono qui, così
    // il componente non deve occuparsene.
    partnerTiers: shared.partnerTierIds
      .map((id) => ({
        id,
        title: l.partnerTierLabels[id],
        partners: l.partners.filter((partner) => partner.tier === id),
      }))
      .filter((tier) => tier.partners.length > 0),
  };
}
