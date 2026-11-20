"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { mission } from "@/content/home";
import { gsap, SplitText, useSectionMotion } from "@/lib/motion";

/**
 * v2 mission — "focus pull".
 * The section pins and the statement comes into focus word by word as you
 * scroll, like a lens being racked; the supporting copy follows once it lands.
 */
export function MissionV2() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    const q = gsap.utils.selector(el);
    const words = SplitText.create(q("h2")[0], { type: "words" }).words;

    gsap
      .timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=140%", pin: true, scrub: true } })
      .from(q(".eyebrow"), { autoAlpha: 0, letterSpacing: "0.6em", duration: 0.3, ease: "power2.out" })
      .fromTo(
        words,
        { opacity: 0.06, filter: "blur(10px)", y: 18 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.35, stagger: 0.06, ease: "power1.out" },
        0.1,
      )
      .from(q("[data-fade]"), { autoAlpha: 0, y: 30, duration: 0.3, stagger: 0.1, ease: "power2.out" })
      .to({}, { duration: 0.2 }); // brief hold before releasing the pin
  });

  return (
    <section id="about" ref={root} className="flex min-h-svh items-center py-28">
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
            className="group inline-flex items-center gap-2 self-start font-semibold text-muted-foreground transition-colors hover:text-foreground md:self-auto"
          >
            {mission.link.label}
            <ArrowRight className="size-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
