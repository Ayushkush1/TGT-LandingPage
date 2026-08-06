"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCMSStore } from "@/store/useCMSStore";

export const TrustedBy = () => {
  const data = useCMSStore((state) => state.homeData?.TrustedBySection);
  const logos = data?.images || [];
  return (
    <section className="py-10 xl:py-16 3xl:py-20 w-full max-w-full overflow-hidden">
      <div className="max-w-6xl xl:max-w-6xl 3xl:max-w-9xl mx-auto px-4 md:px-8 w-full max-w-full overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 w-full max-w-full min-w-0 overflow-hidden">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center md:text-left shrink-0"
          >
            <p className="text-sm font-semibold text-gray-900">
              {data?.mainLabel}
            </p>
            <p className="text-xs text-gray-500 mt-1">{data?.subLabel}</p>
          </motion.div>

          {/* Separator on desktop */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="hidden md:block w-px h-10 bg-gray-200 shrink-0"
          ></motion.div>

          {/* Logos Slider Mask */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="flex-1 min-w-0 max-w-full w-full overflow-hidden relative"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            }}
          >
            <div className="flex w-max animate-marquee items-center group-hover:pause">
              <div className="flex items-center pr-12 gap-8">
                {[...logos, ...logos, ...logos].map((logo, index) => (
                  <div
                    key={`${logo}-${index}`}
                    className="flex items-center justify-center min-w-[100px] sm:min-w-[120px] h-12 relative grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 px-3 sm:px-4"
                  >
                    <div className="relative w-20 sm:w-24 h-10 sm:h-12">
                      <Image
                        src={logo}
                        alt="Partner Logo"
                        fill
                        className="object-contain cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
