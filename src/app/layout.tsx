import type { Metadata } from "next";
import { Newsreader, Work_Sans } from "next/font/google";
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

// Font per tutto il resto del sito
const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  style: ["normal", "italic"],
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
      className={`${newsreader.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-body">
        <StickyHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
