"use client";

import { useRef } from "react";
import { fadeUp, useSectionMotion } from "@/lib/motion";

type RevealSectionProps = React.ComponentProps<"section"> & {
  /** Play on mount instead of on scroll (for the hero). */
  immediate?: boolean;
};

/**
 * v3 keeps motion quiet: every `[data-reveal]` child simply drifts up and
 * fades in once, in reading order. Reduced-motion users see it all at once.
 * Being a client wrapper lets the sections themselves stay server components.
 */
export function RevealSection({ immediate, children, ...props }: RevealSectionProps) {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    const items = el.querySelectorAll("[data-reveal]");
    if (items.length) fadeUp(items, { trigger: el, immediate, stagger: 0.08, y: 24, delay: immediate ? 0.2 : 0 });
  });

  return (
    <section ref={root} {...props}>
      {children}
    </section>
  );
}
