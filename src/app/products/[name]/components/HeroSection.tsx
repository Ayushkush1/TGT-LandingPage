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
    <div className="relative h-[72vh] min-h-[520px] flex flex-col justify-end overflow-hidden mx-2 rounded-3xl">
      <img
        src={product.image}
        alt={product.title}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

      <Link
        href="/portfolio#Portfolio"
        aria-label="Back to all products"
        className="absolute top-6 left-6 z-10 flex items-center gap-2 text-white/90 text-sm font-dm px-3 py-1.5 rounded-lg border border-white/20 bg-black/25 backdrop-blur-sm hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-black/30 transition-all duration-150"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        <span className="hidden md:inline">All Products</span>
      </Link>

      <div className="relative z-10 px-6 md:px-12 pb-12 max-w-4xl fade-up delay-100">
        {product.subtitle && (
          <div className="flex flex-wrap items-center gap-2 mb-5">
            {product.subtitle.split(",").map((tag, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold uppercase tracking-widest rounded-full"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        )}
        <h1 className="font-display text-3xl md:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.12] tracking-tight mb-5 max-w-3xl">
          {product.title}
        </h1>
        {product.description && (
          <p className="text-white/60 text-sm max-w-lg mb-8">
            {product.description}
          </p>
        )}
        {product.link && (
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-gold text-white px-8 py-3.5 rounded-full font-medium hover:bg-white hover:text-brand-nav transition-all duration-300 w-fit shadow-lg shadow-brand-gold/20"
          >
            Open Live App <ArrowRight size={18} className="translate-y-[1px]" />
          </a>
        )}
      </div>
    </div>
  );
}

export default HeroSection;
