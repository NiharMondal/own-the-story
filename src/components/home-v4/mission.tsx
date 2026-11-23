import { RevealSection } from "@/components/home-v3/reveal";
import { Media } from "@/components/site/media";
import { SpinBadge } from "@/components/site/spin-badge";
import { mission } from "@/content/home";
import { photos } from "@/content/photos";
import { NightLink } from "./night-link";

/** v4 mission: "the lens". A round portrait, looking straight back at you. */
export function MissionV4() {
  return (
    <RevealSection id="about" aria-labelledby="about-heading-v4" className="scroll-mt-20 py-24 md:py-40">
      <div className="container-site grid items-center gap-14 lg:grid-cols-[auto_1fr] lg:gap-24">
        <div data-reveal className="relative mx-auto w-[min(78vw,26rem)]">
          <div className="rounded-full p-2 ring-1 ring-brand/60">
            <Media
              src={photos.kidWithCamera}
              alt="A young person pointing a camera at the viewer"
              sizes="26rem"
              className="aspect-square rounded-full"
            />
          </div>
          <SpinBadge
            text="Camera · Craft · Stage"
            className="absolute -right-4 -bottom-4 size-32 bg-highlight text-primary-foreground md:size-36"
          />
        </div>

        <div>
          <p data-reveal className="eyebrow">
            {mission.eyebrow}
          </p>
          <h2
            data-reveal
            id="about-heading-v4"
            className="font-display mt-5 text-[clamp(2.5rem,5.2vw,4.75rem)] leading-[0.95] font-normal uppercase"
          >
            {mission.statement}
          </h2>
          <p data-reveal className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {mission.body}
          </p>
          <div data-reveal className="mt-9">
            <NightLink variant="line" href={mission.link.href}>
              {mission.link.label}
            </NightLink>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
