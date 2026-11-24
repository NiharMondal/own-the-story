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

/*
 * v7 "aperture" vocabulary: nothing fades. Things are uncovered by a shutter,
 * opened by an iris, or flipped over like the letters on a departures board.
 */

// A slanted blade: zero width at the left edge, then sweeping past the right.
const SHUTTER_SHUT = "polygon(-15% 0%, -15% 0%, -30% 100%, -30% 100%)";
const SHUTTER_OPEN = "polygon(-15% 0%, 115% 0%, 100% 100%, -30% 100%)";

/** A slanted shutter blade sweeps across and uncovers each element. */
export function shutterIn(targets: gsap.TweenTarget, opts: RevealOptions & { stagger?: number } = {}) {
  return gsap.fromTo(
    targets,
    { clipPath: SHUTTER_SHUT, x: -16 },
    {
      clipPath: SHUTTER_OPEN,
      x: 0,
      duration: 1.15,
      ease: "power4.inOut",
      stagger: opts.stagger ?? 0.09,
      delay: opts.delay,
      clearProps: "clipPath,transform",
      scrollTrigger:
        opts.immediate || !opts.trigger
          ? undefined
          : { trigger: opts.trigger, start: "top 85%", toggleActions: "play none none none" },
    },
  );
}

/** Letters flip down into place one by one, like a split-flap board. */
export function flipChars(target: Element | null, opts: RevealOptions & { stagger?: number } = {}) {
  if (!target) return;
  SplitText.create(target, {
    type: "words,chars",
    autoSplit: true,
    onSplit: (self) => {
      gsap.set(self.words, { perspective: 600 });
      return gsap.fromTo(
        self.chars,
        { rotationX: -100, autoAlpha: 0, transformOrigin: "50% 50% -0.3em" },
        {
          rotationX: 0,
          autoAlpha: 1,
          duration: 1.1,
          ease: "back.out(1.5)",
          stagger: opts.stagger ?? 0.022,
          delay: opts.delay,
          scrollTrigger: opts.immediate
            ? undefined
            : { trigger: opts.trigger ?? target, start: "top 85%", toggleActions: "play none none none" },
        },
      );
    },
  });
}

/**
 * A round iris opens over each frame while the picture inside untwists, like
 * a lens being focused.
 */
export function irisOpen(frames: Element[], opts: RevealOptions & { stagger?: number } = {}) {
  frames.forEach((frame, i) => {
    const inner = frame.querySelector("[data-media-inner]");
    const tl = gsap.timeline({
      delay: (opts.delay ?? 0) + i * (opts.stagger ?? 0.14),
      scrollTrigger: opts.immediate
        ? undefined
        : { trigger: opts.trigger ?? frame, start: "top 85%", toggleActions: "play none none none" },
    });
    tl.fromTo(
      frame,
      { clipPath: "circle(0% at 50% 50%)" },
      { clipPath: "circle(75% at 50% 50%)", duration: 1.5, ease: "expo.inOut", clearProps: "clipPath" },
    );
    if (inner) tl.fromTo(inner, { scale: 1.3, rotation: -10 }, { scale: 1, rotation: 0, duration: 2, ease: EASE }, 0);
  });
}
