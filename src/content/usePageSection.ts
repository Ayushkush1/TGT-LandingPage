"use client";

import { useMemo } from "react";
import { useCMSStore, type CMSState } from "@/store/useCMSStore";
import { useCustomSection } from "./customSection";

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
 * The same shape as `defaults` with no copy in it ("" for text, [] for lists, nested objects
 * emptied the same way; numbers and switches kept). A custom page's section is laid over this,
 * so it shows only what was entered for that page, never another page's default copy.
 */
export function blankLike<T>(defaults: T): T {
  if (typeof defaults === "string") return "" as T;
  if (Array.isArray(defaults)) return [] as T;
  if (defaults && typeof defaults === "object") {
    return Object.fromEntries(
      Object.entries(defaults).map(([key, value]) => [key, blankLike(value)]),
    ) as T;
  }
  return defaults;
}

/**
 * A CMS section of a page (e.g. aboutData.AboutHero) over its default copy from src/content/.
 * The CMS section `type` matches the website section 1-to-1. `part` reads one object inside
 * the section, for pages that keep their copy in one section (e.g. portfolio main.hero).
 * On a custom page, the section's own content is used instead (see customSection.tsx).
 */
export function usePageSection<T extends object>(
  page: PageKey,
  type: string,
  defaults: T,
  part?: string,
): T {
  const custom = useCustomSection(type); // a custom page's own copy for this section
  const stored = useCMSStore((state) => (state[page] as Record<string, any> | null)?.[type]);
  const section = custom ? (custom.content as Record<string, any>) : stored;
  const cms = part ? section?.[part] : section;
  const isCustom = !!custom;
  return useMemo(
    () => mergeContent(isCustom ? blankLike(defaults) : defaults, cms),
    [defaults, cms, isCustom],
  );
}
