import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Amenities } from "@/components/sections/Amenities";
import { getContent } from "@/lib/content";
import { showFullNav } from "@/lib/content.shared";
import { breadcrumbListJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Comfort & Informazioni",
  description: "Tutti i servizi e i comfort disponibili a Dimora Cuore della Città, curati nei dettagli.",
  alternates: {
    canonical: "/servizi-comfort",
    languages: { "it-IT": "/servizi-comfort", "en-US": "/en/servizi-comfort" },
  },
};

export default function ServiziComfortPage() {
  if (!showFullNav) {
    redirect("/");
  }

  const { pageHeroes } = getContent("it");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListJsonLd("it", "/servizi-comfort")) }}
      />
      <Hero {...pageHeroes.comfort} locale="it" descriptor="" subtitle="" showClaimOnMobile />
      <Amenities locale="it" />
    </>
  );
}
