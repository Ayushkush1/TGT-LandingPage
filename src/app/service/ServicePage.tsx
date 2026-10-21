"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Accessibility, AppWindow, ArrowUpRight, BarChart3, Bot, Boxes, Brain, Bug, Building2, Cable, Cloud, Code2, Compass, Cpu,
  Database, FileText, Images, Layers, LayoutTemplate, Lightbulb, LineChart, Mail, MailCheck, Megaphone, MessageCircle,
  MessageSquareQuote, Mic, Monitor, MousePointerClick, Package, Palette, PenLine, PenTool, PieChart, Plus, Repeat, Search,
  Settings2, Share2, ShieldCheck, ShoppingBag, Smartphone, Sparkles, TrendingUp, UserRound, Users, Video, Wallet, Workflow,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/sections/PageHero";
import { RollText } from "@/components/ui/RollText";
import { HoverArrow } from "@/components/ui/HoverArrow";
import { servicePillars } from "@/content/growth";
import { serviceExtras, servicePage, type ServiceExtra, type ServiceSlug } from "@/content/services";
import { clientLogos } from "@/content/clients";
import { techLogo } from "@/content/tech";

const ease = [0.22, 1, 0.36, 1] as const;

type CmsItem = {
  number?: string;
  title: string;
  category?: string;
  description?: string;
  tags?: string[];
  outcome?: string;
};

interface CmsService {
  hero?: {
    paragraphs?: string[];
    pillars?: { number?: string; title: string; desc: string }[];
    imageUrl?: string;
    headingLine1?: string;
  };
  services?: CmsItem[];
}

const clean = (t = "") => t.replace(/\s*[—–]\s*/g, ", ").trim();
const pad = (n: number) => String(n).padStart(2, "0");

const Label = ({ children, dark }: { children: ReactNode; dark?: boolean }) => (
  <p className={cn("text-[11px] uppercase tracking-[0.25em]", dark ? "text-white/50" : "text-[#0B0F29]/65")}>{children}</p>
);

/* ── 1. Hero ─────────────────────────────────────────────────────────── */
/** Shared page hero (default team photo) with the service's facts. */
const Hero = ({ extra, intro, items }: { extra: ServiceExtra; intro?: string; items: CmsItem[] }) => {
  const pillar = servicePillars.pillars.find((p) => p.id === extra.pillar);
  const metric = extra.proof?.find((p) => p.metrics?.length)?.metrics?.[0];
  const chips = [
    pillar && `${pillar.number} ${pillar.name}`,
    metric && `${metric.value} ${metric.label.toLowerCase()}`,
    items.length > 0 && `${items.length} capabilities`,
  ].filter(Boolean) as string[];

  return (
    <PageHero
      label={
        <p className="flex items-center gap-3">
          <Link href="/#services" className="hover:text-[#D4AF37] transition-colors">(Services)</Link>
          <span className="w-6 h-px bg-white/20" />
          <span className="text-[#D4AF37]">{extra.name}</span>
        </p>
      }
      srPrefix={extra.name}
      top={extra.promise[0]}
      highlight={extra.promise[1]}
      description={intro ? clean(intro) : undefined}
      primary={{ label: servicePage.bookingLabel, href: servicePage.bookingUrl }}
      secondary={{ label: servicePage.secondaryLabel, href: "#deliver" }}
      number={pillar?.number}
      facts={chips}
    />
  );
};

/* ── 2. Approach ─────────────────────────────────────────────────────── */
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

/** Gold-italic accent on the last word of each sentence, like the About story. */
const isSentenceEnd = (word: string) => /[.!?]$/.test(word);

const Approach = ({ text, points }: { text?: string; points: { title: string; desc: string }[] }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  if (!text && points.length === 0) return null;
  const words = clean(text).split(" ");

  return (
    <section className="bg-[#F4F1EA] text-[#0B0F29] px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3">
          <Label>{servicePage.approachLabel}</Label>
        </div>
        <div className="lg:col-span-9">
          {text && (
            <p ref={ref} className="flex flex-wrap text-[7.5vw] sm:text-[2.6rem] lg:text-[3.4rem] leading-[1.1] tracking-[-0.035em] font-medium">
              {words.map((w, i) => (
                <Word
                  key={i}
                  word={w}
                  progress={scrollYProgress}
                  range={[i / words.length, (i + 1) / words.length]}
                  highlight={isSentenceEnd(w)}
                />
              ))}
            </p>
          )}
        </div>
      </div>
      {points.length > 0 && (
        <ol className="max-w-[1600px] mx-auto mt-14 md:mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {points.map((p, i) => (
            <motion.li
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-[1.5rem] border border-[#0B0F29]/10 bg-white/50 p-6 md:p-7 min-h-[240px] flex flex-col transition-colors duration-500 hover:bg-[#0B0F29] hover:text-white"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -right-16 -bottom-16 w-56 h-56 rounded-full bg-[radial-gradient(closest-side,rgba(212,175,55,0.35),transparent)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              />
              <div className="relative flex items-start justify-between">
                <span className="font-serif italic text-4xl text-[#B8932A] transition-colors duration-500 group-hover:text-[#D4AF37]">{pad(i + 1)}</span>
                <span className="w-8 h-8 rounded-full border border-current/20 flex items-center justify-center opacity-40 transition-all duration-500 group-hover:opacity-100 group-hover:rotate-45 group-hover:border-[#D4AF37] group-hover:text-[#D4AF37]">
                  <Plus className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="relative mt-12">
                <p className="text-xl font-semibold tracking-[-0.02em]">{p.title.trim()}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#0B0F29]/60 transition-colors duration-500 group-hover:text-white/65">{clean(p.desc)}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      )}
    </section>
  );
};

/* ── 3. What we deliver: list on the right, pinned detail card on the left ── */
/** An icon for a CMS category such as "Development · Solutions", picked by keyword. */
const categoryIcons: [RegExp, LucideIcon][] = [
  [/secur|defen|integrity|complian|legal|audit/i, ShieldCheck],
  [/\bai\b|machine|algorithm|llm|linguistic|neural/i, Brain],
  [/cloud|infrastructure|ci\/cd/i, Cloud],
  [/data|analytic|metric|kpi|insight/i, BarChart3],
  [/mobile|apple|google ecosystem|hybrid/i, Smartphone],
  [/commerce|retail|paid|conversion|b2c/i, ShoppingBag],
  [/search|organic|inbound/i, Search],
  [/brand|aesthetic|visual|design|layout|interface|print/i, Palette],
  [/content|copy|subtitle/i, PenLine],
  [/support|engagement|retention|conversational/i, MessageCircle],
  [/automation|operations|manufactur|maintenance|management|logistic|hr\b/i, Settings2],
  [/connectivity|hardware|physical|home/i, Cpu],
  [/develop|refactor|evolution|code/i, Code2],
  [/strategy|planning|research|launch|corporate/i, Compass],
];
const categoryIcon = (category?: string) => categoryIcons.find(([re]) => re.test(category ?? ""))?.[1] ?? Sparkles;

/** The item's tech logos when its tags name tools we have logos for, otherwise an icon for its category. */
const DetailVisual = ({ item }: { item: CmsItem }) => {
  const logos = (item.tags ?? []).map(techLogo).filter((src): src is string => !!src);
  const unique = Array.from(new Set(logos)).slice(0, 4);
  if (unique.length > 0)
    return (
      <ul className="flex -space-x-2.5">
        {unique.map((src) => (
          <li key={src} className="flex w-14 h-14 items-center justify-center rounded-full bg-[#141a45] ring-1 ring-white/15 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.8)]">
            <Image src={src} alt="" width={26} height={26} unoptimized className="w-[26px] h-[26px]" />
          </li>
        ))}
      </ul>
    );
  const Icon = categoryIcon(item.category);
  return (
    <span className="flex w-16 h-16 items-center justify-center rounded-2xl bg-[#D4AF37]/10 ring-1 ring-[#D4AF37]/30 text-[#D4AF37]">
      <Icon className="w-7 h-7" strokeWidth={1.5} />
    </span>
  );
};

const Detail = ({ item, index, total, compact }: { item: CmsItem; index: number; total: number; compact?: boolean }) => (
  <>
    {!compact && (
    <div className="flex items-start justify-between gap-6">
      <span className="text-[7rem] xl:text-[9rem] leading-[0.8] font-semibold tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_#D4AF37]">
        {pad(index + 1)}
      </span>
      <div className="flex flex-col items-end gap-5">
        <span className="text-xs text-white/40 tabular-nums">
          {pad(index + 1)} / {pad(total)}
        </span>
        <DetailVisual item={item} />
      </div>
    </div>
    )}
    <p className={cn("text-[11px] uppercase tracking-[0.25em] text-[#D4AF37]", !compact && "mt-8")}>{clean(item.category)}</p>
    {!compact && <p className="mt-2 text-3xl font-semibold tracking-[-0.03em] leading-tight">{item.title}</p>}
    <p className={cn("text-white/65 leading-relaxed", compact ? "mt-3" : "mt-4")}>{clean(item.description)}</p>
    {item.tags && item.tags.length > 0 && (
      <ul className="mt-5 flex flex-wrap gap-2">
        {item.tags.map((tag) => {
          const logo = techLogo(tag);
          return (
            <li
              key={tag}
              className={cn(
                "flex items-center gap-1.5 rounded-full border border-white/15 py-1 pr-3 text-[11px] uppercase tracking-[0.15em] text-white/70",
                logo ? "pl-2" : "pl-3",
              )}
            >
              {logo && <Image src={logo} alt="" width={14} height={14} unoptimized className="w-3.5 h-3.5" />}
              {tag}
            </li>
          );
        })}
      </ul>
    )}
    {item.outcome && (
      <div className="mt-7 pt-6 border-t border-white/10">
        <p className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37]">The outcome</p>
        <p className="mt-3 font-serif italic text-lg md:text-xl leading-snug tracking-[-0.01em] text-white/90">{clean(item.outcome)}</p>
      </div>
    )}
  </>
);

const Deliver = ({ items }: { items: CmsItem[] }) => {
  const [active, setActive] = useState(0);
  if (items.length === 0) return null;
  const current = items[active] ?? items[0];

  return (
    <section id="deliver" className="bg-[#0A0A0A] text-white px-5 md:px-10 py-16 md:py-24 scroll-mt-20">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-3">
            <Label dark>{servicePage.deliverLabel}</Label>
          </div>
          <h2 className="lg:col-span-9 text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.045em] leading-[0.95]">
            {servicePage.deliverHeadline[0]}{" "}
            <span className="font-serif italic font-normal text-[#D4AF37]">{servicePage.deliverHeadline[1]}</span>
          </h2>
        </div>

        <div className="mt-12 md:mt-16 grid lg:grid-cols-12 gap-10 xl:gap-16 items-start">
          {/* Pinned detail card (desktop) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#11163a] to-[#0B0F29] ring-1 ring-white/10 p-9 xl:p-10 min-h-[560px]">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[radial-gradient(closest-side,rgba(212,175,55,0.3),transparent)]"
              />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease }}
                  className="relative"
                >
                  <Detail item={current} index={active} total={items.length} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Index */}
          <ul className="lg:col-span-7 border-b border-white/10">
            {items.map((item, i) => {
              const isActive = active === i;
              return (
                <li key={item.title} className="relative border-t border-white/10">
                  {isActive && (
                    <motion.span layoutId="deliver-bar" className="absolute left-0 -top-px h-px w-full bg-[#D4AF37]" transition={{ duration: 0.5, ease }} />
                  )}
                  <button
                    onMouseEnter={() => window.matchMedia("(min-width: 1024px)").matches && setActive(i)}
                    onClick={() => setActive(isActive && !window.matchMedia("(min-width: 1024px)").matches ? -1 : i)}
                    aria-expanded={isActive}
                    className="group w-full flex items-center gap-5 md:gap-8 py-6 md:py-8 text-left"
                  >
                    <span className={cn("font-serif italic text-lg md:text-xl w-8 shrink-0 transition-colors", isActive ? "text-[#D4AF37]" : "text-white/30")}>
                      {pad(i + 1)}
                    </span>
                    <span
                      className={cn(
                        "flex-1 text-2xl md:text-4xl font-semibold tracking-[-0.035em] leading-tight transition-all duration-500",
                        isActive ? "text-white lg:translate-x-2" : "text-white/35 group-hover:text-white/70",
                      )}
                    >
                      {item.title}
                    </span>
                    <span
                      className={cn(
                        "w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full border flex items-center justify-center transition-all duration-500",
                        isActive ? "bg-[#D4AF37] border-[#D4AF37] text-black rotate-45 lg:rotate-0" : "border-white/15 text-white/50",
                      )}
                    >
                      <ArrowUpRight className="w-4 h-4 hidden lg:block" />
                      <Plus className="w-4 h-4 lg:hidden" />
                    </span>
                  </button>
                  {/* Inline detail (mobile / tablet) */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease }}
                        className="overflow-hidden lg:hidden"
                      >
                        <div className="pb-8 pl-[3.25rem] md:pl-16">
                          <Detail item={item} index={i} total={items.length} compact />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

/* ── 4. Proof ────────────────────────────────────────────────────────── */
/**
 * A client's logo straight on the page: muted to the palette, in full colour on hover.
 * Height follows the logo's shape so square marks and wide wordmarks carry similar weight.
 * Clients without a logo yet show their name instead.
 */
const ClientMark = ({ name }: { name: string }) => {
  const logo = clientLogos[name];
  if (!logo) return <span className="whitespace-nowrap text-3xl md:text-5xl font-semibold tracking-[-0.04em] text-[#0B0F29]/55">{name}</span>;
  const height = Math.round(Math.min(76, Math.max(32, 52 * Math.sqrt(2.5 / (logo.width / logo.height)))));
  return (
    <Image
      src={logo.src}
      alt={name}
      width={logo.width}
      height={logo.height}
      style={{ "--h": `${height}px` } as CSSProperties}
      className={cn(
        "h-[calc(var(--h)*0.7)] md:h-[var(--h)] w-auto max-w-none object-contain transition-[filter,opacity] duration-500",
        logo.dark ? "invert grayscale opacity-80 hover:opacity-100" : "grayscale opacity-75 hover:grayscale-0 hover:opacity-100",
      )}
    />
  );
};

const Proof = ({ extra }: { extra: ServiceExtra }) => {
  const proof = extra.proof ?? [];
  const work = extra.work ?? [];
  const hasLogos = work.some((w) => clientLogos[w]);
  // No case results yet: lead with global reach instead of an empty "results" block.
  const hasResults = proof.length > 0 || work.length > 0;
  const headline = hasResults ? servicePage.proofHeadline : servicePage.reachHeadline;
  const marquee = work.length >= 4 ? [...work, ...work] : [];

  return (
    <section className="bg-[#F4F1EA] text-[#0B0F29] py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-3">
            <Label>{servicePage.proofLabel}</Label>
          </div>
          <h2 className="lg:col-span-9 text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.045em] leading-[0.95]">
            {headline[0]}{" "}
            <span className="font-serif italic font-normal text-[#B8932A]">{headline[1]}</span>
          </h2>
        </div>

        {proof.length > 0 && (
          <ul className={cn("mt-12 md:mt-16 grid gap-4", proof.length === 2 ? "md:grid-cols-2" : proof.length >= 3 && "md:grid-cols-3")}>
            {proof.map((p, i) => {
              const hasMetrics = !!p.metrics?.length;
              const wide = proof.length === 1 && hasMetrics;
              return (
                <motion.li
                  key={p.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease, delay: i * 0.08 }}
                  className={cn(
                    "group relative overflow-hidden rounded-[2rem] bg-[#0B0F29] text-white p-7 md:p-10 flex flex-col justify-between gap-10",
                    hasMetrics ? "min-h-[280px]" : "min-h-[220px]",
                    wide && "lg:grid lg:grid-cols-12 lg:items-end lg:min-h-[300px]",
                  )}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[radial-gradient(closest-side,rgba(212,175,55,0.28),transparent)] opacity-60 transition-opacity duration-700 group-hover:opacity-100"
                  />
                  <div className={cn("relative", wide && "lg:col-span-5 lg:self-stretch lg:flex lg:flex-col lg:justify-between")}>
                    <span className="font-serif italic text-[#D4AF37] text-lg">Case {pad(i + 1)}</span>
                    <div className={cn(wide ? "mt-10" : "mt-6")}>
                      <p className="text-2xl md:text-3xl font-semibold tracking-[-0.03em]">{p.title}</p>
                      <p className="mt-3 text-white/60 leading-relaxed max-w-md">{p.text}</p>
                    </div>
                  </div>
                  {!hasMetrics && (
                    <Link href="/portfolio" className="group/roll relative inline-flex items-center gap-2 self-start text-sm font-medium text-white/80">
                      <RollText>See our work</RollText>
                      <HoverArrow className="text-[#D4AF37] [&>svg]:w-4 [&>svg]:h-4" />
                    </Link>
                  )}
                  {p.metrics && p.metrics.length > 0 && (
                    <dl className={cn("relative grid gap-6", wide ? "lg:col-span-7 sm:flex sm:flex-wrap sm:gap-x-16 lg:pl-12 lg:border-l lg:border-white/10" : "grid-cols-2")}>
                      {p.metrics.map((m, k) => (
                        <div key={m.label} className="overflow-hidden">
                          <dt className="sr-only">{m.label}</dt>
                          <motion.dd
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease, delay: 0.2 + k * 0.1 }}
                            className={cn(
                              "font-semibold tracking-[-0.05em] leading-none text-[#D4AF37] whitespace-nowrap",
                              wide ? "text-6xl md:text-7xl xl:text-8xl" : "text-5xl md:text-6xl",
                            )}
                          >
                            {m.value}
                          </motion.dd>
                          <dd className="mt-3 text-xs uppercase tracking-[0.15em] text-white/55">{m.label}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </motion.li>
              );
            })}
          </ul>
        )}
        {work.length > 0 && <p className="mt-14 md:mt-20 text-[11px] uppercase tracking-[0.25em] text-[#0B0F29]/65">{servicePage.workLabel}</p>}
      </div>

      {/* Clients: logo marquee when we have their logos, otherwise big editorial names (or a static row when there are few) */}
      {work.length > 0 &&
        (hasLogos ? (
          <div className="mt-8 md:mt-10 flex w-max animate-marquee-slow hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[0, 1].map((k) => (
              <ul key={k} aria-hidden={k === 1} className="flex shrink-0 items-center">
                {(work.length >= 4 ? work : [...work, ...work, ...work]).map((w, i) => (
                  <li key={i} className="flex shrink-0 items-center gap-10 md:gap-16 pr-10 md:pr-16">
                    <ClientMark name={w} />
                    <span aria-hidden className="text-lg text-[#0B0F29]/20">✦</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ) : marquee.length > 0 ? (
          <div className="mt-6 flex w-max animate-marquee-slow hover:[animation-play-state:paused]">
            {[0, 1].map((k) => (
              <ul key={k} aria-hidden={k === 1} className="flex shrink-0 items-center">
                {marquee.map((w, i) => (
                  <li key={i} className="flex items-center gap-8 md:gap-12 pr-8 md:pr-12 whitespace-nowrap text-4xl md:text-6xl tracking-[-0.04em]">
                    <span className={i % 2 ? "font-serif italic text-[#B8932A]" : "font-semibold"}>{w}</span>
                    <span aria-hidden className="text-xl text-[#0B0F29]/25">✦</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ) : (
          <ul className="max-w-[1600px] mx-auto px-5 md:px-10 mt-6 flex flex-wrap gap-x-10 gap-y-2 text-3xl md:text-5xl tracking-[-0.04em]">
            {work.map((w, i) => (
              <li key={w} className={i % 2 ? "font-serif italic text-[#B8932A]" : "font-semibold"}>
                {w}
              </li>
            ))}
          </ul>
        ))}

      <div className="max-w-[1600px] mx-auto px-5 md:px-10">
        {!hasResults && (
          <div className="mt-12 md:mt-16">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#0B0F29]/65">{servicePage.reach.label}</p>
            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              {servicePage.reach.countries.map((c, i) => (
                <li key={c} className={cn("text-4xl md:text-6xl tracking-[-0.04em]", i % 2 ? "font-serif italic text-[#B8932A]" : "font-semibold")}>
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-xl text-[#0B0F29]/60 leading-relaxed">{servicePage.reach.industries}</p>
          </div>
        )}

        {/* Why us: the numbers behind the work */}
        <div className="mt-14 md:mt-20 rounded-[2rem] border border-[#0B0F29]/10 bg-white/50 p-6 md:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#0B0F29]/65">{servicePage.why.label}</p>
            {hasResults && (
              <p className="text-sm text-[#0B0F29]/60">
                {servicePage.reach.label}{" "}
                <span className="font-semibold text-[#0B0F29]">{servicePage.reach.countries.join(" · ")}</span>
              </p>
            )}
          </div>
          <dl className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-y-8">
            {servicePage.why.stats.map((s, i) => (
              <div key={s.label} className={cn("pr-6", i > 0 && "lg:border-l lg:border-[#0B0F29]/10 lg:pl-8", i % 2 === 1 && "border-l border-[#0B0F29]/10 pl-6 lg:pl-8")}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-5xl md:text-6xl font-semibold tracking-[-0.05em] leading-none">
                  {s.value.replace(/\D+$/, "")}
                  <span className="font-serif italic font-normal text-[#B8932A]">{s.value.match(/\D+$/)?.[0]}</span>
                </dd>
                <dd className="mt-3 text-sm text-[#0B0F29]/60">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

/* ── 5. Stack + related ──────────────────────────────────────────────── */
/** Icons for stack entries that are disciplines rather than tools with a logo. */
const stackIcons: Record<string, LucideIcon> = {
  "Brand strategy": Compass,
  "Logo & visual identity": PenTool,
  "Personal branding": UserRound,
  "Company branding": Building2,
  "Brand voice": MessageSquareQuote,
  "Social creatives": Images,
  Wireframing: LayoutTemplate,
  Prototyping: MousePointerClick,
  "Website UI": Monitor,
  "App UI": Smartphone,
  "Software UI": AppWindow,
  "Accessibility design": Accessibility,
  "Cross-platform": Layers,
  "App testing & QA": Bug,
  ERP: Boxes,
  CRM: Users,
  "Inventory management": Package,
  "HR & payroll": Wallet,
  "Workflow automation": Workflow,
  "Document management": FileText,
  SEO: Search,
  "AEO, AIO & GEO": Sparkles,
  "Technical SEO": Code2,
  "Content marketing": PenLine,
  "Email automation": Mail,
  Klaviyo: MailCheck,
  "Podcast management": Mic,
  "Social media management": Share2,
  "Performance marketing": TrendingUp,
  "Influencer marketing": Megaphone,
  "Video marketing": Video,
  Retargeting: Repeat,
  "AI & machine learning": Brain,
  "AI chatbots": Bot,
  Recommendations: Lightbulb,
  "Power BI": BarChart3,
  "Data warehousing": Database,
  "Data engineering": Cable,
  "Data visualisation": PieChart,
  "Advanced analytics": LineChart,
};

const StackMark = ({ name }: { name: string }) => {
  const logo = techLogo(name);
  if (logo) return <Image src={logo} alt="" width={36} height={36} unoptimized className="w-8 h-8 md:w-9 md:h-9" />;
  const Icon = stackIcons[name] ?? Sparkles;
  return <Icon className="w-8 h-8 md:w-9 md:h-9 text-[#D4AF37]" strokeWidth={1.25} />;
};

const Stack = ({ extra }: { extra: ServiceExtra }) => (
  <section className="relative overflow-hidden bg-[#0A0A0A] text-white px-5 md:px-10 py-16 md:py-24">
    <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-10">
      <div className="lg:col-span-4 flex flex-col">
        <Label dark>{servicePage.stackLabel}</Label>
        <h2 className="mt-6 text-5xl md:text-6xl xl:text-7xl font-semibold tracking-[-0.045em] leading-[0.95]">
          {servicePage.stackHeadline[0]}{" "}
          <span className="font-serif italic font-normal text-[#D4AF37]">{servicePage.stackHeadline[1]}</span>
        </h2>
        <div className="mt-8 lg:mt-auto lg:pt-10 flex items-end gap-4">
          <span className="text-[6rem] md:text-[8rem] leading-[0.8] font-semibold tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_#D4AF37]">
            {servicePage.stackCount}
          </span>
          <p className="pb-1 text-sm text-white/55 max-w-[220px] leading-relaxed">{servicePage.stackNote}</p>
        </div>
      </div>

      <ul className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-px rounded-[1.5rem] overflow-hidden bg-white/10 ring-1 ring-white/10 self-start">
        {extra.stack.map((s, i) => (
          <motion.li
            key={s}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: Math.min(i, 12) * 0.04 }}
            className="group relative bg-[#0A0A0A] p-5 md:p-7 min-h-[120px] md:min-h-[150px] flex flex-col justify-between transition-colors duration-500 hover:bg-[#15130c]"
          >
            <span className="flex items-start justify-between text-xs text-white/30 tabular-nums">
              <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:scale-110">
                <StackMark name={s} />
              </span>
              {pad(i + 1)}
            </span>
            <span className="text-lg md:text-2xl font-semibold tracking-[-0.03em] leading-tight transition-colors duration-500 group-hover:text-[#D4AF37]">{s}</span>
          </motion.li>
        ))}
        {/* Fill the last row so the grid stays a clean rectangle */}
        {Array.from({ length: (3 - (extra.stack.length % 3)) % 3 }).map((_, i) => (
          <li key={`f${i}`} aria-hidden className="hidden sm:block bg-[#0A0A0A]" />
        ))}
        {extra.stack.length % 2 === 1 && <li aria-hidden className="sm:hidden bg-[#0A0A0A]" />}
      </ul>
    </div>

    <div className="max-w-[1600px] mx-auto mt-16 md:mt-24">
      <p className="text-[11px] uppercase tracking-[0.25em] text-white/50">{servicePage.relatedLabel}</p>
      <ul className="mt-5 grid md:grid-cols-3 gap-3">
        {extra.related.map((r) => {
          const rel = serviceExtras[r as ServiceSlug];
          if (!rel) return null;
          const pillar = servicePillars.pillars.find((p) => p.id === rel.pillar);
          return (
            <li key={r}>
              <Link
                href={`/service/${r}`}
                className="group/roll relative flex h-full min-h-[200px] flex-col justify-between gap-8 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6 md:p-7 transition-colors duration-500 hover:border-[#D4AF37]/50"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-t from-[#D4AF37]/15 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/roll:scale-y-100"
                />
                <span className="relative flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[#D4AF37]">
                  <span>
                    {pillar?.number} {pillar?.name}
                  </span>
                  <HoverArrow className="[&>svg]:w-5 [&>svg]:h-5" />
                </span>
                <span className="relative">
                  <span className="block text-2xl md:text-3xl font-semibold tracking-[-0.03em] leading-tight">
                    <RollText>{rel.name}</RollText>
                  </span>
                  <span className="mt-2 block font-serif italic text-white/50">
                    {rel.promise[0]} {rel.promise[1]}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

/** One template for every /service/[slug] page. */
export const ServicePage = ({ slug, data }: { slug: ServiceSlug; data: CmsService | null }) => {
  const extra = serviceExtras[slug];
  const hero = data?.hero;
  const items = data?.services ?? [];

  return (
    <>
      <Hero extra={extra} intro={hero?.paragraphs?.[0]} items={items} />
      <Approach text={hero?.paragraphs?.[1]} points={(hero?.pillars ?? []).slice(0, 4)} />
      <Deliver items={items} />
      <Proof extra={extra} />
      <Stack extra={extra} />
    </>
  );
};
