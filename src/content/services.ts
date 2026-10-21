/**
 * Service page extras, sourced from "TGT Company Portfolio_Updated.pdf"
 * (services list, technologies, case results). Hero copy and the six
 * sub-services per page come from the CMS "services" page.
 */
import type { PillarId } from "./growth";

const BOOKING_URL = "https://calendar.app.google/5nNHP69fUR5WEMvt9";

export interface ServiceProof {
  title: string;
  text: string;
  metrics?: { value: string; label: string }[];
}

export interface ServiceExtra {
  pillar: PillarId;
  /** Display name: hero eyebrow and related-service links. */
  name: string;
  /** Benefit-led hero headline; the second part is set in gold italic. */
  promise: [string, string];
  /** Technologies and tools (PDF "Technologies We Work With"). */
  stack: string[];
  proof?: ServiceProof[];
  /** Client projects to name-drop (PDF work pages). */
  work?: string[];
  related: string[];
  /** For pages without their own CMS entry: borrow these "What we deliver" items (by title) from another CMS service. */
  source?: { slug: string; items: string[] };
  /** Page copy for services without a CMS entry; replaces the CMS hero copy and items. */
  content?: {
    intro: string;
    approach: string;
    points: { title: string; desc: string }[];
    items: { title: string; category: string; description: string; tags: string[]; outcome: string }[];
  };
}

export const SERVICE_SLUGS = [
  "branding",
  "ui-ux-designing",
  "website-design-development",
  "mobile-app-development",
  "custom-software-development",
  "business-software-solutions",
  "search-content-marketing",
  "social-performance-marketing",
  "ai-ml-solutions",
  "business-intelligence-solutions",
  "staff-augmentation",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const servicePage = {
  bookingLabel: "Book a free strategy call",
  bookingUrl: BOOKING_URL,
  secondaryLabel: "See what we deliver",
  approachLabel: "(Our approach)",
  deliverLabel: "(What we deliver)",
  deliverHeadline: ["Everything you need,", "end to end."],
  proofLabel: "(Proof)",
  proofHeadline: ["Results we've", "delivered."],
  workLabel: "Brands we've built for",
  reachHeadline: ["Trusted", "worldwide."],
  reach: {
    label: "Trusted by clients in",
    countries: ["UK", "US", "Japan", "Europe", "UAE", "Canada", "India", "Australia"],
    industries:
      "Across tech, education, healthcare, tourism, finance, real estate, e-commerce, renewable energy and more.",
  },
  stackLabel: "(Tools & expertise)",
  stackHeadline: ["Built with", "proven tech."],
  relatedLabel: "Pairs well with",
  why: {
    label: "Why global businesses choose us",
    stats: [
      { value: "10+", label: "Years of team expertise" },
      { value: "40+", label: "Technologies mastered" },
      { value: "7+", label: "Countries served" },
      { value: "24h", label: "Response time" },
    ],
  },
  stackCount: "40+",
  stackNote: "Our full toolkit spans 40+ technologies. These are the ones this service runs on.",
};

export const serviceExtras: Record<ServiceSlug, ServiceExtra> = {
  branding: {
    pillar: "brand",
    name: "Branding & Identity",
    promise: ["Brands people", "remember."],
    stack: ["Brand strategy", "Logo & visual identity", "Personal branding", "Company branding", "Brand voice", "Social creatives"],
    proof: [
      {
        title: "The Social Beacon",
        text: "A full website redesign and refreshed digital presence for a digital marketing agency.",
      },
    ],
    work: ["The Social Beacon", "Label", "Indian Vastu Experts", "The Embassy Inn", "Kokalachi"],
    related: ["ui-ux-designing", "website-design-development", "social-performance-marketing"],
  },
  "ui-ux-designing": {
    pillar: "brand",
    name: "UI/UX Design",
    promise: ["Interfaces people", "love using."],
    stack: ["Wireframing", "Prototyping", "Website UI", "App UI", "Software UI", "Accessibility design"],
    proof: [
      {
        title: "Product interfaces we designed",
        text: "Clean, task-focused interfaces for our own SaaS products: Catfy, Office Book, IP ERP and Customer Book.",
      },
    ],
    work: ["Catfy", "Office Book", "IP ERP", "Customer Book", "Quick Commerce"],
    related: ["branding", "website-design-development", "mobile-app-development"],
  },
  "website-design-development": {
    pillar: "build",
    name: "Website Design & Development",
    promise: ["Websites that", "sell for you."],
    stack: ["React JS", "Next.js", "Vue JS", "Node & Express", "Nest JS", "Laravel", "Django", "WordPress", "Shopify"],
    proof: [
      {
        title: "GreatWaterFilters.com.au",
        text: "A rebuilt e-commerce website for an Australian water filtration brand.",
        metrics: [
          { value: "50%", label: "Conversion rate" },
          { value: "28%", label: "Lower bounce rate" },
        ],
      },
    ],
    work: [
      "PCT Suite", "Himalyanagro", "Encotec Energy", "LFCS Schools", "Cinemac Animation", "Fee-Fam", "D;Space",
      "UnivDatos", "Kumar Power", "Bir Credit Solution", "Indian Vastu Experts", "Kokalachi", "The Social Beacon",
      "The Embassy Inn", "The Seven Stars", "Counsel India", "Label", "VCARE InfoTech",
    ],
    related: ["ui-ux-designing", "search-content-marketing", "custom-software-development"],
  },
  "mobile-app-development": {
    pillar: "build",
    name: "Mobile App Development",
    promise: ["Apps people", "keep opening."],
    stack: ["Flutter", "React Native", "iOS (Swift)", "Android (Java, Kotlin)", "Cross-platform", "App testing & QA"],
    proof: [
      {
        title: "Apps in the field",
        text: "Home healthcare services, Scan & Sign document signing, and an attendance and loan app for sales teams.",
      },
    ],
    work: ["Home Healthcare Services", "Scan & Sign", "Attendance & Loan App"],
    related: ["ui-ux-designing", "custom-software-development", "website-design-development"],
  },
  "custom-software-development": {
    pillar: "build",
    name: "Custom Software Development",
    promise: ["Software built around", "your business."],
    stack: ["MERN Stack", "MEAN Stack", ".NET", "Java", "Python", "Laravel", "Django", "Nest JS", "Blockchain & Web3"],
    proof: [
      {
        title: "PharmID: barcoding for pharma",
        text: "End-to-end serialization and aggregation with barcode labelling for export packaging.",
        metrics: [{ value: "25+", label: "Countries' regulations met" }],
      },
      {
        title: "ERP for a financing firm",
        text: "One platform for loans, insurance, order deliveries and sales-purchase operations, eliminating manual work.",
      },
      {
        title: "CRM for a travel agency",
        text: "Bookings, trip manager assignment, discount coupons, trip schedules, queries and payments in one place.",
      },
    ],
    related: ["business-software-solutions", "mobile-app-development", "ai-ml-solutions"],
  },
  "business-software-solutions": {
    pillar: "build",
    name: "Business Software Solutions",
    promise: ["Run your whole business", "from one place."],
    stack: ["ERP", "CRM", "Inventory management", "HR & payroll", "Workflow automation", "SAP", "Document management"],
    proof: [
      {
        title: "Complete ERP for the IP industry",
        text: "Data bank, sales, operations, accounts and analytics in one system with real-time tracking and reporting.",
      },
      {
        title: "Inventory management system",
        text: "Real-time tracking with a unique QR code per item, barcode stock-out and instant audit reports.",
      },
      {
        title: "Officink office platform",
        text: "HR, finance and task management with workflow automation, live dashboards and secure documents.",
      },
    ],
    related: ["custom-software-development", "business-intelligence-solutions", "ai-ml-solutions"],
  },
  "search-content-marketing": {
    pillar: "grow",
    name: "Search & Content Marketing",
    promise: ["Get found by", "the right buyers."],
    stack: ["SEO", "AEO, AIO & GEO", "Technical SEO", "Content marketing", "Email automation", "Klaviyo", "Podcast management", "Analytics"],
    proof: [
      {
        title: "The Embassy Inn: hotel website and marketing",
        text: "A new booking website backed by search and content marketing, leading to more bookings, stronger brand awareness and better search rankings.",
      },
    ],
    work: ["The Embassy Inn", "The Social Beacon", "GreatWaterFilters"],
    related: ["social-performance-marketing", "website-design-development", "branding"],
    source: {
      slug: "digital-marketing",
      items: ["Search Engine Optimization (SEO)", "Content Marketing Strategy", "Email Marketing Automation"],
    },
    content: {
      intro:
        "We help the right customers find you. Technical SEO, AI search visibility and content that earns trust, so your website brings in qualified traffic month after month.",
      approach:
        "We start with what your buyers actually search for, fix what holds your site back, then publish content that answers them better than anyone else. Every month you see rankings, traffic and leads, not vanity metrics.",
      points: [
        { title: "Search research", desc: "Keywords and questions your buyers use, mapped to the pages that should win them." },
        { title: "Technical foundations", desc: "Speed, structure and indexing fixed so search engines can read and trust your site." },
        { title: "Content that ranks", desc: "Articles, guides and landing pages written to answer real questions and convert." },
        { title: "Nurture and measure", desc: "Email journeys that turn readers into leads, with monthly reporting you can act on." },
      ],
      items: [
        {
          title: "AI Search Optimization (AEO & GEO)",
          category: "Discovery · AI search",
          description:
            "Structuring your content and data so answer engines and AI assistants like ChatGPT, Gemini and Google's AI results cite and recommend your business.",
          tags: ["AEO", "GEO", "SCHEMA", "ENTITY SEO"],
          outcome: "Your brand shows up where buyers now ask their questions.",
        },
      ],
    },
  },
  "social-performance-marketing": {
    pillar: "grow",
    name: "Social & Performance Marketing",
    promise: ["Attention that turns", "into revenue."],
    stack: [
      "Social media management", "Google Ads", "Meta Ads", "Performance marketing", "Influencer marketing",
      "Video marketing", "Retargeting", "Analytics & CRO",
    ],
    proof: [
      {
        title: "Kokalachi: travel brand ads",
        text: "A paid ad campaign for a travel brand that delivered results within its first month.",
        metrics: [{ value: "1 month", label: "To measurable results" }],
      },
      {
        title: "Fee-Fam: clothing brand ads",
        text: "An ad campaign for a clothing brand that generated sales in its very first month.",
        metrics: [{ value: "Month 1", label: "First sales generated" }],
      },
    ],
    work: ["Kokalachi", "Fee-Fam", "The Embassy Inn", "The Social Beacon"],
    related: ["search-content-marketing", "branding", "business-intelligence-solutions"],
    source: {
      slug: "digital-marketing",
      items: ["Social Media Management (SMM)", "Pay-Per-Click Advertising (PPC)", "Conversion Rate Optimization (CRO)"],
    },
    content: {
      intro:
        "Campaigns that turn attention into revenue. We run social media, paid ads and landing page optimisation as one system, so every part of your budget is tracked to results.",
      approach:
        "We find the audiences most likely to buy, build creative that stops the scroll, and send them to pages designed to convert. Then we test, cut what wastes money and scale what works.",
      points: [
        { title: "Audience and creative", desc: "Clear targeting and scroll-stopping content for each platform your buyers use." },
        { title: "Paid funnels", desc: "Google and Meta campaigns structured for the lowest cost per lead or sale." },
        { title: "Conversion optimisation", desc: "Landing pages tested and refined so more of your traffic becomes customers." },
        { title: "Clear reporting", desc: "Spend, leads and revenue in one view, reviewed with you every month." },
      ],
      items: [
        {
          title: "Influencer & Video Marketing",
          category: "Reach · Creative",
          description:
            "Short-form video, creator partnerships and campaign content that build trust quickly and feed your paid and social channels.",
          tags: ["REELS", "CREATORS", "UGC", "VIDEO ADS"],
          outcome: "Content people actually watch, and a brand they remember.",
        },
      ],
    },
  },
  "ai-ml-solutions": {
    pillar: "scale",
    name: "AI & ML Solutions",
    promise: ["AI that does the", "heavy lifting."],
    stack: ["AI & machine learning", "Python", "Flask", "Django", "Generative AI", "AI chatbots", "Recommendations"],
    proof: [
      {
        title: "Catfy: AI catalogue builder",
        text: "AI-written product descriptions and image creation, ready templates, and PDF or web sharing.",
      },
      {
        title: "LeadZenor: AI event networking",
        text: "QR visitor capture, automatic follow-ups and AI event recommendations for exhibitors and organisers.",
      },
    ],
    related: ["business-intelligence-solutions", "custom-software-development", "business-software-solutions"],
  },
  "business-intelligence-solutions": {
    pillar: "scale",
    name: "Business Intelligence",
    promise: ["Turn your data into", "decisions."],
    stack: ["Power BI", "Tableau", "Data warehousing", "Data engineering", "Data visualisation", "Advanced analytics"],
    proof: [
      {
        title: "Financial analytics dashboards",
        text: "Optimised slow reports and built balance sheet, cash flow, financial ratio and executive summary dashboards.",
        metrics: [{ value: "15s → 3s", label: "Report load time" }],
      },
    ],
    related: ["ai-ml-solutions", "business-software-solutions", "social-performance-marketing"],
  },
  "staff-augmentation": {
    pillar: "scale",
    name: "Staff Augmentation",
    promise: ["Senior talent,", "on demand."],
    stack: ["React JS", "Next.js", "Node & Express", "Laravel", "Python", "Flutter", "React Native", "AWS", "Figma"],
    related: ["custom-software-development", "website-design-development", "mobile-app-development"],
    content: {
      intro:
        "Add experienced developers, designers and QA engineers to your team without the cost and delay of hiring. They work in your tools and your hours, on flexible contracts you can scale up or down.",
      approach:
        "Tell us the skills and seniority you need. We match people from our own team, start with a short trial, and handle contracts, payroll and replacements, so you only manage the work.",
      points: [
        { title: "Share your brief", desc: "The roles, skills, seniority and hours you need, in one short call." },
        { title: "Meet your match", desc: "Profiles from our own team, interviewed by you before anyone starts." },
        { title: "Start with a trial", desc: "A short paid trial so you see the quality of work before committing." },
        { title: "Scale freely", desc: "Add, swap or pause people month to month as your roadmap changes." },
      ],
      items: [
        {
          title: "Dedicated Developers",
          category: "Engineering · Full-time",
          description:
            "Frontend, backend, full-stack and mobile developers who join your standups, work in your repositories and ship to your process.",
          tags: ["FRONTEND", "BACKEND", "FULL-STACK", "MOBILE"],
          outcome: "More shipped features without growing your payroll.",
        },
        {
          title: "UI/UX Designers",
          category: "Design · Product",
          description:
            "Product and interface designers for research, wireframes, design systems and polished screens, working alongside your developers.",
          tags: ["FIGMA", "DESIGN SYSTEMS", "PROTOTYPES", "RESEARCH"],
          outcome: "Consistent, user-tested design at the pace your team builds.",
        },
        {
          title: "QA & Test Engineers",
          category: "Quality · Release",
          description:
            "Manual and automated testing across web and mobile, so releases go out on time without surprises for your users.",
          tags: ["AUTOMATION", "REGRESSION", "MOBILE QA", "API TESTING"],
          outcome: "Fewer bugs in production and calmer release days.",
        },
        {
          title: "DevOps & Cloud Engineers",
          category: "Infrastructure · Scale",
          description:
            "Engineers who set up and run your cloud, CI/CD pipelines and monitoring, keeping systems fast, secure and affordable.",
          tags: ["AWS", "CI/CD", "DOCKER", "MONITORING"],
          outcome: "Reliable infrastructure that grows with your traffic.",
        },
        {
          title: "Project & Delivery Managers",
          category: "Delivery · Planning",
          description:
            "Experienced managers who plan sprints, keep stakeholders aligned and make sure the work lands on schedule.",
          tags: ["AGILE", "SCRUM", "ROADMAPS", "REPORTING"],
          outcome: "Predictable delivery and clear visibility for leadership.",
        },
        {
          title: "Dedicated Product Teams",
          category: "Team · End to end",
          description:
            "A ready-made team of developers, a designer, QA and a manager that runs a whole product or workstream for you.",
          tags: ["CROSS-FUNCTIONAL", "OWNERSHIP", "FAST START", "FLEXIBLE"],
          outcome: "A complete team, productive from week one, without months of hiring.",
        },
      ],
    },
  },
};
