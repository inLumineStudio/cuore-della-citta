type ImagePlaceholderProps = {
  label?: string;
  className?: string;
};

export function ImagePlaceholder({ label, className = "" }: ImagePlaceholderProps) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-soft/40 via-cream-soft to-stone-light/50 ${className}`}
    >
      <span
        aria-hidden="true"
        className="font-hero text-[7rem] leading-none text-stone/15 select-none sm:text-[9rem]"
      >
        CC
      </span>
      {label && (
        <span className="absolute bottom-4 left-4 text-[0.7rem] tracking-[0.25em] text-stone/70 uppercase">
          {label}
        </span>
      )}
    </div>
  );
}
