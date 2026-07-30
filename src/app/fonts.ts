// Font condivisi tra i due root layout (`(it)/layout.tsx` e `en/layout.tsx`):
// next/font va chiamato una sola volta per font, non duplicato per lingua.
import { Newsreader } from "next/font/google";
import localFont from "next/font/local";

// Usato esclusivamente per il titolo "Cuore della Città" nella Hero
export const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

// Display degli heading. Font commerciale fornito dal cliente: il file vive nel
// repo (`src/app/fonts/`), non su Google Fonts.
export const flaviotte = localFont({
  src: "./fonts/Flaviotte.woff2",
  variable: "--font-flaviotte",
  display: "swap",
});

// In prova sui due elementi grandi della Hero (wordmark e claim), dove ha
// sostituito Flaviotte. Del kit sta in repo solo il taglio regular: il corsivo
// non serve a nessuno dei due.
export const megdira = localFont({
  src: "./fonts/Megdira.woff2",
  variable: "--font-megdira",
  display: "swap",
});

// Font per tutto il resto del sito. Anche questo è fornito dal cliente e vive
// nel repo; sono inclusi solo i tagli effettivamente usati (400/500/600 + il
// corsivo 400), non tutta la famiglia. `.woff2`, non `.otf`: convertiti il 30
// luglio 2026 (~48% più leggeri, stesso rapporto già visto sulle immagini
// WebP - vedi CLAUDE.md § Font).
export const generalSans = localFont({
  src: [
    { path: "./fonts/GeneralSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GeneralSans-Italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/GeneralSans-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/GeneralSans-Semibold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

export const fontVariables = `${newsreader.variable} ${generalSans.variable} ${flaviotte.variable} ${megdira.variable}`;
