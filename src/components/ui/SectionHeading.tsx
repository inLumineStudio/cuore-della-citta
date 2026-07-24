type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  const titleColor = tone === "light" ? "text-cream" : "text-ink";
  const descriptionColor = tone === "light" ? "text-cream/80" : "text-ink-soft";
  const eyebrowColor = tone === "light" ? "text-amber-soft" : "text-terracotta";

  return (
    <div className={`flex flex-col gap-4 ${alignment}`}>
      {eyebrow && (
        <span className={`text-xs font-semibold tracking-[0.25em] uppercase ${eyebrowColor}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`font-display text-4xl sm:text-5xl leading-[1.1] ${titleColor}`}>
        {title}
      </h2>
      {description && (
        <p className={`max-w-2xl text-base sm:text-lg leading-relaxed ${descriptionColor}`}>
          {description}
        </p>
      )}
    </div>
  );
}
