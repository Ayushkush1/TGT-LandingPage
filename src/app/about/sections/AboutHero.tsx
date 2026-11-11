"use client";

import { PageHero } from "@/components/sections/PageHero";
import { aboutContent } from "@/content/about";
import { usePageSection } from "@/content/usePageSection";

export const AboutHero = () => {
  const copy = usePageSection("aboutData", "AboutHero", aboutContent.hero);

  return (
    <PageHero
      label={copy.label}
      number="01"
      top={copy.headlineTop}
      highlight={copy.headlineHighlight}
      description={copy.description}
      primary={{ label: copy.primaryLabel, href: copy.primaryUrl }}
      secondary={{ label: copy.secondaryLabel, href: copy.secondaryUrl }}
      image={{ src: copy.imageUrl, alt: "" }}
      facts={copy.meta}
    />
  );
};
