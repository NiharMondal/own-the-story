import { RevealSection } from "@/components/home-v3/reveal";
import { Media } from "@/components/site/media";
import { support } from "@/content/home";
import { photos } from "@/content/photos";
import { SlabLink } from "./slab-link";

/** v4 support: "the closing shot". A violet slab, a full house, one ask. */
export function SupportV4() {
  return (
    <RevealSection id="donate" aria-labelledby="donate-heading-v4" className="scroll-mt-20 bg-brand text-primary-foreground">
      <div className="grid lg:grid-cols-[1.25fr_1fr]">
        <div className="px-6 py-20 md:px-10 md:py-28 lg:pl-[max(2.5rem,calc((100vw-82rem)/2+2.5rem))]">
          <h2
            data-reveal
            id="donate-heading-v4"
            className="font-display text-[clamp(4rem,10vw,10rem)] leading-[0.82] font-normal uppercase"
          >
            {support.title[0]} <span className="text-highlight">{support.title[1]}</span>
          </h2>
          <p data-reveal className="mt-8 max-w-xl text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
            {support.body}
          </p>
          <div data-reveal className="mt-9">
            <SlabLink href={support.cta.href} className="bg-highlight text-foreground hover:bg-white">
              {support.cta.label}
            </SlabLink>
          </div>
          <p data-reveal className="mt-8 max-w-md text-sm text-primary-foreground/75">
            {support.note}
          </p>
        </div>
        <Media
          src={photos.cinemaAudience}
          alt="An audience watching a film in a cinema"
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="min-h-72 lg:min-h-full"
        />
      </div>
    </RevealSection>
  );
}
