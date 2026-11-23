import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Newsletter } from "@/components/home/newsletter";
import { AudiencesV5 } from "@/components/home-v5/audiences";
import { DonateV5 } from "@/components/home-v5/donate";
import { FilmV5 } from "@/components/home-v5/film";
import { HeroV5 } from "@/components/home-v5/hero";
import { LabsV5 } from "@/components/home-v5/labs";
import { MissionV5 } from "@/components/home-v5/mission";
import { SeriesV5 } from "@/components/home-v5/series";
import { CityClassroom } from "@/components/sections/city-classroom";
import { StartHere } from "@/components/sections/start-here";
import { StudentFilms } from "@/components/sections/student-films";
import { WhyItMatters } from "@/components/sections/why-it-matters";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Own the Story (v5)",
};

/**
 * v5 "pop": the homepage as a scrapbook made by the young people it serves.
 * Cream paper, ink outlines, hard drop shadows and photos cut into arches,
 * circles and blobs. Audiences come first, then the labs in a zig-zag.
 */
export default function HomeV5() {
  return (
    <div
      className={`${display.variable} theme-pop flex flex-1 flex-col overflow-x-clip bg-background text-foreground`}
    >
      <SiteHeader />
      <main id="top" className="flex-1">
        <HeroV5 />
        <AudiencesV5 />
        <FilmV5 />
        <StudentFilms headingClass="font-display font-extrabold tracking-[-0.035em]" />
        <LabsV5 />
        <CityClassroom headingClass="font-display font-extrabold tracking-[-0.035em]" />
        <SeriesV5 />
        <MissionV5 />
        <WhyItMatters headingClass="font-display font-extrabold tracking-[-0.035em]" />
        <StartHere headingClass="font-display font-extrabold tracking-[-0.035em]" />
        <DonateV5 />
        <Newsletter motion="slide" />
      </main>
      <SiteFooter />
    </div>
  );
}
