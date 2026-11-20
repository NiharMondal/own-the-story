"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { mission } from "@/content/home";
import { fadeUp, gsap, SplitText, useSectionMotion } from "@/lib/motion";

export function Mission() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    const heading = el.querySelector("h2");
    fadeUp(el.querySelector(".eyebrow"), { trigger: el });

    // Apple-style read-along: each word brightens as it scrolls through the viewport.
    const split = SplitText.create(heading, { type: "words" });
    gsap.fromTo(
      split.words,
      { opacity: 0.14 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: { trigger: heading, start: "top 80%", end: "bottom 45%", scrub: true },
      },
    );

    fadeUp(el.querySelectorAll("[data-fade]"), { trigger: el.querySelector("[data-fade]"), stagger: 0.15 });
  });

  return (
    <section id="about" ref={root} className="scroll-mt-20 py-28 md:py-44">
      <div className="container-site max-w-[66rem]">
        <p className="eyebrow">{mission.eyebrow}</p>
        <h2 className="mt-6 text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.1] font-bold tracking-[-0.025em]">
          {mission.statement}
        </h2>
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p data-fade className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-[1.35rem]">
            {mission.body}
          </p>
          <a
            data-fade
            href={mission.link.href}
            className="group inline-flex items-center gap-2 self-start font-semibold text-slate-300 transition-colors hover:text-white md:self-auto"
          >
            {mission.link.label}
            <ArrowRight className="size-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
