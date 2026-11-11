/**
 * Empty typed shapes for CMS-backed Home sections. No hardcoded copy defaults are kept;
 * every rendered field comes strictly from the CMS (`useSectionContent`).
 */

export type PillarId = "brand" | "build" | "grow" | "scale";

export interface PillarService {
  name: string;
  href: string;
  items: string[];
}

export interface Pillar {
  id: PillarId;
  number: string;
  name: string;
  title: string;
  description: string;
  outcome: string;
  services: PillarService[];
}

export const growthHero = {
  headlineTop: "",
  headlineWords: [] as string[],
  headlinePrefix: "",
  headlineHighlight: "",
  headlineSuffix: "",
  description: "",
  primaryButtonLabel: "",
  primaryButtonUrl: "",
  secondaryButtonLabel: "",
  secondaryButtonUrl: "",
  rating: "",
  ratingLabel: "",
  proofLine: "",
  responseLine: "",
  ticker: [] as string[],
};

export const showreel = {
  label: "",
  bigNumber: "",
  caption: "",
  linkLabel: "",
  linkUrl: "",
};

export const manifesto = {
  label: "",
  text: "",
  highlights: [] as string[],
  stats: [] as { value: string; label: string }[],
};

export const servicePillars = {
  label: "",
  headlineMain: "",
  headlineHighlight: "",
  description: "",
  ctaLabel: "",
  ctaUrl: "",
  pillars: [] as Pillar[],
};

export const workShowcase = {
  label: "",
  headlineMain: "",
  headlineHighlight: "",
  description: "",
  viewAllLabel: "",
  viewAllUrl: "",
  shortTitles: {} as Record<string, string>,
  ctaEyebrow: "",
  ctaTitle: "",
  ctaButtonLabel: "",
  ctaButtonUrl: "",
};

/** Keyword rules that tag a case study title with growth pillars when CMS omits explicit tags. */
export const pillarKeywords: { pillar: PillarId; match: RegExp }[] = [
  { pillar: "brand", match: /redesign|brand|identity|ui|ux/i },
  { pillar: "build", match: /website|web|app|software|erp|platform/i },
  { pillar: "grow", match: /marketing|seo|social|ads/i },
  { pillar: "scale", match: /erp|automation|\bai\b|dashboard|analytics/i },
];

export const growthProcess = {
  label: "",
  headlineMain: "",
  headlineHighlight: "",
  description: "",
  steps: [] as { number: string; title: string; description: string; deliverable: string }[],
  commitments: [] as string[],
};

export const growthCTA = {
  label: "",
  headlineMain: "",
  headlineHighlight: "",
  description: "",
  primaryButtonLabel: "",
  primaryButtonUrl: "",
  callTitle: "",
  formTitle: "",
  formNote: "",
  interestsLabel: "",
  interests: [] as string[],
  budgetLabel: "",
  budgets: [] as string[],
  submitLabel: "",
  privacyNote: "",
  sentNote: "",
  sendingNote: "",
  fallbackNote: "",
  assurances: [] as string[],
  clocks: [] as { city: string; country: string; timeZone: string }[],
  localClockLabel: "",
  clocksNote: "",
};

export const testimonials = {
  label: "",
  headlineMain: "",
  headlineHighlight: "",
  rating: "",
  ratingLabel: "",
  ctaLabel: "",
  ctaUrl: "",
};

export const insights = {
  label: "",
  headlineMain: "",
  headlineHighlight: "",
  viewAllLabel: "",
};

export const growthFooter = {
  headlineMain: "",
  headlineHighlight: "",
  ctaLabel: "",
  ctaUrl: "",
  serviceLinks: [] as { label: string; href: string }[],
  companyLinks: [] as { label: string; href: string }[],
  wordmarkLeft: "",
  wordmark: "",
  wordmarkRight: "",
};

export const siteMenu = {
  ctaLabel: "",
  ctaUrl: "",
  productTaglines: {} as Record<string, string>,
  links: [] as { label: string; href: string }[],
};

export const stickyCTA = {
  label: "",
  buttonLabel: "",
  buttonUrl: "",
};

export const growthContent = {
  GrowthHero: growthHero,
  Showreel: showreel,
  Manifesto: manifesto,
  ServicePillars: servicePillars,
  WorkShowcase: workShowcase,
  GrowthProcess: growthProcess,
  GrowthCTA: growthCTA,
  StickyCTA: stickyCTA,
  Testimonials: testimonials,
  Insights: insights,
  SiteMenu: siteMenu,
  GrowthFooter: growthFooter,
};

export type GrowthSectionKey = keyof typeof growthContent;
