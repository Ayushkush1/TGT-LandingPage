"use client";
import CTABanner from "@/app/portfolio/components/CTABanner";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { useParams } from "next/navigation";
import HeroSection from "./components/HeroSection";
import ServicesAccordion from "@/app/service/components/ServiceRow";
import { Integrations } from "@/components/sections/Integrations";
import { OurReputation } from "@/components/sections/OurReputation";
import {
  PortfolioItemData,
  ServiceItemData,
  useCMSStore,
} from "@/store/useCMSStore";

function SingleProduct() {
  const slug = useParams().name;
  const portfolios = useCMSStore((state) => state.aboutData?.Portfolio);

  const product =
    portfolios?.find(
      (p) => p.title.toLowerCase().replace(/\s+/g, "-") === slug,
    ) || portfolios?.[0];

  if (!product) {
    return (
      <main className="min-h-screen bg-white font-sans flex items-center justify-center">
        <p className="text-gray-500 text-lg">Product not found.</p>
      </main>
    );
  }

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
      </div>
      <Navbar />
      <HeroSection product={product as PortfolioItemData} />
      <ServicesAccordion serviceData={product.SERVICES as ServiceItemData[]} />
      <OurReputation />
      <Integrations />
      <CTABanner />
      <Footer />
    </main>
  );
}

export default SingleProduct;
