import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { pageHeroes, showFullNav } from "@/lib/content";

export const metadata: Metadata = {
  title: "I Nostri Partner",
  description:
    "La rete di partner e le convenzioni riservate agli ospiti di Dimora Cuore della Città.",
};

// Per ora solo la Hero: l'elenco partner (`Partners`) è pronto ma smontato,
// perché le convenzioni attuali sono ancora esemplificative.
export default function PartnerPage() {
  if (!showFullNav) {
    redirect("/");
  }

  return <Hero {...pageHeroes.partner} descriptor="" subtitle="" showClaimOnMobile />;
}
