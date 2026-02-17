import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { TrustedBy } from "@/components/sections/TrustedBy";
import VideoSection from "../about/components/VideoSection";
import VisionSection from "../about/components/VisionSection";
import { OurPartners } from "@/components/sections/OurPartners";
import { OurReputation } from "@/components/sections/OurReputation";
import { Integrations } from "@/components/sections/Integrations";

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
        </div>
      </div>
      <TrustedBy />
      <VideoSection />
      <VisionSection />
      <OurPartners /> Partner Logos
      <OurReputation /> Client Success
      <Integrations /> Tech Stack Integrations
      <Footer />
    </main>
  );
}

export default ProductPage;
