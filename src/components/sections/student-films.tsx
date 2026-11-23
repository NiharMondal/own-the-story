import { Play } from "lucide-react";
import { RevealSection } from "@/components/home-v3/reveal";
import { Media } from "@/components/site/media";
import { studentFilms } from "@/content/home";
import { photos } from "@/content/photos";
import { cn } from "@/lib/utils";
import type { SectionProps } from "./why-it-matters";

const STILLS = [
  { src: photos.friendsFence, alt: "Five young people by a chain-link fence" },
  { src: photos.rinkCamera, alt: "A camera operator filming under purple light" },
  { src: photos.teensGroup, alt: "A group of teenagers together outdoors" },
  { src: photos.gardenScreening, alt: "An outdoor screening at night" },
];

/** "Four films. Four directors." A row of posters for work made by students. */
export function StudentFilms({ headingClass = "font-bold tracking-[-0.02em]", className }: SectionProps) {
  return (
    <RevealSection aria-labelledby="films-heading" className={cn("py-24 md:py-32", className)}>
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p data-reveal className="eyebrow">
              {studentFilms.eyebrow}
            </p>
            <h2 data-reveal id="films-heading" className={cn("mt-4 text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.98]", headingClass)}>
              {studentFilms.heading[0]}
              <br />
              <span className="text-brand">{studentFilms.heading[1]}</span>
            </h2>
          </div>
          <a
            data-reveal
            href={studentFilms.link.href}
            className="font-semibold underline decoration-brand decoration-2 underline-offset-[6px] hover:text-brand"
          >
            {studentFilms.link.label} →
          </a>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {studentFilms.items.map((film, i) => (
            <li key={film.title} data-reveal className="lg:even:translate-y-8">
              <article className="group relative">
                <Media
                  src={STILLS[i].src}
                  alt={STILLS[i].alt}
                  hoverZoom
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="aspect-[3/4] rounded-xl"
                >
                  <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgb(0_0_0/0.55),transparent_45%)]" />
                  <span className="absolute bottom-4 left-4 grid size-11 place-items-center rounded-full bg-brand text-primary-foreground transition-transform duration-300 group-hover:scale-110">
                    <Play className="size-4 fill-current" aria-hidden />
                  </span>
                  <span className="absolute right-4 bottom-4 text-sm font-medium text-white tabular-nums">{film.length}</span>
                </Media>
                <h3 className="mt-4 text-lg font-bold">
                  <a href={studentFilms.link.href} className="after:absolute after:inset-0 group-hover:text-brand">
                    {film.title}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{film.credit}</p>
              </article>
            </li>
          ))}
        </ul>
        <p className="mt-14 text-xs text-muted-foreground">{studentFilms.note}</p>
      </div>
    </RevealSection>
  );
}
