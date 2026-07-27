import { siteConfig, whatsappMessage } from "./content";

export function telHref(): string {
  return `tel:${siteConfig.phoneHref}`;
}

export function whatsappHref(message: string = whatsappMessage): string {
  const base = `https://wa.me/${siteConfig.whatsappHref}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// Basati sull'indirizzo (`siteConfig.addressLine`), non su un Place ID: il
// profilo Google Business della struttura non è ancora pubblicato. Quando lo
// sarà, questi due andranno aggiornati con l'ID del profilo (mappa più precisa
// e "Indicazioni stradali" che apre la scheda invece del solo indirizzo).
export function mapsEmbedSrc(): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.addressLine)}&output=embed`;
}

export function mapsDirectionsHref(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteConfig.addressLine)}`;
}
