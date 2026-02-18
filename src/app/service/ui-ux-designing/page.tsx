import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

import { TrustedBy } from "@/components/sections/TrustedBy";
import { OurPartners } from "@/components/sections/OurPartners";
import { OurReputation } from "@/components/sections/OurReputation";
import { Integrations } from "@/components/sections/Integrations";

import HeroSection, { type Pillar } from "./HeroSection";
import PortfolioSection from "@/app/about/components/PortfolioSection";
import { BlogSection } from "@/components/sections/BlogSection";
import ServicesAccordion from "./ServiceRow";

const uiUxHeroContent = {
  label: "Our Services",
  headingLines: ["UI", "UX", "Designing"],
  paragraphs: [
    "We are a dynamic IT solutions and consulting firm dedicated to empowering businesses through technology-driven solutions. With a client-focused approach and a commitment to innovation, we specialize in transforming our clients' digital journeys.",
    "We pride ourselves on being at the forefront of innovation, providing comprehensive IT consultation and cutting-edge IT Solution services to empower businesses in the digital age — your dedicated partner in navigating the ever-evolving landscape of information technology.",
  ],
  cta: { text: "Start your project", href: "/contactUs" },
  image: {
    src: "https://thegoldtechnologies.com/assets/svg/brands/aboutus.jpg",
    alt: "Two professionals having a discussion",
  },
  statSince: "2015",
  statProjects: "200",
  pillars: [
    {
      number: "01",
      title: "Strategic Approach",
      desc: "Thoughtful planning tailored to your unique business goals and market position.",
    },
    {
      number: "02",
      title: "Cutting-Edge Technology",
      desc: "Leveraging the latest innovations to keep your business ahead of the curve.",
    },
    {
      number: "03",
      title: "Expert Team",
      desc: "Seasoned professionals with deep expertise across every technology domain.",
    },
    {
      number: "04",
      title: "Client-Centric Approach",
      desc: "Your success is our benchmark — we build solutions around your needs.",
    },
  ] as Pillar[],
};

const SERVICES = [
  {
    number: "01",
    title: "User Research & Discovery",
    category: "Research · Strategy",
    description:
      "We dive deep into your users' behaviours, needs, and pain points through interviews, surveys, and usability testing to inform every design decision.",
    tags: [
      "User Interviews",
      "Usability Testing",
      "Personas",
      "Journey Mapping",
    ],
    outcome:
      "Built designs grounded in real user insight, reducing rework and guesswork.",
  },
  {
    number: "02",
    title: "Wireframing & Prototyping",
    category: "Design · Interaction",
    description:
      "From low-fidelity sketches to high-fidelity interactive prototypes, we map out every screen and flow before a single line of code is written.",
    tags: ["Wireframes", "Interactive Prototypes", "User Flows", "Figma"],
    outcome: "Validated concepts early, saving development time and budget.",
  },
  {
    number: "03",
    title: "UI Design & Visual Systems",
    category: "Visual Design · Branding",
    description:
      "We craft pixel-perfect interfaces with cohesive design systems — ensuring your product looks stunning and scales consistently across every screen.",
    tags: [
      "Design Systems",
      "Component Libraries",
      "Typography",
      "Colour Theory",
    ],
    outcome:
      "Delivered a scalable visual language that accelerates future development.",
  },
  {
    number: "04",
    title: "Interaction & Motion Design",
    category: "Animation · Experience",
    description:
      "Subtle micro-interactions and purposeful animations that guide users, provide feedback, and bring your product to life without overwhelming the experience.",
    tags: ["Micro-interactions", "Motion Design", "Lottie", "Transitions"],
    outcome:
      "Elevated perceived quality and user delight through thoughtful motion.",
  },
  {
    number: "05",
    title: "Accessibility & Inclusive Design",
    category: "Accessibility · Compliance",
    description:
      "We design for everyone — applying WCAG standards and inclusive design principles so your product is usable by people of all abilities.",
    tags: [
      "WCAG 2.1",
      "Contrast Ratios",
      "Screen Readers",
      "Keyboard Navigation",
    ],
    outcome:
      "Achieved WCAG AA compliance and expanded your accessible user base.",
  },
  {
    number: "06",
    title: "Design Handoff & Dev Support",
    category: "Collaboration · Delivery",
    description:
      "We bridge the gap between design and engineering with thorough handoff documentation, annotated specs, and ongoing support throughout development.",
    tags: ["Figma Handoff", "Design Tokens", "Dev Documentation", "QA Review"],
    outcome:
      "Seamless design-to-development workflow with zero lost-in-translation issues.",
  },
];
function UIUXDesigning() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-brand-gold/20">
      {/* Unified Background Wrapper for Navbar + Hero */}
      <div className="relative">
        {/* Noise Texture Background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          <HeroSection {...uiUxHeroContent} />
        </div>
      </div>
      <TrustedBy />
      <ServicesAccordion SERVICES={SERVICES} />
      <OurReputation /> {/* Client Success */}
      <Integrations /> {/* Tech Stack */} {/* Integrations */}
      <PortfolioSection /> {/* PortfolioSection */}
      {/* Partner Logos */}
      <OurPartners />
      <BlogSection /> {/* Blog Section */}
      <Footer />
    </main>
  );
}

export default UIUXDesigning;
