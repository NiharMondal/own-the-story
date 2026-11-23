"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Media } from "@/components/site/media";
import { support } from "@/content/home";
import { fadeUp, gsap, revealLines, useSectionMotion } from "@/lib/motion";

/**
 * v2 support — "poster".
 * A vermilion block settles into place as it scrolls in, a tilted still swings
 * through it, and the round Donate button is magnetic: it leans toward the cursor.
 */
export function SupportV2() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    const q = gsap.utils.selector(el);
    const magnet = q("[data-magnet]")[0] as HTMLElement;

    gsap.fromTo(
      q("[data-block]"),
      { scale: 0.94, borderRadius: "5rem" },
      {
        scale: 1,
        borderRadius: "2.5rem",
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "top 30%", scrub: true },
      },
    );
    gsap.fromTo(
      q("[data-tilt]"),
      { rotation: -10, yPercent: 14 },
      {
        rotation: 5,
        yPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
    revealLines(q("h2")[0], { trigger: el });
    fadeUp(q("[data-fade]"), { trigger: el, delay: 0.4, stagger: 0.12 });

    const mm = gsap.matchMedia();
    mm.add("(hover: hover) and (pointer: fine)", () => {
      const xTo = gsap.quickTo(magnet, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(magnet, "y", { duration: 0.5, ease: "power3" });
      const move = (e: PointerEvent) => {
        const r = magnet.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      magnet.addEventListener("pointermove", move);
      magnet.addEventListener("pointerleave", leave);
      return () => {
        magnet.removeEventListener("pointermove", move);
        magnet.removeEventListener("pointerleave", leave);
      };
    });
  });

  return (
    <section id="donate" ref={root} className="scroll-mt-20 px-3 md:px-5">
      <div data-block className="relative isolate overflow-hidden rounded-[2.5rem] bg-brand text-primary-foreground">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_85%_15%,rgb(255_255_255/0.16),transparent_60%),radial-gradient(55%_65%_at_5%_100%,rgb(0_0_0/0.28),transparent_70%)]"
        />
        <div className="container-site grid items-center gap-14 py-20 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-[clamp(3.75rem,9vw,8.5rem)] leading-[0.88] font-normal tracking-[-0.03em]">
              {support.title[0]}
              <br />
              <em>{support.title[1]}</em>
            </h2>
            <p data-fade className="mt-8 max-w-xl text-lg leading-relaxed text-primary-foreground/90 md:text-xl">
              {support.body}
            </p>
            <div data-fade className="mt-10 flex flex-wrap items-center gap-8">
              <a
                data-magnet
                href={support.cta.href}
                className="grid size-32 place-items-center rounded-full bg-foreground text-background transition-colors duration-300 hover:bg-background hover:text-foreground md:size-36"
              >
                <span className="flex flex-col items-center gap-1 text-lg font-semibold">
                  {support.cta.label}
                  <ArrowUpRight className="size-5" />
                </span>
              </a>
              <p className="max-w-xs text-sm text-primary-foreground/80">{support.note}</p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div data-tilt className="mx-auto max-w-sm">
              <Media tone={support.tone} className="aspect-[4/5] rounded-[2rem] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
