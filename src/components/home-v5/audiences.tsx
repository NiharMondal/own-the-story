import { Building2, Clapperboard, Handshake, School } from "lucide-react";
import { RevealSection } from "@/components/home-v3/reveal";
import { audiences } from "@/content/home-v3";

const ICONS = { school: School, district: Building2, sponsor: Handshake, youth: Clapperboard };
const FILLS = [
  "bg-brand text-primary-foreground",
  "bg-highlight text-foreground",
  "bg-[var(--pop-mint)] text-foreground",
  "bg-[var(--pop-sky)] text-foreground",
];

/** v5 audiences: four doors, each its own color, right under the hero. */
export function AudiencesV5() {
  return (
    <RevealSection aria-labelledby="audiences-heading-v5" className="pb-24 md:pb-32">
      <div className="container-site">
        <h2
          data-reveal
          id="audiences-heading-v5"
          className="font-display text-center text-[clamp(2.25rem,5vw,4rem)] leading-none font-extrabold tracking-[-0.03em]"
        >
          {audiences.heading}
        </h2>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.items.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <li key={item.who} data-reveal className="lg:even:mt-10">
                <a
                  href={item.cta.href}
                  className={`group flex h-full flex-col rounded-[2rem] border-2 border-foreground p-7 shadow-[6px_6px_0_var(--foreground)] transition-[translate,rotate,box-shadow] duration-300 hover:-translate-y-2 hover:-rotate-2 hover:shadow-[10px_12px_0_var(--foreground)] ${FILLS[i % FILLS.length]}`}
                >
                  <span className="grid size-14 place-items-center rounded-full border-2 border-foreground bg-card text-foreground">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3 className="font-display mt-8 text-2xl font-extrabold tracking-[-0.02em]">{item.who}</h3>
                  <p className="mt-2 flex-1 leading-relaxed opacity-90">{item.body}</p>
                  <span className="mt-6 font-bold underline decoration-2 underline-offset-4">
                    {item.cta.label}{" "}
                    <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </RevealSection>
  );
}
