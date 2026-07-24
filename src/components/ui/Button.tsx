import type { ReactNode } from "react";

type ButtonVariant = "solid" | "outline-light" | "outline-dark";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: ReactNode;
  target?: string;
  rel?: string;
  className?: string;
  disabled?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  solid:
    "bg-terracotta text-cream hover:bg-terracotta-dark",
  "outline-light":
    "border border-cream/70 text-cream hover:bg-cream/10",
  "outline-dark":
    "border border-ink/30 text-ink hover:bg-ink/5",
};

export function Button({
  href,
  children,
  variant = "solid",
  icon,
  target,
  rel,
  className = "",
  disabled = false,
}: ButtonProps) {
  const sharedClassName = `inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${variantClasses[variant]} ${className}`;

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={`${sharedClassName} cursor-not-allowed opacity-40 hover:bg-none`}
      >
        {icon}
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={sharedClassName}
    >
      {icon}
      {children}
    </a>
  );
}
