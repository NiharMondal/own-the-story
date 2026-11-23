import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import { Newsletter } from "@/components/home/newsletter";
import { FilmV6 } from "@/components/home-v6/film";
import { HeroV6 } from "@/components/home-v6/hero";
import { ImpactV6 } from "@/components/home-v6/impact";
import { MissionV6 } from "@/components/home-v6/mission";
import { PartnerV6 } from "@/components/home-v6/partner";
import { ProgramsV6 } from "@/components/home-v6/programs";
import { SeriesV6 } from "@/components/home-v6/series";
import { SupportV6 } from "@/components/home-v6/support";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

const display = Fraunces({ variable: "--font-display", subsets: ["latin"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "Own the Story (v6)",
};

/**
 * v6 "dusk": the homepage at golden hour. Plum sky, apricot-to-rose light, a
 * soft serif, and arches everywhere a rectangle would normally go. Centred
 * layouts; stories come before programs, and partnership tiers get a section.
 */
export default function HomeV6() {
  return (
    <div className={`${display.variable} theme-dusk flex flex-1 flex-col overflow-x-clip bg-background text-foreground`}>
      <SiteHeader cta={{ label: "Partner With Us", href: "#partner" }} />
      <main id="top" className="flex-1">
        <HeroV6 />
        <MissionV6 />
        <SeriesV6 />
        <ProgramsV6 />
        <ImpactV6 />
        <FilmV6 />
        <PartnerV6 />
        <SupportV6 />
        <Newsletter />
      </main>
      <SiteFooter motion="blur" />
    </div>
  );
}
