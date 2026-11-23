import { ArrowRight } from "lucide-react";
import { RevealSection } from "@/components/home-v3/reveal";
import { startHere } from "@/content/home";
import { cn } from "@/lib/utils";
import type { SectionProps } from "./why-it-matters";

/** "Young filmmakers start here." A slim band that sends young people to the programs. */
export function StartHere({ headingClass = "font-bold tracking-[-0.02em]", className }: SectionProps) {
  return (
    <RevealSection aria-labelledby="start-heading" className={cn("py-10 md:py-14", className)}>
      <div className="container-site">
        <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-7 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <h2 data-reveal id="start-heading" className={cn("text-[clamp(1.75rem,3.4vw,2.75rem)] leading-none", headingClass)}>
              {startHere.heading}
            </h2>
            <p data-reveal className="mt-3 text-lg text-muted-foreground">
              {startHere.body}
            </p>
          </div>
          <a
            data-reveal
            href={startHere.cta.href}
            className="group inline-flex h-14 shrink-0 items-center gap-2 self-start rounded-lg bg-brand px-7 font-semibold text-primary-foreground transition-colors duration-300 hover:bg-foreground hover:text-background md:self-auto"
          >
            {startHere.cta.label}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </RevealSection>
  );
}
