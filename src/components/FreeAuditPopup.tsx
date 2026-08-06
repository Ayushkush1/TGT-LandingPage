"use client";

import React, { useState, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Loader2, CheckCircle2 } from "lucide-react";

type AuditFormData = {
  name: string;
  email: string;
  webUrl: string;
  improve: string;
};

export const FreeAuditPopup = ({
  setOpenAuditForm,
  openAuditForm,
}: {
  openAuditForm: boolean;
  setOpenAuditForm: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, reset } = useForm<AuditFormData>();

  const onSubmit = async (formData: AuditFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("https://tgt-cms.vercel.app/api/audits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit audit request. Please try again later.");
      }

      setSubmitStatus("success");
      reset();
      
      // Auto-close after 3 seconds on success
      setTimeout(() => {
        setOpenAuditForm(false);
        setSubmitStatus("idle");
      }, 3000);
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            data-lenis-prevent
          >
            <div
              className="relative w-full max-w-lg rounded-2xl sm:rounded-[3rem] bg-white border border-gray-200 shadow-2xl overflow-hidden max-h-[90dvh] flex flex-col my-auto"
              data-lenis-prevent
            >
              {/* Close */}
              <button
                onClick={() => setOpenAuditForm(false)}
                className="absolute right-4 top-4 sm:right-8 sm:top-8 text-gray-400 hover:text-black z-20 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Content */}
              <div
                className="p-5 sm:p-10 text-center overflow-y-auto flex-1 min-h-0"
                data-lenis-prevent
              >
                {submitStatus === "success" ? (
                  <div className="py-6 sm:py-10 flex flex-col items-center space-y-3 sm:space-y-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37]">
                      <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
                    </div>
                    <h2 className="text-xl sm:text-3xl font-semibold text-black tracking-tight">
                      Request Received!
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500">
                      We'll be in touch with your complimentary audit within 24 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl sm:text-3xl font-semibold text-black tracking-tight pr-8 sm:pr-0">
                      Complimentary Audit
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-500 mt-2 mb-4 sm:mb-6 leading-relaxed">
                      Discover opportunities to improve performance, SEO, and user
                      experience with a comprehensive expert review.
                    </p>
                    
                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4 text-left">
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        placeholder="Your Name"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-black placeholder-gray-400 focus:border-[#0B0F29] outline-none"
                      />

                      <input
                        {...register("email", { required: true })}
                        type="email"
                        placeholder="Your Email"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-black placeholder-gray-400 focus:border-[#0B0F29] outline-none"
                      />

                      <input
                        {...register("webUrl", { required: true })}
                        type="url"
                        placeholder="Website URL"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-black placeholder-gray-400 focus:border-[#0B0F29] outline-none"
                      />

                      <textarea
                        {...register("improve", { required: true })}
                        placeholder="What would you like to improve?"
                        rows={3}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-black placeholder-gray-400 focus:border-[#0B0F29] outline-none resize-none"
                      />

                      {submitStatus === "error" && (
                        <p className="text-red-500 text-xs sm:text-sm text-center">{errorMessage}</p>
                      )}

                      {/* CTA */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-2 bg-[#0B0F29] text-white font-semibold py-3 sm:py-4 rounded-full flex items-center justify-center gap-2 text-sm sm:text-base hover:bg-black transition-all hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            Processing...
                            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                          </>
                        ) : (
                          <>
                            Get My Free Audit
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          </>
                        )}
                      </button>
                    </form>

                    <p className="text-[11px] sm:text-xs text-gray-400 mt-4 sm:mt-6">
                      No spam. Delivered within 24 hours.
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
