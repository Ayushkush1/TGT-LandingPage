"use client";

import { useMemo } from "react";
import { useCMSStore } from "@/store/useCMSStore";
import { pillarKeywords, type PillarId } from "./growth";

export interface WorkItem {
  title: string;
  category: string;
  image: string;
  href: string;
  external?: boolean;
  pillars: PillarId[];
  stats: { label: string; value: string }[];
}

const tagPillars = (title: string) =>
  pillarKeywords.filter((k) => k.match.test(title)).map((k) => k.pillar);

// Matches the slug the /products/[name] case study page resolves.
const caseStudySlug = (title: string) => title.toLowerCase().replace(/\s+/g, "-");

/** Real case studies and products from the CMS, normalised for work cards. */
export function useWorkItems() {
  const portfolio = useCMSStore((state) => state.aboutData?.Portfolio);
  const products = useCMSStore((state) => state.productData?.main?.products);
  const heroProjects = useCMSStore(
    (state) => state.homeData?.HeroSection?.projects,
  );

  return useMemo(() => {
    const caseStudies: WorkItem[] = (portfolio ?? [])
      .filter((p) => p.image && p.title)
      .map((p) => ({
        title: p.title,
        category: p.subtitle,
        image: p.image,
        href: `/products/${caseStudySlug(p.title)}`,
        pillars: tagPillars(p.title),
        stats: (p.stats ?? []).filter((s) => s.value?.trim() && s.label?.trim()),
      }))
      // Case studies with measurable results lead.
      .sort((a, b) => b.stats.length - a.stats.length);

    const productItems: WorkItem[] = (products ?? [])
      .filter((p) => typeof p.imageUrl === "string" && p.imageUrl)
      .map((p) => ({
        title: p.title,
        category: p.shortDesc,
        image: p.imageUrl,
        href: "/products",
        pillars: ["build", "scale"],
        stats: [],
      }));

    const fallback: WorkItem[] = (heroProjects ?? []).map((p) => ({
      title: p.title,
      category: p.category,
      image: p.image,
      href: "/portfolio",
      pillars: [],
      stats: [],
    }));

    return { caseStudies, products: productItems, fallback };
  }, [portfolio, products, heroProjects]);
}
