"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { GrowthCTA } from "@/components/sections/GrowthCTA";
import { RollText } from "@/components/ui/RollText";
import { HoverArrow } from "@/components/ui/HoverArrow";
import { cn } from "@/lib/utils";
import { productLinkFixes, productsContent } from "@/content/products";
import type { ProductItemData } from "@/store/useCMSStore";

const ease = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");
const clean = (t = "") => t.replace(/\s*[—–]\s*/g, " to ").trim();
const hasImage = (p: ProductItemData) => typeof p.imageUrl === "string" && p.imageUrl.length > 0;
const host = (url = "") => {
  try {
    return new URL(url.trim()).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

/* ── Product showcase options ───────────────────────────────────────────
 * Three editorial layouts. Until one is chosen, preview with
 * ?cards=index | split | spread on /products.
 */
const LAYOUTS = ["index", "split", "spread"] as const;
type Layout = (typeof LAYOUTS)[number];

function useLayout(): Layout {
  const [layout, setLayout] = useState<Layout>("spread");
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("cards");
    if (q && (LAYOUTS as readonly string[]).includes(q)) setLayout(q as Layout);
  }, []);
  return layout;
}

type Product = ProductItemData & { live: boolean; href: string; domain: string };

/** Applies link fixes and works out where each product should open. */
const prepare = (products: ProductItemData[]): Product[] =>
  products.map((p) => {
    const link = (productLinkFixes[p.title.trim()] ?? p.link ?? "").trim();
    const domain = host(link);
    return { ...p, link, live: domain !== "", href: domain ? link : productsContent.hero.primaryUrl, domain };
  });

/** Product name with its last word set in gold serif italic. */
const Name = ({ title }: { title: string }) => {
  const words = title.trim().split(/\s+/);
  const last = words.pop();
  return (
    <>
      {words.length > 0 && `${words.join(" ")} `}
      <span className="font-serif italic font-normal tracking-[-0.02em] text-[#B8932A]">{last}</span>
    </>
  );
};

const Shot = ({ p, sizes, className }: { p: Product; sizes: string; className?: string }) =>
  hasImage(p) ? (
    <Image src={p.imageUrl} alt={`${p.title} screenshot`} fill sizes={sizes} className={cn("object-cover object-top", className)} />
  ) : (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0B0F29]">
      <span className="font-serif italic text-4xl md:text-5xl text-[#D4AF37]">{p.title}</span>
    </div>
  );

const VisitLink = ({ p }: { p: Product }) => (
  <a href={p.href} target="_blank" rel="noopener noreferrer" className="group/roll inline-flex items-center gap-2 text-sm font-medium text-[#0B0F29]">
    <RollText>{p.live ? productsContent.grid.liveLabel : productsContent.grid.soonLabel}</RollText>
    <HoverArrow className="!text-[#0B0F29]/40 group-hover/roll:!text-[#B8932A]" />
  </a>
);

const Features = ({ p }: { p: Product }) =>
  p.pillars?.length ? (
    <ol className="grid sm:grid-cols-2 gap-x-8 border-t border-[#0B0F29]/10">
      {p.pillars.map((f) => (
        <li key={f.title} className="flex gap-3 py-3 border-b border-[#0B0F29]/10">
          <span className="font-serif italic text-xs pt-0.5 text-[#B8932A]">{f.number}</span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold">{f.title}</span>
            <span className="block mt-0.5 text-[13px] leading-snug text-[#0B0F29]/55">{clean(f.desc)}</span>
          </span>
        </li>
      ))}
    </ol>
  ) : null;

/* A. Editorial index: huge names as rows; the screenshot trails the cursor. */
const IndexLayout = ({ items }: { items: Product[] }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26 });
  const sy = useSpring(y, { stiffness: 220, damping: 26 });

  return (
    <div
      onMouseMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >
      <ul className="border-b border-[#0B0F29]/15">
        {items.map((p, i) => (
          <motion.li
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease, delay: (i % 4) * 0.05 }}
          >
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group grid grid-cols-12 gap-x-4 gap-y-4 items-center border-t border-[#0B0F29]/15 py-7 md:py-9"
            >
              <span className="lg:hidden col-span-12 relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#E3DFD8]">
                <Shot p={p} sizes="100vw" />
              </span>
              <span className="col-span-2 md:col-span-1 font-serif italic text-lg text-[#B8932A]">{pad(i + 1)}</span>
              <span className="col-span-10 md:col-span-6 text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.045em] leading-[1] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3">
                <Name title={p.title} />
              </span>
              <span className="col-span-12 md:col-span-4 text-[#0B0F29]/60 leading-relaxed">{clean(p.shortDesc)}</span>
              <span className="hidden md:flex col-span-1 justify-end">
                <span className="w-12 h-12 rounded-full border border-[#0B0F29]/15 flex items-center justify-center transition-[transform,background-color,color,border-color] duration-500 group-hover:rotate-45 group-hover:bg-[#0B0F29] group-hover:border-[#0B0F29] group-hover:text-[#D4AF37]">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </span>
            </a>
          </motion.li>
        ))}
      </ul>

      <motion.div
        aria-hidden
        style={{ left: sx, top: sy }}
        className="pointer-events-none fixed z-40 hidden lg:block w-[26rem] aspect-[16/10] -ml-[13rem] -mt-[17rem]"
      >
        <motion.div
          animate={{ scale: hovered === null ? 0.6 : 1, opacity: hovered === null ? 0 : 1, rotate: hovered === null ? -6 : -2 }}
          transition={{ duration: 0.35, ease }}
          className="relative w-full h-full rounded-2xl overflow-hidden ring-1 ring-black/10 shadow-[0_40px_80px_-30px_rgba(11,15,41,0.6)]"
        >
          {items.map((p, i) => (
            <span key={p.title} className={cn("absolute inset-0 transition-opacity duration-300", hovered === i ? "opacity-100" : "opacity-0")}>
              <Shot p={p} sizes="420px" />
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

/* B. Sticky split: the screenshot stays pinned and swaps as the list scrolls past. */
const SplitLayout = ({ items }: { items: Product[] }) => {
  const [active, setActive] = useState(0);
  const current = items[active] ?? items[0];

  return (
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
      <div className="hidden lg:block lg:col-span-6">
        <div className="sticky top-28">
          <a href={current?.href} target="_blank" rel="noopener noreferrer" className="block">
            <div className="relative aspect-[16/10] rounded-[1.75rem] overflow-hidden bg-[#0B0F29] ring-1 ring-[#0B0F29]/10 shadow-[0_40px_80px_-40px_rgba(11,15,41,0.5)]">
              {items.map((p, i) => (
                <span
                  key={p.title}
                  className={cn(
                    "absolute inset-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    i === active ? "opacity-100 scale-100" : "opacity-0 scale-[1.04]",
                  )}
                >
                  <Shot p={p} sizes="50vw" />
                </span>
              ))}
            </div>
          </a>
          <div className="mt-4 flex items-baseline justify-between text-[11px] uppercase tracking-[0.2em] text-[#0B0F29]/55">
            <span className="font-serif italic normal-case tracking-normal text-sm text-[#B8932A]">
              {pad(active + 1)} / {pad(items.length)}
            </span>
            <span className="truncate">{current?.domain || productsContent.grid.soonLabel}</span>
          </div>
        </div>
      </div>

      <ol className="lg:col-span-6">
        {items.map((p, i) => (
          <motion.li
            key={p.title}
            onViewportEnter={() => setActive(i)}
            viewport={{ amount: 0.6 }}
            onMouseEnter={() => setActive(i)}
            className={cn(
              "border-t border-[#0B0F29]/15 py-10 md:py-14 lg:min-h-[64svh] flex flex-col justify-center transition-opacity duration-500",
              i === active ? "lg:opacity-100" : "lg:opacity-35",
            )}
          >
            <span className="lg:hidden relative block aspect-[16/10] rounded-2xl overflow-hidden bg-[#E3DFD8] mb-6">
              <Shot p={p} sizes="100vw" />
            </span>
            <p className="font-serif italic text-lg text-[#B8932A]">{pad(i + 1)}</p>
            <h3 className="mt-2 text-4xl md:text-6xl font-semibold tracking-[-0.045em] leading-[1]">
              <a href={p.href} target="_blank" rel="noopener noreferrer">
                <Name title={p.title} />
              </a>
            </h3>
            <p className="mt-4 text-[#0B0F29]/60 leading-relaxed max-w-lg">{clean(p.shortDesc)}</p>
            <div className="mt-7">
              <Features p={p} />
            </div>
            <div className="mt-6">
              <VisitLink p={p} />
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
};

/* C. Magazine spreads: large framed screenshot and story, alternating sides. */
const SpreadLayout = ({ items }: { items: Product[] }) => (
  <ol className="space-y-20 md:space-y-32">
    {items.map((p, i) => {
      const flip = i % 2 === 1;
      return (
        <motion.li
          key={p.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center"
        >
          <a href={p.href} target="_blank" rel="noopener noreferrer" className={cn("group lg:col-span-7 block", flip && "lg:order-last")}>
            <figure>
              <div className="relative aspect-[16/10] rounded-[1.75rem] overflow-hidden bg-[#0B0F29] ring-1 ring-[#0B0F29]/10">
                <Shot
                  p={p}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <span className="absolute right-5 bottom-5 w-14 h-14 rounded-full bg-[#D4AF37] text-black flex items-center justify-center scale-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100">
                  <ArrowUpRight className="w-6 h-6" />
                </span>
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-[11px] uppercase tracking-[0.2em] text-[#0B0F29]/50">
                <span className="font-serif italic normal-case tracking-normal text-sm text-[#B8932A]">Fig. {pad(i + 1)}</span>
                <span className="truncate">{p.domain || productsContent.grid.soonLabel}</span>
              </figcaption>
            </figure>
          </a>

          <div className="lg:col-span-5">
            <span
              aria-hidden
              className="block text-[5rem] md:text-[7rem] font-semibold leading-[0.8] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(184,147,42,0.6)]"
            >
              {pad(i + 1)}
            </span>
            <h3 className="mt-4 text-4xl md:text-5xl lg:text-[3.4rem] font-semibold tracking-[-0.045em] leading-[1]">
              <a href={p.href} target="_blank" rel="noopener noreferrer">
                <Name title={p.title} />
              </a>
            </h3>
            <p className="mt-4 text-lg text-[#0B0F29]/60 leading-relaxed">{clean(p.shortDesc)}</p>
            <div className="mt-8">
              <Features p={p} />
            </div>
            <div className="mt-6">
              <VisitLink p={p} />
            </div>
          </div>
        </motion.li>
      );
    })}
  </ol>
);

/** Products page: shared hero, product grid, then the "let's talk" section. */
export const ProductsView = ({ products }: { products: ProductItemData[] }) => {
  const hero = productsContent.hero;
  const grid = productsContent.grid;
  const layout = useLayout();
  const items = prepare(products);

  return (
    <>
      <PageHero
        label={hero.label}
        top={hero.headlineTop}
        highlight={hero.headlineHighlight}
        description={hero.description}
        primary={{ label: hero.primaryLabel, href: hero.primaryUrl }}
        secondary={{ label: hero.secondaryLabel, href: hero.secondaryUrl }}
        number="04"
        facts={[`${products.length} products`, "Live and in use", "Built in house"]}
      />

      <section id="products" className="bg-[#F4F1EA] text-[#0B0F29] px-5 md:px-10 py-16 md:py-24 scroll-mt-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <p className="lg:col-span-3 text-[11px] uppercase tracking-[0.25em] text-[#0B0F29]/65">{grid.label}</p>
            <div className="lg:col-span-9 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-[-0.045em] leading-[0.95]">
                {grid.headlineMain}{" "}
                <span className="font-serif italic font-normal text-[#B8932A]">{grid.headlineHighlight}</span>
              </h2>
              <p className="max-w-xs text-[#0B0F29]/60 leading-relaxed">{grid.description}</p>
            </div>
          </div>

          <div className="mt-12 md:mt-20">
            {layout === "index" ? (
              <IndexLayout items={items} />
            ) : layout === "split" ? (
              <SplitLayout items={items} />
            ) : (
              <SpreadLayout items={items} />
            )}
          </div>
        </div>
      </section>

      <GrowthCTA />
    </>
  );
};
