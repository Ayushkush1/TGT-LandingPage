import { ArrowRight } from "lucide-react";

const AboutFirm = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className=" flex flex-col gap-10">
        {/* Left Column - Text Content */}
        <div className=" flex  gap-28 items-start">
          <h2 className="text-4xl md:text-5xl flex-shrink-0 font-extrabold text-[#0B0F29] tracking-tight leading-tight">
            About Us
          </h2>
          <div className=" flex flex-col gap-6">
            <p className="text-gray-500 text-lg leading-relaxed font-medium">
              We are a dynamic IT solutions and consulting firm dedicated to
              empowering businesses through technology-driven solutions. With a
              client-focused approach and a commitment to innovation, we
              specialize in transforming our clients’ digital journeys by
              providing high quality services that meet the evolving demands of
              the modern marketplace.
            </p>

            <div className="flex gap-4">
              <div className="flex gap-4">
                <button className="bg-[#0B0F29] text-white px-10 py-4 rounded-full font-semibold tracking-wide hover:bg-black transition-all duration-300 border border-transparent hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center gap-3 group">
                  See openings
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              <button className="bg-white flex-shrink-0 hover:bg-gray-50 text-gray-700 px-10 py-3.5 rounded-full font-medium border border-gray-300 transition-colors duration-200">
                Read more
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <img
              src="https://thegoldtechnologies.com/assets/svg/brands/aboutus.jpg"
              alt="Two professionals having a discussion at a table"
              className="w-full h-[450px] object-cover object-top"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutFirm;
