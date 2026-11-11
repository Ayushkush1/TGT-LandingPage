"use client";

import { useMemo } from "react";
import { useCMSStore } from "@/store/useCMSStore";
import { siteDefaults, type SiteFooter } from "./siteDefaults";

export { siteDefaults, type SiteFooter };

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

