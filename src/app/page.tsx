import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { SmoothScroll } from "@/components/SmoothScroll";
import { getPageSEO } from "@/lib/cms";
import { RenderSchema } from "@/components/RenderSchema";
import dynamic from "next/dynamic";

const TrustedBy = dynamic(() => import("@/components/sections/TrustedBy").then((m) => m.TrustedBy));
const WhoWeAre = dynamic(() => import("@/components/sections/WhoWeAre").then((m) => m.WhoWeAre));
const WhatWeDo = dynamic(() => import("@/components/sections/WhatWeDo").then((m) => m.WhatWeDo));
const Integrations = dynamic(() => import("@/components/sections/Integrations").then((m) => m.Integrations));
const BlogSection = dynamic(() => import("@/components/sections/BlogSection").then((m) => m.BlogSection));
const OurReputation = dynamic(() => import("@/components/sections/OurReputation").then((m) => m.OurReputation));
const OurPartners = dynamic(() => import("@/components/sections/OurPartners").then((m) => m.OurPartners));
const EnquirySection = dynamic(() => import("@/components/sections/EnquirySection").then((m) => m.EnquirySection));
const Footer = dynamic(() => import("@/components/Footer").then((m) => m.Footer));

export default async function Home() {
  const seo = await getPageSEO("home");
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-brand-gold/20">
      <RenderSchema schema={seo?.schema} id="home-schema" />
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
        <WhoWeAre />
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
