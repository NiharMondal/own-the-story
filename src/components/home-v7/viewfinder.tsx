import { cn } from "@/lib/utils";

const CORNERS = [
  "top-0 left-0 border-t-2 border-l-2",
  "top-0 right-0 border-t-2 border-r-2",
  "bottom-0 left-0 border-b-2 border-l-2",
  "right-0 bottom-0 border-r-2 border-b-2",
];

/** The four corner brackets of a camera viewfinder. Decorative. */
export function Viewfinder({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute", className)}>
      {CORNERS.map((corner) => (
        <span key={corner} className={cn("absolute size-6 border-current md:size-9", corner)} />
      ))}
    </div>
  );
}

/** A blinking REC tag. "ink" for light grounds, "light" for use over a picture. */
export function RecTag({ tone = "ink", className }: { tone?: "ink" | "light"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-2.5 py-1 font-mono text-xs font-semibold tracking-[0.12em] chamfer [--cut:0.4rem]",
        tone === "ink" ? "bg-foreground text-background" : "bg-white text-foreground",
        className,
      )}
    >
      <span className="size-2 rounded-full bg-brand motion-safe:animate-blink" />
      REC
    </span>
  );
}
