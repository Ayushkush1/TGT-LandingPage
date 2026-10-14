"use client";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useCMSStore } from "@/store/useCMSStore";
import { ArrowRight } from "lucide-react";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { parseMarkdownLinks } from "@/utils/text";

export const AboutFirm = ({ data: propData }: { data?: any }) => {
  const storeData = useCMSStore((state) => state.aboutData?.AboutFirm);
  const data = propData || storeData;
  const Heading = (data?.headingTag || "h1") as any;
  return (
    <AnimatedSection animation="scaleIn" delay={0.2}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-14">
        <div className="flex flex-col gap-6 lg:gap-10">
          {/* Left Column - Text Content */}

          {/* ── Top Row ── */}
          <div className="flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-20 items-start lg:items-center mb-8 md:mb-12 lg:mb-16">
            {/* Left: Vertical accent + heading */}
            <div className="flex gap-4 sm:gap-6 items-center flex-shrink-0 lg:w-96">
              {/* Vertical rule + rotated label */}
              <div className="flex flex-col items-center gap-3 sm:gap-4">
                <div className="w-0.5 h-12 sm:h-16 rounded-sm bg-gradient-to-b from-[#D4AF37] to-[#D4AF37]/10" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-semibold font-sans [writing-mode:vertical-rl] [text-orientation:mixed]">
                  {data?.topLabel}
                </span>
              </div>

              <div className="max-w-[240px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[300px]">
                {/* Big editorial heading */}
                <Heading className="text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(3rem,5vw,3.75rem)] font-extrabold text-[#0B0F29] leading-[1.08] lg:leading-[1.05] tracking-tight whitespace-pre-line">
                  {data?.heading}
                </Heading>
              </div>
            </div>

            {/* Right: Body text + CTAs */}
            <div className="flex-1 flex flex-col gap-5 lg:gap-8 pt-0 lg:pt-10 font-sans">
              <div className="flex flex-col gap-3 sm:gap-4">
                <p className="text-gray-500 text-base sm:text-lg leading-6 sm:leading-7 font-medium">
                  {parseMarkdownLinks(data?.paragraph1)}
                </p>
                <p className="text-gray-500 text-base sm:text-lg leading-6 sm:leading-7 font-medium whitespace-pre-line">
                  {parseMarkdownLinks(data?.paragraph2)}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={data?.ctaUrl}
                  className="group/btn inline-flex items-center gap-2.5 bg-[#0B0F29] text-white py-3 px-7 sm:py-3.5 sm:px-9 rounded-full font-semibold tracking-wide border border-transparent font-sans text-sm sm:text-[15px] transition-colors hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.35)]"
                >
                  {data?.ctaLabel}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover/btn:translate-x-1" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg h-[260px] sm:h-[350px] lg:h-[450px] w-full">
              <OptimizedImage
                src={
                  data?.images?.[0] ||
                  "https://thegoldtechnologies.com/assets/svg/brands/aboutus.jpg"
                }
                alt="About Us"
                fill
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AboutFirm;
