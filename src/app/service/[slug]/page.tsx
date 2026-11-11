import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { RenderSchema } from "@/components/RenderSchema";
import { GrowthCTA } from "@/components/sections/GrowthCTA";
import { getServiceData, serviceMetadata } from "@/lib/cms";
import { resolveHeadingTag } from "@/lib/cmsData";
import { SERVICE_SLUGS, serviceExtras, type ServiceSlug } from "@/content/services";
import { ServicePage } from "../ServicePage";

const isServiceSlug = (slug: string): slug is ServiceSlug => (SERVICE_SLUGS as readonly string[]).includes(slug);

/**
 * CMS content for a service. Pages without their own CMS body are assembled from
 * their local copy plus any items borrowed from another CMS service, while keeping
 * their own CMS SEO (title, description, schema, headingOptions).
 */
async function loadService(slug: ServiceSlug) {
  const extra = serviceExtras[slug];
  const [ownCms, sourceCms] = await Promise.all([
    getServiceData(slug),
    extra.source ? getServiceData(extra.source.slug) : Promise.resolve(null),
  ]);
  if (!extra.content) return ownCms;
  const borrowed = (sourceCms?.services ?? []).filter((item: { title: string }) => extra.source?.items.includes(item.title));
  return {
    hero: {
      ...(ownCms?.hero ?? {}),
      paragraphs: [extra.content.intro, extra.content.approach],
      pillars: extra.content.points,
    },
    services: [...borrowed, ...extra.content.items],
    seo: ownCms?.seo ?? null,
  };
}

// Rendered per request (like the other pages) so CMS edits show up without a rebuild.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  if (!isServiceSlug(params.slug)) return {};
  return serviceMetadata(params.slug);
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
        <ServicePage slug={params.slug} data={data} headingTag={resolveHeadingTag(data?.seo?.headingOptions)} />
        <GrowthCTA />
      </main>
      <div className="bg-[#F4F1EA]">
        <Footer />
      </div>
    </div>
  );
}
