"use client";

import {
  ArrowRight,
  CheckCircle2,
  Eye,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { useCMSStore } from "@/store/useCMSStore";
import Link from "next/link";

function VisionSection() {
  const data = useCMSStore((state) => state.aboutData?.VisionSection);

  return (
    // <AnimatedSection animation="fadeUp" delay={0.15}>
    <motion.section
      className="py-24 px-4 md:px-12 bg-white"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.2 },
        },
      }}
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.8 },
            },
          }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-gray-400/30"></div>
            <span className="text-gray-400 font-bold tracking-[0.2em] text-xs uppercase">
              {data?.topLabel}
            </span>
            <div className="h-px w-8 bg-gray-400/30"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B0F29] leading-[1.15] mb-6 tracking-tight">
            {data?.headingPart1}{" "}
            <span className="font-serif italic font-medium text-[#D4AF37]">
              {data?.headingHighlight1}
            </span>{" "}
            <br />
            {data?.headingPart2}{" "}
            <span className="relative inline-block z-0">
              {data?.headingHighlight2}
              <span className="absolute bottom-2 left-0 w-full h-3 bg-[#D4AF37] -z-10 opacity-60 transform -rotate-1 rounded-sm"></span>
            </span>
          </h2>

          <p className="text-lg text-gray-500 font-light leading-relaxed max-w-xl mx-auto">
            {data?.headerDescription
              ?.split(/(The Gold Technologies)/)
              .map((part, i) =>
                part === "The Gold Technologies" ? (
                  <span key={i} className="font-semibold text-gray-900">
                    {part}
                  </span>
                ) : (
                  part
                ),
              )}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto flex flex-col gap-28">
          {/* ─── BLOCK 1: Search Feature ─── */}
          <div className="grid lg:grid-cols-2 gap-20 items-center justify-center">
            {/* LEFT: Graphic */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -60 },
                show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
              }}
              className="relative h-max z-0"
            >
              {/* Side info cards */}
              <div className="absolute -top-28 left-0 z-20 flex flex-col gap-3">
                {/* Card 1 */}
                <div className="bg-gray-900 rounded-2xl px-3 py-2.5 flex items-center gap-2.5 w-44 shadow-lg shadow-blue-200">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-gray-900" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-white text-xs font-bold truncate">
                      Business Expansion
                    </div>
                    <div className="text-white text-xs font-medium">
                      Strategic Growth
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-yellow-300 flex-shrink-0"></div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-2xl px-3 py-2.5 flex items-center gap-2.5 w-44 shadow-lg">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-gray-800 text-xs font-bold truncate">
                      Secure Systems
                    </div>
                    <div className="text-gray-400 text-xs font-medium">
                      Advanced IT Solutions
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-gray-900 flex-shrink-0"></div>
                </div>
              </div>

              {/* Main Vision Card */}
              <div className="absolute -top-20 left-28 right-0 bg-white rounded-3xl shadow-xl overflow-hidden z-10">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 m-3 rounded-2xl p-4">
                  {/* Top bar */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">
                      Our Vision
                    </span>
                    <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg shadow-blue-300">
                      <Eye className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>

                  {/* Vision Content */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="text-sm font-bold text-gray-900 mb-2">
                      Leading Through Innovation
                    </div>

                    <div className="text-xs text-gray-500 font-medium mb-3">
                      Empowering businesses with future-ready technology
                      strategies.
                    </div>

                    <div className="flex gap-3 text-xs text-gray-400 font-semibold">
                      <span>🌍 Global Impact</span>
                      <span>📈 Sustainable Growth</span>
                      <span>🚀 Digital Excellence</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: Text */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 60 },
                show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
              }}
              className="space-y-4"
            >
              <h3 className="text-4xl w-[350px] font-bold text-gray-900 leading-tight">
                {data?.block1Heading}
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed font-medium">
                {data?.block1Description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-4 pt-4">
                {data?.block1Checklist?.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center transition-transform group-hover:scale-110">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-[15px] font-semibold text-gray-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ─── BLOCK 2: Download Feature ─── */}
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* LEFT: Text */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -60 },
                show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
              }}
              className="flex flex-col gap-6"
            >
              <h3 className="text-4xl w-[350px] font-bold text-gray-900 leading-tight">
                {data?.block2Heading}
              </h3>

              <p className="text-gray-500 text-lg leading-relaxed font-medium">
                {data?.block2Description}
              </p>
              <div className="flex gap-4 pt-4">
                <Link href={data?.ctaUrl ?? "/"}>
                  <button className="bg-[#0B0F29] text-white px-10 py-4 rounded-full font-semibold tracking-wide hover:bg-black transition-all duration-300 border border-transparent hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center gap-3 group">
                    {data?.ctaLabel}{" "}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* RIGHT: Graphic */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 60 },
                show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
              }}
              className="relative min-h-96 z-0"
            >
              {/* Analytics Card */}
              <div className="absolute -top-6 right-4 z-20 w-64 bg-[#1E293B] rounded-3xl p-5 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-white text-sm font-bold">
                      Performance Overview
                    </div>
                    <div className="text-gray-400 text-xs">
                      Real-time analytics
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-[#DFBC48] flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-5 h-5 text-[#1E293B]" />
                  </div>
                </div>

                {/* Fake chart bars */}
                <div className="flex items-end gap-2 h-20">
                  <div className="w-3 bg-[#DFBC48] rounded-full h-8"></div>
                  <div className="w-3 bg-[#DFBC48] rounded-full h-12"></div>
                  <div className="w-3 bg-[#DFBC48] rounded-full h-16"></div>
                  <div className="w-3 bg-[#DFBC48] rounded-full h-10"></div>
                  <div className="w-3 bg-[#DFBC48] rounded-full h-14"></div>
                </div>
              </div>

              {/* Strategy Card */}
              <div className="absolute top-24 left-4 right-10 bg-white rounded-3xl p-6 shadow-xl z-10 border border-gray-100">
                <div className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">
                  Smart Strategy
                </div>

                <div className="text-lg font-bold text-[#1E293B] mb-2">
                  Scalable Infrastructure
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Secure, optimized systems designed to grow with your business
                  and adapt to evolving digital demands.
                </p>

                <button className="w-full bg-[#DFBC48] hover:opacity-90 text-[#1E293B] font-bold py-3 rounded-xl transition-all duration-200 shadow-lg">
                  Explore Solutions
                </button>
              </div>

              {/* Floating Security Bubble */}
              <div className="absolute bottom-10 right-2 w-12 h-12 rounded-full bg-[#DFBC48] flex items-center justify-center shadow-lg animate-bounce">
                <ShieldCheck className="w-5 h-5 text-[#1E293B]" />
              </div>
              {/* Extra Floating Badge */}
              <div className="absolute top-10 left-6 bg-[#DFBC48] text-[#1E293B] text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                Enterprise Ready
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
    // </AnimatedSection>
  );
}

export default VisionSection;
