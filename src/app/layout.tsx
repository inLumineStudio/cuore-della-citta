import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import localFont from "next/font/local";
import { StickyHeader } from "@/components/layout/StickyHeader";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

// Usato esclusivamente per il titolo "Cuore della Città" nella Hero
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

// Display, solo per il wordmark e il claim della Hero. Font commerciale fornito
// dal cliente: il file vive nel repo (`src/app/fonts/`), non su Google Fonts.
const flaviotte = localFont({
  src: "./fonts/Flaviotte.woff2",
  variable: "--font-flaviotte",
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

export const metadata: Metadata = {
  title: "Dimora Cuore della Città | Casa vacanze nel centro storico",
  description:
    "Dimora Cuore della Città: un rifugio autentico nel cuore del centro storico. Camere curate, ospitalità italiana e la città a due passi dalla porta.",
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
      className={`${newsreader.variable} ${generalSans.variable} ${flaviotte.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-body">
        <StickyHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
