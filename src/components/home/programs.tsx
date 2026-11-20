"use client";

import { useRef } from "react";
import { Media } from "@/components/site/media";
import { programs } from "@/content/home";
import { fadeUp, gsap, revealLines, revealMedia, useSectionMotion } from "@/lib/motion";

export function Programs() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    const grid = el.querySelector("[data-grid]");
    fadeUp(el.querySelector(".eyebrow"), { trigger: el });
    revealLines(el.querySelector("h2"));
    revealMedia(gsap.utils.toArray<Element>("[data-media]", el), { trigger: grid, stagger: 0.12 });
    fadeUp(el.querySelectorAll("[data-copy]"), { trigger: grid, delay: 0.45, stagger: 0.12 });
  });

  return (
    <section id="programs" ref={root} className="scroll-mt-20 pb-28 md:pb-40">
      <div className="container-site">
        <p className="eyebrow">{programs.eyebrow}</p>
        <h2 className="mt-5 text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.05] font-bold tracking-[-0.03em]">
          {programs.heading}
        </h2>

        <ol data-grid className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {programs.items.map((item, i) => (
            <li key={item.title} className="group">
              <Media tone={item.tone} hoverZoom className="aspect-[4/5]" />
              <div data-copy className="mt-6">
                <p className="font-expanded text-sm font-semibold tracking-[0.12em] text-gold">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.01em] md:text-[1.4rem]">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
