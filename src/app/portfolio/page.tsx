import { Metadata } from "next";
import { getPageSEO } from "@/lib/cms";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Integrations } from "@/components/sections/Integrations";
import { OurReputation } from "@/components/sections/OurReputation";
import CTABanner from "./components/CTABanner";
import HeroSection from "./components/HeroSection";
import PortfolioSection from "../about/components/PortfolioSection";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSEO("portfolio");
  if (!seo) return {};

  return {
    title: seo.metaTitle || undefined,
    description: seo.metaDescription || undefined,
    keywords: seo.targetKeywords || undefined,
    alternates: {
      canonical: seo.canonicalUrl || undefined,
    },
    robots: {
      index: !seo.noIndex,
      follow: !seo.noIndex,
    },
    openGraph: {
      title: seo.metaTitle || undefined,
      description: seo.metaDescription || undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle || undefined,
      description: seo.metaDescription || undefined,
    },
  };
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-brand-gold/20">
      <div className="relative">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 pointer-events-none" />
      </div>
      <Navbar />
      <HeroSection />
      <PortfolioSection />
      <Integrations />
      <OurReputation />
      <CTABanner />
      <Footer />
    </main>
  );
}
