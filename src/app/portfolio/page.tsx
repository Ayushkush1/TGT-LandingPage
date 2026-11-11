import type { Metadata } from "next";
import { getPageSEO, loadPagesState, pageMetadata } from "@/lib/cms";
import { RenderSchema } from "@/components/RenderSchema";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CMSPageData } from "@/components/CMSDataInitializer";
import { Testimonials } from "@/components/sections/Testimonials";
import { GrowthCTA } from "@/components/sections/GrowthCTA";
import { PortfolioHero } from "./sections/PortfolioHero";
import { WorkIndex } from "./sections/WorkIndex";
import { Results } from "./sections/Results";

export const generateMetadata = (): Promise<Metadata> =>
  pageMetadata("portfolio", {
    title: "Portfolio & Case Studies | The Gold Technologies",
    description: "Explore a curated showcase of our most impactful digital projects and client success stories.",
  });

export default async function PortfolioPage() {
  const [seo, cms] = await Promise.all([getPageSEO("portfolio"), loadPagesState("portfolio", "about")]);
  return (
    <CMSPageData state={cms}>
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
    </CMSPageData>
  );
}
