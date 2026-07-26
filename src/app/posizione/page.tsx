import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { pageHeroes, showFullNav } from "@/lib/content";

export const metadata: Metadata = {
  title: "Posizione & Mappa",
  description:
    "Come raggiungere Dimora Cuore della Città e i principali punti di interesse del centro storico nelle vicinanze.",
};

// Per ora solo la Hero: il blocco con i punti di interesse e il segnaposto
// mappa (`Location`) è pronto ma smontato, in attesa dei tempi di percorrenza
// verificati e della mappa vera. Il teaser in home resta.
export default function PosizionePage() {
  if (!showFullNav) {
    redirect("/");
  }

  return <Hero {...pageHeroes.posizione} subtitle="" showClaimOnMobile />;
}
