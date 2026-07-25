import Link from "next/link";
import { showFullNav } from "@/lib/content";

type NavLinkProps = {
  href: string;
  label: string;
  className?: string;
  // Lato da cui il filetto si espande: va fatto combaciare con l'allineamento
  // della lista che lo contiene, altrimenti la lineetta a riposo sembra
  // fluttuare fuori asse.
  align?: "start" | "end";
  // Sulla foto della Hero il filetto terracotta sparisce: là serve la coppia
  // avorio/sabbia.
  lineClassName?: string;
};

// Il filetto è sempre a larghezza piena e viene compresso con `scale-x`: così
// l'espansione è una trasformazione (nessun ricalcolo di layout per frame) e
// l'ancoraggio è esplicito nel `transform-origin`. In Tailwind v4 `scale-x-*`
// scrive la proprietà `scale`, non `transform`: la transizione deve elencare
// `scale`, altrimenti l'animazione non parte. L'offset verticale è in `em`
// perché la stessa primitiva serve la nav grande della Hero e quella compatta
// dello StickyHeader.
export function NavLink({
  href,
  label,
  className = "",
  align = "start",
  lineClassName = "bg-terracotta-dark group-hover:bg-terracotta",
}: NavLinkProps) {
  const wrapper = `group relative inline-block ${className}`;
  const origin = align === "end" ? "origin-right" : "origin-left";

  const content = (
    <>
      {label}
      <span
        aria-hidden
        className={`absolute bottom-[-0.28em] left-0 h-px w-full scale-x-[0.34] transition-[scale,background-color] duration-300 group-hover:scale-x-100 ${origin} ${lineClassName}`}
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
