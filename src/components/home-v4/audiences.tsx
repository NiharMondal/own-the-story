import { Building2, Clapperboard, Handshake, School } from "lucide-react";
import { audiences } from "@/content/home-v4";
import { RevealSection } from "./reveal";

const ICONS = { school: School, district: Building2, sponsor: Handshake, youth: Clapperboard };

/**
 * v4 audience paths. The live site makes every visitor read the whole page to
 * find their part; here each audience gets one card and one next step.
 */
export function AudiencesV4() {
  return (
    <RevealSection aria-labelledby="audiences-heading-v4" className="pb-20 md:pb-28">
      <div className="container-site">
        <h2 data-reveal id="audiences-heading-v4" className="text-xl font-bold tracking-[-0.01em]">
          {audiences.heading}
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <li key={item.who} data-reveal>
                <a
                  href={item.cta.href}
                  className="group flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-[border-color,box-shadow] duration-300 hover:border-brand/40 hover:shadow-[0_18px_40px_-24px_rgb(35_64_201/0.5)]"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-highlight text-foreground">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{item.who}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">{item.body}</p>
                  <span className="mt-5 font-semibold text-brand">
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
