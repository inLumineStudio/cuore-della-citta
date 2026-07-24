import {
  Bed,
  Wifi,
  Wind,
  Coffee,
  Key,
  WashingMachine,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { amenities, type Amenity } from "@/lib/content";

const iconMap: Record<Amenity["icon"], LucideIcon> = {
  bed: Bed,
  wifi: Wifi,
  wind: Wind,
  coffee: Coffee,
  key: Key,
  "washing-machine": WashingMachine,
  parking: Wind,
  shower: Wind,
};

export function Amenities() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Servizi e Comfort"
          title="Tutto ciò che serve, curato nei dettagli"
          align="center"
        />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((amenity) => {
            const Icon = iconMap[amenity.icon];
            return (
              <div key={amenity.title} className="flex flex-col gap-4">
                <Icon className="h-7 w-7 text-terracotta" strokeWidth={1.5} />
                <h3 className="font-display text-xl text-ink">{amenity.title}</h3>
                <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                  {amenity.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
