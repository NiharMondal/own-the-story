"use client";

import { useRef } from "react";
import { CountUp } from "@/components/site/count-up";
import { impact } from "@/content/home";
import { gsap, shutterIn, useSectionMotion } from "@/lib/motion";

const TICKS = 60;

/**
 * v7 impact: "dials". Each figure sits in a focus ring: the ring draws itself
 * round while the number counts up, and the tick marks turn with the scroll.
 */
export function ImpactV7() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    const q = gsap.utils.selector(el);
    shutterIn(q("[data-shutter]"), { trigger: el, stagger: 0.1 });
    gsap.fromTo(q("[data-arc]"), { strokeDashoffset: 1 }, {
      strokeDashoffset: 0,
      duration: 2.2,
      ease: "expo.inOut",
      stagger: 0.15,
      scrollTrigger: { trigger: q("dl")[0], start: "top 85%", toggleActions: "play none none none" },
    });
    q("[data-ticks]").forEach((ticks, i) => {
      gsap.fromTo(ticks, { rotation: i % 2 ? 60 : -60, svgOrigin: "100 100" }, {
        rotation: 0,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
  });

  return (
    // A lighter red on the dark band, so the eyebrow keeps its contrast.
    <section
      ref={root}
      aria-labelledby="impact-heading-v7"
      className="overflow-hidden bg-foreground py-24 text-background [--brand:#ff5a62] md:py-32"
    >
      <div className="container-site">
        <h2 id="impact-heading-v7" data-shutter className="eyebrow text-center">
          {impact.heading}
        </h2>
        <dl className="mt-14 grid justify-items-center gap-12 md:grid-cols-3 md:gap-8">
          {impact.stats.map((stat) => (
            <div key={stat.label} className="relative grid aspect-square w-full max-w-[20rem] place-items-center">
              <svg aria-hidden viewBox="0 0 200 200" fill="none" className="absolute inset-0 size-full">
                <g data-ticks className="text-background/35">
                  {Array.from({ length: TICKS }, (_, t) => (
                    <line
                      key={t}
                      x1="100"
                      y1="3"
                      x2="100"
                      y2={t % 5 === 0 ? 12 : 8}
                      stroke="currentColor"
                      strokeWidth={t % 5 === 0 ? 1 : 0.5}
                      transform={`rotate(${(t * 360) / TICKS} 100 100)`}
                    />
                  ))}
                </g>
                <circle cx="100" cy="100" r="84" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
                <circle
                  data-arc
                  cx="100"
                  cy="100"
                  r="84"
                  stroke="var(--brand)"
                  strokeWidth="3"
                  pathLength={1}
                  strokeDasharray="1"
                  strokeDashoffset="0"
                  transform="rotate(-90 100 100)"
                />
              </svg>
              <div className="relative flex flex-col-reverse items-center text-center">
                <dt className="mt-3 font-mono text-xs tracking-[0.18em] text-background/70 uppercase">{stat.label}</dt>
                <dd className="font-display text-[clamp(3rem,6vw,4.75rem)] leading-none font-bold tracking-[-0.04em] tabular-nums">
                  <CountUp value={stat.value} />
                </dd>
              </div>
            </div>
          ))}
        </dl>
        <p data-shutter className="mt-14 text-center text-xs text-background/60">
          {impact.note}
        </p>
      </div>
    </section>
  );
}
