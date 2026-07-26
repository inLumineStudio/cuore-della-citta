import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { About } from "@/components/sections/About";
import { showFullNav } from "@/lib/content";

export const metadata: Metadata = {
  title: "La Dimora",
  description:
    "Il racconto di Dimora Cuore della Città: la storia della struttura e degli ambienti che la compongono.",
};

export default function LaDimoraPage() {
  if (!showFullNav) {
    redirect("/");
  }

  return <About />;
}
