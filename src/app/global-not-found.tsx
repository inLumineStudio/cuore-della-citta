// Cattura gli URL che non corrispondono a **nessuna** route, in nessuno dei
// due alberi (it)/en - vedi il commento in next.config.ts sul perché serve
// questo file invece dei soli `not-found.tsx` per albero. Bypassa entrambi i
// root layout: niente StickyHeader/Footer, deve importare da sé fogli di
// stile e font. Qui volutamente **non** carica i font custom (next/font)
// per restare leggero su una pagina che nella pratica quasi nessuno vede
// davvero - solo i colori del brand via `globals.css`, testo in font di
// sistema. Bilingue (non sa quale lingua intendesse chi ha sbagliato URL,
// niente `middleware.ts` in questo progetto per leggere il pathname): IT in
// evidenza come lingua di default (stessa convenzione di `x-default` in
// `sitemap.ts`), EN come riga secondaria.
import Link from "next/link";
import "./globals.css";
import { getContent } from "@/lib/content";

export const metadata = {
  title: "Pagina non trovata | Not found",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  const it = getContent("it");
  const en = getContent("en");

  return (
    <html lang="it">
      <body className="flex min-h-dvh items-center justify-center bg-cream px-6 py-24 font-sans text-ink antialiased">
        <div className="flex max-w-md flex-col items-center gap-6 text-center">
          <span className="text-6xl text-terracotta">404</span>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">{it.ui.notFoundTitle}</h1>
            <p className="text-base leading-relaxed text-ink-soft">{it.ui.notFoundMessage}</p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-terracotta px-6 py-3 text-sm font-semibold tracking-wide text-cream uppercase transition-colors hover:bg-terracotta-dark"
          >
            {it.ui.notFoundCta}
          </Link>
          <div className="mt-4 flex flex-col gap-2 border-t border-stone-light pt-4 text-sm text-ink-soft">
            <p>{en.ui.notFoundMessage}</p>
            <Link href="/en" className="font-semibold text-terracotta underline underline-offset-2">
              {en.ui.notFoundCta}
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
