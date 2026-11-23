import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  /** Drawn between items. */
  separator?: React.ReactNode;
  className?: string;
};

/**
 * Endless ticker. The list is rendered twice and the track slides left by half
 * its width, so the loop has no seam. Stands still for reduced-motion users.
 */
export function Marquee({ items, separator = "✦", className }: MarqueeProps) {
  // Repeat so one copy is always wider than the screen.
  const run = [...items, ...items, ...items];

  return (
    <div className={cn("overflow-hidden", className)}>
      <div className="flex w-max motion-safe:animate-marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {run.map((item, i) => (
              <li key={`${item}-${i}`} aria-hidden={i >= items.length} className="flex items-center gap-[1.2em] pr-[1.2em]">
                <span>{item}</span>
                <span aria-hidden>{separator}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
