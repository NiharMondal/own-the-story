"use client";

import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Media } from "@/components/site/media";
import { hero } from "@/content/home";
import { EASE, fadeUp, gsap, prefersReducedMotion, useGSAP } from "@/lib/motion";
import { PillLink } from "./pill-link";

/**
 * v2 hero — "front page".
 * A giant serif masthead tilts up into place line by line; the film still
 * unrolls from the bottom. On scroll the two title lines slide apart in
 * opposite directions while the still rises faster than the page.
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
      const card = q("[data-card]")[0];

      gsap.set(q("[data-intro]"), { visibility: "visible" });

      gsap.fromTo(
        q("[data-line]"),
        { yPercent: 110, rotation: 5 },
        { yPercent: 0, rotation: 0, transformOrigin: "0% 100%", duration: 1.6, ease: EASE, stagger: 0.14, delay: 0.2 },
      );
      fadeUp(q("[data-hero-fade]"), { immediate: true, delay: 0.8, stagger: 0.1, y: 24 });
      gsap.fromTo(
        card,
        { clipPath: "inset(100% 0% 0% 0% round 2rem)" },
        { clipPath: "inset(0% 0% 0% 0% round 2rem)", duration: 1.6, ease: "expo.inOut", delay: 0.45 },
      );
      gsap.from(q("[data-card] [data-media-inner]"), { scale: 1.4, duration: 2.4, ease: EASE, delay: 0.45 });

      drift.current = gsap.to(q("[data-hero-drift]"), {
        scale: 1.08,
        xPercent: -2,
        duration: 16,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap
        .timeline({ scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } })
        .to(q("[data-drift-x='left']"), { xPercent: -12, ease: "none" }, 0)
        .to(q("[data-drift-x='right']"), { xPercent: 10, ease: "none" }, 0)
        .to(card, { yPercent: -14, ease: "none" }, 0);
    },
    { scope: root },
  );

  const toggleBackground = () => {
    const next = !paused;
    drift.current?.paused(next);
    setPaused(next);
  };

  return (
    <section ref={root} className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container-site">
        <h1
          data-intro
          className="font-serif text-[clamp(4.75rem,17vw,17rem)] leading-[0.82] font-normal tracking-[-0.035em]"
        >
          <span data-drift-x="left" className="block overflow-clip pb-[0.2em] -mb-[0.14em]">
            <span data-line className="block">
              {hero.title[0]}
            </span>
          </span>
          <span data-drift-x="right" className="block overflow-clip pb-[0.2em] -mb-[0.14em] text-right md:pr-[4vw]">
            <span data-line className="block text-brand italic">
              {hero.title[1]}
            </span>
          </span>
        </h1>

        <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-4">
            <p data-intro data-hero-fade className="text-xl leading-relaxed md:text-2xl">
              {hero.intro}
            </p>
            <div data-intro data-hero-fade className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-5">
              <PillLink href={hero.primaryCta.href}>{hero.primaryCta.label}</PillLink>
              <PillLink variant="ghost" href={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
              </PillLink>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div data-card data-intro className="relative aspect-[16/10] overflow-hidden rounded-[2rem]">
              <div data-hero-drift className="absolute inset-0">
                <Media tone="ember" label={false} priority className="absolute inset-0" />
              </div>
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 md:inset-x-6 md:bottom-6">
                <a
                  href={hero.watch.href}
                  className="group flex items-center gap-3 rounded-full bg-background/90 py-2 pr-5 pl-2 text-sm font-semibold backdrop-blur-sm transition-colors hover:bg-background"
                >
                  <span className="grid size-10 place-items-center rounded-full bg-brand text-primary-foreground transition-[scale] duration-500 group-hover:scale-110">
                    <Play className="size-4 fill-current" />
                  </span>
                  {hero.watch.label}
                </a>
                <button
                  type="button"
                  onClick={toggleBackground}
                  aria-pressed={paused}
                  aria-label={paused ? "Play background video" : "Pause background video"}
                  className="grid size-12 place-items-center rounded-full bg-background/90 backdrop-blur-sm transition-colors hover:bg-background"
                >
                  {paused ? <Play className="size-4 fill-current" /> : <Pause className="size-4 fill-current" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
