import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { About } from "@/components/sections/About";
import { showFullNav } from "@/lib/content";
import { breadcrumbListJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "La Dimora",
  description:
    "Il racconto di Dimora Cuore della Città: la storia della struttura e degli ambienti che la compongono.",
};

export default function LaDimoraPage() {
  if (!showFullNav) {
    redirect("/");
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListJsonLd("/la-dimora")) }}
      />
      <About />
    </>
  );
}
