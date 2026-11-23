import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import { Newsletter } from "@/components/home/newsletter";
import { FilmV4 } from "@/components/home-v4/film";
import { HeroV4 } from "@/components/home-v4/hero";
import { ImpactV4 } from "@/components/home-v4/impact";
import { MissionV4 } from "@/components/home-v4/mission";
import { ProgramsV4 } from "@/components/home-v4/programs";
import { SeriesV4 } from "@/components/home-v4/series";
import { SupportV4 } from "@/components/home-v4/support";
import { Marquee } from "@/components/site/marquee";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { programs } from "@/content/home";

const display = Bebas_Neue({ variable: "--font-display", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Own the Story (v4)",
};

/**
 * v4 "night": the homepage as a screening. Dark room, acid-lime type, poster
 * capitals. The order follows an evening at the cinema: titles, the feature,
 * the numbers, then the programs as a reel that scrolls sideways.
 */
export default function HomeV4() {
  return (
    <div className={`${display.variable} theme-night flex flex-1 flex-col overflow-x-clip bg-background text-foreground`}>
      <SiteHeader intro="drop" />
      <main id="top" className="flex-1">
        <HeroV4 />
        <Marquee
          items={programs.items.map((item) => item.title)}
          className="font-display relative z-10 -mx-4 -rotate-1 bg-brand py-3 text-3xl text-primary-foreground uppercase md:text-5xl"
        />
        <FilmV4 />
        <ImpactV4 />
        <ProgramsV4 />
        <MissionV4 />
        <SeriesV4 />
        <SupportV4 />
        <Newsletter />
      </main>
      <SiteFooter motion="blur" />
    </div>
  );
}
