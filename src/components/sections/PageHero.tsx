"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/ui/MagneticButton";

/** Default hero photo (the team at work), used unless a page passes its own image. */
const DEFAULT_IMAGE = { src: "/images/hero/team.webp", alt: "The Gold Technologies team at work" };

interface Cta {
  label: string;
  href: string;
}

/** Headline line sliding up from a mask (CSS, plays on first paint). */
const HeroLine = ({ children, delay, className }: { children: ReactNode; delay: number; className?: string }) => (
  <span className={cn("block overflow-hidden pb-[0.12em] -mb-[0.12em]", className)}>
    <span className="hero-rise block" style={{ animationDelay: `${delay}s` }}>
      {children}
    </span>
  </span>
);

/**
 * Inner-page hero, cinematic: the page image fills the screen behind a dark
 * grade, the headline sits bottom-left, and a details bar closes the frame.
 * The image settles on load and drifts as the hero scrolls away.
 * Fills the screen, growing taller rather than clipping on short screens.
 */
export const PageHero = ({
  label,
  number,
  top,
  highlight,
  description,
  primary,
  secondary,
  image = DEFAULT_IMAGE,
  facts = [],
  srPrefix,
  compact,
}: {
  label: ReactNode;
  /** Magazine-style page number, e.g. "03". */
  number?: string;
  top: string;
  highlight: string;
  description?: ReactNode;
  /** External links open in a new tab. */
  primary?: Cta;
  /** In-page anchor; shown with a down arrow. */
  secondary?: Cta;
  /** Defaults to the team photo; case studies and articles pass their own. */
  image?: { src: string; alt: string };
  /** Short facts listed in the details bar. */
  facts?: string[];
  /** Extra screen-reader text read before the headline, e.g. the service name. */
  srPrefix?: string;
  /** Smaller headline for long words, e.g. client names. */
  compact?: boolean;
}) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.5]);
  const external = primary && /^https?:/.test(primary.href);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#0A0A0A] text-white">
      {image && (
        <motion.div style={{ y }} className="absolute inset-0">
          <div className="hero-settle absolute inset-0">
            <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />
          </div>
        </motion.div>
      )}
      {/* Grade: dark at the top for the navbar, deep at the bottom for the copy */}
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.85)_0%,rgba(10,10,10,0.5)_28%,rgba(10,10,10,0.6)_55%,rgba(10,10,10,0.97)_100%)]" />
      <motion.div aria-hidden style={{ opacity: dim }} className="absolute inset-0 bg-black" />

      <div className="relative max-w-[1600px] mx-auto px-5 md:px-10 pt-24 md:pt-28 pb-8 md:pb-10 min-h-[100svh] flex flex-col">
        {/* Masthead */}
        <div className="hero-fade flex items-center justify-between gap-6 border-b border-white/15 pb-4 text-[11px] uppercase tracking-[0.25em] text-white/60">
          <div className="min-w-0">{label}</div>
          {number && <p className="shrink-0 font-serif italic normal-case tracking-normal text-lg text-[#D4AF37]">No. {number}</p>}
        </div>

        {/* Pushes the headline down; small minimum so short screens keep everything in view */}
        <div className="flex-1 min-h-[14svh] lg:min-h-[6svh]" />

        <h1
          className={cn(
            "font-semibold tracking-[-0.05em] [text-shadow:0_4px_50px_rgba(0,0,0,0.5)]",
            compact
              ? "text-[11vw] sm:text-[8.5vw] lg:text-[length:min(5.6vw,6.5rem,11svh)] leading-[0.98]"
              : "text-[15vw] sm:text-[11vw] lg:text-[length:min(7.8vw,9.5rem,14svh)] leading-[0.9]",
          )}
        >
          {srPrefix && <span className="sr-only">{srPrefix}: </span>}
          <HeroLine delay={0.15}>{top}</HeroLine>
          <HeroLine delay={0.27} className="pl-[0.5em] lg:pl-[1.2em]">
            <span className="font-serif italic font-normal tracking-[-0.02em] text-[#D4AF37]">{highlight}</span>
          </HeroLine>
        </h1>

        {/* Details bar */}
        <div
          className="hero-fade mt-6 lg:mt-[min(4svh,2rem)] pt-5 border-t border-white/15 grid lg:grid-cols-12 gap-6 items-end"
          style={{ animationDelay: "0.45s" }}
        >
          {description && (
            <div className="lg:col-span-5 text-base md:text-[17px] leading-relaxed max-w-lg text-white/60 lg:line-clamp-3">{description}</div>
          )}
          {facts.length > 0 && (
            <ul className="lg:col-span-3 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/60">
              {facts.map((f, i) => (
                <li key={f} className="flex items-baseline gap-2">
                  <span className="font-serif italic text-[#D4AF37]">{String(i + 1).padStart(2, "0")}</span>
                  {f}
                </li>
              ))}
            </ul>
          )}
          {(primary || secondary) && (
            <div className="lg:col-span-4 lg:col-start-9 lg:justify-self-end flex flex-wrap items-center gap-x-7 gap-y-4">
              {primary && (
                <MagneticButton intensity={0.2}>
                  <a
                    href={primary.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group inline-flex items-center gap-3 rounded-full bg-[#D4AF37] pl-5 pr-1.5 py-1.5 text-sm text-black font-semibold transition-shadow hover:shadow-[0_0_40px_rgba(212,175,55,0.45)]"
                  >
                    {primary.label}
                    <span className="w-9 h-9 rounded-full bg-black text-[#D4AF37] flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight className="w-5 h-5" />
                    </span>
                  </a>
                </MagneticButton>
              )}
              {secondary && (
                <Link href={secondary.href} className="group inline-flex items-center gap-2 text-sm font-medium">
                  <span className="relative">
                    {secondary.label}
                    <span className="absolute left-0 -bottom-1 h-px w-full bg-white/40 origin-left transition-transform duration-500 group-hover:scale-x-0" />
                  </span>
                  <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
