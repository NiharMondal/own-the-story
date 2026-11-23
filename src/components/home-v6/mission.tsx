import Image from "next/image";
import { RevealSection } from "@/components/home-v3/reveal";
import { mission } from "@/content/home";
import { photos } from "@/content/photos";
import { DuskLink } from "./dusk-link";

/** A small oval photo that sits in the line of type like a word. */
function InlinePhoto({ src }: { src: string }) {
  return (
    <span className="relative mx-[0.15em] inline-block h-[0.78em] w-[1.7em] overflow-hidden rounded-full align-[-0.08em]">
      <Image src={src} alt="" fill sizes="200px" className="object-cover" />
    </span>
  );
}

/** v6 mission: one centred statement, with pictures set into the sentence. */
export function MissionV6() {
  // "…for them. They need…" → a photo sits in the pause between the two sentences.
  const [first, ...rest] = mission.statement.split(". ");
  const second = rest.join(". ");

  return (
    <RevealSection id="about" aria-labelledby="about-heading-v6" className="scroll-mt-20 py-28 md:py-44">
      <div className="container-site text-center">
        <p data-reveal className="eyebrow">
          {mission.eyebrow}
        </p>
        <h2
          data-reveal
          id="about-heading-v6"
          className="font-display mx-auto mt-8 max-w-6xl text-[clamp(2.25rem,5.6vw,5.25rem)] leading-[1.04] font-normal tracking-[-0.03em]"
        >
          {first}.<InlinePhoto src={photos.friendsSky} />
          <em className="text-brand">{second}</em>
          <InlinePhoto src={photos.reels} />
        </h2>
        <p data-reveal className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {mission.body}
        </p>
        <div data-reveal className="mt-9 flex justify-center">
          <DuskLink variant="ghost" href="#programs">
            See the programs
          </DuskLink>
        </div>
      </div>
    </RevealSection>
  );
}
