/**
 * Server-side CMS access. Server components only: it sends the shared secret.
 *
 * Reads the CMS's website API (/api/site/*), which needs `x-cms-secret`:
 *   - global:              settings, footer, social links, site images, navigation, banners
 *   - pages/<slug>:        { data: { [section]: content }, seo } for one page
 *   - blogs/<slug>:        one blog post body
 *
 * Every response is kept in Next's data cache under a tag (CmsTag) and refetched only when the
 * CMS calls /api/revalidate after a save, so edits show up within seconds without polling.
 * REVALIDATE_S is a safety net in case a ping is missed.
 *
 * If the CMS can't be reached, the last good response is served; with none, callers get null
 * and components fall back to the default copy in src/content/.
 */
import { cache } from "react";

const CMS_URL = (process.env.CMS_URL ?? "").replace(/\/$/, "");
const CMS_SECRET = process.env.CMS_SHARED_SECRET ?? "";
const REVALIDATE_S = 3600;

if (!CMS_URL) console.warn("[cms] CMS_URL is not set: CMS content can't be loaded");
if (!CMS_SECRET) console.warn("[cms] CMS_SHARED_SECRET is not set: CMS content can't be loaded");

/** Cache tags. Must match WebsiteTag in tgt-cms/src/lib/websiteSections.ts */
export const CmsTag = {
  site: "site",
  page: (slug: string) => `page:${slug}`,
};

/** CMS pages the website reads (keys of PAGE_SECTIONS in the CMS). */
export type CmsPageSlug =
  | "home"
  | "about"
  | "services"
  | "products"
  | "portfolio"
  | "contactUs"
  | "blog"
  | "media";

export interface CmsPageSEO {
  title: string;
  slug: string;
  metaTitle: string | null;
  metaDescription: string | null;
  targetKeywords: string | null;
  canonicalUrl: string | null;
  noIndex: boolean;
  featuredImage: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  schema: string | null;
  headingOptions: string;
}

export interface CmsPage {
  data: Record<string, any>;
  seo: CmsPageSEO | null;
}

export interface CmsSite {
  settings: Record<string, any>;
  footer: Record<string, any> | null;
  socialLinks: { platform: string; url: string }[];
  siteImages: Record<string, any> | null;
  navLinks: any[];
  banners: any[];
}

export const cmsUrl = (path: string) => (CMS_URL ? `${CMS_URL}/api/${path.replace(/^\//, "")}` : "");
export const cmsHeaders = (): Record<string, string> => ({ "x-cms-secret": CMS_SECRET });

const lastGood = new Map<string, unknown>();

/** GET a CMS API path; returns the whole JSON body, cached under the given tags. */
async function cmsFetch<T>(path: string, tags: string[]): Promise<T | null> {
  if (!CMS_URL) return (lastGood.get(path) as T) ?? null;
  try {
    const response = await fetch(cmsUrl(path), {
      headers: cmsHeaders(),
      next: { tags, revalidate: REVALIDATE_S },
    });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    if (!json?.success) throw new Error(json?.error || "Unsuccessful response");
    lastGood.set(path, json);
    return json as T;
  } catch (error) {
    console.error(`[cms] Could not load ${path}:`, error);
    return (lastGood.get(path) as T) ?? null;
  }
}

/** Site-wide settings, footer, social links, site images, navigation and banners. */
export const getSite = cache(async (): Promise<CmsSite | null> => {
  const json = await cmsFetch<{ data: CmsSite }>("site/global", [CmsTag.site]);
  return json?.data ?? null;
});

/** One page: its sections in use ({ [type]: content }) and its SEO. */
export const getPage = cache(async (slug: CmsPageSlug): Promise<CmsPage | null> => {
  const json = await cmsFetch<CmsPage>(`site/pages/${slug}`, [CmsTag.page(slug)]);
  return json ? { data: json.data ?? {}, seo: json.seo ?? null } : null;
});

/** Full HTML body of one blog post, by its URL slug. */
export const getBlogPost = cache(async (slug: string) => {
  const json = await cmsFetch<{ data: { title: string; contentHtml: string } }>(
    `site/blogs/${encodeURIComponent(slug)}`,
    [CmsTag.page("blog"), CmsTag.page("home")],
  );
  return json?.data?.contentHtml ? json.data : null;
});
