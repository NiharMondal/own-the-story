"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Media } from "@/components/site/media";
import { series } from "@/content/home";
import { blurIn, gsap, scatterChars, useSectionMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * v2 series — "dealt hand".
 * The three cards arrive stacked like a deck in the middle and fan out into
 * their columns as you scroll; their text focuses in once they are dealt.
 */
export function SeriesV2() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    const q = gsap.utils.selector(el);
    const grid = q("[data-grid]")[0];

    blurIn(q(".eyebrow"), { trigger: el });
    scatterChars(q("h2")[0]);
    blurIn(q("[data-view-all]"), { trigger: el, x: 30, y: 0, delay: 0.3 });

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const [left, middle, right] = q("[data-media]");
      gsap
        .timeline({ scrollTrigger: { trigger: grid, start: "top 90%", end: "top 35%", scrub: true } })
        .from(left, { xPercent: 104, rotation: -8, scale: 0.86, ease: "power2.out" }, 0)
        .from(right, { xPercent: -104, rotation: 8, scale: 0.86, ease: "power2.out" }, 0)
        .from(middle, { yPercent: 12, scale: 0.92, ease: "power2.out" }, 0);
    });
    mm.add("(max-width: 767px)", () => {
      q("[data-media]").forEach((card) => blurIn(card, { trigger: card }));
    });

    blurIn(q("[data-copy]"), { trigger: grid, delay: 0.4, stagger: 0.12 });
  });

  return (
    <section id="series" ref={root} className="scroll-mt-20 overflow-x-clip py-28 md:py-40">
      <div className="container-site">
        <p className="eyebrow">{series.eyebrow}</p>
        <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-3xl text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.05] font-bold tracking-[-0.03em]">
            {series.heading}
          </h2>
          <a
            data-view-all
            href={series.viewAll.href}
            className="group inline-flex shrink-0 items-center gap-2 font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            {series.viewAll.label}
            <ArrowRight className="size-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5" />
          </a>
        </div>

        <ol data-grid className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-3">
          {series.parts.map((part, i) => (
            <li
              key={part.title}
              className={cn("group", i === 1 && "relative z-10", part.comingSoon && "pointer-events-none")}
            >
              <Media
                tone={part.tone}
                hoverZoom={!part.comingSoon}
                className="aspect-[16/9] shadow-[0_30px_60px_-24px_rgb(16_32_28/0.45)]"
              >
                {part.comingSoon && (
                  <div className="absolute inset-0 grid place-items-center bg-black/65">
                    <span className="eyebrow text-white!">Coming soon</span>
                  </div>
                )}
              </Media>
              <div data-copy className={cn("mt-6", part.comingSoon && "opacity-60")}>
                <p className="font-expanded text-sm font-semibold tracking-[0.12em] text-brand uppercase">
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
