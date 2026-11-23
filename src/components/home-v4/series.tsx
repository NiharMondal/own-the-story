import { RevealSection } from "@/components/home-v3/reveal";
import { Media } from "@/components/site/media";
import { series } from "@/content/home";
import { photos } from "@/content/photos";
import { SlabLink } from "./slab-link";

const PHOTOS = [photos.silhouetteCamera, photos.clapperOnSet, photos.phoneRecording];

/** v4 series: "the programme". Listings with a still that lights up on hover. */
export function SeriesV4() {
  return (
    <RevealSection id="series" aria-labelledby="series-heading-v4" className="scroll-mt-20 bg-card py-24 md:py-32">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p data-reveal className="eyebrow">
              {series.eyebrow}
            </p>
            <h2
              data-reveal
              id="series-heading-v4"
              className="font-display mt-4 text-[clamp(2.75rem,6vw,5rem)] leading-[0.92] font-normal uppercase"
            >
              {series.heading}
            </h2>
          </div>
          <div data-reveal>
            <SlabLink variant="line" href={series.viewAll.href}>
              {series.viewAll.label}
            </SlabLink>
          </div>
        </div>

        <ol className="mt-12 border-t border-border">
          {series.parts.map((part, i) => (
            <li key={part.title} data-reveal className="border-b border-border">
              <article className="group relative grid items-center gap-5 py-7 md:grid-cols-[5rem_1fr_15rem] md:gap-8">
                <span className="font-display text-5xl leading-none text-muted-foreground transition-colors duration-300 group-hover:text-brand">
                  0{i + 1}
                </span>
                <div>
                  <p className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                    {part.meta}
                    {part.comingSoon && (
                      <span className="bg-highlight px-2 py-0.5 text-foreground">Coming soon</span>
                    )}
                  </p>
                  <h3 className="font-display mt-2 text-3xl leading-none font-normal uppercase transition-colors duration-300 group-hover:text-brand md:text-5xl">
                    {part.comingSoon ? (
                      part.title
                    ) : (
                      <a href="#series" className="after:absolute after:inset-0">
                        {part.title}
                      </a>
                    )}
                  </h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">{part.body}</p>
                </div>
                <Media
                  src={PHOTOS[i]}
                  hoverZoom
                  sizes="(min-width: 768px) 15rem, 100vw"
                  className="aspect-video grayscale transition-[filter] duration-700 group-hover:grayscale-0"
                />
              </article>
            </li>
          ))}
        </ol>
      </div>
    </RevealSection>
  );
}
