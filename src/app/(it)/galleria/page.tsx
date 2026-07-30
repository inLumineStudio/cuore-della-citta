import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { getContent } from "@/lib/content";
import { showFullNav } from "@/lib/content.shared";

export const metadata: Metadata = {
  title: "Galleria",
  description:
    "La galleria fotografica di Dimora Cuore della Città: un assaggio visivo degli ambienti che troverai al tuo arrivo.",
  alternates: { canonical: "/galleria", languages: { "it-IT": "/galleria", "en-US": "/en/galleria" } },
};

// Per ora solo la Hero, con la foto di default: la griglia fotografica con
// lightbox (`Gallery`) è pronta ma smontata, in attesa delle foto definitive e
// di una revisione dei contenuti insieme al cliente.
export default function GalleriaPage() {
  if (!showFullNav) {
    redirect("/");
  }

  const { pageHeroes } = getContent("it");

  return <Hero {...pageHeroes.galleria} locale="it" descriptor="" subtitle="" showClaimOnMobile />;
}
