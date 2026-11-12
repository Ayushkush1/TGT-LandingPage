/**
 * Empty typed shapes for CMS-backed Portfolio page sections (Static pages → Portfolio).
 * Case studies themselves come from CMS `aboutData.Portfolio`.
 */

export const portfolioContent = {
  hero: {
    label: "",
    headlineTop: "",
    headlineHighlight: "",
    description: "",
    primaryLabel: "",
    primaryUrl: "",
    secondaryLabel: "",
    secondaryUrl: "",
    imageUrl: "",
  },
  index: {
    label: "",
    headlineMain: "",
    headlineHighlight: "",
    allLabel: "",
    viewLabel: "",
  },
  results: {
    label: "",
    headlineMain: "",
    headlineHighlight: "",
    stats: [] as { value: string; label: string }[],
  },
};
