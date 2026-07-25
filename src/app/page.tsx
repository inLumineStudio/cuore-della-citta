import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { HomeIntro } from "@/components/sections/HomeIntro";
import { LocationTeaser } from "@/components/sections/LocationTeaser";
import { HorizontalScroller } from "@/components/ui/HorizontalScroller";

export default function Home() {
  return (
    <>
      <Hero />
      <HorizontalScroller>
        <HomeIntro />
        <LocationTeaser />
        <Faq />
      </HorizontalScroller>
    </>
  );
}
