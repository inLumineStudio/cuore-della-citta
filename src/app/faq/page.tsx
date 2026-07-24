import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Faq } from "@/components/sections/Faq";
import { ContactCta } from "@/components/sections/ContactCta";
import { showFullNav } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ | Cuore della Città",
  description:
    "Le domande più frequenti su check-in, animali, parcheggio e cancellazioni per Dimora Cuore della Città.",
};

export default function FaqPage() {
  if (!showFullNav) {
    redirect("/");
  }

  return (
    <>
      <Faq />
      <ContactCta />
    </>
  );
}
