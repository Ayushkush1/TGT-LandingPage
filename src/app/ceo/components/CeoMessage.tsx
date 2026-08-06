"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Quote } from "lucide-react";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useCMSStore } from "@/store/useCMSStore";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { parseMarkdownLinks } from "@/utils/text";

export default function CeoMessage() {
  const data = useCMSStore((state) => state.ceoData?.main?.message);

  return (
    <AnimatedSection animation="fadeIn" delay={0.1}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-8 md:py-12 pb-12 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Left Column - Image */}
          <div className="lg:col-span-5 relative w-full group">
            {/* Abstract gold glow behind image */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#D4AF37]/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
              <OptimizedImage
                src={data?.avatar || "/images/Meghna.jpg"}
                alt={`${data?.name || "Meghna"} - CEO`}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100 cursor-pointer object-top"
              />
            </div>

            {/* Experience Badge */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[#0B0F29] text-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 shadow-[0_10px_30px_rgba(11,15,41,0.5)] flex items-center gap-3 z-20">
              <span className="text-2xl sm:text-3xl font-display font-black text-[#D4AF37] leading-none">
                {data?.yearsLabel || "15+"}
              </span>
              <span className="text-[0.6rem] sm:text-[0.65rem] font-bold uppercase tracking-widest leading-tight text-white/80 whitespace-pre-line">
                {data?.yearsText || "Years of\nExcellence"}
              </span>
            </div>
          </div>

          {/* Right Column - Text & Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center relative">
            <Quote className="absolute -top-12 -left-6 sm:-top-16 sm:-left-10 text-gray-100 w-28 h-28 sm:w-40 sm:h-40 -z-10 rotate-180" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[clamp(2.5rem,4vw,3.5rem)] font-display font-black leading-[1.08] tracking-tight text-[#0B0F29] mb-4 sm:mb-6">
                {data?.title || "Building the Future of"} <br className="hidden md:block" />
                <span className="font-serif italic font-medium text-[#D4AF37]">
                  {data?.titleItalic || "Digital Excellence."}
                </span>
              </h2>

              <div className="space-y-4 sm:space-y-5 text-gray-600 text-base sm:text-lg leading-relaxed font-sans mb-6 sm:mb-8">
                {data?.paragraphs && data.paragraphs.length > 0 ? (
                  data.paragraphs.map((p, idx) => (
                    <p key={idx}>{parseMarkdownLinks(p)}</p>
                  ))
                ) : (
                  <>
                    <p>
                      At The Gold Technologies, we believe that true success is
                      built on innovation, teamwork, and an unwavering commitment to
                      trust. From our humble beginnings to our most remarkable
                      achievements, our journey reflects a dedication to excellence
                      in every single project we undertake.
                    </p>
                    <p>
                      As we continue to expand our horizons globally, our core focus
                      remains absolute: creating sustainable impact, delivering
                      measurable value to our clients, and empowering our people.
                      Together, we strive to turn every challenge into an
                      opportunity, and every great idea into a lasting legacy.
                    </p>
                  </>
                )}
              </div>

              {/* Signature Block */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 pt-4 sm:pt-6">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-[2px] h-10 sm:h-14 bg-[#D4AF37]" />
                  <div>
                    <h4 className="font-display font-bold text-xl sm:text-2xl text-[#0B0F29] mb-0.5">
                      {data?.name || "Meghna"}
                    </h4>
                    <p className="text-[#D4AF37] text-[10px] sm:text-xs font-semibold tracking-wide uppercase">
                      {data?.role || "Chief Executive Officer"}
                    </p>
                  </div>
                </div>

                <Link
                  href={data?.ctaLink || "/contact"}
                  className="group inline-flex items-center gap-2.5 bg-transparent text-[#0B0F29] px-6 py-2.5 sm:px-8 sm:py-3 rounded-full font-bold text-xs sm:text-sm tracking-wide border border-gray-300 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all duration-300 flex-shrink-0"
                >
                  {data?.ctaText || "Contact Us"}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
