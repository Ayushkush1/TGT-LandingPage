"use client";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useCMSStore } from "@/store/useCMSStore";

function VideoSection() {
  const data = useCMSStore((state) => state.aboutData?.VideoSection);

  return (
    <AnimatedSection animation="scaleIn" delay={0.2}>
      <div
        className=" targeted-element bg-[#F3F4F8] light-element flex flex-col items-center 
 justify-center mid:gap-[0rem] gap-[2.5rem] mid:pb-[14rem] mid:pt-[9rem] py-[4rem] mid:py-0"
      >
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B0F29] leading-[1.15] mb-6 tracking-tight">
            {data?.headingPart1}{" "}
            <span className="font-serif italic font-medium text-[#D4AF37]">
              {data?.headingHighlight1}
            </span>{" "}
            <br />
            {data?.headingPart2}{" "}
            <span className="relative inline-block z-0">
              {data?.headingHighlight2}
              <span className="absolute bottom-2 left-0 w-full h-3 bg-[#D4AF37] -z-10 opacity-60 transform -rotate-1 rounded-sm"></span>
            </span>
          </h2>

          <p className="text-lg text-gray-500 font-light leading-relaxed max-w-xl mx-auto">
            {data?.descriptionText
              ?.split(/(The Gold Technologies)/)
              .map((part, i) =>
                part === "The Gold Technologies" ? (
                  <span key={i} className="font-semibold text-gray-900">
                    {part}
                  </span>
                ) : (
                  part
                ),
              )}
          </p>
        </div>

        {/* Video section */}
        <section className="max-w-7xl w-full">
          <div className=" w-[90%] h-[600px] m-auto rounded-[3rem] overflow-hidden">
            <iframe
              className="w-full h-full"
              src={data?.videoUrl}
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
