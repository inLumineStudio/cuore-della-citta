import { googleBusinessCid, propertyCoordinates, siteConfigShared } from "./content.shared";

export function telHref(): string {
  return `tel:${siteConfigShared.phoneHref}`;
}

// `message` non ha più un default hardcoded (era legato a un'unica lingua):
// i chiamanti passano `content.whatsappMessage` della locale corrente.
export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${siteConfigShared.whatsappHref}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// Basati sulla scheda Google Business della struttura (CID in
// `content.shared.ts`): la mappa incorporata mostra il nome, la valutazione e
// il pulsante "Apri in Maps" invece del solo indirizzo. Le indicazioni
// puntano alle coordinate esatte del segnaposto della scheda.
export function googleMapsProfileHref(): string {
  return `https://www.google.com/maps?cid=${googleBusinessCid}`;
}

export function mapsEmbedSrc(): string {
  return `${googleMapsProfileHref()}&z=17&output=embed`;
}

export function mapsDirectionsHref(): string {
  const { latitude, longitude } = propertyCoordinates;
  return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
}
