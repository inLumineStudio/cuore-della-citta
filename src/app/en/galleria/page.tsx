import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { getContent } from "@/lib/content";
import { showFullNav } from "@/lib/content.shared";

export const metadata: Metadata = {
  title: "Gallery",
  description: "The photo gallery of Dimora Cuore della Città: a visual preview of the spaces you'll find when you arrive.",
  alternates: { canonical: "/en/galleria", languages: { "it-IT": "/galleria", "en-US": "/en/galleria" } },
};

export default function EnglishGalleriaPage() {
  if (!showFullNav) {
    redirect("/en");
  }

  const { pageHeroes } = getContent("en");

  return <Hero {...pageHeroes.galleria} locale="en" descriptor="" subtitle="" showClaimOnMobile />;
}
