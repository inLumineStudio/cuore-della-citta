import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { getContent } from "@/lib/content";
import { showFullNav } from "@/lib/content.shared";
import { breadcrumbListJsonLd } from "@/lib/structuredData";
import { buildOpenGraph } from "@/lib/seo";

const title = "Galleria";
const description =
  "La galleria fotografica di Dimora Cuore della Città: un assaggio visivo degli ambienti che troverai al tuo arrivo.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/galleria", languages: { "it-IT": "/galleria", "en-US": "/en/galleria", "x-default": "/galleria" } },
  openGraph: buildOpenGraph({
    locale: "it",
    path: "/galleria",
    title: `${title} | Cuore della Città`,
    description,
    image: {
      src: "/opengraph-image.jpg",
      alt: "La camera della Dimora Cuore della Città, con la porta-finestra aperta sul centro storico di Sulmona",
    },
  }),
};

export default function GalleriaPage() {
  if (!showFullNav) {
    redirect("/");
  }

  const { pageHeroes } = getContent("it");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListJsonLd("it", "/galleria")) }}
      />
      <Hero {...pageHeroes.galleria} locale="it" descriptor="" subtitle="" showClaimOnMobile />
      <Gallery locale="it" />
    </>
  );
}
