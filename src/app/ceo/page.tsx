import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import CeoMessage from "./components/CeoMessage";
import { getPageSEO } from "@/lib/cms";
import { RenderSchema } from "@/components/RenderSchema";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@/components/Footer").then((m) => m.Footer));
const CeoPhilosophy = dynamic(() => import("./components/CeoPhilosophy"));
const CeoTimeline = dynamic(() => import("./components/CeoTimeline"));
const CTABanner = dynamic(() => import("../portfolio/components/CTABanner"));

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSEO("ceo");
  if (!seo) return {
    title: "CEO Message | The Gold Technologies",
    description: "A message from our CEO about our vision, passion, and commitment to excellence.",
  };

  return {
    title: seo.metaTitle || "CEO Message | The Gold Technologies",
    description: seo.metaDescription || "A message from our CEO about our vision, passion, and commitment to excellence.",
    keywords: seo.targetKeywords || undefined,
    alternates: {
      canonical: seo.canonicalUrl || undefined,
    },
    robots: {
      index: !seo.noIndex,
      follow: !seo.noIndex,
    },
    openGraph: {
      title: seo.metaTitle || "CEO Message | The Gold Technologies",
      description: seo.metaDescription || "A message from our CEO about our vision, passion, and commitment to excellence.",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle || "CEO Message | The Gold Technologies",
      description: seo.metaDescription || "A message from our CEO about our vision, passion, and commitment to excellence.",
    },
  };
}

export default async function CeoPage() {
  const seo = await getPageSEO("ceo");
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-brand-gold/20">
      <RenderSchema schema={seo?.schema} id="ceo-schema" />
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
      <div className="pt-24 relative z-10">
        <CeoMessage />
        <CeoPhilosophy />
        <CeoTimeline />
        <CTABanner />
      </div>
      <Footer />
    </main>
  );
}
