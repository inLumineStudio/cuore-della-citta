import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { InstagramIcon, WhatsappIcon } from "@/components/ui/icons";
import { navLinks, siteConfig } from "@/lib/content";
import { telHref, whatsappHref } from "@/lib/contact";

export function Footer() {
  return (
    <footer className="bg-ink text-cream/70">
      <Container className="flex flex-col gap-10 py-14 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-3">
          <span className="font-brand text-lg tracking-[0.1em] text-cream uppercase">
            {siteConfig.name}
          </span>
          <p className="max-w-xs text-sm leading-relaxed">{siteConfig.addressLine}</p>
          <p className="text-sm">{siteConfig.email}</p>

          <div className="mt-2 flex items-center gap-4">
            <a
              href={whatsappHref("Ciao! Vorrei informazioni sulla disponibilità.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Scrivici su WhatsApp"
              className="text-cream/70 transition-colors hover:text-cream"
            >
              <WhatsappIcon className="h-5 w-5" />
            </a>
            <a
              href={telHref()}
              aria-label="Chiamaci"
              className="text-cream/70 transition-colors hover:text-cream"
            >
              <Phone className="h-5 w-5" strokeWidth={1.5} />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Scrivici una mail"
              className="text-cream/70 transition-colors hover:text-cream"
            >
              <Mail className="h-5 w-5" strokeWidth={1.5} />
            </a>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Seguici su Instagram"
              className="text-cream/70 transition-colors hover:text-cream"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <nav className="flex flex-col gap-3 sm:items-end">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm hover:text-cream transition-colors">
              {link.label}
            </a>
          ))}
        </nav>
      </Container>

      <Container className="flex flex-col gap-2 border-t border-cream/10 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.fullName}. Tutti i diritti riservati.
        </p>
        <p>
          Realizzato da{" "}
          <a
            href="https://www.inlumine.it"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-cream hover:text-terracotta transition-colors"
          >
            inLumine Studio
          </a>
        </p>
      </Container>
    </footer>
  );
}
