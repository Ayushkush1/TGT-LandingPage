"use client";

import { createContext, useContext, type ReactNode } from "react";

/**
 * Lets a section render a custom page's content (CMS: Custom Pages) instead of its own page's.
 * The website sections read their copy with usePageSection / useSectionContent; inside a
 * <CustomSectionProvider sections={{ AboutHero: {…} }}>, those hooks return this content for
 * the section types given. Other reads (e.g. pillars a section borrows from the home page, the
 * navbar and footer) are untouched, since they ask for a different type or sit outside it.
 */
type CustomSections = Record<string, unknown>;

const CustomSectionContext = createContext<CustomSections | null>(null);

export function CustomSectionProvider({
  sections,
  children,
}: {
  sections: CustomSections;
  children: ReactNode;
}) {
  return <CustomSectionContext.Provider value={sections}>{children}</CustomSectionContext.Provider>;
}

/** { content } when rendering a custom page's section of this type, otherwise null. */
export function useCustomSection(type: string): { content: unknown } | null {
  const custom = useContext(CustomSectionContext);
  return custom && Object.prototype.hasOwnProperty.call(custom, type) ? { content: custom[type] ?? {} } : null;
}
