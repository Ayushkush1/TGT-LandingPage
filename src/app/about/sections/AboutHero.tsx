"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { aboutContent } from "@/content/about";
import { useCMSStore } from "@/store/useCMSStore";

/** Headline line sliding up from a mask (CSS, plays on first paint). */
const Line = ({ children, delay }: { children: ReactNode; delay: number }) => (
  <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
    <span className="hero-rise block" style={{ animationDelay: `${delay}s` }}>
      {children}
    </span>
  </span>
);

export const AboutHero = () => {
  const copy = aboutContent.hero;
  const image = useCMSStore((s) => s.aboutData?.AboutFirm?.images?.[0]);

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/3 w-[900px] h-[700px] rounded-full opacity-30"
        style={{ background: "radial-gradient(closest-side, rgba(212,175,55,0.5), rgba(212,175,55,0) 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden md:grid grid-cols-4 max-w-[1600px] mx-auto px-10"
      >
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="border-l border-white/[0.05] last:border-r" />
        ))}
      </div>

      {/* On laptops/desktops the hero fits exactly one screen (min 620px). */}
      <div className="relative max-w-[1600px] mx-auto px-5 md:px-10 pt-28 md:pt-32 pb-16 lg:pb-14 lg:h-[100svh] lg:min-h-[620px] grid lg:grid-cols-12 gap-12 lg:gap-10 items-end">
        <div className="lg:col-span-7">
          <p className="hero-fade text-[11px] uppercase tracking-[0.25em] text-white/50">{copy.label}</p>
          <h1 className="mt-6 text-[13vw] sm:text-[10vw] lg:text-[length:min(6.6vw,7.5rem,12.5svh)] font-semibold tracking-[-0.05em] leading-[0.95]">
            <Line delay={0.1}>{copy.headlineTop}</Line>
            <Line delay={0.2}>
              <span className="font-serif italic font-normal tracking-[-0.02em] text-[#D4AF37]">
                {copy.headlineHighlight}
              </span>
            </Line>
          </h1>
          <div className="hero-fade" style={{ animationDelay: "0.35s" }}>
            <p className="mt-6 lg:mt-7 text-base md:text-lg text-white/60 leading-relaxed max-w-xl">{copy.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
              <MagneticButton intensity={0.2}>
                <a
                  href={copy.primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#D4AF37] pl-5 pr-1.5 py-1.5 text-sm text-black font-semibold transition-shadow hover:shadow-[0_0_40px_rgba(212,175,55,0.45)]"
                >
                  {copy.primaryLabel}
                  <span className="w-9 h-9 rounded-full bg-black text-[#D4AF37] flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
                </a>
              </MagneticButton>
              <Link href={copy.secondaryUrl} className="group inline-flex items-center gap-2 font-medium">
                <span className="relative">
                  {copy.secondaryLabel}
                  <span className="absolute left-0 -bottom-1 h-px w-full bg-white/40 origin-left transition-transform duration-500 group-hover:scale-x-0" />
                </span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Studio image with meta chips */}
        <div className="hero-fade lg:col-span-5" style={{ animationDelay: "0.5s" }}>
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[min(62svh,640px)] rounded-[2rem] overflow-hidden bg-[#141414] ring-1 ring-white/10">
            {image && (
              <Image
                src={image}
                alt="The Gold Technologies team at work"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <ul className="absolute left-4 right-4 bottom-4 flex flex-wrap gap-2">
              {copy.meta.map((m) => (
                <li
                  key={m}
                  className="rounded-full bg-black/50 backdrop-blur-md border border-white/15 px-3.5 py-1.5 text-xs font-medium text-white/90"
                >
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
