import { Eye, Smartphone, Ticket } from "lucide-react";
import { Media } from "@/components/site/media";
import { labs } from "@/content/home-v3";
import { CtaLink } from "./cta-link";
import { RevealSection } from "./reveal";
import { SectionHeading } from "./section-heading";

const ICONS = { eye: Eye, phone: Smartphone, ticket: Ticket };

/**
 * v3 programs: the three labs from the live site as equal cards, then the
 * Prepare → Present → Engage → Lead framework as a numbered path.
 */
export function ProgramsV3() {
  return (
    <RevealSection id="programs" aria-labelledby="programs-heading-v3" className="scroll-mt-20 py-20 md:py-28">
      <div className="container-site">
        <SectionHeading id="programs-heading-v3" eyebrow={labs.eyebrow} heading={labs.heading} body={labs.body}>
          <CtaLink variant="secondary" href={labs.cta.href}>
            {labs.cta.label}
          </CtaLink>
        </SectionHeading>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {labs.items.map((lab) => {
            const Icon = ICONS[lab.icon];
            return (
              <li key={lab.title} data-reveal className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
                <Media tone={lab.tone} className="aspect-16/10" />
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <p className="flex items-center gap-2 text-sm font-semibold text-brand">
                    <Icon className="size-4" aria-hidden />
                    {lab.kicker}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold tracking-[-0.01em]">{lab.title}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{lab.body}</p>
                  <ul aria-label="Skills" className="mt-6 flex flex-wrap gap-2">
                    {lab.skills.map((skill) => (
                      <li key={skill} className="rounded-full bg-secondary px-3 py-1 text-sm font-medium">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>

        <div data-reveal className="mt-14 rounded-xl bg-foreground p-6 text-background md:p-10">
          <h3 className="text-sm font-semibold tracking-[0.14em] text-highlight uppercase">The framework</h3>
          <ol className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {labs.steps.map((step, i) => (
              <li key={step.title} className="relative">
                <span className="text-sm font-semibold text-background/60 tabular-nums">0{i + 1}</span>
                <p className="mt-1 text-2xl font-extrabold">{step.title}.</p>
                <p className="mt-2 leading-relaxed text-background/75">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </RevealSection>
  );
}
