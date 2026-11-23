import { Check } from "lucide-react";
import { partnership } from "@/content/home-v4";
import { cn } from "@/lib/utils";
import { CtaLink } from "./cta-link";
import { RevealSection } from "./reveal";
import { SectionHeading } from "./section-heading";

/**
 * v4 partnership tiers. On the live site these sit at the bottom of the
 * programs page; schools and sponsors are the main buyers, so here they get
 * a clear, comparable set of cards with the price up front.
 */
export function PartnershipV4() {
  return (
    <RevealSection id="partner" aria-labelledby="partner-heading-v4" className="scroll-mt-20 py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          id="partner-heading-v4"
          eyebrow={partnership.eyebrow}
          heading={partnership.heading}
          body={partnership.body}
        />

        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {partnership.tiers.map((tier) => (
            <li
              key={tier.name}
              data-reveal
              className={cn(
                "relative flex flex-col rounded-2xl border p-7 md:p-8",
                tier.featured ? "border-brand bg-brand text-primary-foreground" : "border-border bg-card",
              )}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-highlight px-3 py-1 text-xs font-bold text-foreground">
                  Most requested
                </span>
              )}
              <p className={cn("text-sm font-semibold", tier.featured ? "text-primary-foreground/80" : "text-brand")}>
                {tier.audience}
              </p>
              <h3 className="mt-2 text-2xl font-bold">{tier.name}</h3>
              <p className="mt-4 text-4xl font-extrabold tracking-[-0.02em]">{tier.price}</p>
              <p className={cn("mt-4 leading-relaxed", tier.featured ? "text-primary-foreground/85" : "text-muted-foreground")}>
                {tier.body}
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check
                      aria-hidden
                      className={cn("mt-0.5 size-5 shrink-0", tier.featured ? "text-highlight" : "text-brand")}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <CtaLink
                variant={tier.featured ? "secondary" : "primary"}
                href={partnership.cta.href}
                aria-label={`${partnership.cta.label}: ${tier.name}`}
                className={cn("mt-8 w-full", tier.featured && "border-transparent hover:bg-highlight")}
              >
                {partnership.cta.label}
              </CtaLink>
            </li>
          ))}
        </ul>
        <p data-reveal className="mt-8 text-center text-muted-foreground">
          {partnership.note}
        </p>
      </div>
    </RevealSection>
  );
}
