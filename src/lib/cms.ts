/**
 * Server helpers for routes: page data for the client store, and CMS-driven SEO metadata.
 * All CMS reads go through cmsServer.ts (shared secret + tag caching).
 * Nothing is hardcoded: only metadata and schema provided by the CMS are emitted.
 */
import type { Metadata } from "next";
import { getPage, getSite, type CmsPageSlug } from "./cmsServer";
import { blogSlug, pagesState, resolveHeadingTag, toPageSEO } from "./cmsData";
import type { HeadingTag, PageSEO } from "@/store/useCMSStore";

interface SeoInput {
  metaTitle?: string | null;
  metaDescription?: string | null;
  targetKeywords?: string | null;
  canonicalUrl?: string | null;
  noIndex?: boolean;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  featuredImage?: string | null;
}

/** Builds Next.js Metadata strictly from CMS SEO fields (returns undefined for anything unset). */
export function buildSeoMetadata(
  seo: SeoInput | null | undefined,
  options?: { type?: "website" | "article" },
): Metadata {
  if (!seo) return {};
  const title = seo.metaTitle?.trim() || undefined;
  const description = seo.metaDescription?.trim() || undefined;
  const canonical = seo.canonicalUrl?.trim() || undefined;
  const image = seo.ogImage?.trim() || seo.featuredImage?.trim() || undefined;
  const ogTitle = seo.ogTitle?.trim() || title;
  const ogDescription = seo.ogDescription?.trim() || description;

  return {
    title,
    description,
    keywords: seo.targetKeywords?.trim() || undefined,
    alternates: canonical ? { canonical } : undefined,
    robots: { index: !seo.noIndex, follow: !seo.noIndex },
    openGraph:
      ogTitle || ogDescription || canonical || image
        ? {
            title: ogTitle,
            description: ogDescription,
            url: canonical,
            type: options?.type ?? "website",
            images: image ? [image] : undefined,
          }
        : undefined,
    twitter:
      ogTitle || ogDescription || image
        ? {
            card: "summary_large_image",
            title: ogTitle,
            description: ogDescription,
            images: image ? [image] : undefined,
          }
        : undefined,
  };
}

/** Store state for the given pages, for <CMSPageData state={…}>. */
export async function loadPagesState(...slugs: CmsPageSlug[]) {
  const pages = await Promise.all(slugs.map((slug) => getPage(slug)));
  return pagesState(Object.fromEntries(slugs.map((slug, i) => [slug, pages[i]])));
}

export async function getPageSEO(slug: CmsPageSlug): Promise<PageSEO | null> {
  return toPageSEO((await getPage(slug))?.seo ?? null) ?? null;
}

/** Home page metadata: driven by CMS Global SEO settings (SEO → Global Settings). */
export async function homeMetadata(): Promise<Metadata> {
  const [site, home] = await Promise.all([getSite(), getPage("home")]);
  const globalSEO = site?.settings;
  const seo = home?.seo;
  return buildSeoMetadata({
    metaTitle: globalSEO?.siteTitle || seo?.metaTitle,
    metaDescription: globalSEO?.siteDescription || seo?.metaDescription,
    targetKeywords: seo?.targetKeywords,
    canonicalUrl: seo?.canonicalUrl,
    noIndex: seo?.noIndex ?? false,
    ogTitle: seo?.ogTitle || globalSEO?.siteTitle,
    ogDescription: seo?.ogDescription || globalSEO?.siteDescription,
    ogImage: seo?.ogImage,
    featuredImage: seo?.featuredImage,
  });
}

/** Next metadata strictly from a page's CMS per-page SEO. */
export async function pageMetadata(slug: CmsPageSlug): Promise<Metadata> {
  const seo = (await getPage(slug))?.seo;
  return buildSeoMetadata(seo);
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
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  schema: string | null;
  headingTag: HeadingTag;
}

/** A service page's SEO (CMS: SEO → Page Settings → service/<slug>). */
export async function getServiceSEO(slug: string): Promise<MetadataSEO | null> {
  const page = await getPage("services");
  const seo = page?.data?.[slug]?.seo;
  if (!seo) return null;
  return {
    title: seo.metaTitle || null,
    description: seo.metaDescription || null,
    keywords: seo.targetKeywords || null,
    canonical: seo.canonicalUrl || null,
    noIndex: seo.noIndex ?? false,
    ogTitle: seo.ogTitle || null,
    ogDescription: seo.ogDescription || null,
    ogImage: seo.ogImage || seo.featuredImage || null,
    schema: seo.schema || null,
    headingTag: resolveHeadingTag(seo.headingOptions),
  };
}

/** Next metadata strictly from CMS service SEO. */
export async function serviceMetadata(slug: string): Promise<Metadata> {
  const seo = await getServiceSEO(slug);
  return buildSeoMetadata(
    seo
      ? {
          metaTitle: seo.title,
          metaDescription: seo.description,
          targetKeywords: seo.keywords,
          canonicalUrl: seo.canonical,
          noIndex: seo.noIndex,
          ogTitle: seo.ogTitle,
          ogDescription: seo.ogDescription,
          ogImage: seo.ogImage,
        }
      : null,
  );
}

/** Finds a portfolio case study by its /products/[name] URL slug. */
export async function getCaseStudyBySlug(slug: string): Promise<any | null> {
  const portfolio: any[] = (await getPage("about"))?.data?.Portfolio ?? [];
  const normalized = decodeURIComponent(slug).toLowerCase();
  return portfolio.find((p) => p?.title && p.title.toLowerCase().replace(/\s+/g, "-") === normalized) ?? null;
}

/** Finds a blog post summary by its /blog/[title] URL slug. */
export async function getBlogMetaBySlug(slug: string): Promise<any | null> {
  const blogs: any[] = (await getPage("home"))?.data?.BlogSection?.blogs ?? [];
  const normalized = decodeURIComponent(slug);
  return blogs.find((b) => b?.title && blogSlug(b.title) === normalized) ?? null;
}

/** The products page's main section ({ hero, grid, products }), or null. */
export async function getProductPageData(): Promise<any | null> {
  return (await getPage("products"))?.data?.main ?? null;
}
