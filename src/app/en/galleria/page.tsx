import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { getContent } from "@/lib/content";
import { showFullNav } from "@/lib/content.shared";
import { breadcrumbListJsonLd } from "@/lib/structuredData";
import { buildOpenGraph } from "@/lib/seo";

const title = "Gallery";
const description = "Photos of Dimora Cuore della Città, a holiday home in Sulmona: bedrooms, kitchen, bathroom and balconies over the historic center, before you book.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/en/galleria", languages: { "it-IT": "/galleria", "en-US": "/en/galleria", "x-default": "/galleria" } },
  openGraph: buildOpenGraph({
    locale: "en",
    path: "/galleria",
    title: `${title} | Cuore della Città`,
    description,
    image: {
      src: "/images/opengraph/galleria.jpg",
      alt: "The bedroom at Dimora Cuore della Città, with its stone vaulted ceiling and French window onto the balcony",
    },
  }),
};

export default function EnglishGalleriaPage() {
  if (!showFullNav) {
    redirect("/en");
  }

  const { pageHeroes } = getContent("en");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListJsonLd("en", "/galleria")) }}
      />
      <Hero {...pageHeroes.galleria} locale="en" descriptor="" subtitle="" showClaimOnMobile />
      <Gallery locale="en" />
    </>
  );
}
