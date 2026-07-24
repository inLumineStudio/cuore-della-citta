import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig, pointsOfInterest } from "@/lib/content";

export function Location() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Posizione"
            title="Nel cuore della città, letteralmente"
            description={`${siteConfig.addressLine}. A pochi passi dalle principali attrazioni del centro storico.`}
          />

          <ul className="flex flex-col gap-4">
            {pointsOfInterest.map((poi) => (
              <li key={poi.name} className="flex items-center justify-between border-b border-stone-light pb-3">
                <span className="text-ink">{poi.name}</span>
                <span className="text-sm text-stone">{poi.distance}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex aspect-square w-full flex-col items-center justify-center gap-3 rounded-sm bg-cream-soft text-stone lg:aspect-[4/5]">
          <MapPin className="h-8 w-8" strokeWidth={1.5} />
          <span className="text-xs tracking-wide uppercase">
            Mappa in arrivo con indirizzo definitivo
          </span>
        </div>
      </Container>
    </section>
  );
}
