import { Metadata } from "next";
import { getPageSEO } from "@/lib/cms";
import { RenderSchema } from "@/components/RenderSchema";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Testimonials } from "@/components/sections/Testimonials";
import { GrowthCTA } from "@/components/sections/GrowthCTA";
import { PortfolioHero } from "./sections/PortfolioHero";
import { WorkIndex } from "./sections/WorkIndex";
import { Results } from "./sections/Results";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSEO("portfolio");

  return {
    title: seo?.metaTitle || "Portfolio & Case Studies | The Gold Technologies",
    description:
      seo?.metaDescription ||
      "Explore a curated showcase of our most impactful digital projects and client success stories.",
    keywords: seo?.targetKeywords || undefined,
    alternates: {
      canonical: seo?.canonicalUrl || undefined,
    },
    robots: {
      index: !seo?.noIndex,
      follow: !seo?.noIndex,
    },
    openGraph: {
      title:
        seo?.metaTitle || "Portfolio & Case Studies | The Gold Technologies",
      description:
        seo?.metaDescription ||
        "Explore a curated showcase of our most impactful digital projects and client success stories.",
    },
    twitter: {
      card: "summary_large_image",
      title:
        seo?.metaTitle || "Portfolio & Case Studies | The Gold Technologies",
      description:
        seo?.metaDescription ||
        "Explore a curated showcase of our most impactful digital projects and client success stories.",
    },
  };
}

export default async function PortfolioPage() {
  const seo = await getPageSEO("portfolio");
  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans selection:bg-brand-gold/20">
      <RenderSchema schema={seo?.schema} id="portfolio-schema" />
      <SmoothScroll />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative z-10 focus:outline-none">
        <PortfolioHero /> {/* Positioning + featured case study */}
        <WorkIndex /> {/* Filterable case studies */}
        <Results /> {/* Headline numbers */}
        <Testimonials /> {/* Client stories */}
        <GrowthCTA /> {/* Let's talk + brief modal */}
      </main>
      <div className="bg-[#F4F1EA]">
        <Footer />
      </div>
    </div>
  );
}
