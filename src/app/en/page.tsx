import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { HomeIntro } from "@/components/sections/HomeIntro";
import { LocationTeaser } from "@/components/sections/LocationTeaser";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import { faqPageJsonLd } from "@/lib/structuredData";

export default function EnglishHome() {
  const faqJsonLd = faqPageJsonLd("en");

  return (
    <>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <Hero locale="en" />
      <HorizontalScroller>
        <HomeIntro locale="en" />
        <LocationTeaser locale="en" />
        <Faq locale="en" />
      </HorizontalScroller>
    </>
  );
}
