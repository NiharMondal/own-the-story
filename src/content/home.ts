import type { MediaTone } from "@/components/site/media";

/*
 * All homepage copy in one place. Every homepage version
 * renders from this, so edit text here rather than in the components.
 */

export const nav = {
  links: [
    { label: "Home", href: "#top" },
    { label: "About", href: "#about" },
    { label: "Programs", href: "#programs" },
    { label: "Blog", href: "#series" },
    { label: "Donate", href: "#donate" },
    { label: "Contact", href: "#contact" },
  ],
  cta: { label: "Partner With Us", href: "#contact" },
};

export const hero = {
  title: ["Own the", "story."],
  intro: "A national movement giving young people the camera, the craft and the stage to tell their own stories.",
  primaryCta: { label: "Join the Movement", href: "#programs" },
  secondaryCta: { label: "Learn More", href: "#about" },
  watch: { label: "Watch the film", href: "#film" },
  tone: "mist" as MediaTone,
};

export const mission = {
  eyebrow: "Our mission",
  statement:
    "Young people don't need someone to tell their story for them. They need the camera, the craft and the stage.",
  body: "OWN THE STORY is a national youth narrative movement, bringing film media literacy, youth storytelling and school partnerships together on one platform.",
  link: { label: "About us", href: "#about" },
};

export const programs: {
  eyebrow: string;
  heading: string;
  items: { title: string; body: string; tone: MediaTone }[];
} = {
  eyebrow: "What we do",
  heading: "Four ways into the story.",
  items: [
    {
      title: "Film Media Literacy",
      body: "Students learn to read film the way they read text: framing, editing, sound and point of view.",
      tone: "slate",
    },
    {
      title: "Youth Storytelling",
      body: "Young people write, shoot and edit their own films, from first idea to final cut.",
      tone: "sunlit",
    },
    {
      title: "School Partnerships",
      body: "Schools and districts bring a standards-aligned film curriculum into the classroom.",
      tone: "classroom",
    },
    {
      title: "Content Streaming",
      body: "Finished films reach a national audience on a platform built for youth work.",
      tone: "stage",
    },
  ],
};

export const film = {
  eyebrow: "Featured film",
  heading: ["Made by young filmmakers.", "Seen by the nation."],
  title: "Film title (to be confirmed)",
  meta: "12 min · 2026 · Directed by [student filmmaker], [school], [city] · Poster: placeholder",
  playerNote: "Video player (JW Player): placeholder",
  duration: "12:48",
  tone: "amber" as MediaTone,
};

// Demo figures — replace with verified numbers before launch.
export const impact = {
  heading: "Our impact · 2026-27 school year",
  stats: [
    { value: 48, label: "Partner schools" },
    { value: 3200, label: "Young people reached" },
    { value: 260, label: "Films made by youth" },
  ],
  note: "Demo figures for the prototype. Verified numbers to be supplied before launch.",
};

export const series: {
  eyebrow: string;
  heading: string;
  viewAll: { label: string; href: string };
  parts: { title: string; body: string; meta: string; tone: MediaTone; comingSoon?: boolean }[];
} = {
  eyebrow: "The Own the Story series",
  heading: "A 12-part series on who gets to tell the story.",
  viewAll: { label: "View all 12 parts", href: "#series" },
  parts: [
    {
      title: "Who gets to hold the camera?",
      body: "Why the stories told about young people are so rarely told by them, and what changes when they are.",
      meta: "Oct 2026 · 6 min read",
      tone: "studio",
    },
    {
      title: "Reading a frame",
      body: "The first lesson in film media literacy: every shot is a choice. Here is how to see it.",
      meta: "Oct 2026 · 5 min read",
      tone: "daylight",
    },
    {
      title: "From phone to festival",
      body: "How a student film travels from a first draft on a phone to a screening with a real audience.",
      meta: "Coming Nov 2026",
      tone: "spotlight",
      comingSoon: true,
    },
  ],
};

export const support = {
  title: ["Support the", "movement"],
  body: "Every gift puts cameras, mentors and a real audience within reach of a young storyteller.",
  cta: { label: "Donate", href: "#donate" },
  note: "Your gift goes to a 501(c)(3) nonprofit and is tax-deductible to the extent allowed by law.",
  tone: "crimson" as MediaTone,
  /** Full-bleed backdrop behind the text in "/" (v2 uses `tone` for its card). */
  backdropTone: "dawn" as MediaTone,
};

export const newsletter = {
  eyebrow: "Newsletter",
  heading: "Stay in the story.",
  body: "Films, lessons and news from the movement. About once a month, straight to your inbox.",
};

export const footer = {
  blurb: "OWN THE STORY is a national youth narrative movement.",
  address: ["401 Nostrand Avenue", "Brooklyn, New York 11216"],
  phone: { label: "347-356-8431", href: "tel:+13473568431" },
  columns: [
    { title: "About", links: ["Our story", "Mission", "Team", "Partners"] },
    { title: "Programs", links: ["OWN THE STORY", "For schools", "For youth", "For partners"] },
    { title: "Connect", links: ["Blog", "Donate", "Partner with us", "Contact"] },
    { title: "Legal", links: ["Privacy Policy", "Children's Privacy", "Accessibility Statement", "Terms & Conditions"] },
  ],
  copyright: "© 2026 Own the Story Media Holdings LLC. All rights reserved.",
};

/*
 * Sections below are shared by every version (components/sections). The film
 * titles, directors and schools are placeholders until real ones are supplied.
 */

export const whyItMatters = {
  eyebrow: "Why it matters",
  heading: ["Images are", "not neutral."],
  // `mark` is the phrase picked out in the brand color.
  points: [
    { text: "Every frame is a choice.", mark: "Someone decided what you see and what you don't." },
    { text: "Young people are surrounded by moving images,", mark: "and rarely taught to read them." },
    { text: "Whoever holds the camera", mark: "shapes whose story gets told." },
    { text: "Learning to make an image is", mark: "the surest way to learn to question one." },
  ],
};

export const studentFilms = {
  eyebrow: "Student films",
  heading: ["Four films.", "Four directors."],
  link: { label: "See all films", href: "#film" },
  note: "Titles and credits are placeholders until the first films are confirmed.",
  items: [
    { title: "Film title 01", credit: "Directed by [student], [school]", length: "08 min" },
    { title: "Film title 02", credit: "Directed by [student], [school]", length: "11 min" },
    { title: "Film title 03", credit: "Directed by [student], [school]", length: "06 min" },
    { title: "Film title 04", credit: "Directed by [student], [school]", length: "09 min" },
  ],
};

export const city = {
  eyebrow: "On location",
  heading: ["The city is", "our classroom."],
  body: "Students plan, shoot and screen their films out in the neighborhoods they know best.",
  captions: ["On the block", "Finding the frame", "With the crew", "Calling action", "On set", "In the edit", "Opening night"],
};

export const startHere = {
  heading: "Young filmmakers start here.",
  body: "No experience and no equipment needed. Bring a phone and a point of view.",
  cta: { label: "Explore the programs", href: "#programs" },
};

export const closingStatement = {
  // The middle part is picked out in the brand color.
  text: ["Every movement begins with young people who believe in", "a better future."],
  primaryCta: { label: "Partner with us", href: "#contact" },
  secondaryCta: { label: "Support the movement", href: "#donate" },
};

export const formatNumber = (n: number) => Math.round(n).toLocaleString("en-US");
