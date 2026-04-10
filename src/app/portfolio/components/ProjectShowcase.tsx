"use client";
import { motion } from "framer-motion";
import { useCMSStore, type PortfolioItemData } from "@/store/useCMSStore";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ProjectShowcase() {
  const cmsPortfolios = useCMSStore((state) => state.aboutData?.Portfolio);

  if (!cmsPortfolios || cmsPortfolios.length === 0) return null;

  return (
    <section className="bg-white font-sans py-24 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-gray-400/30"></div>
            <span className="text-gray-400 font-bold tracking-[0.2em] text-xs uppercase">
              Projects
            </span>
            <div className="h-px w-8 bg-gray-400/30"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B0F29] leading-[1.15] mb-6 tracking-tight">
            Discover{" "}
            <span className="font-serif italic font-medium text-[#D4AF37]">
              Industry-Defining
            </span>{" "}
            <br />
            Digital{" "}
            <span className="relative inline-block z-0">
              Masterpieces
              <span className="absolute bottom-2 left-0 w-full h-3 bg-[#D4AF37] -z-10 opacity-60 transform -rotate-1 rounded-sm"></span>
            </span>
          </h2>

          <p className="text-lg text-gray-500 font-light leading-relaxed max-w-xl mx-auto">
            Explore a curated gallery of our most impactful case studies.{" "}
            <span className="font-semibold text-gray-900">
              The Gold Technologies
            </span>{" "}
            leverages advanced engineering and design to drive measurable growth
            for global leaders.
          </p>
        </div>

        {/* ── Large Featured Card Stack ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="flex flex-col gap-12"
        >
          {cmsPortfolios.map((project, index) => (
            <motion.div key={project.id || index} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: PortfolioItemData }) {
  const projectLink = `/products/${project.title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="flex flex-col group cursor-pointer mb-8">
      {/* ── Background Image ── */}
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-6 md:mb-10 shadow-sm bg-gray-50">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center transition-transform duration-[1.5s] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />

        {/* ── Floating Tag / Subtitle ── */}
        {project.subtitle && (
          <div className="absolute top-6 left-6 md:top-10 md:left-10 px-4 md:px-5 py-2 md:py-2.5 bg-white/95 backdrop-blur-md rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-[#0B0F29] shadow-sm z-10 transition-transform group-hover:scale-105">
            {project.subtitle}
          </div>
        )}
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex items-end justify-end gap-4 z-10">
          <div className="flex items-end gap-3">
            {project.stats?.length > 1 &&
              project.stats.map((s, si) => (
                <div
                  key={si}
                  className="flex flex-col items-center justify-center px-5 py-3
                    bg-white  backdrop-blur-md rounded-2xl border border-white
                    min-w-[90px] shadow-lg"
                >
                  <span className="text-black font-extrabold text-xl leading-tight">
                    {s.value}
                  </span>
                  <span className="text-black/60 text-[10px] font-medium tracking-wider uppercase mt-0.5 text-center">
                    {s.label}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* ── Card Content ── */}
      <div className="flex flex-col md:flex-row items-center justify-between px-2 md:px-4 gap-6 md:gap-12 z-10">
        {/* Left Side: Title & Description */}
        <div className="flex flex-col text-left max-w-4xl gap-2">
          <h3 className="text-2xl font-extrabold text-[#0B0F29] leading-[1.1] tracking-tight">
            {project.title}
          </h3>

          <p className="text-sm text-gray-500 font-light leading-relaxed line-clamp-2 md:line-clamp-3 md:max-w-3xl">
            {project.description}
          </p>
        </div>

        <Link href={projectLink}>
          {/* Right Side: Action Button */}
          <div
            className="flex items-center justify-between gap-4 px-6 py-2.5 border border-[#0B0F29]/20 text-[#0B0F29] rounded-full text-xs font-semibold tracking-wide bg-transparent
            hover:bg-[#0B0F29] hover:text-white transition-all duration-300 w-max"
          >
            <span>Explore Case Study</span>
            <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </div>
        </Link>
      </div>
    </div>
  );
}
