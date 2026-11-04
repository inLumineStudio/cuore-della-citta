import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Amenities } from "@/components/sections/Amenities";
import { getContent } from "@/lib/content";
import { showFullNav } from "@/lib/content.shared";
import { breadcrumbListJsonLd } from "@/lib/structuredData";
import { buildOpenGraph } from "@/lib/seo";

const title = "Comfort & Information";
const description = "Comforts and practical information for Dimora Cuore della Città, a holiday home in Sulmona: amenities, check-in and check-out times, arrival and parking.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/en/servizi-comfort",
    languages: { "it-IT": "/servizi-comfort", "en-US": "/en/servizi-comfort", "x-default": "/servizi-comfort" },
  },
  openGraph: buildOpenGraph({
    locale: "en",
    path: "/servizi-comfort",
    title: `${title} | Cuore della Città`,
    description,
    image: {
      src: "/images/opengraph/servizi-comfort.jpg",
      alt: "The living area with kitchen at Dimora Cuore della Città, with a set table and the bedroom in the background",
    },
  }),
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
