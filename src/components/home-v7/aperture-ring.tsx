import { cn } from "@/lib/utils";

const STOPS = ["1.4", "2", "2.8", "4", "5.6", "8", "11", "16"];
const TICKS = 96;

/** A lens barrel's f-stop ring: fine ticks, with the stops marked every 45°. Decorative. */
export function ApertureRing({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden fill="none" stroke="currentColor" className={cn("overflow-visible", className)}>
      <circle cx="100" cy="100" r="98" strokeWidth="0.4" />
      <circle cx="100" cy="100" r="86" strokeWidth="0.4" />
      {Array.from({ length: TICKS }, (_, i) => (
        <line
          key={i}
          x1="100"
          y1="2"
          x2="100"
          y2={i % 12 === 0 ? 10 : i % 4 === 0 ? 6.5 : 4.5}
          strokeWidth={i % 12 === 0 ? 0.8 : 0.4}
          transform={`rotate(${(i * 360) / TICKS} 100 100)`}
        />
      ))}
      {STOPS.map((stop, i) => (
        <text
          key={stop}
          x="100"
          y="22"
          fill="currentColor"
          stroke="none"
          fontSize="5.5"
          textAnchor="middle"
          style={{ fontFamily: "var(--font-geist-mono)" }}
          transform={`rotate(${i * 45} 100 100)`}
        >
          f/{stop}
        </text>
      ))}
    </svg>
  );
}
