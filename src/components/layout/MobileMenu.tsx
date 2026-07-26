"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Mail, Phone, X } from "lucide-react";
import { InstagramIcon, WhatsappIcon } from "@/components/ui/icons";
import { navLinks, showFullNav, siteConfig } from "@/lib/content";
import { telHref, whatsappHref } from "@/lib/contact";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

// Il portale ha bisogno di `document`, che sul server non esiste: lo snapshot
// server restituisce false e quello client true, così il primo render SSR e
// l'idratazione coincidono senza passare da un setState in effect.
const neverChanges = () => () => {};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const mounted = useSyncExternalStore(
    neverChanges,
    () => true,
    () => false
  );

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

  if (!mounted) return null;

  return createPortal(
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`}
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
        className={`absolute inset-y-0 left-0 flex h-full w-[86%] max-w-sm flex-col bg-cream text-ink shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* X sola in alto, il nome della struttura sulla riga sotto: stesso
            ordine di lettura del riferimento del cliente (Six Senses), non più
            affiancati sulla stessa riga. */}
        <div className="px-8 pt-8">
          <button
            type="button"
            aria-label="Chiudi il menu"
            onClick={onClose}
            className="-ml-1 cursor-pointer text-ink-soft transition-colors hover:text-ink"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>

          <p className="mt-6 font-brand text-[0.7rem] tracking-[0.3em] text-stone uppercase">
            {siteConfig.name}
          </p>
        </div>

        <nav className="mt-10 flex flex-1 flex-col gap-5 overflow-y-auto px-8">
          {navLinks.map((link) =>
            // La Homepage è sempre raggiungibile, anche a bozza attiva.
            showFullNav || link.href === "/" ? (
              <a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="text-lg text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ) : (
              <span
                key={link.href}
                role="link"
                aria-disabled="true"
                onClick={onClose}
                className="cursor-pointer text-lg text-ink-soft transition-colors hover:text-ink"
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
          <div className="flex items-center gap-5 text-ink-soft">
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Scrivici su WhatsApp"
              className="transition-colors hover:text-terracotta"
            >
              <WhatsappIcon className="h-5 w-5" />
            </a>
            <a href={telHref()} aria-label="Chiamaci" className="transition-colors hover:text-terracotta">
              <Phone className="h-5 w-5" strokeWidth={1.5} />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Scrivici una mail"
              className="transition-colors hover:text-terracotta"
            >
              <Mail className="h-5 w-5" strokeWidth={1.5} />
            </a>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Seguici su Instagram"
              className="transition-colors hover:text-terracotta"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </aside>
    </div>,
    document.body
  );
}
