import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { RenderSchema } from "@/components/RenderSchema";
import { GrowthCTA } from "@/components/sections/GrowthCTA";
import { getServiceData, getServiceSEO } from "@/lib/cms";
import { SERVICE_SLUGS, serviceExtras, type ServiceSlug } from "@/content/services";
import { ServicePage } from "../ServicePage";

const isServiceSlug = (slug: string): slug is ServiceSlug => (SERVICE_SLUGS as readonly string[]).includes(slug);

/**
 * CMS content for a service. Pages without their own CMS entry are assembled from
 * their local copy plus any items borrowed from another CMS service.
 */
async function loadService(slug: ServiceSlug) {
  const extra = serviceExtras[slug];
  const cms = await getServiceData(extra.source?.slug ?? slug);
  if (!extra.content) return cms;
  const borrowed = (cms?.services ?? []).filter((item: { title: string }) => extra.source?.items.includes(item.title));
  return {
    hero: {
      paragraphs: [extra.content.intro, extra.content.approach],
      pillars: extra.content.points,
    },
    services: [...borrowed, ...extra.content.items],
  };
}

// Rendered per request (like the other pages) so CMS edits show up without a rebuild.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  if (!isServiceSlug(params.slug)) return {};
  const extra = serviceExtras[params.slug];
  if (extra.content) {
    // No CMS entry of its own, so no CMS SEO: build it from the local copy.
    const title = `${extra.name} | The Gold Technologies`;
    return { title, description: extra.content.intro, openGraph: { title, description: extra.content.intro } };
  }
  const seo = await getServiceSEO(params.slug);
  if (!seo) return {};
  return {
    title: seo.title ?? undefined,
    description: seo.description ?? undefined,
    keywords: seo.keywords ?? undefined,
    alternates: { canonical: seo.canonical ?? undefined },
    robots: { index: !seo.noIndex, follow: !seo.noIndex },
  };
}

export default async function ServiceRoute({ params }: { params: { slug: string } }) {
  if (!isServiceSlug(params.slug)) notFound();
  const data = await loadService(params.slug);

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans selection:bg-brand-gold/20">
      <RenderSchema schema={data?.seo?.schema} id="service-schema" />
      <SmoothScroll />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative z-10 focus:outline-none">
        <ServicePage slug={params.slug} data={data} />
        <GrowthCTA />
      </main>
      <div className="bg-[#F4F1EA]">
        <Footer />
      </div>
    </div>
  );
}
