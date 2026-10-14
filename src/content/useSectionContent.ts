"use client";

import { useCMSStore } from "@/store/useCMSStore";
import { growthContent, type GrowthSectionKey } from "./growth";

/**
 * Returns local defaults for a growth section, overridden by any fields the
 * CMS "home" page provides under a section of the same `type`.
 */
export function useSectionContent<K extends GrowthSectionKey>(
  key: K,
): (typeof growthContent)[K] {
  const cms = useCMSStore(
    (state) => (state.homeData as Record<string, any> | null)?.[key],
  );
  return cms ? { ...growthContent[key], ...cms } : growthContent[key];
}
