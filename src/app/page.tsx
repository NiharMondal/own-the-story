import { FeaturedFilm } from "@/components/home/featured-film";
import { Hero } from "@/components/home/hero";
import { Impact } from "@/components/home/impact";
import { Mission } from "@/components/home/mission";
import { Newsletter } from "@/components/home/newsletter";
import { Programs } from "@/components/home/programs";
import { Series } from "@/components/home/series";
import { Support } from "@/components/home/support";
import { CityClassroom } from "@/components/sections/city-classroom";
import { ClosingStatement } from "@/components/sections/closing-statement";
import { StudentFilms } from "@/components/sections/student-films";
import { WhyItMatters } from "@/components/sections/why-it-matters";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="flex-1">
        <Hero />
        <Mission />
        <WhyItMatters headingClass="font-condensed font-extrabold uppercase" />
        <Programs />
        <FeaturedFilm />
        <StudentFilms headingClass="font-condensed font-extrabold uppercase" />
        <Impact />
        <CityClassroom headingClass="font-condensed font-extrabold uppercase" />
        <Series />
        <Support />
        <ClosingStatement headingClass="font-condensed font-extrabold uppercase" />
        <Newsletter />
      </main>
      <SiteFooter />
    </>
  );
}
