"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavLink } from "@/components/ui/NavLink";
import { bookCtaLabel, navLinks, siteConfig } from "@/lib/content";
import { whatsappHref } from "@/lib/contact";

export function StickyHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    function handleScroll() {
      setHasScrolledPastHero(window.scrollY > window.innerHeight * 0.85);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const isVisible = isHome ? hasScrolledPastHero : true;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-stone-light bg-cream/95 backdrop-blur-sm transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-4 sm:px-10 lg:px-14">
        {/* Sotto md l'hamburger sta a sinistra, come nella Hero: stesso lato da
            cui entra il drawer condiviso (`MobileMenu`). Da md in su è
            nascosto e il logo torna a essere il primo elemento della riga. */}
        <button
          type="button"
          aria-label="Apri il menu"
          className="cursor-pointer text-ink transition-colors duration-300 hover:text-terracotta md:hidden"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="h-6 w-6" strokeWidth={1.5} />
        </button>

        <Link href="/" className="font-brand text-lg tracking-[0.1em] text-ink uppercase">
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-6 lg:gap-8">
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  label={link.label}
                  className="text-sm tracking-wide text-ink-soft transition-colors duration-300 hover:text-ink"
                />
              </li>
            ))}
          </ul>

          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block whitespace-nowrap border border-terracotta bg-terracotta px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-cream transition-colors duration-300 hover:border-terracotta-dark hover:bg-terracotta-dark sm:px-4 sm:py-2 sm:text-xs"
          >
            {bookCtaLabel}
          </a>
        </div>
      </div>

      <MobileMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
