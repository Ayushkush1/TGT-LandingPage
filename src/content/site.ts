"use client";

import { useMemo } from "react";
import { useCMSStore } from "@/store/useCMSStore";

/**
 * Site-wide details (CMS: Navigation & Links → Social Media & Footer, stored in the global
 * settings and served by /api/site/global). These defaults only show while the CMS has none.
 */
export const siteDefaults = {
  logo: "https://res.cloudinary.com/dpa93copz/image/upload/v1794375987/tgt/logo-1794375986657.webp",
  logoAlt: "The Gold Technologies logo",
  companyName: "THE GOLD TECHNOLOGIES",
  tagline: "Operating Worldwide",
  description:
    "Empowering visionaries with cutting-edge digital solutions. We turn complex challenges into elegant, scalable technology.",
  email: "info@thegoldtechnologies.com",
  phone: "+91 8368198551",
  offices: [
    { country: "INDIA", address: "HQ · Noida\nSector 63, Noida, Uttar Pradesh" },
    {
      country: "UAE",
      address:
        "Veron LLC, Meydan Grandstand - 3rd Floor, Al Meydan Rd - Nad Al Sheba - Nadd Al Shiba First - Dubai - United Arab Emirates",
    },
  ],
  badges: [
    {
      image:
        "https://res.cloudinary.com/dpa93copz/image/upload/v1794375987/tgt/women-owned-logo-1794375987372.webp",
      alt: "Women Owned business",
      link: "",
    },
  ],
  wordmark: { left: "The", center: "GOLD TECH", right: "NOLOGIES" },
  socials: {
    linkedin: "https://www.linkedin.com/company/the-gold-technologies/about/",
    instagram: "https://www.instagram.com/thegoldtechnologies/",
    facebook: "https://www.facebook.com/thegoldtechnologies",
    twitter: "https://x.com/TheGoldTech_",
  } as Record<"linkedin" | "instagram" | "facebook" | "twitter", string>,
  homeBackground:
    "https://res.cloudinary.com/dpa93copz/image/upload/v1794375987/tgt/bg-4-1794375987031.webp",
  // Hero photo shown only while a page's hero has no image of its own (each hero's image is set
  // in the CMS on that page's hero section)
  pageHero: "https://res.cloudinary.com/dpa93copz/image/upload/v1794375986/tgt/team-1794375986217.webp",
};

export type SiteFooter = Omit<typeof siteDefaults, "homeBackground" | "pageHero">;

/** Footer & contact details: the CMS's values, else the defaults above. */
export function useSiteFooter(): SiteFooter {
  const site = useCMSStore((s) => s.site);
  return useMemo(() => {
    const f = site?.footer ?? {};
    const pick = (value: unknown, fallback: string) =>
      typeof value === "string" && value.trim() ? value.trim() : fallback;
    const socials = { ...siteDefaults.socials };
    if (site) {
      // With CMS data, only the platforms that have a link are shown
      (Object.keys(socials) as (keyof typeof socials)[]).forEach((platform) => {
        socials[platform] = site.socialLinks?.find((l) => l.platform === platform)?.url?.trim() || "";
      });
    }
    return {
      logo: pick(f.logo, siteDefaults.logo),
      logoAlt: pick(f.logoAlt, siteDefaults.logoAlt),
      companyName: pick(f.companyName, siteDefaults.companyName),
      tagline: pick(f.tagline, siteDefaults.tagline),
      description: pick(f.description, siteDefaults.description),
      email: pick(f.email, siteDefaults.email),
      phone: pick(f.phone, siteDefaults.phone),
      offices: Array.isArray(f.offices) && f.offices.length ? f.offices : siteDefaults.offices,
      badges: Array.isArray(f.badges) ? f.badges.filter((b) => b?.image) : siteDefaults.badges,
      wordmark: {
        left: pick(f.wordmark?.left, siteDefaults.wordmark.left),
        center: pick(f.wordmark?.center, siteDefaults.wordmark.center),
        right: pick(f.wordmark?.right, siteDefaults.wordmark.right),
      },
      socials,
    };
  }, [site]);
}

