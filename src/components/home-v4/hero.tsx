"use client";

import { useRef } from "react";
import { Play } from "lucide-react";
import { Media } from "@/components/site/media";
import { hero } from "@/content/home";
import { photos } from "@/content/photos";
import { EASE, fadeUp, gsap, revealLines, useSectionMotion } from "@/lib/motion";
import { NightLink } from "./night-link";

/**
 * v4 hero: "opening titles".
 * One full-bleed frame from a film set, the title stacked across the bottom
 * like a poster, and everything else kept to a single line of credits.
 */
export function HeroV4() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    gsap.from(el.querySelector("[data-media-inner]"), { scale: 1.3, duration: 2.8, ease: EASE });
    revealLines(el.querySelector("h1"), { immediate: true, delay: 0.25 });
    fadeUp(el.querySelectorAll("[data-fade]"), { immediate: true, delay: 0.8, stagger: 0.1, y: 24 });
    gsap.to(el.querySelector("[data-bg]"), {
      yPercent: 16,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
    });
  });

  return (
    <section ref={root} className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden pt-28 pb-14 md:pb-20">
      <div data-bg className="absolute inset-0 -z-10">
        <Media src={photos.blueStage} alt="" priority className="absolute inset-0" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,var(--background)_4%,rgb(10_10_15/0.55)_45%,rgb(10_10_15/0.25))]"
      />

      <div className="container-site">
        <p data-fade className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase">
          <span className="relative flex size-2.5">
            <span className="absolute inset-0 rounded-full bg-highlight motion-safe:animate-ping" />
            <span className="relative size-2.5 rounded-full bg-highlight" />
          </span>
          Now showing · 2026–27 season
        </p>

        <h1 className="font-display mt-5 text-[clamp(5.5rem,21vw,19rem)] leading-[0.8] font-normal tracking-[0.005em] uppercase">
          {hero.title[0]} <span className="text-brand">{hero.title[1]}</span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 border-t border-foreground/25 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p data-fade className="max-w-xl text-lg leading-relaxed text-foreground/85 md:text-xl">
            {hero.intro}
          </p>
          <div data-fade className="flex flex-wrap items-center gap-4">
            <NightLink href={hero.primaryCta.href}>{hero.primaryCta.label}</NightLink>
            <a href={hero.watch.href} className="group flex items-center gap-3 text-sm font-bold tracking-[0.12em] uppercase">
              <span className="grid size-14 place-items-center rounded-full border border-foreground/50 transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-primary-foreground">
                <Play className="size-4 fill-current" />
              </span>
              {hero.watch.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
