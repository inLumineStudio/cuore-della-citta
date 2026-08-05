import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { Amenities } from "@/components/sections/Amenities";
import { getContent } from "@/lib/content";
import { showFullNav } from "@/lib/content.shared";
import { breadcrumbListJsonLd } from "@/lib/structuredData";
import { buildOpenGraph } from "@/lib/seo";

const title = "Comfort & Informazioni";
const description = "Tutti i servizi e i comfort disponibili a Dimora Cuore della Città, curati nei dettagli.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/servizi-comfort",
    languages: { "it-IT": "/servizi-comfort", "en-US": "/en/servizi-comfort", "x-default": "/servizi-comfort" },
  },
  // Nessuna foto dedicata per questa sezione (vedi CLAUDE.md § SEO e
  // metadati): riusa quella generica della camera.
  openGraph: buildOpenGraph({
    locale: "it",
    path: "/servizi-comfort",
    title: `${title} | Cuore della Città`,
    description,
    image: {
      src: "/opengraph-image.jpg",
      alt: "La camera della Dimora Cuore della Città, con la porta-finestra aperta sul centro storico di Sulmona",
    },
  }),
};

export default function ServiziComfortPage() {
  if (!showFullNav) {
    redirect("/");
  }

  const { pageHeroes } = getContent("it");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListJsonLd("it", "/servizi-comfort")) }}
      />
      <Hero {...pageHeroes.comfort} locale="it" descriptor="" subtitle="" showClaimOnMobile />
      <Amenities locale="it" />
    </>
  );
}
