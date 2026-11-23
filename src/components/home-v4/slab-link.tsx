import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SlabLinkProps = React.ComponentProps<"a"> & {
  /** "solid": brand slab. "line": outlined slab. */
  variant?: "solid" | "line";
};

/** v4 call to action: a hard-edged slab, like a cinema ticket stub. */
export function SlabLink({ variant = "solid", className, children, ...props }: SlabLinkProps) {
  return (
    <a
      className={cn(
        "group inline-flex h-14 items-center gap-3 px-7 text-sm font-bold tracking-[0.12em] uppercase transition-colors duration-300",
        variant === "solid"
          ? "bg-brand text-primary-foreground hover:bg-foreground"
          : "border border-foreground/40 text-foreground hover:border-brand hover:text-brand",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}
