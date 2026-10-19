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

type IconProps = { className?: string };

/** Line icon of the Taj Mahal, for the India office. */
const TajMahalIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
    <path d="M2 21h20" />
    <path d="M6 21v-6h12v6" />
    <path d="M10.5 21v-2.6a1.5 1.5 0 0 1 3 0V21" />
    <path d="M7.6 15c0-2.9 2-4.6 4.4-6 2.4 1.4 4.4 3.1 4.4 6" />
    <path d="M12 9V6.2" />
    <circle cx="12" cy="5.6" r="0.5" fill="currentColor" />
    <path d="M3.5 21v-9.5M20.5 21v-9.5" />
    <path d="M2.9 11.5h1.2M19.9 11.5h1.2" />
    <path d="M3.5 11.5V10M20.5 11.5V10" />
  </svg>
);

/** Line icon of the Burj Khalifa, for the UAE office. */
const BurjKhalifaIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
    <path d="M5 21h14" />
    <path d="M12 1.5v3.5" />
    <path d="M10.6 21l.6-12 .5-4h.6l.5 4 .6 12" />
    <path d="M9.2 21l.4-7.5h1.5M14.8 21l-.4-7.5h-1.5" />
    <path d="M7.6 21l.4-4.5h1.4M16.4 21l-.4-4.5h-1.4" />
  </svg>
);

/** X (formerly Twitter) logo. */
const XIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.6l5.24 6.93zm-1.29 19.5h2.04L6.49 3.24H4.3z" />
  </svg>
);

/** Short footer labels so every link fits on one line in its column. */
const SHORT_SERVICE_LABELS: Record<string, string> = {
  "Website Design & Development": "Websites",
  "Mobile App Development": "Mobile Apps",
  "Custom Software Development": "Custom Software",
  "Business Software Solutions": "Business Software",
  "Search & Content Marketing": "SEO & Content",
  "Social & Performance Marketing": "Social & Paid Ads",
  "Business Intelligence": "BI & Analytics",
  "Branding & Identity": "Branding",
  "AI & ML Solutions": "AI & ML",
};

const FOOTER_PRODUCT_COUNT = 5;
const SHORT_PRODUCT_LABELS: Record<string, string> = {
  "Quick Commerce App": "Quick Commerce",
  "Office Book App": "Office Book",
};
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
  // A few featured products (not the whole catalogue)
  const products = (useCMSStore((state) => state.productData?.main?.products) ?? [])
    .filter((p) => p.title && p.link)
    .slice(0, FOOTER_PRODUCT_COUNT);
  const socials = [
    { Icon: Linkedin, url: data?.linkedinUrl, label: "LinkedIn" },
    { Icon: Instagram, url: data?.instagramUrl, label: "Instagram" },
    { Icon: XIcon, url: data?.twitterUrl, label: "X" },
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

        {/* First line: brand (with socials), email, offices, booking badge */}
        <div className="relative grid md:grid-cols-2 xl:grid-cols-[auto_auto_minmax(0,1fr)_minmax(0,1.3fr)_auto] gap-x-10 gap-y-10 items-start">
          <div>
            <Link href="/" className="inline-flex items-center gap-3" aria-label="The Gold Technologies home page">
              <Image
                src="/logo.jpeg"
                alt=""
                width={44}
                height={44}
                className="w-10 h-10 md:w-11 md:h-11 rounded-full ring-1 ring-[#D4AF37]/40"
              />
              <span className="text-xl md:text-2xl font-semibold tracking-[-0.02em] leading-none whitespace-nowrap">The Gold Technologies</span>
            </Link>
            {socials.length > 0 && (
              <ul className="mt-6 flex gap-2.5">
                {socials.map(({ Icon, url, label }) => (
                  <li key={label}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 rounded-full border border-white/15 text-white/70 flex items-center justify-center transition-colors duration-300 hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <p className="h-5 flex items-center text-[11px] uppercase tracking-[0.25em] text-white/40">Email us</p>
            {data?.emailAddress && (
              <a
                href={`mailto:${data.emailAddress}`}
                className="group mt-2 inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white break-all xl:break-normal xl:whitespace-nowrap"
              >
                <span className="border-b border-transparent group-hover:border-[#D4AF37]">{data.emailAddress}</span>
                <ArrowUpRight className="w-4 h-4 shrink-0 text-[#D4AF37] transition-transform duration-500 group-hover:rotate-45" />
              </a>
            )}
            {data?.phoneNumber && (
              <a href={`tel:${data.phoneNumber.replace(/\s+/g, "")}`} className="mt-1.5 block text-sm text-white/55 hover:text-white transition-colors">
                {data.phoneNumber.trim()}
              </a>
            )}
          </div>

          {offices.map((office, i) => {
            const Landmark = i === 0 ? TajMahalIcon : BurjKhalifaIcon;
            return (
              <div key={office.country}>
                <p className="h-5 flex items-center gap-2.5 text-[11px] uppercase tracking-[0.25em] text-white/40">
                  <Landmark className="w-5 h-5 text-[#D4AF37]" />
                  {office.country}
                  {office.time && (
                    <span className="flex items-center gap-1.5 tracking-normal text-white/70 tabular-nums">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {office.time}
                    </span>
                  )}
                </p>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">
                  {office.address?.replace(/\n/g, ", ").replace(/\s+[-–—]\s+/g, ", ")}
                </p>
              </div>
            );
          })}

          <MagneticButton intensity={0.3} className="hidden xl:block justify-self-end -mt-4">
            <a href={copy.ctaUrl} target="_blank" rel="noopener noreferrer" aria-label={copy.ctaLabel} className="group relative block w-28 h-28 md:w-32 md:h-32">
              <motion.svg aria-hidden viewBox="0 0 200 200" style={{ rotate: badgeRotate }} className="absolute inset-0 w-full h-full will-change-transform">
                <defs>
                  <path id="footer-badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                </defs>
                <text className="fill-white/70 text-[15px] uppercase tracking-[0.3em]">
                  <textPath href="#footer-badge-circle">{`${copy.ctaLabel} • ${copy.ctaLabel} • `}</textPath>
                </text>
              </motion.svg>
              <span className="absolute inset-[26%] rounded-full bg-[#D4AF37] text-black flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <ArrowUpRight className="w-7 h-7 transition-transform duration-500 group-hover:rotate-45" />
              </span>
            </a>
          </MagneticButton>
        </div>

        {/* Links: the four service stages side by side, then products and company */}
        <div className="relative mt-12 md:mt-14 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-10">
          <div className="col-span-2 md:col-span-4">
            <p className="h-5 flex items-end text-[11px] uppercase tracking-[0.25em] text-white/40">Services</p>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6">
              {pillars.map((pillar) => (
                <div key={pillar.id}>
                  <p className="flex items-baseline gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
                    <span className="font-serif italic normal-case tracking-normal text-sm font-normal text-[#D4AF37]">{pillar.number}</span>
                    {pillar.name}
                  </p>
                  <ul className="mt-1.5 text-sm">
                    {pillar.services.map((service) => (
                      <li key={service.name}>
                        <Link href={service.href} className="group/roll inline-flex items-center gap-1.5 py-[5px] text-white/70 whitespace-nowrap">
                          <RollText>{SHORT_SERVICE_LABELS[service.name] ?? service.name}</RollText>
                          <HoverArrow />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="h-5 flex items-end text-[11px] uppercase tracking-[0.25em] text-white/40">Products</p>
            <ul className="mt-3 text-sm">
              {products.map((product) => (
                <li key={product.title}>
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/roll inline-flex items-center gap-1.5 py-[5px] text-white/70 whitespace-nowrap"
                  >
                    <RollText>{SHORT_PRODUCT_LABELS[product.title.trim()] ?? product.title.trim()}</RollText>
                    <HoverArrow />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="h-5 flex items-end text-[11px] uppercase tracking-[0.25em] text-white/40">Company</p>
            <ul className="mt-3 text-sm">
              {copy.companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group/roll inline-flex items-center gap-1.5 py-[5px] text-white/70 whitespace-nowrap">
                    <RollText>{link.label}</RollText>
                    <HoverArrow />
                  </Link>
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
