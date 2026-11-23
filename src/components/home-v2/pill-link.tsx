import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PillLinkProps = React.ComponentProps<"a"> & {
  /** "solid": brand pill with an arrow chip. "ghost": underlined text link. */
  variant?: "solid" | "ghost";
};

/**
 * v3 call to action. Only colors transition in CSS, never transforms, so GSAP
 * can animate these links without the two fighting.
 */
export function PillLink({ variant = "solid", className, children, ...props }: PillLinkProps) {
  if (variant === "ghost") {
    return (
      <a
        className={cn(
          "group inline-flex items-center gap-2 font-semibold underline decoration-foreground/30 decoration-1 underline-offset-[6px] transition-colors hover:decoration-brand",
          className,
        )}
        {...props}
      >
        {children}
        <ArrowUpRight className="size-4 transition-[rotate] duration-500 group-hover:rotate-45" />
      </a>
    );
  }

  return (
    <a
      className={cn(
        "group inline-flex h-14 items-center gap-4 rounded-full bg-brand pr-2 pl-7 text-[0.95rem] font-semibold text-primary-foreground transition-colors duration-300 hover:bg-foreground",
        className,
      )}
      {...props}
    >
      {children}
      <span className="grid size-10 place-items-center rounded-full bg-primary-foreground text-brand transition-[rotate,color] duration-500 group-hover:rotate-45 group-hover:text-foreground">
        <ArrowUpRight className="size-5" />
      </span>
    </a>
  );
}
