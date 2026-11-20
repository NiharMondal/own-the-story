"use client";

import { useRef } from "react";
import { Captions, Maximize, Play, RotateCcw, Settings, Volume2 } from "lucide-react";
import { Media } from "@/components/site/media";
import { film } from "@/content/home";
import { fadeUp, gsap, revealLines, useSectionMotion } from "@/lib/motion";

export function FeaturedFilm() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    const player = el.querySelector("[data-player]");
    fadeUp(el.querySelector(".eyebrow"), { trigger: el });
    revealLines(el.querySelector("h2"));

    // The screen grows toward the viewer as it scrolls in; the picture settles inside it.
    const grow = { trigger: player, start: "top bottom", end: "top 25%", scrub: true };
    gsap.fromTo(player, { scale: 0.84, borderRadius: 28 }, { scale: 1, borderRadius: 4, ease: "none", scrollTrigger: grow });
    gsap.fromTo(
      el.querySelector("[data-player] [data-media-inner]"),
      { scale: 1.25 },
      { scale: 1, ease: "none", scrollTrigger: grow },
    );

    fadeUp(el.querySelectorAll("[data-ui]"), { trigger: player, delay: 0.2, stagger: 0.08, y: 16 });
    fadeUp(el.querySelectorAll("[data-caption]"), { trigger: el.querySelector("[data-caption]"), stagger: 0.1 });
  });

  return (
    <section id="film" ref={root} className="scroll-mt-20 pb-28 md:pb-40">
      <div className="container-site">
        <p className="eyebrow">{film.eyebrow}</p>
        <h2 className="mt-5 text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.05] font-bold tracking-[-0.03em]">
          {film.heading[0]}
          <br />
          {film.heading[1]}
        </h2>

        <div data-player className="relative mt-14 aspect-video overflow-hidden will-change-transform">
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
            type="button"
            aria-label="Play film (player not connected yet)"
            className="absolute top-1/2 left-1/2 grid size-14 -translate-1/2 place-items-center rounded-sm bg-gold text-black shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 md:size-20"
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
