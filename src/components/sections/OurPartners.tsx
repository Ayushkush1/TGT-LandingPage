"use client";
import React from "react";
import { useCMSStore } from "@/store/useCMSStore";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import Image from "next/image";

const LogoPlaceholder = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`h-24 flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-300 transform hover:scale-110 flex-shrink-0 mx-12 grayscale brightness-200 contrast-0 hover:grayscale-0 hover:brightness-100 hover:contrast-100 hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.5)] ${className}`}
  >
    {children}
  </div>
);

export const OurPartners = () => {
  const data = useCMSStore((state) => state.homeData?.OurPartners);
  return (
    <AnimatedSection animation="fadeIn" delay={0.2}>
      <section className="py-24 my-24 bg-[#0B0F29] overflow-hidden relative border-t border-white/5 z-0">
        {/* Background Texture/Noise could go here */}

        <div className="max-w-[1400px] mx-auto px-4 relative z-10 mb-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#D4AF37]/50"></div>
            <span className="text-[#D4AF37] font-bold tracking-[0.3em] text-xs uppercase">
              {data?.upperTag}
            </span>
            <div className="h-px w-12 bg-[#D4AF37]/50"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tighter">
            {data?.headlinePart1}{" "}
            <span className="font-serif italic text-[#D4AF37]">
              {data?.headlineHighlight}
            </span>
          </h2>
        </div>

        {/* Tilted Marquee Container */}
        <div className="relative w-full -rotate-2 scale-110 border-y border-white/5 bg-black/20 backdrop-blur-sm py-12">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0B0F29] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0B0F29] to-transparent z-10"></div>

          <motion.div
            className="flex items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 40,
            }}
            style={{ width: "fit-content" }}
          >
            {[...(data?.logos || []), ...(data?.logos || [])].map(
              (logo, index) => (
                <LogoPlaceholder key={index} className="w-48">
                  <Image
                    src={logo}
                    width={180}
                    height={80}
                    alt={`Partner Logo ${index}`}
                    className="object-contain max-h-16"
                  />
                </LogoPlaceholder>
              ),
            )}
          </motion.div>
        </div>
      </section>
    </AnimatedSection>
  );
};
