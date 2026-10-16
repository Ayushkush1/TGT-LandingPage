"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, MotionConfig, useScroll, useTransform } from "framer-motion";
import { aboutContent } from "@/content/about";
import { HoverArrow } from "@/components/ui/HoverArrow";
import { RollText } from "@/components/ui/RollText";
import { MagneticButton } from "@/components/ui/MagneticButton";

const ease = [0.22, 1, 0.36, 1] as const;
const inView = { once: true, margin: "-80px" } as const;

/**
 * One word of the pull quote, sliding up out of its own mask. Driven by the
 * parent's variants: a word hidden inside its mask never counts as "in view".
 */
const MaskWord = ({ word, i, gold }: { word: string; i: number; gold?: boolean }) => (
  <span className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em] mr-[0.22em]">
    <motion.span
      variants={{
        hidden: { y: "110%" },
        show: { y: "0%", transition: { duration: 0.9, ease, delay: 0.15 + i * 0.045 } },
      }}
      className={gold ? "inline-block text-[#B8932A]" : "inline-block"}
    >
      {word}
    </motion.span>
  </span>
);

/**
 * Founder's note as a magazine spread: arch portrait that wipes in, word-masked pull quote and a drop-cap letter.
 * All motion is transform / clip-path / stroke only.
 */
export const FounderNote = () => {
  const copy = aboutContent.founder;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const backdropX = useTransform(scrollYProgress, [0, 1], ["6%", "-22%"]);

  const quoteWords = copy.quote.split(" ");
  const goldWords = copy.quoteHighlight.split(" ");

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={ref}
        id="founder"
        className="relative overflow-hidden bg-[#F4F1EA] text-[#0B0F29] px-5 md:px-10 pt-16 md:pt-24 pb-24 md:pb-36 scroll-mt-24"
      >
        {/* Oversized outlined word drifting behind the spread */}
        <motion.p
          aria-hidden
          style={{ x: backdropX, WebkitTextStroke: "1px rgba(11,15,41,0.09)" }}
          className="pointer-events-none select-none absolute left-0 -bottom-[0.22em] whitespace-nowrap font-serif italic text-[22vw] md:text-[15vw] leading-none text-transparent"
        >
          {copy.backdrop} {copy.backdrop}
        </motion.p>

        <div className="relative max-w-[1600px] mx-auto">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#0B0F29]/65">{copy.label}</p>

          <div className="mt-10 md:mt-14 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Arch portrait */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="lg:col-span-4 relative w-full max-w-[300px] md:max-w-[320px] mx-auto lg:mx-0"
            >
              {/* Offset gold outline echoing the arch */}
              <motion.div
                aria-hidden
                variants={{
                  hidden: { opacity: 0, x: 0, y: 0 },
                  show: { opacity: 1, x: 14, y: 14, transition: { duration: 1.2, ease, delay: 0.6 } },
                }}
                className="absolute inset-0 rounded-t-[999px] rounded-b-[1.75rem] border border-[#B8932A]/50"
              />
              <motion.div
                variants={{
                  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
                  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.3, ease } },
                }}
                className="relative aspect-[4/5] rounded-t-[999px] rounded-b-[1.75rem] overflow-hidden bg-[#0B0F29]/10"
              >
                <div className="absolute inset-0">
                  <motion.div
                    variants={{
                      hidden: { scale: 1.25 },
                      show: { scale: 1, transition: { duration: 1.6, ease } },
                    }}
                    className="relative w-full h-full origin-top"
                  >
                    <Image
                      src={copy.photo}
                      alt={`${copy.name}, ${copy.role} of The Gold Technologies`}
                      fill
                      sizes="(max-width: 1024px) 300px, 320px"
                      className="object-cover object-top"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Vertical caption along the arch */}
              <p className="hidden md:block absolute top-1/2 -right-10 origin-center rotate-90 translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-[#0B0F29]/45">
                {copy.name} · {copy.role}
              </p>
            </motion.div>

            {/* The letter */}
            <div className="lg:col-span-8 lg:pl-6">
              <motion.blockquote initial="hidden" whileInView="show" viewport={inView} className="relative">
                <motion.span
                  aria-hidden
                  variants={{
                    hidden: { opacity: 0, scale: 0.6 },
                    show: { opacity: 1, scale: 1, transition: { duration: 1, ease } },
                  }}
                  className="absolute -top-12 -left-3 md:-top-20 md:-left-8 font-serif text-[8rem] md:text-[12rem] leading-none text-[#D4AF37]/25 select-none"
                >
                  “
                </motion.span>
                <p className="relative font-serif italic text-[2.15rem] sm:text-5xl lg:text-[4.1rem] leading-[1.06] tracking-[-0.02em] max-w-5xl">
                  <span className="sr-only">
                    {copy.quote} {copy.quoteHighlight}
                  </span>
                  <span aria-hidden>
                    {quoteWords.map((w, i) => (
                      <MaskWord key={`q${i}`} word={w} i={i} />
                    ))}
                    {goldWords.map((w, i) => (
                      <MaskWord key={`g${i}`} word={w} i={quoteWords.length + i} gold />
                    ))}
                  </span>
                </p>
              </motion.blockquote>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 0.9, ease, delay: 0.5 }}
                className="mt-10 grid md:grid-cols-2 gap-5 md:gap-10 max-w-4xl text-[#0B0F29]/70 leading-relaxed"
              >
                {copy.note.map((p, i) => (
                  <p
                    key={p}
                    className={
                      i === 0
                        ? "first-letter:font-serif first-letter:italic first-letter:text-[1.6em] first-letter:leading-[0] first-letter:mr-0.5 first-letter:text-[#B8932A]"
                        : undefined
                    }
                  >
                    {p}
                  </p>
                ))}
              </motion.div>

              <div className="mt-10 pt-8 border-t border-[#0B0F29]/10 flex flex-wrap items-center justify-between gap-8 max-w-4xl">
                <div className="min-w-0">
                  <div>
                    <p className="font-semibold">{copy.name}</p>
                    <p className="text-sm text-[#0B0F29]/60">{copy.role}, The Gold Technologies</p>
                  </div>
                </div>

                <MagneticButton intensity={0.2}>
                  <a
                    href={copy.ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/roll inline-flex items-center gap-3 rounded-full bg-[#0B0F29] text-white pl-6 pr-1.5 py-1.5 font-medium"
                  >
                    <RollText>{copy.ctaLabel}</RollText>
                    <span className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center">
                      <HoverArrow className="!text-black" />
                    </span>
                  </a>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
};
