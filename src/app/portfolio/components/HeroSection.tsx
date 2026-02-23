"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

// ─── Animated Counter ─────────────────────────────────────────────────────────
const AnimatedCounter = ({
  value,
  label,
  suffix = "+",
}: {
  value: number;
  label: React.ReactNode;
  suffix?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-extrabold text-[#D4AF37] mb-1 flex justify-center items-center">
        <motion.span>{display}</motion.span>
        {suffix}
      </div>
      <div className="text-sm font-medium text-gray-500 uppercase tracking-wide px-2">
        {label}
      </div>
    </div>
  );
};

// ─── Floating Badge ───────────────────────────────────────────────────────────
function FloatingBadge({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] }}
      className={`absolute z-20 bg-white rounded-2xl shadow-xl border border-gray-100/80 px-4 py-3 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden mb-10">
      {/* Radial glow — top left */}
      <div
        className="absolute -top-40 -left-20 w-[700px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(212,175,55,0.07) 0%, transparent 65%)",
          filter: "blur(48px)",
        }}
      />
      {/* Radial glow — bottom right */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom right, rgba(11,15,41,0.04) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
      />

      <div className="relative z-10 pt-20 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── LEFT: Text ─────────────────────────────────────────── */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-px w-8 bg-gray-300" />
              <span className="text-gray-400 font-bold tracking-[0.22em] text-[0.65rem] uppercase">
                Our Work
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-5xl md:text-6xl font-extrabold text-[#0B0F29] leading-[1.08] mb-6 tracking-tight"
            >
              Work that{" "}
              <span className="font-serif italic font-medium text-[#D4AF37] relative inline-block">
                speaks
                <motion.svg
                  className="absolute -bottom-1.5 left-0 w-full overflow-visible"
                  viewBox="0 0 160 8"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <motion.path
                    d="M2 5.5 Q40 1.5 80 5.5 Q120 9.5 158 5.5"
                    stroke="rgba(212,175,55,0.4)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.75,
                      ease: "easeInOut",
                    }}
                  />
                </motion.svg>
              </span>
              <br />
              for itself
            </motion.h2>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg text-gray-500 font-light leading-relaxed max-w-lg"
            >
              Every project we build is a partnership — rooted in understanding
              your goals, and executed with precision. Here's a selection of
              what we've shipped.
            </motion.p>

            {/* Buttons - Monochrome */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-8"
            >
              <Link href={"/contactUs"}>
                <button className="bg-[#0B0F29] text-white px-10 py-4 rounded-full font-semibold tracking-wide hover:bg-black transition-all duration-300 border border-transparent hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] flex justify-center items-center gap-3 group">
                  Start a project
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <button className="text-black px-6 py-4 rounded-full text-md font-medium transition-colors border border-transparent hover:border-[#D4AF37]">
                View projects
              </button>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55, ease: "easeOut" }}
              className="origin-left mt-12 h-px bg-gradient-to-r from-gray-200 via-[#D4AF37]/25 to-transparent"
            />
            <div className="flex flex-col md:flex-row items-center mt-10 gap-12 md:gap-16">
              <AnimatedCounter
                value={50}
                label={
                  <>
                    Happy
                    <br />
                    Clients
                  </>
                }
                suffix="+"
              />
              <AnimatedCounter
                value={70}
                label={
                  <>
                    Completed
                    <br />
                    Projects
                  </>
                }
                suffix="+"
              />
              <AnimatedCounter
                value={7}
                label={
                  <>
                    Countries
                    <br />
                    Served
                  </>
                }
                suffix="+"
              />
            </div>
          </div>

          {/* ── RIGHT: Image Collage ────────────────────────────────── */}
          <div className="relative hidden lg:flex items-center justify-center h-[580px]">
            {/* Decorative rings */}
            {[520, 440].map((size, i) => (
              <motion.div
                key={size}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.35 + i * 0.12 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4AF37]/8 pointer-events-none"
                style={{ width: size, height: size }}
              />
            ))}

            {/* Main image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative w-[340px] h-[450px] rounded-3xl overflow-hidden border border-white/60"
              style={{
                boxShadow:
                  "0 32px 80px -12px rgba(11,15,41,0.18), 0 0 0 1px rgba(212,175,55,0.08)",
              }}
            >
              <img
                src="https://picsum.photos/seed/fin1/680/900"
                alt="Featured project"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F29]/55 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-[0.58rem] font-bold tracking-widest uppercase text-[#D4AF37]">
                  System Architecture
                </span>
                <p className="text-white font-bold text-lg mt-0.5 leading-tight">
                  FinTech Evolution
                </p>
              </div>
            </motion.div>

            {/* Secondary image — top-left */}
            <motion.div
              initial={{ opacity: 0, x: -28, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.75, delay: 0.55, ease: "easeOut" }}
              className="absolute top-8 -left-4 w-[170px] h-[120px] rounded-2xl overflow-hidden border border-white/70"
              style={{ boxShadow: "0 16px 40px rgba(0,0,0,0.12)" }}
            >
              <img
                src="https://picsum.photos/seed/lux2/340/240"
                alt="Luxe Commerce"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <p className="absolute bottom-2.5 left-3 text-white text-[0.65rem] font-bold">
                Luxe Commerce
              </p>
            </motion.div>

            {/* Tertiary image — bottom-left */}
            <motion.div
              initial={{ opacity: 0, x: -24, y: 28 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.75, delay: 0.68, ease: "easeOut" }}
              className="absolute bottom-14 -left-8 w-[145px] h-[105px] rounded-2xl overflow-hidden border border-white/70"
              style={{ boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
            >
              <img
                src="https://picsum.photos/seed/hlt3/290/210"
                alt="Health OS"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <p className="absolute bottom-2.5 left-3 text-white text-[0.65rem] font-bold">
                Health OS
              </p>
            </motion.div>

            {/* Badge — Live Status */}
            <FloatingBadge className="top-10 -right-4" delay={0.9}>
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <div>
                  <p className="text-[0.62rem] font-bold text-gray-800 leading-none">
                    Live Project
                  </p>
                  <p className="text-[0.57rem] text-gray-400 mt-0.5">
                    Deployment ready
                  </p>
                </div>
              </div>
            </FloatingBadge>

            {/* Badge — Rating */}
            <FloatingBadge className="bottom-24 -right-6" delay={1.05}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-sm flex-shrink-0">
                  ⭐
                </div>
                <div>
                  <p className="text-[0.62rem] font-bold text-gray-800 leading-none">
                    5.0 Rating
                  </p>
                  <p className="text-[0.57rem] text-gray-400 mt-0.5">
                    50+ happy clients
                  </p>
                </div>
              </div>
            </FloatingBadge>

            {/* Badge — Tech */}
            <FloatingBadge className="-bottom-1 left-10" delay={1.18}>
              <div className="flex items-center gap-2">
                {["TS", "⚛", "🐍"].map((icon, i) => (
                  <span
                    key={i}
                    className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-xs font-bold text-gray-600"
                  >
                    {icon}
                  </span>
                ))}
                <span className="text-[0.58rem] text-gray-400 font-medium ml-0.5">
                  +12 more
                </span>
              </div>
            </FloatingBadge>
          </div>
        </div>
      </div>
    </section>
  );
}
