"use client";

import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Media } from "@/components/site/media";
import { buttonVariants } from "@/components/ui/button";
import { hero } from "@/content/home";
import { EASE, gsap, prefersReducedMotion, SplitText, useGSAP } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * v2 hero — "projector".
 * Intro: the picture opens from a thin slit like a projector gate, letters flip
 * up on their baseline, the subtitle focuses in word by word.
 * Scroll: the section pins and the title rushes toward the viewer (zoom-through).
 */
export function HeroV2() {
  const root = useRef<HTMLElement>(null);
  const drift = useRef<gsap.core.Tween | null>(null);
  const [paused, setPaused] = useState(false);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);
      const title = q("h1")[0];

      gsap.set(q("[data-intro]"), { visibility: "visible" });

      const chars = SplitText.create(title, { type: "words,chars" }).chars;
      const words = SplitText.create(q("[data-sub]")[0], { type: "words" }).words;

      gsap
        .timeline({ defaults: { ease: EASE } })
        .fromTo(
          q("[data-shutter]"),
          { clipPath: "inset(49.6% 0% 49.6% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.9, ease: "expo.inOut" },
        )
        .from(q("[data-shutter] [data-media-inner]"), { scale: 1.45, duration: 2.6 }, 0.25)
        .from(
          chars,
          {
            rotationX: -100,
            yPercent: 50,
            autoAlpha: 0,
            transformOrigin: "50% 100%",
            transformPerspective: 900,
            duration: 1.4,
            stagger: 0.035,
          },
          0.95,
        )
        .from(words, { autoAlpha: 0, filter: "blur(12px)", y: 12, duration: 1.1, stagger: 0.025 }, 1.4)
        .fromTo(
          q("[data-pop]"),
          { autoAlpha: 0, scale: 0.92, y: 16 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 1.1, stagger: 0.08 },
          1.75,
        );

      // Ambient drift stands in for the background film.
      drift.current = gsap.to(q("[data-hero-drift]"), {
        scale: 1.1,
        xPercent: 2,
        duration: 18,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Pinned zoom-through: copy steps aside, the title flies past the camera.
      gsap.set(title, { transformOrigin: "32% 55%" });
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=110%", pin: true, scrub: true } })
        .to(q("[data-step-aside]"), { autoAlpha: 0, y: -40, duration: 0.3, ease: "none" }, 0)
        .to(title, { scale: 7, duration: 1, ease: "power2.in" }, 0)
        .to(title, { autoAlpha: 0, duration: 0.2, ease: "none" }, 0.8)
        .to(q("[data-shutter]"), { scale: 0.92, ease: "none", duration: 1 }, 0)
        .to(q("[data-hero-shade]"), { opacity: 1, ease: "none", duration: 0.5 }, 0.5);
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
      <div data-shutter data-intro className="absolute inset-0 -z-10">
        <div data-hero-drift className="absolute inset-0">
          <Media tone={hero.tone} label={false} priority className="absolute inset-0" />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--background)_85%,transparent),color-mix(in_srgb,var(--background)_35%,transparent)_55%,transparent),linear-gradient(0deg,var(--background),transparent_40%)]"
        />
      </div>
      <div data-hero-shade aria-hidden className="absolute inset-0 -z-10 bg-background opacity-0" />

      <div className="container-site flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h1
            data-intro
            className="font-condensed text-[clamp(4.5rem,13vw,10.5rem)] leading-[0.86] font-extrabold tracking-[-0.01em] uppercase"
          >
            {hero.title[0]}
            <br />
            {hero.title[1]}
          </h1>
          <div data-step-aside>
            <p data-intro data-sub className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/85 md:text-[1.4rem]">
              {hero.intro}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a data-intro data-pop href={hero.primaryCta.href} className={buttonVariants({ size: "xl" })}>
                {hero.primaryCta.label}
              </a>
              <a
                data-intro
                data-pop
                href={hero.secondaryCta.href}
                className={cn(
                  buttonVariants({ size: "xl", variant: "outline" }),
                  "border-foreground/60 bg-transparent text-foreground hover:bg-foreground hover:text-background dark:bg-transparent",
                )}
              >
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>

        <div data-step-aside className="flex flex-col items-start gap-4 lg:items-end">
          <span data-intro data-pop className="rounded-sm bg-black/50 px-2 py-1 text-xs text-white/70 backdrop-blur-sm">
            Placeholder image
          </span>
          <a data-intro data-pop href={hero.watch.href} className="group flex items-center gap-3 font-semibold">
            <span className="grid size-11 place-items-center rounded-full bg-brand text-primary-foreground transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
              <Play className="size-5" />
            </span>
            {hero.watch.label}
          </a>
          <button
            data-intro
            data-pop
            type="button"
            onClick={toggleBackground}
            aria-pressed={paused}
            className="flex items-center gap-3 text-sm text-foreground/70 transition-colors hover:text-foreground"
          >
            {paused ? "Play background video" : "Pause background video"}
            <span className="grid size-11 place-items-center rounded-full bg-background/70 backdrop-blur-sm">
              {paused ? <Play className="size-5" /> : <Pause className="size-5" />}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
