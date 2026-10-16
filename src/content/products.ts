/** Products page copy. The products themselves come from the CMS (products page). */

const BOOKING_URL = "https://calendar.app.google/5nNHP69fUR5WEMvt9";

export const productsContent = {
  hero: {
    label: "(Our products)",
    headlineTop: "Software that",
    headlineHighlight: "runs the business.",
    description:
      "Ready-made platforms for ERP, CRM, commerce, delivery and learning. Live, in use, and quick to tailor to the way your team works.",
    primaryLabel: "Book a free demo call",
    primaryUrl: BOOKING_URL,
    secondaryLabel: "See the products",
    secondaryUrl: "#products",
  },
  grid: {
    label: "(The suite)",
    headlineMain: "Built once,",
    headlineHighlight: "fitted to you.",
    description: "Every product can be branded, extended and integrated with the tools you already use.",
    liveLabel: "Open live demo",
    titleHint: "Open the live product",
    soonLabel: "Demo on request",
  },
};

/** Corrected live links where the CMS product URL is wrong (by product title). */
export const productLinkFixes: Record<string, string> = {
  // CMS has "hostingsite.com", which doesn't resolve; the navbar's hostingersite.com link works.
  "Petrol Pump Management System": "https://tan-crocodile-352730.hostingersite.com/login",
};
