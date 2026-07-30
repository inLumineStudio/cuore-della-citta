// Instradamento IT/EN: l'italiano resta senza prefisso (nessun URL cambia,
// protegge il lavoro SEO già fatto), l'inglese vive sotto "/en" con gli
// stessi slug (nessuna traduzione dei percorsi). Vedi CLAUDE.md § Multilingua
// per l'architettura completa (route group `(it)` + segmento reale `en`).

export type Locale = "it" | "en";

export const locales: Locale[] = ["it", "en"];

export const defaultLocale: Locale = "it";

// Da un href neutro (es. "/la-dimora") all'URL reale per la locale data.
export function localizeHref(href: string, locale: Locale): string {
  if (locale === defaultLocale) return href;
  return href === "/" ? "/en" : `/en${href}`;
}

// Dal pathname corrente (qualsiasi lingua) all'equivalente nell'altra lingua,
// per lo `LanguageSwitcher`: non porta all'home, resta sulla stessa pagina.
export function alternateLocalePath(pathname: string, currentLocale: Locale): string {
  const neutralHref =
    currentLocale === "en" ? (pathname === "/en" ? "/" : pathname.replace(/^\/en/, "") || "/") : pathname;
  const targetLocale: Locale = currentLocale === "it" ? "en" : "it";
  return localizeHref(neutralHref, targetLocale);
}
