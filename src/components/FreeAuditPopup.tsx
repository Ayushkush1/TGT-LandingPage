"use client";

import React, { useEffect, Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

export const FreeAuditPopup = ({
  setOpenAuditForm,
  openAuditForm,
}: {
  openAuditForm: boolean;
  setOpenAuditForm: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <AnimatePresence>
      {openAuditForm && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenAuditForm(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-lg rounded-[3rem] bg-white border drop-shadow-md border-gray-200 shadow-2xl overflow-hidden">
              {/* Close */}
              <button
                onClick={() => setOpenAuditForm(false)}
                className="absolute right-10 top-10 text-gray-400 hover:text-black"
              >
                <X />
              </button>

              {/* Content */}
              <div className="p-10 text-center">
                <h2 className="text-3xl font-semibold text-black tracking-tight">
                  Complimentary Audit
                </h2>

                <p className="text-gray-500 mt-3 mb-8">
                  Discover opportunities to improve performance, SEO, and user
                  experience with a comprehensive expert review.{" "}
                </p>
                {/* Form */}
                <form className="space-y-4 text-left">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:border-[#0B0F29] outline-none"
                  />

                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:border-[#0B0F29] outline-none"
                  />

                  <input
                    type="url"
                    placeholder="Website URL"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:border-[#0B0F29] outline-none"
                  />

                  <textarea
                    placeholder="What would you like to improve?"
                    rows={3}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:border-[#0B0F29] outline-none"
                  />

                  {/* CTA — SAME AS HERO BUTTON */}
                  <button
                    type="submit"
                    className="w-full mt-2 bg-[#0B0F29] text-white font-semibold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-black transition-all hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
                  >
                    Get My Free Audit
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>

                <p className="text-xs text-gray-400 mt-6">
                  No spam. Delivered within 24 hours.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
