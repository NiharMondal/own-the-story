"use client";

import { useRef } from "react";
import { Play } from "lucide-react";
import { Media } from "@/components/site/media";
import { film } from "@/content/home";
import { photos } from "@/content/photos";
import { flipChars, gsap, shutterIn, useSectionMotion } from "@/lib/motion";
import { Timecode } from "./timecode";
import { RecTag, Viewfinder } from "./viewfinder";

/**
 * v7 film: "viewfinder". The frame is seen through a round iris that opens
 * wider the further you scroll, until the whole chamfered screen is showing.
 * Brackets, REC and a running timecode sit over the picture.
 */
export function FilmV7() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    const q = gsap.utils.selector(el);
    shutterIn(q(".eyebrow"), { trigger: el });
    flipChars(q("h2")[0], { stagger: 0.018 });

    const screen = q("[data-screen]")[0];
    const scrub = { trigger: screen, start: "top 95%", end: "center 55%", scrub: true };
    gsap.fromTo(q("[data-iris]"), { clipPath: "circle(9% at 50% 50%)" }, { clipPath: "circle(75% at 50% 50%)", ease: "none", scrollTrigger: scrub });
    gsap.fromTo(q("[data-screen] [data-media-inner]"), { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger: scrub });
    shutterIn(q("[data-hud]"), { trigger: screen, delay: 0.3, stagger: 0.08 });
  });

  return (
    <section ref={root} id="film" aria-labelledby="film-heading-v7" className="scroll-mt-20 py-24 md:py-36">
      <div className="container-site">
        <p className="eyebrow">{film.eyebrow}</p>
        <h2
          id="film-heading-v7"
          className="font-display mt-5 max-w-4xl text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.98] font-bold tracking-[-0.04em]"
        >
          {film.heading[0]} <span className="text-brand">{film.heading[1]}</span>
        </h2>

        <div data-screen className="relative mt-14 aspect-[4/5] bg-foreground chamfer [--cut:1.75rem] sm:aspect-video md:[--cut:3rem]">
          <div data-iris className="absolute inset-0">
            <Media
              src={photos.warehouseSet}
              alt="A film set in a warehouse, lit for a shoot"
              sizes="(min-width: 1312px) 1232px, 100vw"
              className="absolute inset-0"
            >
              <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgb(15_18_24/0.8),transparent_45%),linear-gradient(180deg,rgb(15_18_24/0.45),transparent_25%)]" />
            </Media>
          </div>

          <Viewfinder className="inset-5 text-white/85 md:inset-10" />
          <div aria-hidden className="absolute top-1/2 left-1/2 size-6 -translate-1/2 text-white/70">
            <span className="absolute top-1/2 left-0 h-px w-full bg-current" />
            <span className="absolute top-0 left-1/2 h-full w-px bg-current" />
          </div>

          <div data-hud className="absolute top-9 left-9 flex items-center gap-3 md:top-16 md:left-16">
            <RecTag tone="light" />
            <Timecode className="hidden text-sm text-white/85 sm:inline" />
          </div>
          <span data-hud className="absolute top-9 right-9 font-mono text-sm text-white/85 md:top-16 md:right-16">
            4K · 24fps
          </span>

          <button
            type="button"
            aria-label="Play film (player not connected yet)"
            className="group absolute top-1/2 left-1/2 -translate-1/2 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <span className="hex grid w-20 place-items-center bg-brand text-primary-foreground transition-transform duration-500 group-hover:scale-110 md:w-28">
              <Play className="size-7 fill-current md:size-9" />
            </span>
          </button>

          <div data-hud className="absolute inset-x-9 bottom-9 flex items-end justify-between gap-4 md:inset-x-16 md:bottom-16">
            <div>
              <p className="font-display text-xl font-bold text-white md:text-3xl">{film.title}</p>
              <p className="mt-1 hidden text-sm text-white/75 md:block">{film.meta}</p>
            </div>
            <span className="font-mono text-sm text-white tabular-nums">{film.duration}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
