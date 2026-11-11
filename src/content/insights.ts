/**
 * Empty typed shapes for CMS-backed Insights pages (/blog and /media).
 * Blog posts come from CMS home BlogSection; press coverage from CMS Media (MediaItems).
 */

export const blogPage = {
  label: "",
  top: "",
  highlight: "",
  description: "",
  listLabel: "",
  empty: "",
  mediaPrompt: "",
  mediaLabel: "",
  mediaUrl: "",
  secondaryLabel: "",
  imageUrl: "",
};

export const mediaPage = {
  label: "",
  top: "",
  highlight: "",
  description: "",
  listLabel: "",
  empty: "",
  blogLabel: "",
  secondaryLabel: "",
  imageUrl: "",
};

export interface MediaItem {
  outlet: string;
  title: string;
  date: string;
  url: string;
  type: string;
  excerpt?: string;
}

export const mediaItems: MediaItem[] = [];
