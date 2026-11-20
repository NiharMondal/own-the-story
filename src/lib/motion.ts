"use client";

import { type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** Long, soft deceleration — the feel of Apple's product pages. */
export const EASE = "expo.out";

export { gsap, ScrollTrigger, SplitText, useGSAP };

/*
 * Reveals play once via toggleActions "play none none none", never `once: true`.
 * A `once` trigger deletes itself from ScrollTrigger's list the moment it fires;
 * on a page loaded already scrolled down that can happen in the middle of another
 * trigger's setup, which then reads past the shortened list and throws
 * "Cannot read properties of undefined (reading 'end')".
 */

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * useGSAP scoped to a section, skipped entirely for reduced-motion users
 * (content is fully visible by default, so skipping is safe).
 */
export function useSectionMotion(
  scope: RefObject<HTMLElement | null>,
  animate: (root: HTMLElement) => void | (() => void),
) {
  useGSAP(
    () => {
      if (!scope.current || prefersReducedMotion()) return;
      return animate(scope.current);
    },
    { scope },
  );
}

type RevealOptions = {
  /** Element that starts the reveal when it enters the viewport. Defaults to the target. */
  trigger?: Element | null;
  delay?: number;
  /** Play immediately instead of on scroll (used in the hero intro). */
  immediate?: boolean;
};

/** Headline lines rise from behind a mask, one after another. */
export function revealLines(target: Element | null, opts: RevealOptions = {}) {
  if (!target) return;
  SplitText.create(target, {
    type: "lines",
    linesClass: "split-line",
    mask: "lines",
    autoSplit: true,
    onSplit: (self) =>
      gsap.from(self.lines, {
        yPercent: 115,
        duration: 1.5,
        ease: EASE,
        stagger: 0.12,
        delay: opts.delay,
        scrollTrigger: opts.immediate
          ? undefined
          : { trigger: opts.trigger ?? target, start: "top 85%", toggleActions: "play none none none" },
      }),
  });
}

/*
 * Reveals use fromTo with explicit end values: reading end values from computed
 * style (what from() does) breaks on elements with CSS transitions, such as the
 * shadcn buttons, whose computed opacity can be mid-transition at that moment.
 */

/** Elements drift up and fade in, staggered. */
export function fadeUp(
  targets: gsap.TweenTarget,
  opts: RevealOptions & { stagger?: number; y?: number } = {},
) {
  return gsap.fromTo(targets, { y: opts.y ?? 40, autoAlpha: 0 }, {
    y: 0,
    autoAlpha: 1,
    duration: 1.3,
    ease: EASE,
    stagger: opts.stagger ?? 0.1,
    delay: opts.delay,
    scrollTrigger:
      opts.immediate || !opts.trigger
        ? undefined
        : { trigger: opts.trigger, start: "top 85%", toggleActions: "play none none none" },
  });
}

/**
 * Image cards: the frame wipes open from the bottom while the picture
 * inside settles from a slight zoom.
 */
export function revealMedia(frames: Element[], opts: RevealOptions & { stagger?: number } = {}) {
  frames.forEach((frame, i) => {
    const inner = frame.querySelector("[data-media-inner]");
    const tl = gsap.timeline({
      delay: (opts.delay ?? 0) + i * (opts.stagger ?? 0.12),
      scrollTrigger: { trigger: opts.trigger ?? frame, start: "top 85%", toggleActions: "play none none none" },
    });
    tl.fromTo(
      frame,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" },
    );
    if (inner) tl.from(inner, { scale: 1.35, duration: 2, ease: EASE }, 0);
  });
}

/** Letters surface in random order — a quieter, typographic reveal. */
export function scatterChars(target: Element | null, opts: RevealOptions = {}) {
  if (!target) return;
  const split = SplitText.create(target, { type: "words,chars" });
  return gsap.from(split.chars, {
    autoAlpha: 0,
    yPercent: 40,
    duration: 0.9,
    ease: "power3.out",
    stagger: { each: 0.02, from: "random" },
    delay: opts.delay,
    scrollTrigger: opts.immediate ? undefined : { trigger: opts.trigger ?? target, start: "top 85%", toggleActions: "play none none none" },
  });
}

/** Elements come into focus: blur clears while they drift into place. */
export function blurIn(
  targets: gsap.TweenTarget,
  opts: RevealOptions & { stagger?: number; x?: number; y?: number } = {},
) {
  return gsap.fromTo(targets, { autoAlpha: 0, filter: "blur(14px)", x: opts.x ?? 0, y: opts.y ?? 24 }, {
    autoAlpha: 1,
    filter: "blur(0px)",
    x: 0,
    y: 0,
    duration: 1.4,
    ease: EASE,
    stagger: opts.stagger ?? 0.1,
    delay: opts.delay,
    clearProps: "filter",
    scrollTrigger:
      opts.immediate || !opts.trigger ? undefined : { trigger: opts.trigger, start: "top 85%", toggleActions: "play none none none" },
  });
}
