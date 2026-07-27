import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Location } from "@/components/sections/Location";
import { pageHeroes, showFullNav } from "@/lib/content";

export const metadata: Metadata = {
  title: "Posizione & Mappa",
  description:
    "Come raggiungere Dimora Cuore della Città e i principali punti di interesse del centro storico nelle vicinanze.",
};

export default function PosizionePage() {
  if (!showFullNav) {
    redirect("/");
  }

  return (
    <>
      <Hero {...pageHeroes.posizione} subtitle="" showClaimOnMobile />
      <Location />
    </>
  );
}
