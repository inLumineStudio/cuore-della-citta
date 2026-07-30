import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Amenities } from "@/components/sections/Amenities";
import { getContent } from "@/lib/content";
import { showFullNav } from "@/lib/content.shared";
import { breadcrumbListJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Comfort & Information",
  description: "All the services and comforts available at Dimora Cuore della Città, cared for in every detail.",
  alternates: {
    canonical: "/en/servizi-comfort",
    languages: { "it-IT": "/servizi-comfort", "en-US": "/en/servizi-comfort" },
  },
};

export default function EnglishServiziComfortPage() {
  if (!showFullNav) {
    redirect("/en");
  }

  const { pageHeroes } = getContent("en");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListJsonLd("en", "/servizi-comfort")) }}
      />
      <Hero {...pageHeroes.comfort} locale="en" descriptor="" subtitle="" showClaimOnMobile />
      <Amenities locale="en" />
    </>
  );
}
