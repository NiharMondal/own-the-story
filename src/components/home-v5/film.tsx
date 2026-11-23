import { Play } from "lucide-react";
import { RevealSection } from "@/components/home-v3/reveal";
import { Media } from "@/components/site/media";
import { film } from "@/content/home";
import { photos } from "@/content/photos";

/** v5 film: an ink-dark panel with the film taped on at an angle. */
export function FilmV5() {
  return (
    <RevealSection id="film" aria-labelledby="film-heading-v5" className="scroll-mt-20 px-3 md:px-6">
      <div className="rounded-[2.5rem] bg-foreground py-20 text-background md:rounded-[4rem] md:py-28">
        <div className="container-site grid items-center gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
          <div>
            <p data-reveal className="eyebrow text-highlight!">
              {film.eyebrow}
            </p>
            <h2
              data-reveal
              id="film-heading-v5"
              className="font-display mt-4 text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.95] font-extrabold tracking-[-0.035em]"
            >
              {film.heading[0]} <span className="text-highlight">{film.heading[1]}</span>
            </h2>
            <p data-reveal className="mt-6 text-lg font-bold">
              {film.title}
            </p>
            <p data-reveal className="mt-2 leading-relaxed text-background/70">
              {film.meta}
            </p>
          </div>

          <div data-reveal className="group relative -rotate-2 transition-[rotate] duration-500 hover:rotate-0">
            <Media
              src={photos.warehouseSet}
              alt="A film crew at work in a warehouse studio"
              hoverZoom
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="aspect-video rounded-[2rem] border-4 border-highlight shadow-[14px_14px_0_var(--brand)]"
            />
            <button
              type="button"
              aria-label="Play film (player not connected yet)"
              className="absolute top-1/2 left-1/2 grid size-20 -translate-1/2 place-items-center rounded-full border-2 border-foreground bg-highlight text-foreground shadow-[5px_5px_0_var(--foreground)] transition-transform duration-300 hover:scale-110 md:size-24"
            >
              <Play className="size-8 fill-current" />
            </button>
            <span className="absolute right-5 bottom-5 rounded-full bg-foreground px-3 py-1 text-sm font-bold text-background tabular-nums">
              {film.duration}
            </span>
            <span
              aria-hidden
              className="absolute -top-4 left-10 h-9 w-28 -rotate-6 bg-[var(--pop-mint)] opacity-90 shadow-sm"
            />
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
