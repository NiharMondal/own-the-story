"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const FPS = 24;
const pad = (n: number) => String(n).padStart(2, "0");

function format(frames: number) {
  const s = Math.floor(frames / FPS);
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(frames % FPS)}`;
}

/** A running camera timecode (hh:mm:ss:ff at 24 fps), counting from page load. Decorative. */
export function Timecode({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const start = performance.now();
    let shown = 0;
    let raf = 0;
    const tick = (now: number) => {
      const frames = Math.floor(((now - start) / 1000) * FPS);
      if (frames !== shown && ref.current) {
        shown = frames;
        ref.current.textContent = format(frames);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <span ref={ref} aria-hidden className={cn("font-mono tabular-nums", className)}>
      {format(0)}
    </span>
  );
}
