"use client";

import { useRef } from "react";
import { Media } from "@/components/site/media";
import { mission } from "@/content/home";
import { photos } from "@/content/photos";
import { flipChars, gsap, shutterIn, useSectionMotion } from "@/lib/motion";
import { ApertureRing } from "./aperture-ring";
import { ShutterLink } from "./shutter-link";

/**
 * v7 mission: a round lens beside the statement. The iris over the lens is
 * tied to the scroll, so it opens as the reader arrives; the statement flips
 * in letter by letter.
 */
export function MissionV7() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    const q = gsap.utils.selector(el);
    const lens = q("[data-lens]")[0];
    const scrub = { trigger: lens, start: "top bottom", end: "center 50%", scrub: true };
    gsap.fromTo(lens, { clipPath: "circle(10% at 50% 50%)" }, { clipPath: "circle(50% at 50% 50%)", ease: "none", scrollTrigger: scrub });
    gsap.fromTo(q("[data-lens] [data-media-inner]"), { scale: 1.35, rotation: 20 }, { scale: 1, rotation: 0, ease: "none", scrollTrigger: scrub });
    gsap.fromTo(q("[data-lens-ring]"), { rotation: -120 }, { rotation: 0, ease: "none", scrollTrigger: scrub });

    shutterIn(q(".eyebrow"), { trigger: el });
    flipChars(q("h2")[0], { stagger: 0.012 });
    shutterIn(q("[data-shutter]"), { trigger: q("[data-shutter]")[0], stagger: 0.12 });
  });

  return (
    <section ref={root} id="about" aria-labelledby="about-heading-v7" className="scroll-mt-20 py-24 md:py-36">
      <div className="container-site grid items-center gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div data-lens-ring className="absolute -inset-[6%] text-foreground/35">
            <ApertureRing className="size-full" />
          </div>
          <div data-lens className="absolute inset-[4%] overflow-hidden rounded-full">
            <Media
              src={photos.studentsLaughing}
              alt="Students laughing together in a classroom"
              sizes="(min-width: 1024px) 26rem, 85vw"
              className="absolute inset-0"
            />
          </div>
        </div>

        <div>
          <p className="eyebrow">{mission.eyebrow}</p>
          <h2
            id="about-heading-v7"
            className="font-display mt-6 text-[clamp(2.1rem,4.4vw,4rem)] leading-[1.02] font-bold tracking-[-0.035em]"
          >
            {mission.statement}
          </h2>
          <p data-shutter className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {mission.body}
          </p>
          <div data-shutter className="mt-9">
            <ShutterLink variant="ink" href="#programs">
              See the programs
            </ShutterLink>
          </div>
        </div>
      </div>
    </section>
  );
}
