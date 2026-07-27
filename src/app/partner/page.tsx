import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { pageHeroes, showFullNav } from "@/lib/content";
import { breadcrumbListJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "I Nostri Partner",
  description:
    "La rete di partner e le convenzioni riservate agli ospiti di Dimora Cuore della Città.",
};

export default function PartnerPage() {
  if (!showFullNav) {
    redirect("/");
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListJsonLd("/partner")) }}
      />
      <Hero {...pageHeroes.partner} descriptor="" subtitle="" showClaimOnMobile />
      <Partners />
    </>
  );
}
