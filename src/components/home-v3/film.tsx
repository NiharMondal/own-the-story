import { Play } from "lucide-react";
import { Media } from "@/components/site/media";
import { film } from "@/content/home";
import { RevealSection } from "./reveal";

/** v3 featured film: a big, obvious play button and the credits underneath. */
export function FilmV3() {
  return (
    <RevealSection id="film" aria-labelledby="film-heading-v3" className="scroll-mt-20 bg-card py-20 md:py-28">
      <div className="container-site">
        <div className="max-w-2xl">
          <p data-reveal className="eyebrow">
            {film.eyebrow}
          </p>
          <h2
            data-reveal
            id="film-heading-v3"
            className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] font-bold tracking-[-0.02em]"
          >
            {film.heading[0]} <span className="text-brand">{film.heading[1]}</span>
          </h2>
        </div>

        <div data-reveal className="mt-10">
          <Media tone={film.tone} label={film.playerNote} className="aspect-video rounded-2xl">
            <button
              type="button"
              aria-label={`Play ${film.title}`}
              className="group absolute inset-0 z-1 grid place-items-center"
            >
              <span className="grid size-20 place-items-center rounded-full bg-highlight text-foreground shadow-xl transition-transform duration-300 group-hover:scale-110 md:size-24">
                <Play className="size-8 fill-current" />
              </span>
            </button>
            <span className="absolute right-4 bottom-4 rounded-md bg-black/60 px-2 py-1 text-sm text-white tabular-nums">
              {film.duration}
            </span>
          </Media>
          <div className="mt-5 flex flex-col gap-1 md:flex-row md:items-baseline md:gap-4">
            <h3 className="text-xl font-bold">{film.title}</h3>
            <p className="text-muted-foreground">{film.meta}</p>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
