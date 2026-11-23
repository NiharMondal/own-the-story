import { Play } from "lucide-react";
import { RevealSection } from "@/components/home-v3/reveal";
import { Media } from "@/components/site/media";
import { SpinBadge } from "@/components/site/spin-badge";
import { film } from "@/content/home";
import { photos } from "@/content/photos";

function Sprockets() {
  return (
    <div aria-hidden className="flex h-7 items-center bg-black px-3">
      <div className="h-2.5 w-full bg-[repeating-linear-gradient(90deg,rgb(243_241_234/0.8)_0_14px,transparent_14px_32px)]" />
    </div>
  );
}

/**
 * v4 film: "the feature". The film comes straight after the hero, framed as a
 * strip of widescreen celluloid with a turning "play" ring over it.
 */
export function FilmV4() {
  return (
    <RevealSection id="film" aria-labelledby="film-heading-v4" className="scroll-mt-20 py-24 md:py-36">
      <div className="container-site">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p data-reveal className="eyebrow">
              {film.eyebrow}
            </p>
            <h2
              data-reveal
              id="film-heading-v4"
              className="font-display mt-4 text-[clamp(3rem,7.5vw,6.5rem)] leading-[0.9] font-normal uppercase"
            >
              {film.heading[0]}
              <br />
              <span className="text-brand">{film.heading[1]}</span>
            </h2>
          </div>
          <p data-reveal className="max-w-xs text-sm leading-relaxed text-muted-foreground lg:text-right">
            {film.meta}
          </p>
        </div>
      </div>

      <div data-reveal className="mt-12 md:mt-16">
        <Sprockets />
        <div className="group relative">
          <Media src={photos.nightCrew} alt="A film crew working at night" hoverZoom className="aspect-video md:aspect-[21/9]" />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgb(0_0_0/0.6),transparent_45%)]" />
          <button
            type="button"
            aria-label="Play film (player not connected yet)"
            className="absolute top-1/2 left-1/2 grid size-32 -translate-1/2 place-items-center rounded-full text-white md:size-44"
          >
            <SpinBadge text="Play the film" className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <span className="relative grid size-16 place-items-center rounded-full bg-highlight text-foreground transition-transform duration-500 group-hover:scale-110 md:size-20">
              <Play className="size-6 fill-current" />
            </span>
          </button>
          <p className="absolute bottom-4 left-6 text-sm font-semibold text-white md:bottom-6 md:left-10 md:text-base">{film.title}</p>
          <span className="absolute right-6 bottom-4 text-sm text-white tabular-nums md:right-10 md:bottom-6">{film.duration}</span>
        </div>
        <Sprockets />
      </div>
    </RevealSection>
  );
}
