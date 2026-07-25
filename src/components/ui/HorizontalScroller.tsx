"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";

const DESKTOP_QUERY = "(min-width: 1024px)";

// Scroll orizzontale della home su desktop. Il wrapper riceve via JS un'altezza
// pari a "un viewport + la corsa orizzontale": è quello spazio verticale fittizio
// che dà allo scroll del mouse qualcosa da consumare mentre la track, agganciata
// a schermo con position:sticky, trasla lateralmente. Sotto lg il tutto viene
// azzerato e i pannelli tornano a impilarsi in verticale.
export function HorizontalScroller({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    const mql = window.matchMedia(DESKTOP_QUERY);
    let start = 0;
    let travel = 0;

    function measure() {
      travel = Math.max(0, track!.scrollWidth - window.innerWidth);
      wrapper!.style.height = `${window.innerHeight + travel}px`;
      start = wrapper!.getBoundingClientRect().top + window.scrollY;
    }

    function apply() {
      const progress = Math.min(Math.max(window.scrollY - start, 0), travel);
      track!.style.transform = `translate3d(${-progress}px, 0, 0)`;
    }

    function onScroll() {
      if (mql.matches) apply();
    }

    function sync() {
      if (mql.matches) {
        measure();
        apply();
      } else {
        wrapper!.style.height = "";
        track!.style.transform = "";
      }
    }

    sync();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", sync);
    mql.addEventListener("change", sync);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", sync);
      mql.removeEventListener("change", sync);
      wrapper.style.height = "";
      track.style.transform = "";
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <div className="lg:sticky lg:top-0 lg:h-dvh lg:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col lg:h-full lg:w-max lg:flex-row lg:will-change-transform"
        >
          {Children.toArray(children).map((panel, index) => (
            <div key={index} className="lg:h-full lg:w-screen lg:shrink-0">
              {panel}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
