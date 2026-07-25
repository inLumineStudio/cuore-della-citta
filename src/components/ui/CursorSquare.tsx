"use client";

import { useEffect, useRef } from "react";

// Quadratino terracotta semitrasparente che segue il puntatore. Non è un
// `cursor: url(...)`: quello sostituirebbe la freccia di sistema, che qui
// vogliamo restare visibile. La posizione è scritta direttamente sul nodo DOM,
// senza stato React, perché un `setState` per ogni `pointermove` farebbe
// ri-renderizzare l'albero decine di volte al secondo.
export function CursorSquare() {
  const squareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const square = squareRef.current;
    if (!square) return;

    // Niente puntatore, niente quadratino: su touch resterebbe fermo dove
    // capita l'ultimo tap.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    function handleMove(event: PointerEvent) {
      square!.style.transform = `translate3d(${event.clientX - 7}px, ${event.clientY - 7}px, 0)`;
      square!.style.opacity = "1";
    }

    function handleLeave() {
      square!.style.opacity = "0";
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  // Reso anche dal server, ma invisibile: l'opacità passa a 1 al primo
  // movimento del puntatore.
  return (
    <div
      ref={squareRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] h-3.5 w-3.5 bg-terracotta/60 opacity-0 transition-opacity duration-200"
    />
  );
}
