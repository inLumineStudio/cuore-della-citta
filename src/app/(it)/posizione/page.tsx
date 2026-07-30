import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Location } from "@/components/sections/Location";
import { getContent } from "@/lib/content";
import { showFullNav } from "@/lib/content.shared";
import { breadcrumbListJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Posizione & Mappa",
  description: "Come raggiungere Dimora Cuore della Città e i principali punti di interesse del centro storico nelle vicinanze.",
  alternates: { canonical: "/posizione", languages: { "it-IT": "/posizione", "en-US": "/en/posizione" } },
};

export default function PosizionePage() {
  if (!showFullNav) {
    redirect("/");
  }

  const { pageHeroes } = getContent("it");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListJsonLd("it", "/posizione")) }}
      />
      <Hero {...pageHeroes.posizione} locale="it" descriptor="" subtitle="" showClaimOnMobile />
      <Location locale="it" />
    </>
  );
}
