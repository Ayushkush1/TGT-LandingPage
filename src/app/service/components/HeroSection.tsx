"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ServiceHeroData } from "@/store/useCMSStore";
import { parseMarkdownLinks } from "@/utils/text";

export const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

function HeroSection({
  serviceData,
}: {
  serviceData?: ServiceHeroData | undefined;
}) {
  const Heading = (serviceData?.headingTag || "h1") as any;
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-14 bg-white font-serif"
    >
      {/* ── Top Row ── */}
      <div className="flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-20 items-start lg:items-center mb-8 md:mb-12 lg:mb-16">
        {/* Left: Vertical accent + heading */}
        <motion.div
          variants={itemVariants}
          className="flex gap-4 sm:gap-6 items-center flex-shrink-0 lg:w-96"
        >
          {/* Vertical rule + rotated label */}
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <div className="w-0.5 h-12 sm:h-16 rounded-sm bg-gradient-to-b from-[#D4AF37] to-[#D4AF37]/10" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-semibold font-sans [writing-mode:vertical-rl] [text-orientation:mixed]">
              {serviceData?.label}
            </span>
          </div>

          <div className="max-w-[240px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[300px]">
            {/* Big editorial heading */}
            <Heading className="text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(3rem,5vw,3.75rem)] font-extrabold text-[#0B0F29] leading-[1.08] lg:leading-[1.05] tracking-tight whitespace-pre-line">
              {serviceData?.headingLine1
                ?.trim()
                .split(/\s+/)
                .map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 &&
                      (line === "&" || arr[i + 1] === "&" ? " " : <br />)}
                  </span>
                ))}
            </Heading>
          </div>
        </motion.div>

        {/* Right: Body text + CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex-1 flex flex-col gap-5 lg:gap-8 pt-0 lg:pt-10 font-sans"
        >
          <div className="flex flex-col gap-3 sm:gap-4">
            {serviceData?.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-gray-500 text-base sm:text-lg leading-6 sm:leading-7 font-medium"
              >
                {parseMarkdownLinks(p)}
              </p>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={serviceData?.ctaHref ?? "/contactUs"}
                className="group/btn inline-flex items-center gap-2.5 bg-[#0B0F29] text-white py-3 px-7 sm:py-3.5 sm:px-9 rounded-full font-semibold tracking-wide border border-transparent font-sans text-sm sm:text-[15px] transition-colors hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.35)]"
              >
                {serviceData?.ctaText}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom Row: Image + Pillar Cards ── */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center"
      >
        {/* Image block */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden h-[260px] sm:h-[360px] lg:h-[460px] shadow-xl w-full"
        >
          <img
            src={serviceData?.imageUrl ?? ""}
            alt={serviceData?.label ?? ""}
            className="w-full h-full object-cover object-top absolute inset-0"
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent from-[40%] to-[rgba(11,15,41,0.6)]"
            aria-hidden
          />

          {/* Stat — bottom left */}
          {serviceData?.statSince && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute bottom-4 left-4 sm:bottom-7 sm:left-7 z-10 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-[0_20px_60px_rgba(11,15,41,0.15)] border border-[#D4AF37]/20 font-sans"
            >
              <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-0.5 sm:mb-1">
                Excellence since
              </p>
              <p className="text-2xl sm:text-3xl font-black leading-none text-[#0B0F29] font-serif">
                {serviceData?.statSince}
              </p>
              <div className="mt-1.5 sm:mt-2 h-0.5 w-10 sm:w-12 bg-gradient-to-r from-[#D4AF37] to-transparent" />
            </motion.div>
          )}

          {/* Stat — top right */}
          {serviceData?.statProjects && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute top-4 right-4 sm:top-7 sm:right-7 z-10 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-[0_20px_60px_rgba(11,15,41,0.15)] border border-[#D4AF37]/20 font-sans"
            >
              <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-0.5 sm:mb-1">
                Projects delivered
              </p>
              <p className="text-2xl sm:text-3xl font-black leading-none text-[#0B0F29] font-serif">
                {serviceData?.statProjects}
                <span className="text-[#D4AF37]">+</span>
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Pillars 2×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 content-start">
          {serviceData?.pillars.map((p) => (
            <PillarCard key={p.number} {...p} />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}

export const pillarCardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

export const pillarFillTransition = {
  duration: 0.35,
  ease: [0.4, 0, 0.2, 1] as const,
};

const pillarTextTransition = {
  duration: 0.35,
  ease: [0.4, 0, 0.2, 1] as const,
};

export function PillarCard({
  number,
  title,
  desc,
  inverse = false,
}: {
  number: string;
  title: string;
  desc: string;
  inverse?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const titleColor = inverse
    ? isHovered
      ? "#0B0F29"
      : "#fff"
    : isHovered
      ? "#fff"
      : "#0B0F29";

  const descColor = inverse
    ? isHovered
      ? "#6b7280"
      : "rgba(255,255,255,0.9)"
    : isHovered
      ? "rgba(255,255,255,0.9)"
      : "#6b7280";

  const baseClasses = inverse
    ? "bg-[#0B0F29]"
    : "bg-white border-[#0B0F29]/[0.08]";

  const hoverFillClass = inverse ? "bg-white" : "bg-[#0B0F29]";

  return (
    <motion.div
      variants={pillarCardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative overflow-hidden cursor-pointer rounded-2xl border  ${baseClasses} px-6 py-7 font-sans`}
    >
      {/* Hover fill — scaleY from bottom, 0.35s cubic-bezier */}
      <motion.div
        className={`absolute inset-0 rounded-2xl ${hoverFillClass} z-0 origin-bottom`}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isHovered ? 1 : 0 }}
        transition={pillarFillTransition}
      />

      {/* Decorative circle */}
      <div
        className="absolute -top-3 -right-3 w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#D4AF37]/15 opacity-[0.12]"
        aria-hidden
      />

      {/* Number — gold on hover (overrides white) */}
      <motion.p
        className="relative z-10 text-[13px] font-black tracking-[0.12em] mb-4 font-serif"
        animate={{ color: "#D4AF37" }}
        transition={pillarTextTransition}
      >
        {number}
      </motion.p>

      {/* Title — animated color */}
      <motion.h3
        className="relative z-10 text-[17px] font-bold leading-snug mb-2"
        animate={{ color: titleColor }}
        transition={pillarTextTransition}
      >
        {title}
      </motion.h3>

      {/* Gold divider */}
      <div
        className="relative z-10 h-1.5 w-9 bg-gradient-to-r from-[#D4AF37] to-transparent mb-3"
        aria-hidden
      />

      {/* Description — animated color */}
      <motion.p
        className="relative z-10 text-sm leading-relaxed"
        animate={{ color: descColor }}
        transition={pillarTextTransition}
      >
        {parseMarkdownLinks(desc)}
      </motion.p>
    </motion.div>
  );
}

export default HeroSection;
