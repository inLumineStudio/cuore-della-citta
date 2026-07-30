"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type ScrollToTopProps = {
  locale: Locale;
};

// Solo sotto md: su desktop la rotellina e la scrollbar bastano, e il pulsante
// fisso finirebbe sopra i contenuti. La firma nel footer non gli va mai sotto
// perché il footer riserva spazio in fondo alla sua ultima riga (vedi Footer).
export function ScrollToTop({ locale }: ScrollToTopProps) {
  const content = getContent(locale);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > window.innerHeight);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label={content.ui.backToTop}
      // `behavior: "instant"` sovrascrive lo `scroll-behavior: smooth` globale:
      // con lo scroll orizzontale la home è alta tre viewport e l'animazione
      // durerebbe secondi.
      onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
      className={`fixed right-5 bottom-5 z-40 flex h-11 w-11 cursor-pointer items-center justify-center bg-terracotta text-cream shadow-lg transition-[opacity,transform,background-color] duration-300 hover:bg-terracotta-dark md:hidden ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={1.5} />
    </button>
  );
}
