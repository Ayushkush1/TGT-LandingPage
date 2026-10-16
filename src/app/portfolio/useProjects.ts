"use client";

import { useMemo } from "react";
import { useCMSStore } from "@/store/useCMSStore";
import { pillarKeywords, type PillarId } from "@/content/growth";
import { projectNames } from "@/content/portfolio";

export interface Project {
  title: string;
  client: string;
  service: string;
  industry: string;
  image: string;
  href: string;
  pillars: PillarId[];
  stats: { label: string; value: string }[];
  summary?: string;
}

const clean = (t = "") => t.replace(/\s*[—–]\s*/g, ", ").trim();
// Matches the slug the /products/[name] case study page resolves.
const caseStudySlug = (title: string) => title.toLowerCase().replace(/\s+/g, "-");

/** CMS case studies normalised for the portfolio page; ones with results lead. */
export function useProjects(): Project[] {
  const portfolio = useCMSStore((s) => s.aboutData?.Portfolio);

  return useMemo(
    () =>
      (portfolio ?? [])
        .filter((p) => p.image && p.title)
        .map((p) => {
          const name = projectNames[p.title.trim()];
          const summary = p.SERVICES?.find((s) => /summary/i.test(s.category))?.description;
          return {
            title: p.title,
            client: name?.client ?? p.title,
            service: name?.service ?? p.subtitle,
            industry: p.subtitle,
            image: p.image,
            href: `/products/${caseStudySlug(p.title)}`,
            // Explicit pillars when known; otherwise guess from the title.
            pillars: name?.pillars ?? pillarKeywords.filter((k) => k.match.test(p.title)).map((k) => k.pillar),
            stats: (p.stats ?? []).filter((s) => s.value?.trim() && s.label?.trim()),
            summary: summary ? clean(summary) : undefined,
          };
        })
        .sort((a, b) => b.stats.length - a.stats.length),
    [portfolio],
  );
}
