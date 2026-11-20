"use client";

import { useRef } from "react";
import { formatNumber as format, impact } from "@/content/home";
import { fadeUp, gsap, useSectionMotion } from "@/lib/motion";

export function Impact() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    // The gold panel opens out from an inset card to full bleed.
    gsap.fromTo(
      el.querySelector("[data-panel]"),
      { clipPath: "inset(7% 5% 7% 5% round 28px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "top 15%", scrub: true },
      },
    );

    fadeUp(el.querySelector(".eyebrow"), { trigger: el, delay: 0.1 });
    fadeUp(el.querySelectorAll("[data-stat]"), { trigger: el, delay: 0.2, stagger: 0.12, y: 60 });

    gsap.utils.toArray<HTMLElement>("[data-count]", el).forEach((node) => {
      const target = Number(node.dataset.count);
      const counter = { value: 0 };
      node.textContent = "0";
      gsap.to(counter, {
        value: target,
        duration: 2.4,
        ease: "expo.out",
        delay: 0.3,
        scrollTrigger: { trigger: node, start: "top 85%", toggleActions: "play none none none" },
        onUpdate: () => {
          node.textContent = format(counter.value);
        },
      });
    });

    fadeUp(el.querySelector("[data-note]"), { trigger: el, delay: 0.6 });
  });

  return (
    <section ref={root} aria-labelledby="impact-heading">
      <div data-panel className="bg-gold py-24 text-[#0a0a0a] md:py-36">
        <div className="container-site">
          <h2 id="impact-heading" className="eyebrow text-[#0a0a0a]!">
            {impact.heading}
          </h2>
          <dl className="mt-12 grid gap-12 sm:grid-cols-3">
            {impact.stats.map((stat) => (
              <div key={stat.label} data-stat className="flex flex-col-reverse">
                <dt className="mt-3 text-lg md:text-xl">{stat.label}</dt>
                <dd
                  data-count={stat.value}
                  className="font-condensed text-[clamp(4.5rem,9vw,8.5rem)] leading-[0.85] font-extrabold tabular-nums"
                >
                  {format(stat.value)}
                </dd>
              </div>
            ))}
          </dl>
          <p data-note className="mt-14 text-sm font-medium">
            {impact.note}
          </p>
        </div>
      </div>
    </section>
  );
}
