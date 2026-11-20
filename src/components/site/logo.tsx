import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      href="#top"
      aria-label="Own the Story, back to top"
      className={cn("font-expanded text-[0.8rem] font-semibold tracking-[0.2em] whitespace-nowrap", className)}
      {...props}
    >
      <span className="text-brand">OWN THE</span> STORY
    </a>
  );
}
