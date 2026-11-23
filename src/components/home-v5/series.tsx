import { RevealSection } from "@/components/home-v3/reveal";
import { Media } from "@/components/site/media";
import { series } from "@/content/home";
import { photos } from "@/content/photos";
import { PopLink } from "./pop-link";

const PHOTOS = [photos.kidWithCamera, photos.clapperOnSet, photos.phoneMono];

/** v5 series: three cards dealt out crooked; each straightens when hovered. */
export function SeriesV5() {
  return (
    <RevealSection id="series" aria-labelledby="series-heading-v5" className="scroll-mt-20 bg-highlight py-24 md:py-32">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p data-reveal className="text-sm font-bold tracking-[0.1em] uppercase">
              {series.eyebrow}
            </p>
            <h2
              data-reveal
              id="series-heading-v5"
              className="font-display mt-3 text-[clamp(2.25rem,5vw,4rem)] leading-[0.98] font-extrabold tracking-[-0.035em]"
            >
              {series.heading}
            </h2>
          </div>
          <div data-reveal>
            <PopLink variant="paper" href={series.viewAll.href}>
              {series.viewAll.label}
            </PopLink>
          </div>
        </div>

        <ul className="mt-14 grid gap-8 md:grid-cols-3">
          {series.parts.map((part, i) => (
            <li key={part.title} data-reveal>
              <article className="group relative flex h-full flex-col rounded-[2rem] border-2 border-foreground bg-card p-4 shadow-[7px_7px_0_var(--foreground)] transition-[translate,rotate] duration-300 hover:-translate-y-2 hover:rotate-0 md:[li:nth-child(odd)_&]:-rotate-2 md:[li:nth-child(even)_&]:translate-y-6 md:[li:nth-child(even)_&]:rotate-1">
                <Media
                  src={PHOTOS[i]}
                  hoverZoom
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="aspect-4/3 rounded-[1.25rem] border-2 border-foreground"
                />
                <div className="flex flex-1 flex-col p-3 pt-5">
                  <p className="text-sm font-bold text-muted-foreground">
                    Part {i + 1} · {part.meta}
                  </p>
                  <h3 className="font-display mt-2 text-2xl leading-tight font-extrabold tracking-[-0.02em]">
                    {part.comingSoon ? (
                      part.title
                    ) : (
                      <a href="#series" className="after:absolute after:inset-0 group-hover:text-brand">
                        {part.title}
                      </a>
                    )}
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{part.body}</p>
                </div>
                {part.comingSoon && (
                  <span className="absolute -top-4 -right-3 rotate-6 rounded-full border-2 border-foreground bg-brand px-4 py-1.5 text-sm font-bold text-primary-foreground">
                    Coming soon
                  </span>
                )}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </RevealSection>
  );
}
