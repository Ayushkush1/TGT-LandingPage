"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCMSStore } from "@/store/useCMSStore";
import { parseMarkdownLinks } from "@/utils/text";

export default function CTABanner() {
  const cta = useCMSStore((state) => state.portfolioData?.main.cta);

  if (!cta) return null;

  return (
    <section className="py-8 md:py-12 lg:py-16 px-4 sm:px-6" id="location">
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-50 py-10 md:py-14 lg:py-16 px-6 md:px-10 max-w-6xl m-auto shadow-xl">
        <div className="text-center max-w-4xl mx-auto mb-8 md:mb-10 lg:mb-14">
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-5 lg:mb-6">
            <div className="h-px w-8 bg-gray-400/30"></div>
            <span className="text-gray-400 font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase">
              {cta.eyebrow}
            </span>
            <div className="h-px w-8 bg-gray-400/30"></div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0B0F29] leading-[1.15] mb-4 md:mb-5 lg:mb-6 tracking-tight">
            {cta.titleMain} <br />
            <span className="font-serif italic font-medium text-[#D4AF37]">
              {cta.titleHighlight}
            </span>{" "}
            <span className="text-brand-gold"></span> {cta?.titlepart3}
          </h2>

          <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed max-w-xl mx-auto">
            {parseMarkdownLinks(cta.description)}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-6 pt-1 lg:pt-2"
        >
          <a
            href={cta.primaryButtonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0B0F29] text-white px-7 py-3 sm:px-8 sm:py-3.5 lg:px-10 lg:py-4 rounded-full font-semibold text-sm sm:text-base tracking-wide hover:bg-black transition-all duration-300 border border-transparent hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] flex justify-center items-center gap-2.5 lg:gap-3 group w-full sm:w-auto"
          >
            {cta.primaryButtonText}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
          </a>
          <Link
            href={cta.secondaryButtonLink}
            className="w-full sm:w-auto text-black px-6 py-3 sm:px-7 sm:py-3.5 lg:py-4 rounded-full text-sm sm:text-base lg:text-md font-medium transition-colors border border-black hover:border-[#D4AF37] text-center inline-block"
          >
            {cta.secondaryButtonText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
