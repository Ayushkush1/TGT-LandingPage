"use client";
import React, { useState, useEffect, useRef } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
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
import { motion, useScroll, useInView } from "framer-motion";

import { useCMSStore } from "@/store/useCMSStore";
import Link from "next/link";

export const Footer = () => {
  const data = useCMSStore((state) => state.homeData?.FooterCMS);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  return (
    <footer className="relative pt-10 px-2 md:px-4 pb-4 z-0" ref={containerRef}>
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
                {data?.companyName}
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-sm text-gray-400">
              <div className="space-y-4">
                <p className="text-gray-400 font-light leading-relaxed max-w-md text-sm">
                  {data?.footerDescription}
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="font-medium">{data?.companyInitials}</span>
                </div>
              </div>
              <div className="space-y-4">
                {data?.loc1Country && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#D4AF37] mt-1 shrink-0" />
                    <div>
                      <strong className="text-white block mb-1">
                        {data?.loc1Country}
                      </strong>
                      <p>{data?.loc1Address}</p>
                    </div>
                  </div>
                )}
                {data?.loc2Country && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#D4AF37] mt-1 shrink-0" />
                    <div>
                      <strong className="text-white block mb-1">
                        {data?.loc2Country}
                      </strong>
                      <p>{data?.loc2Address}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-white">{data?.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-white">{data?.emailAddress}</span>
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
              <Link
                href="/about"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/portfolio"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Portfolio
              </Link>
              <Link
                href="/#BlogSection"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Blogs
              </Link>
              <Link
                href="/service/branding"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Branding
              </Link>
              <Link
                href="/service/ai-ml-solutions"
                className="text-gray-400 hover:text-white transition-colors"
              >
                AI & ML
              </Link>
              <Link
                href="/service/iot-solutions"
                className="text-gray-400 hover:text-white transition-colors"
              >
                IoT
              </Link>
              <Link
                href="/service/accessibility-services"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Accessibility
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-[#D4AF37] font-serif italic text-lg mb-2">
                Services
              </h4>
              {[
                {
                  title: "",
                  link: "/service/website-design-development",
                },
                {
                  title: "UI/UX Design",
                  link: "/service/ui-ux-designing",
                },
                {
                  title: "Mobile App Dev",
                  link: "/service/mobile-app-development",
                },
                {
                  title: "Digital Marketing",
                  link: "/service/digital-marketing",
                },
                {
                  title: "Custom Software",
                  link: "/service/custom-software-development",
                },
                {
                  title: "BI Solutions",
                  link: "/service/business-intelligence-solutions",
                },
                {
                  title: "Business Software",
                  link: "/service/business-software-solutions",
                },
              ].map((service) => (
                <Link
                  key={service.link}
                  href={service.link}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {service.title}
                </Link>
              ))}
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
              <Link
                target="_blank"
                href="https://www.dmca.com/Protection/Status.aspx?ID=174176c9-e0fd-4010-b0f5-50e6ed21d715&refurl=https://thegoldtechnologies.com/"
                className="text-[10px] border border-gray-600 px-2 py-0.5 rounded text-gray-500 mt-2 w-fit"
              >
                DMCA PROTECTED
              </Link>
            </div>
          </div>
        </div>

        {/* Middle: Massive Text */}
        <div className="flex-1 flex items-center justify-center py-12 relative z-10 pointer-events-none select-none">
          <div className="relative">
            <span className="absolute -top-2 uppercase md:top-2 left-2 md:-left-10 text-sm font-bold tracking-[0.5em] text-white/20 mix-blend-overlay">
              {data?.leftText ?? "THE"}
            </span>
            <h1 className="text-[13vw] leading-[0.8] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/5 text-center select-none pointer-events-none mix-blend-overlay opacity-30">
              {data?.centerText}
            </h1>
            <span className="absolute uppercase bottom-0 md:bottom-2 right-2 md:-right-36 text-sm font-bold tracking-[0.5em] text-white/20 mix-blend-overlay">
              {data?.rightText}
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

            <img
              src="/images/womenowned-business.jpg"
              alt="womenowned-business"
              className="w-20 h-20"
            />
          </div>

          <div className="flex gap-4">
            {[
              {
                Icon: Facebook,
                url: data?.facebookUrl,
              },
              {
                Icon: Twitter,
                url: data?.twitterUrl,
              },
              {
                Icon: Instagram,
                url: data?.instagramUrl,
              },
              {
                Icon: Linkedin,
                url: data?.linkedinUrl,
              },
            ].map(({ Icon, url }, i) => (
              <MagneticButton key={i} className="group">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#020410] transition-all duration-300"
                >
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </a>
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
