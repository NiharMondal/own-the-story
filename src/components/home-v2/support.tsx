"use client";

import { useRef } from "react";
import { Media } from "@/components/site/media";
import { buttonVariants } from "@/components/ui/button";
import { support } from "@/content/home";
import { gsap, SplitText, useSectionMotion } from "@/lib/motion";

/**
 * v2 support — "spotlight".
 * The section pins with a small circle of light on the page; scrolling
 * widens it until the whole cinema is lit, then the call to action rises in.
 */
export function SupportV2() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    const q = gsap.utils.selector(el);
    const chars = SplitText.create(q("h2")[0], { type: "words,chars" }).chars;

    gsap
      .timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=130%", pin: true, scrub: true } })
      .fromTo(
        q("[data-iris]"),
        { clipPath: "circle(8% at 62% 50%)" },
        { clipPath: "circle(120% at 62% 50%)", ease: "power2.in", duration: 1 },
      )
      .fromTo(q("[data-iris] [data-media-inner]"), { scale: 1.6 }, { scale: 1, ease: "none", duration: 1 }, 0)
      .from(chars, { yPercent: 100, autoAlpha: 0, duration: 0.35, stagger: 0.015, ease: "power3.out" }, 0.6)
      .fromTo(
        q("[data-fade]"),
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.08, ease: "power2.out" },
        0.85,
      )
      .to({}, { duration: 0.2 });
  });

  return (
    <section id="donate" ref={root} className="relative isolate flex min-h-svh items-center overflow-hidden py-24">
      <div data-iris className="absolute inset-0 -z-10">
        <Media tone={support.backdropTone} label={false} className="absolute inset-0" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--background)_85%,transparent),color-mix(in_srgb,var(--background)_30%,transparent)_65%,transparent)]"
        />
      </div>

      <div className="container-site">
        <h2 className="font-condensed text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.88] font-extrabold uppercase">
          {support.title[0]}
          <br />
          {support.title[1]}
        </h2>
        <p data-fade className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/85 md:text-[1.4rem]">
          {support.body}
        </p>
        <a data-fade href={support.cta.href} className={`${buttonVariants({ size: "xl" })} mt-8`}>
          {support.cta.label}
        </a>
        <p data-fade className="mt-8 text-sm text-muted-foreground">
          {support.note}
        </p>
      </div>

      <span
        data-fade
        className="absolute right-6 bottom-6 rounded-sm bg-black/55 px-2 py-1 text-xs text-white/75 backdrop-blur-sm md:right-10"
      >
        Placeholder image
      </span>
    </section>
  );
}
