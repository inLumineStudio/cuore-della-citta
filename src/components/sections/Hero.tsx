"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { heroClaim, heroImageSrc, heroSubtitle, navLinks, showFullNav, siteConfig } from "@/lib/content";
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
      </div>

      <div className="absolute inset-x-0 top-0 z-20">
        <div className="bg-gradient-to-r from-[#D3B298] to-[#C4926A]">
          <div className="flex items-center justify-end gap-3 px-6 py-2 text-xs text-white sm:px-10 sm:text-sm lg:px-14">
            <span className="tracking-wide">Prenota direttamente per la miglior tariffa garantita</span>
            <a
              href={whatsappHref("Ciao! Vorrei informazioni sulla disponibilità.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white px-3 py-1 font-semibold tracking-wide uppercase whitespace-nowrap text-white transition-colors hover:bg-white/10"
            >
              Prenota ora
            </a>
          </div>
        </div>

        <div className="flex items-start justify-between px-6 pt-6 sm:px-10 lg:px-14">
          <h1 className="max-w-[10ch]">
            <a
              href="/"
              className="font-hero text-4xl leading-[0.9] text-hero-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:text-5xl lg:text-6xl"
            >
              {siteConfig.name}
            </a>
          </h1>

          <ul className="hidden flex-col items-end gap-2 md:flex">
            {navLinks.map((link) =>
              showFullNav ? (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-hero text-xl leading-snug tracking-[0.12em] text-hero-ivory drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] transition-colors hover:text-white sm:text-2xl"
                  >
                    {link.label}
                  </a>
                </li>
              ) : (
                <li key={link.href}>
                  <span
                    role="link"
                    aria-disabled="true"
                    className="cursor-pointer font-hero text-xl leading-snug tracking-[0.12em] text-hero-ivory drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] transition-colors hover:text-white select-none sm:text-2xl"
                  >
                    {link.label}
                  </span>
                </li>
              )
            )}
          </ul>

          <button
            type="button"
            aria-label={isMenuOpen ? "Chiudi il menu" : "Apri il menu"}
            className="text-cream md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="bg-ink/95 backdrop-blur-sm md:hidden">
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) =>
                showFullNav ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg text-cream/90 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
                  <span
                    key={link.href}
                    role="link"
                    aria-disabled="true"
                    onClick={() => setIsMenuOpen(false)}
                    className="cursor-pointer text-lg text-cream/90 hover:text-cream transition-colors select-none"
                  >
                    {link.label}
                  </span>
                )
              )}
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 flex w-full flex-col items-end gap-5 px-6 pb-10 text-right sm:gap-7 sm:px-10 sm:pb-14 lg:px-14">
        <p className="max-w-md text-base text-hero-ivory leading-relaxed sm:text-lg">
          {heroSubtitle}
        </p>

        <p className="font-hero text-4xl uppercase leading-[0.95] tracking-tight text-hero-ivory drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:text-6xl lg:text-7xl">
          {heroClaim}
        </p>
      </div>
    </section>
  );
}
