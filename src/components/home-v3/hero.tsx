import { Play } from "lucide-react";
import { Media } from "@/components/site/media";
import { formatNumber, impact } from "@/content/home";
import { heroV4 } from "@/content/home-v4";
import { CtaLink } from "./cta-link";
import { RevealSection } from "./reveal";

/**
 * v4 hero: say what this is, who it's for and what to do next, in one screen.
 * Headline + one sentence + two actions on the left, the film still on the
 * right, and the impact figures as a trust strip underneath.
 */
export function HeroV4() {
  return (
    <RevealSection immediate aria-labelledby="hero-heading-v4" className="pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <p data-reveal className="inline-flex items-center gap-2 rounded-full bg-highlight px-3.5 py-1.5 text-sm font-semibold text-foreground">
              {heroV4.eyebrow}
            </p>
            <h1
              data-reveal
              id="hero-heading-v4"
              className="mt-6 text-[clamp(3.25rem,8vw,6.5rem)] leading-[0.95] font-extrabold tracking-[-0.035em]"
            >
              {heroV4.title}
            </h1>
            <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {heroV4.intro}
            </p>
            <div data-reveal className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CtaLink href={heroV4.primaryCta.href}>{heroV4.primaryCta.label}</CtaLink>
              <CtaLink variant="secondary" href={heroV4.secondaryCta.href}>
                {heroV4.secondaryCta.label}
              </CtaLink>
            </div>
          </div>

          <div data-reveal className="relative">
            <Media
              tone={heroV4.tone}
              priority
              alt="Students filming on location"
              className="aspect-4/3 rounded-2xl shadow-[0_30px_60px_-30px_rgb(20_22_28/0.45)]"
            />
            <a
              href="#film"
              className="group absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-card py-2 pr-5 pl-2 text-sm font-semibold shadow-lg transition-colors hover:bg-highlight"
            >
              <span className="grid size-10 place-items-center rounded-full bg-brand text-primary-foreground">
                <Play className="size-4 fill-current" />
              </span>
              Watch the film
            </a>
          </div>
        </div>

        <dl data-reveal className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3 md:mt-20">
          {impact.stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-3 bg-card px-6 py-5">
              <dt className="order-2 text-muted-foreground">{stat.label}</dt>
              <dd className="order-1 text-3xl font-extrabold tracking-[-0.02em] text-brand tabular-nums">
                {formatNumber(stat.value)}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-muted-foreground">{impact.note}</p>
      </div>
    </RevealSection>
  );
}
