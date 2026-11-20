"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { newsletter } from "@/content/home";
import { blurIn, fadeUp, useSectionMotion } from "@/lib/motion";

type NewsletterProps = {
  /** "rise": both columns fade up. "slide": columns glide in from opposite sides out of a blur. */
  motion?: "rise" | "slide";
};

export function Newsletter({ motion = "rise" }: NewsletterProps) {
  const root = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useSectionMotion(root, (el) => {
    const [copy, form] = el.querySelectorAll("[data-fade]");
    if (motion === "slide") {
      blurIn(copy, { trigger: el, x: -60, y: 0 });
      blurIn(form, { trigger: el, x: 60, y: 0, delay: 0.1 });
    } else {
      fadeUp([copy, form], { trigger: el, stagger: 0.12 });
    }
  });

  return (
    <section ref={root} aria-labelledby="newsletter-heading" className="py-24 md:py-32">
      <div className="container-site">
        <div className="grid gap-12 border-b pb-24 md:pb-28 lg:grid-cols-2 lg:gap-24">
          <div data-fade>
            <p className="eyebrow">{newsletter.eyebrow}</p>
            <h2 id="newsletter-heading" className="mt-4 text-2xl font-semibold tracking-[-0.01em] md:text-[1.75rem]">
              {newsletter.heading}
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">{newsletter.body}</p>
          </div>

          <form
            data-fade
            className="rounded-lg border border-border bg-card p-6 md:p-7"
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: send the address to the email provider once one is chosen.
              setSubmitted(true);
            }}
          >
            <label htmlFor="newsletter-email" className="text-sm text-foreground/80">
              Email address
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.org"
                className="h-12 flex-1 rounded-sm border border-input bg-transparent px-4 text-base outline-none placeholder:text-muted-foreground focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/30"
              />
              <Button type="submit" size="xl">
                Subscribe
              </Button>
            </div>
            <p role="status" className="mt-4 text-sm text-muted-foreground">
              {submitted ? (
                "Thanks! Signup isn't connected to an email service yet."
              ) : (
                <>
                  Unsubscribe anytime. Read our{" "}
                  <a href="#privacy" className="underline-offset-4 hover:text-foreground hover:underline">
                    Privacy Policy
                  </a>
                  .
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
