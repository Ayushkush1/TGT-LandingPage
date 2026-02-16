"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

type Service = {
  number: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  outcome: string;
};

const SERVICES: Service[] = [
  {
    number: "01",
    title: "Creative Direction",
    category: "Strategy · Branding",
    description:
      "We define the visual and strategic foundation of your brand to ensure consistency across every touchpoint.",
    tags: ["Brand Vision", "Art Direction", "Positioning", "Identity"],
    outcome: "Established a cohesive brand presence across all platforms.",
  },
  {
    number: "02",
    title: "Product & UX Design",
    category: "Design · Experience",
    description:
      "Designing intuitive, elegant digital products focused on usability, aesthetics, and real user needs.",
    tags: ["UX Research", "Wireframes", "UI Systems", "Prototyping"],
    outcome: "Improved user engagement and satisfaction significantly.",
  },
  {
    number: "03",
    title: "Web & App Development",
    category: "Engineering · Technology",
    description:
      "Building high-performance websites and applications using modern frameworks and scalable architecture.",
    tags: ["Next.js", "React", "Performance", "Scalability"],
    outcome:
      "Delivered lightning-fast experiences with seamless functionality.",
  },
  {
    number: "04",
    title: "Growth & Optimization",
    category: "Marketing · Analytics",
    description:
      "Data-driven marketing strategies to scale your business, increase visibility, and maximize conversions.",
    tags: ["SEO", "Analytics", "Campaigns", "Conversion"],
    outcome: "Achieved consistent growth and measurable ROI.",
  },
];

function ServiceRow(service: Service) {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      className="relative border-b border-gray-200 overflow-hidden transition-all duration-500 hover:bg-gray-50"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Accent Bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full bg-[#D4AF37] transition-all duration-500"
        style={{
          transform: hovered ? "scaleY(1)" : "scaleY(0)",
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Header */}
      <div className="grid grid-cols-[80px_1fr_auto] lg:grid-cols-[120px_1fr_auto] items-center px-6 lg:px-12 py-8">
        {/* Number */}
        <span
          className="font-serif text-3xl font-black tracking-tight"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: hovered ? "#D4AF37" : "rgba(11,15,41,0.12)",
          }}
        >
          {service.number}
        </span>

        {/* Title */}
        <div className=" flex flex-col gap-0.5">
          <h2 className="text-lg font-extrabold text-[#0B0F29] tracking-tight leading-tight">
            {service.title}
          </h2>
          <span className="text-gray-400 text-sm leading-7 font-medium">
            {service.category}
          </span>
        </div>

        {/* CTA Icon */}
        <div
          className="w-11 h-11 group rounded-full border flex items-center justify-center transition-all duration-300"
          style={{
            borderColor: "#D4AF37",
            background: hovered ? "#D4AF37" : "#ffffff",
            transform: hovered ? "rotate(-45deg)" : "rotate(0deg)",
          }}
        >
          <ArrowRight size={14} className="text-[#0B0F29]" />
        </div>
      </div>

      {/* Expand Panel */}
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: hovered ? "300px" : "0px" }}
      >
        <div
          className="lg:px-10 pb-10 grid lg:grid-cols-[120px_1fr_280px] gap-8"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(10px)",
          }}
        >
          <div className="hidden lg:block" />

          {/* Description */}
          <div>
            <p className="text-gray-500 leading-relaxed mb-5">
              {service.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-gray-200 text-gray-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function ServicesAccordion() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 bg-white">
      {/* Header Section */}
      <div className="flex items-end justify-between mb-16 px-2">
        <div className="max-w-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#D4AF37]"></div>
            <span className="text-[#D4AF37] font-bold tracking-[0.2em] text-xs uppercase">
              What We Do
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B0F29] tracking-tight leading-tight">
            Services That <br />
            <span className="font-serif italic text-[#D4AF37]">
              Drive Results
            </span>
          </h2>
        </div>

        <button className="hidden md:flex items-center gap-2 text-[#0B0F29] font-bold uppercase tracking-widest hover:text-[#D4AF37] transition-colors group text-xs border-b border-[#0B0F29] pb-1 hover:border-[#D4AF37]">
          Explore All Services
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <ul className="border-t border-gray-200">
        {SERVICES.map((service) => (
          <ServiceRow key={service.number} {...service} />
        ))}
      </ul>
    </section>
  );
}
