"use client";
import { AnimatedSection } from "@/components/AnimatedSection";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────
export const portfolios = [
  {
    id: 1,
    image: "/images/portfolioImg1.jpg",
    title: "GreatWaterFilters.com.au",
    subtitle: "Website Development",
    CTA: "Water Purifier",
    link: "#",
    date: "Tue, 8 Mar 2022",
    description:
      "A full e-commerce and content website for Australia's water filter specialists.",
    stats: [
      { label: "Conversion Rate", value: "60%" },
      { label: "Load Speed", value: "90%" },
      { label: "User Rating", value: "60%" },
    ],
    SERVICES: [
      {
        number: "01",
        title: "UI/UX Design",
        category: "Design",
        description: "Modern interface design.",
        tags: ["design"],
        outcome: "Better engagement",
      },
      {
        number: "02",
        title: "Web Development",
        category: "Development",
        description: "Full-stack build.",
        tags: ["web"],
        outcome: "Fast performance",
      },
      {
        number: "03",
        title: "E-commerce Setup",
        category: "Development",
        description: "Online store integration.",
        tags: ["ecommerce"],
        outcome: "Online sales",
      },
      {
        number: "04",
        title: "Payment Gateway",
        category: "Integration",
        description: "Secure payment methods.",
        tags: ["payments"],
        outcome: "Smooth checkout",
      },
      {
        number: "05",
        title: "SEO Optimization",
        category: "Marketing",
        description: "Search engine optimization.",
        tags: ["seo"],
        outcome: "Higher ranking",
      },
    ],
  },

  {
    id: 2,
    image: "/images/portfolioImg2.jpg",
    title: "MyWeekendTrip",
    subtitle: "Website Development",
    CTA: "Tourism",
    link: "#",
    date: "Mon, 14 Nov 2023",
    description: "A booking and discovery platform for weekend getaways.",
    stats: [
      { label: "Bookings", value: "20%" },
      { label: "Markets", value: "70%" },
      { label: "Satisfaction", value: "80%" },
    ],
    SERVICES: [
      {
        number: "01",
        title: "Booking Engine",
        category: "Development",
        description: "Reservation system.",
        tags: ["backend"],
        outcome: "More bookings",
      },
      {
        number: "02",
        title: "Search Filters",
        category: "Features",
        description: "Smart trip filters.",
        tags: ["search"],
        outcome: "Easy discovery",
      },
      {
        number: "03",
        title: "Responsive Design",
        category: "Design",
        description: "Mobile-friendly UI.",
        tags: ["responsive"],
        outcome: "Mobile users",
      },
      {
        number: "04",
        title: "Map Integration",
        category: "Integration",
        description: "Location-based trips.",
        tags: ["map"],
        outcome: "Better planning",
      },
      {
        number: "05",
        title: "User Accounts",
        category: "Security",
        description: "Login & profiles.",
        tags: ["auth"],
        outcome: "Personalization",
      },
    ],
  },

  {
    id: 3,
    image: "/images/portfolioImg3.jpg",
    title: "Label Corporate",
    subtitle: "Website Development",
    CTA: "Corporate Garments",
    link: "#",
    date: "Wed, 21 Jun 2023",
    description:
      "A professional web presence for a corporate garments company.",
    stats: [
      { label: "Traffic Growth", value: "12%" },
      { label: "Reach", value: "15%" },
      { label: "Leads", value: "89%" },
    ],
    SERVICES: [
      {
        number: "01",
        title: "Corporate Website",
        category: "Development",
        description: "Company site.",
        tags: ["enterprise"],
        outcome: "Brand presence",
      },
      {
        number: "02",
        title: "Product Catalog",
        category: "Features",
        description: "Garment showcase.",
        tags: ["catalog"],
        outcome: "More leads",
      },
      {
        number: "03",
        title: "Contact System",
        category: "Integration",
        description: "Inquiry forms.",
        tags: ["forms"],
        outcome: "Customer reach",
      },
      {
        number: "04",
        title: "SEO Setup",
        category: "Marketing",
        description: "Search visibility.",
        tags: ["seo"],
        outcome: "Traffic growth",
      },
      {
        number: "05",
        title: "Hosting & Deployment",
        category: "DevOps",
        description: "Live deployment.",
        tags: ["hosting"],
        outcome: "Reliable uptime",
      },
    ],
  },

  {
    id: 4,
    image: "/images/portfolioImg4.png",
    title: "Bir Credit Solution",
    subtitle: "ERP Software",
    CTA: "Finance Solutions",
    link: "#",
    date: "Thu, 12 Jan 2024",
    description: "Custom ERP software for credit solutions provider.",
    stats: [
      { label: "Efficiency", value: "86%" },
      { label: "Accuracy", value: "34%" },
      { label: "Speed", value: "89%" },
    ],
    SERVICES: [
      {
        number: "01",
        title: "ERP Development",
        category: "Software",
        description: "Custom system.",
        tags: ["erp"],
        outcome: "Automation",
      },
      {
        number: "02",
        title: "Dashboard",
        category: "Analytics",
        description: "Reports & insights.",
        tags: ["dashboard"],
        outcome: "Data tracking",
      },
      {
        number: "03",
        title: "User Roles",
        category: "Security",
        description: "Access control.",
        tags: ["auth"],
        outcome: "Security",
      },
      {
        number: "04",
        title: "Database Design",
        category: "Backend",
        description: "Structured data.",
        tags: ["database"],
        outcome: "Efficiency",
      },
      {
        number: "05",
        title: "API Integration",
        category: "Integration",
        description: "External services.",
        tags: ["api"],
        outcome: "Scalability",
      },
    ],
  },

  {
    id: 5,
    image: "/images/portfolioImg5.jpg",
    title: "The Social Beacon",
    subtitle: "Website Redesign",
    CTA: "Digital Marketing",
    link: "#",
    date: "Fri, 5 Sep 2023",
    description: "A modern redesign for a digital marketing agency.",
    stats: [
      { label: "Engagement", value: "86%" },
      { label: "Retention", value: "45%" },
      { label: "Growth", value: "76%" },
    ],
    SERVICES: [
      {
        number: "01",
        title: "Website Redesign",
        category: "Design",
        description: "Modern UI.",
        tags: ["redesign"],
        outcome: "Fresh look",
      },
      {
        number: "02",
        title: "Performance Boost",
        category: "Performance",
        description: "Speed optimization.",
        tags: ["speed"],
        outcome: "Fast loading",
      },
      {
        number: "03",
        title: "SEO Upgrade",
        category: "Marketing",
        description: "Ranking improvements.",
        tags: ["seo"],
        outcome: "Traffic",
      },
      {
        number: "04",
        title: "Content Update",
        category: "Content",
        description: "New copywriting.",
        tags: ["content"],
        outcome: "Brand clarity",
      },
      {
        number: "05",
        title: "Analytics Setup",
        category: "Analytics",
        description: "Tracking tools.",
        tags: ["analytics"],
        outcome: "Data insights",
      },
    ],
  },

  {
    id: 6,
    image: "/images/portfolioImg6.jpg",
    title: "The Embassy Inn",
    subtitle: "Website & Digital Marketing",
    CTA: "Hotels",
    link: "#",
    date: "Mon, 18 Dec 2023",
    description: "Website and digital marketing for a boutique hotel.",
    stats: [
      { label: "Bookings", value: "69%" },
      { label: "Reviews", value: "23%" },
      { label: "Revenue", value: "56%" },
    ],
    SERVICES: [
      {
        number: "01",
        title: "Hotel Website",
        category: "Development",
        description: "Booking site.",
        tags: ["hotel"],
        outcome: "Direct bookings",
      },
      {
        number: "02",
        title: "Booking Integration",
        category: "Integration",
        description: "Reservation system.",
        tags: ["booking"],
        outcome: "Automation",
      },
      {
        number: "03",
        title: "SEO & Ads",
        category: "Marketing",
        description: "Online promotion.",
        tags: ["ads"],
        outcome: "Visibility",
      },
      {
        number: "04",
        title: "Review System",
        category: "Features",
        description: "Guest feedback.",
        tags: ["reviews"],
        outcome: "Trust",
      },
      {
        number: "05",
        title: "Social Media Setup",
        category: "Marketing",
        description: "Online presence.",
        tags: ["social"],
        outcome: "Brand awareness",
      },
    ],
  },
];

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
function SlideCard({ p }: { p: (typeof portfolios)[0] }) {
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
              {p.stats.map((s, si) => (
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
            {portfolios.map((p, i) => (
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
            {portfolios.map((p) => (
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
