"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSectionContent } from "@/content/useSectionContent";
import { useWorkItems } from "@/content/useWorkItems";

const TILES_PER_COLUMN = 5;

/** A wall of real work that expands to full screen as it scrolls into view. */
export const Showreel = () => {
  const data = useSectionContent("Showreel");
  const { caseStudies, products, fallback } = useWorkItems();
  const images = Array.from(
    new Set([...caseStudies, ...products, ...fallback].map((w) => w.image)),
  );

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  // Only transforms and opacity animate here, so scrolling stays on the compositor.
  const scale = useTransform(scrollYProgress, [0, 0.65], [0.6, 1]);
  const columnUp = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const columnDown = useTransform(scrollYProgress, [0, 1], ["-18%", "0%"]);
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.5, 0.8], [60, 0]);

  // The section always renders so useScroll can bind to it before CMS data
  // arrives. Three short columns, each long enough to stay filled while it travels.
  const columns = [0, 1, 2].map((c) =>
    images.length
      ? Array.from(
          { length: TILES_PER_COLUMN },
          (_, i) => images[(c * TILES_PER_COLUMN + i * 2 + c) % images.length],
        )
      : [],
  );

  return (
    <section ref={ref} className="relative h-[200vh] bg-[#0A0A0A]">
      <div className="sticky top-0 h-[100svh] flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale }}
          className="relative w-full h-full overflow-hidden rounded-[2.5rem] bg-[#111] will-change-transform"
        >
          <div className="absolute -inset-[12%] grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 -rotate-6">
            {columns.map((col, c) => (
              <motion.div
                key={c}
                style={{ y: c % 2 ? columnDown : columnUp }}
                className={cn(
                  "flex flex-col gap-3 md:gap-5 will-change-transform",
                  c === 2 && "hidden md:flex",
                )}
              >
                {col.map((src, i) => (
                  <div
                    key={`${src}-${i}`}
                    className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white/5"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 50vw, 34vw"
                      quality={60}
                      className="object-cover object-top"
                    />
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
          {/* Darkens the wall only as the text fades in, so the work shows at full
              brightness while it expands */}
          <motion.div
            style={{ opacity: textOpacity }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.85),rgba(0,0,0,0.45))]"
          />

          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/60">
              {data.label}
            </p>
            <h2 className="mt-4 text-[26vw] md:text-[15vw] font-semibold tracking-[-0.06em] leading-[0.85] text-white">
              {data.bigNumber}
            </h2>
            <p className="mt-2 font-serif italic text-2xl md:text-5xl text-[#D4AF37]">
              {data.caption}
            </p>
            <Link
              href={data.linkUrl}
              className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/30 px-6 py-3 text-sm font-medium text-white hover:bg-white hover:text-black transition-colors"
            >
              {data.linkLabel}
              <ArrowDown className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
