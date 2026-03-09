"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCMSStore } from "@/store/useCMSStore";

export const TrustedBy = () => {
  const data = useCMSStore((state) => state.homeData?.TrustedBySection);
  const logos = data?.images || [];
  return (
    <section className="py-10 xl:py-16 3xl:py-20">
      <div className="max-w-6xl xl:max-w-6xl 3xl:max-w-9xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center md:text-left"
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
            className="hidden md:block w-px h-10 bg-gray-200"
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
            className="flex-1 overflow-hidden relative"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
            }}
          >
            <div className="flex w-max animate-marquee items-center group-hover:pause">
              <div className="flex items-center pr-12 gap-8">
                {[...logos, ...logos, ...logos].map((logo, index) => (
                  <div
                    key={`${logo}-${index}`}
                    className="flex items-center justify-center min-w-[120px] h-12 relative grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 px-4"
                  >
                    <div className="relative w-20 h-8 ">
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
