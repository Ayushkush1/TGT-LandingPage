import type { Metadata } from "next";
import { CMSPageData } from "@/components/CMSDataInitializer";
import { RenderSchema } from "@/components/RenderSchema";
import { buildSeoMetadata, getCaseStudyBySlug, loadPagesState } from "@/lib/cms";

type Params = { params: { name: string } };

/** Per-case-study SEO metadata strictly from CMS (if unset, nothing extra is emitted). */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const item = await getCaseStudyBySlug(params.name);
  return buildSeoMetadata(item?.seo, { type: "article" });
}

/** Case study pages read the case studies (CMS: About → Portfolio) from the store. */
export default async function CaseStudyLayout({ children, params }: Params & { children: React.ReactNode }) {
  const [cms, item] = await Promise.all([loadPagesState("about"), getCaseStudyBySlug(params.name)]);

  return (
    <CMSPageData state={cms}>
      <RenderSchema schema={item?.seo?.schema} id="case-study-schema" />
      {children}
    </CMSPageData>
  );
}
