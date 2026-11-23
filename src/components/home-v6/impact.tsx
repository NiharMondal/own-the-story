import { RevealSection } from "@/components/home-v3/reveal";
import { CountUp } from "@/components/site/count-up";
import { impact } from "@/content/home";

/** v6 impact: three overlapping rings, like lens flares. */
export function ImpactV6() {
  return (
    <RevealSection aria-labelledby="impact-heading-v6" className="overflow-hidden py-24 md:py-36">
      <div className="container-site text-center">
        <h2 id="impact-heading-v6" data-reveal className="eyebrow">
          {impact.heading}
        </h2>
        <dl className="mt-14 flex flex-col items-center md:flex-row md:justify-center">
          {impact.stats.map((stat) => (
            <div
              key={stat.label}
              data-reveal
              className="-my-5 flex aspect-square w-[min(78vw,22rem)] flex-col-reverse items-center justify-center rounded-full border border-brand/45 bg-brand/[0.04] md:-mx-5 md:my-0 md:w-[34%] md:max-w-[24rem] even:border-highlight/50 even:bg-highlight/[0.05]"
            >
              <dt className="mt-2 text-muted-foreground">{stat.label}</dt>
              <dd className="font-display bg-linear-to-r from-brand to-highlight bg-clip-text text-[clamp(3.5rem,7vw,6.5rem)] leading-none tracking-[-0.03em] text-transparent tabular-nums">
                <CountUp value={stat.value} />
              </dd>
            </div>
          ))}
        </dl>
        <p data-reveal className="mt-14 text-xs text-muted-foreground">
          {impact.note}
        </p>
      </div>
    </RevealSection>
  );
}
