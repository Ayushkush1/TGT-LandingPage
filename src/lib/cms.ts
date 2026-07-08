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

export const getPages = cache(async (): Promise<any[]> => {
  const now = Date.now();
  if (globalForCMS.serverCachedPages && now < globalForCMS.serverCachedPagesExpiry) {
    return globalForCMS.serverCachedPages;
  }

  try {
    const response = await fetch("https://tgt-cms.vercel.app/api/pages", {
      cache: "no-store", // Bypasses Next.js 2MB cache limit error
    });
    const json = await response.json();
    const data = json?.data || [];
    globalForCMS.serverCachedPages = data;
    globalForCMS.serverCachedPagesExpiry = now + 5 * 60 * 1000; // Cache for 5 minutes
    return data;
  } catch (error) {
    console.error("Error fetching pages:", error);
    return globalForCMS.serverCachedPages || [];
  }
});

export async function getPageSEO(slug: string): Promise<PageSEO | null> {
  const pages = await getPages();
  const page = pages.find((p: any) => p.slug === slug);
  if (page) {
    const seo = page.seo || {};
    return {
      metaTitle: seo.metaTitle || page.metaTitle || null,
      metaDescription: seo.metaDescription || page.metaDescription || null,
      targetKeywords: seo.targetKeywords || page.targetKeywords || null,
      canonicalUrl: seo.canonicalUrl || page.canonicalUrl || null,
      noIndex: seo.noIndex ?? page.noIndex ?? false,
    };
  }
  return null;
}

export async function getPageData(slug: string): Promise<any | null> {
  const pages = await getPages();
  return pages.find((p: any) => p.slug === slug) || null;
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
