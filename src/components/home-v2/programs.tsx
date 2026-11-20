"use client";

import { useRef } from "react";
import { Media } from "@/components/site/media";
import { programs } from "@/content/home";
import { blurIn, gsap, scatterChars, useSectionMotion } from "@/lib/motion";

/**
 * v2 programs — "filmstrip".
 * Desktop: the section pins and the four cards travel sideways as you scroll,
 * each picture panning inside its frame; a gold bar tracks progress.
 * Smaller screens: cards stack and focus in.
 */
export function ProgramsV2() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    const q = gsap.utils.selector(el);
    const track = q("[data-track]")[0] as HTMLElement;
    const lane = track.parentElement as HTMLElement;

    blurIn(q(".eyebrow"), { trigger: el });
    scatterChars(q("h2")[0]);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Travel until the last card's edge lines up with the right content margin.
      const distance = () => {
        const inset = lane.getBoundingClientRect().left + parseFloat(getComputedStyle(lane).paddingLeft);
        return Math.max(0, track.scrollWidth - (window.innerWidth - inset * 2));
      };

      const travel = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      travel
        .to(track, { x: () => -distance(), ease: "none" }, 0)
        .fromTo(q("[data-progress]"), { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);

      q("[data-card]").forEach((card) => {
        gsap.fromTo(
          card.querySelector("[data-media-inner]"),
          { xPercent: -12, scale: 1.3 },
          {
            xPercent: 12,
            scale: 1.3,
            ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: travel, start: "left right", end: "right left", scrub: true },
          },
        );
      });

      blurIn(q("[data-card]"), { trigger: el, x: 120, y: 0, stagger: 0.1, delay: 0.2 });
    });

    mm.add("(max-width: 1023px)", () => {
      q("[data-card]").forEach((card) => blurIn(card, { trigger: card, y: 40 }));
    });
  });

  return (
    <section id="programs" ref={root} className="py-28 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:overflow-hidden lg:py-0">
      <div className="container-site flex items-end justify-between gap-8">
        <div>
          <p className="eyebrow">{programs.eyebrow}</p>
          <h2 className="mt-5 text-[clamp(2.25rem,4.6vw,3.75rem)] leading-[1.05] font-bold tracking-[-0.03em]">
            {programs.heading}
          </h2>
        </div>
        <div aria-hidden className="mb-4 hidden h-0.5 w-48 shrink-0 bg-white/15 lg:block">
          <div data-progress className="h-full origin-left bg-gold" />
        </div>
      </div>

      <div className="container-site mt-12 lg:mt-14">
        <ol data-track className="grid gap-12 sm:grid-cols-2 lg:flex lg:w-max lg:gap-8">
          {programs.items.map((item, i) => (
            <li key={item.title} data-card className="group lg:w-[38vw] lg:max-w-[36rem]">
              <Media tone={item.tone} hoverZoom className="aspect-[4/5] lg:aspect-[4/3]" />
              <div className="mt-6 flex gap-5">
                <p className="font-condensed text-5xl leading-none font-extrabold text-gold">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.01em] md:text-[1.4rem]">{item.title}</h3>
                  <p className="mt-2 max-w-md leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
