"use client";

import { motion } from "framer-motion";
import { aboutContent } from "@/content/about";
import { useCMSStore } from "@/store/useCMSStore";

const ease = [0.22, 1, 0.36, 1] as const;

/** Company milestones (from the CMS CEO timeline) as an editorial timeline. */
export const Journey = () => {
  const copy = aboutContent.journey;
  const milestones = useCMSStore((s) => s.ceoData?.main?.timeline?.milestones) ?? [];
  if (milestones.length === 0) return null;

  return (
    <section id="journey" className="bg-[#0A0A0A] text-white px-5 md:px-10 py-16 md:py-24 scroll-mt-24">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <p className="lg:col-span-3 text-[11px] uppercase tracking-[0.25em] text-white/50">{copy.label}</p>
          <h2 className="lg:col-span-9 text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.045em] leading-[0.95]">
            {copy.headlineMain}{" "}
            <span className="font-serif italic font-normal text-[#D4AF37]">{copy.headlineHighlight}</span>
          </h2>
        </div>

        <ol className="relative mt-14 md:mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {/* Connecting line (desktop) */}
          <span aria-hidden className="hidden lg:block absolute left-0 right-0 top-[5px] h-px bg-white/10" />
          {milestones.map((m, i) => (
            <motion.li
              key={m.year + m.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
              className="relative"
            >
              <span className="relative block w-2.5 h-2.5 rounded-full bg-[#D4AF37] ring-4 ring-[#D4AF37]/20" />
              <p className="mt-6 text-5xl md:text-6xl font-semibold tracking-[-0.05em] text-white">{m.year}</p>
              <p className="mt-4 text-lg font-semibold">{m.title}</p>
              <p className="mt-2 text-sm text-white/55 leading-relaxed">{m.description}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};
