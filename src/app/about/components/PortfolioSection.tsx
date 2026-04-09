"use client";
import { AnimatedSection } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useCMSStore, type PortfolioItemData } from "@/store/useCMSStore";

// Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Link from "next/link";

// ─── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center px-5 py-3
                    bg-white/10 backdrop-blur-md rounded-2xl border border-white/20
                    min-w-[90px] shadow-lg"
    >
      <span className="text-white font-extrabold text-xl leading-tight">
        {value}
      </span>
      <span className="text-white/60 text-[10px] font-medium tracking-wider uppercase mt-0.5 text-center">
        {label}
      </span>
    </div>
  );
}

// ─── Slide Card (mouse-follow) ───────────────────────────────────────────────────
function SlideCard({ p }: { p: PortfolioItemData }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => {
    setPos({ x: -100, y: -100 });
  };

  return (
    <Link href={`/products/${p.title.toLowerCase().replace(/\s+/g, "-")}`}>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-full"
      >
        {/* Background image */}
        <img
          src={p.image}
          alt={p.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlays */}
        <div
          className="absolute inset-0 bg-gradient-to-r
                                  from-black/75 via-black/35 to-black/10"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t
                                  from-black/80 via-transparent to-transparent"
        />

        {/* Giant watermark */}
        <div
          className="absolute inset-0 flex items-center justify-end
                                  pr-10 pointer-events-none overflow-hidden"
        >
          <span
            className="text-white font-extrabold uppercase tracking-tighter
                                 select-none opacity-[0.07]"
            style={{
              fontSize: "clamp(80px, 12vw, 155px)",
              lineHeight: 1,
            }}
          >
            {p.title.split(" ")[0]}
          </span>
        </div>

        {/* Slide content */}
        <div className="relative h-full flex flex-col justify-between px-10 py-10">
          {/* Center: headline + description + CTA */}
          <div className="max-w-xl">
            <p className="text-white bg-white/10 backdrop-blur-md  border border-white/20 drop-shadow-sm w-max text-xs py-2 rounded-2xl px-3.5 font-medium uppercase tracking-widest mb-3">
              {p.subtitle}
            </p>
          </div>
          {/* Bottom: stats + date + nav arrows */}

          <div className="flex items-end justify-end gap-4">
            {/* Stat badges */}
            <div className="flex items-end gap-3">
              {p.stats?.length > 1 &&
                p.stats.map((s, si) => (
                  <StatCard key={si} value={s.value} label={s.label} />
                ))}
            </div>
          </div>
        </div>

        {/* Mouse-follow label */}
        <div
          className="pointer-events-none py-0.5 text-xs px-2 rounded-full bg-white/10 backdrop-blur-md  border border-white/20 drop-shadow-sm absolute text-white font-semibold whitespace-nowrap"
          style={{
            left: pos.x,
            top: pos.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          View details
        </div>
      </div>
    </Link>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
const PortfolioSection = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const cmsPortfolios = useCMSStore((state) => state.aboutData?.Portfolio);

  return (
    <AnimatedSection animation="scaleIn" delay={0.2}>
      <div
        id="Portfolio"
        className="targeted-element light-element w-full max-w-7xl mx-auto
                      mid:pb-[14rem] mid:pt-[9rem] py-[4rem] px-4"
      >
        {/* ── MAIN SWIPER ───────────────────────────────────────────────── */}
        <div
          className="relative rounded-[3rem] overflow-hidden"
          style={{ height: 600 }}
        >
          <Swiper
            style={
              {
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              } as React.CSSProperties
            }
            spaceBetween={0}
            navigation={{
              prevEl: ".portfolio-prev",
              nextEl: ".portfolio-next",
            }}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            onSwiper={(swiper) => {
              mainSwiperRef.current = swiper;
            }}
            className="w-full h-full"
          >
            {cmsPortfolios?.map((p) => (
              <SwiperSlide key={p.id}>
                <SlideCard p={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ── THUMB SWIPER ──────────────────────────────────────────────── */}
        <div className="mt-4">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={12}
            slidesPerView={6}
            freeMode={true}
            watchSlidesProgress={true}
            loop={true}
            modules={[FreeMode, Navigation, Thumbs]}
            breakpoints={{
              320: { slidesPerView: 3 },
              640: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            className="portfolio-thumbs"
          >
            {cmsPortfolios?.map((p) => (
              <SwiperSlide key={p.id} className=" p-2">
                {/* Thumb card */}
                <div
                  className="relative rounded-[1rem] overflow-hidden cursor-pointer
                                transition-all duration-300 group"
                  style={{ height: 70 }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105
                               transition-transform duration-300"
                  />
                  {/* Dim overlay on inactive — removed by Swiper's .swiper-slide-thumb-active */}
                  <div
                    className="thumb-overlay absolute inset-0 bg-black/60
                                  transition-opacity duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 px-2 pb-1.5">
                    <p
                      className=" text-[9px] font-semibold truncate leading-tight
                                  drop-shadow-md px-px"
                    >
                      {p.title}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default PortfolioSection;
