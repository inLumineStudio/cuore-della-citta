import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { heroImageSrc } from "@/lib/content";

export function About() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm">
          {heroImageSrc ? (
            <Image
              src={heroImageSrc}
              alt="Dettaglio degli interni della Dimora"
              fill
              className="object-cover"
            />
          ) : (
            <ImagePlaceholder className="h-full w-full" />
          )}
        </div>

        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="La Dimora"
            title="Una dimora, non una semplice camera"
            description="Dimora Cuore della Città nasce per chi vuole vivere la città come un residente, non come un turista di passaggio. Ogni ambiente è stato pensato per unire il comfort di una casa vera all'atmosfera autentica del centro storico che la ospita."
          />
          <p className="max-w-xl text-base sm:text-lg text-ink-soft leading-relaxed">
            A pochi passi dai principali punti di interesse, la struttura
            offre un punto d&rsquo;appoggio silenzioso e curato nei dettagli,
            dove tornare dopo una giornata di scoperta.
          </p>
        </div>
      </Container>
    </section>
  );
}
