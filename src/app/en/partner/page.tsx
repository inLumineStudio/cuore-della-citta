import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { getContent } from "@/lib/content";
import { showFullNav } from "@/lib/content.shared";
import { breadcrumbListJsonLd } from "@/lib/structuredData";
import { buildOpenGraph } from "@/lib/seo";

const title = "Our Partners";
const description = "Special offers reserved for guests of Dimora Cuore della Città, a holiday home in Sulmona: discounts at restaurants, shops and local services.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/en/partner", languages: { "it-IT": "/partner", "en-US": "/en/partner", "x-default": "/partner" } },
  openGraph: buildOpenGraph({
    locale: "en",
    path: "/partner",
    title: `${title} | Cuore della Città`,
    description,
    image: {
      src: "/images/opengraph/partner.jpg",
      alt: "A square in Sulmona's historic center seen from the balcony of Dimora Cuore della Città",
    },
  }),
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
