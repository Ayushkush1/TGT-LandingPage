"use client";

import { useMemo } from "react";
import { useCMSStore, type CMSState } from "@/store/useCMSStore";

type PageKey = Exclude<keyof CMSState, "site" | "globalSEO" | "navLinks" | "footerLinks" | "banners">;

/** `cms` laid over `defaults`; empty CMS values ("", null, []) keep the default. */
export function mergeContent<T extends object>(defaults: T, cms: unknown): T {
  if (!cms || typeof cms !== "object" || Array.isArray(cms)) return defaults;
  const out = { ...defaults } as Record<string, unknown>;
  for (const [key, value] of Object.entries(cms)) {
    const empty =
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === "") ||
      (Array.isArray(value) && value.length === 0);
    if (!empty) out[key] = value;
  }
  return out as T;
}

/**
 * A CMS section of a page (e.g. aboutData.AboutHero) over its default copy from src/content/.
 * The CMS section `type` matches the website section 1-to-1. `part` reads one object inside
 * the section, for pages that keep their copy in one section (e.g. portfolio main.hero).
 */
export function usePageSection<T extends object>(
  page: PageKey,
  type: string,
  defaults: T,
  part?: string,
): T {
  const cms = useCMSStore((state) => {
    const section = (state[page] as Record<string, any> | null)?.[type];
    return part ? section?.[part] : section;
  });
  return useMemo(() => mergeContent(defaults, cms), [defaults, cms]);
}
