"use client";

import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { CinematicLayout } from "@/components/sections/Insights";
import { RollText } from "@/components/ui/RollText";
import { HoverArrow } from "@/components/ui/HoverArrow";
import { useCMSStore } from "@/store/useCMSStore";
import { blogPage } from "@/content/insights";

/** Every CMS blog post: the latest full-bleed, the rest as image cards (same layout as the home page). */
export const BlogIndex = () => {
  const blogs = useCMSStore((s) => s.homeData?.BlogSection?.blogs) ?? [];

  return (
    <>
      <PageHero
        label={blogPage.label}
        top={blogPage.top}
        highlight={blogPage.highlight}
        description={blogPage.description}
        secondary={{ label: "Read the articles", href: "#articles" }}
        facts={blogs.length > 0 ? [`${blogs.length} articles`] : []}
      />

      <section id="articles" className="bg-[#0A0A0A] text-white px-5 md:px-10 py-16 md:py-24 scroll-mt-24">
        <div className="max-w-[1600px] mx-auto">
          <p className="flex items-center gap-4 text-[11px] uppercase tracking-[0.25em] text-white/50">
            {blogPage.listLabel}
            <span className="h-px flex-1 bg-white/10" />
            <span className="font-serif italic normal-case tracking-normal text-base text-[#D4AF37]">{String(blogs.length).padStart(2, "0")}</span>
          </p>

          <div className="mt-8 md:mt-10">
            {blogs.length > 0 ? (
              <CinematicLayout blogs={blogs} />
            ) : (
              <p className="py-20 text-center font-serif italic text-2xl text-white/60">{blogPage.empty}</p>
            )}
          </div>

          <div className="mt-14 md:mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-2xl md:text-3xl font-semibold tracking-[-0.03em]">{blogPage.mediaPrompt}</p>
            <Link href="/media" className="group/roll inline-flex items-center gap-2 text-sm font-medium text-white/80">
              <RollText>{blogPage.mediaLabel}</RollText>
              <HoverArrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
