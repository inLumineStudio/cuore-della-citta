import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { getContent } from "@/lib/content";
import { showFullNav } from "@/lib/content.shared";
import { breadcrumbListJsonLd } from "@/lib/structuredData";
import { buildOpenGraph } from "@/lib/seo";

const title = "Our Partners";
const description = "The network of partners and special offers reserved for guests of Dimora Cuore della Città.";

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
      src: "/opengraph-image.jpg",
      alt: "The room at Dimora Cuore della Città, with the French window open onto Sulmona's historic center",
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
