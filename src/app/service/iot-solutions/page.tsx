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

const iotHeroContent = {
  label: "Our Services",
  headingLines: ["IoT", "Solutions"],
  paragraphs: [
    "We design and develop smart IoT solutions that connect devices, collect data, and automate processes in real time. From industrial automation to smart homes and connected products, we turn physical systems into intelligent digital ecosystems.",
    "Our IoT services include device integration, cloud connectivity, data analytics, and secure infrastructure — enabling you to monitor, control, and optimize operations from anywhere. Your trusted partner for building connected technology solutions.",
  ],
  cta: { text: "Start your IoT project", href: "/#contactUs" },
  image: {
    src: "https://thegoldtechnologies.com/assets/svg/brands/aboutus.jpg",
    alt: "IoT engineers working on connected devices and smart systems",
  },
  statSince: "2015",
  statProjects: "200",
  pillars: [
    {
      number: "01",
      title: "Smart Device Integration",
      desc: "Seamless connectivity between sensors, devices, and platforms.",
    },
    {
      number: "02",
      title: "Real-Time Monitoring",
      desc: "Track performance and data instantly with intelligent dashboards.",
    },
    {
      number: "03",
      title: "Secure & Scalable Systems",
      desc: "Reliable infrastructure built for large-scale connected environments.",
    },
    {
      number: "04",
      title: "Automation & Efficiency",
      desc: "Optimize operations and reduce manual effort through smart automation.",
    },
  ] as Pillar[],
};

function IOTSolutions() {
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
          <HeroSection {...iotHeroContent} />
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

export default IOTSolutions;
