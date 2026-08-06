"use client";
import { motion } from "framer-motion";
import { useCMSStore, type PortfolioItemData } from "@/store/useCMSStore";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { parseMarkdownLinks } from "@/utils/text";

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
  const showcase = useCMSStore((state) => state.portfolioData?.main?.showcase);

  if (!cmsPortfolios || cmsPortfolios.length === 0) return null;

  return (
    <section className="bg-white font-sans py-12 md:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-4 mb-4 md:mb-6">
            <div className="h-px w-8 bg-gray-400/30"></div>
            <span className="text-gray-400 font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase">
              {showcase?.upperTag || "Projects"}
            </span>
            <div className="h-px w-8 bg-gray-400/30"></div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0B0F29] leading-[1.2] md:leading-[1.15] mb-4 md:mb-6 tracking-tight">
            {showcase?.headlinePart1 || "Discover"}{" "}
            <span className="font-serif italic font-medium text-[#D4AF37]">
              {showcase?.headlineHighlight || "Industry-Defining"}
            </span>{" "}
            <br />
            {showcase?.headlinePart3 || "Digital"}{" "}
            <span className="relative inline-block z-0">
              {showcase?.headlinePart4 || "Masterpieces"}
              <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-2 md:h-3 bg-[#D4AF37] -z-10 opacity-60 transform -rotate-1 rounded-sm"></span>
            </span>
          </h2>

          <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed max-w-xl mx-auto px-2 md:px-0">
            {parseMarkdownLinks(showcase?.mainDescription ||
              "Explore a curated gallery of our most impactful case studies. The Gold Technologies leverages advanced engineering and design to drive measurable growth for global leaders.")}
          </p>
        </div>

        {/* ── Large Featured Card Stack ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="flex flex-col gap-8 md:gap-12"
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
    <div className="flex flex-col group cursor-pointer mb-6 sm:mb-8">
      {/* ── Background Image ── */}
      <div className="w-full h-[240px] sm:h-[340px] md:h-[440px] lg:h-[600px] relative rounded-2xl md:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden mb-4 md:mb-6 lg:mb-10 shadow-sm bg-gray-50">
        <OptimizedImage
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="w-full h-full object-cover object-center transition-transform duration-[1.5s] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />

        {/* ── Floating Tag / Subtitle ── */}
        {project.subtitle && (
          <div className="absolute top-4 left-4 md:top-8 md:left-8 px-3.5 md:px-4 lg:px-5 py-1.5 md:py-2 lg:py-2.5 bg-white/95 backdrop-blur-md rounded-full text-[9px] md:text-[10px] lg:text-[11px] font-black uppercase tracking-[0.2em] text-[#0B0F29] shadow-sm z-10 transition-transform group-hover:scale-105">
            {project.subtitle}
          </div>
        )}
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10 flex items-end justify-end gap-3 z-10">
          <div className="flex items-end gap-2.5 sm:gap-3">
            {project.stats?.length > 1 &&
              project.stats.map((s, si) => (
                <div
                  key={si}
                  className="flex flex-col items-center justify-center px-3.5 py-2 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3
                    bg-white backdrop-blur-md rounded-xl sm:rounded-2xl border border-white
                    min-w-[75px] sm:min-w-[85px] lg:min-w-[90px] shadow-lg"
                >
                  <span className="text-black font-extrabold text-base sm:text-lg lg:text-xl leading-tight">
                    {s.value}
                  </span>
                  <span className="text-black/60 text-[9px] sm:text-[10px] font-medium tracking-wider uppercase mt-0.5 text-center">
                    {s.label}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* ── Card Content ── */}
      <div className="flex flex-col md:flex-row items-center md:items-center justify-between px-1 sm:px-2 md:px-4 gap-3 sm:gap-4 md:gap-8 lg:gap-12 z-10 text-center md:text-left">
        {/* Left Side: Title & Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-4xl gap-1.5 sm:gap-2">
          <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#0B0F29] leading-tight tracking-tight">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed line-clamp-2 md:line-clamp-3 md:max-w-3xl">
            {parseMarkdownLinks(project.description)}
          </p>
        </div>

        <Link href={projectLink} className="mt-1 md:mt-0">
          {/* Right Side: Action Button */}
          <div
            className="flex items-center justify-center gap-2 lg:gap-4 px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-2.5 border border-[#0B0F29]/20 text-[#0B0F29] rounded-full text-xs font-semibold tracking-wide bg-transparent
            hover:bg-[#0B0F29] hover:text-white transition-all duration-300 w-max"
          >
            <span>{project.CTA || "Explore Case Study"}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </div>
        </Link>
      </div>
    </div>
  );
}
