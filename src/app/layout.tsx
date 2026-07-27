import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import localFont from "next/font/local";
import { StickyHeader } from "@/components/layout/StickyHeader";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { siteConfig, siteUrl } from "@/lib/content";
import { lodgingBusinessJsonLd } from "@/lib/structuredData";
import "./globals.css";

// Usato esclusivamente per il titolo "Cuore della Città" nella Hero
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

// Display degli heading. Font commerciale fornito dal cliente: il file vive nel
// repo (`src/app/fonts/`), non su Google Fonts.
const flaviotte = localFont({
  src: "./fonts/Flaviotte.woff2",
  variable: "--font-flaviotte",
  display: "swap",
});

// In prova sui due elementi grandi della Hero (wordmark e claim), dove ha
// sostituito Flaviotte. Del kit sta in repo solo il taglio regular: il corsivo
// non serve a nessuno dei due.
const megdira = localFont({
  src: "./fonts/Megdira.woff2",
  variable: "--font-megdira",
  display: "swap",
});

// Font per tutto il resto del sito. Anche questo è fornito dal cliente e vive
// nel repo; sono inclusi solo i tagli effettivamente usati (400/500/600 + il
// corsivo 400), non tutta la famiglia.
const generalSans = localFont({
  src: [
    { path: "./fonts/GeneralSans-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/GeneralSans-Italic.otf", weight: "400", style: "italic" },
    { path: "./fonts/GeneralSans-Medium.otf", weight: "500", style: "normal" },
    { path: "./fonts/GeneralSans-Semibold.otf", weight: "600", style: "normal" },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

// Tenuto sotto i ~60 caratteri: oltre, Google tronca il titolo in SERP.
const homeTitle = `Dimora ${siteConfig.name} | Casa vacanze a Sulmona`;

export const metadata: Metadata = {
  // Serve a rendere assoluti gli URL di Open Graph e i canonical: senza,
  // Next emette percorsi relativi che i social non sanno risolvere.
  metadataBase: new URL(siteUrl),
  title: {
    default: homeTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.metaDescription,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "/",
    siteName: siteConfig.fullName,
    title: homeTitle,
    description: siteConfig.metaDescription,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      data-scroll-behavior="smooth"
      className={`${newsreader.variable} ${generalSans.variable} ${flaviotte.variable} ${megdira.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-body">
        {/* LodgingBusiness: presente su ogni pagina, è l'entità del sito
            (indirizzo, contatti, comfort) - non solo la home. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingBusinessJsonLd()) }}
        />
        <StickyHeader />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
