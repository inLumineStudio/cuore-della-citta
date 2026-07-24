import { Phone, MessageCircle, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/content";
import { telHref, whatsappHref, telegramHref } from "@/lib/contact";

export function ContactCta() {
  return (
    <section className="bg-gradient-to-br from-terracotta to-terracotta-dark py-24 sm:py-28 text-cream">

      <Container className="flex flex-col items-center gap-8 text-center">
        <h2 className="font-display text-4xl sm:text-5xl leading-tight max-w-2xl">
          Pronto a vivere il cuore della città?
        </h2>
        <p className="max-w-xl text-base sm:text-lg text-cream/85 leading-relaxed">
          Scrivici o chiamaci direttamente: nessun intermediario, risposta
          rapida e disponibilità in tempo reale.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            href={whatsappHref("Ciao! Vorrei informazioni sulla disponibilità.")}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline-light"
            icon={<MessageCircle className="h-4 w-4" />}
          >
            WhatsApp
          </Button>
          <Button href={telHref()} variant="outline-light" icon={<Phone className="h-4 w-4" />}>
            {siteConfig.phoneDisplay}
          </Button>
          <Button
            href={telegramHref()}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline-light"
            icon={<Send className="h-4 w-4" />}
          >
            Telegram
          </Button>
        </div>
      </Container>
    </section>
  );
}
