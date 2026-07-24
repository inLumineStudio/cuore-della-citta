"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { navLinks, showFullNav, siteConfig } from "@/lib/content";

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
      <div className="flex items-center justify-between px-6 py-4 sm:px-10 lg:px-14">
        <a href="/" className="font-brand text-lg tracking-[0.1em] text-ink uppercase">
          {siteConfig.name}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
            showFullNav ? (
              <li key={link.href}>
                <a href={link.href} className="text-sm tracking-wide text-ink-soft hover:text-ink transition-colors">
                  {link.label}
                </a>
              </li>
            ) : (
              <li key={link.href}>
                <span role="link" aria-disabled="true" className="cursor-pointer text-sm tracking-wide text-ink-soft hover:text-ink transition-colors select-none">
                  {link.label}
                </span>
              </li>
            )
          )}
        </ul>

        <button
          type="button"
          aria-label={isMenuOpen ? "Chiudi il menu" : "Apri il menu"}
          className="text-ink md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-stone-light bg-cream md:hidden">
          <div className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) =>
              showFullNav ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base text-ink-soft hover:text-ink transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <span
                  key={link.href}
                  role="link"
                  aria-disabled="true"
                  onClick={() => setIsMenuOpen(false)}
                  className="cursor-pointer text-base text-ink-soft hover:text-ink transition-colors select-none"
                >
                  {link.label}
                </span>
              )
            )}
            <Button href="/faq" variant="outline-dark" className="mt-2 w-fit" disabled={!showFullNav}>
              Contattaci
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
