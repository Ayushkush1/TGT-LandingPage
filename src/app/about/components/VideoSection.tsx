"use client";
import { AnimatedSection } from "@/components/AnimatedSection";
import { useCMSStore } from "@/store/useCMSStore";

function VideoSection({ data: propData }: { data?: any }) {
  const storeData = useCMSStore((state) => state.aboutData?.VideoSection);
  const data = propData || storeData;

  return (
    <AnimatedSection animation="scaleIn" delay={0.2}>
      <div
        className=" targeted-element bg-[#F3F4F8] light-element flex flex-col items-center 
 justify-center mid:gap-[0rem] gap-[2.5rem] mid:pb-[14rem] mid:pt-[9rem] py-[4rem] mid:py-0"
      >
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-20 px-4 md:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#0B0F29] leading-[1.2] md:leading-[1.15] mb-4 md:mb-6 tracking-tight">
            {data?.headingPart1}{" "}
            <span className="font-serif italic font-medium text-[#D4AF37]">
              {data?.headingHighlight1}
            </span>{" "}
            <br />
            {data?.headingPart2}{" "}
            <span className="relative inline-block z-0">
              {data?.headingHighlight2}
              <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-2 md:h-3 bg-[#D4AF37] -z-10 opacity-60 transform -rotate-1 rounded-sm"></span>
            </span>
          </h2>

          <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed max-w-xl mx-auto px-2 md:px-0">
            {data?.descriptionText
              ?.split(/(The Gold Technologies)/)
              .map((part: string, i: number) =>
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
          <div className="w-[92%] sm:w-[90%] h-[220px] sm:h-[380px] md:h-[480px] lg:h-[600px] m-auto rounded-2xl sm:rounded-3xl md:rounded-[3rem] overflow-hidden">
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
