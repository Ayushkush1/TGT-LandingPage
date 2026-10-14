"use client";

import { motion } from "framer-motion";
import { Lightbulb, Target, ShieldCheck } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useCMSStore } from "@/store/useCMSStore";
import { parseMarkdownLinks } from "@/utils/text";

const iconMap: { [key: string]: any } = {
  Lightbulb: Lightbulb,
  Target: Target,
  ShieldCheck: ShieldCheck,
};

const defaultPhilosophies = [
  {
    title: "Visionary Innovation",
    description:
      "We don’t just adapt to the future; we build it. By constantly pushing boundaries, we deliver solutions that redefine digital landscapes.",
    icon: "Lightbulb",
  },
  {
    title: "Client-Centric Excellence",
    description:
      "Every partnership is a commitment. We measure our true success not by output, but by the tangible growth and success of our clients.",
    icon: "Target",
  },
  {
    title: "Unyielding Integrity",
    description:
      "Trust is our most valuable currency. We act with transparency, accountability, and a profound respect for the people we serve.",
    icon: "ShieldCheck",
  },
];

export default function CeoPhilosophy() {
  const data = useCMSStore((state) => state.ceoData?.main?.philosophy);
  const items = data?.items || defaultPhilosophies;

  return (
    <section className="relative bg-black py-12 md:py-20 overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection animation="fadeIn">
          {/* Header matching main site aesthetics */}
          <div className="text-center max-w-4xl mx-auto mb-8 md:mb-12">
            <div className="flex items-center justify-center gap-4 mb-3 md:mb-5">
              <div className="h-px w-8 bg-white/20"></div>
              <span className="text-white/60 font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase">
                {data?.upperTag || "Core Values"}
              </span>
              <div className="h-px w-8 bg-white/20"></div>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-[1.15] mb-3 md:mb-5 tracking-tight">
              {data?.title || "Our Guiding"}{" "}
              <span className="font-serif italic font-medium text-[#D4AF37]">
                {data?.titleHighlight || "Philosophy"}
              </span>
            </h2>

            <p className="text-base md:text-lg text-white/70 font-light leading-relaxed max-w-xl mx-auto">
              {parseMarkdownLinks(
                data?.description ||
                  "Leadership is more than pointing the way—it is about laying down the unbreakable foundation upon which greatness is built.",
              )}
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {items.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Lightbulb;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl blur-xl pointer-events-none" />

                <div className="relative h-full flex flex-col p-6 sm:p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl hover:bg-white/10 transition-colors duration-500">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/10 flex items-center justify-center mb-5 sm:mb-6 border border-white/5 group-hover:bg-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 transition-all duration-500">
                    <IconComponent
                      className="w-6 h-6 sm:w-7 sm:h-7 text-[#D4AF37]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed text-xs sm:text-sm">
                    {parseMarkdownLinks(item.description)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
