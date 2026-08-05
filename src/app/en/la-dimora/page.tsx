import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { About } from "@/components/sections/About";
import { showFullNav } from "@/lib/content.shared";
import { breadcrumbListJsonLd } from "@/lib/structuredData";
import { buildOpenGraph } from "@/lib/seo";

const title = "The Dimora";
const description = "The story of Dimora Cuore della Città: the history of the building and the spaces that make it up.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/en/la-dimora", languages: { "it-IT": "/la-dimora", "en-US": "/en/la-dimora", "x-default": "/la-dimora" } },
  // Stessa foto della versione italiana (`public/images/opengraph/la-dimora.jpg`),
  // solo l'alt cambia lingua.
  openGraph: buildOpenGraph({
    locale: "en",
    path: "/la-dimora",
    title: `${title} | Cuore della Città`,
    description,
    image: {
      src: "/images/opengraph/la-dimora.jpg",
      alt: "Piazza Garibaldi in Sulmona, with the medieval aqueduct and the eighteenth-century fountain",
    },
  }),
};

export default function EnglishLaDimoraPage() {
  if (!showFullNav) {
    redirect("/en");
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListJsonLd("en", "/la-dimora")) }}
      />
      <About locale="en" />
    </>
  );
}
