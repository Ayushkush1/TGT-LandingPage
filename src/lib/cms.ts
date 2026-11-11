/**
 * Server helpers for routes: page data for the client store, and SEO metadata.
 * All CMS reads go through cmsServer.ts (shared secret + tag caching).
 */
import type { Metadata } from "next";
import { getPage, type CmsPageSlug } from "./cmsServer";
import { pagesState, toPageSEO } from "./cmsData";
import type { PageSEO } from "@/store/useCMSStore";

/** Store state for the given pages, for <CMSPageData state={…}>. */
export async function loadPagesState(...slugs: CmsPageSlug[]) {
  const pages = await Promise.all(slugs.map((slug) => getPage(slug)));
  return pagesState(Object.fromEntries(slugs.map((slug, i) => [slug, pages[i]])));
}

export async function getPageSEO(slug: CmsPageSlug): Promise<PageSEO | null> {
  return toPageSEO((await getPage(slug))?.seo ?? null) ?? null;
}

/** Next metadata from a page's CMS SEO, with defaults for anything not set. */
export async function pageMetadata(
  slug: CmsPageSlug,
  fallback: { title: string; description: string },
): Promise<Metadata> {
  const seo = (await getPage(slug))?.seo;
  const title = seo?.metaTitle || fallback.title;
  const description = seo?.metaDescription || fallback.description;
  const image = seo?.ogImage || seo?.featuredImage || undefined;
  return {
    title,
    description,
    keywords: seo?.targetKeywords || undefined,
    alternates: { canonical: seo?.canonicalUrl || undefined },
    robots: { index: !seo?.noIndex, follow: !seo?.noIndex },
    openGraph: {
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      images: image ? [image] : undefined,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** One service's CMS content ({ hero, services, work, stack, seo, … }), or null. */
export async function getServiceData(slug: string): Promise<any | null> {
  return (await getPage("services"))?.data?.[slug] ?? null;
}

export interface MetadataSEO {
  title: string | null;
  description: string | null;
  keywords: string | null;
  canonical: string | null;
  noIndex: boolean;
}

/** A service page's SEO (SEO → Page Settings → service/<slug>), with a default title. */
export async function getServiceSEO(slug: string): Promise<MetadataSEO | null> {
  const page = await getPage("services");
  if (!page) return null;
  const seo = page.data?.[slug]?.seo;
  if (seo) {
    return {
      title: seo.metaTitle || null,
      description: seo.metaDescription || null,
      keywords: seo.targetKeywords || null,
      canonical: seo.canonicalUrl || null,
      noIndex: seo.noIndex || false,
    };
  }
  return {
    title: `${slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")} | Services`,
    description: page.seo?.metaDescription || null,
    keywords: page.seo?.targetKeywords || null,
    canonical: page.seo?.canonicalUrl ? `${page.seo.canonicalUrl}/${slug}` : null,
    noIndex: page.seo?.noIndex || false,
  };
}

/** The products page's main section ({ hero, grid, products }), or null. */
export async function getProductPageData(): Promise<any | null> {
  return (await getPage("products"))?.data?.main ?? null;
}
