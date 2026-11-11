/**
 * Insights: the navbar dropdown, the /blog index and the /media press page.
 * Defaults for where the CMS (Static pages → Blog / Media) has none. Blog posts come from the
 * CMS home BlogSection; press coverage from the CMS Media page (MediaItems).
 */

/** Navbar dropdown, inserted before Contact unless the CMS already has an "Insights" link. */
export const insightsNav = {
  title: "Insights",
  dropdown: [
    { title: "Blogs", link: "/blog", desc: "Guides and ideas on design, development and growth from our team." },
    { title: "Media & Articles", link: "/media", desc: "Press coverage, interviews and articles featuring The Gold Technologies." },
  ],
};

export const blogPage = {
  label: "(Insights) Blog",
  top: "Ideas that",
  highlight: "grow businesses.",
  description: "Practical guides on websites, search, software and marketing, written by the people who build them.",
  listLabel: "(All articles)",
  empty: "New articles are on their way. Check back soon.",
  mediaPrompt: "Looking for press coverage?",
  mediaLabel: "See media & articles",
  mediaUrl: "/media",
  secondaryLabel: "Read the articles",
  imageUrl: "", // CMS hero image; empty: the team photo
};

export const mediaPage = {
  label: "(Insights) Media & Articles",
  top: "In the",
  highlight: "spotlight.",
  description: "Press coverage, interviews and articles featuring The Gold Technologies and our work.",
  listLabel: "(Coverage)",
  empty: "Press coverage is on its way. In the meantime, read our latest articles.",
  blogLabel: "Read the blog",
  secondaryLabel: "See the coverage",
  imageUrl: "", // CMS hero image; empty: the team photo
};

export interface MediaItem {
  /** Publication or channel, e.g. "Economic Times". */
  outlet: string;
  title: string;
  /** As it should read, e.g. "12 Mar 2026". */
  date: string;
  /** Link to the coverage; opens in a new tab. */
  url: string;
  /** e.g. "Press", "Interview", "Article", "Podcast". */
  type: string;
  excerpt?: string;
}

/** Newest first. */
export const mediaItems: MediaItem[] = [];
