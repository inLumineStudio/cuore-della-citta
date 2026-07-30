import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { getContent } from "@/lib/content";
import { showFullNav } from "@/lib/content.shared";
import { breadcrumbListJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "I Nostri Partner",
  description: "La rete di partner e le convenzioni riservate agli ospiti di Dimora Cuore della Città.",
  alternates: { canonical: "/partner", languages: { "it-IT": "/partner", "en-US": "/en/partner" } },
};

export default function PartnerPage() {
  if (!showFullNav) {
    redirect("/");
  }

  const { pageHeroes } = getContent("it");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListJsonLd("it", "/partner")) }}
      />
      <Hero {...pageHeroes.partner} locale="it" descriptor="" subtitle="" showClaimOnMobile />
      <Partners locale="it" />
    </>
  );
}
