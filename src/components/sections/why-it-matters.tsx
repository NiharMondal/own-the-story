import { RevealSection } from "@/components/home-v3/reveal";
import { whyItMatters } from "@/content/home";
import { cn } from "@/lib/utils";

export type SectionProps = {
  /** Heading style, so the section speaks in each version's own voice. */
  headingClass?: string;
  className?: string;
};

/**
 * "Images are not neutral." The case for film media literacy as a short list:
 * the heading stays put on the left while the points run down the right.
 */
export function WhyItMatters({ headingClass = "font-bold tracking-[-0.02em]", className }: SectionProps) {
  return (
    <RevealSection aria-labelledby="why-heading" className={cn("bg-secondary py-24 md:py-32", className)}>
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
        <div className="self-start lg:sticky lg:top-28">
          <p data-reveal className="eyebrow">
            {whyItMatters.eyebrow}
          </p>
          <h2 data-reveal id="why-heading" className={cn("mt-4 text-[clamp(2.75rem,6vw,5rem)] leading-[0.95]", headingClass)}>
            {whyItMatters.heading[0]}
            <br />
            {whyItMatters.heading[1]}
          </h2>
        </div>

        <ol className="border-t border-foreground/20">
          {whyItMatters.points.map((point, i) => (
            <li key={point.text} data-reveal className="flex gap-6 border-b border-foreground/20 py-7 md:gap-10 md:py-9">
              <span className="pt-1.5 text-sm font-semibold text-brand tabular-nums">0{i + 1}</span>
              <p className="text-xl leading-snug font-medium md:text-[1.7rem]">
                {point.text} <span className="text-brand">{point.mark}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </RevealSection>
  );
}
