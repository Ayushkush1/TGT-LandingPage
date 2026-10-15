"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { aboutContent } from "@/content/about";
import { useCMSStore } from "@/store/useCMSStore";

const ease = [0.22, 1, 0.36, 1] as const;

/** First sentence of the CEO's message, used as the pull quote. */
const firstSentence = (text = "") => {
  const match = text.match(/^.*?[.!?](\s|$)/);
  return (match ? match[0] : text).trim();
};

/** Founder's note teaser linking to the full CEO message. */
export const FounderNote = () => {
  const copy = aboutContent.founder;
  const message = useCMSStore((s) => s.ceoData?.main?.message);
  const members = useCMSStore((s) => s.aboutData?.OurTeam?.members);
  const founder = members?.find((m) => /ceo|founder/i.test(m.designation));

  const quote = firstSentence(message?.paragraphs?.[0]);
  const photo = founder?.imageUrl || message?.avatar || "/images/Meghna.jpg";
  const name = founder?.name || message?.name || "Meghna Tiwari";
  const role = founder?.designation || message?.role || "Founder & CEO";
  if (!quote) return null;

  return (
    <section className="bg-[#F4F1EA] text-[#0B0F29] px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="lg:col-span-4"
        >
          <div className="relative aspect-[4/5] max-w-sm rounded-[2rem] overflow-hidden bg-[#0B0F29]/5">
            <Image src={photo} alt={name} fill sizes="(max-width: 1024px) 80vw, 30vw" className="object-cover" />
          </div>
        </motion.div>

        <div className="lg:col-span-8">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#0B0F29]/65">{copy.label}</p>
          <blockquote className="mt-6 relative">
            <span aria-hidden className="absolute -top-8 -left-2 font-serif text-[7rem] leading-none text-[#B8932A]/25 select-none">
              “
            </span>
            <p className="relative font-serif italic text-3xl md:text-5xl leading-[1.15] tracking-[-0.01em]">{quote}</p>
          </blockquote>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="font-semibold text-lg">{name}</p>
              <p className="text-sm text-[#0B0F29]/60">{role}</p>
            </div>
            <Link
              href={copy.linkUrl}
              className="group inline-flex items-center gap-3 rounded-full bg-[#0B0F29] text-white pl-6 pr-1.5 py-1.5 font-medium"
            >
              {copy.linkLabel}
              <span className="w-10 h-10 rounded-full bg-[#D4AF37] text-black flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
