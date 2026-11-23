"use client";

import { useRef } from "react";
import { formatNumber, impact } from "@/content/home";
import { fadeUp, gsap, useSectionMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * v3 impact — "ledger".
 * A rule draws across the page, then large serif figures count up between
 * hairline column dividers.
 */
export function ImpactV3() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    const q = gsap.utils.selector(el);

    gsap.fromTo(
      q("[data-rule]"),
      { scaleX: 0 },
      { scaleX: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 85%", end: "top 45%", scrub: true } },
    );
    fadeUp(q("[data-head]"), { trigger: el, stagger: 0.1 });
    fadeUp(q("[data-stat]"), { trigger: q("dl")[0], stagger: 0.12, y: 60 });

    q("[data-count]").forEach((node) => {
      const target = Number(node.dataset.count);
      const counter = { value: 0 };
      node.textContent = "0";
      gsap.to(counter, {
        value: target,
        duration: 2.2,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: { trigger: node, start: "top 85%", toggleActions: "play none none none" },
        onUpdate: () => {
          node.textContent = formatNumber(counter.value);
        },
      });
    });
  });

  return (
    <section ref={root} aria-labelledby="impact-heading-v3" className="py-24 md:py-36">
      <div className="container-site">
        <div data-rule className="h-px origin-left bg-foreground" />
        <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <h2 data-head id="impact-heading-v3" className="eyebrow">
            {impact.heading}
          </h2>
          <p data-head className="max-w-xs text-sm text-muted-foreground md:text-right">
            {impact.note}
          </p>
        </div>

        <dl className="mt-14 grid sm:grid-cols-3">
          {impact.stats.map((stat, i) => (
            <div
              key={stat.label}
              data-stat
              className={cn(
                "flex flex-col-reverse border-border py-8 sm:py-2",
                i > 0 ? "border-t sm:border-t-0 sm:border-l sm:pl-8" : "sm:pr-8",
              )}
            >
              <dt className="mt-4 text-lg text-muted-foreground">{stat.label}</dt>
              <dd
                data-count={stat.value}
                className="font-serif text-[clamp(5rem,10vw,9.5rem)] leading-[0.9] tracking-[-0.03em] text-brand tabular-nums"
              >
                {formatNumber(stat.value)}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
