"use client";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { TrustedBy } from "@/components/sections/TrustedBy";
import VideoSection from "../about/components/VideoSection";
import VisionSection from "../about/components/VisionSection";
import { OurPartners } from "@/components/sections/OurPartners";
import { OurReputation } from "@/components/sections/OurReputation";
import { Integrations } from "@/components/sections/Integrations";
import HeroSection, {
  containerVariants,
  itemVariants,
  Pillar,
  PillarCard,
} from "../service/ui-ux-designing/HeroSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const productHeroContent = {
  label: "Our Product",
  headingLines: ["Smart", "Digital", "Product"],
  paragraphs: [
    "Our product is designed to simplify workflows, enhance productivity, and deliver seamless digital experiences. Built with scalability and performance in mind, it empowers businesses to manage operations efficiently from a single powerful platform.",
    "With an intuitive interface, advanced analytics, and secure architecture, our solution helps organizations make smarter decisions, automate processes, and accelerate growth in today’s fast-paced digital environment.",
  ],
  cta: { text: "Explore Product", href: "/products/" },
  image: {
    src: "/images/Product1.png",
    alt: "Team collaborating on product development",
  },
  image2: {
    src: "/images/Product2.png",
    alt: "Team collaborating on product development",
  },
  statSince: "2015",
  statProjects: "500+",
  pillars: [
    {
      number: "01",
      title: "All-in-One ERP Solution",
      desc: "Manage finance, HR, sales, inventory, and operations from a single unified platform.",
    },
    {
      number: "02",
      title: "Real-Time Data & Insights",
      desc: "Make smarter decisions with live dashboards, analytics, and detailed reporting tools.",
    },
    {
      number: "03",
      title: "Process Automation",
      desc: "Automate repetitive tasks and workflows to improve efficiency and reduce manual errors.",
    },
    {
      number: "04",
      title: "Secure & Cloud-Based",
      desc: "Access your business data anytime, anywhere with enterprise-grade security and reliability.",
    },
  ] as Pillar[],
  pillars2: [
    {
      number: "01",
      title: "Smart Product Catalog",
      desc: "Organize and showcase products in a clean, structured catalog for easy browsing and discovery.",
    },
    {
      number: "02",
      title: "Advanced Search & Filters",
      desc: "Quickly find items using powerful search, categories, and filtering options.",
    },
    {
      number: "03",
      title: "Modern Responsive UI",
      desc: "Designed with a sleek, mobile-friendly interface for a seamless experience across devices.",
    },
    {
      number: "04",
      title: "Efficient Catalog Management",
      desc: "Easily add, update, and manage products with a streamlined workflow.",
    },
  ] as Pillar[],
};

function ProductPage() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-brand-gold/20">
      {/* Unified Background Wrapper for Navbar + Hero */}
      <div className="relative">
        {/* Noise Texture Background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          {/* <HeroSection {...productHeroContent} /> */}
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={containerVariants}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white font-serif"
          >
            {/* ── Top Row ── */}
            <div className="flex flex-col lg:flex-row gap-20 items-center mb-16">
              {/* Left: Vertical accent + heading */}
              <motion.div
                variants={itemVariants}
                className="flex gap-6 items-start flex-shrink-0 lg:w-96"
              >
                {/* Vertical rule + rotated label */}
                <div className="flex flex-col items-center gap-4 pt-2">
                  <div className="w-0.5 h-16 rounded-sm bg-gradient-to-b from-[#D4AF37] to-[#D4AF37]/10" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-semibold font-sans [writing-mode:vertical-rl] [text-orientation:mixed]">
                    {productHeroContent?.label}
                  </span>
                </div>

                <div>
                  {/* Big editorial heading */}
                  <h2 className="text-[clamp(3rem,5vw,3.75rem)] font-black text-[#0B0F29] leading-[1.05] tracking-tight">
                    {productHeroContent?.headingLines.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < productHeroContent?.headingLines.length - 1 && (
                          <br />
                        )}
                      </span>
                    ))}
                  </h2>
                </div>
              </motion.div>

              {/* Right: Body text + CTAs */}
              <motion.div
                variants={itemVariants}
                className="flex-1 flex flex-col gap-8 pt-10 font-sans"
              >
                <div className="flex flex-col gap-4">
                  {productHeroContent?.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="text-gray-500 text-lg leading-7 font-medium"
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={productHeroContent?.cta.href}
                      className="group/btn inline-flex items-center gap-2.5 bg-[#0B0F29] text-white py-3.5 px-9 rounded-full font-semibold tracking-wide border border-transparent font-sans text-[15px] transition-colors hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.35)]"
                    >
                      {productHeroContent?.cta.text}
                      <ArrowRight />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* ── Bottom Row: Image + Pillar Cards ── */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              {/* Image block */}
              <motion.div
                variants={itemVariants}
                className="relative rounded-3xl overflow-hidden min-h-[460px] shadow-xl"
              >
                <img
                  src={productHeroContent?.image.src}
                  alt={productHeroContent?.image.alt}
                  className="w-full h-full object-cover object-top absolute inset-0"
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-b from-transparent from-[40%] to-[rgba(11,15,41,0.6)]"
                  aria-hidden
                />

                {/* Stat — bottom left */}
                {productHeroContent?.statSince && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="absolute bottom-7 left-7 z-10 bg-white rounded-2xl p-4 shadow-[0_20px_60px_rgba(11,15,41,0.15)] border border-[#D4AF37]/20 font-sans"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-1">
                      Excellence since
                    </p>
                    <p className="text-3xl font-black leading-none text-[#0B0F29] font-serif">
                      {productHeroContent?.statSince}
                    </p>
                    <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-[#D4AF37] to-transparent" />
                  </motion.div>
                )}

                {/* Stat — top right */}
                {productHeroContent?.statProjects && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="absolute top-7 right-7 z-10 bg-white rounded-2xl p-4 shadow-[0_20px_60px_rgba(11,15,41,0.15)] border border-[#D4AF37]/20 font-sans"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-1">
                      Projects delivered
                    </p>
                    <p className="text-3xl font-black leading-none text-[#0B0F29] font-serif">
                      {productHeroContent?.statProjects}
                      <span className="text-[#D4AF37]">+</span>
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Pillars 2×2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
                {productHeroContent?.pillars.map((p) => (
                  <PillarCard key={p.number} {...p} />
                ))}
              </div>
            </motion.div>
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 items-center "
            >
              {/* Pillars 2×2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
                {productHeroContent?.pillars2.map((p) => (
                  <PillarCard key={p.number} {...p} />
                ))}
              </div>

              {/* Image block */}
              <motion.div
                variants={itemVariants}
                className="relative rounded-3xl overflow-hidden min-h-[460px] shadow-xl"
              >
                <img
                  src={productHeroContent?.image2.src}
                  alt={productHeroContent?.image2.alt}
                  className="w-full h-full object-cover object-top absolute inset-0"
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-b from-transparent from-[40%] to-[rgba(11,15,41,0.6)]"
                  aria-hidden
                />

                {/* Stat — bottom left */}
                {productHeroContent?.statSince && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="absolute bottom-7 left-7 z-10 bg-white rounded-2xl p-4 shadow-[0_20px_60px_rgba(11,15,41,0.15)] border border-[#D4AF37]/20 font-sans"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-1">
                      Excellence since
                    </p>
                    <p className="text-3xl font-black leading-none text-[#0B0F29] font-serif">
                      {productHeroContent?.statSince}
                    </p>
                    <div className="mt-2 h-0.5 w-12 bg-gradient-to-r from-[#D4AF37] to-transparent" />
                  </motion.div>
                )}

                {/* Stat — top right */}
                {productHeroContent?.statProjects && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="absolute top-7 right-7 z-10 bg-white rounded-2xl p-4 shadow-[0_20px_60px_rgba(11,15,41,0.15)] border border-[#D4AF37]/20 font-sans"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 mb-1">
                      Projects delivered
                    </p>
                    <p className="text-3xl font-black leading-none text-[#0B0F29] font-serif">
                      {productHeroContent?.statProjects}
                      <span className="text-[#D4AF37]">+</span>
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </motion.section>
        </div>
      </div>
      <TrustedBy />
      <VideoSection />
      <VisionSection />
      <OurPartners />
      <OurReputation />
      <Integrations />
      <BlogSection /> {/* Blog Section */}
      <Footer />
    </main>
  );
}

export default ProductPage;
