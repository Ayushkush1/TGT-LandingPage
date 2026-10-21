/**
 * Insights: the navbar dropdown, the /blog index and the /media press page.
 * Blog posts come from the CMS; press coverage is listed here in `mediaItems`.
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
};

export const mediaPage = {
  label: "(Insights) Media & Articles",
  top: "In the",
  highlight: "spotlight.",
  description: "Press coverage, interviews and articles featuring The Gold Technologies and our work.",
  listLabel: "(Coverage)",
  empty: "Press coverage is on its way. In the meantime, read our latest articles.",
  blogLabel: "Read the blog",
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
