"use client";

import { useRef } from "react";
import { Media } from "@/components/site/media";
import { series } from "@/content/home";
import { photos } from "@/content/photos";
import { flipChars, gsap, irisOpen, shutterIn, useSectionMotion } from "@/lib/motion";
import { ShutterLink } from "./shutter-link";

const PHOTOS = [photos.kidWithCamera, photos.nightCrew, photos.phoneMono];

/**
 * v7 series: "three lenses". Each story sits behind a round lens that irises
 * open as it scrolls in; a dashed focus ring turns around it on hover.
 */
export function SeriesV7() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    const q = gsap.utils.selector(el);
    shutterIn(q(".eyebrow, [data-shutter]"), { trigger: el, stagger: 0.1 });
    flipChars(q("h2")[0], { stagger: 0.015 });
    const list = q("ol")[0];
    irisOpen(q("[data-media]"), { trigger: list, stagger: 0.16 });
    shutterIn(q("[data-copy]"), { trigger: list, delay: 0.5, stagger: 0.14 });
  });

  return (
    <section ref={root} id="series" aria-labelledby="series-heading-v7" className="scroll-mt-20 py-24 md:py-36">
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow">{series.eyebrow}</p>
            <h2
              id="series-heading-v7"
              className="font-display mt-5 text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[1] font-bold tracking-[-0.035em]"
            >
              {series.heading}
            </h2>
          </div>
          <div data-shutter>
            <ShutterLink variant="paper" href={series.viewAll.href}>
              {series.viewAll.label}
            </ShutterLink>
          </div>
        </div>

        <ol className="mt-16 grid gap-14 md:grid-cols-3 md:gap-8 lg:gap-12">
          {series.parts.map((part, i) => (
            <li key={part.title}>
              <article className="group relative">
                <div className="relative mx-auto aspect-square w-[86%]">
                  <svg
                    aria-hidden
                    viewBox="0 0 100 100"
                    className="absolute -inset-[7%] size-[114%] text-brand transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-90"
                  >
                    <circle cx="50" cy="50" r="49" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2.2" />
                  </svg>
                  <Media
                    src={PHOTOS[i]}
                    hoverZoom={!part.comingSoon}
                    sizes="(min-width: 768px) 28vw, 86vw"
                    className="size-full rounded-full"
                  >
                    {part.comingSoon && (
                      <div className="absolute inset-0 grid place-items-center bg-foreground/75">
                        <span className="font-mono text-xs tracking-[0.2em] text-background uppercase">Lens cap on · Coming soon</span>
                      </div>
                    )}
                  </Media>
                  <span
                   
                    className="font-display absolute -top-1 -left-1 grid size-14 place-items-center rounded-full bg-foreground text-xl font-bold text-background"
                  >
                    {i + 1}
                  </span>
                </div>
                <div data-copy className="mt-8 text-center">
                  <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">{part.meta}</p>
                  <h3 className="font-display mt-3 text-2xl leading-tight font-bold tracking-[-0.02em]">
                    {part.comingSoon ? (
                      part.title
                    ) : (
                      <a href="#series" className="after:absolute after:inset-0 group-hover:text-brand">
                        {part.title}
                      </a>
                    )}
                  </h3>
                  <p className="mx-auto mt-3 max-w-sm leading-relaxed text-muted-foreground">{part.body}</p>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
