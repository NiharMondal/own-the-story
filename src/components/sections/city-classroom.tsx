import { RevealSection } from "@/components/home-v3/reveal";
import { Media } from "@/components/site/media";
import { city } from "@/content/home";
import { photos } from "@/content/photos";
import { cn } from "@/lib/utils";
import type { SectionProps } from "./why-it-matters";

const SHOTS = [
  { src: photos.dumbo, alt: "A Brooklyn street with the Manhattan Bridge behind it" },
  { src: photos.phoneMono, alt: "Hands framing a street scene on a phone" },
  { src: photos.friendsSky, alt: "Five friends smiling together outdoors" },
  { src: photos.clapperPortrait, alt: "A woman holding a clapperboard in front of her face" },
  { src: photos.soundstage, alt: "A film crew on a soundstage" },
  { src: photos.editingSilhouette, alt: "Someone editing video in a dim room" },
  { src: photos.brooklynBridge, alt: "The Brooklyn Bridge and the Manhattan skyline" },
];

/**
 * "The city is our classroom." A strip of location photos that drifts past
 * edge to edge; it pauses on hover and stands still for reduced-motion users.
 */
export function CityClassroom({ headingClass = "font-bold tracking-[-0.02em]", className, motion, mediaClass = "rounded-xl" }: SectionProps) {
  return (
    <RevealSection motion={motion} aria-labelledby="city-heading" className={cn("overflow-hidden py-24 md:py-32", className)}>
      <div className="container-site flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p data-reveal className="eyebrow">
            {city.eyebrow}
          </p>
          <h2 data-reveal id="city-heading" className={cn("mt-4 text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[0.98]", headingClass)}>
            {city.heading[0]}
            <br />
            {city.heading[1]}
          </h2>
        </div>
        <p data-reveal className="max-w-sm text-lg leading-relaxed text-muted-foreground">
          {city.body}
        </p>
      </div>

      <div data-reveal className="group/strip mt-12 overflow-hidden">
        <div className="flex w-max motion-safe:animate-marquee motion-safe:[animation-duration:70s] motion-safe:group-hover/strip:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-4 pr-4 md:gap-5 md:pr-5">
              {SHOTS.map((shot, i) => (
                <li key={shot.src} className="w-[62vw] shrink-0 sm:w-80 md:w-96">
                  <figure>
                    <Media
                      src={shot.src}
                      alt={copy === 0 ? shot.alt : ""}
                      sizes="(min-width: 768px) 24rem, 62vw"
                      className={cn(mediaClass, i % 2 === 0 ? "aspect-[4/5]" : "mt-10 aspect-square")}
                    />
                    <figcaption className="mt-3 flex items-center gap-2 text-sm font-medium">
                      <span className="size-1.5 rounded-full bg-brand" />
                      {city.captions[i]}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
