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

const websiteDesignHeroContent = {
  label: "Our Services",
  headingLines: ["Website", "Design & Development"],
  paragraphs: [
    "We build modern, fast, and scalable websites that drive growth. From responsive corporate sites to e-commerce and web applications, we combine clean design with robust development to deliver digital experiences that perform.",
    "Our team uses proven technologies and best practices — responsive layouts, performance optimization, and SEO foundations — so your site looks great on every device and ranks well. Your dedicated partner for web design and development.",
  ],
  cta: { text: "Start your project", href: "/#contactUs" },
  image: {
    src: "https://thegoldtechnologies.com/assets/svg/brands/aboutus.jpg",
    alt: "Website design and development team at work",
  },
  statSince: "2015",
  statProjects: "200",
  pillars: [
    {
      number: "01",
      title: "Responsive & Modern",
      desc: "Websites that look and perform beautifully across all devices and screen sizes.",
    },
    {
      number: "02",
      title: "Performance & SEO",
      desc: "Fast load times and search-friendly structure to help you reach more customers.",
    },
    {
      number: "03",
      title: "Scalable Development",
      desc: "Clean, maintainable code and scalable architecture for long-term growth.",
    },
    {
      number: "04",
      title: "Client-Centric Delivery",
      desc: "Your goals and timeline drive the process — we deliver on scope and quality.",
    },
  ] as Pillar[],
};

function WebsiteDesignDevelopment() {
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
          <HeroSection {...websiteDesignHeroContent} />
        </div>
      </div>
      <TrustedBy />
      <OurReputation /> {/* Client Success */}
      <Integrations /> {/* Tech Stack */} {/* Integrations */}
      <ServicesAccordion />
      <PortfolioSection /> {/* PortfolioSection */}
      {/* Partner Logos */}
      <OurPartners />
      <BlogSection /> {/* Blog Section */}
      <Footer />
    </main>
  );
}

export default WebsiteDesignDevelopment;
