import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { TrustedBy } from "@/components/sections/TrustedBy";
import VideoSection from "../about/components/VideoSection";
import VisionSection from "../about/components/VisionSection";
import { OurPartners } from "@/components/sections/OurPartners";
import { OurReputation } from "@/components/sections/OurReputation";
import { Integrations } from "@/components/sections/Integrations";
import HeroSection, { Pillar } from "../service/ui-ux-designing/HeroSection";
import { BlogSection } from "@/components/sections/BlogSection";

const productHeroContent = {
  label: "Our Product",
  headingLines: ["Smart", "Digital", "Product"],
  paragraphs: [
    "Our product is designed to simplify workflows, enhance productivity, and deliver seamless digital experiences. Built with scalability and performance in mind, it empowers businesses to manage operations efficiently from a single powerful platform.",
    "With an intuitive interface, advanced analytics, and secure architecture, our solution helps organizations make smarter decisions, automate processes, and accelerate growth in today’s fast-paced digital environment.",
  ],
  cta: { text: "Explore Product", href: "/products/" },
  image: {
    src: "https://thegoldtechnologies.com/assets/svg/brands/aboutus.jpg",
    alt: "Team collaborating on product development",
  },
  statSince: "2015",
  statProjects: "500+",
  pillars: [
    {
      number: "01",
      title: "Powerful Features",
      desc: "Comprehensive tools designed to streamline operations and boost productivity.",
    },
    {
      number: "02",
      title: "Scalable Architecture",
      desc: "Built to grow with your business, from startup to enterprise scale.",
    },
    {
      number: "03",
      title: "Seamless Integration",
      desc: "Easily connects with your existing systems and third-party services.",
    },
    {
      number: "04",
      title: "User-Focused Design",
      desc: "Intuitive interface crafted for a smooth and engaging user experience.",
    },
  ] as Pillar[],
};

function ProductPage() {
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
          <HeroSection {...productHeroContent} />
        </div>
      </div>
      <TrustedBy />
      <VideoSection />
      <VisionSection />
      <OurPartners />
      <OurReputation />
      <Integrations />
      <BlogSection /> {/* Blog Section */}
      <Footer />
    </main>
  );
}

export default ProductPage;
