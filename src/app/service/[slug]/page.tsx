import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { RenderSchema } from "@/components/RenderSchema";
import { GrowthCTA } from "@/components/sections/GrowthCTA";
import { serviceMetadata } from "@/lib/cms";
import { getPage } from "@/lib/cmsServer";
import { resolveHeadingTag } from "@/lib/cmsData";
import { SERVICE_SLUGS, type ServiceSlug } from "@/content/services";
import { ServicePage } from "../ServicePage";

const isServiceSlug = (slug: string): slug is ServiceSlug => (SERVICE_SLUGS as readonly string[]).includes(slug);

// Rendered per request (like the other pages) so CMS edits show up without a rebuild.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  if (!isServiceSlug(params.slug)) return {};
  return serviceMetadata(params.slug);
}

export default async function ServiceRoute({ params }: { params: { slug: string } }) {
  if (!isServiceSlug(params.slug)) notFound();
  const servicesPage = await getPage("services");
  const allServices = servicesPage?.data ?? null;
  const data = allServices?.[params.slug] ?? null;

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans selection:bg-brand-gold/20">
      <RenderSchema schema={data?.seo?.schema} id="service-schema" />
      <SmoothScroll />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative z-10 focus:outline-none">
        <ServicePage
          slug={params.slug}
          data={data}
          allServices={allServices}
          headingTag={resolveHeadingTag(data?.seo?.headingOptions)}
        />
        <GrowthCTA />
      </main>
      <div className="bg-[#F4F1EA]">
        <Footer />
      </div>
    </div>
  );
}
