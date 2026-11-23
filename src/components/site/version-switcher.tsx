"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const VERSIONS = [
  { href: "/", label: "1", name: "Sage" },
  { href: "/v2", label: "2", name: "Paper" },
  { href: "/v3", label: "3", name: "Clear" },
  { href: "/v4", label: "4", name: "Night" },
  { href: "/v5", label: "5", name: "Pop" },
  { href: "/v6", label: "6", name: "Dusk" },
];

/** Prototype aid: jump between the homepage designs. Remove before launch. */
export function VersionSwitcher() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Design versions"
      className="fixed bottom-4 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-1 rounded-full bg-neutral-950/85 p-1.5 pl-4 text-sm text-white shadow-2xl ring-1 ring-white/15 backdrop-blur-md"
    >
      <span className="mr-1 hidden text-xs tracking-[0.14em] text-white/60 uppercase sm:inline">Version</span>
      {VERSIONS.map((v) => {
        const current = pathname === v.href;
        return (
          <Link
            key={v.href}
            href={v.href}
            title={v.name}
            aria-label={`Version ${v.label}: ${v.name}`}
            aria-current={current ? "page" : undefined}
            className={cn(
              "grid size-8 place-items-center rounded-full font-semibold tabular-nums transition-colors",
              current ? "bg-white text-neutral-950" : "text-white/75 hover:bg-white/15 hover:text-white",
            )}
          >
            {v.label}
          </Link>
        );
      })}
    </nav>
  );
}
