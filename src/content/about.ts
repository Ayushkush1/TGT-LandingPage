/**
 * Empty typed shapes for CMS-backed About sections (Static pages → About).
 * Every rendered field comes strictly from the CMS.
 */

export const aboutContent = {
  hero: {
    label: "",
    headlineTop: "",
    headlineHighlight: "",
    description: "",
    meta: [] as string[],
    primaryLabel: "",
    primaryUrl: "",
    secondaryLabel: "",
    secondaryUrl: "",
    imageUrl: "",
  },
  story: {
    label: "",
    text: "",
    highlights: [] as string[],
    stats: [] as { value: string; label: string }[],
  },
  purpose: {
    label: "",
    headlineMain: "",
    headlineHighlight: "",
    cards: [] as { kicker: string; title: string; text: string }[],
    values: [] as string[],
  },
  founder: {
    label: "",
    quote: "",
    quoteHighlight: "",
    note: [] as string[],
    name: "",
    role: "",
    photo: "",
    backdrop: "",
    ctaLabel: "",
    ctaUrl: "",
  },
  journey: {
    label: "",
    headlineMain: "",
    headlineHighlight: "",
    milestones: [] as { year: string; title: string; description: string }[],
  },
  team: {
    label: "",
    headlineMain: "",
    headlineHighlight: "",
    description: "",
    joinLabel: "",
    joinTitle: "",
    joinUrl: "",
  },
  film: {
    label: "",
    headlineMain: "",
    headlineHighlight: "",
    descriptionText: "",
    videoUrl: "",
  },
};

export const team: {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  tag?: string;
  linkedin?: string;
}[] = [];
