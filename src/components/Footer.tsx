"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const MagneticButton = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.5, y: middleY * 0.5 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const Footer = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  // Live Time
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        }),
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      className="relative bg-white pt-10 px-2 md:px-4 pb-4 z-0"
      ref={containerRef}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="bg-[#020410] rounded-[3rem] md:rounded-[4rem] text-white overflow-hidden relative min-h-[85vh] flex flex-col justify-between p-8 md:p-16"
      >
        {/* Background Noise/Gradient */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_50%_-20%,#D4AF37,transparent_50%)]"></div>

        {/* Top Section: Nav & Detailed Contact */}
        <div className="flex flex-col xl:flex-row justify-between gap-12 relative z-10">
          {/* Brand & Addresses */}
          <div className="space-y-4 max-w-5xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
                <span className="text-[#020410] font-black text-xs">GT</span>
              </div>
              <span className="font-bold tracking-wider text-xl">
                THE GOLD TECHNOLOGIES
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-sm text-gray-400">
              <div className="space-y-4">
                <p className="text-gray-400 font-light leading-relaxed max-w-md text-sm">
                  Empowering visionaries with cutting-edge digital solutions. We
                  turn complex challenges into elegant, scalable technology.
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="font-medium">
                    Operating Worldwide • {time}
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D4AF37] mt-1 shrink-0" />
                  <div>
                    <strong className="text-white block mb-1">INDIA</strong>
                    <p>
                      SD-369, D block, Shastri Nagar,
                      <br />
                      Ghaziabad, Uttar Pradesh, India - 201002
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D4AF37] mt-1 shrink-0" />
                  <div>
                    <strong className="text-white block mb-1">USA</strong>
                    <p>
                      Accessible minds 1309- Coffeen Avenue,
                      <br />
                      STE 1200 Sheridan Wyoming- 82801, USA
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-white">+91 8368198551</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-white">
                    info@thegoldtechnologies.com
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-16 md:gap-24">
            <div className="flex flex-col gap-4">
              <h4 className="text-[#D4AF37] font-serif italic text-lg mb-2">
                Explore
              </h4>
              <a
                href="/about"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About Us
              </a>
              <a
                href="/service/website-design-development"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Services
              </a>
              <a
                href="/portfolio"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Portfolio
              </a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[#D4AF37] font-serif italic text-lg mb-2">
                Legal
              </h4>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Use
              </a>
              <span className="text-[10px] border border-gray-600 px-2 py-0.5 rounded text-gray-500 mt-2 w-fit">
                DMCA PROTECTED
              </span>
            </div>
          </div>
        </div>

        {/* Middle: Massive Text */}
        <div className="flex-1 flex items-center justify-center py-12 relative z-10 pointer-events-none select-none">
          <div className="relative">
            <span className="absolute -top-2 md:top-2 left-2 md:-left-10 text-sm font-bold tracking-[0.5em] text-white/20 mix-blend-overlay">
              THE
            </span>
            <h1 className="text-[13vw] leading-[0.8] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/5 text-center select-none pointer-events-none mix-blend-overlay opacity-30">
              GOLD TECH
            </h1>
            <span className="absolute bottom-0 md:bottom-2 right-2 md:-right-36 text-sm font-bold tracking-[0.5em] text-white/20 mix-blend-overlay">
              NOLOGIES
            </span>
          </div>
        </div>

        {/* Bottom: Magnetic Buttons & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-gray-500 text-sm">
              © 2026 The Gold Technologies.
            </p>

            {/* Women Owned Badge (Small) */}
            <div className="flex items-center gap-1 opacity-70 grayscale hover:grayscale-0 transition-all">
              <span className="text-xs font-bold text-white">
                W<span className="text-pink-500">✿</span>MEN OWNED
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <MagneticButton key={i} className="group">
                <button className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#020410] transition-all duration-300">
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </button>
              </MagneticButton>
            ))}
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors group"
          >
            Back to Top
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </button>
        </div>
      </motion.div>
    </footer>
  );
};
