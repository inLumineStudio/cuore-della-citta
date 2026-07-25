import Link from "next/link";
import { showFullNav } from "@/lib/content";

type NavLinkProps = {
  href: string;
  label: string;
  className?: string;
  // Sulla foto della Hero il filetto terracotta sparisce: là serve la coppia
  // avorio/sabbia.
  lineClassName?: string;
};

// Le misure del filetto sono in `em` così l'effetto resta proporzionato sia
// nella nav grande della Hero sia in quella compatta dello StickyHeader.
export function NavLink({
  href,
  label,
  className = "",
  lineClassName = "bg-terracotta-dark group-hover:bg-terracotta",
}: NavLinkProps) {
  const wrapper = `group relative inline-block ${className}`;

  const content = (
    <>
      {label}
      <span
        aria-hidden
        className={`absolute bottom-[-0.28em] left-1/2 h-px w-1/3 -translate-x-1/2 transition-[width,background-color] duration-300 group-hover:w-full ${lineClassName}`}
      />
    </>
  );

  if (!showFullNav) {
    return (
      <span role="link" aria-disabled="true" className={`${wrapper} cursor-pointer select-none`}>
        {content}
      </span>
    );
  }

  return (
    <Link href={href} className={wrapper}>
      {content}
    </Link>
  );
}
