import { RevealSection } from "@/components/home-v3/reveal";
import { Media } from "@/components/site/media";
import { labs } from "@/content/home-v3";
import { photos } from "@/content/photos";
import { cn } from "@/lib/utils";
import { PopLink } from "./pop-link";

const FRAMES = [
  {
    src: photos.studentsLaughing,
    alt: "Students talking and laughing together",
    shape: "rounded-t-full rounded-b-[2rem] shadow-[12px_12px_0_var(--highlight)]",
  },
  {
    src: photos.phoneSunset,
    alt: "Hands framing a sunset on a phone",
    shape: "rounded-full shadow-[12px_12px_0_var(--brand)]",
  },
  {
    src: photos.gardenScreening,
    alt: "An outdoor screening with two chairs facing the screen",
    shape: "rotate-3 rounded-[3rem] shadow-[12px_12px_0_var(--pop-mint)]",
  },
];
const STEP_FILLS = ["bg-highlight", "bg-[var(--pop-mint)]", "bg-[var(--pop-sky)]", "bg-brand text-primary-foreground"];

/**
 * v5 labs: "zig-zag". Each lab gets its own row, alternating sides, with the
 * photo cut to a different shape each time. The framework closes it out as
 * four numbered stickers.
 */
export function LabsV5() {
  return (
    <RevealSection id="programs" aria-labelledby="programs-heading-v5" className="scroll-mt-20 py-24 md:py-32">
      <div className="container-site">
        <div className="mx-auto max-w-3xl text-center">
          <p data-reveal className="eyebrow">
            {labs.eyebrow}
          </p>
          <h2
            data-reveal
            id="programs-heading-v5"
            className="font-display mt-4 text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95] font-extrabold tracking-[-0.035em]"
          >
            {labs.heading}
          </h2>
          <p data-reveal className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {labs.body}
          </p>
        </div>

        <ol className="mt-20 space-y-24 md:space-y-28">
          {labs.items.map((lab, i) => (
            <li key={lab.title} className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
              <div data-reveal className={cn("mx-auto w-full max-w-md", i % 2 === 1 && "md:order-2")}>
                <Media
                  src={FRAMES[i].src}
                  alt={FRAMES[i].alt}
                  sizes="(min-width: 768px) 28rem, 90vw"
                  className={cn("aspect-square border-2 border-foreground", FRAMES[i].shape)}
                />
              </div>
              <div data-reveal>
                <span className="font-display grid size-16 place-items-center rounded-full border-2 border-foreground bg-card text-2xl font-extrabold shadow-[4px_4px_0_var(--foreground)]">
                  {i + 1}
                </span>
                <p className="mt-6 text-sm font-bold tracking-[0.1em] text-brand uppercase">{lab.kicker}</p>
                <h3 className="font-display mt-2 text-[clamp(2rem,4vw,3.25rem)] leading-none font-extrabold tracking-[-0.03em]">
                  {lab.title}
                </h3>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">{lab.body}</p>
                <ul aria-label="Skills" className="mt-6 flex flex-wrap gap-2">
                  {lab.skills.map((skill) => (
                    <li key={skill} className="rounded-full border-2 border-foreground bg-card px-4 py-1 text-sm font-bold">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <ol className="mt-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {labs.steps.map((step, i) => (
            <li
              key={step.title}
              data-reveal
              className={cn(
                "rounded-[2rem] border-2 border-foreground p-6 shadow-[5px_5px_0_var(--foreground)] odd:-rotate-1 even:rotate-1",
                STEP_FILLS[i % STEP_FILLS.length],
              )}
            >
              <span className="text-sm font-bold tabular-nums opacity-70">Step {i + 1}</span>
              <p className="font-display mt-1 text-3xl font-extrabold tracking-[-0.02em]">{step.title}</p>
              <p className="mt-2 leading-relaxed opacity-90">{step.body}</p>
            </li>
          ))}
        </ol>
        <div data-reveal className="mt-12 flex justify-center">
          <PopLink variant="paper" href={labs.cta.href}>
            {labs.cta.label}
          </PopLink>
        </div>
      </div>
    </RevealSection>
  );
}
