import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";
import { getPageSEO } from "@/lib/cms";
import { RenderSchema } from "@/components/RenderSchema";
import { SmoothScroll } from "@/components/SmoothScroll";
import { GrowthCTA } from "@/components/sections/GrowthCTA";
import { AboutHero } from "./sections/AboutHero";
import { AboutStory } from "./sections/AboutStory";
import { AboutPurpose } from "./sections/AboutPurpose";
import { FounderNote } from "./sections/FounderNote";
import { Journey } from "./sections/Journey";
import { Team } from "./sections/Team";
import { AboutFilm } from "./sections/AboutFilm";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSEO("about");

  return {
    title: seo?.metaTitle || "About Us | The Gold Technologies",
    description:
      seo?.metaDescription ||
      "Learn about The Gold Technologies, our engineering team, mission, vision, and craftsmanship in digital solutions.",
    keywords: seo?.targetKeywords || undefined,
    alternates: {
      canonical: seo?.canonicalUrl || undefined,
    },
    robots: {
      index: !seo?.noIndex,
      follow: !seo?.noIndex,
    },
    openGraph: {
      title: seo?.metaTitle || "About Us | The Gold Technologies",
      description:
        seo?.metaDescription ||
        "Learn about The Gold Technologies, our engineering team, mission, vision, and craftsmanship in digital solutions.",
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.metaTitle || "About Us | The Gold Technologies",
      description:
        seo?.metaDescription ||
        "Learn about The Gold Technologies, our engineering team, mission, vision, and craftsmanship in digital solutions.",
    },
  };
}

async function AboutPage() {
  const seo = await getPageSEO("about");
  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans selection:bg-brand-gold/20">
      <RenderSchema schema={seo?.schema} id="about-schema" />
      <SmoothScroll />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative z-10 focus:outline-none">
        <AboutHero /> {/* Who we are, at a glance */}
        <AboutStory /> {/* Scroll-lit story + numbers */}
        <AboutPurpose /> {/* Mission & vision */}
        <FounderNote /> {/* Short note from the founder */}
        <Journey /> {/* 2015 -> today */}
        <Team /> {/* The people */}
        <AboutFilm /> {/* Company video (click to load) */}
        <GrowthCTA /> {/* Let's talk + brief modal */}
      </main>
      <div className="bg-[#F4F1EA]">
        <Footer />
      </div>
    </div>
  );
}

export default AboutPage;
