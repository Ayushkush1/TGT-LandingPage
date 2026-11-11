/**
 * Default About page copy, used where the CMS (Static pages → About) has none.
 * Each key matches a CMS section on the About page: hero → AboutHero, story → AboutStory,
 * purpose → AboutPurpose, founder → FounderNote, journey → Journey, team → Team, film → AboutFilm.
 */

const BOOKING_URL = "https://calendar.app.google/5nNHP69fUR5WEMvt9";

export const aboutContent = {
  hero: {
    label: "(About us)",
    headlineTop: "The team behind",
    headlineHighlight: "brands that grow.",
    description:
      "Since 2023, our senior team, with 10+ years of experience behind it, has helped founders across 7+ countries brand, build and grow their businesses, and stayed long after launch.",
    meta: ["Since 2023", "Noida · Dubai", "10+ years of expertise"],
    primaryLabel: "Book a free strategy call",
    primaryUrl: BOOKING_URL,
    secondaryLabel: "Meet the team",
    secondaryUrl: "#team",
    imageUrl: "", // CMS hero image; empty: the team photo
  },
  story: {
    label: "(Who we are)",
    text: "We started as engineers who cared about craft. Today we're one team of strategists, designers, developers and marketers who treat your growth as our own, measured not by what we ship, but by what it does for your business.",
    highlights: ["craft.", "growth", "business."],
    stats: [
      { value: "2023", label: "Founded" },
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
    // Pull quote, shown large; `quoteHighlight` is set in gold italic at the end.
    quote: "Every business we take on deserves a team that treats it",
    quoteHighlight: "like its own.",
    note: [
      "When I started The Gold Technologies in 2023, the idea was simple: bring together a senior team with more than a decade of experience to handle brand, product and growth as one, so founders never have to juggle vendors again.",
      "50+ businesses later, that is still how we work. If you are building something that matters, I would love to hear about it.",
    ],
    name: "Meghna Tiwari",
    role: "Founder & CEO",
    photo: "https://res.cloudinary.com/dpa93copz/image/upload/v1794375986/tgt/meghna-portrait-1794375986015.webp",
    backdrop: "Founder's note",
    ctaLabel: "Book a free strategy call",
    ctaUrl: BOOKING_URL,
  },
  journey: {
    label: "(Our journey)",
    headlineMain: "Founded in 2023,",
    headlineHighlight: "built on a decade.",
    milestones: [
      {
        year: "2015",
        title: "The Foundation",
        description: "Established The Gold Technologies with a core focus on innovative digital solutions and setting a new standard for luxury web experiences."
      },
      {
        year: "2018",
        title: "Global Expansion",
        description: "Opened our first international office, securing partnerships with Fortune 500 brands and accelerating our global footprint."
      },
      {
        year: "2021",
        title: "Transformative Growth",
        description: "Tripled our workforce and expanded into cutting-edge AI and SaaS architecture, fundamentally shifting our delivery capabilities."
      },
      {
        year: "2024",
        title: "Industry Leadership",
        description: "Recognized globally as a premier digital agency, setting the benchmark for performance, design, and reliable software engineering."
      }
    ] as { year: string; title: string; description: string }[],
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
    descriptionText: "At The Gold Technologies, we help businesses innovate, grow, and scale through smart, reliable technology solutions tailored to deliver real results.",
    videoUrl: "https://www.youtube.com/embed/Zp1fuVhlP6o?si=M7ocbQbSEnPKZ0EQ",
  },
};

/**
 * Current team (from "TGT Company Portfolio_Updated.pdf", page 3). Order = display order.
 * `photo` is optional: upload it in the CMS and set its URL here.
 * Without it, the CMS photo with the same first name is used (if it's a real,
 * unique photo), otherwise an initials tile is shown.
 */
export const team: {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  /** Small side label shown next to the name, e.g. "Global". */
  tag?: string;
  linkedin?: string;
}[] = [
  { name: "Meghna Tiwari", photo: "https://res.cloudinary.com/dpa93copz/image/upload/v1794375984/tgt/meghna-studio-1794375984288.webp", role: "Founder & CEO", bio: "The fuel that powers the company's vision, growth and innovation." },
  { name: "Saubhagya R Swain", photo: "https://res.cloudinary.com/dpa93copz/image/upload/v1794375985/tgt/saubhagya-studio-1794375985131.webp", role: "Co-Founder & Director", bio: "The powerhouse of the company." },
  { name: "Mitali Gulati", photo: "https://res.cloudinary.com/dpa93copz/image/upload/v1794375985/tgt/mitali-studio-1794375984989.webp", role: "CGO", bio: "The driving force that makes sure the business grows consistently." },
  { name: "Pranay", tag: "Global", photo: "https://res.cloudinary.com/dpa93copz/image/upload/v1794375985/tgt/pranay-1794375985074.webp", role: "Strategic Technical Partner", bio: "Shapes technology strategy and architecture so every product we build is ready to scale." },
  { name: "Ayush", photo: "https://res.cloudinary.com/dpa93copz/image/upload/v1794375983/tgt/ayush-full-1794375983540.webp", role: "Tech Lead, IT", bio: "Leads end-to-end technical architecture and development to accelerate project success." },
  { name: "Kushal", photo: "https://res.cloudinary.com/dpa93copz/image/upload/v1794375984/tgt/kushal-studio-1794375984285.webp", role: "Lead, Digital Marketing", bio: "Drives operational excellence, strategic growth and performance-focused digital marketing." },
  { name: "Sudeesh", photo: "https://res.cloudinary.com/dpa93copz/image/upload/v1794375986/tgt/sudeesh-studio-1794375985918.webp", role: "Full-Stack Developer", bio: "Builds scalable, high-performance web applications." },
  { name: "Himanshu", photo: "https://res.cloudinary.com/dpa93copz/image/upload/v1794375984/tgt/himanshu-studio-1794375984133.webp", role: "DevOps", bio: "Specialises in cloud infrastructure, CI/CD automation and scalable, secure systems." },
  { name: "Sejal", photo: "https://res.cloudinary.com/dpa93copz/image/upload/v1794375986/tgt/sejal-studio-1794375985559.webp", role: "LinkedIn Manager", bio: "Manages LinkedIn strategy, content and engagement to strengthen clients' online presence." },
];
