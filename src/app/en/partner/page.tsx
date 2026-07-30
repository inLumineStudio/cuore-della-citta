import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { getContent } from "@/lib/content";
import { showFullNav } from "@/lib/content.shared";
import { breadcrumbListJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Our Partners",
  description: "The network of partners and special offers reserved for guests of Dimora Cuore della Città.",
  alternates: { canonical: "/en/partner", languages: { "it-IT": "/partner", "en-US": "/en/partner" } },
};

export default function EnglishPartnerPage() {
  if (!showFullNav) {
    redirect("/en");
  }

  const { pageHeroes } = getContent("en");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListJsonLd("en", "/partner")) }}
      />
      <Hero {...pageHeroes.partner} locale="en" descriptor="" subtitle="" showClaimOnMobile />
      <Partners locale="en" />
    </>
  );
}
