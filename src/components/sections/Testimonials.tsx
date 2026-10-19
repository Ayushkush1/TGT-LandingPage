"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSectionContent } from "@/content/useSectionContent";
import { useCMSStore } from "@/store/useCMSStore";
import { placeholderTestimonials } from "@/content/growth";

interface Story {
  quote: string;
  clientName: string;
  clientRole: string;
  image?: string;
}

// CMS quotes often include their own quote marks and trailing blank lines.
const cleanQuote = (quote = "") =>
  quote
    .trim()
    .replace(/^["“]+|["”]+$/g, "")
    .replace(/(\w)[-–—](\w)/g, "$1 $2")
    .trim();

/** Client photo, falling back to gold initials if there is none or it fails to load. */
const Avatar = ({ src, name }: { src?: string; name: string }) => {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <span className="relative shrink-0 w-9 h-9 rounded-full overflow-hidden ring-1 ring-[#B8932A]/30 bg-[#B8932A]/10 text-[#B8932A] flex items-center justify-center font-serif italic text-sm">
      {src && !failed ? <Image src={src} alt="" fill sizes="36px" className="object-cover" onError={() => setFailed(true)} /> : initials}
    </span>
  );
};

type Variant = "light" | "dark" | "pull";

/** Cards cycle through three styles so a row reads like a magazine spread, not a grid of boxes. */
const VARIANTS: Variant[] = ["light", "dark", "light", "pull"];
const WIDTHS: Record<Variant, string> = {
  light: "w-[300px] md:w-[370px]",
  dark: "w-[320px] md:w-[440px]",
  pull: "w-[280px] md:w-[330px]",
};

/** First sentence of a quote, for the large pull-quote cards. */
const firstSentence = (text: string) => {
  const m = text.match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : text).trim();
};

const Stars = ({ gold }: { gold: string }) => (
  <span className="flex gap-0.5">
    {[0, 1, 2, 3, 4].map((s) => (
      <Star key={s} className={cn("w-3 h-3", gold)} />
    ))}
  </span>
);

const Card = ({ story, variant, number }: { story: Story; variant: Variant; number: number }) => {
  const quote = cleanQuote(story.quote);
  const dark = variant === "dark";
  const pull = variant === "pull";

  return (
    <figure
      className={cn(
        "group/card relative w-full h-full overflow-hidden flex flex-col rounded-[1.5rem] p-5 md:p-6 transition-[transform,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5",
        dark && "bg-[#0B0F29] text-white hover:shadow-[0_30px_60px_-30px_rgba(11,15,41,0.7)]",
        pull && "bg-[#E9E2D2] text-[#0B0F29] hover:shadow-[0_30px_60px_-32px_rgba(11,15,41,0.35)]",
        variant === "light" && "bg-white/70 text-[#0B0F29] ring-1 ring-[#0B0F29]/[0.06] hover:bg-white hover:shadow-[0_30px_60px_-32px_rgba(11,15,41,0.3)]",
      )}
    >
      {dark && (
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-1/2 -right-1/3 w-[120%] h-full rounded-full bg-[radial-gradient(closest-side,rgba(212,175,55,0.22),transparent)] transition-opacity duration-500 opacity-70 group-hover/card:opacity-100"
        />
      )}
      {/* Oversized quote mark that warms to gold on hover */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -bottom-16 right-4 font-serif text-[9rem] leading-none select-none transition-colors duration-500",
          dark ? "text-white/[0.07] group-hover/card:text-[#D4AF37]/40" : "text-[#0B0F29]/[0.06] group-hover/card:text-[#B8932A]/35",
        )}
      >
        ”
      </span>

      <div className="relative flex items-center justify-between gap-4">
        <span className={cn("font-serif italic text-sm", dark ? "text-[#D4AF37]" : "text-[#B8932A]")}>{String(number).padStart(2, "0")}</span>
        <Stars gold={dark ? "fill-[#D4AF37] text-[#D4AF37]" : "fill-[#B8932A] text-[#B8932A]"} />
      </div>

      <blockquote
        className={cn(
          "relative mt-4 mb-5",
          pull
            ? "font-serif italic text-xl md:text-2xl leading-[1.25] tracking-[-0.01em] line-clamp-4"
            : dark
              ? "text-base md:text-lg leading-relaxed tracking-[-0.01em] text-white/90"
              : "text-[15px] md:text-base leading-relaxed text-[#0B0F29]/80",
        )}
      >
        {pull ? firstSentence(quote) : quote}
      </blockquote>

      <figcaption className={cn("relative mt-auto pt-4 flex items-center gap-3 border-t", dark ? "border-white/10" : "border-[#0B0F29]/10")}>
        <Avatar src={story.image} name={story.clientName} />
        <span className="min-w-0">
          <span className="block text-sm font-semibold truncate">{story.clientName}</span>
          <span className={cn("block text-xs truncate", dark ? "text-white/50" : "text-[#0B0F29]/55")}>{story.clientRole}</span>
        </span>
      </figcaption>
    </figure>
  );
};

/**
 * One endlessly gliding row of cards. The list is doubled (and spaced with padding,
 * not gap) so shifting by exactly half loops seamlessly.
 */
const Row = ({ stories, duration, reverse, offset }: { stories: Story[]; duration: number; reverse?: boolean; offset: number }) => (
  <div className="overflow-hidden py-2">
    <div
      className="flex w-max items-stretch animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
      style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
    >
      {[0, 1].map((copy) =>
        stories.map((s, i) => {
          const variant = VARIANTS[(i + offset) % VARIANTS.length];
          return (
            <div key={`${copy}-${i}`} aria-hidden={copy === 1} className={cn(WIDTHS[variant], "shrink-0 pr-4 flex")}>
              <Card story={s} variant={variant} number={i + 1 + offset} />
            </div>
          );
        }),
      )}
    </div>
  </div>
);

/** Client stories: header like every section, then two rows of quotes gliding in opposite directions. */
export const Testimonials = () => {
  const data = useSectionContent("Testimonials");
  const cms = useCMSStore((s) => s.homeData?.OurReputation);
  const stories: Story[] = [...(cms?.testimonials ?? []), ...placeholderTestimonials];
  const half = Math.ceil(stories.length / 2);
  const rows = [stories.slice(0, half), stories.slice(half)];

  return (
    <section className="bg-[#F4F1EA] text-[#0B0F29] py-16 md:py-24 overflow-hidden">
      <div className="px-5 md:px-10">
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-10 items-end">
          <p className="lg:col-span-3 text-[11px] uppercase tracking-[0.25em] text-[#0B0F29]/65">{data.label}</p>
          <h2 className="lg:col-span-6 text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.045em] leading-[0.95]">
            {data.headlineMain} <span className="font-serif italic font-normal text-[#B8932A]">{data.headlineHighlight}</span>
          </h2>
          <div className="lg:col-span-3 lg:text-right">
            <div className="text-6xl md:text-7xl font-semibold tracking-[-0.05em]">{data.rating}</div>
            <div className="mt-2 flex lg:justify-end gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-4 h-4 fill-[#B8932A] text-[#B8932A]" />
              ))}
            </div>
            <p className="mt-2 text-sm text-[#0B0F29]/55">{data.ratingLabel}</p>
          </div>
        </div>
      </div>

      {/* Full-width rows; hovering pauses both so a quote can be read */}
      <div className="group mt-12 md:mt-16 space-y-2" aria-label="Client testimonials">
        <Row stories={rows[0]} duration={75} offset={0} />
        {rows[1].length > 0 && <Row stories={rows[1]} duration={85} reverse offset={rows[0].length} />}
      </div>

      <div className="px-5 md:px-10">
        <div className="max-w-[1600px] mx-auto mt-12 md:mt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-[#0B0F29]/15 pt-8">
          {cms?.footerCtaText && <p className="font-serif italic text-2xl md:text-3xl">{cms.footerCtaText}</p>}
          <a
            href={data.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 self-start rounded-full bg-[#0B0F29] text-white pl-6 pr-1.5 py-1.5 font-medium"
          >
            {data.ctaLabel}
            <span className="w-10 h-10 rounded-full bg-[#D4AF37] text-black flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};
