"use client";

import { useRef } from "react";
import { Play } from "lucide-react";
import { Media } from "@/components/site/media";
import { hero } from "@/content/home";
import { photos } from "@/content/photos";
import { EASE, fadeUp, gsap, revealLines, useSectionMotion } from "@/lib/motion";
import { SlabLink } from "./slab-link";

/**
 * v4 hero: "opening titles".
 * The title fills the page like a poster, one line of credits sits under it,
 * and a widescreen frame from a film set slides up from below.
 */
export function HeroV4() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    revealLines(el.querySelector("h1"), { immediate: true, delay: 0.2 });
    fadeUp(el.querySelectorAll("[data-fade]"), { immediate: true, delay: 0.7, stagger: 0.1, y: 24 });
    gsap.from(el.querySelector("[data-frame]"), { yPercent: 18, autoAlpha: 0, duration: 1.6, ease: EASE, delay: 0.5 });
    gsap.fromTo(
      el.querySelector("[data-media-inner]"),
      { yPercent: -8, scale: 1.18 },
      {
        yPercent: 8,
        scale: 1.18,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      },
    );
  });

  return (
    <section ref={root} className="relative overflow-hidden pt-28 md:pt-36">
      <div className="container-site">
        <p data-fade className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase">
          <span className="relative flex size-2.5">
            <span className="absolute inset-0 rounded-full bg-brand motion-safe:animate-ping" />
            <span className="relative size-2.5 rounded-full bg-brand" />
          </span>
          Now showing · 2026–27 season
        </p>

        <h1 className="font-display mt-4 text-[clamp(5.5rem,21vw,19rem)] leading-[0.8] font-normal tracking-[0.005em] uppercase">
          {hero.title[0]} <span className="text-brand">{hero.title[1]}</span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 border-t border-foreground/25 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p data-fade className="max-w-xl text-lg leading-relaxed text-foreground/85 md:text-xl">
            {hero.intro}
          </p>
          <div data-fade className="flex flex-wrap items-center gap-4">
            <SlabLink href={hero.primaryCta.href}>{hero.primaryCta.label}</SlabLink>
            <a href={hero.watch.href} className="group flex items-center gap-3 text-sm font-bold tracking-[0.12em] uppercase">
              <span className="grid size-14 place-items-center rounded-full border border-foreground/50 transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-primary-foreground">
                <Play className="size-4 fill-current" />
              </span>
              {hero.watch.label}
            </a>
          </div>
        </div>
      </div>

      <div data-frame className="mt-12 md:mt-16">
        <Media
          src={photos.blueStage}
          alt="A camera operator filming performers on a backlit stage"
          priority
          className="aspect-video md:aspect-[21/8]"
        />
      </div>
    </section>
  );
}
