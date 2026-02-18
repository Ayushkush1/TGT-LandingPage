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

const customSoftwareDevelopment = {
  label: "Our Services",
  headingLines: ["Custom Software", "Development"],
  paragraphs: [
    "We build tailored software solutions that fit your unique business processes. From enterprise applications to workflow automation and internal tools, we create custom software that streamlines operations and drives efficiency.",
    "Our team analyzes your requirements, designs scalable architectures, and delivers robust solutions using modern technologies and best practices. Your dedicated partner for custom software that grows with your business.",
  ],
  cta: { text: "Get started", href: "/contactUs" },
  image: {
    src: "https://thegoldtechnologies.com/assets/svg/brands/aboutus.jpg",
    alt: "Custom software development team at work",
  },
  statSince: "2015",
  statProjects: "200",
  pillars: [
    {
      number: "01",
      title: "Tailored Solutions",
      desc: "Custom-built software designed specifically for your business processes and requirements.",
    },
    {
      number: "02",
      title: "Enterprise-Grade",
      desc: "Robust, secure, and scalable applications built to handle complex business needs.",
    },
    {
      number: "03",
      title: "Process Automation",
      desc: "Streamline workflows and automate repetitive tasks to boost productivity and efficiency.",
    },
    {
      number: "04",
      title: "Ongoing Support",
      desc: "Continuous maintenance, updates, and enhancements to keep your software current and optimized.",
    },
  ] as Pillar[],
};
const SERVICES = [
  {
    number: "01",
    title: "Enterprise Software Development",
    category: "Enterprise · Applications",
    description:
      "Design and development of large-scale enterprise systems tailored to complex business operations and workflows.",
    tags: ["ERP Systems", "CRM Solutions", "Scalable Architecture", "Security"],
    outcome: "Robust enterprise platforms that improve operational efficiency.",
  },
  {
    number: "02",
    title: "Web & Mobile App Development",
    category: "Applications · Platforms",
    description:
      "Custom web and mobile applications built with modern frameworks to deliver seamless user experiences.",
    tags: ["React", "Next.js", "iOS", "Android"],
    outcome: "High-performance apps accessible across devices and platforms.",
  },
  {
    number: "03",
    title: "Workflow Automation Systems",
    category: "Automation · Productivity",
    description:
      "Automate repetitive processes and integrate systems to streamline business operations and reduce manual work.",
    tags: ["Process Automation", "Integration", "APIs", "Efficiency"],
    outcome: "Faster operations with reduced errors and operational costs.",
  },
  {
    number: "04",
    title: "Legacy System Modernization",
    category: "Modernization · Migration",
    description:
      "Upgrade outdated software with modern technologies, improved performance, and enhanced security.",
    tags: ["Migration", "Refactoring", "Cloud Upgrade", "Performance"],
    outcome:
      "Future-ready systems with improved scalability and maintainability.",
  },
  {
    number: "05",
    title: "Cloud-Based Solutions",
    category: "Cloud · Infrastructure",
    description:
      "Develop and deploy cloud-native applications with secure, scalable, and flexible infrastructure.",
    tags: ["AWS", "Azure", "Microservices", "DevOps"],
    outcome: "Reliable cloud solutions that support business growth.",
  },
  {
    number: "06",
    title: "Maintenance & Support",
    category: "Support · Optimization",
    description:
      "Continuous monitoring, updates, and enhancements to ensure your software remains secure and high-performing.",
    tags: ["Monitoring", "Bug Fixes", "Updates", "Performance Tuning"],
    outcome: "Stable software with long-term reliability and performance.",
  },
];

function CustomSoftwareDevelopment() {
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
          <HeroSection {...customSoftwareDevelopment} />
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

export default CustomSoftwareDevelopment;
