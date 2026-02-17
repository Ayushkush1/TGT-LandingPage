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

const brandingHeroContent = {
  label: "Our Services",
  headingLines: ["Branding", "& Identity"],
  paragraphs: [
    "We create powerful brand identities that connect with your audience and set you apart from the competition. From logo design to complete brand systems, we craft visual stories that reflect your values and vision.",
    "Our branding process combines strategy, creativity, and market insight — ensuring your brand looks consistent across every platform and leaves a lasting impression. Your trusted partner for building meaningful brands.",
  ],
  cta: { text: "Start your branding project", href: "/#contactUs" },
  image: {
    src: "https://thegoldtechnologies.com/assets/svg/brands/aboutus.jpg",
    alt: "Branding and identity design team working on brand strategy",
  },
  statSince: "2015",
  statProjects: "200",
  pillars: [
    {
      number: "01",
      title: "Brand Strategy",
      desc: "Clear positioning and messaging that defines your brand’s purpose.",
    },
    {
      number: "02",
      title: "Visual Identity",
      desc: "Logos, colors, typography, and design systems that represent your brand.",
    },
    {
      number: "03",
      title: "Consistency Across Platforms",
      desc: "A unified brand experience across web, mobile, and marketing materials.",
    },
    {
      number: "04",
      title: "Memorable Brand Experience",
      desc: "Design that builds recognition, trust, and long-term loyalty.",
    },
  ] as Pillar[],
};

function Branding() {
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
          <HeroSection {...brandingHeroContent} />
        </div>
      </div>
      <TrustedBy />
      <OurReputation /> {/* Client Success */}
      <Integrations /> {/* Tech Stack */} {/* Integrations */}
      <PortfolioSection /> {/* PortfolioSection */}
      <ServicesAccordion />
      {/* Partner Logos */}
      <OurPartners />
      <BlogSection /> {/* Blog Section */}
      <Footer />
    </main>
  );
}

export default Branding;
