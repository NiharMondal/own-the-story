// lucide-react no longer ships brand marks, so these are simple inline glyphs.
type IconProps = React.SVGProps<SVGSVGElement>;

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path
        style={{ fill: "var(--background)" }}
        d="M13.4 22v-7.3h2.4l.4-2.9h-2.8v-1.8c0-.8.3-1.4 1.5-1.4h1.4V6.1c-.3 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6v2.2H8.3v2.9h2.4V22h2.7Z"
      />
    </svg>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <rect x="2" y="2" width="20" height="20" rx="2.5" fill="currentColor" />
      <path
        fill="none"
        style={{ stroke: "var(--background)" }}
        strokeWidth="2.4"
        strokeLinecap="round"
        d="M7.5 10.5v6.5M7.5 7.2v.1M11.5 17v-6.5m0 3c0-1.8 1-3.1 2.6-3.1s2.4 1 2.4 3V17"
      />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" />
    </svg>
  );
}
