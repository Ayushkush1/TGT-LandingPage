"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Mail, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

// Mock Projects Data with "Artistic" themes
const projects = [
  {
    id: 1,
    title: "FinTech Evolution",
    category: "System Architecture",
    theme: "bg-zinc-900",
  },
  {
    id: 2,
    title: "Luxe Commerce",
    category: "Digital Experience",
    theme: "bg-stone-800",
  },
  {
    id: 3,
    title: "Health OS",
    category: "Platform Design",
    theme: "bg-neutral-900",
  },
  {
    id: 4,
    title: "Urban Real Estate",
    category: "Web Interface",
    theme: "bg-slate-900",
  },
  {
    id: 5,
    title: "Future Social",
    category: "Mobile Ecology",
    theme: "bg-black",
  },
];

export const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    console.log("Slider animation started"); // Debug log
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % projects.length;
        console.log("Slider transitioning to index:", next); // Debug log
        return next;
      });
    }, 5000);

    return () => {
      console.log("Slider animation cleanup"); // Debug log
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative py-8 overflow-hidden min-h-[90vh] flex flex-col justify-center">
      {/* 1. Header Content - Minimalist & Editorial */}
      <div className="max-w-4xl mx-auto text-center space-y-6 xl:space-y-6 3xl:space-y-10 px-4 mb-[70px] relative z-10 pt-4 xl:pt-4 3xl:pt-10">
        {/* Trust Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-gray-100 bg-white shadow-sm"
        >
          {/* Overlapping Avatars */}
          <div className="flex items-center -space-x-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-gold to-[#B5952F] border-2 border-white"></div>
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#F5D061] to-brand-gold border-2 border-white"></div>
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white"></div>
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white"></div>
          </div>
          <span className="text-xs font-medium text-gray-600">
            Trusted by <span className="text-black font-semibold">50+</span>{" "}
            businesses
          </span>
        </motion.div>

        {/* Headline - Editorial Style */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-5xl md:text-[6rem] font-medium text-black leading-[0.95] mb-6 tracking-tighter"
        >
          Software artisans <br />
          <span className="text-[#D4AF37]/60 italic font-light">
            crafting digital reality.
          </span>
        </motion.h1>

        {/* Subtext - Clean & Tight */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-gray-500 max-w-xl mx-auto mb-6 leading-relaxed font-normal antialiased"
        >
          Professional web development and software solutions for your business.
          Modern, fast, and built to grow with you.
        </motion.p>

        {/* Buttons - Monochrome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-6 pt-2"
        >
          <button className="bg-[#0B0F29] text-white px-10 py-4 rounded-full font-semibold tracking-wide hover:bg-black transition-all duration-300 border border-transparent hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] flex justify-center items-center gap-3 group">
            Book Free Consultation{" "}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <Link href={"/contactUs"}>
            <button className="text-black px-6 py-4 rounded-full text-md font-medium transition-colors border border-transparent hover:border-[#D4AF37]">
              Request Quote
            </button>
          </Link>
        </motion.div>
      </div>

      {/* 2. Artistic "Cover Flow" Project Slider */}
      <div className="relative w-full h-[370px] flex items-center justify-center mt-2 xl:mt-2 3xl:mt-6">
        <div className="relative w-full max-w-[1400px] h-full flex items-center justify-center perspective-[2000px]">
          {projects.map((project, index) => {
            const total = projects.length;

            // Calculate wrapped position
            let position = index - activeIndex;
            // Handle wrapping for infinite feel
            if (position < -2) position += total;
            if (position > 2) position -= total;

            // Determine state
            const isActive = position === 0;
            const isPrev = position === -1;
            const isNext = position === 1;
            const isFarPrev = position < -1;
            const isFarNext = position > 1;

            // Artistic Transforms
            let xOffset = "0%";
            let scale = 1;
            let opacity = 1;
            let zIndex = 0;
            let blur = "0px";
            let brightness = "100%";

            if (isActive) {
              xOffset = "0%";
              scale = 1.25;
              zIndex = 50;
              opacity = 1;
              brightness = "100%";
            } else if (isPrev) {
              xOffset = "-55%";
              scale = 0.9;
              zIndex = 40;
              opacity = 0.8;
              blur = "2px";
              brightness = "70%";
            } else if (isNext) {
              xOffset = "55%";
              scale = 0.9;
              zIndex = 40;
              opacity = 0.8;
              blur = "2px";
              brightness = "70%";
            } else if (isFarPrev) {
              xOffset = "-105%";
              scale = 0.7;
              zIndex = 30;
              opacity = 0.4;
              blur = "8px";
              brightness = "50%";
            } else if (isFarNext) {
              xOffset = "105%";
              scale = 0.7;
              zIndex = 30;
              opacity = 0.4;
              blur = "8px";
              brightness = "50%";
            }

            return (
              <div
                key={project.id}
                className={cn(
                  "absolute top-[10%] w-[400px] md:w-[450px] aspect-[16/10] rounded-[2rem] flex flex-col overflow-hidden cursor-pointer group",
                  "shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.25)]",
                  project.theme,
                )}
                style={{
                  transform: `translateX(${xOffset}) scale(${scale})`,
                  zIndex: zIndex,
                  opacity: opacity,
                  filter: `blur(${blur}) brightness(${brightness})`,
                  transition: "all 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  willChange: "transform, opacity, filter",
                }}
              >
                {/* Full Card Image Background */}
                <img
                  src={`https://picsum.photos/seed/${project.id}/800/500`}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 transition-all duration-500"></div>

                {/* Subtle shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>

                {/* Card Content */}
                <div className="relative w-full h-full p-6 flex flex-col justify-between z-10">
                  {/* Card Header */}
                  <div className="flex justify-end items-end">
                    <ArrowUpRight className="text-white/70 w-6 h-6 transition-all duration-300 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>

                  {/* Card Footer */}
                  <div className="transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                    <p className="text-[11px] font-normal uppercase  text-white/80 group-hover:text-white/80 transition-colors duration-300">
                      {project.category}
                    </p>
                    <h3 className="text-2xl font-semibold text-white tracking-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
