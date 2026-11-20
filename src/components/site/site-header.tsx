"use client";

import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { EASE, gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/motion";
import { nav } from "@/content/home";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

const NAV_LINKS = nav.links;

type SiteHeaderProps = {
  /** "stagger": items drop in one by one. "drop": the whole bar slides down once the hero has opened. */
  intro?: "stagger" | "drop";
  /** Overrides the "Partner With Us" button target for pages with their own partner section. */
  cta?: { label: string; href: string };
};

export function SiteHeader({ intro = "stagger", cta = nav.cta }: SiteHeaderProps) {
  const header = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      const el = header.current;
      if (!el) return;

      // Frosted bar once the hero starts to move away.
      ScrollTrigger.create({
        start: 60,
        end: "max",
        toggleClass: { targets: el, className: "is-scrolled" },
      });

      if (prefersReducedMotion()) return;

      const items = el.querySelectorAll("[data-intro]");
      gsap.set(items, { visibility: "visible" });
      if (intro === "drop") {
        gsap.from(el, { yPercent: -100, duration: 1.4, ease: EASE, delay: 1.5 });
      } else {
        gsap.fromTo(
          items,
          { y: -16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.2, ease: EASE, stagger: 0.06, delay: 0.3 },
        );
      }

      // Tuck away while reading down, return the moment the reader scrolls up.
      let hidden = false;
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const hide = self.direction === 1 && self.scroll() > 400 && el.dataset.menuOpen !== "true";
          if (hide === hidden) return;
          hidden = hide;
          gsap.to(el, { yPercent: hide ? -100 : 0, duration: 0.7, ease: "power3.out", overwrite: true });
        },
      });
    },
    { scope: header },
  );

  return (
    <>
      <header
        ref={header}
        data-menu-open={open}
        className="fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-500 [&.is-scrolled]:border-border [&.is-scrolled]:bg-background/70 [&.is-scrolled]:backdrop-blur-xl"
      >
        <div className="container-site flex h-[4.5rem] items-center justify-between gap-6">
          <Logo data-intro />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-[0.95rem]">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href} data-intro>
                  <a
                    href={link.href}
                    aria-current={i === 0 ? "page" : undefined}
                    className="relative py-2 text-foreground/80 transition-colors hover:text-foreground after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.16,1,0.3,1)] hover:after:scale-x-100 aria-[current=page]:text-foreground aria-[current=page]:after:scale-x-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a data-intro href={cta.href} className={cn(buttonVariants({ size: "xl" }), "hidden h-11 sm:inline-flex")}>
              {cta.label}
            </a>
            <button
              data-intro
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center rounded-md text-foreground lg:hidden"
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Lives outside <header>: the header's transform would otherwise trap this fixed layer. */}
      <div
        id="mobile-menu"
        data-open={open}
        inert={!open}
        className="invisible fixed inset-0 z-40 bg-background/95 opacity-0 backdrop-blur-xl transition-[opacity,visibility] duration-500 data-[open=true]:visible data-[open=true]:opacity-100 lg:hidden"
      >
        <nav aria-label="Mobile" className="container-site flex h-full flex-col justify-center gap-2">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${120 + i * 50}ms` : "0ms" }}
              className="font-condensed translate-y-6 text-5xl font-extrabold uppercase opacity-0 transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [[data-open=true]_&]:translate-y-0 [[data-open=true]_&]:opacity-100"
            >
              {link.label}
            </a>
          ))}
          <a
            href={cta.href}
            onClick={() => setOpen(false)}
            className={cn(buttonVariants({ size: "xl" }), "mt-8 self-start")}
          >
            {cta.label}
          </a>
        </nav>
      </div>
    </>
  );
}
