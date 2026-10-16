"use client";

import { PageHero } from "@/components/sections/PageHero";
import { aboutContent } from "@/content/about";

export const AboutHero = () => {
  const copy = aboutContent.hero;

  return (
    <PageHero
      label={copy.label}
      number="01"
      top={copy.headlineTop}
      highlight={copy.headlineHighlight}
      description={copy.description}
      primary={{ label: copy.primaryLabel, href: copy.primaryUrl }}
      secondary={{ label: copy.secondaryLabel, href: copy.secondaryUrl }}
      facts={copy.meta}
    />
  );
};
