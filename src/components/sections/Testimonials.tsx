"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSectionContent } from "@/content/useSectionContent";
import { useCMSStore } from "@/store/useCMSStore";

const SLIDE_MS = 7000;

// CMS quotes often include their own quote marks and trailing blank lines.
const cleanQuote = (quote = "") =>
  quote
    .trim()
    .replace(/^["“]+|["”]+$/g, "")
    .replace(/(\w)[-–—](\w)/g, "$1 $2")
    .trim();

/** Editorial testimonial: one large quote, with an auto-advancing client list. */
export const Testimonials = () => {
  const data = useSectionContent("Testimonials");
  const cms = useCMSStore((s) => s.homeData?.OurReputation);
  const items = cms?.testimonials ?? [];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = items[active];

  return (
    <section className="bg-[#F4F1EA] px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <p className="lg:col-span-3 text-[11px] uppercase tracking-[0.25em] text-[#0B0F29]/50">
            {data.label}
          </p>
          <h2 className="lg:col-span-6 text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.045em] leading-[0.95] text-[#0B0F29]">
            {data.headlineMain}{" "}
            <span className="font-serif italic font-normal text-[#B8932A]">
              {data.headlineHighlight}
            </span>
          </h2>
          <div className="lg:col-span-3 lg:text-right">
            <div className="text-6xl md:text-7xl font-semibold tracking-[-0.05em] text-[#0B0F29]">
              {data.rating}
            </div>
            <div className="mt-2 flex lg:justify-end gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-4 h-4 fill-[#B8932A] text-[#B8932A]" />
              ))}
            </div>
            <p className="mt-2 text-sm text-[#0B0F29]/55">{data.ratingLabel}</p>
          </div>
        </div>

        {current && (
          <div
            className="mt-16 md:mt-24 grid lg:grid-cols-12 gap-12 lg:gap-10"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="lg:col-span-8 relative">
              <span
                aria-hidden
                className="absolute -top-10 md:-top-16 -left-2 font-serif text-[8rem] md:text-[12rem] leading-none text-[#B8932A]/25 select-none"
              >
                “
              </span>
              {/* Every quote sits in the same grid cell, so the box always has the
                  height of the longest one and the page below never shifts. */}
              <div className="grid">
                {items.map((t, i) => {
                  const isActive = i === active;
                  return (
                    <motion.figure
                      key={t.clientName}
                      aria-hidden={!isActive}
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: isActive ? 0.15 : 0 }}
                      className={cn(
                        "relative [grid-area:1/1] flex flex-col",
                        !isActive && "pointer-events-none",
                      )}
                    >
                      <blockquote className="text-3xl md:text-5xl lg:text-[3.5rem] font-medium tracking-[-0.035em] leading-[1.12] text-[#0B0F29]">
                        {cleanQuote(t.quote)}
                      </blockquote>
                      <figcaption className="mt-auto pt-10 flex items-center gap-4">
                        {t.image && (
                          <span className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#B8932A]/40">
                            <Image src={t.image} alt="" fill sizes="56px" className="object-cover" />
                          </span>
                        )}
                        <span>
                          <span className="block font-semibold text-[#0B0F29]">{t.clientName}</span>
                          <span className="block text-sm text-[#0B0F29]/55">{t.clientRole}</span>
                        </span>
                      </figcaption>
                    </motion.figure>
                  );
                })}
              </div>
            </div>

            {/* Client list with autoplay progress */}
            <ol className="lg:col-span-4 lg:col-start-9 self-end border-b border-[#0B0F29]/15">
              {items.map((t, i) => (
                <li key={t.clientName}>
                  <button
                    onClick={() => setActive(i)}
                    aria-current={i === active}
                    className="group relative w-full text-left border-t border-[#0B0F29]/15 py-5 flex items-center gap-5"
                  >
                    <span className="font-serif italic text-[#B8932A]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span
                        className={cn(
                          "block font-semibold transition-colors",
                          i === active ? "text-[#0B0F29]" : "text-[#0B0F29]/40 group-hover:text-[#0B0F29]/70",
                        )}
                      >
                        {t.clientName}
                      </span>
                      <span className="block text-xs text-[#0B0F29]/45">{t.clientRole}</span>
                    </span>
                    {i === active && (
                      <span
                        key={active}
                        aria-hidden
                        onAnimationEnd={() => setActive((active + 1) % items.length)}
                        className="absolute left-0 right-0 -top-px h-0.5 bg-[#B8932A] origin-left motion-reduce:hidden"
                        style={{
                          animation: `progress-fill ${SLIDE_MS}ms linear forwards`,
                          animationPlayState: paused ? "paused" : "running",
                        }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-20 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-[#0B0F29]/15 pt-8">
          <p className="font-serif italic text-2xl md:text-3xl text-[#0B0F29]">
            {cms?.footerCtaText}
          </p>
          <a
            href={data.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 self-start rounded-full bg-[#0B0F29] text-white pl-6 pr-1.5 py-1.5 font-medium"
          >
            {data.ctaLabel}
            <span className="w-10 h-10 rounded-full bg-[#D4AF37] text-black flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
