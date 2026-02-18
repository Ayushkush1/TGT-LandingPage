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

const businessSoftwareSolutionsHeroContent = {
  label: "Our Services",
  headingLines: ["Business", "Software", "Solutions"],
  paragraphs: [
    "We deliver comprehensive software solutions that transform how your business operates. From ERP and CRM systems to business intelligence and analytics platforms, we provide integrated solutions that drive growth and efficiency.",
    "Our team combines deep industry knowledge with technical expertise to deliver software that aligns with your business goals. We ensure seamless integration, data security, and scalability. Your dedicated partner for business software solutions.",
  ],
  cta: { text: "Explore solutions", href: "/contactUs" },
  image: {
    src: "https://thegoldtechnologies.com/assets/svg/brands/aboutus.jpg",
    alt: "Business software solutions team at work",
  },
  statSince: "2015",
  statProjects: "200",
  pillars: [
    {
      number: "01",
      title: "Integrated Systems",
      desc: "Seamlessly connect ERP, CRM, and other business systems for unified operations and data flow.",
    },
    {
      number: "02",
      title: "Business Intelligence",
      desc: "Transform data into actionable insights with analytics and reporting tools that drive decision-making.",
    },
    {
      number: "03",
      title: "Cloud & On-Premise",
      desc: "Flexible deployment options — cloud-based or on-premise solutions tailored to your infrastructure needs.",
    },
    {
      number: "04",
      title: "Strategic Consulting",
      desc: "Expert guidance to select, implement, and optimize software solutions that deliver measurable ROI.",
    },
  ] as Pillar[],
};

const SERVICES = [
  {
    number: "01",
    title: "ERP Implementation",
    category: "Enterprise · Operations",
    description:
      "Deploy and customize Enterprise Resource Planning systems to unify finance, HR, supply chain, and operations.",
    tags: ["ERP", "Process Integration", "Data Centralization", "Automation"],
    outcome:
      "Streamlined operations with real-time visibility across departments.",
  },
  {
    number: "02",
    title: "CRM Solutions",
    category: "Customer · Management",
    description:
      "Implement Customer Relationship Management platforms to manage leads, sales pipelines, and customer interactions.",
    tags: ["Sales Automation", "Lead Tracking", "Customer Insights", "Support"],
    outcome: "Improved customer relationships and increased sales efficiency.",
  },
  {
    number: "03",
    title: "Business Intelligence & Analytics",
    category: "Data · Insights",
    description:
      "Advanced analytics dashboards and reporting tools that convert raw data into actionable business insights.",
    tags: ["Dashboards", "Reporting", "KPIs", "Predictive Analytics"],
    outcome: "Data-driven decision-making and performance optimization.",
  },
  {
    number: "04",
    title: "System Integration Services",
    category: "Integration · Connectivity",
    description:
      "Connect disparate business applications into a unified ecosystem with secure data exchange.",
    tags: ["API Integration", "Middleware", "Automation", "Data Sync"],
    outcome: "Seamless communication between systems and improved efficiency.",
  },
  {
    number: "05",
    title: "Cloud Business Applications",
    category: "Cloud · Infrastructure",
    description:
      "Deploy scalable business applications on cloud platforms for flexibility, security, and accessibility.",
    tags: ["SaaS", "Cloud Migration", "Scalability", "Security"],
    outcome: "Flexible systems that support remote work and business growth.",
  },
  {
    number: "06",
    title: "Consulting & Support",
    category: "Strategy · Maintenance",
    description:
      "Expert consulting, implementation support, and continuous optimization to maximize software value.",
    tags: ["Consulting", "Training", "Maintenance", "Optimization"],
    outcome:
      "Long-term success and maximum ROI from your software investments.",
  },
];

function BusinessSoftwareSolutions() {
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
          <HeroSection {...businessSoftwareSolutionsHeroContent} />
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

export default BusinessSoftwareSolutions;
