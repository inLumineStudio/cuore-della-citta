import { siteConfig, whatsappMessage } from "./content";

export function telHref(): string {
  return `tel:${siteConfig.phoneHref}`;
}

export function whatsappHref(message: string = whatsappMessage): string {
  const base = `https://wa.me/${siteConfig.whatsappHref}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telegramHref(): string {
  return `https://t.me/${siteConfig.telegramUsername}`;
}
