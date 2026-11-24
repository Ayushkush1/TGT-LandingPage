import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { RenderSchema } from "@/components/RenderSchema";
import { CMSPageData } from "@/components/CMSDataInitializer";
import { CustomSectionRenderer } from "@/components/CustomSectionRenderer";
import { buildSeoMetadata, loadPagesState } from "@/lib/cms";
import { getCustomPage, getPage, type CmsPageSlug } from "@/lib/cmsServer";
import { resolveHeadingTag } from "@/lib/cmsData";

/**
 * Pages made in the CMS's Custom Pages, at /<slug>. Their sections, order and SEO all come
 * from the CMS (/api/site/pages/<slug>); a slug the CMS doesn't have is a 404.
 * Fixed routes (/about, /blog, …) are matched first, so they never land here.
 */

// Rendered per request (like the service pages) so new pages and edits show without a rebuild.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = await getCustomPage(params.slug);
  if (!page) return {};
  return buildSeoMetadata({ ...page.seo, metaTitle: page.seo?.metaTitle || page.seo?.title || null });
}

export default async function CustomPage({ params }: { params: { slug: string } }) {
  const page = await getCustomPage(params.slug);
  if (!page) notFound();

  // Other pages' data that these sections also show (case studies, offices, coverage count, …)
  const types = page.sections.map((s) => s.type);
  const uses = (prefixes: string[]) => types.some((t) => prefixes.some((p) => t.startsWith(p)));
  const pages: CmsPageSlug[] = ["about"];
  if (uses(["Portfolio"])) pages.push("portfolio");
  if (uses(["Contact", "MapSection"])) pages.push("contactUs");
  if (uses(["Media"])) pages.push("media");
  const [cms, services] = await Promise.all([
    loadPagesState(...pages),
    uses(["Service"]) ? getPage("services") : null, // related services, by slug
  ]);

  return (
    <CMSPageData state={cms}>
      <div className="min-h-screen bg-[#0A0A0A] font-sans selection:bg-brand-gold/20">
        <RenderSchema schema={page.seo?.schema} id={`${params.slug}-schema`} />
        <SmoothScroll />
        <Navbar />
        <main id="main-content" tabIndex={-1} className="relative z-10 focus:outline-none">
          <CustomSectionRenderer
            sections={page.sections}
            headingTag={resolveHeadingTag(page.seo?.headingOptions)}
            allServices={services?.data ?? null}
          />
        </main>
        <div className="bg-[#F4F1EA]">
          <Footer />
        </div>
      </div>
    </CMSPageData>
  );
}
