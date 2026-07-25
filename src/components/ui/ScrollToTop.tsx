"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
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
      aria-label="Torna in cima"
      // `behavior: "instant"` sovrascrive lo `scroll-behavior: smooth` globale:
      // con lo scroll orizzontale la home è alta tre viewport e l'animazione
      // durerebbe secondi.
      onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
      className={`fixed right-6 bottom-6 z-40 flex h-11 w-11 cursor-pointer items-center justify-center bg-terracotta text-cream shadow-lg transition-[opacity,transform,background-color] duration-300 hover:bg-terracotta-dark lg:right-8 lg:bottom-8 ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={1.5} />
    </button>
  );
}
