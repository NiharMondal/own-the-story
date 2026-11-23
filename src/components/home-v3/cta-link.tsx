import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CtaLinkProps = React.ComponentProps<"a"> & {
  /** "primary": solid brand. "secondary": outlined. "text": arrow link. */
  variant?: "primary" | "secondary" | "text";
};

/** v3 call to action. External links get an outward arrow and open in a new tab. */
export function CtaLink({ variant = "primary", className, children, href = "#", ...props }: CtaLinkProps) {
  const external = href.startsWith("http");
  const Arrow = external ? ArrowUpRight : ArrowRight;
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  if (variant === "text") {
    return (
      <a
        href={href}
        {...externalProps}
        className={cn(
          "group inline-flex items-center gap-1.5 font-semibold text-brand underline-offset-4 hover:underline",
          className,
        )}
        {...props}
      >
        {children}
        <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }

  return (
    <a
      href={href}
      {...externalProps}
      className={cn(
        "group inline-flex h-13 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-semibold transition-colors duration-200 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        variant === "primary"
          ? "bg-brand text-primary-foreground hover:bg-foreground"
          : "border border-foreground/20 bg-card text-foreground hover:border-foreground/50",
        className,
      )}
      {...props}
    >
      {children}
      <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
