import { Heart } from "lucide-react";
import { RevealSection } from "@/components/home-v3/reveal";
import { Media } from "@/components/site/media";
import { support } from "@/content/home";
import { closing, links } from "@/content/home-v3";
import { photos } from "@/content/photos";
import { PopLink } from "./pop-link";

/** v5 donate: one loud pink panel, with the people it is for in a porthole. */
export function DonateV5() {
  return (
    <RevealSection id="donate" aria-labelledby="donate-heading-v5" className="scroll-mt-20 px-3 py-24 md:px-6 md:py-32">
      <div className="container-site grid items-center gap-14 rounded-[2.5rem] border-2 border-foreground bg-brand py-14 text-primary-foreground shadow-[10px_10px_0_var(--foreground)] md:rounded-[4rem] md:py-20 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h2
            data-reveal
            id="donate-heading-v5"
            className="font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.92] font-extrabold tracking-[-0.04em]"
          >
            {closing.heading}
          </h2>
          <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
            {support.body}
          </p>
          <div data-reveal className="mt-9 flex flex-wrap gap-4">
            <PopLink variant="sun" href={links.donate}>
              {support.cta.label}
            </PopLink>
            <PopLink variant="paper" href="#contact">
              Partner with us
            </PopLink>
          </div>
          <p data-reveal className="mt-8 max-w-md text-sm text-primary-foreground/80">
            {support.note}
          </p>
        </div>

        <div data-reveal className="relative mx-auto w-full max-w-sm">
          <Media
            src={photos.friendsFence}
            alt="Five young people hanging out by a fence"
            sizes="24rem"
            className="aspect-square rounded-full border-2 border-foreground shadow-[10px_10px_0_var(--highlight)]"
          />
          <span className="absolute -top-2 -left-2 grid size-20 -rotate-12 place-items-center rounded-full border-2 border-foreground bg-highlight text-foreground motion-safe:animate-float">
            <Heart className="size-8 fill-current" aria-hidden />
          </span>
        </div>
      </div>
    </RevealSection>
  );
}
