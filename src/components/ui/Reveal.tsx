"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  // Scaglionamento per liste di elementi (es. paragrafi): ogni elemento parte
  // un po' più tardi del precedente.
  delayMs?: number;
  // "slide" (default) per i testi: fade + leggero salire dal basso.
  // "scale" per le immagini: fade + leggero ingrandimento, senza spostamento.
  variant?: "slide" | "scale";
};

const noopSubscribe = () => () => {};

const hiddenClasses = {
  slide: "translate-y-4 opacity-0",
  scale: "scale-95 opacity-0",
};

const visibleClasses = {
  slide: "translate-y-0 opacity-100",
  scale: "scale-100 opacity-100",
};

// Attenzione: in Tailwind v4 `translate-y-*` e `scale-*` scrivono le proprietà
// `translate`/`scale`, non `transform` (stessa trappola di `NavLink` con
// `scale-x-*`) — la transizione deve elencarle per nome, non `transform`.
const transitionProperty = {
  slide: "transition-[opacity,translate]",
  scale: "transition-[opacity,scale]",
};

// Un'alternativa a GSAP ScrollTrigger per un effetto "soft": stessa filosofia
// di `HorizontalScroller`, CSS transition + IntersectionObserver invece di
// una libreria di animazione.
export function Reveal({ children, className = "", delayMs = 0, variant = "slide" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isIntersected, setIsIntersected] = useState(false);

  // Letto in modo sincrono (nessun setState in effect): il default server è
  // "false" perché non possiamo saperlo prima dell'idratazione, ma è solo un
  // frame prima che il client corregga il valore.
  const prefersReducedMotion = useSyncExternalStore(
    noopSubscribe,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const isVisible = prefersReducedMotion || isIntersected;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: isVisible ? `${delayMs}ms` : "0ms" }}
      className={`${transitionProperty[variant]} duration-700 ease-out ${
        isVisible ? visibleClasses[variant] : hiddenClasses[variant]
      } ${className}`}
    >
      {children}
    </div>
  );
}
