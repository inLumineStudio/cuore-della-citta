import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Partners } from "@/components/sections/Partners";
import { showFullNav } from "@/lib/content";

export const metadata: Metadata = {
  title: "I Nostri Partner | Cuore della Città",
  description:
    "La rete di partner e le convenzioni riservate agli ospiti di Dimora Cuore della Città.",
};

export default function PartnerPage() {
  if (!showFullNav) {
    redirect("/");
  }

  return <Partners />;
}
