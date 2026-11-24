import { RevealSection } from "@/components/home-v3/reveal";
import { closingStatement } from "@/content/home";
import { cn } from "@/lib/utils";
import type { SectionProps } from "./why-it-matters";

/** The last word before the footer: one sentence, set as large as it will go. */
export function ClosingStatement({ headingClass = "font-bold tracking-[-0.02em]", className, motion }: SectionProps) {
  return (
    <RevealSection motion={motion} aria-labelledby="closing-heading" className={cn("bg-secondary py-28 text-center md:py-40", className)}>
      <div className="container-site">
        <h2
          data-reveal
          id="closing-heading"
          className={cn("mx-auto max-w-6xl text-[clamp(2.5rem,6.5vw,6rem)] leading-[0.98]", headingClass)}
        >
          {closingStatement.text[0]} <span className="text-brand">{closingStatement.text[1]}</span>
        </h2>
        <div data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <a
            href={closingStatement.primaryCta.href}
            className="inline-flex h-14 items-center rounded-lg bg-brand px-8 font-semibold text-primary-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
          >
            {closingStatement.primaryCta.label}
          </a>
          <a
            href={closingStatement.secondaryCta.href}
            className="font-semibold underline decoration-brand decoration-2 underline-offset-[6px] hover:text-brand"
          >
            {closingStatement.secondaryCta.label} →
          </a>
        </div>
      </div>
    </RevealSection>
  );
}
