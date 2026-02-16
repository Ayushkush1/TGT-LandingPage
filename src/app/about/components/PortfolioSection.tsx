"use client";
import { AnimatedSection } from "@/components/AnimatedSection";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

interface Story {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
}

const PortfolioSection = () => {
  const [hoveredStory, setHoveredStory] = useState<Story | null>(null);

  const portfolios = [
    {
      id: 1,
      image: "/images/portfolioImg1.jpg",
      title: "GreatWaterFilters.com.au Website Development",
      CTA: "Water Purifier",
      link: "#",
      date: "Tue, 8 Mar 2022",
      description:
        "A full e-commerce and content website for Australia's water filter specialists, built for clarity, trust, and conversions.",
    },
    {
      id: 2,
      image: "/images/portfolioImg2.jpg",
      title: "MyWeekendTrip Website Development",
      CTA: "Tourism",
      link: "#",
      date: "Mon, 14 Nov 2023",
      description:
        "A booking and discovery platform for weekend getaways, helping travellers find and plan short trips with ease.",
    },
    {
      id: 3,
      title: "Label Website Development",
      CTA: "Corporate Garments",
      image: "/images/portfolioImg3.jpg",
      link: "#",
      date: "Wed, 21 Jun 2023",
      description:
        "A professional web presence for a corporate garments and labelling company, showcasing products and capabilities.",
    },
    {
      id: 4,
      title:
        "ERP Software to centralise Internal Processes– Bir Credit Solution",
      CTA: "Finance Solutions",
      image: "/images/portfolioImg4.png",
      link: "#",
      date: "Thu, 12 Jan 2024",
      description:
        "Custom ERP software to streamline internal processes, reporting, and operations for a credit solutions provider.",
    },
    {
      id: 5,
      title: "The Social Beacon Website Redesign",
      CTA: "Digital Marketing Agency",
      image: "/images/portfolioImg5.jpg",
      link: "#",
      date: "Fri, 5 Sep 2023",
      description:
        "A modern redesign for a digital marketing agency, reflecting their brand and showcasing services and results.",
    },
    {
      id: 6,
      title: "The Embassy Inn Website Development and Digital Marketing",
      CTA: "Hotels",
      image: "/images/portfolioImg6.jpg",
      link: "#",
      date: "Mon, 18 Dec 2023",
      description:
        "Website and digital marketing for a boutique hotel, driving bookings and telling the property's story.",
    },
  ];

  // Derive blog/story data from portfolios
  const sideStories: Story[] = portfolios.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description ?? p.CTA,
    date: p.date,
    image: p.image,
  }));

  const featuredStory: Story = sideStories[0];

  // Duplicate stories for seamless loop
  const duplicatedStories: Story[] = [...sideStories, ...sideStories];

  // Calculate heights
  const cardHeight: number = 150;
  const gap: number = 16;
  const itemHeight: number = cardHeight + gap;
  const visibleCards: number = 3;
  const containerHeight: number =
    cardHeight * visibleCards + gap * (visibleCards - 2);

  return (
    <AnimatedSection animation="scaleIn" delay={0.2}>
      <div
        className="targeted-element light-element flex flex-col items-center max-w-7xl mx-auto 
 justify-center mid:gap-[0rem] gap-[2.5rem] mid:pb-[14rem] mid:pt-[9rem] mid:py-0"
      >
        {/* Section Header */}
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

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left Column - Featured Story / Hover Preview */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {!hoveredStory ? (
                <motion.div
                  key="featured"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-100 rounded-2xl overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="bg-gray-200 h-[260px] flex items-center justify-center overflow-hidden">
                    <img
                      src={featuredStory.image}
                      alt={featuredStory.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="px-8 py-6 flex flex-col gap-4">
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                      {featuredStory.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-base">
                      {featuredStory.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-gray-600 justify-between">
                      <span>{featuredStory.date}</span>

                      <button className="flex items-center text-md gap-2">
                        {" "}
                        read more <ArrowRight className=" text-sm" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={`hovered-${hoveredStory.id}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-100 rounded-2xl overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="bg-gray-200 h-[260px] flex items-center justify-center overflow-hidden">
                    <img
                      src={hoveredStory.image}
                      alt={hoveredStory.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="px-8 py-6 flex flex-col gap-4">
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                      {hoveredStory.title}
                    </h3>
                    <h3 className="text-2xl font-bold text-gray-900  line-clamp-2"></h3>
                    <p className="text-gray-500 leading-relaxed text-base">
                      {hoveredStory.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm text-gray-600 justify-between">
                      <span>{hoveredStory.date}</span>

                      <button className="flex items-center text-md gap-2">
                        {" "}
                        read more <ArrowRight className=" text-sm" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Animated Scrolling Stories */}
          <div
            className="relative overflow-hidden"
            style={{ height: `${containerHeight}px` }}
          >
            <motion.div
              className="flex flex-col gap-4"
              animate={{
                y: [0, -(sideStories.length * itemHeight)],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
            >
              {duplicatedStories.map((story, index) => (
                <div
                  key={index}
                  className={`bg-gray-100 rounded-2xl gap-5 py-4 px-6 flex items-center group cursor-pointer  transition-all duration-200 ${
                    hoveredStory?.id === story.id
                      ? "hover:bg-black  hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                      : "hover:bg-gray-200"
                  }`}
                  style={{
                    height: `${cardHeight}px`,
                    minHeight: `${cardHeight}px`,
                  }}
                  onMouseEnter={() => setHoveredStory(story)}
                  // onMouseLeave={() => setHoveredStory(null)}
                >
                  <div className="w-20 h-full bg-gray-200 rounded-xl flex-shrink-0 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="py-2 flex flex-col gap-0.5 w-full overflow-hidden">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-white truncate">
                      {story.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-sm group-hover:text-white line-clamp-2">
                      {story.description}
                    </p>
                    <p className="text-gray-500 leading-relaxed text-xs group-hover:text-white">
                      {story.date}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Gradient Overlays for smooth fade */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default PortfolioSection;
