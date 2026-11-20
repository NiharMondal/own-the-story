"use client";

import { useRef } from "react";
import { footer } from "@/content/home";
import { blurIn, fadeUp, useSectionMotion } from "@/lib/motion";
import { Logo } from "./logo";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "./social-icons";

const SOCIALS = [
  { label: "Facebook", Icon: FacebookIcon },
  { label: "LinkedIn", Icon: LinkedinIcon },
  { label: "Instagram", Icon: InstagramIcon },
];

type SiteFooterProps = {
  /** "rise": columns fade up. "blur": every link focuses in, one after another. */
  motion?: "rise" | "blur";
};

export function SiteFooter({ motion = "rise" }: SiteFooterProps) {
  const root = useRef<HTMLElement>(null);

  useSectionMotion(root, (el) => {
    if (motion === "blur") {
      blurIn(el.querySelectorAll("[data-fade] > :not(ul), [data-fade] li"), { trigger: el, stagger: 0.03, y: 12 });
    } else {
      fadeUp(el.querySelectorAll("[data-fade]"), { trigger: el, stagger: 0.08, y: 30 });
    }
  });

  return (
    <footer id="contact" ref={root} className="scroll-mt-20 pt-4 pb-10">
      <div className="container-site">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_2.6fr]">
          <div data-fade className="max-w-sm">
            <Logo />
            <p className="mt-8 leading-relaxed text-muted-foreground">{footer.blurb}</p>
            <address className="mt-8 leading-relaxed text-muted-foreground not-italic">
              {footer.address[0]}
              <br />
              {footer.address[1]}
              <br />
              <a href={footer.phone.href} className="mt-1 inline-block hover:text-foreground">
                {footer.phone.label}
              </a>
            </address>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {footer.columns.map((col) => (
              <div key={col.title} data-fade>
                <h2 className="font-expanded text-sm font-semibold tracking-[0.14em] uppercase">{col.title}</h2>
                <ul className="mt-6 space-y-4">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div
          data-fade
          className="mt-16 flex flex-col-reverse gap-6 border-t pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-sm text-muted-foreground">{footer.copyright}</p>
          <ul className="flex gap-6">
            {SOCIALS.map(({ label, Icon }) => (
              <li key={label}>
                <a
                  href="#"
                  aria-label={label}
                  className="block text-foreground transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5"
                >
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
