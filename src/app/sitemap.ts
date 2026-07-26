import type { MetadataRoute } from "next";
import { navLinks, showFullNav, siteUrl } from "@/lib/content";

// Con `showFullNav = false` le altre route reindirizzano alla home: elencarle
// nella sitemap significherebbe segnalare a Google pagine che rimandano
// altrove. Finché la bozza è così, la sitemap contiene solo `/`.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const home = {
    url: siteUrl,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 1,
  };

  if (!showFullNav) return [home];

  return [
    home,
    // "Homepage" punta a "/", già coperta da `home`: esclusa per non duplicare
    // la voce nella sitemap.
    ...navLinks
      .filter((link) => link.href !== "/")
      .map((link) => ({
        url: new URL(link.href, siteUrl).toString(),
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
  ];
}
