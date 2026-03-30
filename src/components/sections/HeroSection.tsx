"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Mail, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCMSStore } from "@/store/useCMSStore";

export const HeroSection = () => {
  const data = useCMSStore((state) => state.homeData?.HeroSection);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % (data?.projects?.length || 1);
        return next;
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [data?.projects?.length]);

  return (
    <section className="relative py-8 overflow-hidden min-h-[90vh] flex flex-col justify-center bg-black">
      {/* Refined Background Golden Wash */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft radial wash in the center-top */}
        <div
          className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[120%] h-[120%] opacity-30 select-none grayscale-[0.2]"
          style={{
            background:
              "radial-gradient(circle at 50% 30%, rgba(212, 175, 55, 0.12) 0%, rgba(10, 11, 18, 0.4) 45%, rgba(0, 0, 0, 1) 100%)",
          }}
        ></div>

        {/* Subtle bottom floor glow */}
        <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-brand-gold/[0.03] to-transparent"></div>
      </div>

      {/* 1. Header Content - Minimalist & Editorial */}
      <div className="max-w-4xl mx-auto text-center space-y-6 xl:space-y-6 3xl:space-y-10 px-4 mb-[70px] relative z-10 pt-4 xl:pt-4 3xl:pt-10">
        {/* Trust Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm"
        >
          {/* Overlapping Avatars */}
          <div className="flex items-center -space-x-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-gold to-[#B5952F] border-2 border-black"></div>
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#F5D061] to-brand-gold border-2 border-black"></div>
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-black"></div>
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-black"></div>
          </div>
          <span className="text-xs font-medium text-white/70">
            {data?.badgeLabel?.split(/(\d+)/).map((part, i) =>
              /\d+/.test(part) ? (
                <strong key={i} className="font-bold text-white">
                  {part}
                </strong>
              ) : (
                part
              ),
            )}
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
          className="text-5xl md:text-[6rem] font-medium text-white leading-[0.95] mb-6 tracking-tighter drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]"
        >
          {data?.headlineMain} <br />
          <span className="text-[#D4AF37] italic font-light drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">
            {data?.headlineItalicHighlight}
          </span>
        </motion.h1>

        {/* Subtext - Clean & Tight */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-white/95 max-w-xl mx-auto mb-6 leading-relaxed font-normal antialiased"
        >
          {data?.heroSubtextDescription}
        </motion.p>

        {/* Buttons - Monochrome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-6 pt-2"
        >
          <a
            href={data?.primaryDestinationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-10 py-4 rounded-full font-semibold tracking-wide hover:bg-brand-gold hover:text-white transition-all duration-300 border border-transparent hover:border-white/20 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] flex justify-center items-center gap-3 group"
          >
            {data?.primaryButtonLabel}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>

          <Link href={data?.secondaryDestinationUrl ?? "/"}>
            <button className="text-white px-6 py-4 rounded-full text-md font-medium transition-colors border border-transparent hover:border-white/10 hover:bg-white/5">
              {data?.secondaryButtonLabel}
            </button>
          </Link>
        </motion.div>
      </div>

      {/* 2. Artistic "Cover Flow" Project Slider */}
      <div className="relative w-full h-[370px] flex items-center justify-center mt-2 xl:mt-2 3xl:mt-6 z-0">
        <div className="relative w-full max-w-[1400px] h-full flex items-center justify-center perspective-[2000px]">
          {data &&
            data?.projects.map((project, index) => {
              const total = data?.projects.length;

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
                  key={project.title}
                  className={cn(
                    "absolute top-[10%] w-[400px] md:w-[450px] aspect-[16/10] rounded-[2rem] flex flex-col overflow-hidden cursor-pointer group",
                    "border border-white/[0.05] shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-700 hover:-translate-y-2",
                    isActive &&
                      "shadow-[0_0_40px_rgba(212,175,55,0.12)] border-white/[0.12] z-50",
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
                  {/* Subtle Material Overlay */}
                  <div className="absolute inset-0 bg-white/[0.02] mix-blend-overlay z-10 pointer-events-none"></div>
                  {/* Full Card Image Background */}
                  <img
                    src={project.image}
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
                      <p className="text-[11px] font-normal uppercase text-white/90 tracking-widest group-hover:text-white transition-colors duration-300 [text-shadow:0_1px_2px_rgba(0,0,0,0.4)]">
                        {project.category}
                      </p>
                      <h3 className="text-2xl font-semibold text-white tracking-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.4)]">
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
