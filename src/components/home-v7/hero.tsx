"use client";

import { useRef } from "react";
import { Media } from "@/components/site/media";
import { hero } from "@/content/home";
import { heroV3 } from "@/content/home-v3";
import { photos } from "@/content/photos";
import { EASE, flipChars, gsap, shutterIn, useSectionMotion } from "@/lib/motion";
import { hexIris } from "./aperture";
import { ApertureRing } from "./aperture-ring";
import { ShutterLink } from "./shutter-link";
import { Timecode } from "./timecode";
import { RecTag } from "./viewfinder";

const SATELLITES = [
  { src: photos.phoneSunset, alt: "A phone filming a sunset", place: "top-[2%] right-[3%]" },
  { src: photos.blueStage, alt: "A performer on a stage in blue light", place: "bottom-[2%] left-[3%]" },
];

/**
 * v7 hero: "through the lens".
 * Words on the left. On the right a lens ring, and inside it a cluster of
 * hexagonal frames that open like an aperture. Behind the big one, a red and
 * a cyan copy slide apart, like a 3D film seen without the glasses.
 */
export function HeroV7() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    const q = gsap.utils.selector(el);
    gsap.set(q("[data-intro]"), { visibility: "visible" });

    flipChars(q("h1")[0], { immediate: true, delay: 0.25, stagger: 0.045 });
    shutterIn(q("[data-shutter]"), { immediate: true, delay: 0.7, stagger: 0.12 });

    gsap.fromTo(q("[data-ring]"), { rotation: -90, scale: 0.85, autoAlpha: 0 }, {
      rotation: 0, scale: 1, autoAlpha: 1, duration: 2.2, ease: EASE, delay: 0.1,
    });
    hexIris(q("[data-hex]"), { immediate: true, delay: 0.35 });
    // The red and cyan copies start stacked, then separate.
    gsap.from(q("[data-ghost]"), { "--split": 0, duration: 1.4, ease: EASE, delay: 1.5 });

    // Scrolling away turns the focus ring, as if racking focus.
    gsap.to(q("[data-ring-inner]"), {
      rotation: 140,
      ease: "none",
      scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
    });
  });

  return (
    <section ref={root} aria-labelledby="hero-heading-v7" className="relative isolate overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      {/* A faint focus chart behind everything. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[repeating-radial-gradient(circle_at_74%_48%,transparent_0_47px,rgb(15_18_24/0.06)_47px_48px)]"
      />

      <div className="container-site grid items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p data-intro data-shutter className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
            <RecTag />
            <Timecode className="text-foreground/70" />
            <span className="text-muted-foreground">{heroV3.eyebrow}</span>
          </p>
          <h1
            data-intro
            id="hero-heading-v7"
            className="font-display mt-8 text-[clamp(3.5rem,9vw,7.75rem)] leading-[0.9] font-extrabold tracking-[-0.045em]"
          >
            {hero.title[0]} <span className="text-brand">{hero.title[1]}</span>
          </h1>
          <p data-intro data-shutter className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {hero.intro}
          </p>
          <div data-intro data-shutter className="mt-10 flex flex-wrap gap-4">
            <ShutterLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ShutterLink>
            <ShutterLink variant="paper" href={hero.watch.href}>
              {hero.watch.label}
            </ShutterLink>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
          <div data-intro data-ring className="absolute inset-0 text-foreground/45">
            <div data-ring-inner className="size-full">
              <ApertureRing className="size-full" />
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 w-[52%] -translate-1/2">
            <div
              data-intro
              data-ghost
              className="hex absolute inset-0 bg-brand mix-blend-multiply [--split:1] [translate:calc(var(--split)*-5%)_0]"
            />
            <div
              data-intro
              data-ghost
              className="hex absolute inset-0 bg-highlight mix-blend-multiply [--split:1] [translate:calc(var(--split)*5%)_0]"
            />
            <div data-intro data-hex className="hex relative w-full">
              <Media
                src={photos.youngCameraman}
                alt="A young camera operator at work"
                priority
                sizes="(min-width: 1024px) 18rem, 52vw"
                className="absolute inset-0"
              />
            </div>
          </div>
          {SATELLITES.map((shot) => (
            <div key={shot.src} data-intro data-hex className={`hex absolute w-[24%] ${shot.place}`}>
              <Media src={shot.src} alt={shot.alt} sizes="(min-width: 1024px) 8rem, 24vw" className="absolute inset-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
