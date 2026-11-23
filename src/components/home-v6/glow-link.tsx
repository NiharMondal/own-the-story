import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type GlowLinkProps = React.ComponentProps<"a"> & {
  /** "glow": orange-to-rose gradient. "ghost": hairline outline. "ink": dark, for use on the gradient. */
  variant?: "glow" | "ghost" | "ink";
};

const FILLS = {
  glow: "bg-linear-to-r from-brand to-highlight text-primary-foreground hover:shadow-[0_0_40px_-6px_var(--highlight)]",
  ghost: "border border-foreground/30 text-foreground hover:border-brand hover:text-brand",
  ink: "bg-background text-foreground hover:bg-card",
};

/** v6 call to action: a soft pill that glows. */
export function GlowLink({ variant = "glow", className, children, href = "#", ...props }: GlowLinkProps) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex h-14 items-center gap-2 rounded-full px-7 font-semibold transition-[box-shadow,color,border-color,background-color] duration-300",
        FILLS[variant],
        className,
      )}
      {...props}
    >
      {children}
      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
