import { RevealSection } from "@/components/home-v3/reveal";
import { Media } from "@/components/site/media";
import { series } from "@/content/home";
import { photos } from "@/content/photos";
import { DuskLink } from "./dusk-link";

const PHOTOS = [photos.kidWithCamera, photos.crewTeal, photos.phoneRecording];

/**
 * v6 series: "side by side". The heading stays pinned on the left while the
 * three stories scroll past on the right. Stories come before programs here.
 */
export function SeriesV6() {
  return (
    <RevealSection id="series" aria-labelledby="series-heading-v6" className="scroll-mt-20 py-24 md:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-24">
        <div className="self-start lg:sticky lg:top-28">
          <p data-reveal className="eyebrow">
            {series.eyebrow}
          </p>
          <h2
            data-reveal
            id="series-heading-v6"
            className="font-display mt-5 text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] font-normal tracking-[-0.03em]"
          >
            {series.heading}
          </h2>
          <div data-reveal className="mt-9">
            <DuskLink variant="ghost" href={series.viewAll.href}>
              {series.viewAll.label}
            </DuskLink>
          </div>
        </div>

        <ol className="space-y-10">
          {series.parts.map((part, i) => (
            <li key={part.title} data-reveal>
              <article className="group relative rounded-[2.5rem] border border-border bg-card p-3 transition-colors duration-500 hover:border-brand/50">
                <Media
                  src={PHOTOS[i]}
                  hoverZoom={!part.comingSoon}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="aspect-[16/10] rounded-[2rem]"
                >
                  {part.comingSoon && (
                    <div className="absolute inset-0 grid place-items-center bg-background/70 backdrop-blur-[2px]">
                      <span className="rounded-full border border-brand px-5 py-2 text-sm font-semibold text-brand">Coming soon</span>
                    </div>
                  )}
                </Media>
                <div className="flex gap-6 p-5 md:p-7">
                  <span className="font-display text-5xl leading-none text-brand italic">{i + 1}</span>
                  <div>
                    <p className="text-sm text-muted-foreground">{part.meta}</p>
                    <h3 className="font-display mt-1 text-3xl leading-tight font-normal tracking-[-0.02em]">
                      {part.comingSoon ? (
                        part.title
                      ) : (
                        <a href="#series" className="after:absolute after:inset-0">
                          {part.title}
                        </a>
                      )}
                    </h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{part.body}</p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </RevealSection>
  );
}
