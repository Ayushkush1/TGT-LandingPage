"use client";

import { motion } from "framer-motion";
import { portfolioContent } from "@/content/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;

/** Dark band of headline numbers between the work and the testimonials. */
export const Results = () => {
  const copy = portfolioContent.results;

  return (
    <section className="bg-[#0A0A0A] text-white px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <p className="lg:col-span-3 text-[11px] uppercase tracking-[0.25em] text-white/50">{copy.label}</p>
          <h2 className="lg:col-span-9 text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.045em] leading-[0.95]">
            {copy.headlineMain} <span className="font-serif italic font-normal text-[#D4AF37]">{copy.headlineHighlight}</span>
          </h2>
        </div>

        <dl className="mt-12 md:mt-16 grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
          {copy.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease, delay: i * 0.08 }}
              className="pt-8 pr-6 pb-2 lg:border-l lg:first:border-l-0 lg:pl-8 lg:first:pl-0 border-white/10"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.06em] leading-none">{s.value}</dd>
              <dd className="mt-3 text-sm text-white/55">{s.label}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
};
