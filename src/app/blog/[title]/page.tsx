"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { PageHero } from "@/components/sections/PageHero";
import { GrowthCTA } from "@/components/sections/GrowthCTA";
import { useCMSStore, type BlogItemData } from "@/store/useCMSStore";
import { parseMarkdownLinks } from "@/utils/text";

const ease = [0.22, 1, 0.36, 1] as const;
const blogSlug = (title: string) => title.toLowerCase().replace(/\s+/g, "-");

/** "Main title: subtitle" becomes two headline lines; otherwise the last words go gold. */
const splitTitle = (title: string): [string, string] => {
  const colon = title.indexOf(":");
  if (colon > 0) return [title.slice(0, colon).trim(), `${title.slice(colon + 1).trim()}.`];
  const words = title.trim().split(/\s+/);
  const cut = Math.max(1, words.length - 3);
  return [words.slice(0, cut).join(" "), words.slice(cut).join(" ")];
};

/**
 * Adds ids to the article's headings after mount (so server and client HTML match)
 * and tracks which one is being read.
 */
function useArticleToc(ref: React.RefObject<HTMLElement>, html: string) {
  const [toc, setToc] = useState<{ id: string; label: string }[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const headings = Array.from(ref.current?.querySelectorAll<HTMLElement>("h2, h3") ?? []);
    headings.forEach((h, i) => {
      if (!h.id) h.id = `section-${i + 1}`;
    });
    setToc(headings.map((h) => ({ id: h.id, label: h.textContent?.trim() ?? "" })).filter((t) => t.label));
  }, [ref, html]);

  useEffect(() => {
    if (!toc.length) return;
    const onScroll = () => {
      let current: string | null = null;
      for (const t of toc) {
        const el = document.getElementById(t.id);
        if (el && el.getBoundingClientRect().top < 160) current = t.id;
      }
      setActive(current ?? toc[0].id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [toc]);

  return { toc, active };
}

const RelatedCard = ({ blog, index }: { blog: BlogItemData; index: number }) => (
  <motion.li
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.8, ease, delay: index * 0.08 }}
  >
    <Link href={`/blog/${blogSlug(blog.title)}`} className="group block">
      <div className="relative aspect-[16/10] rounded-[1.5rem] overflow-hidden bg-[#141414]">
        {blog.image && (
          <Image
            src={blog.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
        )}
      </div>
      <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-[#D4AF37]">
        {blog.category} · {blog.readTime}
      </p>
      <div className="mt-2 flex items-start justify-between gap-6">
        <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.025em] leading-snug">{blog.title}</h3>
        <span className="shrink-0 w-10 h-10 rounded-full border border-white/15 flex items-center justify-center transition-[transform,background-color,color] duration-500 group-hover:rotate-45 group-hover:bg-[#D4AF37] group-hover:text-black">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  </motion.li>
);

export default function BlogPostPage() {
  const param = useParams().title;
  const slug = decodeURIComponent(Array.isArray(param) ? param[0] : param ?? "");
  const section = useCMSStore((s) => s.homeData?.BlogSection);
  const blog = section?.blogs.find((b) => blogSlug(b.title) === slug);
  const related = (section?.blogs ?? []).filter((b) => b !== blog);

  // The CMS stores spaces as &nbsp;, which stops normal wrapping.
  const html = (blog?.contentHtml ?? "").replace(/&nbsp;/g, " ");
  const articleRef = useRef<HTMLDivElement>(null);
  const { toc, active } = useArticleToc(articleRef, html);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const author = blog?.authorName || blog?.author || "Team TGT";
  const date = blog?.datePublished || blog?.date;
  const [top, highlight] = splitTitle(blog?.title ?? "");

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans selection:bg-brand-gold/20">
      <SmoothScroll />
      <Navbar />
      {/* Reading progress */}
      <motion.div aria-hidden style={{ scaleX: progress }} className="fixed top-0 inset-x-0 z-[70] h-[3px] origin-left bg-[#D4AF37]" />

      <main id="main-content" tabIndex={-1} className="relative z-10 focus:outline-none">
        {blog ? (
          <>
            <PageHero
              compact
              label={
                <p className="flex flex-wrap items-center gap-3">
                  <Link href="/#BlogSection" className="inline-flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5" /> All articles
                  </Link>
                  <span className="w-6 h-px bg-white/20" />
                  <span className="text-[#D4AF37]">{blog.category}</span>
                </p>
              }
              top={top}
              highlight={highlight}
              description={
                <>
                  {blog.excerpt && <p>{blog.excerpt}</p>}
                  <p className="mt-5 text-sm text-white/45">
                    By <span className="text-white/80">{author}</span>
                    {date && <> · {date}</>}
                    {blog.readTime && <> · {blog.readTime}</>}
                  </p>
                </>
              }
              secondary={{ label: "Start reading", href: "#article" }}
              image={blog.image ? { src: blog.image, alt: blog.title } : undefined}
              facts={[blog.category, blog.readTime].filter(Boolean)}
            />

            <section id="article" className="bg-[#F4F1EA] text-[#0B0F29] px-5 md:px-10 py-16 md:py-24 scroll-mt-20">
              <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
                <aside className="hidden lg:block lg:col-span-3">
                  {toc.length > 0 && (
                    <nav className="sticky top-28" aria-label="In this article">
                      <p className="text-[11px] uppercase tracking-[0.25em] text-[#0B0F29]/65">(In this article)</p>
                      <ol className="mt-6 border-l border-[#0B0F29]/10">
                        {toc.map((t, i) => (
                          <li key={t.id}>
                            <a
                              href={`#${t.id}`}
                              className={
                                active === t.id
                                  ? "-ml-px flex gap-3 border-l-2 border-[#B8932A] pl-4 py-2 text-sm font-medium text-[#0B0F29]"
                                  : "-ml-px flex gap-3 border-l-2 border-transparent pl-4 py-2 text-sm text-[#0B0F29]/55 hover:text-[#0B0F29] transition-colors"
                              }
                            >
                              <span className="font-serif italic text-xs text-[#B8932A] pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                              {t.label}
                            </a>
                          </li>
                        ))}
                      </ol>
                    </nav>
                  )}
                </aside>

                <article className="lg:col-span-8 xl:col-span-7 min-w-0">
                  {html ? (
                    <div
                      ref={articleRef}
                      className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:tracking-[-0.03em] prose-headings:text-[#0B0F29] prose-headings:scroll-mt-28 prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-16 prose-h3:text-2xl prose-p:text-[#0B0F29]/75 prose-p:leading-[1.8] prose-li:text-[#0B0F29]/75 prose-strong:text-[#0B0F29] prose-a:text-[#0B0F29] prose-a:decoration-[#D4AF37] prose-a:underline-offset-4 hover:prose-a:text-[#B8932A] prose-blockquote:border-l-[#D4AF37] prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:font-normal prose-blockquote:text-2xl prose-blockquote:text-[#0B0F29] prose-img:rounded-[1.25rem] prose-hr:border-[#0B0F29]/10 marker:text-[#B8932A]"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  ) : (
                    <div ref={articleRef}>
                    {blog.content?.map((s) => (
                      <section key={s.id} className="mt-12 first:mt-0">
                        <h2 id={s.id} className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] scroll-mt-28">
                          {s.heading}
                        </h2>
                        {s.paragraphs.map((p, i) => (
                          <p key={i} className="mt-5 text-lg leading-[1.8] text-[#0B0F29]/75">
                            {parseMarkdownLinks(p)}
                          </p>
                        ))}
                      </section>
                    ))}
                    </div>
                  )}

                  {blog.takeaways && blog.takeaways.length > 0 && (
                    <div className="mt-14 rounded-[1.75rem] bg-[#0B0F29] text-white p-8 md:p-10">
                      <p className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37]">(Key takeaways)</p>
                      <ol className="mt-6 space-y-4">
                        {blog.takeaways.map((t, i) => (
                          <li key={i} className="flex gap-4 text-white/80 leading-relaxed">
                            <span className="font-serif italic text-[#D4AF37]">{String(i + 1).padStart(2, "0")}</span>
                            {t}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  <div className="mt-14 pt-8 border-t border-[#0B0F29]/10 flex flex-wrap items-center justify-between gap-6">
                    <p className="text-sm text-[#0B0F29]/60">
                      Written by <span className="font-semibold text-[#0B0F29]">{author}</span>
                      {date && <> · {date}</>}
                    </p>
                    {blog.tags && blog.tags.length > 0 && (
                      <ul className="flex flex-wrap gap-2">
                        {blog.tags.map((t) => (
                          <li key={t} className="rounded-full border border-[#0B0F29]/15 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-[#0B0F29]/65">
                            {t}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              </div>
            </section>

            {related.length > 0 && (
              <section className="bg-[#0A0A0A] text-white px-5 md:px-10 py-16 md:py-24">
                <div className="max-w-[1600px] mx-auto">
                  <div className="grid lg:grid-cols-12 gap-10 items-end">
                    <p className="lg:col-span-3 text-[11px] uppercase tracking-[0.25em] text-white/50">(Keep reading)</p>
                    <h2 className="lg:col-span-9 text-5xl md:text-7xl font-semibold tracking-[-0.045em] leading-[0.95]">
                      More on <span className="font-serif italic font-normal text-[#D4AF37]">growth.</span>
                    </h2>
                  </div>
                  <ul className="mt-12 md:mt-16 grid md:grid-cols-2 gap-x-8 gap-y-14">
                    {related.slice(0, 2).map((b, i) => (
                      <RelatedCard key={b.title} blog={b} index={i} />
                    ))}
                  </ul>
                </div>
              </section>
            )}

            <GrowthCTA />
          </>
        ) : (
          <div className="min-h-[70svh]" />
        )}
      </main>
      <div className="bg-[#F4F1EA]">
        <Footer />
      </div>
    </div>
  );
}
