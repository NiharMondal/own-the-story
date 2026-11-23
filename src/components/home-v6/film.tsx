import { Play } from "lucide-react";
import { RevealSection } from "@/components/home-v3/reveal";
import { Media } from "@/components/site/media";
import { film } from "@/content/home";
import { photos } from "@/content/photos";

/** v6 film: a wide rounded screen, lit from behind. */
export function FilmV6() {
  return (
    <RevealSection id="film" aria-labelledby="film-heading-v6" className="scroll-mt-20 pb-24 md:pb-36">
      <div className="container-site">
        <div className="text-center">
          <p data-reveal className="eyebrow">
            {film.eyebrow}
          </p>
          <h2
            data-reveal
            id="film-heading-v6"
            className="font-display mx-auto mt-5 max-w-4xl text-[clamp(2.5rem,5.5vw,5rem)] leading-[1] font-normal tracking-[-0.03em]"
          >
            {film.heading[0]} <em className="text-brand">{film.heading[1]}</em>
          </h2>
        </div>

        <div data-reveal className="group relative mt-14">
          <div aria-hidden className="absolute inset-x-[8%] -inset-y-4 rounded-full bg-linear-to-r from-brand/50 to-highlight/50 blur-[90px]" />
          <Media
            src={photos.soundstage}
            alt="A film crew on a large soundstage"
            hoverZoom
            className="aspect-video rounded-[2rem] md:rounded-[3rem]"
          >
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgb(23_13_34/0.75),transparent_45%)]" />
          </Media>
          <button
            type="button"
            aria-label="Play film (player not connected yet)"
            className="absolute top-1/2 left-1/2 grid size-20 -translate-1/2 place-items-center rounded-full bg-linear-to-br from-brand to-highlight text-primary-foreground shadow-[0_0_60px_-5px_var(--highlight)] transition-transform duration-500 hover:scale-110 md:size-28"
          >
            <Play className="size-8 fill-current" />
          </button>
          <div className="absolute inset-x-6 bottom-5 flex items-end justify-between gap-4 md:inset-x-10 md:bottom-8">
            <div>
              <p className="font-display text-xl text-white md:text-3xl">{film.title}</p>
              <p className="mt-1 hidden text-sm text-white/75 md:block">{film.meta}</p>
            </div>
            <span className="rounded-full bg-background/70 px-3 py-1 text-sm tabular-nums backdrop-blur-sm">{film.duration}</span>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
