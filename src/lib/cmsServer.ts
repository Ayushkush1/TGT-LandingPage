/**
 * Server-side CMS access with caching.
 *
 * The pages endpoint returns ~8MB (blog bodies embed base64 images), which is
 * over Next's 2MB data-cache limit, so it is kept in an in-memory
 * stale-while-revalidate cache instead: fresh for TTL_MS, then served stale
 * while a background refresh runs. Concurrent misses share one request.
 */
import { buildPagesState, formatNavLinks, slimPages, blogSlug } from "./cmsData";

const CMS = "https://tgt-cms.vercel.app/api";
const TTL_MS = 60_000;
const REVALIDATE_S = 60;

let pagesCache: { at: number; data: any[] } | null = null;
let inflight: Promise<any[]> | null = null;

async function loadPages(): Promise<any[]> {
  const response = await fetch(`${CMS}/pages`, { cache: "no-store" });
  const json = await response.json();
  return Array.isArray(json?.data) ? json.data : [];
}

function refreshPages(): Promise<any[]> {
  if (!inflight) {
    inflight = loadPages()
      .then((data) => {
        pagesCache = { at: Date.now(), data };
        return data;
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

/** All CMS pages (full, including blog bodies). */
export async function getRawPages(): Promise<any[]> {
  try {
    if (pagesCache) {
      if (Date.now() - pagesCache.at > TTL_MS) refreshPages().catch(() => {});
      return pagesCache.data;
    }
    return await refreshPages();
  } catch (error) {
    console.error("Error fetching CMS pages:", error);
    return pagesCache?.data ?? [];
  }
}

async function getJSON<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${CMS}/${path}`, { next: { revalidate: REVALIDATE_S } });
    const json = await response.json();
    return (json?.data as T) ?? null;
  } catch (error) {
    console.error(`Error fetching CMS ${path}:`, error);
    return null;
  }
}

export const getGlobalSEOData = () => getJSON<any>("seo/global");

/** Everything the client store needs for the first render, minus blog bodies. */
export async function getInitialCMSState() {
  const [pages, rawLinks, globalSEO, banners] = await Promise.all([
    getRawPages(),
    getJSON<any[]>("nav-links"),
    getGlobalSEOData(),
    getJSON<any[]>("ecommerce/banners"),
  ]);
  return {
    ...buildPagesState(slimPages(pages)),
    navLinks: Array.isArray(rawLinks) ? formatNavLinks(rawLinks) : null,
    globalSEO,
    banners,
  };
}

/** Full HTML body of one blog post, looked up by its URL slug. */
export async function getBlogPostHtml(slug: string): Promise<{ title: string; contentHtml: string } | null> {
  const pages = await getRawPages();
  const home = pages.find((p: any) => p.slug === "home");
  const blogs = home?.sections?.find((s: any) => s.type === "BlogSection")?.content?.blogs ?? [];
  const post = blogs.find((b: any) => blogSlug(b.title) === slug);
  return post?.contentHtml ? { title: post.title, contentHtml: post.contentHtml } : null;
}
