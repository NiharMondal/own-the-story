import { FeaturedFilm } from "@/components/home/featured-film";
import { Hero } from "@/components/home/hero";
import { Impact } from "@/components/home/impact";
import { Mission } from "@/components/home/mission";
import { Newsletter } from "@/components/home/newsletter";
import { Programs } from "@/components/home/programs";
import { Series } from "@/components/home/series";
import { Support } from "@/components/home/support";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="flex-1">
        <Hero />
        <Mission />
        <Programs />
        <FeaturedFilm />
        <Impact />
        <Series />
        <Support />
        <Newsletter />
      </main>
      <SiteFooter />
    </>
  );
}
