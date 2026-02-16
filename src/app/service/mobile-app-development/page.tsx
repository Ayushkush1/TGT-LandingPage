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

const mobileAppHeroContent = {
  label: "Our Services",
  headingLines: ["Mobile", "App", "Development"],
  paragraphs: [
    "We build native and cross-platform mobile applications for iOS and Android. From concept to launch, we deliver apps that are fast, intuitive, and aligned with your business goals.",
    "Our team uses modern frameworks and best practices — React Native, Flutter, and native development — to create apps that perform well, engage users, and scale with your growth. Your dedicated partner for mobile app development.",
  ],
  cta: { text: "Build your app", href: "/#contactUs" },
  image: {
    src: "https://thegoldtechnologies.com/assets/svg/brands/aboutus.jpg",
    alt: "Mobile app development team at work",
  },
  statSince: "2015",
  statProjects: "200",
  pillars: [
    {
      number: "01",
      title: "Native & Cross-Platform",
      desc: "iOS, Android, and cross-platform apps built with the right technology for your needs.",
    },
    {
      number: "02",
      title: "User Experience Focus",
      desc: "Intuitive interfaces and smooth performance that keep users engaged and coming back.",
    },
    {
      number: "03",
      title: "Scalable Architecture",
      desc: "Clean code and scalable backend integration to support growth and future features.",
    },
    {
      number: "04",
      title: "End-to-End Support",
      desc: "From design to deployment and maintenance — we support you through every stage.",
    },
  ] as Pillar[],
};

function MobileAppDevelopment() {
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
          <HeroSection {...mobileAppHeroContent} />
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

export default MobileAppDevelopment;
