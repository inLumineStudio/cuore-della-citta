"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { navLinks, showFullNav, siteConfig } from "@/lib/content";
import { telHref, whatsappHref } from "@/lib/contact";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[60] md:hidden ${open ? "" : "pointer-events-none"}`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu di navigazione"
        className={`absolute inset-y-0 right-0 flex h-full w-[86%] max-w-sm flex-col bg-cream text-ink shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-8 pt-8">
          <span className="font-brand text-[0.7rem] tracking-[0.3em] text-stone uppercase">
            {siteConfig.name}
          </span>
          <button
            type="button"
            aria-label="Chiudi il menu"
            onClick={onClose}
            className="-mr-1 text-ink-soft transition-colors hover:text-ink"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
          {navLinks.map((link) =>
            showFullNav ? (
              <a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="font-hero text-[1.7rem] leading-tight text-ink transition-colors hover:text-terracotta"
              >
                {link.label}
              </a>
            ) : (
              <span
                key={link.href}
                role="link"
                aria-disabled="true"
                onClick={onClose}
                className="cursor-pointer font-hero text-[1.7rem] leading-tight text-ink transition-colors hover:text-terracotta"
              >
                {link.label}
              </span>
            )
          )}
        </nav>

        <div className="border-t border-stone-light px-8 py-8">
          <p className="mb-4 font-brand text-[0.7rem] tracking-[0.3em] text-stone uppercase">
            Contatti
          </p>
          <div className="flex flex-col gap-3 text-sm text-ink-soft">
            <a
              href={whatsappHref("Ciao! Vorrei informazioni sulla disponibilità.")}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-terracotta"
            >
              WhatsApp
            </a>
            <a href={telHref()} className="transition-colors hover:text-terracotta">
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="transition-colors hover:text-terracotta"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
