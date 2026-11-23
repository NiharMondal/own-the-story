import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PopLinkProps = React.ComponentProps<"a"> & {
  /** "pink": brand fill. "paper": white fill. "sun": yellow fill. */
  variant?: "pink" | "paper" | "sun";
};

const FILLS = {
  pink: "bg-brand text-primary-foreground",
  paper: "bg-card text-foreground",
  sun: "bg-highlight text-foreground",
};

/** v5 call to action: an inked sticker that presses down when you hover it. */
export function PopLink({ variant = "pink", className, children, href = "#", ...props }: PopLinkProps) {
  const external = href.startsWith("http");
  const Arrow = external ? ArrowUpRight : ArrowRight;

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex h-14 items-center gap-2 rounded-full border-2 border-foreground px-7 font-bold shadow-[4px_4px_0_var(--foreground)] transition-[translate,box-shadow] duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_var(--foreground)]",
        FILLS[variant],
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
