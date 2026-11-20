"use client";

import { useRef } from "react";
import { formatNumber, impact } from "@/content/home";
import { gsap, useSectionMotion } from "@/lib/motion";

// Each digit sits on a reel of 0–9 twice over, so every digit spins a full turn before landing.
const REEL = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const STEP = 100 / REEL.length;
const landing = (digit: number) => -(10 + digit) * STEP;

function Odometer({ value }: { value: number }) {
  const text = formatNumber(value);
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-flex">
        {[...text].map((ch, i) =>
          /\d/.test(ch) ? (
            <span key={i} className="inline-block h-[1em] overflow-hidden">
              {/* Rendered already landed, so the number is right without JavaScript. */}
              <span
                data-reel
                data-digit={ch}
                className="flex flex-col"
                style={{ transform: `translateY(${landing(Number(ch))}%)` }}
              >
                {REEL.map((d, j) => (
                  <span key={j} className="block h-[1em]">
                    {d}
                  </span>
                ))}
              </span>
            </span>
          ) : (
            <span key={i}>{ch}</span>
          ),
        )}
      </span>
    </>
  );
}

/**
 * v2 impact — "slot reels".
 * The page itself warms from the page color to the brand color as the section scrolls in, then
 * every digit spins like an odometer and settles on its value.
 */
export function ImpactV2() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    const q = gsap.utils.selector(el);

    // Sweep from the page color to gold, reading the live theme tokens.
    const tokens = getComputedStyle(el);
    const page = tokens.getPropertyValue("--background").trim();
    gsap.fromTo(
      q("[data-panel]"),
      { backgroundColor: page, color: tokens.getPropertyValue("--foreground").trim() },
      {
        backgroundColor: tokens.getPropertyValue("--brand").trim(),
        color: page,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 85%", end: "top 30%", scrub: true },
      },
    );

    gsap.from(q("[data-stat]"), {
      y: 80,
      autoAlpha: 0,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.12,
      scrollTrigger: { trigger: el, start: "top 60%", toggleActions: "play none none none" },
    });

    gsap.fromTo(
      q("[data-reel]"),
      { y: 0, yPercent: 0 },
      {
        y: 0,
        yPercent: (_i: number, reel: HTMLElement) => landing(Number(reel.dataset.digit)),
        duration: (i: number) => 2 + i * 0.12,
        ease: "power4.inOut",
        scrollTrigger: { trigger: el, start: "top 60%", toggleActions: "play none none none" },
      },
    );

    gsap.from(q("[data-note]"), {
      autoAlpha: 0,
      duration: 1,
      delay: 1.6,
      scrollTrigger: { trigger: el, start: "top 60%", toggleActions: "play none none none" },
    });
  });

  return (
    <section ref={root} aria-labelledby="impact-heading-v2">
      <div data-panel className="bg-brand py-24 text-background md:py-36">
        <div className="container-site">
          <h2 id="impact-heading-v2" className="eyebrow text-current!">
            {impact.heading}
          </h2>
          <dl className="mt-12 grid gap-12 sm:grid-cols-3">
            {impact.stats.map((stat) => (
              <div key={stat.label} data-stat className="flex flex-col-reverse">
                <dt className="mt-3 text-lg md:text-xl">{stat.label}</dt>
                <dd className="font-condensed text-[clamp(4.5rem,9vw,8.5rem)] leading-none font-extrabold tabular-nums">
                  <Odometer value={stat.value} />
                </dd>
              </div>
            ))}
          </dl>
          <p data-note className="mt-14 text-sm font-medium">
            {impact.note}
          </p>
        </div>
      </div>
    </section>
  );
}
