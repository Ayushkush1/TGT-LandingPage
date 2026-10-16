import type { PillarId } from "./growth";

/**
 * Portfolio page copy. Case studies themselves come from the CMS
 * (aboutData.Portfolio); `projectNames` gives them short display names
 * and the pillars used by the filters.
 */

const BOOKING_URL = "https://calendar.app.google/5nNHP69fUR5WEMvt9";

export const portfolioContent = {
  hero: {
    label: "(Our work)",
    headlineTop: "Work that",
    headlineHighlight: "speaks for itself.",
    description:
      "Websites, platforms and growth campaigns we've shipped for businesses across hospitality, travel, finance and retail. Every one built as a partnership, measured by what it did for the business.",
    primaryLabel: "Book a free strategy call",
    primaryUrl: BOOKING_URL,
    secondaryLabel: "See the work",
    secondaryUrl: "#work",
  },
  index: {
    label: "(Selected work)",
    headlineMain: "Every project,",
    headlineHighlight: "a partnership.",
    allLabel: "All work",
    viewLabel: "View case",
  },
  results: {
    label: "(By the numbers)",
    headlineMain: "Results that",
    headlineHighlight: "compound.",
    stats: [
      { value: "70+", label: "Launches shipped" },
      { value: "50+", label: "Businesses grown" },
      { value: "7+", label: "Countries served" },
      { value: "2015", label: "Building since" },
    ],
  },
};

/** Short client name, service line and pillars for CMS case-study titles. */
export const projectNames: Record<string, { client: string; service: string; pillars: PillarId[] }> = {
  "GreatWaterFilters.com.au Website Development": { client: "GreatWaterFilters", service: "Website development", pillars: ["build"] },
  "MyWeekendTrip Website Development": { client: "MyWeekendTrip", service: "Website development", pillars: ["build"] },
  "Label Website Development": { client: "Label", service: "Website development", pillars: ["build"] },
  "ERP Software to centralise Internal Processes– Bir Credit Solution": {
    client: "Bir Credit Solution",
    service: "ERP software & mobile app",
    pillars: ["build", "scale"],
  },
  "The Social Beacon Website Redesign": { client: "The Social Beacon", service: "Website redesign", pillars: ["brand", "build"] },
  "The Embassy Inn Website Development and Digital Marketing": {
    client: "The Embassy Inn",
    service: "Website & digital marketing",
    pillars: ["build", "grow"],
  },
};
