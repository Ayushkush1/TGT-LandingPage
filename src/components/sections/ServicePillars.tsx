"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Pillar } from "@/content/growth";
import { useSectionContent } from "@/content/useSectionContent";
import { useWorkItems, type WorkItem } from "@/content/useWorkItems";

// One identity per pillar so the stack reads as four distinct chapters.
const themes = [
  {
    card: "bg-[#D4AF37] text-[#0A0A0A]",
    muted: "text-black/60",
    line: "border-black/15",
    accent: "text-black",
    hover: "hover:bg-black/[0.06]",
  },
  {
    card: "bg-[#F4F1EA] text-[#0B0F29]",
    muted: "text-[#0B0F29]/60",
    line: "border-[#0B0F29]/15",
    accent: "text-[#B8932A]",
    hover: "hover:bg-[#0B0F29]/[0.05]",
  },
  {
    card: "bg-[#12152E] text-white",
    muted: "text-white/60",
    line: "border-white/15",
    accent: "text-[#D4AF37]",
    hover: "hover:bg-white/[0.05]",
  },
  {
    card: "bg-[#161616] text-white ring-1 ring-inset ring-[#D4AF37]/30",
    muted: "text-white/60",
    line: "border-white/15",
    accent: "text-[#D4AF37]",
    hover: "hover:bg-white/[0.05]",
  },
];

const PillarCard = ({
  pillar,
  index,
  total,
  progress,
  work,
}: {
  pillar: Pillar;
  index: number;
  total: number;
  progress: MotionValue<number>;
  work?: WorkItem;
}) => {
  const theme = themes[index % themes.length];
  // Earlier cards shrink slightly as later ones slide over them.
  const scale = useTransform(
    progress,
    [index / total, 1],
    [1, 1 - (total - 1 - index) * 0.04],
  );

  return (
    <div className="sticky top-0 h-[100svh] flex items-center justify-center px-3 md:px-8">
      <motion.article
        style={{ scale, top: index * 24 }}
        className={cn(
          "relative origin-top will-change-transform w-full max-w-[1500px] h-[84svh] md:h-[80svh] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 overflow-hidden flex flex-col shadow-[0_-30px_80px_-20px_rgba(0,0,0,0.5)]",
          theme.card,
        )}
      >
        {/* Two full-height columns: title + services on the left; description and
            the featured project (filling the remaining height) on the right */}
        <div className="flex-1 min-h-0 grid lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-7 flex flex-col min-h-0">
            <h3 className="text-[22vw] md:text-[13vw] lg:text-[length:min(10rem,15svh)] font-semibold tracking-[-0.065em] leading-[0.8]">
              {pillar.name}
              <sup className={cn("font-serif italic font-normal text-[0.18em] tracking-normal align-top ml-2", theme.accent)}>
                ({pillar.number})
              </sup>
            </h3>
            <p className={cn("lg:hidden mt-4 max-w-xs text-sm leading-relaxed", theme.muted)}>
              {pillar.description}
            </p>

            <div className="mt-auto pt-6">
              <p className="text-2xl md:text-4xl font-medium tracking-[-0.03em] leading-tight text-balance">
                {pillar.title}
              </p>
              <ul className={cn("mt-4 md:mt-5 border-b", theme.line)}>
                {pillar.services.map((service) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className={cn(
                        "group flex items-center justify-between gap-4 border-t py-2.5 md:py-3 -mx-3 px-3 rounded-lg transition-colors",
                        theme.line,
                        theme.hover,
                      )}
                    >
                      <span className="font-semibold md:text-lg">{service.name}</span>
                      <span className="flex items-center gap-4">
                        <span className={cn("hidden md:block text-sm", theme.muted)}>
                          {service.items.join(" · ")}
                        </span>
                        <ArrowUpRight className="w-5 h-5 shrink-0 transition-transform duration-300 group-hover:rotate-45" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className={cn("mt-5 text-sm", theme.muted)}>
                <span className={cn("font-semibold", theme.accent)}>Outcome → </span>
                {pillar.outcome}
              </p>
            </div>
          </div>

          <div className="hidden lg:flex lg:col-span-5 flex-col min-h-0">
            <p className={cn("self-end max-w-xs text-right text-sm leading-relaxed", theme.muted)}>
              {pillar.description}
            </p>
            {work && (
              // Bottom-aligned and ~85% of the space under the description
              <div className="mt-6 flex-1 min-h-0 flex flex-col justify-end">
              <Link
                href={work.href}
                className="group relative h-[85%] rounded-[1.75rem] overflow-hidden"
              >
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  sizes="(max-width: 1500px) 40vw, 600px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute left-4 bottom-4 right-4 flex items-center justify-between gap-3 text-white text-sm">
                  <span className="line-clamp-1">
                    <span className="text-white/60">Featured: </span>
                    {work.title}
                  </span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </span>
              </Link>
              </div>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export const ServicePillars = () => {
  const data = useSectionContent("ServicePillars");
  const { caseStudies, products } = useWorkItems();
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  // Feature a different real project on each pillar.
  const used = new Set<string>();
  const workFor = (pillar: Pillar) => {
    const pick = [...caseStudies, ...products].find(
      (w) => w.pillars.includes(pillar.id) && !used.has(w.image),
    );
    if (pick) used.add(pick.image);
    return pick;
  };

  return (
    <section id="services" className="relative bg-[#0A0A0A] text-white scroll-mt-20">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10 pt-16 md:pt-24 pb-10 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/50">
            {data.label}
          </p>
          <h2 className="mt-6 text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.045em] leading-[0.95]">
            {data.headlineMain}{" "}
            <span className="font-serif italic font-normal text-[#D4AF37]">
              {data.headlineHighlight}
            </span>
          </h2>
        </div>
        <div className="lg:col-span-4">
          <p className="text-white/60 leading-relaxed">{data.description}</p>
          <a
            href={data.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37]"
          >
            {data.ctaLabel}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
          </a>
        </div>
      </div>

      <div ref={stackRef} className="relative pb-[10svh]">
        {data.pillars.map((pillar, i) => (
          <PillarCard
            key={pillar.id}
            pillar={pillar}
            index={i}
            total={data.pillars.length}
            progress={scrollYProgress}
            work={workFor(pillar)}
          />
        ))}
      </div>
    </section>
  );
};
