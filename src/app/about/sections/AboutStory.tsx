"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { aboutContent } from "@/content/about";

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
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={highlight ? "font-serif italic font-normal text-[#B8932A] mr-[0.22em]" : "mr-[0.22em]"}
    >
      {word}
    </motion.span>
  );
};

/** Who we are: statement that lights up word by word as it scrolls, plus key numbers. */
export const AboutStory = () => {
  const copy = aboutContent.story;
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const words = copy.text.split(" ");
  const highlights = new Set(copy.highlights.map((w) => w.toLowerCase()));

  return (
    <section className="bg-[#F4F1EA] text-[#0B0F29] px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-10">
        <p className="lg:col-span-3 text-[11px] uppercase tracking-[0.25em] text-[#0B0F29]/65">{copy.label}</p>
        <div className="lg:col-span-9">
          <p
            ref={ref}
            className="flex flex-wrap text-[8.5vw] sm:text-5xl lg:text-[4rem] leading-[1.08] tracking-[-0.035em] font-medium"
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

          <dl className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-y-8 border-t border-[#0B0F29]/15">
            {copy.stats.map((stat) => (
              <div key={stat.label} className="pt-6 pr-4">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-4xl md:text-6xl font-semibold tracking-[-0.05em]">{stat.value}</dd>
                <dd className="mt-2 text-xs md:text-sm text-[#0B0F29]/60">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
