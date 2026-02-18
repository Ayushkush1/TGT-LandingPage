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

const businessIntelligenceHeroContent = {
  label: "Our Services",
  headingLines: ["Business", "Intelligence", "Solutions"],
  paragraphs: [
    "We design and implement business intelligence solutions that turn your data into clear, actionable insights. From dashboards and reporting to self-service analytics, we help your teams make better decisions, faster.",
    "Our experts work with your existing systems to centralize data, define reliable metrics, and deliver intuitive visualizations. Your dedicated partner for BI platforms that scale with your organization.",
  ],
  cta: { text: "Unlock insights", href: "/contactUs" },
  image: {
    src: "https://thegoldtechnologies.com/assets/svg/brands/aboutus.jpg",
    alt: "Business intelligence and analytics team reviewing dashboards",
  },
  statSince: "2015",
  statProjects: "200",
  pillars: [
    {
      number: "01",
      title: "Data Strategy",
      desc: "Align your data, KPIs, and governance with business objectives for trustworthy insights.",
    },
    {
      number: "02",
      title: "Dashboards & Reporting",
      desc: "Interactive dashboards and reports that give stakeholders real-time visibility into performance.",
    },
    {
      number: "03",
      title: "Data Integration",
      desc: "Connect disparate systems and consolidate data into a single, reliable source of truth.",
    },
    {
      number: "04",
      title: "Advanced Analytics",
      desc: "Leverage forecasting and deeper analysis to identify trends and opportunities earlier.",
    },
  ] as Pillar[],
};

const SERVICES = [
  {
    number: "01",
    title: "BI Strategy & Consulting",
    category: "Strategy · Planning",
    description:
      "Define a clear business intelligence roadmap, aligning data sources, KPIs, and governance with your business goals.",
    tags: ["Data Strategy", "KPIs", "Governance", "Roadmap"],
    outcome:
      "A structured BI plan that ensures accurate and actionable insights.",
  },
  {
    number: "02",
    title: "Data Warehousing",
    category: "Data · Infrastructure",
    description:
      "Design and implement scalable data warehouses that consolidate information from multiple sources.",
    tags: ["ETL", "Data Lakes", "Cloud Warehousing", "Modeling"],
    outcome: "Centralized, reliable data for reporting and analytics.",
  },
  {
    number: "03",
    title: "Dashboard & Visualization",
    category: "Analytics · Reporting",
    description:
      "Create interactive dashboards and visual reports that make complex data easy to understand.",
    tags: ["Power BI", "Tableau", "Visualizations", "Reports"],
    outcome: "Real-time visibility into performance and trends.",
  },
  {
    number: "04",
    title: "Self-Service Analytics",
    category: "Analytics · Enablement",
    description:
      "Enable teams to explore data independently with user-friendly analytics tools and interfaces.",
    tags: ["Ad-hoc Analysis", "Data Exploration", "User Tools", "Insights"],
    outcome: "Faster decision-making across departments.",
  },
  {
    number: "05",
    title: "Predictive & Advanced Analytics",
    category: "AI · Forecasting",
    description:
      "Use statistical models and machine learning to forecast trends and uncover hidden opportunities.",
    tags: ["Forecasting", "Machine Learning", "Trend Analysis", "Optimization"],
    outcome: "Proactive strategies based on future insights.",
  },
  {
    number: "06",
    title: "Maintenance & Optimization",
    category: "Support · Performance",
    description:
      "Continuous monitoring, updates, and optimization to ensure BI systems remain accurate and efficient.",
    tags: ["Monitoring", "Performance Tuning", "Updates", "Support"],
    outcome: "Reliable BI environment with consistent performance.",
  },
];

function BusinessIntelligenceSolutions() {
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
          <HeroSection {...businessIntelligenceHeroContent} />
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

export default BusinessIntelligenceSolutions;
