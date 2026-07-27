import Image from "next/image";
import { Handshake } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { partners } from "@/lib/content";

export function Partners() {
  return (
    <section className="py-24 sm:py-32 bg-ink text-cream">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          title="Convenzioni riservate ai nostri ospiti"
          description="Una selezione di attività del territorio che offrono condizioni dedicate a chi soggiorna alla Dimora."
          tone="light"
        />

        {partners.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-sm border border-dashed border-cream/20 py-20 text-center">
            <Handshake className="h-8 w-8 text-amber" strokeWidth={1.5} />
            <p className="text-xs tracking-[0.2em] text-cream/60 uppercase">
              Le prime convenzioni sono in arrivo
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-cream/10 sm:grid-cols-3">
            {partners.map((partner) => {
              const content = (
                <div className="flex flex-col gap-5">
                  {partner.logoSrc ? (
                    <div className="relative h-20 w-full overflow-hidden rounded-sm bg-cream p-4">
                      <Image
                        src={partner.logoSrc}
                        alt={partner.logoAlt ?? `Logo di ${partner.name}`}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  ) : (
                    <div className="flex h-20 w-full items-center justify-center rounded-sm border border-dashed border-cream/20">
                      <span className="text-[0.7rem] tracking-[0.2em] text-cream/40 uppercase">
                        Logo in arrivo
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-semibold tracking-[0.2em] text-amber-soft uppercase">
                      {partner.category}
                    </span>
                    <h3 className="font-display text-xl">{partner.name}</h3>
                    <p className="text-sm text-cream/70 leading-relaxed">{partner.perk}</p>
                  </div>
                </div>
              );

              return partner.websiteUrl ? (
                <a
                  key={partner.name}
                  href={partner.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-ink p-8 transition-colors hover:bg-ink-soft"
                >
                  {content}
                </a>
              ) : (
                <div key={partner.name} className="bg-ink p-8">
                  {content}
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
