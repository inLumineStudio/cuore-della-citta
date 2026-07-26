import { Phone } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsappIcon } from "@/components/ui/icons";
import { aboutPage, pageHeroes } from "@/lib/content";
import { telHref, whatsappHref } from "@/lib/contact";

export function About() {
  return (
    <>
      <Hero {...pageHeroes.laDimora} subtitle="" showClaimOnMobile />

      <section className="py-24 sm:py-32">
        <Container className="mx-auto flex max-w-3xl flex-col gap-10">
          <Reveal className="flex flex-col gap-4">
            <h2 className="text-balance font-display text-4xl leading-[1.1] text-ink sm:text-5xl">
              {aboutPage.title}
            </h2>
            <p className="text-pretty text-lg leading-relaxed text-ink-soft sm:text-xl">
              {aboutPage.subtitle}
            </p>
          </Reveal>

          <div className="flex flex-col gap-6">
            {aboutPage.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph} delayMs={index * 60}>
                <p className="text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-br from-terracotta to-terracotta-dark py-20 text-cream sm:py-24">
        <Container className="flex flex-col items-center text-center">
          <Reveal className="flex flex-col items-center gap-8">
            <h2 className="max-w-2xl font-display text-3xl leading-tight sm:text-4xl">
              {aboutPage.ctaTitle}
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
              {aboutPage.ctaDescription}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={telHref()}
                className="inline-flex items-center gap-2 whitespace-nowrap bg-cream px-5 py-2.5 text-xs font-semibold tracking-[0.08em] text-terracotta-dark uppercase transition-colors duration-300 hover:bg-hero-ivory"
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} />
                {aboutPage.ctaPrimaryLabel}
              </a>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 whitespace-nowrap border border-cream/60 px-5 py-2.5 text-xs font-semibold tracking-[0.08em] text-cream uppercase transition-colors duration-300 hover:bg-cream hover:text-terracotta-dark"
              >
                <WhatsappIcon className="h-4 w-4" />
                {aboutPage.ctaSecondaryLabel}
              </a>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
