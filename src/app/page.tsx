import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { WhatWeDo } from "@/components/sections/WhatWeDo";
import { Integrations } from "@/components/sections/Integrations";
import { BlogSection } from "@/components/sections/BlogSection";
import { OurReputation } from "@/components/sections/OurReputation";
import { OurPartners } from "@/components/sections/OurPartners";
import { EnquirySection } from "@/components/sections/EnquirySection";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-brand-gold/20">
      <SmoothScroll />
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/bg-4.jpg')`,
          }}
        />
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-white/85" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <TrustedBy />
        <WhoWeAre /> {/* About Us */}
        <WhatWeDo /> {/* Services */}
        <Integrations /> {/* Tech Stack */} {/* Integrations */}
        <BlogSection /> {/* Recent Articles */}
        <OurReputation /> {/* Client Success */}
        <OurPartners /> {/* Partner Logos */}
        <EnquirySection /> {/* Contact Form */}
        <Footer />
      </div>
    </main>
  );
}
