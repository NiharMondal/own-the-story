import { Star } from "lucide-react";
import { RevealSection } from "@/components/home-v3/reveal";
import { CountUp } from "@/components/site/count-up";
import { Media } from "@/components/site/media";
import { SpinBadge } from "@/components/site/spin-badge";
import { hero, impact } from "@/content/home";
import { heroV3 } from "@/content/home-v3";
import { photos } from "@/content/photos";
import { PopLink } from "./pop-link";

const CHIP_FILLS = ["bg-highlight", "bg-[var(--pop-mint)]", "bg-[var(--pop-sky)]"];

/**
 * v5 hero: "scrapbook".
 * Words on the left, a collage of cut-out shapes on the right (arch, circle,
 * blob), and the impact figures pinned underneath as three stickers.
 */
export function HeroV5() {
  return (
    <RevealSection immediate aria-labelledby="hero-heading-v5" className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container-site grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p
            data-reveal
            className="inline-block -rotate-2 rounded-full border-2 border-foreground bg-[var(--pop-mint)] px-4 py-1.5 text-sm font-bold"
          >
            {heroV3.eyebrow}
          </p>
          <h1
            data-reveal
            id="hero-heading-v5"
            className="font-display mt-7 text-[clamp(3.75rem,10vw,8.5rem)] leading-[0.9] font-extrabold tracking-[-0.04em]"
          >
            {hero.title[0]}{" "}
            <span className="inline-block -rotate-3 rounded-[0.25em] border-2 border-foreground bg-highlight px-[0.16em] pb-[0.06em] shadow-[6px_6px_0_var(--foreground)]">
              {hero.title[1]}
            </span>
          </h1>
          <p data-reveal className="mt-9 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {hero.intro}
          </p>
          <div data-reveal className="mt-9 flex flex-wrap gap-4">
            <PopLink href={hero.primaryCta.href}>{hero.primaryCta.label}</PopLink>
            <PopLink variant="paper" href={hero.watch.href}>
              {hero.watch.label}
            </PopLink>
          </div>
        </div>

        <div data-reveal className="relative mx-auto aspect-square w-full max-w-[36rem]">
          <Media
            src={photos.fiveFromAbove}
            alt="Five young people looking up at the camera"
            priority
            sizes="(min-width: 1024px) 22rem, 60vw"
            className="absolute bottom-0 left-0 h-[82%] w-[56%] rounded-t-full rounded-b-3xl border-2 border-foreground shadow-[10px_10px_0_var(--highlight)]"
          />
          <Media
            src={photos.gimbalSmile}
            alt="A young filmmaker smiling as he operates a camera"
            sizes="(min-width: 1024px) 16rem, 44vw"
            className="absolute top-0 right-0 aspect-square w-[46%] rounded-full border-2 border-foreground shadow-[8px_8px_0_var(--brand)]"
          />
          <Media
            src={photos.clapperPortrait}
            alt="A woman holding a clapperboard in front of her face"
            sizes="(min-width: 1024px) 15rem, 40vw"
            className="absolute right-[2%] bottom-[4%] aspect-square w-[40%] rounded-[42%_58%_55%_45%/55%_42%_58%_45%] border-2 border-foreground shadow-[8px_8px_0_var(--pop-mint)]"
          />
          <SpinBadge
            text="Camera · Craft · Stage"
            className="absolute top-[30%] left-[44%] size-28 border-2 border-foreground bg-brand text-primary-foreground md:size-32"
          >
            <Star className="size-7 fill-highlight text-highlight" />
          </SpinBadge>
          <span className="absolute top-[4%] left-[6%] rotate-6 rounded-full border-2 border-foreground bg-card px-4 py-2 text-sm font-bold shadow-[3px_3px_0_var(--foreground)] motion-safe:animate-float">
            🎬 Action!
          </span>
        </div>
      </div>

      <div className="container-site mt-16 md:mt-20">
        <dl className="flex flex-wrap justify-center gap-4 md:gap-6">
          {impact.stats.map((stat, i) => (
            <div
              key={stat.label}
              data-reveal
              className={`flex items-baseline gap-3 rounded-full border-2 border-foreground px-7 py-4 shadow-[4px_4px_0_var(--foreground)] odd:-rotate-1 even:rotate-1 ${CHIP_FILLS[i % CHIP_FILLS.length]}`}
            >
              <dd className="font-display order-1 text-4xl font-extrabold tracking-[-0.03em] tabular-nums md:text-5xl">
                <CountUp value={stat.value} />
              </dd>
              <dt className="order-2 font-semibold">{stat.label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-center text-xs text-muted-foreground">{impact.note}</p>
      </div>
    </RevealSection>
  );
}
