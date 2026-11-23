import { RevealSection } from "@/components/home-v3/reveal";
import { Media } from "@/components/site/media";
import { support } from "@/content/home";
import { links } from "@/content/home-v3";
import { photos } from "@/content/photos";
import { DuskLink } from "./dusk-link";

/** v6 support: a panel of sunset light with one more arched window in it. */
export function SupportV6() {
  return (
    <RevealSection id="donate" aria-labelledby="donate-heading-v6" className="scroll-mt-20 px-3 py-24 md:px-6 md:py-32">
      <div className="container-site grid items-end gap-12 overflow-hidden rounded-[2.5rem] bg-linear-to-br from-brand via-highlight to-[#8a4dff] pt-14 text-primary-foreground md:rounded-[4rem] md:pt-20 lg:grid-cols-[1.3fr_1fr]">
        <div className="pb-4 lg:pb-20">
          <h2
            data-reveal
            id="donate-heading-v6"
            className="font-display text-[clamp(3rem,7.5vw,6.5rem)] leading-[0.92] font-normal tracking-[-0.04em]"
          >
            {support.title[0]} <em>{support.title[1]}.</em>
          </h2>
          <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed font-medium md:text-xl">
            {support.body}
          </p>
          <div data-reveal className="mt-9">
            <DuskLink variant="ink" href={links.donate}>
              {support.cta.label}
            </DuskLink>
          </div>
          <p data-reveal className="mt-8 max-w-md text-sm font-medium opacity-80">
            {support.note}
          </p>
        </div>

        <div data-reveal className="mx-auto w-full max-w-xs lg:max-w-sm">
          <Media
            src={photos.friendsRoad}
            alt="Four friends walking down a road with their arms around each other"
            sizes="24rem"
            className="aspect-[4/5] rounded-t-full"
          />
        </div>
      </div>
    </RevealSection>
  );
}
