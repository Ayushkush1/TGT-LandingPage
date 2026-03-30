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
                className="absolute right-10 top-10 text-gray-400 hover:text-black z-10"
              >
                <X />
              </button>

              {/* Content */}
              <div className="p-10 text-center">
                {submitStatus === "success" ? (
                  <div className="py-10 flex flex-col items-center space-y-4">
                    <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37]">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-semibold text-black tracking-tight">
                      Request Received!
                    </h2>
                    <p className="text-gray-500">
                      We'll be in touch with your complimentary audit within 24 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-3xl font-semibold text-black tracking-tight">
                      Complimentary Audit
                    </h2>

                    <p className="text-gray-500 mt-3 mb-8">
                      Discover opportunities to improve performance, SEO, and user
                      experience with a comprehensive expert review.
                    </p>
                    
                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
                      <input
                        {...register("name", { required: true })}
                        type="text"
                        placeholder="Your Name"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:border-[#0B0F29] outline-none"
                      />

                      <input
                        {...register("email", { required: true })}
                        type="email"
                        placeholder="Your Email"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:border-[#0B0F29] outline-none"
                      />

                      <input
                        {...register("webUrl", { required: true })}
                        type="url"
                        placeholder="Website URL"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:border-[#0B0F29] outline-none"
                      />

                      <textarea
                        {...register("improve", { required: true })}
                        placeholder="What would you like to improve?"
                        rows={3}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-black placeholder-gray-400 focus:border-[#0B0F29] outline-none resize-none"
                      />

                      {submitStatus === "error" && (
                        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
                      )}

                      {/* CTA */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-2 bg-[#0B0F29] text-white font-semibold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-black transition-all hover:border-[#D4AF37] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            Processing...
                            <Loader2 className="w-5 h-5 animate-spin" />
                          </>
                        ) : (
                          <>
                            Get My Free Audit
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </form>

                    <p className="text-xs text-gray-400 mt-6">
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
