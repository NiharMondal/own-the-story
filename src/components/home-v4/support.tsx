import { RevealSection } from "@/components/home-v3/reveal";
import { Media } from "@/components/site/media";
import { support } from "@/content/home";
import { photos } from "@/content/photos";
import { NightLink } from "./night-link";

/** v4 support: "the closing shot". A full house, and one line asking for help. */
export function SupportV4() {
  return (
    <RevealSection
      id="donate"
      aria-labelledby="donate-heading-v4"
      className="relative isolate flex min-h-[44rem] scroll-mt-20 items-center overflow-hidden py-28 text-center"
    >
      <Media src={photos.cinemaAudience} alt="" className="absolute inset-0 -z-10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(10_10_15/0.72),rgb(10_10_15/0.9))]" />

      <div className="container-site">
        <h2
          data-reveal
          id="donate-heading-v4"
          className="font-display text-[clamp(4rem,13vw,12rem)] leading-[0.82] font-normal uppercase"
        >
          {support.title[0]} <span className="text-brand">{support.title[1]}</span>
        </h2>
        <p data-reveal className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-foreground/85 md:text-xl">
          {support.body}
        </p>
        <div data-reveal className="mt-9 flex justify-center">
          <NightLink href={support.cta.href}>{support.cta.label}</NightLink>
        </div>
        <p data-reveal className="mx-auto mt-8 max-w-md text-sm text-muted-foreground">
          {support.note}
        </p>
      </div>
    </RevealSection>
  );
}
