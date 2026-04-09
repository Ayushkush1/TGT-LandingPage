"use client";

import { motion } from "framer-motion";
import { Lightbulb, Target, ShieldCheck } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";

const philosophies = [
  {
    title: "Visionary Innovation",
    description:
      "We don’t just adapt to the future; we build it. By constantly pushing boundaries, we deliver solutions that redefine digital landscapes.",
    icon: Lightbulb,
  },
  {
    title: "Client-Centric Excellence",
    description:
      "Every partnership is a commitment. We measure our true success not by output, but by the tangible growth and success of our clients.",
    icon: Target,
  },
  {
    title: "Unyielding Integrity",
    description:
      "Trust is our most valuable currency. We act with transparency, accountability, and a profound respect for the people we serve.",
    icon: ShieldCheck,
  },
];

export default function CeoPhilosophy() {
  return (
    <section className="relative bg-black py-24 md:py-32 overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection animation="fadeIn">
          {/* Header matching main site aesthetics */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-8 bg-white/20"></div>
              <span className="text-white/60 font-bold tracking-[0.2em] text-xs uppercase">
                Core Values
              </span>
              <div className="h-px w-8 bg-white/20"></div>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-[1.15] mb-6 tracking-tight">
              Our Guiding{" "}
              <span className="font-serif italic font-medium text-[#D4AF37]">
                Philosophy
              </span>
            </h2>

            <p className="text-lg text-white/70 font-light leading-relaxed max-w-xl mx-auto">
              Leadership is more than pointing the way—it is about laying down
              the unbreakable foundation upon which greatness is built.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {philosophies.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] blur-xl pointer-events-none" />
              
              <div className="relative h-full flex flex-col p-8 md:p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] hover:bg-white/10 transition-colors duration-500">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 border border-white/5 group-hover:bg-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 transition-all duration-500">
                  <item.icon className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-white/60 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
