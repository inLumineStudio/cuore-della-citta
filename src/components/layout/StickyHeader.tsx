"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { MobileMenu } from "@/components/layout/MobileMenu";
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
          aria-label="Apri il menu"
          className="text-ink md:hidden"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="h-6 w-6" strokeWidth={1.5} />
        </button>
      </div>

      <MobileMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
