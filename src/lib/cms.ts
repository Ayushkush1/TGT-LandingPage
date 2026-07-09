import { PageSEO } from "@/store/useCMSStore";
import { cache } from "react";

// Global object caching to survive hot-reloads in Next.js development mode
const globalForCMS = global as unknown as {
  serverCachedPages: any[] | null;
  serverCachedPagesExpiry: number;
};

if (globalForCMS.serverCachedPages === undefined) {
  globalForCMS.serverCachedPages = null;
  globalForCMS.serverCachedPagesExpiry = 0;
}

const cmsApiUrl = process.env.NEXT_PUBLIC_CMS_API_URL || "https://tgt-cms.vercel.app";

export const getPages = cache(async (forceRefresh = false): Promise<any[]> => {
  const now = Date.now();
  const isDev = process.env.NODE_ENV === "development";
  const cacheExpiryDuration = isDev ? 0 : 5 * 60 * 1000;

  if (
    !isDev &&
    !forceRefresh &&
    globalForCMS.serverCachedPages &&
    now < globalForCMS.serverCachedPagesExpiry
  ) {
    return globalForCMS.serverCachedPages;
  }

  try {
    const response = await fetch(`${cmsApiUrl}/api/pages`, {
      cache: "no-store", // Bypasses Next.js 2MB cache limit error
    });
    const json = await response.json();
    const data = json?.data || [];
    globalForCMS.serverCachedPages = data;
    globalForCMS.serverCachedPagesExpiry = now + cacheExpiryDuration;
    return data;
  } catch (error) {
    console.error("Error fetching pages:", error);
    return globalForCMS.serverCachedPages || [];
  }
});

export async function getPageSEO(slug: string): Promise<PageSEO | null> {
  let pages = await getPages();
  let page = pages.find((p: any) => p.slug === slug);
  if (!page) {
    // Self-healing fallback: refresh cache in case of new page creations
    pages = await getPages(true);
    page = pages.find((p: any) => p.slug === slug);
  }
  if (page) {
    const seo = page.seo || {};
    return {
      metaTitle: seo.metaTitle || page.metaTitle || null,
      metaDescription: seo.metaDescription || page.metaDescription || null,
      targetKeywords: seo.targetKeywords || page.targetKeywords || null,
      canonicalUrl: seo.canonicalUrl || page.canonicalUrl || null,
      noIndex: seo.noIndex ?? page.noIndex ?? false,
      schema: seo.schema || page.schema || null,
    };
  }
  return null;
}

export async function getPageData(slug: string): Promise<any | null> {
  let pages = await getPages();
  let page = pages.find((p: any) => p.slug === slug);
  if (!page) {
    // Self-healing fallback: refresh cache in case of new page creations
    pages = await getPages(true);
    page = pages.find((p: any) => p.slug === slug);
  }
  return page || null;
}

export async function getServiceData(slug: string): Promise<any | null> {
  const pages = await getPages();
  const servicePage = pages.find((p: any) => p.slug === "services");
  if (servicePage?.sections) {
    const section = servicePage.sections.find((s: any) => s.type === slug);
    return section?.content || null;
  }
  return null;
}

export async function getServiceSEO(slug: string): Promise<MetadataSEO | null> {
  const pages = await getPages();
  const servicePage = pages.find((p: any) => p.slug === "services");
  if (!servicePage) return null;

  const section = servicePage.sections?.find((s: any) => s.type === slug);
  const sectionSEO = section?.content?.seo;

  if (sectionSEO) {
    return {
      title: sectionSEO.metaTitle || null,
      description: sectionSEO.metaDescription || null,
      keywords: sectionSEO.targetKeywords || null,
      canonical: sectionSEO.canonicalUrl || null,
      noIndex: sectionSEO.noIndex || false,
    };
  }

  return {
    title: `${slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")} | Services`,
    description: servicePage.metaDescription || null,
    keywords: servicePage.targetKeywords || null,
    canonical: servicePage.canonicalUrl
      ? `${servicePage.canonicalUrl}/${slug}`
      : null,
    noIndex: servicePage.noIndex || false,
  };
}

export async function getProductPageData(): Promise<any | null> {
  const pages = await getPages();
  const productPage = pages.find((p: any) => p.slug === "products");
  if (productPage?.sections) {
    const mainSection = productPage.sections.find(
      (s: any) => s.type === "main",
    );
    if (mainSection?.content) {
      return {
        hero: mainSection.content.hero,
        products: mainSection.content.products || [],
      };
    }
  }
  return null;
}

export async function getPortfolioData(): Promise<any[]> {
  const pages = await getPages();
  const aboutPage = pages.find((p: any) => p.slug === "about");
  if (aboutPage?.sections) {
    const portfolioSection = aboutPage.sections.find(
      (s: any) => s.type === "Portfolio",
    );
    return portfolioSection?.content || [];
  }
  return [];
}

export interface MetadataSEO {
  title: string | null;
  description: string | null;
  keywords: string | null;
  canonical: string | null;
  noIndex: boolean;
}
