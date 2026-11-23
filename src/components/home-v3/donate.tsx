import { Heart } from "lucide-react";
import { support } from "@/content/home";
import { closing, links, partnership } from "@/content/home-v3";
import { CtaLink } from "./cta-link";
import { RevealSection } from "./reveal";

/** v3 closing call to action: one place to give or partner. */
export function DonateV3() {
  return (
    <RevealSection id="donate" aria-labelledby="donate-heading-v3" className="scroll-mt-20 py-20 md:py-28">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-3xl bg-brand px-6 py-14 text-center text-primary-foreground md:px-16 md:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-highlight/25 blur-3xl"
          />
          <span data-reveal className="mx-auto grid size-14 place-items-center rounded-full bg-highlight text-foreground">
            <Heart className="size-6 fill-current" aria-hidden />
          </span>
          <h2
            data-reveal
            id="donate-heading-v3"
            className="mx-auto mt-6 max-w-3xl text-[clamp(2.25rem,5vw,4rem)] leading-[1.02] font-extrabold tracking-[-0.03em]"
          >
            {closing.heading}
          </h2>
          <p data-reveal className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/85 md:text-xl">
            {closing.body} {support.body}
          </p>
          <div data-reveal className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <CtaLink href={links.donate} className="bg-highlight text-foreground hover:bg-white">
              {support.cta.label}
            </CtaLink>
            <CtaLink
              variant="secondary"
              href="#partner"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:border-primary-foreground"
            >
              {partnership.eyebrow}
            </CtaLink>
          </div>
          <p data-reveal className="mx-auto mt-8 max-w-xl text-sm text-primary-foreground/70">
            {support.note}
          </p>
        </div>
      </div>
    </RevealSection>
  );
}
