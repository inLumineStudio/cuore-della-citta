import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Location } from "@/components/sections/Location";
import { getContent } from "@/lib/content";
import { showFullNav } from "@/lib/content.shared";
import { breadcrumbListJsonLd } from "@/lib/structuredData";
import { buildOpenGraph } from "@/lib/seo";

const title = "Posizione & Mappa";
const description =
  "Come raggiungere Dimora Cuore della Città e i principali punti di interesse del centro storico nelle vicinanze.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/posizione", languages: { "it-IT": "/posizione", "en-US": "/en/posizione", "x-default": "/posizione" } },
  openGraph: buildOpenGraph({
    locale: "it",
    path: "/posizione",
    title: `${title} | Cuore della Città`,
    description,
    image: {
      src: "/images/opengraph/posizione.jpg",
      alt: "Gli archi dell'acquedotto medievale di Sulmona, in Piazza Garibaldi",
    },
  }),
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
