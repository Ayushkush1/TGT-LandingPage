"use client";

import { useCMSStore } from "@/store/useCMSStore";

export default function MapSection() {
  const data = useCMSStore((state) => state.contactData?.MapSection);
  return (
    <section
      className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50 px-4 sm:px-6"
      id="location"
    >
      <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16 lg:mb-20">
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="h-px w-8 bg-gray-400/30"></div>
          <span className="text-gray-400 font-bold tracking-[0.2em] text-[10px] md:text-xs uppercase">
            {data?.upperTag}
          </span>
          <div className="h-px w-8 bg-gray-400/30"></div>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0B0F29] leading-[1.15] mb-4 sm:mb-6 tracking-tight">
          {data?.headlinePart1}{" "}
          <span className="font-serif italic font-medium text-[#D4AF37]">
            {data?.headlineHighlight}
          </span>{" "}
          <br />
          {data?.headlinePart3}{" "}
          <span className="relative inline-block z-0">
            {data?.headlinePart4}
            <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-2 md:h-3 bg-[#D4AF37] -z-10 opacity-60 transform -rotate-1 rounded-sm"></span>
          </span>
          .
        </h2>

        <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed max-w-xl mx-auto">
          {data?.mainParagraph
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

      <div className="rounded-2xl sm:rounded-3xl overflow-hidden max-w-6xl m-auto shadow-xl h-[280px] sm:h-[380px] md:h-[480px] lg:h-[550px] w-full">
        <iframe
          src={data?.mapEmbedUrl}
          width="100%"
          height="100%"
          className="border-0 w-full h-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}
