"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { RollText } from "@/components/ui/RollText";
import { HoverArrow } from "@/components/ui/HoverArrow";
import { mediaItems, mediaPage } from "@/content/insights";

const ease = [0.22, 1, 0.36, 1] as const;

/** Press coverage as an editorial index: outlet in gold, headline, then date and type. */
export const MediaIndex = () => (
  <>
    <PageHero
      label={mediaPage.label}
      top={mediaPage.top}
      highlight={mediaPage.highlight}
      description={mediaPage.description}
      secondary={{ label: "See the coverage", href: "#coverage" }}
      facts={mediaItems.length > 0 ? [`${mediaItems.length} features`] : []}
    />

    <section id="coverage" className="bg-[#0A0A0A] text-white px-5 md:px-10 py-16 md:py-24 scroll-mt-24">
      <div className="max-w-[1600px] mx-auto">
        <p className="flex items-center gap-4 text-[11px] uppercase tracking-[0.25em] text-white/50">
          {mediaPage.listLabel}
          <span className="h-px flex-1 bg-white/10" />
          <span className="font-serif italic normal-case tracking-normal text-base text-[#D4AF37]">{String(mediaItems.length).padStart(2, "0")}</span>
        </p>

        {mediaItems.length > 0 ? (
          <ul className="mt-6 border-b border-white/10">
            {mediaItems.map((item, i) => (
              <motion.li
                key={item.url}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease, delay: Math.min(i, 6) * 0.05 }}
                className="border-t border-white/10"
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid md:grid-cols-12 gap-3 md:gap-8 items-baseline py-7 md:py-9"
                >
                  <span className="md:col-span-3 font-serif italic text-xl md:text-2xl text-[#D4AF37]">{item.outlet}</span>
                  <span className="md:col-span-7">
                    <span className="block text-2xl md:text-4xl font-semibold tracking-[-0.035em] leading-tight transition-colors duration-500 group-hover:text-[#D4AF37]">
                      {item.title}
                    </span>
                    {item.excerpt && <span className="mt-3 block max-w-2xl text-white/55 leading-relaxed line-clamp-2">{item.excerpt}</span>}
                    <span className="mt-3 block text-[11px] uppercase tracking-[0.2em] text-white/45">
                      {item.type} · {item.date}
                    </span>
                  </span>
                  <span className="md:col-span-2 md:justify-self-end self-center">
                    <span className="flex w-12 h-12 rounded-full border border-white/15 items-center justify-center transition-[transform,background-color,border-color,color] duration-500 group-hover:rotate-45 group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:text-black">
                      <ArrowUpRight className="w-5 h-5" />
                    </span>
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-16 md:py-24 text-center">
            <p className="mx-auto max-w-xl font-serif italic text-2xl md:text-3xl text-white/70 leading-snug">{mediaPage.empty}</p>
            <Link href="/blog" className="group/roll mt-8 inline-flex items-center gap-2 text-sm font-medium">
              <RollText>{mediaPage.blogLabel}</RollText>
              <HoverArrow />
            </Link>
          </div>
        )}
      </div>
    </section>
  </>
);
