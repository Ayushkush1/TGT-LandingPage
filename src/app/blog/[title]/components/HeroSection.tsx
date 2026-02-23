import Link from "next/link";
import { ArrowLeft, Clock8Icon, Eye } from "lucide-react";

interface HeroSectionProps {
  blog: {
    title: string;
    image: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    views: string;
    tags: string[];
  };
}

function HeroSection({ blog }: HeroSectionProps) {
  return (
    <div className="relative h-[72vh] min-h-[520px] flex flex-col justify-end overflow-hidden">
      <img
        src={blog.image}
        alt={blog.title}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

      <Link
        href="/#BlogSection"
        aria-label="Back to all articles"
        className="absolute top-6 left-6 z-10 flex items-center gap-2 text-white/90 text-sm font-dm px-3 py-1.5 rounded-lg border border-white/20 bg-black/25 backdrop-blur-sm hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-black/30 transition-all duration-150"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        <span className="hidden md:inline">All Articles</span>
      </Link>

      <div className="relative z-10 px-6 md:px-12 pb-12 max-w-4xl fade-up delay-100">
        <span className="inline-block font-dm text-[0.62rem] font-semibold tracking-widest uppercase text-amber-400 border border-amber-500/40 px-3 py-1 rounded-sm mb-5">
          {blog.category}
        </span>
        <h1 className="font-display text-3xl md:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.12] tracking-tight mb-5 max-w-3xl">
          {blog.title}
        </h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-white/60 text-xs font-dm">
          <span className="text-white/80">{blog.author}</span>
          <span className="text-white/25">·</span>
          <span>{blog.date}</span>
          <span className="text-white/25">·</span>
          <span className="flex items-center gap-1">
            <Clock8Icon className="w-4 h-4" />
            {blog.readTime}
          </span>
          <span className="text-white/25">·</span>
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {blog.views}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {blog.tags.map((t) => (
            <span
              key={t}
              className="font-dm text-[0.65rem] text-white/50 bg-white/10 border border-white/15 px-2.5 py-0.5 rounded-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
