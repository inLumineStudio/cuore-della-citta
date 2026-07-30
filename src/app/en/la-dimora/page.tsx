import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { About } from "@/components/sections/About";
import { showFullNav } from "@/lib/content.shared";
import { breadcrumbListJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "The Dimora",
  description: "The story of Dimora Cuore della Città: the history of the building and the spaces that make it up.",
  alternates: { canonical: "/en/la-dimora", languages: { "it-IT": "/la-dimora", "en-US": "/en/la-dimora" } },
  // Riusa il file generato per l'albero italiano (`(it)/la-dimora/opengraph-image.jpg`,
  // servito comunque a "/la-dimora/opengraph-image.jpg" perché il route group
  // non compare nell'URL): stessa foto, non serve duplicare il JPEG, solo
  // l'alt in inglese va dichiarato esplicitamente qui.
  openGraph: {
    images: [
      {
        url: "/la-dimora/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Piazza Garibaldi in Sulmona, with the medieval aqueduct and the eighteenth-century fountain",
      },
    ],
  },
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
