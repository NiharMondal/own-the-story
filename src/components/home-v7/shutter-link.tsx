import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ShutterLinkProps = React.ComponentProps<"a"> & {
  /** "rec": red. "ink": graphite. "paper": light, for quieter actions. */
  variant?: "rec" | "ink" | "paper";
};

const FILLS = {
  rec: "bg-brand text-primary-foreground",
  ink: "bg-foreground text-background",
  paper: "bg-card text-foreground group-hover:text-background group-focus-visible:text-background",
};

const BLADES = {
  rec: "bg-foreground",
  ink: "bg-brand",
  paper: "bg-foreground",
};

/**
 * v7 call to action: a chamfered plate. On hover a slanted blade sweeps
 * across it, like a shutter closing. The clip sits on an inner span so the
 * focus ring on the link itself is never cut off.
 */
export function ShutterLink({ variant = "rec", className, children, href = "#", ...props }: ShutterLinkProps) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "relative inline-flex h-14 items-center gap-3 overflow-hidden px-7 font-semibold transition-colors duration-500 chamfer [--cut:0.9rem]",
          FILLS[variant],
        )}
      >
        <span
          aria-hidden
          className={cn(
            "absolute inset-y-0 -left-[20%] w-[140%] -translate-x-full -skew-x-[24deg] transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0",
            BLADES[variant],
          )}
        />
        <span className="relative">{children}</span>
        <ArrowRight className="relative size-4 transition-transform duration-500 group-hover:translate-x-1" />
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </span>
    </a>
  );
}
