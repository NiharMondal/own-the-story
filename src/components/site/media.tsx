import Image from "next/image";
import { tonePhotos } from "@/content/photos";
import { cn } from "@/lib/utils";

/*
 * Image frame used across the page. Each `tone` maps to a stock photo in
 * content/photos.ts; pass `src` to show a specific picture instead. The tone's
 * gradient stays underneath as the backdrop while the photo loads.
 *
 * Structure matters for animation:
 *   [data-media]        frame — clip-path reveals
 *   [data-media-inner]  GSAP scale / parallax target
 *   inner layer         CSS hover zoom (kept separate so it never fights GSAP)
 */

const TONES = {
  spotlight:
    "radial-gradient(34% 52% at 66% 40%, rgb(126 176 184 / 0.6), transparent 70%), radial-gradient(70% 90% at 72% 28%, rgb(48 98 108 / 0.45), transparent 75%), linear-gradient(180deg, #0c1214, #060707)",
  amber:
    "radial-gradient(38% 58% at 52% 46%, rgb(220 152 64 / 0.6), transparent 72%), radial-gradient(26% 40% at 34% 30%, rgb(36 150 156 / 0.4), transparent 70%), linear-gradient(160deg, #1d1409, #070605)",
  crimson:
    "radial-gradient(14% 18% at 62% 50%, rgb(240 240 240 / 0.55), transparent 72%), radial-gradient(80% 55% at 50% 100%, rgb(128 22 28 / 0.65), transparent 72%), linear-gradient(180deg, #1c1113, #0a0607)",
  slate:
    "radial-gradient(36% 46% at 28% 46%, rgb(124 164 196 / 0.45), transparent 70%), repeating-linear-gradient(90deg, #15181b 0 18px, #1d2125 18px 30px)",
  sunlit:
    "radial-gradient(55% 60% at 50% 28%, rgb(252 224 176 / 0.65), transparent 70%), linear-gradient(180deg, #7d6c52, #3b3228)",
  classroom:
    "radial-gradient(55% 50% at 50% 18%, rgb(196 228 218 / 0.55), transparent 70%), linear-gradient(180deg, #4f5c5a, #222829)",
  stage:
    "radial-gradient(60% 40% at 50% 0%, rgb(86 126 210 / 0.4), transparent 70%), linear-gradient(180deg, #2c0d11, #611519 60%, #210709)",
  studio:
    "radial-gradient(18% 22% at 60% 22%, rgb(255 236 190 / 0.7), transparent 70%), linear-gradient(170deg, #4a3c2c, #1b1510)",
  daylight:
    "radial-gradient(60% 60% at 70% 30%, rgb(220 230 240 / 0.6), transparent 70%), linear-gradient(135deg, #6c7a86, #23282e)",
  // Warm duotones for the light "paper" theme (v2).
  ember:
    "radial-gradient(42% 60% at 64% 42%, rgb(255 168 112 / 0.75), transparent 70%), radial-gradient(70% 80% at 20% 90%, rgb(194 54 31 / 0.55), transparent 70%), linear-gradient(160deg, #3a1a12, #140c09)",
  clay: "radial-gradient(55% 55% at 35% 30%, rgb(255 222 196 / 0.7), transparent 70%), linear-gradient(150deg, #b8653f, #5b2a1a)",
  dusk: "radial-gradient(45% 55% at 70% 35%, rgb(255 190 150 / 0.55), transparent 70%), linear-gradient(170deg, #4b3a5a, #1d1622)",
  sage: "radial-gradient(55% 55% at 40% 30%, rgb(236 240 220 / 0.7), transparent 70%), linear-gradient(160deg, #7d8a6c, #2f3529)",
  sand: "radial-gradient(50% 55% at 60% 35%, rgb(255 246 230 / 0.85), transparent 72%), linear-gradient(160deg, #c9b08c, #6e5a40)",
  // Light backdrops for the light v1 palette, where text sits on the picture.
  mist: "radial-gradient(40% 55% at 68% 38%, rgb(255 255 255 / 0.75), transparent 70%), radial-gradient(60% 70% at 85% 90%, rgb(14 110 98 / 0.35), transparent 70%), linear-gradient(160deg, #cfe0d8, #8fb3a6)",
  // Cool backlit set, used where a face would wrongly suggest a named person.
  silhouette: "radial-gradient(40% 55% at 60% 40%, rgb(96 150 255 / 0.6), transparent 70%), linear-gradient(170deg, #16233f, #070a12)",
  dawn: "radial-gradient(30% 40% at 64% 48%, rgb(255 250 240 / 0.85), transparent 70%), radial-gradient(70% 60% at 90% 100%, rgb(232 160 120 / 0.45), transparent 70%), linear-gradient(160deg, #e6ddd0, #b7a58f)",
} as const;

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export type MediaTone = keyof typeof TONES;

type MediaProps = {
  tone?: MediaTone;
  src?: string;
  alt?: string;
  /** Optional corner chip, e.g. a note that the video player is not wired in yet. */
  label?: string | false;
  priority?: boolean;
  sizes?: string;
  /** Gentle zoom when a parent with the `group` class is hovered. */
  hoverZoom?: boolean;
  className?: string;
  children?: React.ReactNode;
};

export function Media({
  tone = "slate",
  src,
  alt = "",
  label,
  priority,
  sizes = "100vw",
  hoverZoom,
  className,
  children,
}: MediaProps) {
  return (
    <div data-media className={cn("relative overflow-hidden bg-neutral-900", className)}>
      <div data-media-inner className="absolute inset-0 will-change-transform">
        <div
          className={cn(
            "absolute inset-0",
            hoverZoom &&
              "transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]",
          )}
        >
          <div aria-hidden className="absolute inset-0" style={{ backgroundImage: TONES[tone] }} />
          <Image
            src={src ?? tonePhotos[tone]}
            alt={alt}
            fill
            preload={priority}
            sizes={sizes}
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-15 mix-blend-overlay"
            style={{ backgroundImage: GRAIN }}
          />
        </div>
      </div>
      {children}
      {label && (
        <span className="absolute top-3 left-3 z-10 rounded-sm bg-black/60 px-2 py-1 text-xs text-white/80 backdrop-blur-sm">
          {label}
        </span>
      )}
    </div>
  );
}
