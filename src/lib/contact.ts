import { siteConfigShared } from "./content.shared";

export function telHref(): string {
  return `tel:${siteConfigShared.phoneHref}`;
}

// `message` non ha più un default hardcoded (era legato a un'unica lingua):
// i chiamanti passano `content.whatsappMessage` della locale corrente.
export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${siteConfigShared.whatsappHref}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// Basati sull'indirizzo (`siteConfigShared.addressLine`), non su un Place ID:
// il profilo Google Business della struttura non è ancora pubblicato. Quando
// lo sarà, questi due andranno aggiornati con l'ID del profilo (mappa più
// precisa e "Indicazioni stradali" che apre la scheda invece del solo
// indirizzo).
export function mapsEmbedSrc(): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(siteConfigShared.addressLine)}&output=embed`;
}

export function mapsDirectionsHref(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteConfigShared.addressLine)}`;
}
