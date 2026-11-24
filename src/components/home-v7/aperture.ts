"use client";

import { gsap } from "@/lib/motion";

type HexIrisOptions = {
  delay?: number;
  trigger?: Element | null;
  /** Play straight away (hero) rather than when scrolled into view. */
  immediate?: boolean;
  /** Tie the opening to the scroll position instead of playing it. */
  scrub?: boolean;
  /** How open the iris starts, 0 to 1. */
  from?: number;
  /** How far the blades turn while opening. */
  twist?: number;
};

/**
 * Opens a `.hex` element like a camera aperture: the hexagon grows from its
 * centre while its blades turn into place. Works on the CSS variables the
 * `hex` utility reads, so reverting the tween leaves a plain hexagon.
 */
export function hexIris(targets: gsap.TweenTarget, opts: HexIrisOptions = {}) {
  const trigger = opts.trigger ?? (targets instanceof Element ? targets : undefined);
  return gsap.fromTo(
    targets,
    { "--hex-s": opts.from ?? 0, "--hex-a": `${opts.twist ?? 120}deg` },
    {
      "--hex-s": 1,
      "--hex-a": "0deg",
      duration: 1.7,
      ease: opts.scrub ? "none" : "expo.inOut",
      delay: opts.delay,
      stagger: 0.12,
      scrollTrigger: opts.immediate
        ? undefined
        : opts.scrub
          ? { trigger, start: "top bottom", end: "center 55%", scrub: true }
          : { trigger, start: "top 85%", toggleActions: "play none none none" },
    },
  );
}
