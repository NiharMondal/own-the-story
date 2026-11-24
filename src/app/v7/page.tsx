import type { Metadata } from "next";
import { Syne } from "next/font/google";
import { Newsletter } from "@/components/home/newsletter";
import { FilmV7 } from "@/components/home-v7/film";
import { HeroV7 } from "@/components/home-v7/hero";
import { ImpactV7 } from "@/components/home-v7/impact";
import { MissionV7 } from "@/components/home-v7/mission";
import { PartnerV7 } from "@/components/home-v7/partner";
import { ProgramsV7 } from "@/components/home-v7/programs";
import { SeriesV7 } from "@/components/home-v7/series";
import { SupportV7 } from "@/components/home-v7/support";
import { CityClassroom } from "@/components/sections/city-classroom";
import { ClosingStatement } from "@/components/sections/closing-statement";
import { StudentFilms } from "@/components/sections/student-films";
import { WhyItMatters } from "@/components/sections/why-it-matters";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Own the Story (v7)",
};

const shared = {
  headingClass: "font-display font-bold tracking-[-0.04em]",
  motion: "shutter",
} as const;

/**
 * v7 "aperture": the homepage seen through a camera. Lens-grey and graphite
 * with a REC red. Nothing fades in: shutters sweep across, irises open,
 * letters flip like a departures board, and dials draw themselves round.
 * Shapes are hexagons (aperture blades), circles (lenses) and chamfered
 * plates (viewfinder corners) instead of rounded rectangles.
 */
export default function HomeV7() {
  return (
    <div
      className={`${display.variable} theme-aperture flex flex-1 flex-col overflow-x-clip bg-background text-foreground`}
    >
      <SiteHeader cta={{ label: "Partner With Us", href: "#partner" }} />
      <main id="top" className="flex-1">
        <HeroV7 />
        <MissionV7 />
        <ProgramsV7 />
        <WhyItMatters {...shared} />
        <FilmV7 />
        <StudentFilms {...shared} mediaClass="chamfer [--cut:1.5rem]" />
        <ImpactV7 />
        <SeriesV7 />
        <CityClassroom {...shared} mediaClass="chamfer [--cut:1.25rem]" />
        <PartnerV7 />
        <SupportV7 />
        <ClosingStatement {...shared} />
        <Newsletter motion="shutter" />
      </main>
      <SiteFooter motion="shutter" />
    </div>
  );
}
