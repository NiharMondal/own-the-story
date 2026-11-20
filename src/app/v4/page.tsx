import type { Metadata } from "next";
import { Newsletter } from "@/components/home/newsletter";
import { AboutV4 } from "@/components/home-v4/about";
import { AudiencesV4 } from "@/components/home-v4/audiences";
import { DonateV4 } from "@/components/home-v4/donate";
import { FilmV4 } from "@/components/home-v4/film";
import { HeroV4 } from "@/components/home-v4/hero";
import { PartnershipV4 } from "@/components/home-v4/partnership";
import { ProgramsV4 } from "@/components/home-v4/programs";
import { StoriesV4 } from "@/components/home-v4/stories";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export const metadata: Metadata = {
  title: "Own the Story (v4)",
};

/**
 * v4 is built for ease of use rather than spectacle: a bright, high-contrast
 * "clear" theme, one consistent heading style, a path for each audience near
 * the top, and quiet fade-in motion. Content adds the live site's three labs,
 * founder and partnership tiers to the shared homepage copy.
 */
export default function HomeV4() {
  return (
    <div className="theme-clear flex flex-1 flex-col bg-background text-foreground">
      <SiteHeader cta={{ label: "Partner With Us", href: "#partner" }} />
      <main id="top" className="flex-1">
        <HeroV4 />
        <AudiencesV4 />
        <AboutV4 />
        <ProgramsV4 />
        <FilmV4 />
        <PartnershipV4 />
        <StoriesV4 />
        <DonateV4 />
        <Newsletter />
      </main>
      <SiteFooter />
    </div>
  );
}
