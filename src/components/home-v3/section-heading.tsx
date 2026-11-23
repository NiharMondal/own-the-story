import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  heading: string;
  body?: string;
  className?: string;
  children?: React.ReactNode;
};

/** One heading pattern for every v3 section, so the page reads consistently. */
export function SectionHeading({ id, eyebrow, heading, body, className, children }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl">
        <p data-reveal className="eyebrow">
          {eyebrow}
        </p>
        <h2
          data-reveal
          id={id}
          className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] font-bold tracking-[-0.02em]"
        >
          {heading}
        </h2>
        {body && (
          <p data-reveal className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {body}
          </p>
        )}
      </div>
      {children && (
        <div data-reveal className="shrink-0">
          {children}
        </div>
      )}
    </div>
  );
}
