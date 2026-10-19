"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { RollText } from "@/components/ui/RollText";
import { HoverArrow } from "@/components/ui/HoverArrow";
import { useSectionContent } from "@/content/useSectionContent";
import { useCMSStore, type BlogItemData } from "@/store/useCMSStore";

const ease = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

// Matches the slug the /blog/[title] page resolves.
const blogSlug = (title: string) => title.toLowerCase().replace(/\s+/g, "-");
const topic = (blog: BlogItemData) => blog.category?.split("/")[0]?.trim();

/** Article image; if it is missing or fails to load, a dark editorial tile with the topic. */
const Cover = ({ blog, sizes }: { blog: BlogItemData; sizes: string }) => {
  const [failed, setFailed] = useState(false);
  return blog.image && !failed ? (
    <Image
      src={blog.image}
      alt={blog.title}
      fill
      sizes={sizes}
      onError={() => setFailed(true)}
      className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
    />
  ) : (
    <span className="absolute inset-0 flex items-end p-6 bg-[radial-gradient(120%_90%_at_80%_100%,rgba(212,175,55,0.35),transparent_60%),#141414]">
      <span className="font-serif italic text-3xl md:text-4xl text-[#D4AF37]/80">{topic(blog)}</span>
    </span>
  );
};

/** Title with its last two words set in gold serif italic, like every headline on the site. */
const Title = ({ text }: { text: string }) => {
  const words = text.trim().split(/\s+/);
  const tail = words.splice(Math.max(1, words.length - 2));
  return (
    <>
      {words.join(" ")} <span className="font-serif italic font-normal tracking-[-0.02em] text-[#D4AF37]">{tail.join(" ")}</span>
    </>
  );
};

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease, delay },
});

const Arrow = ({ size = "w-12 h-12" }: { size?: string }) => (
  <span
    className={`shrink-0 ${size} rounded-full border border-white/15 flex items-center justify-center transition-[transform,background-color,border-color,color] duration-500 group-hover:rotate-45 group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:text-black`}
  >
    <ArrowUpRight className="w-5 h-5" />
  </span>
);

/* ── A. Cinematic: the latest article full-bleed with its headline over the image ── */
const CinematicLayout = ({ blogs }: { blogs: BlogItemData[] }) => {
  const [lead, ...rest] = blogs;
  return (
    <>
      <motion.article {...reveal()}>
        <Link href={`/blog/${blogSlug(lead.title)}`} className="group relative block overflow-hidden rounded-[2rem] bg-[#141414] aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]">
          <Cover blog={lead} sizes="100vw" />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.15)_0%,rgba(10,10,10,0.35)_45%,rgba(10,10,10,0.92)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 lg:p-12">
            <p className="flex items-baseline gap-3 text-[11px] uppercase tracking-[0.25em] text-white/70">
              <span className="font-serif italic normal-case tracking-normal text-lg text-[#D4AF37]">No. 01</span>
              {topic(lead)} · Latest
            </p>
            <div className="mt-4 flex items-end justify-between gap-8">
              <h3 className="max-w-4xl text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.045em] leading-[1.02]">
                <Title text={lead.title} />
              </h3>
              <span className="hidden md:flex shrink-0 w-16 h-16 rounded-full bg-[#D4AF37] text-black items-center justify-center transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">
                <ArrowUpRight className="w-7 h-7" />
              </span>
            </div>
            <div className="mt-6 pt-5 border-t border-white/15 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              {lead.excerpt && <p className="max-w-2xl text-white/65 leading-relaxed line-clamp-2">{lead.excerpt}</p>}
              <p className="shrink-0 text-xs text-white/50 tabular-nums">
                {lead.datePublished || lead.date}
                {lead.readTime && <> · {lead.readTime}</>}
              </p>
            </div>
          </div>
        </Link>
      </motion.article>

      {rest.length > 0 && (
        <ul className="mt-6 grid md:grid-cols-2 gap-6">
          {rest.map((blog, i) => (
            <motion.li key={blog.title} {...reveal(0.1 + i * 0.1)}>
              <Link href={`/blog/${blogSlug(blog.title)}`} className="group grid sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-6 items-stretch rounded-[1.75rem] border border-white/10 p-3 transition-colors duration-500 hover:border-white/25">
                <div className="relative aspect-[16/11] rounded-[1.25rem] overflow-hidden bg-[#141414]">
                  <Cover blog={blog} sizes="(max-width: 768px) 100vw, 25vw" />
                </div>
                <div className="flex flex-col py-2 pr-3">
                  <p className="flex items-baseline gap-3 text-[11px] uppercase tracking-[0.25em] text-white/50">
                    <span className="font-serif italic normal-case tracking-normal text-lg text-[#D4AF37]">{pad(i + 2)}</span>
                    <span className="truncate">{topic(blog)}</span>
                  </p>
                  <h3 className="mt-3 text-xl md:text-2xl font-semibold tracking-[-0.03em] leading-snug line-clamp-3">
                    <Title text={blog.title} />
                  </h3>
                  <div className="mt-auto pt-5 flex items-center justify-between gap-4">
                    <span className="text-xs text-white/45">{blog.readTime}</span>
                    <Arrow size="w-10 h-10" />
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      )}
    </>
  );
};

/** Insights: image-led. The latest article runs full-bleed with its headline over the image; the rest follow as image cards. */
export const Insights = () => {
  const data = useSectionContent("Insights");
  const cms = useCMSStore((s) => s.homeData?.BlogSection);
  const blogs = cms?.blogs ?? [];

  return (
    <section id="BlogSection" className="bg-[#0A0A0A] text-white px-5 md:px-10 py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <p className="lg:col-span-3 text-[11px] uppercase tracking-[0.25em] text-white/50">{data.label}</p>
          <div className="lg:col-span-9 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.045em] leading-[0.95]">
              {data.headlineMain} <span className="font-serif italic font-normal text-[#D4AF37]">{data.headlineHighlight}</span>
            </h2>
            {cms?.viewAllUrl && cms.viewAllUrl !== "#" && (
              <Link href={cms.viewAllUrl} className="group/roll inline-flex items-center gap-2 self-start md:self-auto text-sm font-medium">
                <RollText>{data.viewAllLabel}</RollText>
                <HoverArrow />
              </Link>
            )}
          </div>
        </div>

        {blogs.length > 0 && (
          <div className="mt-12 md:mt-16">
            <CinematicLayout blogs={blogs} />
          </div>
        )}
      </div>
    </section>
  );
};
