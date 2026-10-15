"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { aboutContent } from "@/content/about";

const ease = [0.22, 1, 0.36, 1] as const;

/** Mission & vision as two editorial cards, with the commitments underneath. */
export const AboutPurpose = () => {
  const copy = aboutContent.purpose;

  return (
    <section className="bg-[#0A0A0A] text-white px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <p className="lg:col-span-3 text-[11px] uppercase tracking-[0.25em] text-white/50">{copy.label}</p>
          <h2 className="lg:col-span-9 text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.045em] leading-[0.95]">
            {copy.headlineMain}{" "}
            <span className="font-serif italic font-normal text-[#D4AF37]">{copy.headlineHighlight}</span>
          </h2>
        </div>

        <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-5">
          {copy.cards.map((card, i) => (
            <motion.article
              key={card.kicker}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-[2rem] bg-[#141414] border border-white/10 p-8 md:p-12 min-h-[320px] flex flex-col justify-between"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-1/2 -right-1/4 w-[500px] h-[400px] rounded-full opacity-0 bg-[radial-gradient(closest-side,rgba(212,175,55,0.35),transparent)] transition-opacity duration-700 group-hover:opacity-100"
              />
              <p className="relative flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[#D4AF37]">
                <span className="font-serif italic normal-case tracking-normal text-base">{String(i + 1).padStart(2, "0")}</span>
                {card.kicker}
              </p>
              <div className="relative mt-16">
                <h3 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em] leading-[1.02]">{card.title}</h3>
                <p className="mt-5 text-white/60 leading-relaxed max-w-lg">{card.text}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {copy.values.map((v) => (
            <li key={v} className="flex items-center gap-2.5 text-sm text-white/75">
              <Check className="w-4 h-4 text-[#D4AF37]" />
              {v}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
