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
