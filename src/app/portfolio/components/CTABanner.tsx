"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CTABanner() {
  return (
    <section className="py-16" id="location">
      <div className="rounded-2xl overflow-hidden bg-gray-50 py-16 max-w-6xl m-auto shadow-xl">
        <div className="text-center max-w-4xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-gray-400/30"></div>
            <span className="text-gray-400 font-bold tracking-[0.2em] text-xs uppercase">
              Ready to build?
            </span>
            <div className="h-px w-8 bg-gray-400/30"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B0F29] leading-[1.15] mb-6 tracking-tight">
            Let's create something <br />
            <span className="font-serif italic font-medium text-[#D4AF37]">
              extraordinary
            </span>{" "}
            <span className="text-brand-gold"></span> together.
          </h2>

          <p className="text-lg text-gray-500 font-light leading-relaxed max-w-xl mx-auto">
            Have a project in mind? Book a free consultation and let's talk
            about how we can bring your vision to life.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-6 pt-2"
        >
          <button className="bg-[#0B0F29] text-white px-10 py-4 rounded-full font-semibold tracking-wide hover:bg-black transition-all duration-300 border border-transparent hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] flex justify-center items-center gap-3 group">
            Book Free Consultation
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <Link href={"/service/website-design-development"}>
            <button className="text-black px-6 py-4 rounded-full text-md font-medium transition-colors border border-black hover:border-[#D4AF37]">
              View All Services
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
