"use client";

import { useRef } from "react";
import { Media } from "@/components/site/media";
import { hero } from "@/content/home";
import { heroV3 } from "@/content/home-v3";
import { photos } from "@/content/photos";
import { EASE, fadeUp, gsap, useSectionMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { DuskLink } from "./dusk-link";

const ARCHES = [
  { src: photos.teensGroup, alt: "A group of teenagers together outdoors", height: "h-[52%]", hide: true },
  { src: photos.rinkCamera, alt: "A camera operator filming under purple light", height: "h-[74%]" },
  { src: photos.eventCameraman, alt: "A young camera operator filming a crowd", height: "h-full" },
  { src: photos.dumbo, alt: "A Brooklyn street with the Manhattan Bridge behind it", height: "h-[74%]" },
  { src: photos.redCameraman, alt: "A filmmaker checking a monitor in red light", height: "h-[52%]", hide: true },
];

/**
 * v6 hero: "colonnade".
 * Everything is centred. The title sits in a glow of evening light, and five
 * arched windows rise underneath it, tallest in the middle.
 */
export function HeroV6() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    fadeUp(el.querySelectorAll("[data-fade]"), { immediate: true, delay: 0.15, stagger: 0.1, y: 28 });
    const arches = el.querySelectorAll("[data-arch]");
    gsap.fromTo(
      arches,
      { yPercent: 40, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, duration: 1.6, ease: EASE, delay: 0.5, stagger: { each: 0.09, from: "center" } },
    );
    // The outer arches drift up faster than the centre one as the page scrolls.
    arches.forEach((arch, i) => {
      gsap.to(arch.firstElementChild, {
        yPercent: -6 * Math.abs(i - 2) - 4,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    });
  });

  return (
    <section ref={root} aria-labelledby="hero-heading-v6" className="relative isolate overflow-hidden pt-36 md:pt-44">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgb(255_111_145/0.28),transparent_70%),radial-gradient(40%_40%_at_85%_30%,rgb(255_176_87/0.16),transparent_70%),radial-gradient(40%_40%_at_10%_40%,rgb(140_90_255/0.2),transparent_70%)]"
      />

      <div className="container-site text-center">
        <p
          data-fade
          className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/5 px-4 py-1.5 text-sm backdrop-blur-sm"
        >
          <span className="size-1.5 rounded-full bg-brand" />
          {heroV3.eyebrow}
        </p>
        <h1
          data-fade
          id="hero-heading-v6"
          className="font-display mx-auto mt-7 text-[clamp(4rem,12.5vw,11rem)] leading-[0.88] font-normal tracking-[-0.04em]"
        >
          {hero.title[0]}{" "}
          <em className="bg-linear-to-r from-brand to-highlight bg-clip-text pr-[0.06em] text-transparent">
            {hero.title[1]}
          </em>
        </h1>
        <p data-fade className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-foreground/80 md:text-xl">
          {hero.intro}
        </p>
        <div data-fade className="mt-9 flex flex-wrap justify-center gap-4">
          <DuskLink href={hero.primaryCta.href}>{hero.primaryCta.label}</DuskLink>
          <DuskLink variant="ghost" href={hero.watch.href}>
            {hero.watch.label}
          </DuskLink>
        </div>
      </div>

      <div className="container-site mt-16 flex h-[22rem] items-end justify-center gap-3 md:mt-20 md:h-[30rem] md:gap-5">
        {ARCHES.map((arch, i) => (
          <div key={arch.src} data-arch className={cn("max-w-64 flex-1", arch.height, arch.hide && "hidden sm:block")}>
            <div className="h-full">
              <Media
                src={arch.src}
                alt={arch.alt}
                priority={i === 2}
                sizes="(min-width: 640px) 20vw, 34vw"
                className="h-full rounded-t-full"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
