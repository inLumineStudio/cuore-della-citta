import type { Metadata } from "next";
import { StickyHeader } from "@/components/layout/StickyHeader";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { getContent } from "@/lib/content";
import { lodgingBusinessJsonLd } from "@/lib/structuredData";
import { fontVariables } from "../fonts";
import "../globals.css";

const content = getContent("en");

const homeTitle = `Dimora ${content.name} | ${content.metaTitleSuffix}`;

export const metadata: Metadata = {
  metadataBase: new URL(content.siteUrl),
  title: {
    default: homeTitle,
    template: `%s | ${content.name}`,
  },
  description: content.metaDescription,
  applicationName: content.name,
  alternates: { canonical: "/en", languages: { "it-IT": "/", "en-US": "/en" } },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/en",
    siteName: content.fullName,
    title: homeTitle,
    description: content.metaDescription,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

// Root layout indipendente per l'albero "/en" (route reale, non un gruppo):
// Next.js non permette a un layout annidato di ridefinire <html>/<body>,
// quindi ogni lingua ha bisogno del proprio root layout. Vedi CLAUDE.md
// § Multilingua per il perché di questa struttura (route group `(it)` +
// segmento `en`, non un unico layout con locale letta da un header).
export default function EnglishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-cream text-ink font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingBusinessJsonLd("en")) }}
        />
        <StickyHeader locale="en" />
        <main className="flex-1">{children}</main>
        <Footer locale="en" />
        <ScrollToTop locale="en" />
      </body>
    </html>
  );
}
