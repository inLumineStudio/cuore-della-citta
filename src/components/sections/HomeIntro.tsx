import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Reveal } from "@/components/ui/Reveal";
import { getContent } from "@/lib/content";
import { homeIntroImageSrc, showFullNav } from "@/lib/content.shared";
import type { Locale } from "@/lib/i18n";

type HomeIntroProps = {
  locale: Locale;
};

export function HomeIntro({ locale }: HomeIntroProps) {
  const { homeIntro, ui } = getContent(locale);
  const paragraphCount = homeIntro.body.length;

  return (
    <section className="grid w-full grid-cols-1 lg:h-full lg:grid-cols-2">
      <div className="relative order-1 min-h-[400px] w-full lg:order-none lg:min-h-[600px]">
        <Reveal variant="scale" className="absolute inset-0 h-full w-full">
          {homeIntroImageSrc ? (
            <Image
              src={homeIntroImageSrc}
              alt={ui.homeIntroImageAlt}
              fill
              className="object-cover"
            />
          ) : (
            <ImagePlaceholder label={ui.imagePlaceholder} className="h-full w-full" />
          )}
        </Reveal>
      </div>

      <div className="order-2 flex flex-col items-start justify-center bg-cream p-8 md:p-16 lg:order-none lg:p-24">
        <div className="flex max-w-xl flex-col items-start gap-6 text-left">
          <Reveal className="flex flex-col gap-6">
            <span className="text-xs font-semibold tracking-[0.25em] text-terracotta uppercase">
              {homeIntro.eyebrow}
            </span>

            <h2 className="text-balance font-display text-3xl leading-[1.1] text-ink sm:text-4xl">
              {homeIntro.title}
            </h2>
          </Reveal>

          <div className="flex flex-col gap-4">
            {homeIntro.body.map((paragraph, index) => (
              <Reveal key={paragraph} delayMs={100 + index * 60}>
                <p className="text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delayMs={100 + paragraphCount * 60}>
            {showFullNav ? (
              <a
                href={homeIntro.ctaHref}
                className="group mt-2 inline-flex w-fit items-center gap-2 text-sm font-semibold tracking-wide text-ink uppercase transition-colors hover:text-terracotta"
              >
                {homeIntro.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </a>
            ) : (
              <span
                role="link"
                aria-disabled="true"
                className="group mt-2 inline-flex w-fit cursor-pointer items-center gap-2 text-sm font-semibold tracking-wide text-ink uppercase transition-colors hover:text-terracotta select-none"
              >
                {homeIntro.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </span>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
