import Image from "next/image";
import { Gift, Handshake, Tag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getContent, type Partner } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type PartnersProps = {
  locale: Locale;
};

function PartnerCard({ partner, logoAltPrefix, logoComingSoon }: { partner: Partner; logoAltPrefix: string; logoComingSoon: string }) {
  const content = (
    <div className="flex flex-col gap-5">
      {partner.logoSrc ? (
        <div className="relative h-32 w-full overflow-hidden rounded-sm bg-cream p-4">
          <Image
            src={partner.logoSrc}
            alt={partner.logoAlt ?? `${logoAltPrefix} ${partner.name}`}
            fill
            className="object-contain"
          />
        </div>
      ) : (
        <div className="flex h-32 w-full items-center justify-center rounded-sm border border-dashed border-cream/20">
          <span className="text-[0.7rem] tracking-[0.2em] text-cream/40 uppercase">{logoComingSoon}</span>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold tracking-[0.2em] text-amber-soft uppercase">{partner.category}</span>
        <h3 className="font-display text-xl">{partner.name}</h3>
        <p className="text-sm text-cream/70 leading-relaxed">{partner.description}</p>
      </div>
    </div>
  );

  return partner.websiteUrl ? (
    <a
      href={partner.websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-ink p-8 ring-1 ring-cream/10 transition-colors hover:bg-ink-soft"
    >
      {content}
    </a>
  ) : (
    <div className="bg-ink p-8 ring-1 ring-cream/10">{content}</div>
  );
}

export function Partners({ locale }: PartnersProps) {
  const { ui, partnerTiers } = getContent(locale);

  return (
    <section className="py-24 sm:py-32 bg-ink text-cream">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          title={ui.partnersTitle}
          description={ui.partnersDescription}
          tone="light"
        />

        {partnerTiers.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-sm border border-dashed border-cream/20 py-20 text-center">
            <Handshake className="h-8 w-8 text-amber" strokeWidth={1.5} />
            <p className="text-xs tracking-[0.2em] text-cream/60 uppercase">
              {ui.partnersComingSoon}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            {partnerTiers.map((tier) => (
              <div key={tier.id} className="flex flex-col gap-6">
                <div className="flex items-center gap-2.5 text-amber-soft">
                  {tier.id === "gift" ? (
                    <Gift className="h-4 w-4" strokeWidth={1.75} />
                  ) : (
                    <Tag className="h-4 w-4" strokeWidth={1.75} />
                  )}
                  <span className="font-display text-base tracking-[0.15em] uppercase">{tier.title}</span>
                </div>

                {/* Filetti sulle card (ring), non sullo sfondo della griglia: con
                    un numero di partner non multiplo di 3, uno sfondo tinto
                    trasparirebbe nelle celle vuote dell'ultima riga. */}
                <div className="grid grid-cols-1 sm:grid-cols-3">
                  {tier.partners.map((partner) => (
                    <PartnerCard
                      key={partner.name}
                      partner={partner}
                      logoAltPrefix={ui.partnerLogoAltPrefix}
                      logoComingSoon={ui.partnersLogoComingSoon}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
