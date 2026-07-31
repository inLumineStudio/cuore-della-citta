"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavLink } from "@/components/ui/NavLink";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { getContent } from "@/lib/content";
import { navRoutes } from "@/lib/content.shared";
import { whatsappHref } from "@/lib/contact";
import { localizeHref, locales, type Locale } from "@/lib/i18n";

// Ogni route con una propria <Hero /> (oggi tutte), in entrambe le lingue:
// lì lo StickyHeader deve restare nascosto finché non si scrolla oltre,
// esattamente come in home. Derivato da `navRoutes` + `localizeHref` invece
// di un elenco scritto a mano, per non doverlo aggiornare a mano per ogni
// nuova lingua o route.
const routesWithHero = locales.flatMap((l) => navRoutes.map((route) => localizeHref(route.href, l)));

type StickyHeaderProps = {
  locale: Locale;
};

export function StickyHeader({ locale }: StickyHeaderProps) {
  const pathname = usePathname();
  const hasHero = routesWithHero.includes(pathname);
  const content = getContent(locale);

  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!hasHero) return;

    // La soglia va misurata una volta, non ad ogni scroll: su mobile la
    // barra degli indirizzi si espande/collassa durante lo scroll stesso,
    // e `window.innerHeight` cambia con lei. Ricalcolarla ad ogni evento
    // scroll faceva oscillare la soglia in tempo reale insieme alla UI del
    // browser, con l'header che appariva e spariva per un istante pur
    // scorrendo sempre nella stessa direzione. Il resize dovuto
    // all'animazione della toolbar va quindi ignorato con un debounce,
    // altrimenti il problema si ripresenta lì.
    let threshold = window.innerHeight * 0.85;
    let resizeTimeout: ReturnType<typeof setTimeout>;

    function handleScroll() {
      setHasScrolledPastHero(window.scrollY > threshold);
    }

    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        threshold = window.innerHeight * 0.85;
        handleScroll();
      }, 200);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
    // `pathname` è in dipendenza anche se non lo legge nel corpo: senza,
    // navigare via <Link> tra due route che montano entrambe una Hero
    // (`hasHero` non cambia) non ricalcolava lo stato, e l'header restava
    // visibile in cima alla pagina appena aperta, invece di nascondersi di
    // nuovo.
  }, [hasHero, pathname]);

  const isVisible = hasHero ? hasScrolledPastHero : true;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-stone-light bg-cream/95 backdrop-blur-sm transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between gap-1 px-4 py-4 sm:gap-4 sm:px-10 lg:px-14">
        {/* Sotto md hamburger e switch lingua stanno a sinistra, come nella
            Hero: stesso lato da cui entra il drawer condiviso (`MobileMenu`).
            Da md in su sono nascosti e il logo torna a essere il primo
            elemento della riga. */}
        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <button
            type="button"
            aria-label={content.ui.openMenu}
            className="cursor-pointer text-ink transition-colors duration-300 hover:text-terracotta"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="h-6 w-6" strokeWidth={1.5} />
          </button>
          <LanguageSwitcher locale={locale} />
        </div>

        {/* `whitespace-nowrap` impedisce all'a-capo di spezzare il wordmark
            su due righe quando lo spazio si stringe (successo sui telefoni
            più stretti, es. iPhone 17 Pro a 402px, con lo switch lingua ad
            aggiungersi all'hamburger nel gruppo a sinistra): meglio un corpo
            più piccolo che una riga in più, che romperebbe l'allineamento
            verticale con hamburger e CTA. */}
        <Link
          href={localizeHref("/", locale)}
          className="whitespace-nowrap font-brand text-base tracking-[0.08em] text-ink uppercase sm:text-lg sm:tracking-[0.1em]"
        >
          {content.name}
        </Link>

        <div className="flex items-center gap-6 lg:gap-8">
          <ul className="hidden items-center gap-8 md:flex">
            {content.navLinks.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  label={link.label}
                  locale={locale}
                  className="text-sm tracking-wide text-ink-soft transition-colors duration-300 hover:text-ink"
                />
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <LanguageSwitcher locale={locale} />
          </div>

          <a
            href={whatsappHref(content.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block whitespace-nowrap border border-terracotta bg-terracotta px-2 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.06em] text-cream transition-colors duration-300 hover:border-terracotta-dark hover:bg-terracotta-dark sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.08em]"
          >
            {content.bookCtaLabel}
          </a>
        </div>
      </div>

      <MobileMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} locale={locale} />
    </header>
  );
}
