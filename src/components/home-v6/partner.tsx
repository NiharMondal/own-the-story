import { Check } from "lucide-react";
import { RevealSection } from "@/components/home-v3/reveal";
import { partnership } from "@/content/home-v3";
import { cn } from "@/lib/utils";
import { DuskLink } from "./dusk-link";

/** v6 partnership: three tiers; the middle one is lifted and lit. */
export function PartnerV6() {
  return (
    <RevealSection id="partner" aria-labelledby="partner-heading-v6" className="scroll-mt-20 bg-card py-24 md:py-36">
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center">
          <p data-reveal className="eyebrow">
            {partnership.eyebrow}
          </p>
          <h2
            data-reveal
            id="partner-heading-v6"
            className="font-display mt-5 text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[1] font-normal tracking-[-0.03em]"
          >
            {partnership.heading}
          </h2>
          <p data-reveal className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {partnership.body}
          </p>
        </div>

        <ul className="mt-16 grid items-center gap-6 lg:grid-cols-3">
          {partnership.tiers.map((tier) => (
            <li
              key={tier.name}
              data-reveal
              className={cn(
                "rounded-[2.5rem] p-px",
                tier.featured ? "bg-linear-to-b from-brand to-highlight lg:-my-4" : "bg-border",
              )}
            >
              <div className={cn("flex h-full flex-col rounded-[calc(2.5rem-1px)] bg-background p-8", tier.featured && "lg:py-12")}>
                <p className="text-sm text-muted-foreground">{tier.audience}</p>
                <h3 className="font-display mt-1 text-3xl font-normal tracking-[-0.02em]">{tier.name}</h3>
                <p className="font-display mt-6 text-5xl tracking-[-0.03em] text-brand italic">{tier.price}</p>
                <p className="mt-5 leading-relaxed text-muted-foreground">{tier.body}</p>
                <ul className="mt-6 space-y-3 border-t border-border pt-6">
                  {tier.includes.map((line) => (
                    <li key={line} className="flex items-center gap-3">
                      <Check className="size-4 shrink-0 text-brand" aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-14 flex flex-col items-center gap-4 text-center">
          <DuskLink href={partnership.cta.href}>{partnership.cta.label}</DuskLink>
          <p className="text-sm text-muted-foreground">{partnership.note}</p>
        </div>
      </div>
    </RevealSection>
  );
}
