"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Quote } from "lucide-react";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";

export default function CeoMessage() {
  return (
    <AnimatedSection animation="fadeIn" delay={0.1}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Left Column - Image */}
          <div className="lg:col-span-5 relative w-full group">
            {/* Abstract gold glow behind image */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#D4AF37]/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-2xl">
              <img
                src="/images/Meghna.jpg"
                alt="Meghna - CEO"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100 cursor-pointer object-top"
              />
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-[#0B0F29] text-white p-6 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(212,175,55,0.15)] flex items-center gap-4 z-20">
              <span className="text-4xl font-display font-black text-[#D4AF37] leading-none">
                15+
              </span>
              <span className="text-[0.65rem] font-bold uppercase tracking-widest leading-tight text-white/70">
                Years of
                <br />
                Excellence
              </span>
            </div>
          </div>

          {/* Right Column - Text & Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center relative">
            <Quote className="absolute -top-16 -left-10 text-gray-100 w-40 h-40 -z-10 rotate-180" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-[clamp(2.5rem,4vw,4rem)] font-display font-black leading-[1.05] tracking-tight text-[#0B0F29] mb-8">
                Building the Future of <br className="hidden md:block" />
                <span className="font-serif italic font-medium text-[#D4AF37]">
                  Digital Excellence.
                </span>
              </h2>

              <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-sans mb-12">
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
              </div>

              {/* Signature Block */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 pt-8">
                <div className="flex items-center gap-6">
                  <div className="w-[2px] h-14 bg-[#D4AF37]" />
                  <div>
                    <h4 className="font-display font-bold text-2xl text-[#0B0F29] mb-1">
                      Meghna
                    </h4>
                    <p className="text-[#D4AF37] text-xs font-semibold tracking-wide uppercase">
                      Chief Executive Officer
                    </p>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 bg-transparent text-[#0B0F29] px-8 py-3.5 rounded-full font-bold text-sm tracking-wide border border-gray-300 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all duration-300 flex-shrink-0"
                >
                  Contact Us
                  <ArrowUpRight
                    size={18}
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
