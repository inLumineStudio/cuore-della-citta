"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { getContent } from "@/lib/content";
import { heroImageSrc } from "@/lib/content.shared";
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

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {galleryImages.map((image, index) => (
            <button
              key={image.alt}
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative aspect-square overflow-hidden rounded-sm"
            >
              {heroImageSrc ? (
                <Image
                  src={heroImageSrc}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <ImagePlaceholder label="" className="h-full w-full" />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-200 group-hover:bg-ink/30 group-hover:opacity-100">
                <ZoomIn className="h-6 w-6 text-cream" strokeWidth={1.5} />
              </div>
            </button>
          ))}
        </div>
      </Container>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 px-4"
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
            className="relative aspect-[4/3] w-full max-w-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            {heroImageSrc ? (
              <Image
                src={heroImageSrc}
                alt={galleryImages[activeIndex].alt}
                fill
                className="object-contain"
              />
            ) : (
              <ImagePlaceholder className="h-full w-full" />
            )}
          </div>

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
