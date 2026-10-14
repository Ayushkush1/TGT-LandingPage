"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Clock, Star } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useSectionContent } from "@/content/useSectionContent";
import { RevealPill } from "./HeroPills";
import { useWorkItems } from "@/content/useWorkItems";
import { useCMSStore } from "@/store/useCMSStore";

const ease = [0.22, 1, 0.36, 1] as const;

/** One headline line that slides up from behind a mask. */
const Line = ({ children, delay }: { children: ReactNode; delay: number }) => (
  <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
    <motion.span
      className="block"
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.1, delay, ease }}
    >
      {children}
    </motion.span>
  </span>
);

export const GrowthHero = () => {
  const data = useSectionContent("GrowthHero");
  const logos = useCMSStore((s) => s.homeData?.TrustedBySection?.images) ?? [];
  const { products, caseStudies } = useWorkItems();
  const productWork = products.length ? products : caseStudies;
  const productScreens = productWork.map((p) => p.image);
  const productPreviews = productWork.map((p) => ({
    image: p.image,
    title: p.title,
    subtitle: p.category,
  }));

  // Headline drifts up as the hero scrolls away (transform only — compositor-cheap).
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section
      ref={sectionRef}
      data-sticky-cta-hero
      className="relative flex flex-col bg-[#0A0A0A] text-white overflow-hidden"
    >
      {/* Slowly drifting gold glow: a pre-blurred gradient moved with CSS transforms */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/2 w-[900px] h-[700px] rounded-full opacity-30 will-change-transform motion-reduce:animate-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(212,175,55,0.55), rgba(212,175,55,0) 70%)",
          animation: "float-glow 14s ease-in-out infinite",
        }}
      />

      {/* Editorial column guides */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden md:grid grid-cols-4 max-w-[1600px] mx-auto px-10"
      >
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="border-l border-white/[0.05] last:border-r" />
        ))}
      </div>

      {/* First screen: headline, CTA and proof card; the ticker sits just below the fold */}
      <div className="relative z-10 min-h-[100svh] lg:min-h-[600px] lg:h-[100svh] flex flex-col w-full max-w-[1600px] mx-auto px-5 md:px-10 pt-28 md:pt-32">
        <motion.h1
          style={{ y: headlineY }}
          className="mt-6 font-semibold tracking-[-0.045em] leading-[0.95] text-[12.5vw] sm:text-[10vw] lg:text-[length:min(7.6vw,13.5svh)] 2xl:text-[length:min(8.5rem,13.5svh)] will-change-transform"
        >
          <Line delay={0.15}>{data.headlineTop}</Line>
          <Line delay={0.25}>
            {data.headlineWords[0]}{" "}
            {/* Pills (and their word spaces) mount once CMS data arrives, then grow in */}
            {logos.length > 0 && (
              <>
                <RevealPill
                  variant="logos"
                  items={logos}
                  href="#work"
                  label="See the brands we've helped grow"
                  introDelay={1}
                  count="50+"
                />{" "}
              </>
            )}
            {data.headlineWords[1]}
            {productScreens.length > 0 && (
              <>
                {" "}
                <RevealPill
                  variant="screens"
                  items={productScreens}
                  href="/products"
                  label="See the products we've built"
                  introDelay={1.9}
                  products={productPreviews}
                />
              </>
            )}
          </Line>
          <Line delay={0.35}>
            <span className="text-white/35">{data.headlinePrefix}</span>{" "}
            <span className="font-serif italic font-normal text-[#D4AF37] tracking-[-0.02em]">
              {data.headlineHighlight}
            </span>{" "}
            {data.headlineSuffix}
          </Line>
        </motion.h1>

        <div className="mt-auto pt-12 lg:pt-8 pb-12 md:pb-16 grid lg:grid-cols-12 gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
            className="lg:col-span-6"
          >
            <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-md">
              {data.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
              <MagneticButton intensity={0.2}>
                <a
                  href={data.primaryButtonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#D4AF37] pl-5 pr-1.5 py-1.5 text-sm text-black font-semibold transition-shadow hover:shadow-[0_0_40px_rgba(212,175,55,0.45)]"
                >
                  {data.primaryButtonLabel}
                  <span className="w-9 h-9 rounded-full bg-black text-[#D4AF37] flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
                </a>
              </MagneticButton>
              <Link
                href={data.secondaryButtonUrl}
                className="group inline-flex items-center gap-2 text-white font-medium"
              >
                <span className="relative">
                  {data.secondaryButtonLabel}
                  <span className="absolute left-0 -bottom-1 h-px w-full bg-white/40 origin-left transition-transform duration-500 group-hover:scale-x-0" />
                </span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </Link>
            </div>
          </motion.div>

          {/* Proof card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease }}
            className="lg:col-span-4 lg:col-start-9 w-full max-w-sm lg:max-w-none lg:justify-self-end rounded-3xl border border-white/10 bg-[#141414] p-5"
          >
            {/* Client logos already live in the headline pill; the rating leads here */}
            <div className="flex items-center gap-4">
              <span className="text-5xl font-semibold tracking-[-0.04em] leading-none">
                {data.rating}
              </span>
              <div>
                <span className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </span>
                <p className="mt-1 text-sm text-white/50">{data.ratingLabel}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between gap-3 text-sm">
              <span className="text-white/80">{data.proofLine}</span>
              <span className="flex items-center gap-1.5 text-white/50 shrink-0">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                {data.responseLine}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Outlined services ticker */}
      <div className="relative z-10 mt-8 md:mt-16 border-y border-white/10 py-5 md:py-6 overflow-hidden">
        <div className="flex w-max animate-marquee-slow will-change-transform motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex items-center">
              {data.ticker.map((item) => (
                <span key={item} className="flex items-center">
                  <span className="text-outline text-4xl md:text-6xl font-semibold uppercase tracking-tight whitespace-nowrap px-6 md:px-8">
                    {item}
                  </span>
                  <span className="text-[#D4AF37] text-xl">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
