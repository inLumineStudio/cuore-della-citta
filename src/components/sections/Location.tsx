import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AbruzzoMap } from "@/components/ui/AbruzzoMap";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon, WhatsappIcon } from "@/components/ui/icons";
import { locationPage, pointsOfInterest, siteConfig } from "@/lib/content";
import { mapsDirectionsHref, mapsEmbedSrc, telHref, whatsappHref } from "@/lib/contact";

export function Location() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="flex flex-col gap-16">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal className="flex flex-col gap-8">
            <SectionHeading
              eyebrow={locationPage.eyebrow}
              title={locationPage.title}
              description={locationPage.description}
            />

            <ul className="flex flex-col gap-5">
              {pointsOfInterest.map((poi) => (
                <li key={poi.name} className="flex flex-col gap-1 border-b border-stone-light pb-4">
                  <span className="text-ink">{poi.name}</span>
                  {poi.description && (
                    <p className="text-sm leading-relaxed text-ink-soft">{poi.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variant="scale" className="flex aspect-square w-full items-center justify-center p-6 lg:aspect-[4/5]">
            <AbruzzoMap className="h-full w-full" />
          </Reveal>
        </div>

        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-ink">{siteConfig.fullName}</span>
            <span className="text-sm text-ink-soft">{siteConfig.addressLine}</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Scrivici su WhatsApp"
              className="text-ink-soft transition-colors hover:text-terracotta"
            >
              <WhatsappIcon className="h-5 w-5" />
            </a>
            <a href={telHref()} aria-label="Chiamaci" className="text-ink-soft transition-colors hover:text-terracotta">
              <Phone className="h-5 w-5" strokeWidth={1.5} />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Scrivici una mail"
              className="text-ink-soft transition-colors hover:text-terracotta"
            >
              <Mail className="h-5 w-5" strokeWidth={1.5} />
            </a>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Seguici su Instagram"
              className="text-ink-soft transition-colors hover:text-terracotta"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
        </Reveal>

        <Reveal>
          <a
            href={mapsDirectionsHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-2 text-sm font-semibold tracking-wide text-ink uppercase transition-colors hover:text-terracotta"
          >
            <MapPin className="h-4 w-4" strokeWidth={1.5} />
            Indicazioni stradali
          </a>
        </Reveal>

        <Reveal variant="scale" className="aspect-video w-full overflow-hidden rounded-sm">
          <iframe
            src={mapsEmbedSrc()}
            title={`Mappa: ${siteConfig.addressLine}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
          />
        </Reveal>
      </Container>
    </section>
  );
}
