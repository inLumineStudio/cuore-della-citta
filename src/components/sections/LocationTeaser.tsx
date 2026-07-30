import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { getContent } from "@/lib/content";
import { positionImageSrc, showFullNav } from "@/lib/content.shared";
import type { Locale } from "@/lib/i18n";

type LocationTeaserProps = {
  locale: Locale;
};

export function LocationTeaser({ locale }: LocationTeaserProps) {
  const { pointsOfInterest, positionTeaser, ui } = getContent(locale);

  return (
    <section className="grid w-full grid-cols-1 lg:h-full lg:grid-cols-2">
      <div className="relative order-1 min-h-[400px] w-full lg:order-none lg:min-h-[600px]">
        <Reveal variant="scale" className="absolute inset-0 h-full w-full">
          {positionImageSrc ? (
            <Image
              src={positionImageSrc}
              alt={ui.locationTeaserImageAlt}
              fill
              className="object-cover"
            />
          ) : (
            <ImagePlaceholder label={ui.imagePlaceholder} className="h-full w-full" />
          )}
        </Reveal>
      </div>

      <div className="order-2 flex flex-col items-start justify-center bg-cream-soft p-8 md:p-16 lg:order-none lg:p-24">
        <div className="flex max-w-xl flex-col items-start gap-6 text-left">
          <Reveal className="flex flex-col gap-6">
            <span className="text-xs font-semibold tracking-[0.25em] text-terracotta uppercase">
              {positionTeaser.eyebrow}
            </span>

            <h2 className="text-balance font-display text-3xl leading-[1.1] text-ink sm:text-4xl">
              {positionTeaser.title}
            </h2>

            <p className="text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
              {positionTeaser.description}
            </p>
          </Reveal>

          <Reveal delayMs={100} className="w-full">
            <ul className="flex w-full flex-col gap-3">
              {pointsOfInterest.map((poi) => (
                <li
                  key={poi.name}
                  className="flex items-center justify-between border-b border-stone-light pb-3"
                >
                  <span className="text-ink">{poi.name}</span>
                  <span className="text-sm text-stone tabular-nums">{poi.distance}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delayMs={160}>
            {showFullNav ? (
              <a
                href={positionTeaser.ctaHref}
                className="group mt-2 inline-flex w-fit items-center gap-2 text-sm font-semibold tracking-wide text-ink uppercase transition-colors hover:text-terracotta"
              >
                {positionTeaser.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </a>
            ) : (
              <span
                role="link"
                aria-disabled="true"
                className="group mt-2 inline-flex w-fit cursor-pointer items-center gap-2 text-sm font-semibold tracking-wide text-ink uppercase transition-colors hover:text-terracotta select-none"
              >
                {positionTeaser.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </span>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
