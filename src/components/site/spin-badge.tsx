import { useId } from "react";
import { cn } from "@/lib/utils";

type SpinBadgeProps = {
  /** Short phrase; it is repeated around the ring. */
  text: string;
  className?: string;
  children?: React.ReactNode;
};

/** Round badge with its text set on a slowly turning ring. Decorative. */
export function SpinBadge({ text, className, children }: SpinBadgeProps) {
  const id = useId();

  return (
    <span aria-hidden className={cn("relative grid place-items-center rounded-full", className)}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 size-full motion-safe:animate-spin-slow">
        <defs>
          <path id={id} d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
        </defs>
        <text fill="currentColor" fontSize="17" fontWeight="700" letterSpacing="3" style={{ textTransform: "uppercase" }}>
          <textPath href={`#${id}`} textLength="470">
            {`${text} • ${text} • `}
          </textPath>
        </text>
      </svg>
      {children}
    </span>
  );
}
