import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Necessario per `global-not-found.tsx`: con due root layout separati
  // ((it) e en, vedi CLAUDE.md § Multilingua) non esiste un unico layout da
  // cui comporre un 404 per URL del tutto sconosciuti a Next - senza questo
  // flag, un `not-found.tsx` per albero cattura solo i `notFound()` lanciati
  // dentro route già risolte in quell'albero, non un URL a caso digitato
  // male (verificato: senza `global-not-found.tsx` quei percorsi cadevano
  // sulla pagina 404 generica di Next, non su quella del sito).
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
