"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star, Clock, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";

export const BlogCard = ({
  category,
  title,
  excerpt,
  author,
  date,
  readTime,
  views,
  image,
}: {
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  views: string;
  image: string;
}) => {
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  return (
    <Link href={`/blog/${slug}`}>
      <div className="relative h-[500px] rounded-[2rem] overflow-hidden group cursor-pointer w-full shadow-2xl transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] font-sans">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Dark Overlay - Gradient matched to image style */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>

        {/* Content Container */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          {/* Top Badge */}
          <div className="flex items-start">
            <span className="bg-white px-2.5 py-1 rounded-full flex items-center gap-2 text-[11px] font-medium text-black tracking-wide shadow-sm transform transition-transform duration-300 group-hover:-translate-y-1">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              {category}
            </span>
          </div>

          {/* Bottom Info */}
          <div className="space-y-4">
            {/* Main Text Area */}
            <div>
              {/* Title - Large & SemiBold like 'List: $250,000' */}
              <h3 className="text-[1.4rem] leading-[1.1] font-medium text-white mb-3 tracking-tight group-hover:text-[#D4AF37] transition-colors">
                {title}
              </h3>

              <div className="flex items-end justify-between gap-4">
                {/* Excerpt - Normal weight lighter gray like 'Harry Konigsberg...' */}
                <p className="text-gray-200 text-[12px] font-light leading-relaxed max-w-[60%] line-clamp-2">
                  {excerpt}
                </p>

                {/* Stats - Vertical Stack like '29m Living' */}
                <div className="flex items-center gap-5 border-l border-white/30 pl-5 mb-1 shrink-0">
                  <div className="flex flex-col items-start">
                    <span className="text-lg font-bold text-white leading-none whitespace-nowrap flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 mb-0.5 opacity-80" />{" "}
                      {readTime}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-1">
                      Read
                    </span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-lg font-bold text-white leading-none whitespace-nowrap flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 mb-0.5 opacity-80" /> {views}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-1">
                      Views
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Horizontal Divider */}
            <div className="h-px w-full bg-white/20 mt-2"></div>

            {/* Footer Author Row - 'By • Waleed Sabir' style */}
            <div className="flex items-center text-xs text-gray-300">
              <span className="opacity-70 mr-1.5">By •</span>
              <span className="text-white font-medium border-b border-white pb-0.5 hover:border-[#D4AF37] transition-colors mr-3">
                {author}
              </span>
              <span className="opacity-60 text-xs mt-0.5">{date}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
import { useCMSStore } from "@/store/useCMSStore";

export const BlogSection = () => {
  const storeData = useCMSStore((state) => state.homeData?.BlogSection);
  const data = storeData;

  return (
    <section className="py-32 bg-white relative" id="BlogSection">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 px-2 gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-[#D4AF37]"></div>
              <span className="text-[#D4AF37] font-bold tracking-[0.2em] text-xs uppercase">
                {data?.upperTag}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B0F29] tracking-tight leading-tight">
              {data?.headlinePart1} <br />
              <span className="font-serif italic text-[#D4AF37]">
                {data?.headlineHighlight}
              </span>
            </h2>
          </div>

          <Link
            href={data?.viewAllUrl ?? ""}
            className="hidden md:flex items-center gap-2 text-[#0B0F29] font-bold uppercase tracking-widest hover:text-[#D4AF37] transition-colors group text-xs border-b border-[#0B0F29] pb-1 hover:border-[#D4AF37]"
          >
            {data?.viewAllLabel}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {data?.blogs?.map((blog: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <BlogCard
                {...blog}
                author={blog.authorName || blog.author}
                date={blog.datePublished || blog.date}
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center md:hidden">
          <Link
            href={data?.viewAllUrl ?? ""}
            className="flex items-center gap-2 text-[#0B0F29] font-bold uppercase tracking-widest hover:text-[#D4AF37] transition-colors group text-xs border-b border-[#0B0F29] pb-1 hover:border-[#D4AF37]"
          >
            {data?.viewAllLabel}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
