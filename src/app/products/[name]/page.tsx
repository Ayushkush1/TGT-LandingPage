"use client";

import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { PageHero } from "@/components/sections/PageHero";
import { GrowthCTA } from "@/components/sections/GrowthCTA";
import { useCMSStore, type PortfolioItemData } from "@/store/useCMSStore";
import { useProjects } from "@/app/portfolio/useProjects";

const BOOKING_URL = "https://calendar.app.google/5nNHP69fUR5WEMvt9";
const ease = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");
const clean = (t = "") => t.replace(/\s*[—–]\s*/g, ", ").replace(/\s+/g, " ").trim();
const slugOf = (title: string) => title.toLowerCase().replace(/\s+/g, "-");

type Section = PortfolioItemData["SERVICES"][number];

/** "Name: X Website URL: Y" style client details, split into label/value pairs. */
const PROFILE_KEYS = /(Client Name|Name|Website URL|Business Type|Locations?|Address):\s*/g;
const parseProfile = (text: string) => {
  const parts = clean(text).split(PROFILE_KEYS).filter(Boolean);
  const pairs: { label: string; value: string }[] = [];
  for (let i = 0; i < parts.length - 1; i += 2) pairs.push({ label: parts[i], value: parts[i + 1].trim() });
  return pairs;
};

/** Sentences, with a leading "Label:" pulled out so it can be set in bold. */
const parsePoints = (text: string) =>
  clean(text)
    .split(/(?<=\.)\s+(?=[A-Z])/)
    .map((sentence) => {
      const m = sentence.match(/^([^:.]{2,48}):\s*(.+)$/);
      return m ? { label: m[1], text: m[2] } : { text: sentence };
    });

const StoryBody = ({ section }: { section: Section }) => {
  if (/client details/i.test(section.category)) {
    const pairs = parseProfile(section.description);
    if (pairs.length > 1)
      return (
        <dl className="grid sm:grid-cols-2 gap-x-10">
          {pairs.map((p) => (
            <div key={p.label} className="py-4 border-b border-[#0B0F29]/10">
              <dt className="text-[11px] uppercase tracking-[0.2em] text-[#0B0F29]/45">{p.label}</dt>
              <dd className="mt-1 text-lg font-medium break-words">
                {/^https?:/.test(p.value) ? (
                  <a href={p.value} target="_blank" rel="noopener noreferrer" className="underline decoration-[#D4AF37] underline-offset-4">
                    {p.value.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                  </a>
                ) : (
                  p.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      );
  }

  const points = parsePoints(section.description);
  if (points.length === 1) return <p className="text-lg md:text-xl leading-relaxed text-[#0B0F29]/75">{points[0].text}</p>;
  return (
    <ul className="border-t border-[#0B0F29]/10">
      {points.map((p, i) => (
        <li key={i} className="flex gap-4 py-4 border-b border-[#0B0F29]/10">
          <span className="font-serif italic text-sm text-[#B8932A] pt-1">{pad(i + 1)}</span>
          <p className="text-base md:text-lg leading-relaxed text-[#0B0F29]/70">
            {p.label && <span className="font-semibold text-[#0B0F29]">{p.label}. </span>}
            {p.text}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default function CaseStudyPage() {
  const slug = useParams().name;
  const portfolio = useCMSStore((s) => s.aboutData?.Portfolio);
  const projects = useProjects();

  const raw = portfolio?.find((p) => slugOf(p.title) === slug) ?? portfolio?.[0];
  const index = projects.findIndex((p) => p.title === raw?.title);
  const project = projects[index];
  const next = projects.length > 1 ? projects[(index + 1) % projects.length] : undefined;

  // Story order: everything except the summary, which closes the page as the outcome.
  const sections = (raw?.SERVICES ?? []).filter((s) => s.description?.trim());
  const story = sections.filter((s) => !/summary/i.test(s.category));
  const outcomes = Array.from(new Set(sections.map((s) => clean(s.outcome)).filter(Boolean)));
  const site = raw?.link && /^https?:/.test(raw.link) ? raw.link : undefined;

  return (
    <div className="min-h-screen bg-[#0A0A0A] font-sans selection:bg-brand-gold/20">
      <SmoothScroll />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative z-10 focus:outline-none">
        {raw && project ? (
          <>
            <PageHero
              compact
              label={
                <p className="flex flex-wrap items-center gap-3">
                  <Link href="/portfolio#work" className="inline-flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5" /> All work
                  </Link>
                  <span className="w-6 h-px bg-white/20" />
                  <span className="text-[#D4AF37]">{project.industry}</span>
                </p>
              }
              top={project.client}
              highlight={`${project.service.toLowerCase()}.`}
              description={project.summary}
              primary={site ? { label: "Visit the live site", href: site } : { label: "Book a free strategy call", href: BOOKING_URL }}
              secondary={{ label: "Read the story", href: "#story" }}
              number={pad(index + 1)}
              image={{ src: project.image, alt: `${project.client}, ${project.service}` }}
              facts={
                project.stats.length
                  ? project.stats.map((s) => `${s.value} ${s.label.toLowerCase()}`)
                  : [project.service, project.industry]
              }
            />

            {/* The story: sticky chapter list beside numbered sections */}
            <section id="story" className="bg-[#F4F1EA] text-[#0B0F29] px-5 md:px-10 py-16 md:py-24 scroll-mt-20">
              <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
                <aside className="lg:col-span-3">
                  <div className="lg:sticky lg:top-28">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-[#0B0F29]/65">(The story)</p>
                    <ol className="mt-6 hidden lg:block space-y-1">
                      {story.map((s, i) => (
                        <li key={s.title}>
                          <a
                            href={`#chapter-${i + 1}`}
                            className="group/roll flex items-baseline gap-3 py-1.5 text-sm text-[#0B0F29]/60 hover:text-[#0B0F29] transition-colors"
                          >
                            <span className="font-serif italic text-xs text-[#B8932A]">{pad(i + 1)}</span>
                            {s.title}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </div>
                </aside>

                <div className="lg:col-span-9 space-y-16 md:space-y-24">
                  {story.map((s, i) => (
                    <motion.article
                      key={s.title}
                      id={`chapter-${i + 1}`}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.8, ease }}
                      className="scroll-mt-28 grid md:grid-cols-12 gap-6 md:gap-10"
                    >
                      <header className="md:col-span-4">
                        <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[#B8932A]">
                          <span className="font-serif italic normal-case tracking-normal text-base">{pad(i + 1)}</span>
                          {s.category}
                        </p>
                        <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-[-0.035em] leading-[1.05]">{s.title}</h2>
                      </header>
                      <div className="md:col-span-8">
                        <StoryBody section={s} />
                        {s.tags?.length > 0 && (
                          <ul className="mt-6 flex flex-wrap gap-2">
                            {s.tags.map((t) => (
                              <li key={t} className="rounded-full border border-[#0B0F29]/15 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-[#0B0F29]/65">
                                {t}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>

            {/* What changed: results first, then the outcomes in the client's words */}
            {(project.stats.length > 0 || outcomes.length > 0) && (
              <section className="bg-[#0A0A0A] text-white px-5 md:px-10 py-16 md:py-24">
                <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-10">
                  <p className="lg:col-span-3 text-[11px] uppercase tracking-[0.25em] text-white/50">(What changed)</p>
                  <div className="lg:col-span-9">
                    {project.stats.length > 0 && (
                      <dl className="grid grid-cols-2 gap-8 pb-12 mb-12 border-b border-white/10">
                        {project.stats.map((s) => (
                          <div key={s.label}>
                            <dt className="sr-only">{s.label}</dt>
                            <dd className="text-7xl md:text-8xl lg:text-9xl font-semibold tracking-[-0.06em] leading-none">{s.value}</dd>
                            <dd className="mt-3 text-sm text-white/55">{s.label}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    <p className="text-4xl md:text-6xl font-semibold tracking-[-0.04em] leading-[1.1]">
                      {outcomes.map((o, i) => (
                        <Fragment key={o}>
                          {i > 0 && <span className="text-white/25"> · </span>}
                          <span className={i % 2 ? "font-serif italic font-normal text-[#D4AF37]" : undefined}>{o}</span>
                        </Fragment>
                      ))}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Next case study */}
            {next && (
              <Link href={next.href} className="group block bg-[#F4F1EA] text-[#0B0F29] px-5 md:px-10 py-16 md:py-24 border-b border-[#0B0F29]/10">
                <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-10 items-center">
                  <p className="lg:col-span-3 text-[11px] uppercase tracking-[0.25em] text-[#0B0F29]/65">(Next case study)</p>
                  <div className="lg:col-span-6">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#B8932A]">{next.industry}</p>
                    <p className="mt-3 text-5xl md:text-7xl font-semibold tracking-[-0.045em] leading-[0.95]">
                      {next.client}
                      <span className="block font-serif italic font-normal text-[#B8932A] text-4xl md:text-5xl mt-2">
                        {next.service.toLowerCase()}
                      </span>
                    </p>
                  </div>
                  <div className="lg:col-span-3 flex lg:justify-end items-center gap-6">
                    <div className="relative hidden md:block w-56 aspect-[4/3] rounded-2xl overflow-hidden bg-[#E3DFD8]">
                      <Image
                        src={next.image}
                        alt=""
                        fill
                        sizes="224px"
                        className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                      />
                    </div>
                    <span className="shrink-0 w-14 h-14 rounded-full bg-[#0B0F29] text-[#D4AF37] flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight className="w-6 h-6" />
                    </span>
                  </div>
                </div>
              </Link>
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
