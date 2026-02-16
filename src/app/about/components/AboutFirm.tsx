import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowRight } from "lucide-react";

const AboutFirm = () => {
  return (
    <AnimatedSection animation="scaleIn" delay={0.2}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className=" flex flex-col gap-10">
          {/* Left Column - Text Content */}

          {/* ── Top Row ── */}
          <div className="flex flex-col lg:flex-row gap-20 items-center mb-16">
            {/* Left: Vertical accent + heading */}
            <div className="flex gap-6 items-start flex-shrink-0 lg:w-96">
              {/* Vertical rule + rotated label */}
              <div className="flex flex-col items-center gap-4 pt-2">
                <div className="w-0.5 h-16 rounded-sm bg-gradient-to-b from-[#D4AF37] to-[#D4AF37]/10" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-gray-400 font-semibold font-sans [writing-mode:vertical-rl] [text-orientation:mixed]">
                  Who We Are
                </span>
              </div>

              <div>
                {/* Big editorial heading */}
                <h2 className="text-[clamp(3rem,5vw,3.75rem)] font-black text-[#0B0F29] leading-[1.05] tracking-tight">
                  The <br /> Gold
                  <br />
                  Technologies
                </h2>
              </div>
            </div>

            {/* Right: Body text + CTAs */}
            <div className="flex-1 flex flex-col gap-8 pt-10 font-sans">
              <div className="flex flex-col gap-4">
                <p className="text-gray-500 text-lg leading-7 font-medium">
                  We are a dynamic IT solutions and consulting firm dedicated to
                  empowering businesses through technology-driven solutions.
                  With a client-focused approach and a commitment to innovation,
                  we specialize in transforming our clients&apos; digital
                  journeys.
                </p>
                <p className="text-gray-500 text-lg leading-7 font-medium">
                  Since 2015, we have been your dedicated partner in the digital
                  age — providing comprehensive IT consultation and cutting-edge
                  solutions to help you navigate the ever-evolving landscape of
                  technology.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="/#contactUs"
                  className="group/btn inline-flex items-center gap-2.5 bg-[#0B0F29] text-white py-3.5 px-9 rounded-full font-semibold tracking-wide border border-transparent font-sans text-[15px] transition-colors hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.35)]"
                >
                  Get in touch
                  <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                </a>
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
    </AnimatedSection>
  );
};

export default AboutFirm;
