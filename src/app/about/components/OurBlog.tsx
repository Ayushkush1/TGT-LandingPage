"use client";
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

const OurBlog = () => {
  const [hoveredStory, setHoveredStory] = useState<Story | null>(null);

  // Sample data for the stories
  const featuredStory: Story = {
    id: 1,
    title: "How to Get More Traffic to Your Blog: SEO Tips from the Pros",
    description:
      "Have you ever wondered how some bloggers manage to rank on the first page of Google for almost any keyword they want?",
    date: "Wed, 12 Nov 2023",
    image: "/images/Blog1.jpg",
  };

  const sideStories: Story[] = [
    {
      id: 1,
      title: "How to Get More Traffic to Your Blog: SEO Tips from the Pros",
      description:
        "Have you ever wondered how some bloggers manage to rank on the first page of Google for almost any keyword they want?",
      date: "Wed, 12 Nov 2023",
      image: "/images/Blog1.jpg",
    },
    {
      id: 2,
      title: "The Fundamentals of SEO: A Beginner's Guide",
      image: "/images/Blog2.jpg",
      description:
        " Do you want to boost your online presence and attract more visitors to your website? If so, you need to master the art of SEO.",
      date: "Wed, 12 Nov 2023",
    },
    {
      id: 3,
      title: "Boost Your Website's Speed: A Simple Guide to Optimization",
      image: "/images/Blog3.jpg",
      date: "5 hours ago",
      description:
        "Did you know that 40% of people abandon a website that takes more than 3 seconds to load?",
    },
  ];

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-16 px-2">
        <div className="max-w-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-[#D4AF37]"></div>
            <span className="text-[#D4AF37] font-bold tracking-[0.2em] text-xs uppercase">
              Our Blog
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#0B0F29] tracking-tight leading-tight">
            Insights & <br />
            <span className="font-serif italic text-[#D4AF37]">
              Perspectives
            </span>
          </h2>
        </div>

        <button className="hidden md:flex items-center gap-2 text-[#0B0F29] font-bold uppercase tracking-widest hover:text-[#D4AF37] transition-colors group text-xs border-b border-[#0B0F29] pb-1 hover:border-[#D4AF37]">
          View All Articles
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
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
  );
};

export default OurBlog;
