"use client";

import { useRef } from "react";
import { Media, type MediaTone } from "@/components/site/media";
import { programs } from "@/content/home";
import { fadeUp, gsap, revealLines, useSectionMotion } from "@/lib/motion";

const TONES: MediaTone[] = ["sand", "clay", "sage", "stage"];

/**
 * v2 programs — "stacked deck".
 * Each program is a sticky card; the next one slides up over it while the one
 * underneath sinks back and dims, so the four build into a stack.
 */
export function ProgramsV2() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    const q = gsap.utils.selector(el);
    fadeUp(q(".eyebrow"), { trigger: el });
    revealLines(q("h2")[0]);

    const cards = q("[data-stack-card]");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card.querySelector("[data-media-inner]"),
        { yPercent: -8, scale: 1.2 },
        {
          yPercent: 8,
          scale: 1.2,
          ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
        },
      );

      const next = cards[i + 1]?.parentElement;
      if (!next) return;
      const cover = { trigger: next, start: "top bottom", end: "top 25%", scrub: true };
      gsap.to(card, { scale: 0.9, ease: "none", scrollTrigger: cover });
      gsap.to(card.querySelector("[data-dim]"), { opacity: 0.35, ease: "none", scrollTrigger: cover });
    });
  });

  return (
    <section id="programs" ref={root} className="scroll-mt-20 pb-28 md:pb-40">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <p className="eyebrow lg:col-span-3 lg:pt-5">{programs.eyebrow}</p>
          <h2 className="font-serif text-[clamp(2.75rem,6vw,5.5rem)] leading-none font-normal tracking-[-0.025em] lg:col-span-9">
            {programs.heading}
          </h2>
        </div>

        <ol className="mt-16">
          {programs.items.map((item, i) => (
            <li
              key={item.title}
              className="sticky mb-8 last:mb-0 md:mb-[14vh]"
              style={{ top: `calc(5.5rem + ${i} * 1.25rem)` }}
            >
              <article
                data-stack-card
                className="relative grid origin-top overflow-hidden rounded-[2rem] border border-border bg-card p-3 shadow-[0_-16px_40px_-28px_rgb(22_19_15/0.45)] md:grid-cols-2 md:p-4"
              >
                <Media tone={TONES[i % TONES.length]} className="aspect-[4/3] rounded-[1.5rem] md:aspect-auto md:min-h-[26rem]" />
                <div className="flex flex-col justify-between gap-10 p-5 md:p-10">
                  <p className="font-serif text-[clamp(4rem,8vw,7rem)] leading-none text-brand italic">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h3 className="font-serif text-4xl font-normal tracking-[-0.01em] md:text-5xl">{item.title}</h3>
                    <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">{item.body}</p>
                  </div>
                </div>
                <div data-dim aria-hidden className="pointer-events-none absolute inset-0 bg-foreground opacity-0" />
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
