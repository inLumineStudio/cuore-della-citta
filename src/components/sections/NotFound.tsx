import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getContent } from "@/lib/content";
import { localizeHref, type Locale } from "@/lib/i18n";

type NotFoundProps = {
  locale: Locale;
};

export function NotFound({ locale }: NotFoundProps) {
  const { ui } = getContent(locale);

  return (
    <section className="flex min-h-[70vh] items-center bg-cream py-24">
      <Container className="flex flex-col items-center gap-6 text-center">
        <span className="font-display text-6xl text-terracotta sm:text-7xl">404</span>
        <h1 className="font-display text-3xl text-ink sm:text-4xl">{ui.notFoundTitle}</h1>
        <p className="max-w-md text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
          {ui.notFoundMessage}
        </p>
        <Link
          href={localizeHref("/", locale)}
          className="mt-2 inline-flex items-center gap-2 bg-terracotta px-6 py-3 text-sm font-semibold tracking-wide text-cream uppercase transition-colors hover:bg-terracotta-dark"
        >
          {ui.notFoundCta}
        </Link>
      </Container>
    </section>
  );
}
