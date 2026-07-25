"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { NavLink } from "@/components/ui/NavLink";
import { WhatsappIcon } from "@/components/ui/icons";
import { MobileMenu } from "@/components/layout/MobileMenu";
import {
  bookCtaLabel,
  heroClaim,
  heroImageSrc,
  heroLocation,
  heroSubtitle,
  navLinks,
  siteConfig,
} from "@/lib/content";
import { whatsappHref } from "@/lib/contact";

export function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section className="relative flex min-h-dvh items-end overflow-hidden bg-ink">
      <div className="absolute inset-0">
        {heroImageSrc ? (
          <Image
            src={heroImageSrc}
            alt="Interno della Dimora Cuore della Città"
            fill
            priority
            className="object-cover brightness-90 saturate-[0.95]"
          />
        ) : (
          <ImagePlaceholder label="Foto hero in arrivo" className="h-full w-full" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,12,10,0.6)_0%,rgba(15,12,10,0.12)_48%,transparent_82%)]" />
        {/* Il lockup mobile cade a metà foto, dove il copriletto è chiaro: il
            gradiente da solo non basta a tenere leggibile l'avorio. */}
        <div className="absolute inset-0 bg-ink/35 md:hidden" />
      </div>

      <div className="absolute inset-x-0 top-0 z-20">
        <div className="bg-gradient-to-r from-[#D3B298] to-[#C4926A]">
          <div className="flex items-center justify-center gap-3 px-6 py-2 text-xs text-white md:justify-end sm:px-10 sm:text-sm lg:px-14">
            <span className="tracking-wide">Prenota direttamente per la miglior tariffa garantita</span>
            {/* Sotto md la prenotazione vive nel lockup centrato, a poche
                decine di pixel da qui: due CTA identiche si indebolirebbero. */}
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden whitespace-nowrap border border-terracotta bg-terracotta px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-cream transition-colors duration-300 hover:border-terracotta-dark hover:bg-terracotta-dark md:inline-block sm:text-sm"
            >
              {bookCtaLabel}
            </a>
          </div>
        </div>

        {/* Sotto md nella riga resta solo l'hamburger: senza `justify-end`
            finirebbe a sinistra, dove non c'è più il wordmark. */}
        <div className="flex items-start justify-end px-6 pt-6 md:justify-between sm:px-10 lg:px-14">
          {/* Sotto md il wordmark è il lockup centrato più in basso. */}
          <h1 className="hidden max-w-[10ch] md:block">
            <Link
              href="/"
              className="font-display text-4xl leading-[0.9] text-hero-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:text-5xl lg:text-6xl"
            >
              {siteConfig.name}
            </Link>
          </h1>

          <ul className="hidden flex-col items-end gap-3 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  label={link.label}
                  className="font-hero text-xl leading-snug tracking-[0.12em] text-hero-ivory drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] transition-colors duration-300 hover:text-white sm:text-2xl"
                  align="end"
                  lineClassName="bg-hero-sand/80 group-hover:bg-hero-ivory"
                />
              </li>
            ))}
          </ul>

          <button
            type="button"
            aria-label="Apri il menu"
            className="text-cream md:hidden"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <MobileMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Lockup centrato: sotto md è tutta la Hero, il wordmark in alto a
          sinistra e il blocco in basso sono nascosti. I due `h1` (questo e
          quello dell'overlay) non convivono mai: `hidden` toglie l'altro anche
          dall'albero di accessibilità. */}
      <div className="relative z-10 flex min-h-dvh w-full flex-col items-center justify-center gap-6 px-8 text-center md:hidden">
        <h1>
          <Link
            href="/"
            className="block font-display text-4xl leading-[1.05] text-hero-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
          >
            {siteConfig.name}
          </Link>
        </h1>

        <p className="font-body text-[0.8rem] tracking-[0.2em] text-hero-sand uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
          {heroLocation}
        </p>

        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center gap-3 text-xs font-semibold tracking-[0.12em] text-hero-ivory uppercase"
        >
          {bookCtaLabel}
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-hero-ivory/60">
            <WhatsappIcon className="h-4 w-4" />
          </span>
        </a>
      </div>

      <div className="relative z-10 hidden w-full flex-col items-end gap-5 px-6 pb-10 text-right sm:gap-7 sm:px-10 sm:pb-14 md:flex lg:px-14">
        <p className="max-w-md text-base text-hero-ivory leading-relaxed sm:text-lg">
          {heroSubtitle}
        </p>

        <p className="font-display text-4xl uppercase leading-[0.95] tracking-tight text-hero-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:text-6xl lg:text-7xl">
          {heroClaim}
        </p>
      </div>
    </section>
  );
}
