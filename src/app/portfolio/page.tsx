import { Metadata } from "next";
import { getPageSEO } from "@/lib/cms";
import { RenderSchema } from "@/components/RenderSchema";
import { Navbar } from "@/components/Navbar";
import HeroSection from "./components/HeroSection";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@/components/Footer").then((m) => m.Footer));
const Integrations = dynamic(() => import("@/components/sections/Integrations").then((m) => m.Integrations));
const OurReputation = dynamic(() => import("@/components/sections/OurReputation").then((m) => m.OurReputation));
const TrustedBy = dynamic(() => import("@/components/sections/TrustedBy").then((m) => m.TrustedBy));
const CTABanner = dynamic(() => import("./components/CTABanner"));
const ProjectShowcase = dynamic(() => import("./components/ProjectShowcase"));

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSEO("portfolio");

  return {
    title: seo?.metaTitle || "Portfolio & Case Studies | The Gold Technologies",
    description: seo?.metaDescription || "Explore a curated showcase of our most impactful digital projects and client success stories.",
    keywords: seo?.targetKeywords || undefined,
    alternates: {
      canonical: seo?.canonicalUrl || undefined,
    },
    robots: {
      index: !seo?.noIndex,
      follow: !seo?.noIndex,
    },
    openGraph: {
      title: seo?.metaTitle || "Portfolio & Case Studies | The Gold Technologies",
      description: seo?.metaDescription || "Explore a curated showcase of our most impactful digital projects and client success stories.",
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.metaTitle || "Portfolio & Case Studies | The Gold Technologies",
      description: seo?.metaDescription || "Explore a curated showcase of our most impactful digital projects and client success stories.",
    },
  };
}

export default async function PortfolioPage() {
  const seo = await getPageSEO("portfolio");
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-brand-gold/20">
      <RenderSchema schema={seo?.schema} id="portfolio-schema" />
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
      <TrustedBy />
      <ProjectShowcase />
      <Integrations />
      <OurReputation />
      <CTABanner />
      <Footer />
    </main>
  );
}
