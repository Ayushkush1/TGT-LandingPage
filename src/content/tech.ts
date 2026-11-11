"use client";

import { useCallback } from "react";
import { useCMSStore } from "@/store/useCMSStore";

/** Looks up a technology logo URL by name strictly from CMS `site.siteImages.techLogos`. */
export function useTechLogo(): (name: string) => string | undefined {
  const cms = useCMSStore((s) => s.site?.siteImages?.techLogos);
  return useCallback(
    (name: string) => {
      const key = name.trim().toLowerCase();
      if (!Array.isArray(cms) || cms.length === 0) return undefined;
      return cms.find((t) => t.name === key || t.matches?.includes(key))?.image || undefined;
    },
    [cms],
  );
}
