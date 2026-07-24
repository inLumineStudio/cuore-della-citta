import { Handshake } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { partners } from "@/lib/content";

export function Partners() {
  return (
    <section className="py-24 sm:py-32 bg-ink text-cream">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Rete di Partner"
          title="Convenzioni riservate ai nostri ospiti"
          description="Una selezione di attività del territorio che offrono condizioni dedicate a chi soggiorna alla Dimora."
          tone="light"
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-cream/10 sm:grid-cols-3">
          {partners.map((partner) => (
            <div key={partner.name} className="flex flex-col gap-3 bg-ink p-8">
              <Handshake className="h-6 w-6 text-amber" strokeWidth={1.5} />
              <span className="text-xs font-semibold tracking-[0.2em] text-amber-soft uppercase">
                {partner.category}
              </span>
              <h3 className="font-display text-xl">{partner.name}</h3>
              <p className="text-sm text-cream/70 leading-relaxed">{partner.perk}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
