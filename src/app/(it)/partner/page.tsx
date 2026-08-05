import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Partners } from "@/components/sections/Partners";
import { getContent } from "@/lib/content";
import { showFullNav } from "@/lib/content.shared";
import { breadcrumbListJsonLd } from "@/lib/structuredData";
import { buildOpenGraph } from "@/lib/seo";

const title = "I Nostri Partner";
const description = "La rete di partner e le convenzioni riservate agli ospiti di Dimora Cuore della Città.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/partner", languages: { "it-IT": "/partner", "en-US": "/en/partner", "x-default": "/partner" } },
  openGraph: buildOpenGraph({
    locale: "it",
    path: "/partner",
    title: `${title} | Cuore della Città`,
    description,
    image: {
      src: "/opengraph-image.jpg",
      alt: "La camera della Dimora Cuore della Città, con la porta-finestra aperta sul centro storico di Sulmona",
    },
  }),
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
