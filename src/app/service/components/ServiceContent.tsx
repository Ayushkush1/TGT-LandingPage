"use client";
import { Navbar } from "@/components/Navbar";
import HeroSection from "./HeroSection";
import { RenderSchema } from "@/components/RenderSchema";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@/components/Footer").then((m) => m.Footer));
const TrustedBy = dynamic(() => import("@/components/sections/TrustedBy").then((m) => m.TrustedBy));
const OurPartners = dynamic(() => import("@/components/sections/OurPartners").then((m) => m.OurPartners));
const OurReputation = dynamic(() => import("@/components/sections/OurReputation").then((m) => m.OurReputation));
const Integrations = dynamic(() => import("@/components/sections/Integrations").then((m) => m.Integrations));
const PortfolioSection = dynamic(() => import("@/app/about/components/PortfolioSection"));
const BlogSection = dynamic(() => import("@/components/sections/BlogSection").then((m) => m.BlogSection));
const ServicesAccordion = dynamic(() => import("./ServiceRow"));

interface ServiceContentProps {
  serviceData: any;
}

export default function ServiceContent({ serviceData }: ServiceContentProps) {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-brand-gold/20">
      <RenderSchema schema={serviceData?.seo?.schema} id="service-subpage-schema" />
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
      </div>
      <Navbar />
      <HeroSection serviceData={serviceData?.hero} />
      <TrustedBy />
      <ServicesAccordion
        serviceData={serviceData?.services}
        header={serviceData?.servicesHeader}
      />
      <OurReputation /> {/* Client Success */}
      <Integrations /> {/* Tech Stack */}
      <PortfolioSection /> {/* PortfolioSection */}
      {/* Partner Logos */}
      <OurPartners />
      <BlogSection /> {/* Blog Section */}
      <Footer />
    </main>
  );
}
