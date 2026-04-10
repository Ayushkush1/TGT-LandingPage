"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";

const milestones = [
  {
    year: "2015",
    title: "The Foundation",
    description:
      "Established The Gold Technologies with a core focus on innovative digital solutions and setting a new standard for luxury web experiences.",
  },
  {
    year: "2018",
    title: "Global Expansion",
    description:
      "Opened our first international office, securing partnerships with Fortune 500 brands and accelerating our global footprint.",
  },
  {
    year: "2021",
    title: "Transformative Growth",
    description:
      "Tripled our workforce and expanded into cutting-edge AI and SaaS architecture, fundamentally shifting our delivery capabilities.",
  },
  {
    year: "2024",
    title: "Industry Leadership",
    description:
      "Recognized globally as a premier digital agency, setting the benchmark for performance, design, and reliable software engineering.",
  },
];

export default function CeoTimeline() {
  return (
    <section className="bg-white py-24 md:py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fadeUp">
          <div className="text-center max-w-4xl mx-auto mb-20 md:mb-32">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-8 bg-gray-400/30"></div>
              <span className="text-gray-400 font-bold tracking-[0.2em] text-xs uppercase">
                Milestones
              </span>
              <div className="h-px w-8 bg-gray-400/30"></div>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B0F29] leading-[1.15] mb-6 tracking-tight">
              Journey of{" "}
              <span className="font-serif italic font-medium text-[#D4AF37]">
                Excellence
              </span>
            </h2>

            <p className="text-lg text-gray-500 font-light leading-relaxed max-w-xl mx-auto">
              Milestones that define our continuous pursuit of perfection and
              global impact.
            </p>
          </div>
        </AnimatedSection>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gray-100 via-[#D4AF37]/30 to-gray-100 transform md:-translate-x-1/2" />

          <div className="space-y-16 pt-8">
            {milestones.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7 }}
                  className={`relative flex flex-col md:flex-row items-center justify-between ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)] z-10" />

                  {/* Content Container */}
                  <div
                    className={`w-full md:w-5/12 pl-12 md:pl-0 md:text-left md:pr-12`}
                  >
                    <div className="group bg-gray-50/50 hover:bg-white border border-transparent hover:border-[#D4AF37]/20 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500">
                      <span className="inline-block text-[#D4AF37] font-extrabold text-lg mb-2 tracking-widest bg-[#D4AF37]/10 px-4 py-1 rounded-full">
                        {item.year}
                      </span>
                      <h3 className="text-2xl font-bold text-[#0B0F29] mb-4">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Empty Spacer container for offset side */}
                  <div className="hidden md:block w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
