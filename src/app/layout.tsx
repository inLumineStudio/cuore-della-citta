import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import { StickyHeader } from "@/components/layout/StickyHeader";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

// Usato esclusivamente per il titolo "Cuore della Città" nella Hero
const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

// Font per tutto il resto del sito
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
      className={`${bodoniModa.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink font-body">
        <StickyHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
