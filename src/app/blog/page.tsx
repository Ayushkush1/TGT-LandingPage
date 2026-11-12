import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { GrowthCTA } from "@/components/sections/GrowthCTA";
import { CMSPageData } from "@/components/CMSDataInitializer";
import { RenderSchema } from "@/components/RenderSchema";
import { getPageSEO, loadPagesState, pageMetadata } from "@/lib/cms";
import { resolveHeadingTag } from "@/lib/cmsData";
import { BlogIndex } from "./BlogIndex";

export const generateMetadata = (): Promise<Metadata> => pageMetadata("blog");

export default async function BlogPage() {
  const [seo, cms] = await Promise.all([getPageSEO("blog"), loadPagesState("blog")]);
  return (
    <CMSPageData state={cms}>
      <RenderSchema schema={seo?.schema} id="blog-schema" />
      <div className="min-h-screen bg-[#0A0A0A] font-sans selection:bg-brand-gold/20">
        <SmoothScroll />
        <Navbar />
        <main id="main-content" tabIndex={-1} className="relative z-10 focus:outline-none">
          <BlogIndex headingTag={resolveHeadingTag(seo?.headingOptions)} />
          <GrowthCTA />
        </main>
        <div className="bg-[#F4F1EA]">
          <Footer />
        </div>
      </div>
    </CMSPageData>
  );
}
