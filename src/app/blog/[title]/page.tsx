"use client";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { BlogCard, blogs } from "@/components/sections/BlogSection";
import HeroSection from "./components/HeroSection";
import Sidebar from "./components/Sidebar";
import RelatedPosts from "./components/RelatedPosts";
import Takeaways from "./components/Takeaways";
import AuthorCard from "./components/AuthorCard";
import Tags from "./components/Tags";
import { Quote } from "lucide-react";

// `toc` and `takeaways` are derived from the selected `blog` below

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BlogPage() {
  const params = useParams().title;
  const blog =
    blogs.find((b) => b.title.toLowerCase().replace(/\s+/g, "-") === params) ||
    blogs[0];

  const [scrollProgress, setScrollProgress] = useState(0);
  const [tocOpen, setTocOpen] = useState(true);
  const [activeSection, setActiveSection] = useState(
    blog.content?.[0]?.id || "intro",
  );
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const progress = Math.min(
        Math.max(-top / (height - window.innerHeight), 0),
        1,
      );
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const circumference = 2 * Math.PI * 20;

  const toc = blog.content?.map((s) => ({ id: s.id, label: s.heading })) ?? [];
  const takeawaysList = blog.takeaways ?? [];

  useEffect(() => {
    if (!toc || toc.length === 0) return;
    const observed = toc
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => el !== null);
    if (observed.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Find the entry that's most visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -60% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    observed.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [toc, setActiveSection]);

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-brand-gold/20">
      {/* Unified Background Wrapper for Navbar + Hero */}
      <div className="relative">
        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          <HeroSection blog={blog} />
        </div>
      </div>
      <div>
        {/* ── Two-Column Layout ── */}
        <div
          ref={articleRef}
          className="max-w-6xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 lg:grid-cols-[1fr_264px] gap-12 lg:gap-16 items-start"
        >
          {/* ── Article ── */}
          <article className="max-w-[680px] fade-up delay-250">
            {/* Intro + dynamic content from blog data */}
            {blog.content?.[0] && (
              <div className="pb-8 mb-8 border-b border-border">
                <p className="font-body text-xl leading-[1.85] text-foreground">
                  {blog.content[0].paragraphs[0]}
                </p>
              </div>
            )}

            {/* Render the rest of the content sections (skip intro if present) */}
            {blog.content
              ?.filter((s) => s.id !== blog.content?.[0]?.id)
              .map((section) => (
                <section key={section.id} className="mt-10">
                  <h2
                    id={section.id}
                    className="font-display text-2xl md:text-[1.75rem] font-bold text-brand-nav tracking-tight mb-4 mt-10"
                  >
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="font-body text-[1.05rem] leading-[1.85] text-muted-foreground mb-5"
                    >
                      {p}
                    </p>
                  ))}
                </section>
              ))}

            {/* Pull Quote */}
            <div className="my-10 pl-6 border-l-[3px] border-brand-gold bg-gradient-to-r from-brand-gold/10 to-white rounded-r-xl py-6 pr-6">
              <div className="text-brand-gold opacity-50 mb-3">
                <Quote className=" rotate-180" />
              </div>
              <p className="font-display italic text-xl md:text-2xl leading-snug text-brand-nav">
                {blog.pullQuote}
              </p>
            </div>

            {/* ── Section 3 ── */}
            <h2
              id="ai-enters"
              className="font-display text-2xl md:text-[1.75rem] font-bold text-brand-nav tracking-tight mb-4 mt-10"
            >
              Where AI Enters
            </h2>
            <p className="font-body text-[1.05rem] leading-[1.85] text-muted-foreground mb-5">
              Generative AI tools are beginning to address some of the chronic
              pain points in design system maintenance. Visual regression
              testing that once required manual review can be partially
              automated. Component documentation, a perennial afterthought, can
              be drafted from code analysis. Accessibility audits that took
              hours now run in seconds.
            </p>
            <p className="font-body text-[1.05rem] leading-[1.85] text-muted-foreground mb-5">
              More experimental tools are exploring component generation —
              describe a UI need in plain language, receive a component that
              adheres to your existing token structure. Whether these tools are
              ready for production workflows is debatable. That they will change
              the shape of design systems work within five years is not.
            </p>

            {/* Key Takeaways (from blog data) */}
            <Takeaways items={takeawaysList} />

            {/* ── Section 4 ── */}
            <h2
              id="human-element"
              className="font-display text-2xl md:text-[1.75rem] font-bold text-brand-nav tracking-tight mb-4 mt-10"
            >
              The Human Element
            </h2>
            <p className="font-body text-[1.05rem] leading-[1.85] text-muted-foreground mb-5">
              What AI cannot replace is the judgment required to make a design
              system feel intentional. The micro-decisions that make a component
              library cohesive — the exact easing curve on a modal enter
              transition, the space between a label and its input, the moment a
              tooltip becomes a popover — these are expressions of design
              opinion, not engineering optimization.
            </p>
            <p className="font-body text-[1.05rem] leading-[1.85] text-stone-600 mb-5">
              The teams that will benefit most from AI tooling are those with
              strong design system governance: clear principles, documented
              rationale, explicit ownership. AI amplifies what's already there.
              If your system has strong foundations, AI can help you maintain
              and extend them faster.
            </p>

            {/* Callout */}
            <div className="my-8 border border-border rounded-xl overflow-hidden">
              <div className="bg-stone-900 px-5 py-3 font-dm text-[0.65rem] font-semibold tracking-widest uppercase text-brand-gold">
                📌 Practical Note
              </div>
              <div className="bg-white px-5 py-4">
                <p className="font-dm text-sm leading-relaxed text-muted-foreground">
                  Before evaluating any AI tooling for your design system, audit
                  your token documentation first. Tokens named{" "}
                  <code className="font-mono bg-white/5 px-1.5 py-0.5 rounded text-xs text-foreground">
                    color-3
                  </code>{" "}
                  instead of{" "}
                  <code className="font-mono bg-white/5 px-1.5 py-0.5 rounded text-xs text-foreground">
                    surface-primary
                  </code>{" "}
                  will produce poor AI-generated results consistently.
                </p>
              </div>
            </div>

            {/* ── Section 5 ── */}
            <h2
              id="future"
              className="font-display text-2xl md:text-[1.75rem] font-bold text-brand-nav tracking-tight mb-4 mt-10"
            >
              What Comes Next
            </h2>
            <p className="font-body text-[1.05rem] leading-[1.85] text-muted-foreground mb-5">
              The most durable design systems of the next decade will likely be
              smaller and more opinionated, not larger. As AI tooling handles
              more generation and maintenance, the strategic value of a design
              system shifts from comprehensive coverage to clear principles.
            </p>
            <p className="font-body text-[1.05rem] leading-[1.85] text-muted-foreground mb-5">
              These are questions that require human judgment, cultural context,
              and brand understanding. The teams that focus there — and let AI
              handle the rest — will build systems that age well.
            </p>

            <hr className="border-border my-8" />

            <Tags tags={blog.tags} />

            <AuthorCard
              author={blog.author}
              avatar={blog.authorAvatar}
              bio={blog.authorBio}
            />
          </article>

          {/* ── Sidebar (extracted) ── */}
          <Sidebar
            circumference={circumference}
            scrollProgress={scrollProgress}
            tocOpen={tocOpen}
            setTocOpen={setTocOpen}
            toc={toc}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>

        {/* ── Related Posts ── */}
        <section className="bg-stone-100 py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto flex-col flex gap-10">
            <div className=" flex flex-col gap-4">
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B0F29] leading-[1.15] tracking-tight">
                Continue Reading
              </h2>

              <p className="text-lg text-gray-500 font-light leading-relaxed">
                More on design, engineering, and craft
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
              {blogs.map((blog, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: idx * 0.15,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                >
                  <BlogCard {...blog} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
