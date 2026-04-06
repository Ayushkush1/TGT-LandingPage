"use client";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import { useParams } from "next/navigation";
import { BlogCard } from "@/components/sections/BlogSection";
import HeroSection from "./components/HeroSection";
import Sidebar from "./components/Sidebar";
import Takeaways from "./components/Takeaways";
import AuthorCard from "./components/AuthorCard";
import Tags from "./components/Tags";
import { Quote } from "lucide-react";
import { useCMSStore } from "@/store/useCMSStore";

// `toc` and `takeaways` are derived from the selected `blog` below

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BlogPage() {
  const params = useParams().title;
  const decodedTitle =
    typeof params === "string"
      ? decodeURIComponent(params)
      : Array.isArray(params)
        ? decodeURIComponent(params[0])
        : "";
  const storeData = useCMSStore((state) => state.homeData?.BlogSection);

  // Derive blog at top level but handle undefined state gracefully for hooks
  const rawBlog = storeData?.blogs.find(
    (b) => b.title.toLowerCase().replace(/\s+/g, "-") === decodedTitle,
  );
  console.log(rawBlog, decodedTitle, params, "rawBlog");
  // Normalize blog data with memoization to avoid infinite re-render loops
  const blog = useMemo(() => {
    if (!rawBlog) return null;
    return {
      ...rawBlog,
      author: rawBlog.authorName || (rawBlog as any).author || "Team TGT",
      date: rawBlog.datePublished || (rawBlog as any).date || "Recently",
      authorAvatar: rawBlog.authorAvatar || "https://i.pravatar.cc/150?img=1",
      authorBio: rawBlog.authorBio || "Member of the TGT Team",
      tags: rawBlog.tags || [],
      content: rawBlog.content || [],
      takeaways: rawBlog.takeaways || [],
    };
  }, [rawBlog]);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [tocOpen, setTocOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("intro");
  const articleRef = useRef<HTMLDivElement>(null);
  const takeawaysList = blog?.takeaways ?? [];

  // Memoize the processed HTML for rendering
  const displayHtml = useMemo(() => {
    if (!blog?.contentHtml) return "";

    // The CMS might return text where all spaces are non-breaking spaces (&nbsp;).
    // This prevents standard text wrapping and causes awkward breaks at hyphens.
    const cleanHtml = blog.contentHtml.replace(/&nbsp;/g, " ");

    if (typeof window === "undefined") return cleanHtml;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = cleanHtml;
    const headings = tempDiv.querySelectorAll("h1, h2, h3, h4");
    headings.forEach((h, i) => {
      if (!h.id) {
        h.id = `section-${i}`;
      }
    });
    return tempDiv.innerHTML;
  }, [blog?.contentHtml]);

  // Derive ToC after blog/displayHtml is defined
  const toc = useMemo(() => {
    if (!blog) return [];

    if (blog.content && blog.content.length > 0) {
      return blog.content.map((s: any) => ({ id: s.id, label: s.heading }));
    } else if (blog.contentHtml) {
      if (typeof window === "undefined") return [];
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = displayHtml;
      const headings = Array.from(tempDiv.querySelectorAll("h1, h2, h3, h4"));

      return headings.map((h) => ({
        id: h.id,
        label: h.textContent || "",
      }));
    }
    return [];
  }, [blog, displayHtml]);

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

  useEffect(() => {
    if (!toc || toc.length === 0) return;
    const observed = toc
      .map((t: any) => document.getElementById(t.id))
      .filter((el: HTMLElement | null): el is HTMLElement => el !== null);
    if (observed.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
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

    observed.forEach((el: HTMLElement) => io.observe(el));
    return () => io.disconnect();
  }, [toc]);

  // Sync active section with first item
  useEffect(() => {
    if (toc[0]?.id && activeSection === "intro") {
      setActiveSection(toc[0].id);
    }
  }, [toc]);

  if (!blog) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-nav mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-muted-foreground">
            The requested article could not be loaded from the CMS.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-brand-gold/20">
      <Navbar />
      <HeroSection blog={blog} />

      <div>
        <div
          ref={articleRef}
          className="max-w-6xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 lg:grid-cols-[1fr_264px] gap-12 lg:gap-16 items-start"
        >
          {/* ── Article ── */}
          <article className="max-w-[680px] fade-up delay-250">
            {blog.contentHtml ? (
              <div
                className="prose prose-stone max-w-none 
                  prose-headings:font-display prose-headings:text-brand-nav prose-headings:font-bold
                  prose-p:font-body prose-p:text-[1.05rem] prose-p:leading-[1.85] prose-p:text-muted-foreground
                  prose-blockquote:border-l-brand-gold prose-blockquote:bg-brand-gold/5 prose-blockquote:py-1 prose-blockquote:rounded-r-xl"
                dangerouslySetInnerHTML={{ __html: displayHtml }}
              />
            ) : (
              <>
                {blog.content?.[0] && (
                  <div className="pb-8 mb-8 border-b border-border">
                    <p className="font-body text-xl leading-[1.85] text-foreground">
                      {blog.content[0].paragraphs[0]}
                    </p>
                  </div>
                )}

                {blog.content
                  ?.filter((s: any) => s.id !== blog.content?.[0]?.id)
                  .map((section: any) => (
                    <section key={section.id} className="mt-10">
                      <h2
                        id={section.id}
                        className="font-display text-2xl md:text-[1.75rem] font-bold text-brand-nav tracking-tight mb-4 mt-10"
                      >
                        {section.heading}
                      </h2>
                      {section.paragraphs.map((p: string, i: number) => (
                        <p
                          key={i}
                          className="font-body text-[1.05rem] leading-[1.85] text-muted-foreground mb-5"
                        >
                          {p}
                        </p>
                      ))}
                    </section>
                  ))}

                {blog.pullQuote && (
                  <div className="my-10 pl-6 border-l-[3px] border-brand-gold bg-gradient-to-r from-brand-gold/10 to-white rounded-r-xl py-6 pr-6">
                    <div className="text-brand-gold opacity-50 mb-3">
                      <Quote className="rotate-180" />
                    </div>
                    <p className="font-display italic text-xl md:text-2xl leading-snug text-brand-nav">
                      {blog.pullQuote}
                    </p>
                  </div>
                )}
              </>
            )}

            {takeawaysList.length > 0 && <Takeaways items={takeawaysList} />}

            <hr className="border-border my-8" />

            {blog.tags && <Tags tags={blog.tags} />}

            <AuthorCard
              author={blog.author}
              avatar={blog.authorAvatar}
              bio={blog.authorBio}
            />
          </article>

          {/* ── Sidebar ── */}
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
              {storeData?.blogs.map((relatedBlog, idx) => (
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
                  <BlogCard
                    {...(relatedBlog as any)}
                    author={
                      relatedBlog.authorName || (relatedBlog as any).author
                    }
                    date={
                      relatedBlog.datePublished || (relatedBlog as any).date
                    }
                  />
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
