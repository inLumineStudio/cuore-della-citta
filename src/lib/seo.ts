// Costruisce un oggetto `openGraph` completo (title/description/url/images)
// per un singolo segmento di route. Next.js unisce i metadata di più segmenti
// in modo "shallow": se un segmento definisce il proprio `openGraph`, quello
// intero sostituisce quello ereditato dal layout padre, campo per campo (non
// c'è merge profondo) - vedi la sezione "Merging" della documentazione
// ufficiale (node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md).
// Prima di questo helper ogni pagina che non dichiarava un proprio `openGraph`
// ereditava quello dell'home (titolo, descrizione e URL sbagliati in ogni
// preview social/WhatsApp) - verificato in modo empirico avviando il dev
// server e ispezionando l'HTML servito, non solo dedotto dai docs. Ogni
// pagina deve quindi chiamare questa funzione esplicitamente, home comprese.
import { siteConfigShared } from "./content.shared";
import { localizeHref, type Locale } from "./i18n";

type OgImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export function buildOpenGraph({
  locale,
  path,
  title,
  description,
  image,
}: {
  locale: Locale;
  /** Percorso neutro, senza prefisso di lingua (es. "/", "/la-dimora"). */
  path: string;
  title: string;
  description: string;
  image: OgImage;
}) {
  return {
    type: "website" as const,
    locale: locale === "it" ? "it_IT" : "en_US",
    url: localizeHref(path, locale),
    siteName: siteConfigShared.fullName,
    title,
    description,
    images: [
      {
        url: image.src,
        width: image.width ?? 1200,
        height: image.height ?? 630,
        alt: image.alt,
      },
    ],
  };
}
