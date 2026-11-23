"use client";

import { useRef } from "react";
import { Captions, Maximize, Play, RotateCcw, Settings, Volume2 } from "lucide-react";
import { Media } from "@/components/site/media";
import { film } from "@/content/home";
import { fadeUp, gsap, revealLines, useSectionMotion } from "@/lib/motion";

/**
 * v3 featured film — "screening room".
 * The player sits in an ink frame that rises into place as you scroll. On
 * desktop the round play button follows the cursor around the picture.
 */
export function FeaturedFilmV3() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    const q = gsap.utils.selector(el);
    const panel = q("[data-panel]")[0];
    const player = q("[data-player]")[0] as HTMLElement;
    const follow = q("[data-follow]")[0];

    fadeUp(q(".eyebrow"), { trigger: el });
    revealLines(q("h2")[0]);

    const rise = { trigger: panel, start: "top bottom", end: "top 35%", scrub: true };
    gsap.fromTo(panel, { yPercent: 12, scale: 0.94 }, { yPercent: 0, scale: 1, ease: "none", scrollTrigger: rise });
    gsap.fromTo(q("[data-player] [data-media-inner]"), { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger: rise });
    fadeUp(q("[data-caption]"), { trigger: q("[data-caption]")[0], stagger: 0.1 });

    // Cursor-following play button, for mouse and trackpad users only.
    const mm = gsap.matchMedia();
    mm.add("(hover: hover) and (pointer: fine)", () => {
      const xTo = gsap.quickTo(follow, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(follow, "y", { duration: 0.6, ease: "power3" });
      const move = (e: PointerEvent) => {
        const r = player.getBoundingClientRect();
        xTo(e.clientX - r.left - r.width / 2);
        yTo(e.clientY - r.top - r.height / 2);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      player.addEventListener("pointermove", move);
      player.addEventListener("pointerleave", leave);
      return () => {
        player.removeEventListener("pointermove", move);
        player.removeEventListener("pointerleave", leave);
      };
    });
  });

  return (
    <section id="film" ref={root} className="scroll-mt-20 pb-28 md:pb-40">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <p className="eyebrow lg:col-span-3 lg:pt-5">{film.eyebrow}</p>
          <h2 className="font-serif text-[clamp(2.75rem,6vw,5.5rem)] leading-none font-normal tracking-[-0.025em] lg:col-span-9">
            {film.heading[0]}
            <br />
            <em className="text-brand">{film.heading[1]}</em>
          </h2>
        </div>

        <div data-panel className="mt-16 rounded-[2.5rem] bg-foreground p-3 text-background md:p-5">
          <div data-player className="relative aspect-video overflow-hidden rounded-[1.75rem]">
            <Media tone={film.tone} label={false} className="absolute inset-0" />
            <div aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgb(0_0_0/0.6),transparent_35%)]" />

            <span className="absolute top-4 right-4 hidden rounded-full bg-black/45 px-3 py-1 text-xs text-white/85 backdrop-blur-sm sm:block md:top-6 md:right-6">
              {film.playerNote}
            </span>

            {/* Placeholder until the JW Player embed is wired in. */}
            <button
              data-follow
              type="button"
              aria-label="Play film (player not connected yet)"
              className="absolute top-1/2 left-1/2 -mt-12 -ml-12 flex size-24 flex-col items-center justify-center gap-1 rounded-full bg-brand text-[0.7rem] font-semibold tracking-[0.18em] text-primary-foreground uppercase shadow-2xl md:-mt-14 md:-ml-14 md:size-28"
            >
              <Play className="size-6 fill-current" />
              Play
            </button>

            <div aria-hidden className="absolute inset-x-4 bottom-3 text-white md:inset-x-7 md:bottom-5">
              <div className="h-1 overflow-hidden rounded-full bg-white/25">
                <div className="h-full w-0 bg-brand" />
              </div>
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

          <div className="flex flex-col gap-2 px-3 pt-6 pb-3 md:flex-row md:items-baseline md:justify-between md:px-4">
            <h3 data-caption className="font-serif text-3xl font-normal md:text-4xl">
              {film.title}
            </h3>
            <p data-caption className="text-sm text-background/65 md:max-w-md md:text-right">
              {film.meta}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
