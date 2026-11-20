import type { Metadata } from "next";
import { Newsletter } from "@/components/home/newsletter";
import { FeaturedFilmV2 } from "@/components/home-v2/featured-film";
import { HeroV2 } from "@/components/home-v2/hero";
import { ImpactV2 } from "@/components/home-v2/impact";
import { MissionV2 } from "@/components/home-v2/mission";
import { ProgramsV2 } from "@/components/home-v2/programs";
import { SeriesV2 } from "@/components/home-v2/series";
import { SupportV2 } from "@/components/home-v2/support";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export const metadata: Metadata = {
  title: "Own the Story (v2)",
};

/** Same content as "/", told with a different, more cinematic set of scroll animations. */
export default function HomeV2() {
  return (
    <>
      <SiteHeader intro="drop" />
      <main id="top" className="flex-1">
        <HeroV2 />
        <MissionV2 />
        <ProgramsV2 />
        <FeaturedFilmV2 />
        <ImpactV2 />
        <SeriesV2 />
        <SupportV2 />
        <Newsletter motion="slide" />
      </main>
      <SiteFooter motion="blur" />
    </>
  );
}
