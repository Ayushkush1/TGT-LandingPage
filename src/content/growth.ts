/**
 * Landing page copy for the "all-in-one growth partner" positioning.
 *
 * Each top-level key matches a section `type` on the CMS "home" page. Until a
 * section with that type exists in the CMS these defaults are rendered; once
 * it does, CMS fields override them (see `useSectionContent`).
 */

export type PillarId = "brand" | "build" | "grow" | "scale";

export interface PillarService {
  name: string;
  href: string;
  items: string[];
}

export interface Pillar {
  id: PillarId;
  number: string;
  name: string;
  title: string;
  description: string;
  outcome: string;
  services: PillarService[];
}

const BOOKING_URL = "https://calendar.app.google/5nNHP69fUR5WEMvt9";

export const growthHero = {
  headlineTop: "One team to",
  headlineWords: ["brand,", "build"],
  headlinePrefix: "&",
  headlineHighlight: "grow",
  headlineSuffix: "your business.",
  description:
    "Strategy, design, technology and marketing under one roof. Built for founders and teams who want growth, not another vendor to manage.",
  primaryButtonLabel: "Book a free strategy call",
  primaryButtonUrl: BOOKING_URL,
  secondaryButtonLabel: "See our work",
  secondaryButtonUrl: "#work",
  rating: "5.0",
  ratingLabel: "Average client rating",
  proofLine: "50+ businesses grown worldwide",
  responseLine: "Reply within 24 hours",
  ticker: [
    "Branding",
    "UI/UX Design",
    "Websites",
    "Mobile Apps",
    "SaaS",
    "ERP & CRM",
    "SEO",
    "Performance Ads",
    "Social Media",
    "AI Automation",
    "Business Intelligence",
    "Staff Augmentation",
  ],
};

export const showreel = {
  label: "(Proof, not promises)",
  bigNumber: "70+",
  caption: "launches for brands in 7+ countries",
  linkLabel: "Explore the work",
  linkUrl: "#work",
};

export const manifesto = {
  label: "(Our approach)",
  text: "Most agencies hand you a deliverable and walk away. We stay. One team across brand, product and marketing, measured not by what we ship, but by how much you grow.",
  highlights: ["stay.", "grow."],
  stats: [
    { value: "1", label: "Team for everything" },
    { value: "24h", label: "Response time" },
    { value: "7+", label: "Countries served" },
  ],
};

export const servicePillars = {
  label: "(What we do)",
  headlineMain: "Everything you need to grow.",
  headlineHighlight: "Under one roof.",
  description:
    "Eleven services organised around the four stages of growth. Start with one, or let us run the whole journey.",
  ctaLabel: "Not sure where to start? Get a free audit",
  ctaUrl: BOOKING_URL,
  pillars: [
    {
      id: "brand",
      number: "01",
      name: "Brand",
      title: "Look the part. Be remembered.",
      description:
        "We shape how customers see, feel and remember you, from positioning and identity to interfaces people love using.",
      outcome: "A brand customers trust at first glance.",
      services: [
        {
          name: "Branding & Identity",
          href: "/service/branding",
          items: ["Strategy & positioning", "Logo & visual identity", "Brand voice"],
        },
        {
          name: "UI/UX Design",
          href: "/service/ui-ux-designing",
          items: ["Research", "Prototypes", "Interface & motion design"],
        },
      ],
    },
    {
      id: "build",
      number: "02",
      name: "Build",
      title: "Products that work as hard as you do.",
      description:
        "Fast websites, mobile apps and custom software engineered to scale with your business, not hold it back.",
      outcome: "Digital products that turn visitors into customers.",
      services: [
        {
          name: "Website Design & Development",
          href: "/service/website-design-development",
          items: ["Web apps", "E-commerce", "CMS builds"],
        },
        {
          name: "Mobile App Development",
          href: "/service/mobile-app-development",
          items: ["iOS & Android", "Cross-platform", "App Store launch"],
        },
        {
          name: "Custom Software Development",
          href: "/service/custom-software-development",
          items: ["SaaS", "CRM & ERP", "API integrations"],
        },
        {
          name: "Business Software Solutions",
          href: "/service/business-software-solutions",
          items: ["Workflow automation", "Billing", "HR & inventory"],
        },
      ],
    },
    {
      id: "grow",
      number: "03",
      name: "Grow",
      title: "Get found. Get chosen. Get results.",
      description:
        "Data-driven marketing that puts you in front of the right people and turns attention into revenue.",
      outcome: "Predictable leads and sales you can measure.",
      services: [
        {
          name: "Search & Content Marketing",
          href: "/service/search-content-marketing",
          items: ["SEO", "Content strategy", "Email automation"],
        },
        {
          name: "Social & Performance Marketing",
          href: "/service/social-performance-marketing",
          items: ["Social media", "Paid ads", "Conversion optimisation"],
        },
      ],
    },
    {
      id: "scale",
      number: "04",
      name: "Scale",
      title: "Automate. Analyse. Innovate.",
      description:
        "Use AI, data and on-demand engineering talent to cut manual work, make sharper decisions and stay ahead of competitors.",
      outcome: "Leaner operations, sharper decisions and a team that scales with you.",
      services: [
        {
          name: "AI & ML Solutions",
          href: "/service/ai-ml-solutions",
          items: ["Generative AI", "Chatbots", "Recommendations"],
        },
        {
          name: "Business Intelligence",
          href: "/service/business-intelligence-solutions",
          items: ["Dashboards", "Predictive analytics"],
        },
        {
          name: "Staff Augmentation",
          href: "/service/staff-augmentation",
          items: ["Dedicated developers", "Designers", "Flexible contracts"],
        },
      ],
    },
  ] as Pillar[],
};

export const workShowcase = {
  label: "(Selected work)",
  headlineMain: "Work that",
  headlineHighlight: "moves numbers.",
  description:
    "Real projects for real businesses across hospitality, travel, finance, retail and more.",
  viewAllLabel: "View full portfolio",
  viewAllUrl: "/portfolio",
  /** Display names for CMS case studies whose titles don't fit on one line. */
  shortTitles: {
    "ERP Software to centralise Internal Processes– Bir Credit Solution": "Bir Credit ERP Software",
  } as Record<string, string>,
  ctaEyebrow: "Your turn",
  ctaTitle: "Your project could be next.",
  ctaButtonLabel: "Book a free call",
  ctaButtonUrl: BOOKING_URL,
};

/** Keyword rules that tag a case study title with the pillars it touched. */
export const pillarKeywords: { pillar: PillarId; match: RegExp }[] = [
  { pillar: "brand", match: /redesign|brand|identity|ui|ux/i },
  { pillar: "build", match: /website|web|app|software|erp|platform/i },
  { pillar: "grow", match: /marketing|seo|social|ads/i },
  { pillar: "scale", match: /erp|automation|\bai\b|dashboard|analytics/i },
];

export const growthProcess = {
  label: "(How we work)",
  headlineMain: "A simple path from",
  headlineHighlight: "idea to impact.",
  description:
    "One roadmap, weekly progress and a team that stays with you after launch.",
  steps: [
    {
      number: "01",
      title: "Discover",
      description:
        "We audit your brand, website and funnel, then agree on the goals and KPIs that matter to your business.",
      deliverable: "Growth audit & KPI roadmap",
    },
    {
      number: "02",
      title: "Strategise",
      description:
        "Positioning, identity and a clear 90 day plan so every next step pulls in the same direction.",
      deliverable: "Brand system & 90 day plan",
    },
    {
      number: "03",
      title: "Build & Launch",
      description:
        "Design, development and QA in weekly sprints. You see progress every week, not just at the end.",
      deliverable: "Live website, app or platform",
    },
    {
      number: "04",
      title: "Grow",
      description:
        "Marketing, analytics and continuous improvement. We stay on as your growth team long after launch.",
      deliverable: "Monthly growth reports",
    },
  ],
  commitments: [
    "Transparent weekly updates",
    "Delivered on time",
    "One point of contact",
    "Support for the long run",
  ],
};

export const growthCTA = {
  label: "(Let's talk)",
  headlineMain: "Let's grow",
  headlineHighlight: "together.",
  description:
    "Tell us where you want to grow. You'll get a reply within 24 hours with clear next steps, whether you work with us or not.",
  primaryButtonLabel: "Start your project",
  primaryButtonUrl: BOOKING_URL,
  callTitle: "Prefer to talk?",
  formTitle: "Tell us about your project",
  formNote: "We reply within 24 hours with ideas, not a sales pitch.",
  interestsLabel: "I'm interested in",
  interests: [
    "Branding",
    "UI/UX Design",
    "Website",
    "Mobile App",
    "Custom Software",
    "Digital Marketing",
    "AI & Automation",
    "Staff Augmentation",
    "Full growth partnership",
  ],
  budgetLabel: "Project budget",
  budgets: ["$5k to $10k", "$10k to $25k", "$25k to $50k", "$50k+", "Not sure yet"],
  submitLabel: "Send my brief",
  privacyNote: "No spam. We never share your details.",
  sentNote: "Thanks, your brief is in. We'll reply within 24 hours.",
  sendingNote: "Sending your brief...",
  fallbackNote: "We couldn't reach our server, so your email app has opened with the brief. Just hit send.",
  assurances: [
    "Free 30-minute strategy call",
    "No obligation",
    "Reply within 24 hours",
  ],
  clocks: [
    { city: "Noida", country: "India", timeZone: "Asia/Kolkata" },
    { city: "Dubai", country: "UAE", timeZone: "Asia/Dubai" },
  ],
  localClockLabel: "Your time",
  clocksNote: "Wherever you are, we overlap with your workday.",
};

export const testimonials = {
  label: "(Client stories)",
  headlineMain: "Don't take our word.",
  headlineHighlight: "Take theirs.",
  rating: "5.0",
  ratingLabel: "Average rating from 50+ clients",
  ctaLabel: "Book a free strategy call",
  ctaUrl: BOOKING_URL,
};

/**
 * PLACEHOLDER testimonials so the wall can be designed full. Fictional people:
 * replace with real, approved client quotes (or move them into the CMS) before launch.
 */
export const placeholderTestimonials = [
  { quote: "They rebuilt our website in six weeks and enquiries doubled in the first month. Communication was clear the whole way.", clientName: "Priya Sharma", clientRole: "Founder, Retail brand" },
  { quote: "Our ERP finally matches how we actually work. The team asked the right questions before writing a single line of code.", clientName: "James Whitfield", clientRole: "Operations Director, Logistics" },
  { quote: "From logo to launch campaign, one team handled everything. It saved us months of coordinating agencies.", clientName: "Aisha Rahman", clientRole: "Co-founder, D2C startup" },
  { quote: "The app is fast, stable and our customers rate it highly. Support after launch has been just as good.", clientName: "Daniel Okafor", clientRole: "Product Manager, Fintech" },
  { quote: "Our Google rankings climbed steadily and the leads are better quality. Monthly reports are simple to follow.", clientName: "Emma Laurent", clientRole: "Marketing Head, Hospitality" },
  { quote: "They felt like part of our team, not a vendor. Deadlines were met and nothing was ever lost in translation.", clientName: "Rohan Mehta", clientRole: "CTO, SaaS company" },
  { quote: "The dashboards changed how we make decisions. We now see in minutes what used to take a week of spreadsheets.", clientName: "Sofia Martinez", clientRole: "CFO, Manufacturing" },
  { quote: "Senior developers who slotted straight into our sprints. Scaling the team up and down was effortless.", clientName: "Oliver Grant", clientRole: "Engineering Lead, E-commerce" },
  { quote: "A thoughtful redesign that our users noticed immediately. Bounce rate dropped and time on site went up.", clientName: "Hana Kobayashi", clientRole: "Digital Lead, Education" },
];

export const insights = {
  label: "(Insights)",
  headlineMain: "Ideas that",
  headlineHighlight: "grow businesses.",
  viewAllLabel: "All articles",
};

export const growthFooter = {
  headlineMain: "Have an idea?",
  headlineHighlight: "Let's make it grow.",
  ctaLabel: "Book a free call",
  ctaUrl: BOOKING_URL,
  serviceLinks: [
    { label: "Branding & Identity", href: "/service/branding" },
    { label: "UI/UX Design", href: "/service/ui-ux-designing" },
    { label: "Website Development", href: "/service/website-design-development" },
    { label: "Mobile Apps", href: "/service/mobile-app-development" },
    { label: "Custom Software", href: "/service/custom-software-development" },
    { label: "Search & Content Marketing", href: "/service/search-content-marketing" },
    { label: "Social & Performance Marketing", href: "/service/social-performance-marketing" },
    { label: "AI & ML Solutions", href: "/service/ai-ml-solutions" },
    { label: "Business Intelligence", href: "/service/business-intelligence-solutions" },
  ],
  companyLinks: [
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Products", href: "/products" },
    { label: "Insights", href: "/#BlogSection" },
    { label: "Contact", href: "/contactUs" },
  ],
  wordmarkLeft: "THE",
  wordmark: "GOLD TECH",
  wordmarkRight: "NOLOGIES",
};

export const siteMenu = {
  ctaLabel: "Book a free call",
  ctaUrl: BOOKING_URL,
  /** One-line "what is this" for each product in the Products dropdown, keyed
   *  by the CMS product title. Products not listed fall back to the CMS text. */
  productTaglines: {
    "IP ERP": "ERP for IP firms to manage clients, filings and billing in one place.",
    "Catfy Catalog": "Create and share digital product catalogues in minutes.",
    "Office Book App": "Attendance, payroll, billing and expenses in one app.",
    "Customer Book": "A lead CRM for follow-ups and pipeline tracking.",
    "Quick Commerce App": "Hyperlocal delivery within 30 minutes.",
    "Cloud Kitchen with Own Delivery App": "Ordering, kitchen ops and your own delivery fleet.",
    "Petrol Pump Management System": "Automated fuel stock, credit customers and billing.",
    "EVD Academy": "Online courses and vocational training, end to end.",
  } as Record<string, string>,
  links: [
    { label: "Services", href: "/#services" },
    { label: "Work", href: "/portfolio" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/#BlogSection" },
    { label: "Contact", href: "/#contactUs" },
  ],
};

export const stickyCTA = {
  label: "Available for new projects",
  buttonLabel: "Book a free call",
  buttonUrl: BOOKING_URL,
};

export const growthContent = {
  GrowthHero: growthHero,
  Showreel: showreel,
  Manifesto: manifesto,
  ServicePillars: servicePillars,
  WorkShowcase: workShowcase,
  GrowthProcess: growthProcess,
  GrowthCTA: growthCTA,
  StickyCTA: stickyCTA,
  Testimonials: testimonials,
  Insights: insights,
  SiteMenu: siteMenu,
  GrowthFooter: growthFooter,
};

export type GrowthSectionKey = keyof typeof growthContent;
