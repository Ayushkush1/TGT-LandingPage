"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { TrustedBy } from "@/components/sections/TrustedBy";
import VideoSection from "../../about/components/VideoSection";
import VisionSection from "../../about/components/VisionSection";
import { OurPartners } from "@/components/sections/OurPartners";
import { OurReputation } from "@/components/sections/OurReputation";
import { Integrations } from "@/components/sections/Integrations";
import {
  containerVariants,
  itemVariants,
  PillarCard,
} from "../../service/components/HeroSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductItemData } from "@/store/useCMSStore";

interface ProductsContentProps {
  headerData: any;
  productInfo: ProductItemData[];
}

export default function ProductsContent({
  headerData,
  productInfo,
}: ProductsContentProps) {
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
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white font-serif"
      >
        {/* ── Top Row ── */}
        <div className="flex flex-col lg:flex-row gap-20 items-center mb-16">
          {/* Left: Vertical accent + heading */}
          <motion.div
            variants={itemVariants}
            className="flex gap-6 items-center flex-shrink-0 lg:w-96"
          >
            {/* Vertical rule + rotated label */}
            <div className="flex flex-col items-center gap-4 pt-2">
              <div className="w-0.5 h-16 rounded-sm bg-gradient-to-b from-[#D4AF37] to-[#D4AF37]/10" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-semibold font-sans [writing-mode:vertical-rl] [text-orientation:mixed]">
                {headerData?.label}
              </span>
            </div>

            <div>
              {/* Big editorial heading */}
              <h1 className="text-[clamp(3rem,5vw,3.75rem)] font-black text-[#0B0F29] leading-[1.05] tracking-tight">
                {headerData?.headingLine
                  ?.trim()
                  .split(/\s+/)
                  ?.map((line: string, i: number, arr: string[]) => (
                    <span key={i}>
                      {line}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))}
              </h1>
            </div>
          </motion.div>

          {/* Right: Body text + CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex-1 flex flex-col gap-8 pt-10 font-sans"
          >
            <div className="flex flex-col gap-4">
              {headerData?.paragraphs.map((p: string, i: number) => (
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
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={headerData?.ctaHref ?? ""}
                  className="group/btn inline-flex items-center gap-2.5 bg-[#0B0F29] text-white py-3.5 px-9 rounded-full font-semibold tracking-wide border border-transparent font-sans text-[15px] transition-colors hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.35)]"
                >
                  {headerData?.ctaText}
                  <ArrowRight />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom Row: Image + Pillar Cards ── */}
        <div className=" flex flex-col gap-20">
          {productInfo?.map((product: ProductItemData, index: number) => {
            return (
              <motion.div
                key={product.id || index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center`}
              >
                {/* Image block */}
                <div
                  className={`group relative rounded-3xl overflow-hidden min-h-[560px] shadow-xl block ${index % 2 === 0 ? "" : "lg:order-last"}`}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="flex flex-col animate-scroll-vertical group-hover:pause">
                      <img
                        src={product?.imageUrl}
                        alt={product?.title}
                        className="w-full h-auto object-cover object-top transition-all duration-700"
                      />
                      {/* Secondary image for seamless loop */}
                      <img
                        src={product?.imageUrl}
                        alt={product?.title}
                        aria-hidden="true"
                        className="w-full h-auto object-cover object-top mt-6 transition-all duration-700"
                      />
                      <img
                        src={product?.imageUrl}
                        alt={product?.title}
                        aria-hidden="true"
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
                      className="absolute bottom-7 left-7 z-10 bg-white rounded-2xl p-4 shadow-[0_20px_60px_rgba(11,15,41,0.15)] border border-[#D4AF37]/20 font-sans group-hover:opacity-0 transition-opacity duration-300"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-1">
                        Excellence since
                      </p>
                      <p className="text-3xl font-black leading-none text-[#0B0F29] font-serif">
                        {headerData?.statSince}
                      </p>
                      <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-[#D4AF37] to-transparent" />
                    </motion.div>
                  )}

                  {/* Stat — top right */}
                  {headerData?.statProjects && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="absolute top-7 right-7 z-10 bg-white rounded-2xl p-4 shadow-[0_20px_60px_rgba(11,15,41,0.15)] border border-[#D4AF37]/20 font-sans group-hover:opacity-0 transition-opacity duration-300"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-1">
                        Projects delivered
                      </p>
                      <p className="text-3xl font-black leading-none text-[#0B0F29] font-serif">
                        {headerData?.statProjects}
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Content Block: Title + Description + Pillars + Button */}
                <div className="flex flex-col gap-8 h-fit">
                  <div className=" flex justify-between items-center w-full">
                    <div className="flex flex-col gap-2 w-[60%]">
                      <h3 className="text-3xl font-black text-[#0B0F29] font-serif leading-tight tracking-tight">
                        {product?.title}
                      </h3>
                      <p className="text-gray-500 text-[14px] leading-relaxed font-sans max-w-xl font-medium">
                        {product?.shortDesc}
                      </p>
                      <div className="h-1 w-20 bg-gradient-to-r from-[#D4AF37] to-transparent rounded-full" />
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2">
                      <Link
                        href={product?.link || "#"}
                        target="_blank"
                        className="group/btn inline-flex items-center gap-2.5 bg-white text-[#0B0F29] py-2.5 px-4 text-sm rounded-full font-bold tracking-wide border border-[#0B0F29]/10 font-sans text-[15px]
                         transition-all hover:bg-[#0B0F29] hover:text-white hover:border-transparent hover:shadow-[0_20px_40px_rgba(11,15,41,0.15)] shadow-sm "
                      >
                        View Live
                        <ArrowRight
                          className="transition-transform group-hover/btn:translate-x-1"
                          size={14}
                        />
                      </Link>
                    </div>
                  </div>

                  {/* Pillars 2×2 Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
                    {product?.pillars?.map((p) => (
                      <PillarCard key={p.number} {...p} inverse={index % 2 !== 0} />
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
