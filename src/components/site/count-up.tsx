"use client";

import { useRef } from "react";
import { formatNumber } from "@/content/home";
import { EASE, gsap, prefersReducedMotion, useGSAP } from "@/lib/motion";

/** A figure that counts up from zero the first time it scrolls into view. */
export function CountUp({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const node = ref.current;
      if (!node || prefersReducedMotion()) return;
      const counter = { value: 0 };
      node.textContent = "0";
      gsap.to(counter, {
        value,
        duration: 2.2,
        ease: EASE,
        scrollTrigger: { trigger: node, start: "top 90%", toggleActions: "play none none none" },
        onUpdate: () => {
          node.textContent = formatNumber(counter.value);
        },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {formatNumber(value)}
    </span>
  );
}
