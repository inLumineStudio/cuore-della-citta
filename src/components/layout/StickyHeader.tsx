"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavLink } from "@/components/ui/NavLink";
import { bookCtaLabel, navLinks, siteConfig } from "@/lib/content";
import { whatsappHref } from "@/lib/contact";

// Route che montano la propria <Hero />: lì lo StickyHeader deve restare
// nascosto finché non si scrolla oltre, esattamente come in home. Oggi sono
// tutte, ma la lista resta esplicita perché una pagina futura senza Hero
// (es. una privacy policy) deve avere l'header visibile da subito.
const routesWithHero = [
  "/",
  "/la-dimora",
  "/galleria",
  "/servizi-comfort",
  "/posizione",
  "/partner",
];

export function StickyHeader() {
  const pathname = usePathname();
  const hasHero = routesWithHero.includes(pathname);

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
    // `pathname` è in dipendenza anche se non letto nel corpo: senza,
    // navigare via <Link> tra due route con Hero (stesso `hasHero`) non
    // ricalcola lo stato, e l'header resta visibile in cima alla pagina
    // appena aperta invece di nascondersi di nuovo.
  }, [hasHero, pathname]);

  const isVisible = hasHero ? hasScrolledPastHero : true;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-stone-light bg-cream/95 backdrop-blur-sm transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-4 sm:px-10 lg:px-14">
        {/* Sotto md l'hamburger sta a sinistra, come nella Hero: stesso lato da
            cui entra il drawer condiviso (`MobileMenu`). Da md in su è
            nascosto e il logo torna a essere il primo elemento della riga. */}
        <button
          type="button"
          aria-label="Apri il menu"
          className="cursor-pointer text-ink transition-colors duration-300 hover:text-terracotta md:hidden"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="h-6 w-6" strokeWidth={1.5} />
        </button>

        <Link href="/" className="font-brand text-lg tracking-[0.1em] text-ink uppercase">
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-6 lg:gap-8">
          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  label={link.label}
                  className="text-sm tracking-wide text-ink-soft transition-colors duration-300 hover:text-ink"
                />
              </li>
            ))}
          </ul>

          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block whitespace-nowrap border border-terracotta bg-terracotta px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-cream transition-colors duration-300 hover:border-terracotta-dark hover:bg-terracotta-dark sm:px-4 sm:py-2 sm:text-xs"
          >
            {bookCtaLabel}
          </a>
        </div>
      </div>

      <MobileMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}
