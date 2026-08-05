import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { About } from "@/components/sections/About";
import { showFullNav } from "@/lib/content.shared";
import { breadcrumbListJsonLd } from "@/lib/structuredData";
import { buildOpenGraph } from "@/lib/seo";

const title = "La Dimora";
const description =
  "Il racconto di Dimora Cuore della Città: la storia della struttura e degli ambienti che la compongono.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/la-dimora", languages: { "it-IT": "/la-dimora", "en-US": "/en/la-dimora", "x-default": "/la-dimora" } },
  openGraph: buildOpenGraph({
    locale: "it",
    path: "/la-dimora",
    title: `${title} | Cuore della Città`,
    description,
    image: {
      src: "/images/opengraph/la-dimora.jpg",
      alt: "Piazza Garibaldi a Sulmona di giorno, con l'acquedotto medievale e la cattedrale di San Panfilo sullo sfondo",
    },
  }),
};

export default function LaDimoraPage() {
  if (!showFullNav) {
    redirect("/");
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListJsonLd("it", "/la-dimora")) }}
      />
      <About locale="it" />
    </>
  );
}
