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

const digitalMarketingHeroContent = {
  label: "Our Services",
  headingLines: ["Digital", "Marketing"],
  paragraphs: [
    "We create data-driven digital marketing strategies that help your business grow online, attract the right audience, and increase conversions. From SEO and social media to paid advertising and content marketing, we deliver measurable results.",
    "Our team combines creativity with analytics — optimizing campaigns, tracking performance, and refining strategies to maximize ROI. Your trusted partner for building a strong and impactful online presence.",
  ],
  cta: { text: "Start your marketing campaign", href: "/#contactUs" },
  image: {
    src: "https://thegoldtechnologies.com/assets/svg/brands/aboutus.jpg",
    alt: "Digital marketing team planning online growth strategies",
  },
  statSince: "2015",
  statProjects: "200",
  pillars: [
    {
      number: "01",
      title: "Search Engine Optimization",
      desc: "Improve visibility and rank higher on search engines to attract organic traffic.",
    },
    {
      number: "02",
      title: "Social Media Marketing",
      desc: "Engage your audience and grow your brand across social platforms.",
    },
    {
      number: "03",
      title: "Performance Advertising",
      desc: "Targeted ad campaigns designed to drive conversions and revenue.",
    },
    {
      number: "04",
      title: "Content & Analytics",
      desc: "Strategic content backed by insights to optimize marketing performance.",
    },
  ] as Pillar[],
};

function DigitalMarketing() {
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
          <HeroSection {...digitalMarketingHeroContent} />
        </div>
      </div>
      <TrustedBy />
      <OurReputation /> {/* Client Success */}
      <ServicesAccordion />
      <Integrations /> {/* Tech Stack */} {/* Integrations */}
      <PortfolioSection /> {/* PortfolioSection */}
      {/* Partner Logos */}
      <OurPartners />
      <BlogSection /> {/* Blog Section */}
      <Footer />
    </main>
  );
}

export default DigitalMarketing;
