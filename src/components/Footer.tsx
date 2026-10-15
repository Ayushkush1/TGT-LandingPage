"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { RollText } from "@/components/ui/RollText";
import { HoverArrow } from "@/components/ui/HoverArrow";
import { useSectionContent } from "@/content/useSectionContent";
import { useCMSStore } from "@/store/useCMSStore";

// Official DMCA badge and status page for thegoldtechnologies.com.
const DMCA_ID = "174176c9-e0fd-4010-b0f5-50e6ed21d715";

/** Original "Women Owned" and DMCA badges, shown after the legal links. */
const TrustBadges = () => (
  <div className="flex items-center gap-3">
    <span className="inline-flex items-center h-9 rounded-md bg-white px-2.5" title="Women owned business">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/women-owned-logo.webp" alt="Women Owned business" width={61} height={28} loading="lazy" decoding="async" className="h-7 w-auto" />
    </span>
    <a
      href={`https://www.dmca.com/Protection/Status.aspx?ID=${DMCA_ID}`}
      target="_blank"
      rel="noopener noreferrer"
      title="DMCA.com Protection Status"
      className="inline-flex items-center h-9 rounded-md bg-white px-2.5"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://images.dmca.com/Badges/dmca_protected_sml_120c.png?ID=${DMCA_ID}`}
        alt="DMCA.com Protection Status"
        width={120}
        height={21}
        loading="lazy"
        decoding="async"
        className="h-[21px] w-auto"
      />
    </a>
  </div>
);

const OFFICE_TIME_ZONES = ["Asia/Kolkata", "Asia/Dubai"];

/** Letter of the giant wordmark that rises into place as the footer scrolls in. */
const WordmarkLetter = ({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) => {
  const start = 0.35 + (index / total) * 0.3;
  const y = useTransform(progress, [start, start + 0.35], ["105%", "0%"]);
  return (
    <motion.span
      style={{ y }}
      className="inline-block will-change-transform bg-gradient-to-b from-white to-white/10 bg-clip-text text-transparent"
    >
      {char === " " ? " " : char}
    </motion.span>
  );
};

function useOfficeTimes() {
  const [times, setTimes] = useState<string[]>([]);
  useEffect(() => {
    const update = () =>
      setTimes(
        OFFICE_TIME_ZONES.map((timeZone) =>
          new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone,
          }).format(new Date()),
        ),
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);
  return times;
}

export const Footer = () => {
  const data = useCMSStore((state) => state.homeData?.FooterCMS);
  const copy = useSectionContent("GrowthFooter");
  const times = useOfficeTimes();

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });
  // The card rises and settles as it scrolls in; the badge turns with scroll.
  const cardY = useTransform(scrollYProgress, [0, 0.6], [120, 0]);
  const badgeRotate = useTransform(scrollYProgress, [0, 1], [-90, 90]);

  // Company name split as written in the CMS: "THE" · "GOLD TECH" · "NOLOGIES".
  const wordmarkLeft = (data?.leftText || copy.wordmarkLeft).trim();
  const wordmark = (data?.centerText || copy.wordmark).trim();
  const wordmarkRight = (data?.rightText || copy.wordmarkRight).trim();
  const fullName = `${wordmarkLeft} ${wordmark}${wordmarkRight}`;
  const labelOpacity = useTransform(scrollYProgress, [0.65, 0.95], [0, 1]);
  const labelY = useTransform(scrollYProgress, [0.65, 0.95], [20, 0]);
  const offices = [
    { country: data?.loc1Country, address: data?.loc1Address, time: times[0] },
    { country: data?.loc2Country, address: data?.loc2Address, time: times[1] },
  ].filter((o) => o.country);
  const pillars = useSectionContent("ServicePillars").pillars;
  const socials = [
    { Icon: Linkedin, url: data?.linkedinUrl, label: "LinkedIn" },
    { Icon: Instagram, url: data?.instagramUrl, label: "Instagram" },
    { Icon: Twitter, url: data?.twitterUrl, label: "X" },
    { Icon: Facebook, url: data?.facebookUrl, label: "Facebook" },
  ].filter((s) => s.url);

  return (
    <footer ref={containerRef} data-hide-sticky-cta className="relative px-2 md:px-4 pt-10 pb-2 md:pb-4 z-0 overflow-hidden">
      <motion.div
        style={{ y: cardY }}
        className="relative overflow-hidden rounded-[2.5rem] md:rounded-[4rem] bg-[#0A0A0A] text-white px-6 md:px-14 pt-12 md:pt-16 pb-6 will-change-transform"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full opacity-25 bg-[radial-gradient(closest-side,#D4AF37,transparent)]"
        />

        {/* Closing call to action */}
        <div className="relative grid lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            {/* Brand */}
            <Link href="/" className="inline-flex items-center gap-3" aria-label="The Gold Technologies home page">
              <Image
                src="/logo.jpeg"
                alt=""
                width={44}
                height={44}
                className="w-10 h-10 md:w-11 md:h-11 rounded-full ring-1 ring-[#D4AF37]/40"
              />
              <span className="text-xl md:text-2xl font-semibold tracking-[-0.02em] leading-none">
                The Gold Technologies
              </span>
            </Link>
            {/* Contact: three matching columns (email/phone, India, UAE) */}
            <div className="mt-8 grid sm:grid-cols-3 gap-8 md:gap-10 max-w-6xl">
              <div>
                <p className="h-4 flex items-center text-[11px] uppercase tracking-[0.25em] text-white/40">Email us</p>
                {data?.emailAddress && (
                  <a
                    href={`mailto:${data.emailAddress}`}
                    className="group mt-3 inline-flex items-center gap-1.5 text-[15px] text-white/80 hover:text-white break-all"
                  >
                    <span className="border-b border-transparent group-hover:border-[#D4AF37]">{data.emailAddress}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0 text-[#D4AF37] transition-transform duration-500 group-hover:rotate-45" />
                  </a>
                )}
                {data?.phoneNumber && (
                  <a
                    href={`tel:${data.phoneNumber.replace(/\s+/g, "")}`}
                    className="mt-1.5 block text-[15px] text-white/55 hover:text-white transition-colors"
                  >
                    {data.phoneNumber.trim()}
                  </a>
                )}
              </div>
              {offices.map((office) => (
                <div key={office.country}>
                  <p className="h-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-white/40">
                    {office.country}
                    {office.time && (
                      <span className="flex items-center gap-1.5 tracking-normal text-white/70 tabular-nums">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {office.time}
                      </span>
                    )}
                  </p>
                  <p className="mt-3 text-[15px] text-white/55 leading-relaxed">
                    {office.address?.replace(/\n/g, ", ").replace(/\s+[-–—]\s+/g, ", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Rotating booking badge */}
          <div className="lg:col-span-4 flex lg:justify-end">
            <MagneticButton intensity={0.3}>
              <a
                href={copy.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={copy.ctaLabel}
                className="group relative block w-36 h-36 md:w-44 md:h-44"
              >
                <motion.svg
                  aria-hidden
                  viewBox="0 0 200 200"
                  style={{ rotate: badgeRotate }}
                  className="absolute inset-0 w-full h-full will-change-transform"
                >
                  <defs>
                    <path id="footer-badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                  </defs>
                  <text className="fill-white/70 text-[15px] uppercase tracking-[0.3em]">
                    <textPath href="#footer-badge-circle">
                      {`${copy.ctaLabel} • ${copy.ctaLabel} • `}
                    </textPath>
                  </text>
                </motion.svg>
                <span className="absolute inset-[26%] rounded-full bg-[#D4AF37] text-black flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <ArrowUpRight className="w-7 h-7 transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* Links, grouped like the service categories above */}
        <div className="relative mt-14 md:mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-10">
          {pillars.map((pillar) => (
            <div key={pillar.id}>
              <p className="h-5 flex items-end gap-2 text-[11px] uppercase tracking-[0.25em] text-white/40">
                <span className="font-serif italic normal-case tracking-normal text-sm leading-none text-[#D4AF37]">{pillar.number}</span>
                {pillar.name}
              </p>
              <ul className="mt-3 text-sm">
                {pillar.services.map((service) => (
                  <li key={service.name}>
                    <Link href={service.href} className="group/roll inline-flex items-center gap-1.5 py-[5px] text-white/70">
                      <RollText>{service.name}</RollText>
                      <HoverArrow />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="h-5 flex items-end text-[11px] uppercase tracking-[0.25em] text-white/40">Company</p>
            <ul className="mt-3 text-sm">
              {copy.companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group/roll inline-flex items-center gap-1.5 py-[5px] text-white/70">
                    <RollText>{link.label}</RollText>
                    <HoverArrow />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="h-5 flex items-end text-[11px] uppercase tracking-[0.25em] text-white/40">Connect</p>
            <ul className="mt-3 text-sm">
              {socials.map(({ url, label }) => (
                <li key={label}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="group/roll inline-flex items-center gap-1.5 py-[5px] text-white/70">
                    <RollText>{label}</RollText>
                    <HoverArrow />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Giant wordmark: "GOLD TECH" rises letter by letter, flanked by THE / NOLOGIES */}
        <div
          role="img"
          aria-label={fullName}
          className="relative mt-10 md:mt-14 flex flex-col md:flex-row md:items-stretch md:justify-center gap-2 md:gap-[1.2vw] select-none uppercase"
        >
          <motion.span
            aria-hidden
            style={{ opacity: labelOpacity, y: labelY }}
            className="self-start md:mt-[1.2vw] text-[clamp(11px,1.5vw,22px)] font-bold tracking-[0.5em] text-white/40"
          >
            {wordmarkLeft}
          </motion.span>
          <p
            aria-hidden
            className="overflow-hidden whitespace-nowrap text-[14vw] md:text-[12.5vw] font-semibold tracking-[-0.07em] leading-[0.82] pb-[0.04em]"
          >
            {Array.from(wordmark).map((char, i, all) => (
              <WordmarkLetter
                key={i}
                char={char}
                index={i}
                total={all.length}
                progress={scrollYProgress}
              />
            ))}
          </p>
          <motion.span
            aria-hidden
            style={{ opacity: labelOpacity, y: labelY }}
            className="self-end md:mb-[1.4vw] text-[clamp(11px,1.5vw,22px)] font-bold tracking-[0.5em] text-[#D4AF37]/80"
          >
            {wordmarkRight}
          </motion.span>
        </div>

        {/* Bottom bar */}
        <div className="relative mt-8 flex flex-col md:flex-row items-center justify-between gap-5 text-sm text-white/50">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span>© {new Date().getFullYear()} The Gold Technologies</span>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <TrustBadges />
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] hover:text-white transition-colors"
          >
            Back to top
            <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center transition-transform group-hover:-translate-y-1">
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </motion.div>
    </footer>
  );
};
