"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Logo or Main Graphic */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="relative w-24 h-24"
            >
              <div className="absolute inset-0 border-4 border-[#D4AF37]/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-t-[#D4AF37] rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-black text-[#0B0F29] font-serif">
                  TGT
                </span>
              </div>
            </motion.div>

            {/* Loading Bar */}
            <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="w-full h-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
              />
            </div>

            {/* Text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[10px] tracking-[0.3em] uppercase text-gray-400 font-bold"
            >
              Loading Excellence
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
