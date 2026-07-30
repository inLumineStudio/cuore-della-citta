"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ItalyFlagIcon, UnitedKingdomFlagIcon } from "@/components/ui/icons";
import { alternateLocalePath, type Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  locale: Locale;
  className?: string;
};

// Un solo link, verso l'altra lingua: non due bandiere (una delle quali
// sarebbe sempre "quella attiva", ridondante e cliccabile a vuoto), sul
// modello di un vero switch. La bandiera mostrata è quella della lingua
// in cui si passerebbe cliccando, non quella corrente - stessa convenzione
// dei selettori di lingua più comuni.
export function LanguageSwitcher({ locale, className = "" }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const targetLocale: Locale = locale === "it" ? "en" : "it";

  return (
    <Link
      href={alternateLocalePath(pathname, locale)}
      aria-label={targetLocale === "en" ? "Switch to English" : "Passa all'italiano"}
      className={`block h-5 w-5 overflow-hidden rounded-full ring-1 ring-inset ring-black/10 ${className}`}
    >
      {targetLocale === "en" ? (
        <UnitedKingdomFlagIcon className="h-full w-full" />
      ) : (
        <ItalyFlagIcon className="h-full w-full" />
      )}
    </Link>
  );
}
