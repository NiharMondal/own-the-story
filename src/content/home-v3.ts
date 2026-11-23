import type { MediaTone } from "@/components/site/media";

/*
 * Copy used only by "/v3". Shared pieces (film, impact, series, support,
 * newsletter, footer) still come from ./home. Most of the text below is taken
 * from the live site (people4peopleproductions.org), tightened for scanning.
 */

export const links = {
  donate: "https://www.givebutter.com/ownthestory",
  curriculum: "https://canva.link/curriculum-fd",
};

export const heroV3 = {
  eyebrow: "Film media literacy for young people",
  title: "Own the story.",
  intro:
    "Filmmaking and storytelling that build real-world skills to solve real-world problems, giving youth the tools to own their stories, shape their futures and lead change.",
  primaryCta: { label: "Bring a workshop to your school", href: "#partner" },
  // "Watch the film" already sits on the hero image, so this points elsewhere.
  secondaryCta: { label: "Explore the labs", href: "#programs" },
  tone: "sunlit" as MediaTone,
};

export const audiences: {
  heading: string;
  items: { icon: "school" | "district" | "sponsor" | "youth"; who: string; body: string; cta: { label: string; href: string } }[];
} = {
  heading: "Find your way in",
  items: [
    {
      icon: "school",
      who: "Schools",
      body: "Launch immersive film workshops that sharpen student voice, critical thinking and identity.",
      cta: { label: "See school pilots", href: "#partner" },
    },
    {
      icon: "district",
      who: "School districts",
      body: "Scale film media literacy across your district with one unified framework.",
      cta: { label: "See district plans", href: "#partner" },
    },
    {
      icon: "sponsor",
      who: "Companies & sponsors",
      body: "Fund film media literacy programs as a high-impact CSR partner.",
      cta: { label: "Become a partner", href: "#partner" },
    },
    {
      icon: "youth",
      who: "Young people",
      body: "Write, shoot and edit your own films, from first idea to final cut.",
      cta: { label: "Explore the labs", href: "#programs" },
    },
  ],
};

export const aboutV3 = {
  eyebrow: "Why we exist",
  heading: "Every story begins with perspective.",
  lead: "Students learn to see the world differently before they learn to film it.",
  body: [
    "Our mission is to empower young people to own their stories, because voice is power, access is mental health equity, and storytelling shapes the future.",
    "Our labs are a space for bold expression and real discovery. Students design, capture and edit films that mirror their lived truths, curiosities and ideas, with New York City as their classroom.",
  ],
  founder: {
    name: "Jennifer Saunders",
    role: "Founder",
    body: "Leads the charge in youth storytelling and film media literacy, and champions mental health equity.",
    // A backlit stand-in, not a portrait: replace with the founder's own photo.
    tone: "silhouette" as MediaTone,
  },
};

export const labs: {
  eyebrow: string;
  heading: string;
  body: string;
  items: { icon: "eye" | "phone" | "ticket"; kicker: string; title: string; body: string; skills: string[]; tone: MediaTone }[];
  steps: { title: string; body: string }[];
  cta: { label: string; href: string };
} = {
  eyebrow: "Cinematic Visual Studies Labs",
  heading: "Three labs. One path from viewer to filmmaker.",
  body: "Each lab builds on the last, so students finish with a film, a portfolio and an audience.",
  items: [
    {
      icon: "eye",
      kicker: "Lab 1 · The foundation",
      title: "Film Media Literacy",
      body: "Learn to read images: framing, editing, sound, point of view, and the messages hiding beneath the surface of a story.",
      skills: ["Visual analysis", "Critical thinking"],
      tone: "classroom",
    },
    {
      icon: "phone",
      kicker: "Lab 2 · On location",
      title: "Smartphone Guerilla Filmmaking",
      body: "Master on-location cinematography with the phone in your pocket, working with peers to capture authentic stories.",
      skills: ["Cinematography", "Collaboration"],
      tone: "dawn",
    },
    {
      icon: "ticket",
      kicker: "Lab 3 · Out into the world",
      title: "Exhibition & Public Screenings",
      body: "Build a professional portfolio, learn event merchandising and host a community screening of your own work.",
      skills: ["Portfolio", "Workforce skills"],
      tone: "stage",
    },
  ],
  steps: [
    { title: "Prepare", body: "Learn to read film and plan a story." },
    { title: "Present", body: "Shoot, edit and screen it for a real audience." },
    { title: "Engage", body: "Lead the conversation the film starts." },
    { title: "Lead", body: "Carry the skills into school, work and community." },
  ],
  cta: { label: "Explore our curriculum", href: links.curriculum },
};

// Tier names, audiences, prices and blurbs are from the live programs page.
// The "includes" bullets are placeholders: confirm them before launch.
export const partnership = {
  eyebrow: "Partner with us",
  heading: "Bring Own the Story to your community.",
  body: "Immersive workshops in classrooms and community centers that combine storytelling, critical thinking and emerging technology.",
  tiers: [
    {
      name: "School Pilot",
      audience: "For a single school",
      price: "From $25K",
      body: "Launch immersive film workshops that sharpen student voice, critical thinking and identity.",
      includes: ["All three labs", "Classroom or after-school", "Community screening"],
    },
    {
      name: "School District",
      audience: "For districts",
      price: "From $150K",
      body: "Scale film media literacy across your district with a unified framework.",
      includes: ["District-wide framework", "Teacher-ready curriculum", "Screenings across schools"],
      featured: true,
    },
    {
      name: "National Partner",
      audience: "For corporate sponsors",
      price: "From $300K",
      body: "High-impact CSR: fund film media literacy programs for young people nationwide.",
      includes: ["Programs in partner communities", "Brand presence at screenings", "Impact reporting"],
    },
  ],
  cta: { label: "Request program details", href: "#contact" },
  note: "Not sure which fits? Request details and we'll help you choose.",
};

export const closing = {
  heading: "Shape what's next.",
  body: "Give young people the skills and agency to shape their communities, their opportunities and their economic futures.",
};
