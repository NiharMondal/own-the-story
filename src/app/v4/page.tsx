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
import { CityClassroom } from "@/components/sections/city-classroom";
import { ClosingStatement } from "@/components/sections/closing-statement";
import { WhyItMatters } from "@/components/sections/why-it-matters";
import { StudentFilms } from "@/components/sections/student-films";
import { Marquee } from "@/components/site/marquee";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { programs } from "@/content/home";

const display = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Own the Story (v4)",
};

/**
 * v4 "matinee": the homepage as a daytime screening. Newsprint white, ink
 * black, violet and acid lime, poster capitals. The order follows an evening at the cinema: titles, the feature,
 * the numbers, then the programs as a reel that scrolls sideways.
 */
export default function HomeV4() {
  return (
    <div
      className={`${display.variable} theme-matinee flex flex-1 flex-col overflow-x-clip bg-background text-foreground`}
    >
      <SiteHeader intro="drop" />
      <main id="top" className="flex-1">
        <HeroV4 />
        <Marquee
          items={programs.items.map((item) => item.title)}
          className="font-display relative z-10 -mx-4 -rotate-1 bg-highlight py-3 text-3xl text-foreground uppercase md:text-5xl"
        />
        <WhyItMatters headingClass="font-display font-normal uppercase" />
        <FilmV4 />
        <StudentFilms headingClass="font-display font-normal uppercase" />
        <ImpactV4 />
        <ProgramsV4 />
        <MissionV4 />
        <CityClassroom headingClass="font-display font-normal uppercase" />
        <SeriesV4 />
        <SupportV4 />
        <ClosingStatement headingClass="font-display font-normal uppercase" />
        <Newsletter />
      </main>
      <SiteFooter motion="blur" />
    </div>
  );
}
