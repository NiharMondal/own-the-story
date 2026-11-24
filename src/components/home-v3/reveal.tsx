"use client";

import { useRef } from "react";
import { fadeUp, shutterIn, useSectionMotion } from "@/lib/motion";

export type RevealMotion = "rise" | "shutter";

type RevealSectionProps = React.ComponentProps<"section"> & {
  /** Play on mount instead of on scroll (for the hero). */
  immediate?: boolean;
  /** "rise": drift up and fade in (default). "shutter": a slanted blade uncovers each item. */
  motion?: RevealMotion;
};

/**
 * v3 keeps motion quiet: every `[data-reveal]` child simply drifts up and
 * fades in once, in reading order. Reduced-motion users see it all at once.
 * Being a client wrapper lets the sections themselves stay server components.
 */
export function RevealSection({ immediate, motion = "rise", children, ...props }: RevealSectionProps) {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    const items = el.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    const delay = immediate ? 0.2 : 0;
    if (motion === "shutter") shutterIn(items, { trigger: el, immediate, delay });
    else fadeUp(items, { trigger: el, immediate, stagger: 0.08, y: 24, delay });
  });

  return (
    <section ref={root} {...props}>
      {children}
    </section>
  );
}
