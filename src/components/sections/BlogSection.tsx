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

export const blogs = [
  {
    category: "Tech Trends",
    title: "Future of AI in Web Development",
    excerpt:
      "How artificial intelligence is reshaping digital platforms and workflows.",
    author: "Sarah Jenkins",
    authorBio:
      "Tech writer and AI enthusiast. Covers emerging technologies and their impact on web development. Previously at TechCrunch.",
    authorAvatar: "https://i.pravatar.cc/150?img=1",
    date: "2 Days ago",
    readTime: "5m",
    views: "1.2k",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop",
    tags: ["AI", "Web Development", "Future Tech", "Automation"],
    pullQuote:
      "The future of web development isn't about replacing developers with AI—it's about augmenting their capabilities.",
    takeaways: [
      "AI augments developer workflows, automating repetitive tasks.",
      "Teams should focus on token-first architectures to scale safely.",
      "High-quality documentation is essential for reliable AI assistance.",
    ],
    content: [
      {
        id: "intro",
        heading: "Introduction",
        paragraphs: [
          "Artificial intelligence is rapidly becoming a core part of modern web development workflows. From automated testing to code generation, AI tools are changing how teams design, build, and maintain web applications.",
        ],
      },
      {
        id: "opportunities",
        heading: "Opportunities AI Brings",
        paragraphs: [
          "AI can speed up routine tasks like linting, accessibility checks, and visual regression detection, freeing engineers to focus on higher-level design and architecture.",
          "Generative tools can propose component implementations that conform to a project's token system, reducing implementation drift.",
        ],
      },
      {
        id: "challenges",
        heading: "Challenges and Risks",
        paragraphs: [
          "Tooling that generates code without organizational guardrails can introduce inconsistencies and technical debt.",
          "Teams must invest in governance, naming conventions, and documentation to get reliable results from AI systems.",
        ],
      },
      {
        id: "future",
        heading: "What Comes Next",
        paragraphs: [
          "The most effective teams will treat AI as an assistant rather than a replacement — building processes and documentation that let AI scale their existing strengths.",
        ],
      },
    ],
  },
  {
    category: "Design",
    title: "Mastering Minimalist UI Principles",
    excerpt:
      "Why less is more: A deep dive into creating cleaner, more effective user interfaces.",
    author: "Marc Johnson",
    authorBio:
      "Design strategist and minimalism advocate. Works at Studio Design Co. focusing on user-centered design principles.",
    authorAvatar: "https://i.pravatar.cc/150?img=2",
    date: "4 Days ago",
    readTime: "7m",
    views: "850",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop",
    tags: ["Design", "UI/UX", "Minimalism", "Best Practices"],
    pullQuote:
      "Minimalism isn't about having less—it's about focusing on what matters most.",
    takeaways: [
      "Remove distraction to improve clarity and usability.",
      "Consistent spacing and typography create visual rhythm.",
    ],
    content: [
      {
        id: "principles",
        heading: "Core Principles",
        paragraphs: [
          "Minimalist UI focuses attention on primary actions and content by removing non-essential elements.",
        ],
      },
    ],
  },
  {
    category: "Strategy",
    title: "Scaling Your SaaS Product Globally",
    excerpt:
      "Key strategies for taking your local software product to international markets.",
    author: "Alex Rivera",
    authorBio:
      "SaaS consultant and growth strategist. Has helped 20+ startups scale internationally. Founder of Global Scale Consulting.",
    authorAvatar: "https://i.pravatar.cc/150?img=3",
    date: "1 Week ago",
    readTime: "10m",
    views: "2.5k",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop",
    tags: ["SaaS", "Growth", "Scaling", "Business Strategy"],
    pullQuote:
      "Global expansion is not about doing everything everywhere—it's about strategic market selection and localization.",
    takeaways: [
      "Prioritize markets with product-market fit before globalizing.",
      "Localize content and compliance early in the roadmap.",
    ],
    content: [
      {
        id: "strategy",
        heading: "Market Strategy",
        paragraphs: [
          "Successful global scaling begins with focused market selection, not broad expansion. Identify markets with similar user needs and reasonable regulatory overhead.",
        ],
      },
    ],
  },
];
export const BlogSection = () => {
  return (
    <section className="py-32 bg-white relative" id="BlogSection">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-16 px-2">
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-[#D4AF37]"></div>
              <span className="text-[#D4AF37] font-bold tracking-[0.2em] text-xs uppercase">
                Our Blog
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B0F29] tracking-tight leading-tight">
              Insights & <br />
              <span className="font-serif italic text-[#D4AF37]">
                Perspectives
              </span>
            </h2>
          </div>

          <button className="hidden md:flex items-center gap-2 text-[#0B0F29] font-bold uppercase tracking-widest hover:text-[#D4AF37] transition-colors group text-xs border-b border-[#0B0F29] pb-1 hover:border-[#D4AF37]">
            View All Articles
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {blogs.map((blog, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <BlogCard {...blog} />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center md:hidden">
          <button className="flex items-center gap-2 text-[#0B0F29] font-bold uppercase tracking-widest hover:text-[#D4AF37] transition-colors group text-xs border-b border-[#0B0F29] pb-1 hover:border-[#D4AF37]">
            View All Articles
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
