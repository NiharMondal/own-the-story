"use client";

import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { Media } from "@/components/site/media";
import { programs } from "@/content/home";
import { photos } from "@/content/photos";
import { fadeUp, useSectionMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const PHOTOS = [
  { src: photos.projector, alt: "A projector throwing light through a dark room" },
  { src: photos.gimbalSmile, alt: "A young filmmaker smiling as he operates a camera" },
  { src: photos.studentsSelfie, alt: "Students taking a selfie in a lecture hall" },
  { src: photos.cinemaScreen, alt: "An audience facing a cinema screen" },
];

/**
 * v6 programs: "the window".
 * A list on the left, one arched window on the right. Hover, focus or tap a
 * program and it opens, while the window cross-fades to its picture.
 */
export function ProgramsV6() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useSectionMotion(root, (el) => {
    fadeUp(el.querySelectorAll("[data-fade]"), { trigger: el, stagger: 0.08 });
  });

  return (
    <section id="programs" ref={root} aria-labelledby="programs-heading-v6" className="scroll-mt-20 bg-card py-24 md:py-36">
      <div className="container-site">
        <p data-fade className="eyebrow">
          {programs.eyebrow}
        </p>
        <h2
          data-fade
          id="programs-heading-v6"
          className="font-display mt-5 max-w-3xl text-[clamp(2.5rem,5.5vw,5rem)] leading-[1] font-normal tracking-[-0.03em]"
        >
          {programs.heading}
        </h2>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-24">
          <ol data-fade className="border-t border-border">
            {programs.items.map((item, i) => {
              const open = active === i;
              return (
                <li key={item.title} className="border-b border-border">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex w-full items-baseline gap-5 py-6 text-left md:gap-8 md:py-8"
                  >
                    <span className="text-sm text-muted-foreground tabular-nums">0{i + 1}</span>
                    <span className="flex-1">
                      <span
                        className={cn(
                          "font-display block text-[clamp(1.75rem,3.6vw,3.25rem)] leading-none tracking-[-0.02em] transition-colors duration-500",
                          open ? "text-brand italic" : "text-foreground/55 group-hover:text-foreground",
                        )}
                      >
                        {item.title}
                      </span>
                      <span
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-500 ease-out",
                          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <span className="overflow-hidden">
                          <span className="block max-w-lg pt-4 text-lg leading-relaxed text-muted-foreground">
                            {item.body}
                          </span>
                        </span>
                      </span>
                    </span>
                    <Plus
                      aria-hidden
                      className={cn("size-6 shrink-0 self-center transition-[rotate,color] duration-500", open && "rotate-45 text-brand")}
                    />
                  </button>
                </li>
              );
            })}
          </ol>

          <div data-fade className="relative mx-auto aspect-[4/5] w-full max-w-md lg:order-last">
            <div aria-hidden className="absolute -inset-6 rounded-t-full bg-linear-to-b from-brand/30 to-highlight/10 blur-3xl" />
            <div className="relative h-full overflow-hidden rounded-t-full rounded-b-[2rem] border border-brand/40">
              {PHOTOS.map((photo, i) => (
                <Media
                  key={photo.src}
                  src={photo.src}
                  alt={active === i ? photo.alt : ""}
                  sizes="(min-width: 1024px) 28rem, 90vw"
                  className={cn(
                    "absolute inset-0 transition-[opacity,scale] duration-700 ease-out",
                    active === i ? "scale-100 opacity-100" : "scale-110 opacity-0",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
