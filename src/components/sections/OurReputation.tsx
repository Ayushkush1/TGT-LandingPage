"use client";
import React, { useState, useEffect } from "react";
import { Star, ArrowRight } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useCMSStore } from "@/store/useCMSStore";

export const OurReputation = ({ data: propData }: { data?: any }) => {
  const storeData = useCMSStore((state) => state.homeData?.OurReputation);
  const data = propData || storeData;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = data?.testimonials || [];
  const total = testimonials.length;

  useEffect(() => {
    if (!isAutoPlaying || total === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, total]);

  if (!data || total === 0) return null;

  // Helper to get visual position of an item relative to active index
  const getPosition = (index: number) => {
    const total = data?.testimonials.length;
    // Calculate offset: 0 = center, 1 = bottom (next), 2/-1 = top (prev)
    // We want strict mapping:
    // Active (0) -> Center
    // Active + 1 (1) -> Bottom
    // Active - 1 (or +2) -> Top

    const offset = (index - activeIndex + total) % total;

    if (offset === 0) return "center";
    if (offset === 1) return "bottom";
    return "top"; // offset === 2 (last item)
  };

  // Helper for star rating
  const Stars = () => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-current" />
      ))}
    </div>
  );

  return (
    <AnimatedSection animation="scaleIn" delay={0.2}>
      <section className="py-16 px-4 bg-gray-50/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-8 bg-gray-400/30"></div>
              <span className="text-gray-400 font-bold tracking-[0.2em] text-xs uppercase">
                {data?.upperTag}
              </span>
              <div className="h-px w-8 bg-gray-400/30"></div>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B0F29] leading-[1.15] mb-6 tracking-tight">
              {data?.headlinePart1}{" "}
              <span className="font-serif italic font-medium text-[#D4AF37]">
                {data?.headlineHighlight1}
              </span>{" "}
              {data?.headlinePart2.split(" ")[0]} <br />{" "}
              {data?.headlinePart2.split(" ").slice(1).join(" ")}{" "}
              <span className="relative inline-block z-0">
                {data?.headlineHighlight2}
                <span className="absolute bottom-2 left-0 w-full h-3 bg-[#D4AF37] -z-10 opacity-60 transform -rotate-1 rounded-sm"></span>
              </span>
            </h2>

            <p className="text-lg text-gray-500 font-light leading-relaxed max-w-2xl mx-auto mt-6">
              {data?.mainDescription}
            </p>
          </div>

          {/* Content Area - Compact 2 Columns */}
          <div
            className="flex flex-col md:flex-row gap-8 lg:gap-10 items-center justify-center mb-16 z-0"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Left: Vertical Carousel (Avatars) */}
            {/* Fixed height container for absolute positioning */}
            <div className="relative w-full md:w-48 h-[350px] flex justify-center items-center z-0">
              {data &&
                data?.testimonials.map((t: any, index: number) => {
                  const position = getPosition(index);

                  // Define styles for each position
                  let positionStyles = "";
                  if (position === "center") {
                    positionStyles =
                      "top-1/2 -translate-y-1/2 z-20 scale-100 opacity-100 ring-4 ring-[#D4AF37]/50 rounded-[2rem] shadow-xl bg-white h-32 md:h-36";
                  } else if (position === "top") {
                    positionStyles =
                      "top-[15%] -translate-y-1/2 z-10 scale-90 opacity-40 grayscale blur-[1px] rounded-[1.5rem] h-16 md:h-20 w-16 md:w-[100px]";
                  } else if (position === "bottom") {
                    positionStyles =
                      "top-[85%] -translate-y-1/2 z-10 scale-90 opacity-40 grayscale blur-[1px] rounded-[1.5rem] h-16 md:h-20 w-16 md:w-[100px]";
                  }

                  return (
                    <button
                      key={t.clientName}
                      onClick={() => setActiveIndex(index)}
                      className={`absolute left-1/2 -translate-x-1/2  overflow-hidden transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) cursor-pointer group 
                                        w-24 md:w-32 object-cover block
                                        ${positionStyles}
                                    `}
                    >
                      <img
                        src={t.image}
                        alt={t.clientName}
                        className="w-full h-full object-cover transition-transform duration-700"
                      />
                    </button>
                  );
                })}
            </div>

            {/* Right: Testimonial Card */}
            <div className="flex-1 w-full max-w-3xl bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.04)] relative border border-gray-100 min-h-[350px] flex flex-col justify-center overflow-hidden z-0">
              {/* Giant Quote Decoration */}
              <div className="absolute top-1 right-6 text-[#D4AF37]/50 font-serif text-[340px] leading-none select-none pointer-events-none font-bold opacity-20 transform">
                ”
              </div>

              <div className="relative z-10 space-y-6">
                <div
                  className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-forwards"
                  key={activeIndex}
                >
                  <p className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed text-center md:text-left">
                    "{data?.testimonials[activeIndex]?.quote}"
                  </p>

                  <div className="pt-8 border-t border-gray-100 mt-8 flex flex-col items-center md:flex-row md:justify-between gap-4">
                    <div className="text-center md:text-left">
                      <h4 className="text-xl font-bold text-[#0B0F29] font-serif mb-1">
                        {data?.testimonials[activeIndex]?.clientName}
                      </h4>
                      <p className="text-gray-500 font-medium">
                        {data?.testimonials[activeIndex]?.clientRole}
                      </p>
                    </div>
                    <div className="transition-transform duration-300 hover:scale-110">
                      <Stars />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="text-center space-y-8 animate-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-forwards">
            <p className="text-[#0B0F29] font-serif text-2xl font-medium italic">
              {data?.footerCtaText}
            </p>
            <a
              href={data?.footerButtonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0B0F29] w-max text-white px-10 py-4 rounded-full font-semibold tracking-wide hover:bg-black transition-all duration-300 border border-transparent hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center gap-3 mx-auto group"
            >
              {data?.footerButtonLabel}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};
