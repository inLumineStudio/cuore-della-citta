import {
  BedDouble,
  Baby,
  Shirt,
  Utensils,
  Coffee,
  AirVent,
  Wifi,
  WandSparkles,
  Clock,
  CalendarDays,
  SquareParking,
  Luggage,
  CigaretteOff,
  PawPrint,
  UtensilsCrossed,
  Moon,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsappIcon } from "@/components/ui/icons";
import { getContent, type AmenityGroup, type AmenityIcon } from "@/lib/content";
import { telHref, whatsappHref } from "@/lib/contact";
import type { Locale } from "@/lib/i18n";

const iconMap: Record<AmenityIcon, LucideIcon> = {
  "bed-double": BedDouble,
  baby: Baby,
  shirt: Shirt,
  utensils: Utensils,
  coffee: Coffee,
  "air-vent": AirVent,
  wifi: Wifi,
  "wand-sparkles": WandSparkles,
  clock: Clock,
  "calendar-days": CalendarDays,
  "square-parking": SquareParking,
  luggage: Luggage,
  "cigarette-off": CigaretteOff,
  "paw-print": PawPrint,
  "utensils-crossed": UtensilsCrossed,
  moon: Moon,
};

function AmenityBlock({ groups }: { groups: AmenityGroup[] }) {
  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <div key={group.title} className="flex flex-col gap-6">
          <span className="text-xs font-semibold tracking-[0.2em] text-terracotta uppercase">
            {group.title}
          </span>
          <div className="flex flex-col gap-5">
            {group.items.map((item) => {
              const Icon = iconMap[item.icon];
              return (
                <div key={item.title} className="flex gap-3">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" strokeWidth={1.5} />
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-semibold text-ink">{item.title}</p>
                    <p className="text-sm leading-relaxed text-ink-soft">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

type AmenitiesProps = {
  locale: Locale;
};

export function Amenities({ locale }: AmenitiesProps) {
  const { amenitiesPage, whatsappMessage } = getContent(locale);

  return (
    <>
      <section className="py-24 sm:py-32">
        <Container className="flex flex-col gap-16">
          <Reveal>
            <SectionHeading
              title={amenitiesPage.title}
              description={amenitiesPage.subtitle}
              align="center"
            />
          </Reveal>

          <Reveal>
            <AmenityBlock groups={amenitiesPage.comfortGroups} />
          </Reveal>
        </Container>
      </section>

      <section className="bg-cream-soft py-20 sm:py-28">
        <Container>
          <Reveal>
            <AmenityBlock groups={amenitiesPage.infoGroups} />
          </Reveal>
        </Container>
      </section>

      <section className="bg-gradient-to-br from-terracotta to-terracotta-dark py-20 text-cream sm:py-24">
        <Container className="flex flex-col items-center text-center">
          <Reveal className="flex flex-col items-center gap-8">
            <h2 className="max-w-2xl font-display text-3xl leading-tight sm:text-4xl">
              {amenitiesPage.ctaTitle}
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
              {amenitiesPage.ctaDescription}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={telHref()}
                className="inline-flex items-center gap-2 whitespace-nowrap bg-cream px-5 py-2.5 text-xs font-semibold tracking-[0.08em] text-terracotta-dark uppercase transition-colors duration-300 hover:bg-hero-ivory"
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} />
                {amenitiesPage.ctaPrimaryLabel}
              </a>
              <a
                href={whatsappHref(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 whitespace-nowrap border border-cream/60 px-5 py-2.5 text-xs font-semibold tracking-[0.08em] text-cream uppercase transition-colors duration-300 hover:bg-cream hover:text-terracotta-dark"
              >
                <WhatsappIcon className="h-4 w-4" />
                {amenitiesPage.ctaSecondaryLabel}
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
