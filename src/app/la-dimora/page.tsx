import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { About } from "@/components/sections/About";
import { Gallery } from "@/components/sections/Gallery";
import { showFullNav } from "@/lib/content";

export const metadata: Metadata = {
  title: "La Dimora | Cuore della Città",
  description:
    "Scopri gli ambienti di Dimora Cuore della Città: il racconto della struttura e la galleria fotografica degli spazi.",
};

export default function LaDimoraPage() {
  if (!showFullNav) {
    redirect("/");
  }

  return (
    <>
      <About />
      <Gallery />
    </>
  );
}
