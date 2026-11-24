"use client";

import { useRef } from "react";
import { partnership } from "@/content/home-v3";
import { EASE, flipChars, gsap, shutterIn, useSectionMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ShutterLink } from "./shutter-link";

/**
 * v7 partnership: three chamfered plates that swing open toward the reader
 * like doors on a hinge. The middle tier is dark.
 */
export function PartnerV7() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    const q = gsap.utils.selector(el);
    shutterIn(q(".eyebrow, [data-shutter]"), { trigger: el, stagger: 0.1 });
    flipChars(q("h2")[0], { stagger: 0.016 });
    gsap.fromTo(
      q("[data-door]"),
      { rotationY: -75, autoAlpha: 0, transformOrigin: "0% 50%" },
      {
        rotationY: 0,
        autoAlpha: 1,
        duration: 1.6,
        ease: EASE,
        stagger: 0.14,
        scrollTrigger: { trigger: q("ul")[0], start: "top 80%", toggleActions: "play none none none" },
      },
    );
  });

  return (
    <section ref={root} id="partner" aria-labelledby="partner-heading-v7" className="scroll-mt-20 bg-secondary py-24 md:py-36">
      <div className="container-site">
        <div className="max-w-3xl">
          <p className="eyebrow">{partnership.eyebrow}</p>
          <h2
            id="partner-heading-v7"
            className="font-display mt-5 text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[0.98] font-bold tracking-[-0.04em]"
          >
            {partnership.heading}
          </h2>
          <p data-shutter className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {partnership.body}
          </p>
        </div>

        <ul className="mt-16 grid gap-6 perspective-[1800px] lg:grid-cols-3">
          {partnership.tiers.map((tier) => (
            <li key={tier.name} data-door>
              <div
                className={cn(
                  "flex h-full flex-col p-8 chamfer [--cut:2rem] md:p-10",
                  tier.featured ? "bg-foreground text-background" : "bg-card",
                )}
              >
                <p className={cn("font-mono text-xs tracking-[0.16em] uppercase", tier.featured ? "text-background/70" : "text-muted-foreground")}>
                  {tier.audience}
                </p>
                <h3 className="font-display mt-2 text-3xl font-bold tracking-[-0.03em]">{tier.name}</h3>
                <p className="font-display mt-6 text-5xl font-bold tracking-[-0.04em] text-brand">{tier.price}</p>
                <p className={cn("mt-5 leading-relaxed", tier.featured ? "text-background/75" : "text-muted-foreground")}>{tier.body}</p>
                <ul className={cn("mt-6 space-y-3 border-t pt-6", tier.featured ? "border-background/20" : "border-border")}>
                  {tier.includes.map((line) => (
                    <li key={line} className="flex items-center gap-3">
                      <span aria-hidden className="hex w-2.5 shrink-0 bg-brand" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <div data-shutter className="mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
          <ShutterLink href={partnership.cta.href}>{partnership.cta.label}</ShutterLink>
          <p className="text-sm text-muted-foreground">{partnership.note}</p>
        </div>
      </div>
    </section>
  );
}
