/**
 * Service route allowlist and structural layout labels.
 * All service copy, deliverables, metrics, work, stack and related slugs come strictly from CMS `services`.
 */
import type { PillarId } from "./growth";

export interface ServiceProof {
  title: string;
  text: string;
  metrics?: { value: string; label: string }[];
}

export interface ServiceExtra {
  pillar: PillarId;
  name: string;
  promise: [string, string];
  stack: string[];
  proof?: ServiceProof[];
  work?: string[];
  related: string[];
}

export const SERVICE_SLUGS = [
  "branding",
  "ui-ux-designing",
  "website-design-development",
  "mobile-app-development",
  "custom-software-development",
  "business-software-solutions",
  "search-content-marketing",
  "social-performance-marketing",
  "ai-ml-solutions",
  "business-intelligence-solutions",
  "staff-augmentation",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const servicePage = {
  secondaryLabel: "See what we deliver",
  approachLabel: "(Our approach)",
  deliverLabel: "(What we deliver)",
  deliverHeadline: ["Everything you need,", "end to end."],
  proofLabel: "(Proof)",
  proofHeadline: ["Results we've", "delivered."],
  workLabel: "Brands we've built for",
  reachHeadline: ["Trusted", "worldwide."],
  stackLabel: "(Tools & expertise)",
  stackHeadline: ["Built with", "proven tech."],
  relatedLabel: "Pairs well with",
};

const emptyService = (pillar: PillarId): ServiceExtra => ({
  pillar,
  name: "",
  promise: ["", ""],
  stack: [],
  related: [],
});

/** Old CMS entries kept as source content that must not become pages of their own. */
const LEGACY_SERVICE_SLUGS = ["digital-marketing"];

/**
 * True when /service/<slug> is a real page, i.e. the CMS has that service: a built-in one, or one
 * added with "Add service" (which needs a name). A service deleted in the CMS is no longer a page.
 * If the CMS can't be reached, the built-in services stay up.
 */
export function isServicePage(slug: string, allServices: Record<string, { hero?: { name?: string } }> | null | undefined): boolean {
  if (LEGACY_SERVICE_SLUGS.includes(slug)) return false;
  const builtIn = (SERVICE_SLUGS as readonly string[]).includes(slug);
  if (!allServices) return builtIn;
  const service = allServices[slug];
  return builtIn ? Boolean(service) : Boolean(service?.hero?.name?.trim());
}

/** Layout defaults for a service; CMS-added services start in the "brand" pillar until the CMS says otherwise. */
export const serviceExtraFor = (slug: string): ServiceExtra =>
  serviceExtras[slug as ServiceSlug] ?? emptyService("brand");

export const serviceExtras: Record<ServiceSlug, ServiceExtra> = {
  branding: emptyService("brand"),
  "ui-ux-designing": emptyService("brand"),
  "website-design-development": emptyService("build"),
  "mobile-app-development": emptyService("build"),
  "custom-software-development": emptyService("build"),
  "business-software-solutions": emptyService("build"),
  "search-content-marketing": emptyService("grow"),
  "social-performance-marketing": emptyService("grow"),
  "ai-ml-solutions": emptyService("scale"),
  "business-intelligence-solutions": emptyService("scale"),
  "staff-augmentation": emptyService("scale"),
};
