import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { HomeIntro } from "@/components/sections/HomeIntro";
import { LocationTeaser } from "@/components/sections/LocationTeaser";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import { faqPageJsonLd } from "@/lib/structuredData";

export default function Home() {
  const faqJsonLd = faqPageJsonLd("it");

  return (
    <>
      {/* FAQPage: solo qui, perché è l'unica pagina dove il pannello FAQ
          è davvero visibile - i dati strutturati devono rispecchiare il
          contenuto reso, non solo esistere altrove nel sito. */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <Hero locale="it" />
      <HorizontalScroller>
        <HomeIntro locale="it" />
        <LocationTeaser locale="it" />
        <Faq locale="it" />
      </HorizontalScroller>
    </>
  );
}
