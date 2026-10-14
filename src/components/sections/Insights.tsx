"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSectionContent } from "@/content/useSectionContent";
import { useCMSStore } from "@/store/useCMSStore";

// Matches the slug the /blog/[title] page resolves.
const blogSlug = (title: string) => title.toLowerCase().replace(/\s+/g, "-");

/** Editorial article list with an image preview that trails the cursor. */
export const Insights = () => {
  const data = useSectionContent("Insights");
  const cms = useCMSStore((s) => s.homeData?.BlogSection);
  const blogs = cms?.blogs ?? [];

  const [hovered, setHovered] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 220, damping: 26 });
  const smoothY = useSpring(y, { stiffness: 220, damping: 26 });

  return (
    <section
      id="BlogSection"
      onMouseMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      className="bg-[#0A0A0A] text-white px-5 md:px-10 py-16 md:py-24"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/50">
              {data.label}
            </p>
            <h2 className="mt-6 text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.045em] leading-[0.95] text-white">
              {data.headlineMain}{" "}
              <span className="font-serif italic font-normal text-[#D4AF37]">
                {data.headlineHighlight}
              </span>
            </h2>
          </div>
          {cms?.viewAllUrl && cms.viewAllUrl !== "#" && (
            <Link
              href={cms.viewAllUrl}
              className="group inline-flex items-center gap-2 self-start md:self-auto text-sm font-semibold text-white"
            >
              <span className="border-b border-white/30 pb-0.5 group-hover:border-white">
                {data.viewAllLabel}
              </span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
            </Link>
          )}
        </div>

        <ul className="mt-16 md:mt-24 border-b border-white/10">
          {blogs.map((blog, i) => (
            <motion.li
              key={blog.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link
                href={`/blog/${blogSlug(blog.title)}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="group grid grid-cols-12 gap-x-4 gap-y-4 items-center border-t border-white/10 py-8 md:py-10"
              >
                {/* Inline thumbnail on touch screens */}
                <span className="lg:hidden col-span-12 relative aspect-[16/9] rounded-2xl overflow-hidden bg-white/5">
                  <Image src={blog.image} alt="" fill sizes="100vw" className="object-cover" />
                </span>
                <span className="col-span-6 md:col-span-2 text-sm text-white/45 tabular-nums">
                  {blog.datePublished || blog.date}
                </span>
                <span className="col-span-6 md:col-span-2 md:order-last text-right text-sm text-white/45">
                  {blog.readTime}
                </span>
                <span className="col-span-12 md:col-span-6 text-2xl md:text-4xl font-semibold tracking-[-0.03em] leading-tight text-white transition-transform group-hover:text-[#D4AF37] duration-500 group-hover:translate-x-3">
                  {blog.title}
                </span>
                <span className="col-span-12 md:col-span-2 flex items-center gap-3">
                  <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-white/70 line-clamp-1">
                    {blog.category}
                  </span>
                  <ArrowUpRight className="hidden md:block w-5 h-5 text-white/40 transition-all duration-300 group-hover:rotate-45 group-hover:text-[#D4AF37]" />
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Cursor-following preview (desktop) */}
      <motion.div
        aria-hidden
        style={{ left: smoothX, top: smoothY }}
        className="pointer-events-none fixed z-40 hidden lg:block w-80 aspect-[4/3] -ml-40 -mt-60"
      >
        <motion.div
          animate={{ scale: hovered === null ? 0 : 1, opacity: hovered === null ? 0 : 1 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
        >
          {blogs.map((blog, i) => (
            <Image
              key={blog.title}
              src={blog.image}
              alt=""
              fill
              sizes="320px"
              className={cn(
                "object-cover transition-opacity duration-300",
                hovered === i ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
