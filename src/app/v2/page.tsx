import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { Newsletter } from "@/components/home/newsletter";
import { FeaturedFilmV3 } from "@/components/home-v3/featured-film";
import { HeroV3 } from "@/components/home-v3/hero";
import { ImpactV3 } from "@/components/home-v3/impact";
import { MissionV3 } from "@/components/home-v3/mission";
import { ProgramsV3 } from "@/components/home-v3/programs";
import { SeriesV3 } from "@/components/home-v3/series";
import { SupportV3 } from "@/components/home-v3/support";
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
  title: "Own the Story (v3)",
};

/**
 * Same content as "/" and "/v2", redesigned: warm paper, ink type, a vermilion
 * brand color, serif display type and pill-shaped calls to action. The
 * `theme-paper` wrapper swaps the color tokens, so the shared header,
 * newsletter and footer pick up the new palette automatically.
 */
export default function HomeV3() {
  return (
    <div className={`${serif.variable} theme-paper flex flex-1 flex-col bg-background text-foreground`}>
      <SiteHeader />
      <main id="top" className="flex-1">
        <HeroV3 />
        <MissionV3 />
        <ProgramsV3 />
        <FeaturedFilmV3 />
        <ImpactV3 />
        <SeriesV3 />
        <SupportV3 />
        <Newsletter motion="slide" />
      </main>
      <SiteFooter />
    </div>
  );
}
