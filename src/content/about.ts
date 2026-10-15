/**
 * About page copy for the "all-in-one growth partner" positioning.
 * Team, images, video, milestones and the CEO note come from the CMS;
 * this file holds the narrative copy around them.
 */

const BOOKING_URL = "https://calendar.app.google/5nNHP69fUR5WEMvt9";

export const aboutContent = {
  hero: {
    label: "(About us)",
    headlineTop: "The team behind",
    headlineHighlight: "brands that grow.",
    description:
      "Since 2015 we've helped founders and teams across 7+ countries brand, build and grow their businesses, with one team that stays long after launch.",
    meta: ["Since 2015", "Noida · Dubai", "50+ businesses grown"],
    primaryLabel: "Book a free strategy call",
    primaryUrl: BOOKING_URL,
    secondaryLabel: "Meet the team",
    secondaryUrl: "#team",
  },
  story: {
    label: "(Who we are)",
    text: "We started as engineers who cared about craft. Today we're one team of strategists, designers, developers and marketers who treat your growth as our own, measured not by what we ship, but by what it does for your business.",
    highlights: ["craft.", "growth", "business."],
    stats: [
      { value: "2015", label: "Founded" },
      { value: "70+", label: "Launches" },
      { value: "50+", label: "Businesses grown" },
      { value: "7+", label: "Countries served" },
    ],
  },
  purpose: {
    label: "(Our foundation)",
    headlineMain: "Why we",
    headlineHighlight: "exist.",
    cards: [
      {
        kicker: "Mission",
        title: "Make growth simple.",
        text: "Deliver strategy, design and technology that remove friction from your business, so you can scale with confidence instead of managing vendors.",
      },
      {
        kicker: "Vision",
        title: "The partner growing brands trust.",
        text: "Be the team ambitious businesses worldwide rely on to brand, build and grow, today and for years to come.",
      },
    ],
    values: ["Transparent communication", "On-time delivery", "Senior expertise", "Long-term support"],
  },
  founder: {
    label: "(A note from our founder)",
    linkLabel: "Read the full message",
    linkUrl: "/ceo",
  },
  journey: {
    label: "(Our journey)",
    headlineMain: "A decade of",
    headlineHighlight: "building.",
  },
  team: {
    label: "(The team)",
    headlineMain: "The people",
    headlineHighlight: "behind the work.",
    description: "Senior strategists, designers, engineers and marketers. One team, one point of contact.",
    joinLabel: "We're hiring",
    joinTitle: "Your face could be here.",
    joinUrl: "mailto:info@thegoldtechnologies.com?subject=Careers%20at%20The%20Gold%20Technologies",
  },
  film: {
    label: "(Inside TGT)",
    headlineMain: "See how we",
    headlineHighlight: "work.",
  },
};

/**
 * Current team (from "TGT Company Portfolio_Updated.pdf", page 3). Order = display order.
 * `photo` is optional: drop a file in /public/images/team/ and set it here.
 * Without it, the CMS photo with the same first name is used (if it's a real,
 * unique photo), otherwise an initials tile is shown.
 */
export const team: {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  linkedin?: string;
}[] = [
  { name: "Meghna Tiwari", photo: "/images/team/meghna.webp", role: "Founder & CEO", bio: "The fuel that powers the company's vision, growth and innovation." },
  { name: "Saubhagya R Swain", photo: "/images/team/saubhagya.webp", role: "Co-Founder & Director", bio: "The powerhouse of the company." },
  { name: "Mitali Gulati", photo: "/images/team/mitali.webp", role: "CGO", bio: "The driving force that makes sure the business grows consistently." },
  { name: "Ayush", photo: "/images/team/ayush.webp", role: "Tech Lead, IT", bio: "Leads end-to-end technical architecture and development to accelerate project success." },
  { name: "Kushal", photo: "/images/team/kushal.webp", role: "Lead, Digital Marketing", bio: "Drives operational excellence, strategic growth and performance-focused digital marketing." },
  { name: "Parusha", photo: "/images/team/parusha.webp", role: "Manager, Pre-Sales", bio: "Bridges client needs with strategic solutions and drives business growth." },
  { name: "Sudeesh", photo: "/images/team/sudeesh.webp", role: "Full-Stack Developer", bio: "Builds scalable, high-performance web applications." },
  { name: "Himanshu", photo: "/images/team/himanshu.webp", role: "DevOps", bio: "Specialises in cloud infrastructure, CI/CD automation and scalable, secure systems." },
  { name: "Sejal", photo: "/images/team/sejal.webp", role: "LinkedIn Manager", bio: "Manages LinkedIn strategy, content and engagement to strengthen clients' online presence." },
];

/** Links for the navbar "About" dropdown and the footer. */
export const aboutLinks = [
  { title: "About us", link: "/about", desc: "Our story, mission and the team behind the work." },
  { title: "Leadership & CEO message", link: "/ceo", desc: "A note from our founder on where we're headed." },
  { title: "Our journey", link: "/about#journey", desc: "Milestones from 2015 to today." },
];
