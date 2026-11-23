import { Media } from "@/components/site/media";
import { aboutV3 } from "@/content/home-v3";
import { RevealSection } from "./reveal";

/** v3 about: mission in plain words, and a face behind it. */
export function AboutV3() {
  const { founder } = aboutV3;

  return (
    <RevealSection id="about" aria-labelledby="about-heading-v3" className="scroll-mt-20 bg-card py-20 md:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <div>
          <p data-reveal className="eyebrow">
            {aboutV3.eyebrow}
          </p>
          <h2
            data-reveal
            id="about-heading-v3"
            className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] font-bold tracking-[-0.02em]"
          >
            {aboutV3.heading}
          </h2>
          <p data-reveal className="mt-6 text-xl leading-relaxed font-medium md:text-2xl">
            {aboutV3.lead}
          </p>
          {aboutV3.body.map((para) => (
            <p key={para.slice(0, 24)} data-reveal className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {para}
            </p>
          ))}
        </div>

        <figure data-reveal className="self-start rounded-xl border border-border bg-background p-3">
          <Media tone={founder.tone} alt="A filmmaker in silhouette behind a camera" className="aspect-4/3 rounded-lg" />
          <figcaption className="p-4">
            <p className="text-lg font-bold">{founder.name}</p>
            <p className="text-sm font-semibold text-brand">{founder.role}</p>
            <p className="mt-3 leading-relaxed text-muted-foreground">{founder.body}</p>
          </figcaption>
        </figure>
      </div>
    </RevealSection>
  );
}
