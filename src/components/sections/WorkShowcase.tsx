"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { servicePillars, workShowcase, type PillarId } from "@/content/growth";
import { useSectionContent } from "@/content/useSectionContent";
import { useWorkItems, type WorkItem } from "@/content/useWorkItems";

/** Short name for CMS case-study titles too long for one line. */
const displayTitle = (title: string) => workShowcase.shortTitles[title.trim()] ?? title;

const pillarName = (id: PillarId) =>
  servicePillars.pillars.find((p) => p.id === id)?.name ?? id;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

const CaseCard = ({
  item,
  index,
  total,
  onHover,
}: {
  item: WorkItem;
  index: number;
  total: number;
  onHover: (hovering: boolean) => void;
}) => (
  <Link
    href={item.href}
    onMouseEnter={() => onHover(true)}
    onMouseLeave={() => onHover(false)}
    className="group snap-start shrink-0 w-[85vw] sm:w-[60vw] lg:w-[44vw] flex flex-col lg:cursor-none"
  >
    <div className="relative h-[52svh] lg:h-[58svh] rounded-[1.75rem] overflow-hidden bg-[#0B0F29]">
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width: 1024px) 85vw, 44vw"
        className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
      <span className="absolute top-5 left-6 font-serif italic text-white/90 text-lg">
        {String(index + 1).padStart(2, "0")}
        <span className="text-white/50"> / {String(total).padStart(2, "0")}</span>
      </span>
      {item.stats.length > 0 && (
        <div className="absolute left-5 bottom-5 flex flex-wrap gap-2">
          {item.stats.map((stat) => (
            <span
              key={stat.label}
              className="rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 px-4 py-2.5 text-white"
            >
              <span className="block text-2xl md:text-3xl font-semibold tracking-tight leading-none">
                {stat.value}
              </span>
              <span className="block mt-1 text-[10px] uppercase tracking-wider text-white/70">
                {stat.label}
              </span>
            </span>
          ))}
        </div>
      )}
    </div>
    <div className="mt-5">
      {/* Category and pillar tags share the top row so the title gets full width */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.2em] text-[#0B0F29]/50 truncate">
          {item.category}
        </p>
        <div className="hidden sm:flex gap-1.5 shrink-0">
          {item.pillars.map((id) => (
            <span
              key={id}
              className="rounded-full border border-[#0B0F29]/15 px-3 py-1 text-[11px] font-medium text-[#0B0F29]/70"
            >
              {pillarName(id)}
            </span>
          ))}
        </div>
      </div>
      <h3 className="mt-2 text-xl md:text-2xl font-semibold tracking-[-0.02em] text-[#0B0F29] truncate">
        {displayTitle(item.title)}
      </h3>
    </div>
  </Link>
);

/** Case studies on a horizontal track that is driven by vertical scroll on desktop. */
export const WorkShowcase = () => {
  const data = useSectionContent("WorkShowcase");
  const { caseStudies, fallback } = useWorkItems();
  // Four featured projects; the rest live on the portfolio page.
  const work = (caseStudies.length ? caseStudies : fallback).slice(0, 4);

  const isDesktop = useIsDesktop();
  const reduceMotion = useReducedMotion();
  const pinned = isDesktop && !reduceMotion;

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
      setViewportHeight(window.innerHeight);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [work.length]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  // "View" cursor that follows the pointer over case cards
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 300, damping: 28 });
  const smoothY = useSpring(cursorY, { stiffness: 300, damping: 28 });

  // The section always renders so useScroll can bind to it before CMS data arrives.
  return (
    <section
      id="work"
      ref={sectionRef}
      onMouseMove={(e) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }}
      style={pinned ? { height: distance + viewportHeight } : undefined}
      className="relative bg-[#F4F1EA] scroll-mt-0"
    >
      <div className={pinned ? "sticky top-0 h-[100svh] overflow-hidden flex items-center" : "py-24"}>
        <motion.div
          ref={trackRef}
          style={pinned ? { x } : undefined}
          className={
            pinned
              ? "flex items-end gap-10 px-10 w-max will-change-transform"
              : "flex items-end gap-5 px-5 md:px-10 overflow-x-auto snap-x snap-mandatory pb-4"
          }
        >
          {/* Intro panel */}
          <div className="snap-start shrink-0 w-[85vw] sm:w-[60vw] lg:w-[34vw] flex flex-col justify-between lg:h-[70svh] lg:pr-6">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#0B0F29]/65">
              {data.label} · {String(work.length).padStart(2, "0")}
            </p>
            <div className="mt-8 lg:mt-0">
              <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.05em] leading-[0.92] text-[#0B0F29]">
                {data.headlineMain}{" "}
                {/* Own block + tighter leading: the serif's tall metrics otherwise
                    push mixed-font lines apart */}
                <span className="block -mt-[0.13em] font-serif italic font-normal leading-[0.85] tracking-[-0.03em] text-[#B8932A]">
                  {data.headlineHighlight}
                </span>
              </h2>
              <p className="mt-6 text-[#0B0F29]/60 leading-relaxed max-w-sm">
                {data.description}
              </p>
              <Link
                href={data.viewAllUrl}
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#0B0F29] text-white pl-6 pr-1.5 py-1.5 font-medium"
              >
                {data.viewAllLabel}
                <span className="w-9 h-9 rounded-full bg-[#D4AF37] text-black flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>

          {work.map((item, i) => (
            <CaseCard
              key={item.title}
              item={item}
              index={i}
              total={work.length}
              onHover={setHovering}
            />
          ))}

          {/* Closing CTA card */}
          <div className="snap-start shrink-0 w-[85vw] sm:w-[60vw] lg:w-[34vw] h-[52svh] lg:h-[58svh] lg:mb-[4.75rem] rounded-[1.75rem] bg-[#D4AF37] p-8 md:p-10 flex flex-col justify-between">
            <p className="text-[11px] uppercase tracking-[0.25em] text-black/60">
              {data.ctaEyebrow}
            </p>
            <div>
              <h3 className="text-4xl md:text-6xl font-semibold tracking-[-0.045em] leading-[0.95] text-black">
                {data.ctaTitle}
              </h3>
              <a
                href={data.ctaButtonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-black text-white pl-6 pr-1.5 py-1.5 font-medium"
              >
                {data.ctaButtonLabel}
                <span className="w-9 h-9 rounded-full bg-[#D4AF37] text-black flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </a>
            </div>
          </div>
        </motion.div>

        {pinned && (
          <motion.div
            aria-hidden
            style={{ scaleX: scrollYProgress }}
            className="absolute left-10 right-10 bottom-8 h-px bg-[#0B0F29] origin-left"
          />
        )}
      </div>

      <AnimatePresence>
        {pinned && hovering && (
          <motion.div
            aria-hidden
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ left: smoothX, top: smoothY }}
            className="pointer-events-none fixed z-50 -ml-12 -mt-12 w-24 h-24 rounded-full bg-[#D4AF37] text-black flex items-center justify-center text-sm font-semibold"
          >
            View
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
