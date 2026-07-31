"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type GalleryProps = {
  locale: Locale;
};

export function Gallery({ locale }: GalleryProps) {
  const { galleryImages, ui } = getContent(locale);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const showNext = () =>
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % galleryImages.length
    );
  const showPrev = () =>
    setActiveIndex((current) =>
      current === null
        ? null
        : (current - 1 + galleryImages.length) % galleryImages.length
    );

  return (
    <section className="py-24 sm:py-32 bg-cream-soft">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow={ui.galleryEyebrow}
          title={ui.galleryTitle}
          description={ui.galleryDescription}
        />

        {/* Layout a cascata (CSS columns, non grid): righe di altezza
            uniforme non hanno senso con foto di orientamento diverso, e le
            colonne ridistribuiscono da sole ogni card nella colonna più
            corta. `break-inside-avoid` impedisce a una card di spezzarsi fra
            due colonne. */}
        <div className="columns-2 gap-4 sm:columns-3 sm:gap-6 lg:columns-4">
          {galleryImages.map((image, index) => (
            <button
              key={image.alt}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative mb-4 block w-full overflow-hidden rounded-sm break-inside-avoid sm:mb-6"
            >
              {image.src ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <ImagePlaceholder
                  label=""
                  className="w-full"
                  style={{ aspectRatio: `${image.width} / ${image.height}` }}
                />
              )}
              <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-ink/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <ZoomIn className="ml-auto h-5 w-5 text-cream" strokeWidth={1.5} />
                <p className="text-left text-sm leading-snug text-cream">{image.description}</p>
              </div>
            </button>
          ))}
        </div>
      </Container>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-ink/95 px-4 py-10"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            aria-label={ui.galleryCloseLabel}
            className="absolute top-6 right-6 text-cream"
            onClick={() => setActiveIndex(null)}
          >
            <X className="h-7 w-7" />
          </button>

          <button
            type="button"
            aria-label={ui.galleryPrevLabel}
            className="absolute left-4 sm:left-8 text-cream"
            onClick={(event) => {
              event.stopPropagation();
              showPrev();
            }}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <div
            className="relative max-h-[75dvh] w-full max-w-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            {galleryImages[activeIndex].src ? (
              <Image
                src={galleryImages[activeIndex].src}
                alt={galleryImages[activeIndex].alt}
                width={galleryImages[activeIndex].width}
                height={galleryImages[activeIndex].height}
                className="h-auto max-h-[75dvh] w-full object-contain"
              />
            ) : (
              <ImagePlaceholder className="aspect-[4/3] w-full" />
            )}
          </div>

          <p
            className="max-w-xl text-center text-sm text-cream/80"
            onClick={(event) => event.stopPropagation()}
          >
            {galleryImages[activeIndex].description}
          </p>

          <button
            type="button"
            aria-label={ui.galleryNextLabel}
            className="absolute right-4 sm:right-8 text-cream"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
    </section>
  );
}
