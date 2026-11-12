/**
 * Empty structural defaults for site-wide CMS fields (CMS: Navigation & Links → Social Media & Footer,
 * served by /api/site/global). Nothing hardcoded renders when CMS fields are absent.
 */
export const siteDefaults = {
  logo: "",
  logoAlt: "",
  companyName: "",
  tagline: "",
  description: "",
  email: "",
  phone: "",
  offices: [] as { country: string; address: string }[],
  badges: [] as { image: string; alt: string; link?: string }[],
  wordmark: { left: "", center: "", right: "" },
  socials: {
    linkedin: "",
    instagram: "",
    facebook: "",
    twitter: "",
  } as Record<"linkedin" | "instagram" | "facebook" | "twitter", string>,
  homeBackground: "",
  pageHero: "",
};

export type SiteFooter = Omit<typeof siteDefaults, "homeBackground" | "pageHero">;
