import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  product: {
    title: string;
    subtitle?: string;
    description?: string;
    image: string;
    link?: string;
  };
}

function HeroSection({ product }: HeroSectionProps) {
  return (
    <div className="relative h-[55vh] sm:h-[65vh] lg:h-[72vh] min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] flex flex-col justify-end overflow-hidden mx-2 sm:mx-4 rounded-2xl sm:rounded-3xl">
      <img
        src={product.image}
        alt={product.title}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

      <Link
        href="/portfolio#Portfolio"
        aria-label="Back to all products"
        className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 flex items-center gap-2 text-white/90 text-xs sm:text-sm font-dm px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-white/20 bg-black/25 backdrop-blur-sm hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-black/30 transition-all duration-150"
      >
        <ArrowLeft size={14} className="sm:w-4 sm:h-4" aria-hidden="true" />
        <span className="inline">All Products</span>
      </Link>

      <div className="relative z-10 px-4 sm:px-8 md:px-12 pb-6 sm:pb-10 lg:pb-12 max-w-4xl fade-up delay-100">
        {product.subtitle && (
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-5">
            {product.subtitle.split(",").map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-semibold uppercase tracking-widest rounded-full"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
        <h1 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.12] tracking-tight mb-3 sm:mb-5 max-w-3xl">
          {product.title}
        </h1>
        {product.description && (
          <p className="text-white/70 text-xs sm:text-sm max-w-lg mb-4 sm:mb-8">
            {product.description}
          </p>
        )}
        {product.link && (
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-gold text-white px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-full text-xs sm:text-sm font-medium hover:bg-white hover:text-brand-nav transition-all duration-300 w-fit shadow-lg shadow-brand-gold/20"
          >
            Open Live App <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px] translate-y-[1px]" />
          </a>
        )}
      </div>
    </div>
  );
}

export default HeroSection;
