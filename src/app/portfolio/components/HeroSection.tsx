"use client";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useCMSStore } from "@/store/useCMSStore";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const portfolioData = useCMSStore((state) => state.portfolioData?.main);
  const data = portfolioData;

  return (
    <AnimatedSection animation="scaleIn" delay={0.2}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className=" flex flex-col gap-10">
          {/* Left Column - Text Content */}

          {/* ── Top Row ── */}
          <div className="flex flex-col lg:flex-row gap-20 items-center mb-16">
            {/* Left: Vertical accent + heading */}
            <div className="flex gap-6 items-start flex-shrink-0 lg:w-96">
              {/* Vertical rule + rotated label */}
              <div className="flex flex-col items-center gap-4 pt-2">
                <div className="w-0.5 h-16 rounded-sm bg-gradient-to-b from-[#D4AF37] to-[#D4AF37]/10" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-semibold font-sans [writing-mode:vertical-rl] [text-orientation:mixed]">
                  {data?.hero?.eyebrow || "PORTFOLIO"}
                </span>
              </div>

              <div>
                {/* Big editorial heading */}
                <h1 className="text-[clamp(3rem,5vw,3.75rem)] font-black text-[#0B0F29] leading-[1.05] tracking-tight whitespace-pre-line">
                  Our Best Work In Action
                </h1>
              </div>
            </div>

            {/* Right: Body text + CTAs */}
            <div className="flex-1 flex flex-col gap-8 pt-10 font-sans">
              <div className="flex flex-col gap-4">
                <p className="text-gray-500 text-lg leading-7 font-medium">
                  {data?.hero?.description ||
                    "Explore our diverse range of successful projects and case studies."}
                </p>
                <p className="text-gray-500 text-lg leading-7 font-medium whitespace-pre-line">
                  {/* Dummy data for second paragraph since it doesn't exist in PortfolioHeroData */}
                  We combine strategic thinking with beautifully crafted design
                  to build solutions that elevate your brand and drive actual
                  business results. Actionable metrics and user-friendly
                  interfaces are at the core of what we do.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={data?.hero?.ctaHref || "#"}
                  className="group/btn inline-flex items-center gap-2.5 bg-[#0B0F29] text-white py-3.5 px-9 rounded-full font-semibold tracking-wide border border-transparent font-sans text-[15px] transition-colors hover:bg-black hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                >
                  {data?.hero?.ctaText || "Start a Project"}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </a>
                <a
                  href={data?.hero?.viewProjectsHref || "/projects"}
                  className="inline-flex items-center gap-2.5 bg-transparent text-[#0B0F29] py-3.5 px-7 rounded-full font-semibold tracking-wide border border-gray-200 font-sans text-[15px] transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
                >
                  {data?.hero?.viewProjectsText || "View Previous Work"}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img
                src={
                  data?.collage?.mainImage?.[0] ||
                  "https://thegoldtechnologies.com/assets/svg/brands/aboutus.jpg"
                }
                alt={data?.collage?.mainImageTitle || "Our Portfolio"}
                className="w-full h-[500px] object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default HeroSection;
