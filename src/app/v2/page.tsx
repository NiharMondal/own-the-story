import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { Newsletter } from "@/components/home/newsletter";
import { FeaturedFilmV2 } from "@/components/home-v2/featured-film";
import { HeroV2 } from "@/components/home-v2/hero";
import { ImpactV2 } from "@/components/home-v2/impact";
import { MissionV2 } from "@/components/home-v2/mission";
import { ProgramsV2 } from "@/components/home-v2/programs";
import { SeriesV2 } from "@/components/home-v2/series";
import { SupportV2 } from "@/components/home-v2/support";
import { CityClassroom } from "@/components/sections/city-classroom";
import { StartHere } from "@/components/sections/start-here";
import { WhyItMatters } from "@/components/sections/why-it-matters";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

// Loaded here, not in the root layout, so only this route pays for it.
const serif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Own the Story (v2)",
};

/**
 * Same content as "/", redesigned: warm paper, ink type, a vermilion
 * brand color, serif display type and pill-shaped calls to action. The
 * `theme-paper` wrapper swaps the color tokens, so the shared header,
 * newsletter and footer pick up the new palette automatically.
 */
export default function HomeV2() {
  return (
    <div
      className={`${serif.variable} theme-paper flex flex-1 flex-col bg-background text-foreground`}
    >
      <SiteHeader />
      <main id="top" className="flex-1">
        <HeroV2 />
        <MissionV2 />
        <WhyItMatters headingClass="font-serif font-normal tracking-[-0.02em]" />
        <ProgramsV2 />
        <FeaturedFilmV2 />
        <ImpactV2 />
        <CityClassroom headingClass="font-serif font-normal tracking-[-0.02em]" />
        <SeriesV2 />
        <StartHere headingClass="font-serif font-normal tracking-[-0.02em]" />
        <SupportV2 />
        <Newsletter motion="slide" />
      </main>
      <SiteFooter />
    </div>
  );
}
