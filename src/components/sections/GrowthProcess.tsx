"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useSectionContent } from "@/content/useSectionContent";

export const GrowthProcess = () => {
  const data = useSectionContent("GrowthProcess");

  return (
    <section className="bg-[#0A0A0A] text-white px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <p className="lg:col-span-3 text-[11px] uppercase tracking-[0.25em] text-white/50">
            {data.label}
          </p>
          <div className="lg:col-span-9">
            <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.045em] leading-[0.95]">
              {data.headlineMain}{" "}
              <span className="font-serif italic font-normal text-[#D4AF37]">
                {data.headlineHighlight}
              </span>
            </h2>
            <p className="mt-6 text-white/60 max-w-lg">{data.description}</p>
          </div>
        </div>

        <ol className="mt-16 md:mt-24 border-b border-white/10">
          {data.steps.map((step, i) => (
            <motion.li
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative border-t border-white/10 overflow-hidden"
            >
              {/* Gold wipe on hover */}
              <span
                aria-hidden
                className="absolute inset-0 bg-[#D4AF37] origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              />
              <div className="relative grid grid-cols-12 gap-x-4 gap-y-3 py-8 md:py-10 items-center transition-colors duration-500 group-hover:text-black md:px-4">
                <span className="col-span-2 md:col-span-1 font-serif italic text-xl md:text-2xl text-[#D4AF37] transition-colors duration-500 group-hover:text-black">
                  {step.number}
                </span>
                <h3 className="col-span-10 md:col-span-4 text-3xl md:text-5xl font-semibold tracking-[-0.035em] transition-transform duration-500 group-hover:translate-x-2">
                  {step.title}
                </h3>
                <p className="col-span-12 md:col-span-4 text-white/60 leading-relaxed transition-colors duration-500 group-hover:text-black/70">
                  {step.description}
                </p>
                <span className="col-span-12 md:col-span-3 md:text-right text-[11px] uppercase tracking-[0.18em] text-white/50 transition-colors duration-500 group-hover:text-black">
                  {step.deliverable}
                </span>
              </div>
            </motion.li>
          ))}
        </ol>

        <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
          {data.commitments.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-white/80">
              <span className="w-5 h-5 rounded-full bg-[#D4AF37] flex items-center justify-center">
                <Check className="w-3 h-3 text-black" strokeWidth={3} />
              </span>
              <span className="text-sm font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
