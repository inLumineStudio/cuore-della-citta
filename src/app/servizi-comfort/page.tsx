import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Amenities } from "@/components/sections/Amenities";
import { pageHeroes, showFullNav } from "@/lib/content";

export const metadata: Metadata = {
  title: "Comfort & Informazioni",
  description:
    "Tutti i servizi e i comfort disponibili a Dimora Cuore della Città, curati nei dettagli.",
};

export default function ServiziComfortPage() {
  if (!showFullNav) {
    redirect("/");
  }

  return (
    <>
      <Hero {...pageHeroes.comfort} subtitle="" showClaimOnMobile />
      <Amenities />
    </>
  );
}
