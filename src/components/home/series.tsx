"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Media } from "@/components/site/media";
import { series } from "@/content/home";
import { fadeUp, gsap, revealLines, revealMedia, useSectionMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Series() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    const grid = el.querySelector("[data-grid]");
    fadeUp(el.querySelector(".eyebrow"), { trigger: el });
    revealLines(el.querySelector("h2"));
    fadeUp(el.querySelector("[data-view-all]"), { trigger: el, delay: 0.4 });
    revealMedia(gsap.utils.toArray<Element>("[data-media]", el), { trigger: grid, stagger: 0.14 });
    fadeUp(el.querySelectorAll("[data-copy]"), { trigger: grid, delay: 0.5, stagger: 0.14 });
  });

  return (
    <section id="series" ref={root} className="scroll-mt-20 py-28 md:py-40">
      <div className="container-site">
        <p className="eyebrow">{series.eyebrow}</p>
        <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-3xl text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.05] font-bold tracking-[-0.03em]">
            {series.heading}
          </h2>
          <a
            data-view-all
            href={series.viewAll.href}
            className="group inline-flex shrink-0 items-center gap-2 font-semibold text-slate-300 transition-colors hover:text-white"
          >
            {series.viewAll.label}
            <ArrowRight className="size-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5" />
          </a>
        </div>

        <ol data-grid className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-3">
          {series.parts.map((part, i) => (
            <li key={part.title} className={cn("group", part.comingSoon && "pointer-events-none")}>
              <Media tone={part.tone} hoverZoom={!part.comingSoon} className="aspect-[16/9]">
                {part.comingSoon && (
                  <div className="absolute inset-0 grid place-items-center bg-black/65">
                    <span className="eyebrow">Coming soon</span>
                  </div>
                )}
              </Media>
              <div data-copy className={cn("mt-6", part.comingSoon && "opacity-60")}>
                <p className="font-expanded text-sm font-semibold tracking-[0.12em] text-gold uppercase">
                  Part {String(i + 1).padStart(2, "0")} / 12
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.01em] md:text-[1.4rem]">{part.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{part.body}</p>
                <p className="mt-4 text-sm text-muted-foreground">{part.meta}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
