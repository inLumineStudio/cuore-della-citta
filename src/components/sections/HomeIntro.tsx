import { ArrowRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { homeIntro, showFullNav } from "@/lib/content";

export function HomeIntro() {
  return (
    <section className="grid w-full grid-cols-1 lg:grid-cols-2">
      <div className="relative order-1 min-h-[400px] w-full lg:order-none lg:min-h-[600px]">
        <ImagePlaceholder label="Foto in arrivo" className="absolute inset-0 h-full w-full" />
      </div>

      <div className="order-2 flex flex-col items-start justify-center bg-cream p-8 md:p-16 lg:order-none lg:p-24">
        <div className="flex max-w-xl flex-col items-start gap-6 text-left">
          <span className="text-xs font-semibold tracking-[0.25em] text-terracotta uppercase">
            {homeIntro.eyebrow}
          </span>

          <h2 className="text-balance font-hero text-3xl leading-[1.1] text-ink sm:text-4xl">
            {homeIntro.title}
          </h2>

          <div className="flex flex-col gap-4">
            {homeIntro.body.map((paragraph) => (
              <p key={paragraph} className="text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
                {paragraph}
              </p>
            ))}
          </div>

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
        </div>
      </div>
    </section>
  );
}
