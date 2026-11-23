"use client";

import { useRef } from "react";
import { mission } from "@/content/home";
import { fadeUp, gsap, useSectionMotion } from "@/lib/motion";
import { PillLink } from "./pill-link";

const MARKER = "color-mix(in oklab, var(--brand) 28%, transparent)";

/**
 * v3 mission — "highlighter".
 * A brand-tinted marker sweeps under the statement as you scroll. The span
 * stays one inline box (box-decoration-break: slice), so the sweep runs line
 * by line, the way a pen would.
 */
export function MissionV3() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    const q = gsap.utils.selector(el);
    fadeUp(q(".eyebrow"), { trigger: el });
    fadeUp(q("h2"), { trigger: el, y: 50 });
    gsap.fromTo(
      q("[data-mark]"),
      { backgroundSize: "0% 0.3em" },
      {
        backgroundSize: "100% 0.3em",
        ease: "none",
        scrollTrigger: { trigger: q("h2")[0], start: "top 75%", end: "bottom 40%", scrub: true },
      },
    );
    fadeUp(q("[data-fade]"), { trigger: q("[data-fade]")[0], stagger: 0.12 });
  });

  return (
    <section id="about" ref={root} className="scroll-mt-20 py-28 md:py-44">
      <div className="container-site grid gap-8 lg:grid-cols-12 lg:gap-10">
        <p className="eyebrow lg:col-span-3 lg:pt-5">{mission.eyebrow}</p>
        <div className="lg:col-span-9">
          <h2 className="font-serif text-[clamp(2.4rem,5.2vw,4.75rem)] leading-[1.06] font-normal tracking-[-0.02em]">
            <span
              data-mark
              className="bg-no-repeat [box-decoration-break:slice]"
              style={{
                backgroundImage: `linear-gradient(${MARKER}, ${MARKER})`,
                backgroundPosition: "0 88%",
                backgroundSize: "100% 0.3em",
              }}
            >
              {mission.statement}
            </span>
          </h2>
          <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p data-fade className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {mission.body}
            </p>
            <PillLink data-fade variant="ghost" href={mission.link.href} className="self-start md:self-auto">
              {mission.link.label}
            </PillLink>
          </div>
        </div>
      </div>
    </section>
  );
}
