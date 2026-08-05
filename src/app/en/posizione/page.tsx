import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Location } from "@/components/sections/Location";
import { getContent } from "@/lib/content";
import { showFullNav } from "@/lib/content.shared";
import { breadcrumbListJsonLd } from "@/lib/structuredData";
import { buildOpenGraph } from "@/lib/seo";

const title = "Location & Map";
const description = "How to reach Dimora Cuore della Città and the main points of interest in the historic center nearby.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/en/posizione", languages: { "it-IT": "/posizione", "en-US": "/en/posizione", "x-default": "/posizione" } },
  // Stessa foto della versione italiana (`public/images/opengraph/posizione.jpg`),
  // solo l'alt cambia lingua.
  openGraph: buildOpenGraph({
    locale: "en",
    path: "/posizione",
    title: `${title} | Cuore della Città`,
    description,
    image: {
      src: "/images/opengraph/posizione.jpg",
      alt: "The arches of Sulmona's medieval aqueduct, in Piazza Garibaldi",
    },
  }),
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
