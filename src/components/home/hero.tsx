"use client";

import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Media } from "@/components/site/media";
import { hero } from "@/content/home";
import { buttonVariants } from "@/components/ui/button";
import { EASE, fadeUp, gsap, prefersReducedMotion, revealLines, useGSAP } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const drift = useRef<gsap.core.Tween | null>(null);
  const [paused, setPaused] = useState(false);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);

      gsap.set(q("[data-intro]"), { visibility: "visible" });

      // Intro: the picture settles out of a slow zoom while the title rises.
      gsap.from(q("[data-hero-bg]"), { scale: 1.3, autoAlpha: 0, duration: 2.6, ease: EASE });
      revealLines(q("h1")[0], { immediate: true, delay: 0.35 });
      fadeUp(q("[data-hero-fade]"), { immediate: true, delay: 0.95, stagger: 0.12, y: 30 });

      // Ambient drift stands in for the background film until real footage exists.
      drift.current = gsap.to(q("[data-hero-drift]"), {
        scale: 1.08,
        xPercent: -2,
        duration: 16,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Scrolling away: picture sinks slower than the page, copy lifts and fades.
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } })
        .to(q("[data-hero-parallax]"), { yPercent: 22, ease: "none" }, 0)
        .to(q("[data-hero-content]"), { yPercent: -18, autoAlpha: 0, ease: "none" }, 0)
        .to(q("[data-hero-shade]"), { opacity: 0.85, ease: "none" }, 0);
    },
    { scope: root },
  );

  const toggleBackground = () => {
    const next = !paused;
    drift.current?.paused(next);
    setPaused(next);
  };

  return (
    <section ref={root} className="relative isolate flex min-h-svh items-end overflow-hidden pb-20 md:pb-28">
      {/* Background stack: parallax › intro zoom › ambient drift › picture */}
      <div data-hero-parallax className="absolute inset-0 -z-10">
        <div data-hero-bg data-intro className="absolute inset-0">
          <div data-hero-drift className="absolute inset-0">
            <Media tone={hero.tone} label={false} priority className="absolute inset-0" />
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(10_10_10/0.85),rgb(10_10_10/0.35)_55%,transparent),linear-gradient(0deg,#0a0a0a,transparent_40%)]"
      />
      <div data-hero-shade aria-hidden className="absolute inset-0 -z-10 bg-background opacity-0" />

      <div data-hero-content className="container-site flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h1
            data-intro
            className="font-condensed text-[clamp(4.5rem,13vw,10.5rem)] leading-[0.86] font-extrabold tracking-[-0.01em] uppercase"
          >
            {hero.title[0]}
            <br />
            {hero.title[1]}
          </h1>
          <p data-intro data-hero-fade className="mt-8 max-w-xl text-lg leading-relaxed text-white/90 md:text-[1.4rem]">
            {hero.intro}
          </p>
          <div data-intro data-hero-fade className="mt-10 flex flex-wrap gap-4">
            <a href={hero.primaryCta.href} className={buttonVariants({ size: "xl" })}>
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className={cn(
                buttonVariants({ size: "xl", variant: "outline" }),
                "border-white/80 bg-transparent text-white hover:bg-white hover:text-black dark:bg-transparent",
              )}
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>

        <div data-intro data-hero-fade className="flex flex-col items-start gap-4 lg:items-end">
          <span className="rounded-sm bg-black/50 px-2 py-1 text-xs text-white/70 backdrop-blur-sm">
            Placeholder image
          </span>
          <a href={hero.watch.href} className="group flex items-center gap-3 font-semibold">
            <span className="grid size-11 place-items-center rounded-sm bg-gold text-black transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
              <Play className="size-5" />
            </span>
            {hero.watch.label}
          </a>
          <button
            type="button"
            onClick={toggleBackground}
            aria-pressed={paused}
            className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
          >
            {paused ? "Play background video" : "Pause background video"}
            <span className="grid size-11 place-items-center rounded-sm bg-black/40 backdrop-blur-sm">
              {paused ? <Play className="size-5" /> : <Pause className="size-5" />}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
