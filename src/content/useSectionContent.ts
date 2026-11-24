"use client";

import { useMemo } from "react";
import { useCMSStore } from "@/store/useCMSStore";
import { growthContent, type GrowthSectionKey } from "./growth";
import { blankLike, mergeContent } from "./usePageSection";
import { useCustomSection } from "./customSection";

/**
 * Returns strictly the fields provided by the CMS "home" page under a section
 * of type `key`, using empty typed shapes for any missing or empty field.
 * On a custom page, the section's own content is used instead (see customSection.tsx).
 */
export function useSectionContent<K extends GrowthSectionKey>(
  key: K,
): (typeof growthContent)[K] {
  const custom = useCustomSection(key); // a custom page's own copy for this section
  const stored = useCMSStore(
    (state) => (state.homeData as Record<string, unknown> | null)?.[key],
  );
  const cms = custom ? custom.content : stored;
  const isCustom = !!custom;
  // On a custom page, only that page's own copy (see blankLike)
  return useMemo(
    () => mergeContent(isCustom ? blankLike(growthContent[key]) : growthContent[key], cms),
    [key, cms, isCustom],
  );
}
