"use client";
import { AnimatedSection } from "@/components/AnimatedSection";

function VideoSection() {
  return (
    <AnimatedSection animation="scaleIn" delay={0.2}>
      <div
        className=" targeted-element bg-[#F3F4F8] light-element flex flex-col items-center 
 justify-center mid:gap-[0rem] gap-[2.5rem] mid:pb-[14rem] mid:pt-[9rem] py-[4rem] mid:py-0"
      >
        {/* Heading */}

        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B0F29] leading-[1.15] mb-6 tracking-tight">
            Innovation Crafted <br />
            With{" "}
            <span className="font-serif italic font-medium text-[#D4AF37]">
              Excellence
            </span>{" "}
            <span className="relative inline-block z-10"></span>.
          </h2>

          <p className="text-lg text-gray-500 font-light leading-relaxed max-w-xl mx-auto">
            At{" "}
            <span className="font-semibold text-gray-900">
              The Gold Technologies{" "}
            </span>
            We help businesses innovate, grow, and scale through smart, reliable
            technology solutions tailored for real results.
          </p>
        </div>

        {/* Video section */}
        <section className="max-w-7xl w-full">
          <div className=" w-[90%] h-[600px] m-auto rounded-3xl overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/Zp1fuVhlP6o?si=M7ocbQbSEnPKZ0EQ"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      </div>
    </AnimatedSection>
  );
}

export default VideoSection;
