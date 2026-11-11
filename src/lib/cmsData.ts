/**
 * Pure helpers that turn CMS website API responses (see cmsServer.ts) into the CMS store's
 * shape. Used on the server; the result is handed to the client store (CMSDataInitializer).
 */
import type { ApiNavLink, CMSState, GlobalSEOData, NavLink, PageSEO, SiteData } from "@/store/useCMSStore";
import type { CmsPage, CmsPageSlug, CmsSite } from "./cmsServer";

/** CMS page → store field. */
export const PAGE_KEYS = {
  home: "homeData",
  about: "aboutData",
  contactUs: "contactData",
  products: "productData",
  services: "serviceData",
  portfolio: "portfolioData",
  blog: "blogData",
  media: "mediaData",
} as const satisfies Record<CmsPageSlug, string>;

export const toPageSEO = (seo: CmsPage["seo"]): PageSEO | undefined =>
  seo
    ? {
        metaTitle: seo.metaTitle,
        metaDescription: seo.metaDescription,
        targetKeywords: seo.targetKeywords,
        canonicalUrl: seo.canonicalUrl,
        noIndex: seo.noIndex ?? false,
        schema: seo.schema,
      }
    : undefined;

/** { homeData: { ...sections, seo } } and so on, for the pages given. */
export function pagesState(pages: Partial<Record<CmsPageSlug, CmsPage | null>>): Partial<CMSState> {
  const state: Record<string, unknown> = {};
  for (const [slug, page] of Object.entries(pages) as [CmsPageSlug, CmsPage | null][]) {
    if (page) state[PAGE_KEYS[slug]] = { ...page.data, seo: toPageSEO(page.seo) };
  }
  return state;
}

/** Store fields filled from /api/site/global. */
export function siteState(site: CmsSite | null): Partial<CMSState> {
  if (!site) return {};
  return {
    globalSEO: { ...site.settings, socialLinks: site.socialLinks } as GlobalSEOData,
    site: { footer: site.footer, socialLinks: site.socialLinks, siteImages: site.siteImages } as SiteData,
    navLinks: formatNavLinks(site.navLinks ?? [], "navbar"),
    footerLinks: formatNavLinks(site.navLinks ?? [], "footer"),
    banners: site.banners ?? [],
  };
}

/**
 * Builds the nested navigation from the flat nav-links list (CMS: Navigation & Links → Menu Links)
 * for one place on the site. A top-level link or menu shows where its placement says
 * ("navbar", "footer" or "both"); a menu's links go wherever the menu goes.
 */
export function formatNavLinks(rawLinks: ApiNavLink[], where: "navbar" | "footer"): NavLink[] {
  const shownIn = (link: ApiNavLink) => (link.placement ?? "navbar") === where || link.placement === "both";
  return rawLinks
    .filter((link) => link.parent === "-" && shownIn(link))
    .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label))
    .map((mainLink) => ({
      title: mainLink.label,
      link: mainLink.url,
      desc: mainLink.description || undefined,
      type: mainLink.type,
      dropdown:
        mainLink.type === "Dropdown"
          ? rawLinks
              .filter((child) => child.parent === mainLink.id)
              .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label))
              .map((child) => ({
                title: child.label,
                link: child.url,
                desc: child.description || undefined,
              }))
          : undefined,
    }));
}

export const blogSlug = (title: string) => title.toLowerCase().replace(/\s+/g, "-");
