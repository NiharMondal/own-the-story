"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { programs } from "@/content/home";
import { photos } from "@/content/photos";
import { flipChars, gsap, shutterIn, useSectionMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { hexIris } from "./aperture";

const PHOTOS = [photos.cinemaAudience, photos.gimbalSmile, photos.classroom, photos.cinemaScreen];

/**
 * v7 programs: "honeycomb".
 * Four hexagonal cells, locked together on wide screens and zig-zagging down
 * on narrow ones. Each cell is a card with two faces: hover, focus or tap it
 * and it turns over to show what the program is. Both faces are always in the
 * accessibility tree, so nothing is hidden from screen readers.
 */
export function ProgramsV7() {
  const root = useRef<HTMLElement>(null);
  const [flipped, setFlipped] = useState<number | null>(null);

  useSectionMotion(root, (el) => {
    const q = gsap.utils.selector(el);
    shutterIn(q(".eyebrow, [data-shutter]"), { trigger: el, stagger: 0.1 });
    flipChars(q("h2")[0]);
    q("[data-front]").forEach((face, i) => hexIris(face, { trigger: q("[data-cell]")[i], delay: (i % 2) * 0.15 }));
  });

  return (
    <section id="programs" ref={root} aria-labelledby="programs-heading-v7" className="scroll-mt-20 bg-secondary py-24 md:py-36">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">{programs.eyebrow}</p>
            <h2
              id="programs-heading-v7"
              className="font-display mt-5 max-w-3xl text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.98] font-bold tracking-[-0.04em]"
            >
              {programs.heading}
            </h2>
          </div>
          <p data-shutter className="font-mono text-sm text-muted-foreground">
            Hover or tap a cell to turn it over.
          </p>
        </div>

        <ol className="mx-auto mt-14 max-w-5xl lg:relative lg:mt-20 lg:aspect-[1.2372]">
          {programs.items.map((item, i) => {
            const open = flipped === i;
            return (
              <li
                key={item.title}
                data-cell
                style={{ "--x": `${i * 20}%`, "--y": i % 2 ? "42.857%" : "0%" } as React.CSSProperties}
                className={cn(
                  "aspect-[0.866] w-[66%] p-[1.5%] perspective-[1400px] even:ml-auto not-first:-mt-[17%]",
                  "lg:absolute lg:top-(--y) lg:left-(--x) lg:m-0 lg:w-[40%] lg:p-[0.8%] lg:not-first:mt-0 lg:even:ml-0",
                )}
              >
                <button
                  type="button"
                  aria-pressed={open}
                  onClick={() => setFlipped(open ? null : i)}
                  className="group block size-full text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                >
                  <span
                    className={cn(
                      "relative block size-full transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] transform-3d group-hover:rotate-y-180 group-focus-visible:rotate-y-180",
                      open && "rotate-y-180",
                    )}
                  >
                    <span data-front className="hex absolute inset-0 block bg-foreground backface-hidden">
                      <Image src={PHOTOS[i]} alt="" fill sizes="(min-width: 1024px) 26rem, 66vw" className="object-cover" />
                      <span aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgb(15_18_24/0.85),rgb(15_18_24/0.1)_65%)]" />
                      <span className="absolute inset-x-[16%] bottom-[24%] block text-center text-white">
                        <span className="block font-mono text-xs tracking-[0.2em] text-white/75">0{i + 1}</span>
                        <span className="font-display mt-2 block text-lg leading-tight font-bold tracking-[-0.02em] sm:text-2xl lg:text-[1.75rem]">
                          {item.title}
                        </span>
                      </span>
                    </span>
                    <span className="hex absolute inset-0 grid rotate-y-180 place-content-center gap-2 bg-brand px-[17%] text-center text-primary-foreground backface-hidden sm:gap-3">
                      <span className="font-mono text-xs tracking-[0.2em] opacity-80">0{i + 1}</span>
                      <span className="font-display text-base leading-tight font-bold sm:text-xl lg:text-2xl">{item.title}</span>
                      <span className="text-[0.8rem] leading-snug sm:text-base sm:leading-relaxed">{item.body}</span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
