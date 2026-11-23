"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Media } from "@/components/site/media";
import { programs } from "@/content/home";
import { photos } from "@/content/photos";
import { fadeUp, gsap, useSectionMotion } from "@/lib/motion";
import { SlabLink } from "./slab-link";

const PHOTOS = [
  {
    src: photos.projector,
    alt: "A projector throwing a beam of light",
  },
  { src: photos.youngCameraman, alt: "A young man filming an event" },
  { src: photos.classroom, alt: "Students in a classroom" },
  { src: photos.cinemaScreen, alt: "An audience facing a cinema screen" },
];

/**
 * v4 programs: "the reel".
 * On desktop the section pins and the four programs slide past sideways as you
 * scroll, like frames through a gate. On touch screens it is a swipeable row.
 */
export function ProgramsV4() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    fadeUp(el.querySelectorAll("[data-fade]"), { trigger: el, stagger: 0.1 });

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const track = el.querySelector<HTMLElement>("[data-track]");
      if (!track) return;
      gsap.set(el.querySelector("[data-scroller]"), { overflowX: "hidden" });
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  });

  return (
    <section
      id="programs"
      ref={root}
      aria-labelledby="programs-heading-v4"
      className="scroll-mt-20 overflow-hidden py-24 lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:py-16"
    >
      <div className="container-site flex items-end justify-between gap-6">
        <div>
          <p data-fade className="eyebrow">
            {programs.eyebrow}
          </p>
          <h2
            data-fade
            id="programs-heading-v4"
            className="font-display mt-4 text-[clamp(3rem,7vw,6rem)] leading-[0.9] font-normal uppercase"
          >
            {programs.heading}
          </h2>
        </div>
        <p
          data-fade
          className="hidden items-center gap-2 pb-2 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase lg:flex"
        >
          Keep scrolling <ArrowRight className="size-4" />
        </p>
      </div>

      {/* Scrolls sideways by itself (touch, reduced motion); on desktop GSAP drives the track instead. */}
      <div
        data-scroller
        className="mt-10 snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]"
      >
        <ol
          data-track
          className="flex w-max gap-5 px-6 pb-2 md:px-10 lg:px-[max(2.5rem,calc((100vw-82rem)/2+2.5rem))] lg:will-change-transform"
        >
          {programs.items.map((item, i) => (
            <li
              key={item.title}
              className="group relative w-[78vw] shrink-0 snap-center sm:w-[24rem] lg:w-[27rem]"
            >
              <Media
                src={PHOTOS[i].src}
                alt={PHOTOS[i].alt}
                hoverZoom
                sizes="(min-width: 1024px) 27rem, 78vw"
                className="aspect-[3/4] lg:aspect-auto lg:h-[58svh]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(0deg,rgb(10_10_15/0.92),rgb(10_10_15/0.1)_60%)]"
              />
              <span className="font-display absolute top-4 left-5 text-6xl leading-none text-transparent [-webkit-text-stroke:1.5px_var(--highlight)]">
                0{i + 1}
              </span>
              <div className="absolute inset-x-5 bottom-5 text-white">
                <h3 className="font-display text-4xl leading-none font-normal uppercase md:text-5xl">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-white/85">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
          <li className="flex w-[78vw] shrink-0 snap-center flex-col justify-between bg-brand p-7 text-primary-foreground sm:w-[24rem] lg:w-[27rem]">
            <p className="font-display text-6xl leading-[0.9] uppercase md:text-7xl">
              Your school could be frame 05.
            </p>
            <SlabLink
              href="#contact"
              className="mt-10 self-start bg-highlight text-foreground hover:bg-white"
            >
              Partner with us
            </SlabLink>
          </li>
        </ol>
      </div>
    </section>
  );
}
