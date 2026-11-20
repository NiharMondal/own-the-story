"use client";

import { useRef } from "react";
import { Captions, Maximize, Play, RotateCcw, Settings, Volume2 } from "lucide-react";
import { Media } from "@/components/site/media";
import { film } from "@/content/home";
import { blurIn, gsap, scatterChars, useSectionMotion } from "@/lib/motion";

/**
 * v2 featured film — "house lights down".
 * When the player reaches the middle of the screen the section pins and the
 * player grows until it fills the whole viewport; the headline steps back and
 * the player controls come up once it is full screen. It then settles back into
 * the page so the caption below is uncovered when the pin releases.
 */
export function FeaturedFilmV2() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    const q = gsap.utils.selector(el);
    const stage = q("[data-player]")[0] as HTMLElement;

    blurIn(q(".eyebrow"), { trigger: el });
    scatterChars(q("h2")[0]);

    // Scale at which the player covers the viewport edge to edge.
    const cover = () =>
      Math.max(window.innerWidth / stage.offsetWidth, window.innerHeight / stage.offsetHeight) * 1.01;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: stage,
          start: "center center",
          end: "+=170%",
          pin: el,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })
      .fromTo(stage, { scale: 0.9, borderRadius: 20 }, { scale: cover, borderRadius: 0, ease: "power1.inOut", duration: 1 })
      .fromTo(q("[data-player] [data-media-inner]"), { scale: 1.3 }, { scale: 1, ease: "none", duration: 1 }, 0)
      .to(q("[data-heading]"), { autoAlpha: 0, y: -80, ease: "none", duration: 0.5 }, 0)
      .fromTo(
        q("[data-ui]"),
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.25, stagger: 0.05, ease: "power2.out" },
        0.75,
      )
      .to({}, { duration: 0.3 }) // hold full screen for a beat
      .to(stage, { scale: 1, borderRadius: 4, ease: "power1.inOut", duration: 0.6 })
      .to(q("[data-heading]"), { autoAlpha: 1, y: 0, ease: "power1.out", duration: 0.4 }, "<0.2");

    blurIn(q("[data-caption]"), { trigger: q("[data-caption]")[0], stagger: 0.1 });
  });

  return (
    <section id="film" ref={root} className="overflow-x-clip pt-10 pb-28 md:pb-40">
      <div className="container-site">
        <div data-heading>
          <p className="eyebrow">{film.eyebrow}</p>
          <h2 className="mt-5 text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.05] font-bold tracking-[-0.03em]">
            {film.heading[0]}
            <br />
            {film.heading[1]}
          </h2>
        </div>

        <div data-player className="relative z-10 mt-14 aspect-video overflow-hidden will-change-transform">
          <Media tone={film.tone} label={false} className="absolute inset-0" />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgb(0_0_0/0.65),transparent_30%)]" />

          <p data-ui className="absolute top-5 left-5 text-sm text-white/90 md:top-7 md:left-7 md:text-base">
            {film.title}
          </p>
          <span
            data-ui
            className="absolute top-5 right-5 hidden rounded-sm bg-black/55 px-2 py-1 text-xs text-white/80 backdrop-blur-sm sm:block md:top-7 md:right-7"
          >
            {film.playerNote}
          </span>

          {/* Placeholder until the JW Player embed is wired in. */}
          <button
            data-ui
            type="button"
            aria-label="Play film (player not connected yet)"
            className="absolute top-1/2 left-1/2 -mt-7 -ml-7 grid size-14 place-items-center rounded-full bg-gold text-black shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 md:-mt-10 md:-ml-10 md:size-20"
          >
            <Play className="size-6 md:size-7" />
          </button>

          <div data-ui aria-hidden className="absolute inset-x-4 bottom-3 md:inset-x-7 md:bottom-5">
            <div className="h-0.5 rounded-full bg-white/30" />
            <div className="mt-3 flex items-center gap-4 text-white/90 [&_svg]:size-5">
              <Play />
              <RotateCcw />
              <Volume2 />
              <span className="text-sm tabular-nums">00:00 / {film.duration}</span>
              <span className="ml-auto flex gap-4">
                <Captions />
                <Settings />
                <Maximize />
              </span>
            </div>
          </div>
        </div>

        <h3 data-caption className="mt-8 text-xl font-semibold md:text-2xl">
          {film.title}
        </h3>
        <p data-caption className="mt-2 text-sm text-muted-foreground md:text-base">
          {film.meta}
        </p>
      </div>
    </section>
  );
}
