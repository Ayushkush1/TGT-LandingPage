/**
 * Pure helpers that turn raw CMS API responses into the shape the CMS store
 * uses. Shared by the server (initial render) and the client store.
 */
import type { ApiNavLink, NavLink, PageSEO } from "@/store/useCMSStore";

const transformSections = (sections: any[]) =>
  sections.reduce((acc: any, section: any) => {
    acc[section.type] = section.content;
    return acc;
  }, {});

const extractSEO = (p: any): PageSEO | undefined => {
  if (!p) return undefined;
  const seo = p.seo || {};
  return {
    metaTitle: seo.metaTitle || p.metaTitle,
    metaDescription: seo.metaDescription || p.metaDescription,
    targetKeywords: seo.targetKeywords || p.targetKeywords,
    canonicalUrl: seo.canonicalUrl || p.canonicalUrl,
    noIndex: seo.noIndex ?? p.noIndex ?? false,
  };
};

const PAGE_KEYS = {
  home: "homeData",
  about: "aboutData",
  contactUs: "contactData",
  products: "productData",
  services: "serviceData",
  portfolio: "portfolioData",
} as const;

/** Maps the CMS pages array onto homeData / aboutData / … store fields. */
export function buildPagesState(pages: any[]) {
  const state: Record<string, any> = {};
  for (const [slug, key] of Object.entries(PAGE_KEYS)) {
    const page = pages.find((p: any) => p.slug === slug);
    if (page?.sections) {
      state[key] = { ...transformSections(page.sections), seo: extractSEO(page) };
    }
  }
  return state;
}

/** Builds the nested navigation from the flat nav-links API response. */
export function formatNavLinks(rawLinks: ApiNavLink[]): NavLink[] {
  return rawLinks
    .filter((link) => link.parent === "-")
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

/**
 * Drops blog post bodies (which embed base64 images — ~7.8MB of the ~8MB
 * response) so the data shipped to every browser stays small. Blog post pages
 * receive their own body on the server instead.
 */
export function slimPages(pages: any[]) {
  return pages.map((page: any) => ({
    ...page,
    sections: (page.sections ?? []).map((section: any) =>
      section.type === "BlogSection" && Array.isArray(section.content?.blogs)
        ? {
            ...section,
            content: {
              ...section.content,
              blogs: section.content.blogs.map(({ contentHtml, ...blog }: any) => blog),
            },
          }
        : section,
    ),
  }));
}

export const blogSlug = (title: string) => title.toLowerCase().replace(/\s+/g, "-");
