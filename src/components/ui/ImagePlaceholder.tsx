import { ImageOff } from "lucide-react";

type ImagePlaceholderProps = {
  label?: string;
  className?: string;
};

export function ImagePlaceholder({ label = "Foto in arrivo", className = "" }: ImagePlaceholderProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-amber-soft/40 via-cream-soft to-stone-light/60 text-stone ${className}`}
    >
      <ImageOff className="h-6 w-6" strokeWidth={1.5} />
      <span className="text-xs tracking-wide uppercase">{label}</span>
    </div>
  );
}
