"use client";

import { Navbar } from "@/components/Navbar";
import {
  containerVariants,
  itemVariants,
  PillarCard,
} from "../../service/components/HeroSection";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductItemData } from "@/store/useCMSStore";
import { parseMarkdownLinks } from "@/utils/text";
import dynamic from "next/dynamic";

const Footer = dynamic(() =>
  import("@/components/Footer").then((m) => m.Footer),
);
const TrustedBy = dynamic(() =>
  import("@/components/sections/TrustedBy").then((m) => m.TrustedBy),
);
const VideoSection = dynamic(
  () => import("../../about/components/VideoSection"),
);
const VisionSection = dynamic(
  () => import("../../about/components/VisionSection"),
);
const OurPartners = dynamic(() =>
  import("@/components/sections/OurPartners").then((m) => m.OurPartners),
);
const OurReputation = dynamic(() =>
  import("@/components/sections/OurReputation").then((m) => m.OurReputation),
);
const Integrations = dynamic(() =>
  import("@/components/sections/Integrations").then((m) => m.Integrations),
);
const BlogSection = dynamic(() =>
  import("@/components/sections/BlogSection").then((m) => m.BlogSection),
);

interface ProductsContentProps {
  headerData: any;
  productInfo: ProductItemData[];
}

export default function ProductsContent({
  headerData,
  productInfo,
}: ProductsContentProps) {
  const Heading = (headerData?.headingTag || "h1") as any;
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-brand-gold/20">
      {/* Unified Background Wrapper for Navbar + Hero */}
      <div className="relative">
        {/* Noise Texture Background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 pointer-events-none" />
      </div>
      <Navbar />
      {/* Hero Section */}
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
                {headerData?.label}
              </span>
            </div>

            <div className="max-w-[240px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[300px]">
              {/* Big editorial heading */}
              <Heading className="text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(3rem,5vw,3.75rem)] font-extrabold text-[#0B0F29] leading-[1.08] lg:leading-[1.05] tracking-tight whitespace-pre-line">
                {headerData?.headingLine
                  ?.trim()
                  .split(/\s+/)
                  ?.map((line: string, i: number, arr: string[]) => (
                    <span key={i}>
                      {line}
                      {i < arr.length - 1 && <br />}
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
              {headerData?.paragraphs.map((p: string, i: number) => (
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
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={headerData?.ctaHref ?? ""}
                  className="group/btn inline-flex items-center gap-2.5 bg-[#0B0F29] text-white py-3 px-7 sm:py-3.5 sm:px-9 rounded-full font-semibold tracking-wide border border-transparent font-sans text-sm sm:text-[15px] transition-colors hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.35)]"
                >
                  {headerData?.ctaText}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom Row: Image + Pillar Cards ── */}
        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
          {productInfo?.map((product: ProductItemData, index: number) => {
            return (
              <motion.div
                key={product.id || index}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center"
              >
                {/* Image block */}
                <div
                  className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[300px] sm:min-h-[420px] lg:min-h-[560px] shadow-xl block ${index % 2 === 0 ? "" : "lg:order-last"}`}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="flex flex-col animate-scroll-vertical group-hover:pause">
                      <img
                        src={product?.imageUrl}
                        alt={product?.title}
                        loading="lazy"
                        className="w-full h-auto object-cover object-top transition-all duration-700"
                      />
                      {/* Secondary image for seamless loop */}
                      <img
                        src={product?.imageUrl}
                        alt={product?.title}
                        aria-hidden="true"
                        loading="lazy"
                        className="w-full h-auto object-cover object-top mt-6 transition-all duration-700"
                      />
                      <img
                        src={product?.imageUrl}
                        alt={product?.title}
                        aria-hidden="true"
                        loading="lazy"
                        className="w-full h-auto object-cover object-top mt-6 transition-all duration-700"
                      />
                    </div>
                  </div>

                  {/* Stat — bottom left */}
                  {headerData?.statSince && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="absolute bottom-4 left-4 sm:bottom-7 sm:left-7 z-10 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-[0_20px_60px_rgba(11,15,41,0.15)] border border-[#D4AF37]/20 font-sans group-hover:opacity-0 transition-opacity duration-300"
                    >
                      <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-0.5 sm:mb-1">
                        Excellence since
                      </p>
                      <p className="text-2xl sm:text-3xl font-black leading-none text-[#0B0F29] font-serif">
                        {headerData?.statSince}
                      </p>
                      <div className="mt-1.5 sm:mt-2 h-0.5 w-10 sm:w-12 bg-gradient-to-r from-[#D4AF37] to-transparent" />
                    </motion.div>
                  )}

                  {/* Stat — top right */}
                  {headerData?.statProjects && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="absolute top-4 right-4 sm:top-7 sm:right-7 z-10 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-[0_20px_60px_rgba(11,15,41,0.15)] border border-[#D4AF37]/20 font-sans group-hover:opacity-0 transition-opacity duration-300"
                    >
                      <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-0.5 sm:mb-1">
                        Projects delivered
                      </p>
                      <p className="text-2xl sm:text-3xl font-black leading-none text-[#0B0F29] font-serif">
                        {headerData?.statProjects}
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Content Block: Title + Description + Pillars + Button */}
                <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 h-fit">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 lg:gap-6 w-full">
                    <div className="flex flex-col gap-1.5 sm:gap-2 w-full sm:w-[70%] lg:w-[65%]">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0B0F29] font-serif leading-tight tracking-tight">
                        {product?.title}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm lg:text-[14px] leading-relaxed font-sans max-w-xl font-medium">
                        {parseMarkdownLinks(product?.shortDesc)}
                      </p>
                      <div className="h-0.5 sm:h-1 w-12 sm:w-16 lg:w-20 bg-gradient-to-r from-[#D4AF37] to-transparent rounded-full my-0.5 sm:my-1" />
                    </div>

                    {/* CTA Button */}
                    <div className="pt-0 sm:pt-1 lg:pt-2">
                      <Link
                        href={product?.link || "#"}
                        target="_blank"
                        className="group/btn inline-flex items-center gap-2 lg:gap-2.5 bg-white text-[#0B0F29] py-1.5 px-3.5 sm:py-2 sm:px-4 lg:py-2.5 lg:px-4 rounded-full font-bold tracking-wide border border-[#0B0F29]/10 font-sans text-xs sm:text-sm lg:text-[15px]
                         transition-all hover:bg-[#0B0F29] hover:text-white hover:border-transparent hover:shadow-[0_15px_30px_rgba(11,15,41,0.12)] shadow-sm"
                      >
                        View Live
                        <ArrowRight
                          className="transition-transform group-hover/btn:translate-x-1 w-3.5 h-3.5 sm:w-4 sm:h-4"
                        />
                      </Link>
                    </div>
                  </div>

                  {/* Pillars 2×2 Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 content-start">
                    {product?.pillars?.map((p) => (
                      <PillarCard
                        key={p.number}
                        {...p}
                        inverse={index % 2 !== 0}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
      <TrustedBy />
      <VideoSection />
      <VisionSection />
      <OurPartners />
      <OurReputation />
      <Integrations />
      <BlogSection /> {/* Blog Section */}
      <Footer />
    </main>
  );
}
