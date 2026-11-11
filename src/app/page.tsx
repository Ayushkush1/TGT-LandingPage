import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GrowthHero } from "@/components/sections/GrowthHero";
import { Showreel } from "@/components/sections/Showreel";
import { Manifesto } from "@/components/sections/Manifesto";
import { ServicePillars } from "@/components/sections/ServicePillars";
import { WorkShowcase } from "@/components/sections/WorkShowcase";
import { GrowthProcess } from "@/components/sections/GrowthProcess";
import { Testimonials } from "@/components/sections/Testimonials";
import { Insights } from "@/components/sections/Insights";
import { GrowthCTA } from "@/components/sections/GrowthCTA";
import { SmoothScroll } from "@/components/SmoothScroll";
import { StickyCTA } from "@/components/StickyCTA";
import { CMSPageData } from "@/components/CMSDataInitializer";
import { RenderSchema } from "@/components/RenderSchema";
import { siteDefaults } from "@/content/siteDefaults";
import { getPage, getSite } from "@/lib/cmsServer";
import { resolveHeadingTag } from "@/lib/cmsData";
import { homeMetadata, loadPagesState } from "@/lib/cms";

// Home page SEO comes strictly from CMS SEO → Global Settings
export const generateMetadata = (): Promise<Metadata> => homeMetadata();

export default async function Home() {
  const [site, home, cms] = await Promise.all([
    getSite(),
    getPage("home"),
    loadPagesState("about"), // case studies in the showreel & work showcase
  ]);
  const background = site?.siteImages?.homeBackground || siteDefaults.homeBackground;
  const globalSEO = site?.settings;
  const headingTag = resolveHeadingTag(globalSEO?.headingOptions || home?.seo?.headingOptions);
  const globalSchema = globalSEO?.schema?.trim() || null;
  const pageSchema = home?.seo?.schema?.trim() || null;

  return (
    <CMSPageData state={cms}>
      <RenderSchema schema={globalSchema} id="global-schema" />
      <RenderSchema
        schema={pageSchema && pageSchema !== globalSchema ? pageSchema : null}
        id="home-schema"
      />
      <main className="min-h-screen bg-white font-sans selection:bg-brand-gold/20">
        <SmoothScroll />
        {/* Background Image */}
        <div className="fixed inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${background}')`,
            }}
          />
          {/* Optional overlay for better text readability */}
          <div className="absolute inset-0 bg-white/85" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          <GrowthHero headingTag={headingTag} /> {/* Positioning + proof */}
          <Showreel /> {/* Scroll-expanding wall of work */}
          <div className="bg-[#F4F1EA]">
            <Manifesto /> {/* Scroll-lit positioning statement */}
          </div>
          <ServicePillars /> {/* Brand / Build / Grow / Scale stacking cards */}
          <WorkShowcase /> {/* Horizontal case-study track */}
          <GrowthProcess /> {/* How we work */}
          <Testimonials /> {/* Client stories */}
          <Insights /> {/* Articles with cursor preview */}
          <GrowthCTA /> {/* Let's talk: book a call or send a brief */}
          <div className="bg-[#F4F1EA]">
            <Footer />
          </div>
        </div>
        <StickyCTA />
      </main>
    </CMSPageData>
  );
}
