import type { Metadata } from "next";
import { StickyHeader } from "@/components/layout/StickyHeader";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { getContent } from "@/lib/content";
import { lodgingBusinessJsonLd } from "@/lib/structuredData";
import { buildOpenGraph } from "@/lib/seo";
import { fontVariables } from "../fonts";
import "../globals.css";

const content = getContent("it");

// Tenuto sotto i ~60 caratteri: oltre, Google tronca il titolo in SERP.
const homeTitle = `Dimora ${content.name} | ${content.metaTitleSuffix}`;

export const metadata: Metadata = {
  // Serve a rendere assoluti gli URL di Open Graph e i canonical: senza,
  // Next emette percorsi relativi che i social non sanno risolvere.
  metadataBase: new URL(content.siteUrl),
  title: {
    default: homeTitle,
    template: `%s | ${content.name}`,
  },
  description: content.metaDescription,
  applicationName: content.name,
  alternates: { canonical: "/", languages: { "it-IT": "/", "en-US": "/en", "x-default": "/" } },
  // Ogni pagina figlia dichiara il proprio `openGraph` completo (vedi
  // `buildOpenGraph`): questo è solo il fallback per l'home, che non ha un
  // proprio page.tsx con metadata dedicati.
  openGraph: buildOpenGraph({
    locale: "it",
    path: "/",
    title: homeTitle,
    description: content.metaDescription,
    image: {
      src: "/opengraph-image.jpg",
      alt: "La camera della Dimora Cuore della Città, con la porta-finestra aperta sul centro storico di Sulmona",
    },
  }),
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function ItalianRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" data-scroll-behavior="smooth" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-ink font-body">
        {/* LodgingBusiness: presente su ogni pagina, è l'entità del sito
            (indirizzo, contatti, comfort) - non solo la home. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingBusinessJsonLd("it")) }}
        />
        <StickyHeader locale="it" />
        <main className="flex-1">{children}</main>
        <Footer locale="it" />
        <ScrollToTop locale="it" />
      </body>
    </html>
  );
}
