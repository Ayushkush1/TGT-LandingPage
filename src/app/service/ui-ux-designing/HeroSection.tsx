"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export type Pillar = {
  number: string;
  title: string;
  desc: string;
};

export type HeroSectionProps = {
  label?: string;
  headingLines: string[];
  paragraphs: string[];
  cta: { text: string; href: string };
  image: { src: string; alt: string };
  statSince?: string;
  statProjects?: string;
  pillars: Pillar[];
};

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

function HeroSection({
  label = "Our Services",
  headingLines,
  paragraphs,
  cta,
  image,
  statSince = "2015",
  statProjects = "200",
  pillars,
}: HeroSectionProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white font-serif"
    >
      {/* ── Top Row ── */}
      <div className="flex flex-col lg:flex-row gap-20 items-center mb-16">
        {/* Left: Vertical accent + heading */}
        <motion.div
          variants={itemVariants}
          className="flex gap-6 items-start flex-shrink-0 lg:w-96"
        >
          {/* Vertical rule + rotated label */}
          <div className="flex flex-col items-center gap-4 pt-2">
            <div className="w-0.5 h-16 rounded-sm bg-gradient-to-b from-[#D4AF37] to-[#D4AF37]/10" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-semibold font-sans [writing-mode:vertical-rl] [text-orientation:mixed]">
              {label}
            </span>
          </div>

          <div>
            {/* Big editorial heading */}
            <h2 className="text-[clamp(3rem,5vw,3.75rem)] font-black text-[#0B0F29] leading-[1.05] tracking-tight">
              {headingLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < headingLines.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </div>
        </motion.div>

        {/* Right: Body text + CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex-1 flex flex-col gap-8 pt-10 font-sans"
        >
          <div className="flex flex-col gap-4">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-gray-500 text-lg leading-7 font-medium"
              >
                {p}
              </p>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={cta.href}
                className="group/btn inline-flex items-center gap-2.5 bg-[#0B0F29] text-white py-3.5 px-9 rounded-full font-semibold tracking-wide border border-transparent font-sans text-[15px] transition-colors hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.35)]"
              >
                {cta.text}
                <ArrowRight />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom Row: Image + Pillar Cards ── */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
      >
        {/* Image block */}
        <motion.div
          variants={itemVariants}
          className="relative rounded-3xl overflow-hidden min-h-[460px] shadow-xl"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover object-top absolute inset-0"
          />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent from-[40%] to-[rgba(11,15,41,0.6)]"
            aria-hidden
          />

          {/* Stat — bottom left */}
          {statSince && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute bottom-7 left-7 z-10 bg-white rounded-2xl p-4 shadow-[0_20px_60px_rgba(11,15,41,0.15)] border border-[#D4AF37]/20 font-sans"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-1">
                Excellence since
              </p>
              <p className="text-3xl font-black leading-none text-[#0B0F29] font-serif">
                {statSince}
              </p>
              <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-[#D4AF37] to-transparent" />
            </motion.div>
          )}

          {/* Stat — top right */}
          {statProjects && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute top-7 right-7 z-10 bg-white rounded-2xl p-4 shadow-[0_20px_60px_rgba(11,15,41,0.15)] border border-[#D4AF37]/20 font-sans"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-1">
                Projects delivered
              </p>
              <p className="text-3xl font-black leading-none text-[#0B0F29] font-serif">
                {statProjects}
                <span className="text-[#D4AF37]">+</span>
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Pillars 2×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
          {pillars.map((p) => (
            <PillarCard key={p.number} {...p} />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}

const pillarCardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

const pillarFillTransition = {
  duration: 0.35,
  ease: [0.4, 0, 0.2, 1] as const,
};

const pillarTextTransition = {
  duration: 0.35,
  ease: [0.4, 0, 0.2, 1] as const,
};

function PillarCard({
  number,
  title,
  desc,
}: {
  number: string;
  title: string;
  desc: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={pillarCardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative overflow-hidden cursor-pointer rounded-2xl border border-[#0B0F29]/[0.08] bg-white px-6 py-7 font-sans"
    >
      {/* Hover fill — scaleY from bottom, 0.35s cubic-bezier */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-[#0B0F29] z-0 origin-bottom"
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

      {/* Title — white on hover */}
      <motion.h3
        className="relative z-10 text-[17px] font-bold leading-snug mb-2"
        animate={{ color: isHovered ? "#fff" : "#0B0F29" }}
        transition={pillarTextTransition}
      >
        {title}
      </motion.h3>

      {/* Gold divider */}
      <div
        className="relative z-10 h-1.5 w-9 bg-gradient-to-r from-[#D4AF37] to-transparent mb-3"
        aria-hidden
      />

      {/* Description — white on hover */}
      <motion.p
        className="relative z-10 text-sm leading-relaxed"
        animate={{ color: isHovered ? "rgba(255,255,255,0.9)" : "#6b7280" }}
        transition={pillarTextTransition}
      >
        {desc}
      </motion.p>
    </motion.div>
  );
}

export default HeroSection;
