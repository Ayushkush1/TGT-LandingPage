"use client";

import { useCallback } from "react";
import { useCMSStore, type TechLogoData } from "@/store/useCMSStore";

/** The CMS `site.siteImages.techLogos` entry for a technology name, if any. */
function useTechEntry(): (name: string) => TechLogoData | undefined {
  const cms = useCMSStore((s) => s.site?.siteImages?.techLogos);
  return useCallback(
    (name: string) => {
      const key = name.trim().toLowerCase();
      if (!Array.isArray(cms) || cms.length === 0) return undefined;
      return cms.find((t) => t.name === key || t.matches?.includes(key));
    },
    [cms],
  );
}

/** Looks up a technology logo URL by name strictly from CMS `site.siteImages.techLogos`. */
export function useTechLogo(): (name: string) => string | undefined {
  const find = useTechEntry();
  return useCallback((name: string) => find(name)?.image || undefined, [find]);
}

/** The lucide icon name picked in the CMS for a technology, when it has no logo image. */
export function useTechIcon(): (name: string) => string | undefined {
  const find = useTechEntry();
  return useCallback((name: string) => find(name)?.icon || undefined, [find]);
}
