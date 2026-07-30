type IconProps = { className?: string };

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsappIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.2 8.2 0 012.42 5.82c0 4.54-3.7 8.24-8.25 8.24-1.5 0-2.97-.4-4.26-1.17l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.36c.01-4.54 3.7-8.24 8.25-8.24zm4.52 10.36c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
    </svg>
  );
}

// Bandiere di pubblico dominio (design geometrico nazionale, non soggetto a
// copyright) da Wikimedia Commons - "Flag of Italy.svg" e "Flag of the
// United Kingdom.svg" - stesso criterio di sourcing di `AbruzzoMap.tsx`.
// L'Union Jack rappresenta l'inglese come lingua (convenzione diffusa sugli
// switch di lingua), non una scelta di variante regionale.
export function ItalyFlagIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      <rect width="3" height="2" fill="#009246" />
      <rect width="2" height="2" x="1" fill="#fff" />
      <rect width="1" height="2" x="2" fill="#ce2b37" />
    </svg>
  );
}

export function UnitedKingdomFlagIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 50 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      <clipPath id="uk-flag-clip">
        <path d="M25,15h25v15zv15h-25zh-25v-15zv-15h25z" />
      </clipPath>
      <path d="M0,0v30h50v-30z" fill="#012169" />
      <path d="M0,0 50,30M50,0 0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 50,30M50,0 0,30" clipPath="url(#uk-flag-clip)" stroke="#C8102E" strokeWidth="4" />
      <path d="M-1 11h22v-12h8v12h22v8h-22v12h-8v-12h-22z" fill="#C8102E" stroke="#FFF" strokeWidth="2" />
    </svg>
  );
}
