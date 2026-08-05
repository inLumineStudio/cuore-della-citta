import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { getContent } from "@/lib/content";
import { showFullNav } from "@/lib/content.shared";
import { breadcrumbListJsonLd } from "@/lib/structuredData";
import { buildOpenGraph } from "@/lib/seo";

const title = "Gallery";
const description = "The photo gallery of Dimora Cuore della Città: a visual preview of the spaces you'll find when you arrive.";

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
      src: "/opengraph-image.jpg",
      alt: "The room at Dimora Cuore della Città, with the French window open onto Sulmona's historic center",
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
