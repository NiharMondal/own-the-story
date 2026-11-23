import type { Metadata } from "next";
import { Newsletter } from "@/components/home/newsletter";
import { AboutV3 } from "@/components/home-v3/about";
import { AudiencesV3 } from "@/components/home-v3/audiences";
import { DonateV3 } from "@/components/home-v3/donate";
import { FilmV3 } from "@/components/home-v3/film";
import { HeroV3 } from "@/components/home-v3/hero";
import { PartnershipV3 } from "@/components/home-v3/partnership";
import { ProgramsV3 } from "@/components/home-v3/programs";
import { StoriesV3 } from "@/components/home-v3/stories";
import { CityClassroom } from "@/components/sections/city-classroom";
import { StartHere } from "@/components/sections/start-here";
import { StudentFilms } from "@/components/sections/student-films";
import { WhyItMatters } from "@/components/sections/why-it-matters";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export const metadata: Metadata = {
  title: "Own the Story (v3)",
};

/**
 * v3 is built for ease of use rather than spectacle: a bright, high-contrast
 * "clear" theme, one consistent heading style, a path for each audience near
 * the top, and quiet fade-in motion. Content adds the live site's three labs,
 * founder and partnership tiers to the shared homepage copy.
 */
export default function HomeV3() {
  return (
    <div className="theme-clear flex flex-1 flex-col bg-background text-foreground">
      <SiteHeader cta={{ label: "Partner With Us", href: "#partner" }} />
      <main id="top" className="flex-1">
        <HeroV3 />
        <AudiencesV3 />
        <WhyItMatters />
        <AboutV3 />
        <ProgramsV3 />
        <FilmV3 />
        <StudentFilms />
        <PartnershipV3 />
        <CityClassroom />
        <StoriesV3 />
        <StartHere />
        <DonateV3 />
        <Newsletter />
      </main>
      <SiteFooter />
    </div>
  );
}
