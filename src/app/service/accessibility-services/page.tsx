import PortfolioSection from "@/app/about/components/PortfolioSection";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { BlogSection } from "@/components/sections/BlogSection";
import { Integrations } from "@/components/sections/Integrations";
import { OurPartners } from "@/components/sections/OurPartners";
import { OurReputation } from "@/components/sections/OurReputation";
import { TrustedBy } from "@/components/sections/TrustedBy";
import HeroSection, { type Pillar } from "../ui-ux-designing/HeroSection";
import ServicesAccordion from "../ui-ux-designing/ServiceRow";

const accessibilityServicesHeroContent = {
  label: "Our Services",
  headingLines: ["Accessibility", "Services"],
  paragraphs: [
    "We make your digital products accessible to everyone. From WCAG compliance audits to remediation and ongoing support, we ensure your websites and applications are usable by people with disabilities.",
    "Our team combines accessibility expertise with technical implementation — we audit, fix, and test to meet WCAG 2.1 AA standards. We help you reach more users, reduce legal risk, and build inclusive digital experiences. Your dedicated partner for accessibility.",
  ],
  cta: { text: "Make it accessible", href: "/contactUs" },
  image: {
    src: "https://thegoldtechnologies.com/assets/svg/brands/aboutus.jpg",
    alt: "Accessibility services team conducting an audit",
  },
  statSince: "2015",
  statProjects: "200",
  pillars: [
    {
      number: "01",
      title: "WCAG Compliance",
      desc: "Audit and remediation to meet WCAG 2.1 AA standards for accessibility compliance.",
    },
    {
      number: "02",
      title: "Testing & Validation",
      desc: "Comprehensive testing with screen readers, keyboard navigation, and assistive technologies.",
    },
    {
      number: "03",
      title: "Inclusive Design",
      desc: "Design and development practices that prioritize accessibility from the start.",
    },
    {
      number: "04",
      title: "Ongoing Support",
      desc: "Continuous monitoring and updates to maintain accessibility as your product evolves.",
    },
  ] as Pillar[],
};

const SERVICES = [
  {
    number: "01",
    title: "Accessibility Audit",
    category: "Compliance · Evaluation",
    description:
      "Comprehensive audit of your website or application to identify accessibility barriers based on WCAG 2.1 AA standards.",
    tags: ["WCAG Audit", "Issue Report", "Compliance Check", "Prioritization"],
    outcome: "A clear roadmap of accessibility issues and recommended fixes.",
  },
  {
    number: "02",
    title: "Remediation & Implementation",
    category: "Development · Fixes",
    description:
      "Fix accessibility issues in code, design, and content to ensure full compliance and usability for assistive technologies.",
    tags: ["Code Fixes", "ARIA", "Semantic HTML", "Design Adjustments"],
    outcome: "An accessible product that works seamlessly for all users.",
  },
  {
    number: "03",
    title: "Assistive Technology Testing",
    category: "Testing · Validation",
    description:
      "Test your product using screen readers, keyboard navigation, and other assistive tools to ensure real-world usability.",
    tags: ["Screen Readers", "Keyboard Testing", "Voice Control", "Validation"],
    outcome: "Verified accessibility across major assistive technologies.",
  },
  {
    number: "04",
    title: "Inclusive UX Design",
    category: "Design · Accessibility",
    description:
      "Design interfaces that consider diverse user needs, including visual, motor, cognitive, and auditory impairments.",
    tags: [
      "Color Contrast",
      "Readable UI",
      "Accessible Components",
      "UX Patterns",
    ],
    outcome: "Inclusive experiences that improve usability for everyone.",
  },
  {
    number: "05",
    title: "Accessibility Training",
    category: "Education · Enablement",
    description:
      "Train your design and development teams on accessibility best practices and standards.",
    tags: ["Workshops", "Guidelines", "Best Practices", "Team Training"],
    outcome:
      "An empowered team capable of building accessible products independently.",
  },
  {
    number: "06",
    title: "Ongoing Monitoring & Support",
    category: "Maintenance · Compliance",
    description:
      "Continuous monitoring, updates, and support to maintain accessibility as your product evolves.",
    tags: ["Monitoring", "Updates", "Compliance Maintenance", "Support"],
    outcome:
      "Long-term accessibility compliance and improved user satisfaction.",
  },
];

function AccessibilityServices() {
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
          <HeroSection {...accessibilityServicesHeroContent} />
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

export default AccessibilityServices;
