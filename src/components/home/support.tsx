"use client";

import { useRef } from "react";
import { Media } from "@/components/site/media";
import { support } from "@/content/home";
import { buttonVariants } from "@/components/ui/button";
import { fadeUp, gsap, revealLines, useSectionMotion } from "@/lib/motion";

export function Support() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    // Frame widens to full bleed as it arrives; the cinema drifts behind it.
    gsap.fromTo(
      el.querySelector("[data-frame]"),
      { clipPath: "inset(0% 6% 0% 6% round 24px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "top 20%", scrub: true },
      },
    );
    gsap.fromTo(
      el.querySelector("[data-media-inner]"),
      { yPercent: -10, scale: 1.2 },
      {
        yPercent: 10,
        scale: 1.2,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );

    revealLines(el.querySelector("h2"), { trigger: el, delay: 0.1 });
    fadeUp(el.querySelectorAll("[data-fade]"), { trigger: el, delay: 0.5, stagger: 0.12 });
  });

  return (
    <section id="donate" ref={root} className="scroll-mt-20">
      <div data-frame className="relative isolate flex min-h-[40rem] items-center overflow-hidden py-24 md:min-h-[46rem]">
        <Media tone={support.tone} label={false} className="absolute inset-0 -z-10" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(10_10_10/0.85),rgb(10_10_10/0.3)_65%,transparent)]"
        />

        <div className="container-site">
          <h2 className="font-condensed text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.88] font-extrabold uppercase">
            {support.title[0]}
            <br />
            {support.title[1]}
          </h2>
          <p data-fade className="mt-8 max-w-xl text-lg leading-relaxed text-white/90 md:text-[1.4rem]">
            {support.body}
          </p>
          <a data-fade href={support.cta.href} className={`${buttonVariants({ size: "xl" })} mt-8`}>
            {support.cta.label}
          </a>
          <p data-fade className="mt-8 text-sm text-white/60">
            {support.note}
          </p>
        </div>

        <span className="absolute right-6 bottom-6 rounded-sm bg-black/55 px-2 py-1 text-xs text-white/75 backdrop-blur-sm md:right-10">
          Placeholder image
        </span>
      </div>
    </section>
  );
}
