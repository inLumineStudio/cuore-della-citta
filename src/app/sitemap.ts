import type { MetadataRoute } from "next";
import { navRoutes, showFullNav, siteUrl } from "@/lib/content.shared";
import { localizeHref, locales } from "@/lib/i18n";

// Con `showFullNav = false` le altre route reindirizzano alla home (in
// entrambe le lingue): elencarle nella sitemap significherebbe segnalare a
// Google pagine che rimandano altrove. Finché la bozza è così, la sitemap
// contiene solo le due home.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = showFullNav ? navRoutes : navRoutes.filter((route) => route.id === "home");

  return routes.flatMap((route) => {
    const languages = Object.fromEntries(
      locales.map((locale) => [
        locale === "it" ? "it-IT" : "en-US",
        new URL(localizeHref(route.href, locale), siteUrl).toString(),
      ])
    );

    return locales.map((locale) => ({
      url: new URL(localizeHref(route.href, locale), siteUrl).toString(),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: route.id === "home" ? 1 : 0.7,
      alternates: { languages },
    }));
  });
}
