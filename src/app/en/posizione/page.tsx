import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Location } from "@/components/sections/Location";
import { getContent } from "@/lib/content";
import { showFullNav } from "@/lib/content.shared";
import { breadcrumbListJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Location & Map",
  description: "How to reach Dimora Cuore della Città and the main points of interest in the historic center nearby.",
  alternates: { canonical: "/en/posizione", languages: { "it-IT": "/posizione", "en-US": "/en/posizione" } },
  // Stessa foto della versione italiana ("(it)/posizione/opengraph-image.jpg",
  // servita a "/posizione/opengraph-image.jpg"), solo l'alt cambia lingua.
  openGraph: {
    images: [
      {
        url: "/posizione/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "The arches of Sulmona's medieval aqueduct, in Piazza Garibaldi",
      },
    ],
  },
};

export default function EnglishPosizionePage() {
  if (!showFullNav) {
    redirect("/en");
  }

  const { pageHeroes } = getContent("en");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListJsonLd("en", "/posizione")) }}
      />
      <Hero {...pageHeroes.posizione} locale="en" descriptor="" subtitle="" showClaimOnMobile />
      <Location locale="en" />
    </>
  );
}
