"use client";

import { ServiceItemData } from "@/store/useCMSStore";
import { motion } from "framer-motion";
import { parseMarkdownLinks } from "@/utils/text";

function ServiceProcessCard({
  service,
  index,
}: {
  service: ServiceItemData;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative overflow-hidden group rounded-2xl sm:rounded-3xl bg-black p-6 sm:p-8 lg:p-10 min-h-[200px] sm:min-h-[220px] flex flex-col justify-end transition-all duration-500 hover:shadow-2xl hover:shadow-[#D4AF37]/10 border border-white/5"
    >
      {/* Backdrop Number */}
      <span
        className="absolute top-1 right-4 sm:right-6 lg:right-8 text-[7rem] sm:text-[9rem] md:text-[11rem] lg:text-[12rem] font-black leading-none select-none pointer-events-none transition-all duration-700 group-hover:scale-110"
        style={{
          color: "transparent",
          WebkitTextStroke: "1.5px rgba(212, 175, 55, 0.18)",
          fontFamily: "'Playfair Display', serif",
        }}
      >
        {service.number}
      </span>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl sm:text-2xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-[95%] sm:max-w-[90%] font-medium">
          {parseMarkdownLinks(service.description)}
        </p>
      </div>

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

export default function ServicesAccordion({
  serviceData,
  header,
}: {
  serviceData: ServiceItemData[] | undefined;
  header?: {
    upperTag: string;
    title: string;
    titleHighlight: string;
  };
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-16 lg:py-20 bg-white font-sans">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 md:mb-12 gap-6">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <span className="text-[#D4AF37] font-bold tracking-[0.3em] text-[10px] uppercase">
              {header?.upperTag || "What We Do"}
            </span>
            <div className="h-px w-10 md:w-12 bg-[#D4AF37]/30"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#0B0F29] tracking-tight leading-[1.1] md:leading-[1.05]">
            {header?.title || "Services That"} <br />
            <span className="font-serif italic text-[#D4AF37] font-medium">
              {header?.titleHighlight || "Drive Results"}
            </span>
          </h2>
        </div>
      </div>

      {/* Process Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10 md:mb-16">
        {serviceData?.map((service, index) => (
          <ServiceProcessCard
            key={service.number + index}
            service={service}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
