"use client";

import { useRef } from "react";
import { Media, type MediaTone } from "@/components/site/media";
import { series } from "@/content/home";
import { EASE, fadeUp, gsap, revealLines, useSectionMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { PillLink } from "./pill-link";

const TONES: MediaTone[] = ["studio", "daylight", "spotlight"];

function ComingSoon() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-black/55">
      <span className="eyebrow text-white!">Coming soon</span>
    </div>
  );
}

/**
 * v2 series — "contents page".
 * The parts read like a table of contents: rules draw in row by row. On
 * desktop a preview of each part floats beside the cursor while you hover,
 * leaning into the direction of travel.
 */
export function SeriesV2() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    const q = gsap.utils.selector(el);
    fadeUp(q(".eyebrow"), { trigger: el });
    revealLines(q("h2")[0]);
    fadeUp(q("[data-view-all]"), { trigger: el, delay: 0.3 });

    q("[data-row]").forEach((row) => {
      gsap
        .timeline({ scrollTrigger: { trigger: row, start: "top 88%", toggleActions: "play none none none" } })
        .fromTo(row.querySelector("[data-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "expo.inOut" })
        .fromTo(
          row.querySelectorAll("[data-cell]"),
          { y: 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1, ease: EASE, stagger: 0.06 },
          0.25,
        );
    });

    const mm = gsap.matchMedia();
    mm.add("(hover: hover) and (pointer: fine) and (min-width: 768px)", () => {
      const list = q("[data-list]")[0] as HTMLElement;
      const preview = q("[data-preview]")[0];
      const frames = q("[data-preview-frame]");
      const rows = q("[data-row]") as HTMLElement[];

      gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0.6, autoAlpha: 0 });
      const xTo = gsap.quickTo(preview, "x", { duration: 0.7, ease: "power3" });
      const yTo = gsap.quickTo(preview, "y", { duration: 0.7, ease: "power3" });
      const tilt = gsap.quickTo(preview, "rotation", { duration: 0.9, ease: "power3" });

      let visible = false;
      let lastX = 0;
      const move = (e: PointerEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
        tilt(gsap.utils.clamp(-10, 10, (e.clientX - lastX) * 0.6));
        lastX = e.clientX;
      };
      const enters = rows.map((_row, i) => (e: PointerEvent) => {
        if (!visible) {
          // Appear under the cursor rather than gliding in from the last spot.
          xTo(e.clientX, e.clientX);
          yTo(e.clientY, e.clientY);
          lastX = e.clientX;
          visible = true;
        }
        gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        frames.forEach((frame, j) => gsap.to(frame, { autoAlpha: j === i ? 1 : 0, duration: 0.35, overwrite: "auto" }));
      });
      const leave = () => {
        visible = false;
        gsap.to(preview, { autoAlpha: 0, scale: 0.6, duration: 0.4, ease: "power3.in", overwrite: "auto" });
      };

      rows.forEach((row, i) => row.addEventListener("pointerenter", enters[i]));
      list.addEventListener("pointermove", move);
      list.addEventListener("pointerleave", leave);
      return () => {
        rows.forEach((row, i) => row.removeEventListener("pointerenter", enters[i]));
        list.removeEventListener("pointermove", move);
        list.removeEventListener("pointerleave", leave);
      };
    });
  });

  return (
    <section id="series" ref={root} className="scroll-mt-20 py-28 md:py-40">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <p className="eyebrow lg:col-span-3 lg:pt-5">{series.eyebrow}</p>
          <div className="flex flex-col gap-8 lg:col-span-9 md:flex-row md:items-end md:justify-between">
            <h2 className="max-w-3xl font-serif text-[clamp(2.75rem,6vw,5.5rem)] leading-none font-normal tracking-[-0.025em]">
              {series.heading}
            </h2>
            <PillLink data-view-all variant="ghost" href={series.viewAll.href} className="shrink-0">
              {series.viewAll.label}
            </PillLink>
          </div>
        </div>

        <ol data-list className="mt-16 border-b border-foreground/25">
          {series.parts.map((part, i) => (
            <li
              key={part.title}
              data-row
              className={cn(
                "group relative grid gap-4 py-8 md:grid-cols-12 md:items-baseline md:gap-6 md:py-10",
                part.comingSoon && "text-muted-foreground",
              )}
            >
              <div data-rule aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-foreground/25" />
              <Media tone={TONES[i % TONES.length]} className="aspect-video rounded-2xl md:hidden">
                {part.comingSoon && <ComingSoon />}
              </Media>
              <p data-cell className="font-expanded text-xs font-semibold tracking-[0.14em] text-brand uppercase md:col-span-2">
                Part {String(i + 1).padStart(2, "0")} / 12
              </p>
              <h3 data-cell className="font-serif text-3xl leading-tight font-normal md:col-span-4 md:text-[2.6rem]">
                <span className="inline-block transition-[translate] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                  {part.title}
                </span>
              </h3>
              <p data-cell className="leading-relaxed text-muted-foreground md:col-span-4">
                {part.body}
              </p>
              <p data-cell className="text-sm text-muted-foreground md:col-span-2 md:text-right">
                {part.meta}
              </p>
            </li>
          ))}
        </ol>
      </div>

      {/* Floating hover preview (desktop pointers only). */}
      <div
        data-preview
        aria-hidden
        className="pointer-events-none invisible fixed top-0 left-0 z-30 hidden aspect-[4/3] w-80 overflow-hidden rounded-[1.25rem] shadow-2xl md:block"
      >
        {series.parts.map((part, i) => (
          <div key={part.title} data-preview-frame className="absolute inset-0" style={{ opacity: i === 0 ? 1 : 0 }}>
            <Media tone={TONES[i % TONES.length]} label={false} className="absolute inset-0">
              {part.comingSoon && <ComingSoon />}
            </Media>
          </div>
        ))}
      </div>
    </section>
  );
}
