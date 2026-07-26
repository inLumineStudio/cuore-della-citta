import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { pageHeroes, showFullNav } from "@/lib/content";

export const metadata: Metadata = {
  title: "Comfort & Informazioni",
  description:
    "Tutti i servizi e i comfort disponibili a Dimora Cuore della Città, curati nei dettagli.",
};

// Per ora solo la Hero: la griglia dei servizi (`Amenities`) è pronta ma
// smontata, perché l'elenco attuale è ancora quello esemplificativo.
export default function ServiziComfortPage() {
  if (!showFullNav) {
    redirect("/");
  }

  return <Hero {...pageHeroes.comfort} subtitle="" showClaimOnMobile />;
}
