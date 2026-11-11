import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";
import { getPageSEO, loadPagesState, pageMetadata } from "@/lib/cms";
import { resolveHeadingTag } from "@/lib/cmsData";
import { RenderSchema } from "@/components/RenderSchema";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CMSPageData } from "@/components/CMSDataInitializer";
import { GrowthCTA } from "@/components/sections/GrowthCTA";
import { AboutHero } from "./sections/AboutHero";
import { AboutStory } from "./sections/AboutStory";
import { AboutPurpose } from "./sections/AboutPurpose";
import { FounderNote } from "./sections/FounderNote";
import { Journey } from "./sections/Journey";
import { Team } from "./sections/Team";
import { AboutFilm } from "./sections/AboutFilm";

export const generateMetadata = (): Promise<Metadata> => pageMetadata("about");

async function AboutPage() {
  const [seo, cms] = await Promise.all([getPageSEO("about"), loadPagesState("about")]);
  return (
    <CMSPageData state={cms}>
      <div className="min-h-screen bg-[#0A0A0A] font-sans selection:bg-brand-gold/20">
        <RenderSchema schema={seo?.schema} id="about-schema" />
        <SmoothScroll />
        <Navbar />
        <main id="main-content" tabIndex={-1} className="relative z-10 focus:outline-none">
          <AboutHero headingTag={resolveHeadingTag(seo?.headingOptions)} /> {/* Who we are, at a glance */}
          <AboutStory /> {/* Scroll-lit story + numbers */}
          <AboutPurpose /> {/* Mission & vision */}
          <FounderNote /> {/* Short note from the founder */}
          <Journey /> {/* Milestones */}
          <Team /> {/* The people */}
          <AboutFilm /> {/* Company video (click to load) */}
          <GrowthCTA /> {/* Let's talk + brief modal */}
        </main>
        <div className="bg-[#F4F1EA]">
          <Footer />
        </div>
      </div>
    </CMSPageData>
  );
}

export default AboutPage;
