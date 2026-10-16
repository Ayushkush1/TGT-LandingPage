"use client";

import { forwardRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { servicePillars, type PillarId } from "@/content/growth";
import { portfolioContent } from "@/content/portfolio";
import { useProjects, type Project } from "../useProjects";

const ease = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");
const pillarName = (id: PillarId) => servicePillars.pillars.find((p) => p.id === id)?.name ?? id;

/** One case study: large image with a "View case" disc on hover, details underneath. */
// forwardRef: AnimatePresence "popLayout" measures the exiting card through its ref.
const ProjectCard = forwardRef<HTMLLIElement, { project: Project; index: number }>(({ project, index }, ref) => (
  <motion.li
    ref={ref}
    layout
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.96 }}
    transition={{ duration: 0.7, ease }}
  >
    <Link href={project.href} className="group block">
      <div className="relative aspect-[16/9] rounded-[1.75rem] overflow-hidden bg-[#E3DFD8]">
        <Image
          src={project.image}
          alt={`${project.client}, ${project.service}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

        <span className="absolute top-5 left-6 font-serif italic text-lg text-white/90">{pad(index + 1)}</span>

        {/* Gold disc that blooms in the middle on hover */}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-[#D4AF37] text-black flex flex-col items-center justify-center gap-1 text-xs font-semibold uppercase tracking-[0.15em] scale-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100">
          <ArrowUpRight className="w-5 h-5" />
          {portfolioContent.index.viewLabel}
        </span>

        {project.stats.length > 0 && (
          <div className="absolute left-5 bottom-5 flex flex-wrap gap-2">
            {project.stats.map((s) => (
              <span key={s.label} className="rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 px-4 py-2.5 text-white">
                <span className="block text-2xl md:text-3xl font-semibold tracking-tight leading-none">{s.value}</span>
                <span className="block mt-1 text-[10px] uppercase tracking-wider text-white/75">{s.label}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#B8932A]">{project.industry}</p>
          <h3 className="mt-2 text-2xl md:text-3xl font-semibold tracking-[-0.03em] leading-tight text-[#0B0F29]">
            {project.client}
            <span className="font-serif italic font-normal text-[#0B0F29]/50"> {project.service.toLowerCase()}</span>
          </h3>
          {project.summary && (
            <p className="mt-3 text-sm md:text-[15px] text-[#0B0F29]/60 leading-relaxed line-clamp-2 max-w-xl">{project.summary}</p>
          )}
        </div>
        <span className="hidden sm:flex shrink-0 w-11 h-11 rounded-full border border-[#0B0F29]/15 items-center justify-center text-[#0B0F29] transition-[transform,background-color,border-color] duration-500 group-hover:rotate-45 group-hover:bg-[#0B0F29] group-hover:border-[#0B0F29] group-hover:text-[#D4AF37]">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  </motion.li>
));
ProjectCard.displayName = "ProjectCard";

/** Case study index: pillar filters over a staggered two-column grid. */
export const WorkIndex = () => {
  const copy = portfolioContent.index;
  const projects = useProjects();
  const [filter, setFilter] = useState<PillarId | "all">("all");

  if (projects.length === 0) return null;

  const filters = [
    { id: "all" as const, name: copy.allLabel, count: projects.length },
    ...servicePillars.pillars
      .map((p) => ({ id: p.id, name: p.name, count: projects.filter((x) => x.pillars.includes(p.id)).length }))
      .filter((f) => f.count > 0),
  ];
  const shown = filter === "all" ? projects : projects.filter((p) => p.pillars.includes(filter));
  // Two columns, the right one dropped lower for an editorial rhythm.
  const columns = [shown.filter((_, i) => i % 2 === 0), shown.filter((_, i) => i % 2 === 1)];

  return (
    <section id="work" className="bg-[#F4F1EA] text-[#0B0F29] px-5 md:px-10 py-16 md:py-24 scroll-mt-20">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <p className="lg:col-span-3 text-[11px] uppercase tracking-[0.25em] text-[#0B0F29]/65">{copy.label}</p>
          <h2 className="lg:col-span-9 text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.045em] leading-[0.95]">
            {copy.headlineMain}{" "}
            <span className="font-serif italic font-normal text-[#B8932A]">{copy.headlineHighlight}</span>
          </h2>
        </div>

        <div className="mt-10 md:mt-14 flex flex-wrap gap-2" role="tablist" aria-label="Filter work">
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active ? "text-white" : "text-[#0B0F29]/70 hover:text-[#0B0F29]",
                )}
              >
                {active && (
                  <motion.span layoutId="work-filter" transition={{ duration: 0.5, ease }} className="absolute inset-0 rounded-full bg-[#0B0F29]" />
                )}
                {!active && <span className="absolute inset-0 rounded-full border border-[#0B0F29]/15" />}
                <span className="relative">
                  {f.name}
                  <sup className={cn("ml-1 font-serif italic text-[11px]", active ? "text-[#D4AF37]" : "text-[#B8932A]")}>{f.count}</sup>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-x-8 lg:gap-x-12">
          {columns.map((col, c) => (
            <ul key={c} className={cn("flex flex-col gap-12 md:gap-20", c === 1 && "mt-12 md:mt-40")}>
              <AnimatePresence mode="popLayout" initial={false}>
                {col.map((p) => (
                  <ProjectCard key={p.title} project={p} index={shown.indexOf(p)} />
                ))}
              </AnimatePresence>
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
};
