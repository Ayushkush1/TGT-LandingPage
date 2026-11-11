import { CMSPageData } from "@/components/CMSDataInitializer";
import { loadPagesState } from "@/lib/cms";

/** Case study pages read the case studies (CMS: About → Portfolio) from the store. */
export default async function CaseStudyLayout({ children }: { children: React.ReactNode }) {
  const cms = await loadPagesState("about");
  return <CMSPageData state={cms}>{children}</CMSPageData>;
}
