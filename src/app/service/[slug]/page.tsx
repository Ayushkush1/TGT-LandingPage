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
import { isServicePage } from "@/content/services";
import { ServicePage } from "../ServicePage";

/** The CMS services by slug; built-in services and ones added with "Add service" in the CMS. */
const loadServices = async () => (await getPage("services"))?.data ?? null;

// Rendered per request (like the other pages) so CMS edits show up without a rebuild.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  if (!isServicePage(params.slug, await loadServices())) return {};
  return serviceMetadata(params.slug);
}

export default async function ServiceRoute({ params }: { params: { slug: string } }) {
  const allServices = await loadServices();
  if (!isServicePage(params.slug, allServices)) notFound();
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
