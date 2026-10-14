"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useSectionContent } from "@/content/useSectionContent";

const Word = ({
  word,
  progress,
  range,
  highlight,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  highlight: boolean;
}) => {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={
        highlight
          ? "font-serif italic font-normal text-[#B8932A] mr-[0.22em]"
          : "mr-[0.22em]"
      }
    >
      {word}
    </motion.span>
  );
};

/** Positioning statement whose words light up as it scrolls through view. */
export const Manifesto = () => {
  const data = useSectionContent("Manifesto");
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const words = data.text.split(" ");
  const highlights = new Set(data.highlights.map((w) => w.toLowerCase()));

  return (
    <section className="px-5 md:px-10 pt-16 md:pt-24 pb-16 md:pb-24">
      <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-10">
        <p className="lg:col-span-3 text-[11px] uppercase tracking-[0.25em] text-[#0B0F29]/50">
          {data.label}
        </p>
        <div className="lg:col-span-9">
          <p
            ref={ref}
            className="flex flex-wrap text-[9vw] sm:text-5xl lg:text-[4.25rem] leading-[1.08] tracking-[-0.035em] font-medium text-[#0B0F29]"
          >
            {words.map((word, i) => (
              <Word
                key={i}
                word={word}
                progress={scrollYProgress}
                range={[i / words.length, (i + 1) / words.length]}
                highlight={highlights.has(word.toLowerCase())}
              />
            ))}
          </p>

          <dl className="mt-12 md:mt-16 grid grid-cols-3 border-t border-[#0B0F29]/15">
            {data.stats.map((stat) => (
              <div key={stat.label} className="pt-6 pr-4">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-4xl md:text-7xl font-semibold tracking-[-0.05em] text-[#0B0F29]">
                  {stat.value}
                </dd>
                <dd className="mt-2 text-xs md:text-sm text-[#0B0F29]/55">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
