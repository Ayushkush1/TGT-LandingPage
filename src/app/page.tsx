import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GrowthHero } from "@/components/sections/GrowthHero";
import { Showreel } from "@/components/sections/Showreel";
import { Manifesto } from "@/components/sections/Manifesto";
import { ServicePillars } from "@/components/sections/ServicePillars";
import { WorkShowcase } from "@/components/sections/WorkShowcase";
import { GrowthProcess } from "@/components/sections/GrowthProcess";
import { Testimonials } from "@/components/sections/Testimonials";
import { Insights } from "@/components/sections/Insights";
import { GrowthCTA } from "@/components/sections/GrowthCTA";
import { SmoothScroll } from "@/components/SmoothScroll";
import { StickyCTA } from "@/components/StickyCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-brand-gold/20">
      <SmoothScroll />
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/bg-4.jpg')`,
          }}
        />
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-white/85" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <GrowthHero /> {/* Positioning + proof */}
        <Showreel /> {/* Scroll-expanding wall of work */}
        <div className="bg-[#F4F1EA]">
          <Manifesto /> {/* Scroll-lit positioning statement */}
        </div>
        <ServicePillars /> {/* Brand / Build / Grow / Scale stacking cards */}
        <WorkShowcase /> {/* Horizontal case-study track */}
        <GrowthProcess /> {/* How we work */}
        <Testimonials /> {/* Client stories */}
        <Insights /> {/* Articles with cursor preview */}
        <GrowthCTA /> {/* Let's talk: book a call or send a brief */}
        <div className="bg-[#F4F1EA]">
          <Footer />
        </div>
      </div>
      <StickyCTA />
    </main>
  );
}
