"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { getContent } from "@/lib/content";
import { heroImageSrc } from "@/lib/content.shared";
import { whatsappHref } from "@/lib/contact";
import type { Locale } from "@/lib/i18n";

type HeroProps = {
  locale: Locale;
  // Stessa Hero ovunque venga montata (wordmark, claim, sottotitolo, CTA):
  // una route diversa dalla home può cambiare foto, claim e sottotitolo, ma
  // non la struttura.
  imageSrc?: string;
  imageAlt?: string;
  claim?: string;
  // Stringa vuota = nessun descrittore (stessa convenzione di `subtitle` qui
  // sotto): "non passare nulla" usa il default, "passare stringa vuota" lo
  // nasconde volutamente.
  descriptor?: string;
  // Stringa vuota = nessun sottotitolo (non lo stesso del default: qui il
  // "non passare nulla" e "passare esplicitamente niente" sono due cose
  // diverse, la seconda nasconde il paragrafo).
  subtitle?: string;
  // Il claim della home resta nascosto sotto `md` per non affollare la foto
  // di testo; un claim più corto (come "La Nostra Storia") può restare
  // visibile anche lì.
  showClaimOnMobile?: boolean;
};

export function Hero({
  locale,
  imageSrc,
  imageAlt,
  claim,
  descriptor,
  subtitle,
  showClaimOnMobile = false,
}: HeroProps) {
  const content = getContent(locale);
  const resolvedImageSrc = imageSrc ?? heroImageSrc;
  const resolvedImageAlt = imageAlt ?? content.ui.heroDefaultImageAlt;
  const resolvedClaim = claim ?? content.heroClaim;
  const resolvedDescriptor = descriptor ?? content.heroDescriptor;
  const resolvedSubtitle = subtitle ?? content.heroSubtitle;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section className="relative flex min-h-dvh items-end overflow-hidden bg-ink">
      <div className="absolute inset-0">
        {resolvedImageSrc ? (
          <Image
            src={resolvedImageSrc}
            alt={resolvedImageAlt}
            fill
            priority
            className="object-cover brightness-90 saturate-[0.95]"
          />
        ) : (
          <ImagePlaceholder label={content.ui.heroImagePlaceholder} className="h-full w-full" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,12,10,0.6)_0%,rgba(15,12,10,0.12)_48%,transparent_82%)]" />
        {/* Il lockup cade a metà foto, dove il copriletto è chiaro: il
            gradiente da solo non basta a tenere leggibile l'avorio. Su schermi
            larghi il testo occupa una fascia più stretta, quindi basta meno. */}
        <div className="absolute inset-0 bg-ink/35 md:bg-ink/25" />
      </div>

      {/* Riga unica direttamente sulla foto, come nel riferimento: hamburger a
          sinistra, CTA a destra, nessuna fascia sopra. */}
      <div className="absolute inset-x-0 top-0 z-20">
        <div className="flex items-center justify-between px-6 pt-6 sm:px-10 lg:px-14">
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label={content.ui.openMenu}
              className="cursor-pointer text-cream transition-colors duration-300 hover:text-white"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-6 w-6 lg:h-7 lg:w-7" strokeWidth={1.5} />
            </button>
            <LanguageSwitcher locale={locale} />
          </div>

          <a
            href={whatsappHref(content.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap border border-terracotta bg-terracotta px-3 py-1.5 text-[0.7rem] font-semibold tracking-[0.08em] text-cream uppercase transition-colors duration-300 hover:border-terracotta-dark hover:bg-terracotta-dark sm:px-4 sm:py-2 sm:text-xs lg:px-5 lg:py-2.5 lg:text-sm"
          >
            {content.bookCtaLabel}
          </a>
        </div>
      </div>

      <MobileMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} locale={locale} />

      {/* Un solo impaginato a tutte le larghezze: lockup centrato, come il
          riferimento Six Senses. Sotto md cade solo il claim (in maiuscolo,
          già ridondante con il sottotitolo); il sottotitolo resta anche su
          mobile, a corpo ridotto. */}
      <div className="relative z-10 flex min-h-dvh w-full flex-col items-center justify-center gap-7 px-8 text-center md:gap-9">
        {/* Wordmark e località sono una coppia: gap breve tra loro, respiro
            maggiore verso claim e sottotitolo. */}
        <div className="flex flex-col items-center gap-3">
          <h1>
            <Link
              href="/"
              className="block font-wordmark text-4xl leading-[1.05] text-hero-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] md:text-6xl lg:text-7xl"
            >
              {content.name}
            </Link>
          </h1>

          <p className="font-body text-[0.8rem] tracking-[0.2em] text-hero-sand uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
            {content.heroLocation}
          </p>

          {resolvedDescriptor && (
            <p className="font-body text-sm text-hero-ivory/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] md:text-base">
              {resolvedDescriptor}
            </p>
          )}
        </div>

        <p
          className={`font-wordmark text-2xl uppercase leading-tight tracking-[0.06em] text-hero-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] lg:text-3xl ${
            showClaimOnMobile ? "" : "hidden md:block"
          }`}
        >
          {resolvedClaim}
        </p>

        {/* A differenza del claim, il sottotitolo compare anche sotto `md`:
            corpo ridotto (`text-sm`) perché su 375px resta comunque tre
            righe. Assente del tutto quando `subtitle` è una stringa vuota. */}
        {resolvedSubtitle && (
          <p className="max-w-xs text-pretty text-sm leading-relaxed text-hero-ivory/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)] sm:max-w-sm md:max-w-2xl md:text-base lg:text-lg">
            {resolvedSubtitle}
          </p>
        )}

        {/* Indicatore di scroll: due chevron sovrapposti, senza testo. È
            decorativo, quindi fuori dall'albero di accessibilità. */}
        <span
          aria-hidden
          className="absolute bottom-10 flex animate-bounce flex-col items-center text-hero-ivory motion-reduce:animate-none"
        >
          <ChevronDown className="h-5 w-5" strokeWidth={1.25} />
          <ChevronDown className="-mt-3.5 h-5 w-5 opacity-50" strokeWidth={1.25} />
        </span>
      </div>
    </section>
  );
}
