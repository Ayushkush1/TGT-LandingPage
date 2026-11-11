"use client";

import { useMemo } from "react";
import { useCMSStore } from "@/store/useCMSStore";
import { growthContent, type GrowthSectionKey } from "./growth";
import { mergeContent } from "./usePageSection";

/**
 * Returns strictly the fields provided by the CMS "home" page under a section
 * of type `key`, using empty typed shapes for any missing or empty field.
 */
export function useSectionContent<K extends GrowthSectionKey>(
  key: K,
): (typeof growthContent)[K] {
  const cms = useCMSStore(
    (state) => (state.homeData as Record<string, unknown> | null)?.[key],
  );
  return useMemo(() => mergeContent(growthContent[key], cms), [key, cms]);
}
