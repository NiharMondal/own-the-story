"use client";

import { useRef } from "react";
import { Media } from "@/components/site/media";
import { support } from "@/content/home";
import { links } from "@/content/home-v3";
import { photos } from "@/content/photos";
import { flipChars, gsap, shutterIn, useSectionMotion } from "@/lib/motion";
import { hexIris } from "./aperture";
import { ShutterLink } from "./shutter-link";

/**
 * v7 support: a red chamfered plate. The hexagonal photo in it is an aperture
 * that stops open as the panel scrolls up the screen.
 */
export function SupportV7() {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    const q = gsap.utils.selector(el);
    flipChars(q("h2")[0], { stagger: 0.03 });
    shutterIn(q("[data-shutter]"), { trigger: el, delay: 0.3, stagger: 0.1 });
    hexIris(q("[data-hex]")[0], { scrub: true, from: 0.35, twist: 90 });
  });

  return (
    <section ref={root} id="donate" aria-labelledby="donate-heading-v7" className="scroll-mt-20 py-24 md:py-32">
      <div className="container-site">
        <div className="grid items-center gap-12 bg-brand px-6 py-14 text-primary-foreground chamfer [--cut:2rem] md:px-14 md:py-20 md:[--cut:4rem] lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2
              id="donate-heading-v7"
              className="font-display text-[clamp(2rem,5.4vw,5rem)] leading-[0.95] font-extrabold tracking-[-0.045em]"
            >
              {support.title[0]} {support.title[1]}.
            </h2>
            <p data-shutter className="mt-7 max-w-xl text-lg leading-relaxed font-medium md:text-xl">
              {support.body}
            </p>
            <div data-shutter className="mt-9">
              <ShutterLink variant="ink" href={links.donate}>
                {support.cta.label}
              </ShutterLink>
            </div>
            <p data-shutter className="mt-8 max-w-md text-sm font-medium opacity-85">
              {support.note}
            </p>
          </div>

          <div data-hex className="hex relative mx-auto w-full max-w-xs lg:max-w-sm">
            <Media
              src={photos.fiveFromAbove}
              alt="Five young people looking up at the camera"
              sizes="24rem"
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
