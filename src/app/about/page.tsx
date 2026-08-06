import { Navbar } from "@/components/Navbar";
import AboutFirm from "./components/AboutFirm";
import { Metadata } from "next";
import { getPageSEO } from "@/lib/cms";
import { RenderSchema } from "@/components/RenderSchema";
import dynamic from "next/dynamic";

const Footer = dynamic(() =>
  import("@/components/Footer").then((m) => m.Footer),
);
const OurTeam = dynamic(() => import("./components/OurTeam"));
const TrustedBy = dynamic(() =>
  import("@/components/sections/TrustedBy").then((m) => m.TrustedBy),
);
const OurPartners = dynamic(() =>
  import("@/components/sections/OurPartners").then((m) => m.OurPartners),
);
const OurReputation = dynamic(() =>
  import("@/components/sections/OurReputation").then((m) => m.OurReputation),
);
const Integrations = dynamic(() =>
  import("@/components/sections/Integrations").then((m) => m.Integrations),
);
const VideoSection = dynamic(() => import("./components/VideoSection"));
const VisionSection = dynamic(() => import("./components/VisionSection"));
const PortfolioSection = dynamic(
  () => import("@/app/about/components/PortfolioSection"),
);
const BlogSection = dynamic(() =>
  import("@/components/sections/BlogSection").then((m) => m.BlogSection),
);

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
    <div className="min-h-screen bg-white font-sans selection:bg-brand-gold/20">
      <RenderSchema schema={seo?.schema} id="about-schema" />
      {/* Unified Background Wrapper */}
      <div className="relative" aria-hidden="true">
        {/* Noise Texture Background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white to-white/5 pointer-events-none" />
      </div>
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="relative z-10 focus:outline-none"
      >
        <AboutFirm />
        <TrustedBy />
        <VideoSection />
        <VisionSection />
        <OurTeam />
        <OurPartners />
        <OurReputation />
        <Integrations />
        <PortfolioSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}

export default AboutPage;
