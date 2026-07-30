import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { InstagramIcon, WhatsappIcon } from "@/components/ui/icons";
import { getContent } from "@/lib/content";
import { telHref, whatsappHref } from "@/lib/contact";
import { localizeHref, type Locale } from "@/lib/i18n";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  const content = getContent(locale);

  return (
    <footer className="bg-ink text-cream/70">
      <Container className="flex flex-col gap-10 py-14 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-3">
          <span className="font-brand text-lg tracking-[0.1em] text-cream uppercase">
            {content.name}
          </span>
          <p className="max-w-xs text-sm leading-relaxed">{content.addressLine}</p>
          <p className="text-sm">{content.email}</p>

          <div className="mt-2 flex items-center gap-4">
            <a
              href={whatsappHref(content.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={content.ui.whatsappLabel}
              className="text-cream/70 transition-colors hover:text-cream"
            >
              <WhatsappIcon className="h-5 w-5" />
            </a>
            <a
              href={telHref()}
              aria-label={content.ui.callLabel}
              className="text-cream/70 transition-colors hover:text-cream"
            >
              <Phone className="h-5 w-5" strokeWidth={1.5} />
            </a>
            <a
              href={`mailto:${content.email}`}
              aria-label={content.ui.emailLabel}
              className="text-cream/70 transition-colors hover:text-cream"
            >
              <Mail className="h-5 w-5" strokeWidth={1.5} />
            </a>
            <a
              href={content.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={content.ui.instagramLabel}
              className="text-cream/70 transition-colors hover:text-cream"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          </div>
        </div>

        <nav className="flex flex-col gap-3 sm:items-end">
          {content.navLinks.map((link) => (
            <a
              key={link.href}
              href={localizeHref(link.href, locale)}
              className="relative inline-block text-sm text-cream/70 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-terracotta after:transition-all after:duration-300 after:content-[''] hover:text-cream hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </Container>

      {/* Il `pb-24` sotto md tiene copyright e firma sopra il pulsante
          "torna in cima", che è fisso in basso a destra solo su mobile. */}
      <Container className="border-t border-cream/10 pt-6 pb-24 text-xs md:pb-6">
        {content.photoCredits ? <p className="mb-4 text-cream/50">{content.photoCredits}</p> : null}

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {content.fullName}. {content.ui.allRightsReserved}
          </p>
          <p>
            {content.ui.madeBy}{" "}
            <a
              href="https://www.inlumine.it"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-cream hover:text-terracotta transition-colors"
            >
              inLumine Studio
            </a>
            .
          </p>
        </div>
      </Container>
    </footer>
  );
}
