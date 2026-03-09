"use client";

import { useCMSStore } from "@/store/useCMSStore";

export default function MapSection() {
  const data = useCMSStore((state) => state.contactData?.MapSection);
  console.log(data);
  return (
    <section className="py-16 bg-gray-50" id="location">
      <div className="text-center max-w-4xl mx-auto mb-20">
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
            {data?.headlineHighlight}
          </span>{" "}
          <br />
          {data?.headlinePart3}{" "}
          <span className="relative inline-block z-0">
            {data?.headlinePart4}
            <span className="absolute bottom-2 left-0 w-full h-3 bg-[#D4AF37] -z-10 opacity-60 transform -rotate-1 rounded-sm"></span>
          </span>
          .
        </h2>

        <p className="text-lg text-gray-500 font-light leading-relaxed max-w-xl mx-auto">
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

      <div className="rounded-2xl overflow-hidden max-w-6xl m-auto shadow-xl">
        <iframe
          src={data?.mapEmbedUrl}
          width="100%"
          height="550"
          className="border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
}
