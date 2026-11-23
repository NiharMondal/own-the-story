import { RevealSection } from "@/components/home-v3/reveal";
import { CountUp } from "@/components/site/count-up";
import { impact } from "@/content/home";

/** v4 impact: "box office". Three figures ruled off like a scoreboard. */
export function ImpactV4() {
  return (
    <RevealSection aria-labelledby="impact-heading-v4" className="border-y border-border bg-card">
      <div className="container-site">
        <h2 id="impact-heading-v4" data-reveal className="eyebrow pt-10">
          {impact.heading}
        </h2>
        <dl className="grid divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {impact.stats.map((stat) => (
            <div key={stat.label} data-reveal className="flex flex-col-reverse py-10 md:px-10 md:py-14 md:first:pl-0">
              <dt className="mt-2 text-sm font-semibold tracking-[0.14em] text-muted-foreground uppercase">{stat.label}</dt>
              <dd className="font-display text-[clamp(5rem,11vw,10rem)] leading-[0.85] text-brand tabular-nums">
                <CountUp value={stat.value} />
              </dd>
            </div>
          ))}
        </dl>
        <p data-reveal className="pb-8 text-xs text-muted-foreground">
          {impact.note}
        </p>
      </div>
    </RevealSection>
  );
}
