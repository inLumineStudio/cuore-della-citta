import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Amenities } from "@/components/sections/Amenities";
import { showFullNav } from "@/lib/content";

export const metadata: Metadata = {
  title: "Servizi & Comfort | Cuore della Città",
  description:
    "Tutti i servizi e i comfort disponibili a Dimora Cuore della Città, curati nei dettagli.",
};

export default function ServiziComfortPage() {
  if (!showFullNav) {
    redirect("/");
  }

  return <Amenities />;
}
