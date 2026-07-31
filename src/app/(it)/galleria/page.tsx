import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { getContent } from "@/lib/content";
import { showFullNav } from "@/lib/content.shared";
import { breadcrumbListJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Galleria",
  description:
    "La galleria fotografica di Dimora Cuore della Città: un assaggio visivo degli ambienti che troverai al tuo arrivo.",
  alternates: { canonical: "/galleria", languages: { "it-IT": "/galleria", "en-US": "/en/galleria" } },
};

export default function GalleriaPage() {
  if (!showFullNav) {
    redirect("/");
  }

  const { pageHeroes } = getContent("it");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListJsonLd("it", "/galleria")) }}
      />
      <Hero {...pageHeroes.galleria} locale="it" descriptor="" subtitle="" showClaimOnMobile />
      <Gallery locale="it" />
    </>
  );
}
