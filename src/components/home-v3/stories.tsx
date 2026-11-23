import { Media } from "@/components/site/media";
import { series } from "@/content/home";
import { CtaLink } from "./cta-link";
import { RevealSection } from "./reveal";
import { SectionHeading } from "./section-heading";

/** v3 blog/series: plain article cards with date and read time up front. */
export function StoriesV3() {
  return (
    <RevealSection id="series" aria-labelledby="series-heading-v3" className="scroll-mt-20 bg-card py-20 md:py-28">
      <div className="container-site">
        <SectionHeading id="series-heading-v3" eyebrow={series.eyebrow} heading={series.heading}>
          <CtaLink variant="text" href={series.viewAll.href}>
            {series.viewAll.label}
          </CtaLink>
        </SectionHeading>

        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {series.parts.map((part, i) => (
            <li key={part.title} data-reveal>
              <article className="group relative flex h-full flex-col">
                <Media tone={part.tone} hoverZoom className="aspect-3/2 rounded-xl" />
                <p className="mt-5 text-sm font-medium text-muted-foreground">
                  Part {i + 1} · {part.meta}
                </p>
                <h3 className="mt-2 text-xl font-bold tracking-[-0.01em]">
                  {part.comingSoon ? (
                    part.title
                  ) : (
                    <a href="#series" className="after:absolute after:inset-0 group-hover:text-brand">
                      {part.title}
                    </a>
                  )}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{part.body}</p>
                {part.comingSoon && (
                  <span className="mt-4 self-start rounded-full bg-highlight px-3 py-1 text-xs font-bold">Coming soon</span>
                )}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </RevealSection>
  );
}
