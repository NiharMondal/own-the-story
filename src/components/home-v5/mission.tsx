import { RevealSection } from "@/components/home-v3/reveal";
import { Media } from "@/components/site/media";
import { mission } from "@/content/home";
import { aboutV3 } from "@/content/home-v3";
import { photos } from "@/content/photos";
import { PopLink } from "./pop-link";

/** v5 mission: the statement as a pull quote, with the founder on a polaroid. */
export function MissionV5() {
  const { founder } = aboutV3;

  return (
    <RevealSection id="about" aria-labelledby="about-heading-v5" className="scroll-mt-20 py-24 md:py-36">
      <div className="container-site grid items-center gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
        <div>
          <span aria-hidden className="font-display block h-16 text-[9rem] leading-none font-extrabold text-brand">
            “
          </span>
          <p data-reveal className="eyebrow mt-6">
            {mission.eyebrow}
          </p>
          <h2
            data-reveal
            id="about-heading-v5"
            className="font-display mt-4 text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.02] font-extrabold tracking-[-0.035em]"
          >
            {mission.statement}
          </h2>
          <p data-reveal className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {aboutV3.body[0]}
          </p>
          <div data-reveal className="mt-9">
            <PopLink variant="sun" href="#programs">
              See how it works
            </PopLink>
          </div>
        </div>

        <figure
          data-reveal
          className="mx-auto w-full max-w-sm rotate-3 border-2 border-foreground bg-card p-4 pb-6 shadow-[10px_10px_0_var(--pop-sky)] transition-[rotate] duration-500 hover:rotate-0"
        >
          <Media
            src={photos.silhouetteCamera}
            alt="A filmmaker in silhouette behind a camera"
            sizes="24rem"
            className="aspect-square"
          />
          <figcaption className="pt-5">
            <p className="font-display text-2xl font-extrabold tracking-[-0.02em]">{founder.name}</p>
            <p className="text-sm font-bold text-brand">{founder.role}</p>
            <p className="mt-3 leading-relaxed text-muted-foreground">{founder.body}</p>
          </figcaption>
        </figure>
      </div>
    </RevealSection>
  );
}
