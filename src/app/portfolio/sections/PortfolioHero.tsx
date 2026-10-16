"use client";

import { PageHero } from "@/components/sections/PageHero";
import { portfolioContent } from "@/content/portfolio";
import { useProjects } from "../useProjects";

/** Portfolio hero: shared page hero; the facts lead with the featured case study's result. */
export const PortfolioHero = () => {
  const copy = portfolioContent.hero;
  const projects = useProjects();
  const featured = projects[0];
  const result = featured?.stats[0];
  const facts = [
    projects.length > 0 && `${projects.length} case studies`,
    result && `${result.value} ${result.label.toLowerCase()}`,
    "7+ countries",
  ].filter(Boolean) as string[];

  return (
    <PageHero
      label={copy.label}
      number="03"
      top={copy.headlineTop}
      highlight={copy.headlineHighlight}
      description={copy.description}
      primary={{ label: copy.primaryLabel, href: copy.primaryUrl }}
      secondary={{ label: copy.secondaryLabel, href: copy.secondaryUrl }}
      facts={facts}
    />
  );
};
