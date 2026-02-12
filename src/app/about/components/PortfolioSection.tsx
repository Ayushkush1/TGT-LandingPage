"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const portfolios = [
  {
    id: 1,
    image: "/images/portfolioImg1.jpg",
    title: "GreatWaterFilters.com.au Website Development",
    CTA: "Water Purifier",
    link: "#",
  },
  {
    id: 2,
    image: "/images/portfolioImg2.jpg",
    title: "MyWeekendTrip Website Development",
    CTA: "Tourism",
    link: "#",
  },
  {
    id: 3,
    title: "Label Website Development",
    CTA: "Corporate Garments",
    image: "/images/portfolioImg3.jpg",
    link: "#",
  },
  {
    id: 4,
    title: "ERP Software to centralise Internal Processes– Bir Credit Solution",
    CTA: "Finance Solutions",
    image: "/images/portfolioImg4.png",
    link: "#",
  },
  {
    id: 5,
    title: "The Social Beacon Website Redesign",
    CTA: "Digital Marketing Agency",
    image: "/images/portfolioImg5.jpg",
    link: "#",
  },
  {
    id: 6,
    title: "The Embassy Inn Website Development and Digital Marketing",
    CTA: "Hotels",
    image: "/images/portfolioImg6.jpg",
    link: "#",
  },
];

function PortfolioSection() {
  return (
    <AnimatedSection animation="scaleIn" delay={0.2}>
      <div
        className="targeted-element light-element flex flex-col items-center max-w-7xl mx-auto 
 justify-center mid:gap-[0rem] gap-[2.5rem] mid:pb-[14rem] mid:pt-[9rem] mid:py-0"
      >
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 bg-gray-400/30"></div>
            <span className="text-gray-400 font-bold tracking-[0.2em] text-xs uppercase">
              Our Portfolio
            </span>
            <div className="h-px w-8 bg-gray-400/30"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B0F29] leading-[1.15] mb-6 tracking-tight">
            Showcasing{" "}
            <span className="font-serif italic font-medium text-[#D4AF37]">
              Our Work
            </span>{" "}
            <br />
            Crafting{" "}
            <span className="relative inline-block z-10">
              Digital Excellence
              <span className="absolute bottom-2 left-0 w-full h-3 bg-[#D4AF37] -z-10 opacity-60 transform -rotate-1 rounded-sm"></span>
            </span>
            .
          </h2>

          <p className="text-lg text-gray-500 font-light leading-relaxed max-w-2xl mx-auto">
            Explore a curated collection of projects delivered by{" "}
            <span className="font-semibold text-gray-900">
              The Gold Technologies
            </span>
            . From innovative web applications to scalable digital platforms,
            our portfolio reflects creativity, technical expertise, and
            measurable impact.
          </p>
        </div>

        {/* Portfolio Work */}
        <motion.section
          className="grid grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {portfolios.map((portfolio) => {
            const wideItems = [1, 4, 5];

            return (
              <motion.div
                key={portfolio.id}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`rounded-3xl overflow-hidden h-[300px] cursor-pointer group relative
          ${wideItems.includes(portfolio.id) ? "col-span-2" : ""}`}
              >
                {/* Image with zoom on hover */}
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <img
                    src={portfolio?.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Bottom overlay */}
                <div className="absolute bottom-0 w-full flex gap-2 py-4 px-4">
                  <div className="absolute bottom-0 w-full h-full left-0 bg-black opacity-65" />

                  <motion.div
                    className="flex items-center w-full text-white z-10 justify-between"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <h2 className="text-base text-white font-light leading-relaxed">
                      {portfolio?.title}
                    </h2>

                    {/* Arrow animates right on card hover */}
                    <motion.span
                      className="text-sm flex items-center gap-2"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      read more
                      <motion.span
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="text-sm" />
                      </motion.span>
                    </motion.span>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.section>
      </div>
    </AnimatedSection>
  );
}

export default PortfolioSection;
